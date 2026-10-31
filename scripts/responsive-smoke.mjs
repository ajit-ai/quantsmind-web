/**
 * Responsive smoke test for QuantsMind Web.
 *
 * Serves the prerendered production build, loads every route recorded in
 * `dist/quantsmind-web/prerender-manifest.json`, and checks each one at six
 * viewport widths for horizontal overflow and runtime console errors.
 *
 * This is a release gate: any overflow or console error exits non-zero.
 *
 * Usage: npm run smoke
 * Requires: npm run build:static
 */

import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { statSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'dist/quantsmind-web/browser');
const MANIFEST = resolve(ROOT, 'dist/quantsmind-web/prerender-manifest.json');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8'
};

const VIEWPORTS = [
  { width: 1440, height: 900, label: '1440px' },
  { width: 1280, height: 800, label: '1280px' },
  { width: 1024, height: 768, label: '1024px' },
  { width: 768, height: 1024, label: '768px' },
  { width: 390, height: 844, label: '390px' },
  { width: 360, height: 800, label: '360px' }
];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
].filter(Boolean);

function launchChrome(userDataDir, port) {
  const executable = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!executable) throw new Error('Chrome not found. Set CHROME_PATH or install Chrome.');

  // Chrome's sandbox needs kernel features that GitHub Actions runners do not
  // reliably provide. Without these flags Chrome stays alive but never opens
  // the DevTools endpoint. Keep the sandbox locally; disable it only in CI.
  const isCI = process.env.GITHUB_ACTIONS === 'true' || process.env.CI === 'true';
  const args = [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--hide-scrollbars',
    '--disable-extensions',
    '--disable-dev-shm-usage',
    'about:blank'
  ];
  if (isCI) {
    args.splice(args.length - 1, 0, '--no-sandbox', '--disable-setuid-sandbox');
  }

  const child = spawn(executable, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  const stderrChunks = [];
  child.stderr.on('data', (chunk) => stderrChunks.push(chunk));
  child.stdout.on('data', () => {});

  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 30000;
    const attempt = async () => {
      if (child.exitCode !== null) {
        const stderr = Buffer.concat(stderrChunks).toString('utf8').trim();
        return reject(new Error(
          `Chrome exited during startup (exit code ${child.exitCode})${stderr ? `: ${stderr}` : ''}`
        ));
      }
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) {
          return resolve({ child, version: (await res.json()).Browser });
        }
      } catch {
        // not up yet
      }
      if (Date.now() > deadline) {
        const stderr = Buffer.concat(stderrChunks).toString('utf8').trim();
        try { child.kill(); } catch { /* already dead */ }
        return reject(new Error(
          `Chrome DevTools endpoint did not start within 30s${stderr ? `. Chrome stderr: ${stderr}` : ''}`
        ));
      }
      setTimeout(attempt, 250);
    };
    attempt();
  });
}

