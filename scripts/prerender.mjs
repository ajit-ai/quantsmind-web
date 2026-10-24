/**
 * Static site generation for QuantsMind Web.
 *
 * The application is a client-rendered Angular SPA. That is fine once
 * JavaScript has run, but it means two things are wrong for a static host:
 *
 *   1. A crawler or link-unfurling service that does not execute JavaScript
 *      receives the homepage's title, description, Open Graph tags and
 *      canonical URL for *every* URL, including article pages.
 *   2. GitHub Pages has no rewrite engine, so a deep link is only served
 *      through `404.html` and therefore always carries HTTP 404.
 *
 * Both are fixed by writing real, fully rendered HTML for each public route
 * into the build output, so GitHub Pages serves `<route>/index.html` directly
 * with HTTP 200.
 *
 * How the HTML is produced
 * -----------------------
 * The production bundle is served over HTTP and loaded in a real headless
 * Chrome via the DevTools Protocol. Once the application has rendered, the
 * live DOM is captured. That capture contains the article text *and* the
 * metadata that `RouteMetaService` wrote, so the emitted HTML is exactly what a
 * browser would show — no metadata is reconstructed or duplicated here.
 *
 * The route list is derived from the application's own sources:
 *   - static routes come from `src/app/app.routes.ts`
 *   - article routes come from `BLOG_ARTICLES` (the authoritative registry)
 * so there is no second, manually maintained list anywhere.
 *
 * Uses only Node built-ins: no new dependencies, and package-lock is untouched.
 *
 * Usage: node scripts/prerender.mjs [--out <dir>] [--port <n>]
 */

import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, readdir, stat, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { extname, join, resolve, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'dist/quantsmind-web/browser');

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const PORT = Number(argValue('port', '0'));

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.ico': 'image/x-icon', '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8'
};

/* ── Route discovery ─────────────────────────────────────────────── */

/** Static routes, including the empty path that serves the home page. */
async function staticRoutes() {
  const source = await readFile(join(ROOT, 'src/app/app.routes.ts'), 'utf8');
  const paths = [...source.matchAll(/path:\s*'([^']*)'/g)].map(m => m[1]);
  return paths.filter(p => p !== '**' && !p.includes(':'));
}

/** Article slugs straight from the authoritative registry. */
async function articleSlugs() {
  const dir = join(ROOT, 'src/app/pages/blog/articles');
  const files = (await readdir(dir)).filter(f => f.endsWith('.article.ts'));
  const slugs = [];
  for (const file of files) {
    const source = await readFile(join(dir, file), 'utf8');
    const m = source.match(/^\s*slug:\s*'([^']+)'/m);
    if (!m) throw new Error(`No slug found in ${file}`);
    slugs.push(m[1]);
  }
  return slugs;
}

/** Canonical path form: a leading and exactly one trailing slash. */
function canonicalPath(path) {
  const trimmed = (path || '').replace(/^\/+/, '').replace(/\/+$/, '');
  return trimmed ? `/${trimmed}/` : '/';
}

async function buildRouteList() {
  const staticList = await staticRoutes();
  const slugs = await articleSlugs();
  const routes = new Set();
  for (const p of staticList) routes.add(canonicalPath(p));
  for (const slug of slugs) routes.add(canonicalPath(`blog/${slug}`));
  return [...routes].sort();
}

/* ── Headless Chrome via DevTools Protocol ───────────────────────── */

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'
].filter(Boolean);

