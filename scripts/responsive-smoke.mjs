/**
 * Responsive smoke test for QuantsMind Web.
 *
 * Spins up a headless Chrome, serves the production build, and checks for
 * horizontal overflow at three viewport sizes for the main public routes.
 *
 * Usage: node scripts/responsive-smoke-1.mjs
 */

import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { statSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'dist/quantsmind-web/browser');

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
  if (!executable) throw new Error('Chrome not found');
  const child = spawn(executable, [
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
  ], { stdio: 'ignore' });

  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 30000;
    const attempt = async () => {
      if (child.exitCode !== null) {
        return reject(new Error('Chrome exited during startup'));
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
        return reject(new Error('Chrome DevTools endpoint did not start'));
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
  return session;
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
const ROUTES = ['', '/services', '/products', '/technology', '/contact'];
const VIEWPORTS = [
  { width: 1440, height: 900, label: '1440px' },
  { width: 768, height: 1024, label: '768px' },
  { width: 390, height: 844, label: '390px' }
];

async function checkRoute(session, baseUrl, route, vp) {
  const url = `${baseUrl}${route === '' ? '/' : route}`;
  console.log(`[smoke] ${vp.label} -> ${route || '/'}`);
  await session.send('Page.navigate', { url });
  const canonicalPath = (p) => {
    const trimmed = (p || '').replace(/^\/+/, '').replace(/\/+$/, '');
    return trimmed ? `/${trimmed}/` : '/';
  };
  const expectedCanonical = `https://www.quantsmind.com${canonicalPath(route)}`;
  await waitForRender(session, expectedCanonical);

  // Apply the viewport settings after the route has rendered, then measure
  // overflow.  Setting the metrics before navigation caused the app to stall
  // on a few routes (notably /services), so we apply them only for measurement.
  await session.send('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    mobile: false,
    fitWindow: false
  });

  const overflowInfo = await evaluate(session, `
    (() => {
      const doc = document.documentElement;
      const body = document.body;
      const maxW = Math.max(
        doc.scrollWidth, body.scrollWidth,
        doc.offsetWidth, body.offsetWidth,
        doc.clientWidth, body.clientWidth
      );
      const winW = window.innerWidth;
      return {
        horizontalOverflow: maxW > winW + 1,
        docScrollWidth: doc.scrollWidth,
        bodyScrollWidth: body.scrollWidth,
        winWidth: winW
      };
    })()`);

  const consoleErrors = await evaluate(session, `
    (() => {
      const errors = [];
      const orig = console.error;
      console.error = (...args) => { errors.push(args.join(' ')); };
      return errors;
    })()`);

  return {
    route,
    viewport: vp.label,
    horizontalOverflow: overflowInfo.horizontalOverflow,
    docScrollWidth: overflowInfo.docScrollWidth,
    bodyScrollWidth: overflowInfo.bodyScrollWidth,
    winWidth: overflowInfo.winWidth,
    consoleErrors
  };
}
async function startServer(OUT_DIR) {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, 'http://localhost');
      let pathname = url.pathname === '/' ? '/index.html' : url.pathname;
      const filePath = join(OUT_DIR, pathname);
      try {
        let target = filePath;
        const stats = await statSync(target);
        if (stats.isDirectory()) target = join(target, 'index.html');
        const data = await readFile(target);
        res.writeHead(200, { 'Content-Type': MIME[extname(target)] || 'application/octet-stream' });
        res.end(data);
      } catch {
        // Fallback to index.html (SPA shell) with 404, mirroring prerender script
        try {
          const shell = await readFile(join(OUT_DIR, 'index.html'));
          res.writeHead(404, { 'Content-Type': MIME['.html'] });
          res.end(shell);
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
    throw new Error('No production build found. Run "npm run build" first.');
  }

  const { server, port } = await startServer(OUT_DIR);
  const userDataDir = join(ROOT, 'node_modules/.cache/responsive-smoke-chrome');
  await mkdir(userDataDir, { recursive: true });

  let chrome, session;
  try {
    chrome = await launchChrome(userDataDir, port + 1);
    session = await openPage(port + 1);
    const baseUrl = `http://127.0.0.1:${port}`;

    for (const route of ROUTES) {
      for (const vp of VIEWPORTS) {
        const result = await checkRoute(session, baseUrl, route, vp);
        console.log(
          `  ${result.route || '/'} @ ${result.viewport}: ` +
          `overflow=${result.horizontalOverflow}, ` +
          `docScroll=${result.docScrollWidth}, ` +
          `bodyScroll=${result.bodyScrollWidth}, ` +
          `winWidth=${result.winWidth}`
        );
        if (result.consoleErrors.length) {
          console.log(`    console errors: ${result.consoleErrors.join(' | ')}`);
        }
      }
    }
    console.log('[smoke] Responsive smoke test completed.');
  } finally {
    if (session?.ws) {
      try { session.ws.close(); } catch { /* ignore */ }
    }
    if (chrome?.child) {
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
  console.error('[smoke] FAILED:', err);
  process.exitCode = 1;
});