class CdpSession {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.handlers = new Map();
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve: ok, reject: no } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? no(new Error(JSON.stringify(msg.error))) : ok(msg.result);
      } else if (msg.method) {
        (this.handlers.get(msg.method) || []).forEach((h) => h(msg.params));
      }
    });
  }

  on(method, handler) {
    const list = this.handlers.get(method) ?? [];
    list.push(handler);
    this.handlers.set(method, list);
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((ok, no) => {
      this.pending.set(id, { resolve: ok, reject: no });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function openPage(port) {
  const res = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
  const target = await res.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((ok, no) => {
    ws.addEventListener('open', ok);
    ws.addEventListener('error', () => no(new Error('DevTools websocket failed')));
  });
  const session = new CdpSession(ws);
  await session.send('Page.enable');
  await session.send('Runtime.enable');

  // Console errors are captured as CDP events. The previous implementation
  // installed a console.error wrapper *after* the page had rendered, so it
  // could never observe anything. These handlers are registered before the
  // first navigation and the buffer is cleared per route.
  const consoleErrors = [];
  session.on('Runtime.consoleAPICalled', ({ type, args }) => {
    if (type !== 'error') return;
    consoleErrors.push(
      args.map((a) => a.value ?? a.description ?? a.type ?? '').join(' ').trim()
    );
  });
  session.on('Runtime.exceptionThrown', ({ exceptionDetails }) => {
    consoleErrors.push(
      exceptionDetails?.exception?.description
        ?? exceptionDetails?.text
        ?? 'Uncaught exception'
    );
  });

  return { session, consoleErrors };
}

async function evaluate(session, expression) {
  const r = await session.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) {
    const detail =
      r.exceptionDetails.text ||
      r.exceptionDetails.exception?.description ||
      JSON.stringify(r.exceptionDetails);
    throw new Error(`Runtime.evaluate failed: ${detail}`);
  }
  return r.result.value;
}

async function waitForRender(session, expectedCanonical) {
  let previousHeading = null;
  for (let attempt = 0; attempt < 160; attempt++) {
    let state;
    try {
      state = await evaluate(session, `
        (() => {
          const heading = (document.querySelector('main h1')?.textContent || '').trim();
          return {
            mounted: !!document.querySelector('app-root')?.children?.length,
            heading,
            text: (document.body.innerText || '').trim().length,
            canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null
          };
        })()`);
    } catch {
      state = null;
    }

    const ready = state &&
      state.mounted &&
      state.heading.length > 0 &&
      state.text > 200 &&
      state.canonical === expectedCanonical;

    if (ready && state.heading === previousHeading) return state;
    if (ready) previousHeading = state.heading;
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${expectedCanonical}`);
}

/** Let layout settle after a viewport change (two frames + a short pause). */
async function settleLayout(session) {
  await evaluate(session, `
    new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 150)));
    })`);
}

async function measureViewport(session, entry, vp) {
  await session.send('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    mobile: false,
    fitWindow: false
  });
  await settleLayout(session);

  const measurement = await evaluate(session, `
    (() => {
      const doc = document.documentElement;
      const body = document.body;
      const winW = window.innerWidth;
      const scrollWidth = Math.max(
        doc.scrollWidth, body.scrollWidth,
        doc.offsetWidth, body.offsetWidth,
        doc.clientWidth, body.clientWidth
      );
      const horizontalOverflow = scrollWidth > winW + 1;
      const offenders = [];
      if (horizontalOverflow) {
        for (const el of document.querySelectorAll('body *')) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.right > winW + 1) {
            const cls = typeof el.className === 'string'
              ? el.className.trim().split(/\\s+/).filter(Boolean).slice(0, 3).join('.')
              : '';
            offenders.push({
              tag: el.tagName.toLowerCase(),
              cls,
              right: Math.round(rect.right)
            });
            if (offenders.length >= 8) break;
          }
        }
      }
      return { horizontalOverflow, scrollWidth, winWidth: winW, offenders };
    })()`);

  return {
    route: entry.route,
    viewport: vp.label,
    ...measurement
  };
}

async function readManifestRoutes() {
  if (!existsSync(MANIFEST)) {
    throw new Error(
      `No prerender manifest at ${MANIFEST}. Run "npm run build:static" first.`
    );
  }
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
  const routes = (manifest.routes ?? [])
    .filter((r) => typeof r.route === 'string' && r.route.startsWith('/'))
    .map((r) => ({
      route: r.route,
      canonical: r.canonical ?? `https://www.quantsmind.com${r.route}`
    }));

  if (routes.length === 0) {
    throw new Error('The prerender manifest contains no routes.');
  }
  return routes;
}