function launchChrome(userDataDir, port) {
  const executable = CHROME_CANDIDATES.find(p => existsSync(p));
  if (!executable) {
    throw new Error(
      'No Chrome/Chromium executable found. Install Chrome or set CHROME_PATH to its executable.'
    );
  }
  console.log(`[prerender] launching Chrome: ${executable}`);

  // Chrome's sandbox requires kernel features that are unavailable or unreliable
  // on many CI runners (including GitHub Actions ubuntu-latest). There, Chrome
  // can stay alive but never expose the DevTools endpoint. Disable the sandbox
  // only in a CI environment; local Windows execution keeps the original
  // (sandboxed) behaviour.
  const isCI = process.env.GITHUB_ACTIONS === 'true' || process.env.CI === 'true';
  const args = [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${userDataDir}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--disable-extensions', '--disable-dev-shm-usage',
    'about:blank'
  ];
  if (isCI) {
    args.splice(args.length - 1, 0, '--no-sandbox', '--disable-setuid-sandbox');
  }

  const child = spawn(executable, args, { stdio: ['ignore', 'pipe', 'pipe'] });

  // Capture stderr so a failed launch reports the actual reason instead of a
  // bare timeout. stdout is drained to avoid back-pressure.
  const stderrChunks = [];
  child.stderr.on('data', chunk => stderrChunks.push(chunk));
  child.stdout.on('data', () => {});

  return new Promise((resolveLaunch, rejectLaunch) => {
    const deadline = Date.now() + 30000;
    const attempt = async () => {
      if (child.exitCode !== null) {
        const stderr = Buffer.concat(stderrChunks).toString('utf8').trim();
        return rejectLaunch(new Error(
          `Chrome exited during startup (exit code ${child.exitCode})${stderr ? `: ${stderr}` : ''}`
        ));
      }
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) return resolveLaunch({ child, version: (await res.json()).Browser });
      } catch { /* not up yet */ }
      if (Date.now() > deadline) {
        const stderr = Buffer.concat(stderrChunks).toString('utf8').trim();
        try { child.kill(); } catch { /* already dead */ }
        return rejectLaunch(new Error(
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
    this.ws = ws; this.id = 0; this.pending = new Map(); this.handlers = new Map();
    ws.addEventListener('message', ev => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve: ok, reject: no } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? no(new Error(JSON.stringify(msg.error))) : ok(msg.result);
      } else if (msg.method) {
        (this.handlers.get(msg.method) || []).forEach(h => h(msg.params));
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
  on(method, fn) {
    if (!this.handlers.has(method)) this.handlers.set(method, []);
    this.handlers.get(method).push(fn);
  }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

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
    const detail = r.exceptionDetails.text
      || r.exceptionDetails.exception?.description
      || JSON.stringify(r.exceptionDetails);
    throw new Error(`Runtime.evaluate failed: ${detail}`);
  }
  return r.result.value;
}

/**
 * Polls until the routed page has rendered and RouteMetaService has written the
 * head.
 *
 * Two conditions matter here. The route's own heading must be present, because
 * the routed component is lazy-loaded and the page chrome renders first. And it
 * must stay present across consecutive polls, because `RouteMetaService` writes
 * the canonical on `NavigationEnd`, which happens *before* the incoming
 * component paints: without the stability check the previous page's heading
 * satisfies the gate while it is being torn down, and the capture then lands
 * on an empty page.
 */
async function waitForRender(session, expectedCanonical) {
  let previousHeading = null;
  for (let attempt = 0; attempt < 160; attempt++) {
    let state;
    try {
      state = await evaluate(session, `(() => {
        const heading = (document.querySelector('main h1')?.textContent || '').trim();
        return {
          mounted: !!document.querySelector('app-root')?.children?.length,
          heading,
          path: location.pathname,
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
          text: (document.body.innerText || '').trim().length
        };
      })()`);
    } catch {
      state = null; // evaluation raced a context swap: not ready yet
    }

    const ready = state && state.mounted && state.heading.length > 0
      && state.text > 200 && state.canonical === expectedCanonical;

    if (ready && state.heading === previousHeading) return state;
    if (ready) previousHeading = state.heading;
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${expectedCanonical}`);
}

async function captureRoute(session, baseUrl, route) {
  const expectedCanonical = `https://www.quantsmind.com${route}`;
  const url = `${baseUrl}${route}`;
  console.log(`[prerender]   navigating ${url}`);
  await session.send('Page.navigate', { url });
  await waitForRender(session, expectedCanonical);

  const html = await evaluate(session, 'document.documentElement.outerHTML');

  // Guard the capture itself: never write a page that has correct metadata but
  // no rendered content, because that is a silent, hard-to-spot regression.
  if (!/<h1[\s>]/.test(html)) {
    throw new Error(`Captured page for ${route} has no rendered <h1>; refusing to write it`);
  }
  if (!html.includes(expectedCanonical)) {
    throw new Error(`Captured page for ${route} is missing canonical ${expectedCanonical}`);
  }
  const facts = await evaluate(session, `(() => {
    const m = q => document.querySelector(q)?.getAttribute('content') ?? null;
    return {
      title: document.title,
      description: m('meta[name="description"]'),
      ogTitle: m('meta[property="og:title"]'),
      ogUrl: m('meta[property="og:url"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
      h1: document.querySelector('h1')?.textContent?.trim() ?? null
    };
  })()`);

  const target = join(OUT_DIR, route === '/' ? 'index.html' : `${route}index.html`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `<!DOCTYPE html>\n${html}`, 'utf8');
  return { route, file: target.replace(OUT_DIR, '').replace(/\\/g, '/'), ...facts };
}


function startServer(root) {
  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    try {
      let filePath = join(root, urlPath);
      if ((await stat(filePath).catch(() => null))?.isDirectory()) {
        filePath = join(filePath, 'index.html');
      }
      const body = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      // Mirror GitHub Pages: unknown paths fall back to the application shell
      // with a 404 status so client-side routing can resolve them. Without this
      // the routes that have not been generated yet would render nothing.
      try {
        const shell = await readFile(join(root, 'index.html'));
        res.writeHead(404, { 'Content-Type': MIME['.html'] });
        res.end(shell);
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('not found');
      }
    }
  });
  return new Promise(resolveServer => {
    server.listen(PORT, '127.0.0.1', () => resolveServer({ server, port: server.address().port }));
  });
}

/* ── Sitemap consistency ─────────────────────────────────────────── */

/**
 * The sitemap is intentionally hand-maintained rather than generated, so this
 * guards it against drift instead of overwriting it: every route emitted here
 * must already be declared indexable.
 */
async function verifySitemap(routes) {
  const xml = await readFile(join(OUT_DIR, 'sitemap.xml'), 'utf8');
  const declared = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
  const missing = routes
    .map(r => `https://www.quantsmind.com${r}`)
    .filter(url => !declared.has(url));
  if (missing.length) {
    throw new Error(`sitemap.xml is missing generated routes:\n  ${missing.join('\n  ')}`);
  }
  return declared.size;
}

/* ── Main ────────────────────────────────────────────────────────── */

async function main() {
  if (!existsSync(join(OUT_DIR, 'index.html'))) {
    throw new Error(`No build found at ${OUT_DIR}. Run "npm run build" first.`);
  }

  const routes = await buildRouteList();
  console.log(`[prerender] discovered ${routes.length} routes from app.routes.ts + BLOG_ARTICLES`);

  const { server, port } = await startServer(OUT_DIR);
  const userDataDir = join(ROOT, 'node_modules/.cache/prerender-chrome');
  await mkdir(userDataDir, { recursive: true });

  let chrome;
  let session;
  try {
    chrome = await launchChrome(userDataDir, port + 1);
    console.log(`[prerender] rendering with ${chrome.version}`);

    session = await openPage(port + 1);
    const baseUrl = `http://127.0.0.1:${port}`;
    const manifest = [];

    for (const route of routes) {
      const facts = await captureRoute(session, baseUrl, route, port);
      manifest.push(facts);
      console.log(`[prerender] ${route.padEnd(42)} -> ${facts.title.slice(0, 56)}`);
    }

    // GitHub Pages still needs a 404 document for URLs that were never
    // prerendered. Copying the shell keeps client-side routing working there.
    await copyFile(join(OUT_DIR, 'index.html'), join(OUT_DIR, '404.html'));

    const declared = await verifySitemap(routes);
    await mkdir(join(ROOT, 'dist/quantsmind-web'), { recursive: true });
    await writeFile(
      join(ROOT, 'dist/quantsmind-web/prerender-manifest.json'),
      JSON.stringify({ generatedAt: new Date().toISOString(), routes: manifest }, null, 2),
      'utf8'
    );

    console.log(`[prerender] wrote ${manifest.length} route files + 404.html`);
    console.log(`[prerender] sitemap.xml declares ${declared} URLs — consistent`);
  } finally {
    // Cleanup runs on every path — success, render failure, or navigation
    // failure — so a failed run never leaves a browser or a listening socket
    // behind. Order matters: release the DevTools socket, terminate the
    // browser we started, then close the server that browser was using.
    if (session?.ws) {
      try { session.ws.close(); } catch { /* already closed */ }
    }
    if (chrome?.child && chrome.child.exitCode === null) {
      const child = chrome.child;
      child.kill();
      // Give the process a moment to exit so the port is released before the
      // server socket is closed. Bounded, so a stuck browser cannot hang us.
      await new Promise(resolveExit => {
        const timer = setTimeout(resolveExit, 5000);
        child.once('exit', () => { clearTimeout(timer); resolveExit(); });
      });
    }
    await new Promise(resolveClose => server.close(() => resolveClose()));
  }
}

main().then(
  () => {
    // Everything is closed, so the process ends on its own with status 0.
  },
  error => {
    // Include the stack when there is one: a bare "Uncaught" with no message
    // tells whoever reads the CI log nothing about what actually failed.
    console.error(`[prerender] FAILED: ${error?.message || String(error)}`);
    if (error?.stack) console.error(error.stack);
    // Set the status rather than exiting, so cleanup and flushing finish first.
    process.exitCode = 1;
  }
);