async function startServer(outDir) {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, 'http://localhost');
      const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
      const filePath = join(outDir, pathname);
      try {
        let target = filePath;
        const stats = statSync(target);
        if (stats.isDirectory()) target = join(target, 'index.html');
        const data = await readFile(target);
        res.writeHead(200, { 'Content-Type': MIME[extname(target)] || 'application/octet-stream' });
        res.end(data);
      } catch {
        // Mirror GitHub Pages: unknown paths fall back to the 404 document.
        try {
          const notFound = await readFile(join(outDir, '404.html'));
          res.writeHead(404, { 'Content-Type': MIME['.html'] });
          res.end(notFound);
        } catch {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not found');
        }
      }
    });

    server.listen(0, () => {
      const addr = server.address();
      resolve({ server, port: addr.port });
    });
  });
}

async function main() {
  if (!existsSync(join(OUT_DIR, 'index.html'))) {
    throw new Error('No production build found. Run "npm run build:static" first.');
  }

  const routes = await readManifestRoutes();
  const { server, port } = await startServer(OUT_DIR);
  const userDataDir = join(ROOT, 'node_modules/.cache/responsive-smoke-chrome');
  await mkdir(userDataDir, { recursive: true });

  let chrome, session, consoleErrors;
  const failures = [];
  let checks = 0;

  try {
    chrome = await launchChrome(userDataDir, port + 1);
    ({ session, consoleErrors } = await openPage(port + 1));
    const baseUrl = `http://127.0.0.1:${port}`;

    console.log(
      `[smoke] ${routes.length} routes × ${VIEWPORTS.length} viewports ` +
      `(${VIEWPORTS.map((v) => v.label).join(', ')})`
    );

    for (const entry of routes) {
      consoleErrors.length = 0;
      const failuresBefore = failures.length;

      // Render at a desktop size first; the viewport is then changed for each
      // measurement. Setting metrics before navigation caused the app to
      // stall on some routes, so metrics are applied only after render.
      await session.send('Emulation.clearDeviceMetricsOverride');
      await session.send('Page.navigate', { url: `${baseUrl}${entry.route}` });
      await waitForRender(session, entry.canonical);
      await sleep(200);

      for (const vp of VIEWPORTS) {
        const result = await measureViewport(session, entry, vp);
        checks++;

        const offenderDetail = result.offenders.length
          ? ` (${result.offenders
              .map((o) => `${o.tag}${o.cls ? `.${o.cls}` : ''} right=${o.right}`)
              .join(', ')})`
          : '';

        if (result.horizontalOverflow) {
          failures.push(
            `${result.route} @ ${vp.label}: horizontal overflow ` +
            `${result.scrollWidth}px > ${result.winWidth}px${offenderDetail}`
          );
        }
      }

      if (consoleErrors.length) {
        failures.push(
          `${entry.route}: ${consoleErrors.length} console error(s): ` +
          consoleErrors.map((e) => e.slice(0, 240)).join(' | ')
        );
      }

      const routeFailures = failures.length - failuresBefore;
      console.log(
        `[smoke] ${entry.route.padEnd(40)} ${routeFailures === 0 ? 'ok' : `${routeFailures} failure(s)`}`
      );
    }

    if (failures.length) {
      console.error(`[smoke] ${failures.length} failure(s) in ${checks} checks:`);
      for (const failure of failures) console.error(`  ✗ ${failure}`);
      throw new Error('Responsive smoke test failed');
    }

    console.log(`[smoke] PASS — ${checks} checks, no overflow or console errors.`);
  } finally {
    if (session?.ws) {
      try { session.ws.close(); } catch { /* ignore */ }
    }
    if (chrome?.child) {
      if (chrome.child.exitCode === null) chrome.child.kill();
      await new Promise((resolve) => {
        if (chrome.child.exitCode !== null) return resolve();
        chrome.child.once('exit', resolve);
        setTimeout(resolve, 5000);
      });
    }
    await new Promise((resolve) => server.close(() => resolve()));
  }
}

main().then(() => process.exit(0)).catch((err) => {
  console.error('[smoke] FAILED:', err.message);
  process.exit(1);
});
