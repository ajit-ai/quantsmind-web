/**
 * Regenerates public/sitemap.xml from the same sources the prerenderer uses.
 * Run: node scripts/generate-sitemap.mjs
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.quantsmind.com';
const path = p => {
  const trimmed = (p || '').replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
};

async function staticRoutes() {
  const source = await readFile(join(ROOT, 'src/app/app.routes.ts'), 'utf8');
  const paths = [...source.matchAll(/path:\s*'([^']*)'/g)].map(m => m[1]);
  const redirects = new Set(['blog', 'blog/:slug']);
  return paths.filter(p => p !== '**' && !p.includes(':') && !redirects.has(p));
}
async function articleSlugs() {
  const dir = join(ROOT, 'src/app/pages/blog/articles');
  const files = (await readdir(dir)).filter(f => f.endsWith('.article.ts'));
  const slugs = [];
  for (const file of files) {
    const source = await readFile(join(dir, file), 'utf8');
    const m = source.match(/^\s*slug:\s*'([^']+)'/m);
    slugs.push(m[1]);
  }
  return slugs;
}
async function productSlugs() {
  const source = await readFile(join(ROOT, 'src/app/content/products/product.registry.ts'), 'utf8');
  const blocks = source.split(/\r?\n  \{\r?\n/).slice(1);
  const slugs = [];
  for (const block of blocks) {
    const idMatch = block.match(/^\s*id:\s*'([^']+)'/m);
    if (!idMatch || /dedicatedRoute:\s*'/.test(block)) continue;
    slugs.push(idMatch[1]);
  }
  return slugs;
}
async function researchSlugs() {
  const source = await readFile(join(ROOT, 'src/app/content/research/research-items.ts'), 'utf8');
  return [...new Set([...source.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map(m => m[1]))];
}
async function categorySlugs() {
  const source = await readFile(join(ROOT, 'src/app/content/products/product.model.ts'), 'utf8');
  const block = source.match(/PRODUCT_CATEGORY_LABELS[^=]*=\s*\{([\s\S]*?)\}/);
  if (!block) throw new Error('PRODUCT_CATEGORY_LABELS not found in product.model.ts');
  return [...block[1].matchAll(/'([a-z-]+)':/g)].map(m => m[1]).filter(slug => slug !== 'research');
}

const routes = new Set();
for (const p of await staticRoutes()) routes.add(path(p));
for (const s of await articleSlugs()) routes.add(path(`insights/${s}`));
for (const s of await productSlugs()) routes.add(path(`products/${s}`));
for (const s of await researchSlugs()) routes.add(path(`labs/${s}`));
for (const s of await categorySlugs()) routes.add(path(`products/category/${s}`));

const priority = (route) =>
  route === '/' ? '1.0'
  : /^\/(services|products|technology|labs|insights|about|contact|quantum)\//.test(route) && route.split('/').filter(Boolean).length === 1 ? '0.9'
  : route === '/support/' || route === '/releases/' ? '0.8'
  : route.startsWith('/insights/') || route.startsWith('/products/') ? '0.6'
  : '0.7';
const changefreq = (route) => (route === '/' ? 'weekly' : /^\/(privacy|terms|cookies)\//.test(route) ? 'yearly' : 'monthly');

const body = [...routes].sort()
  .map(route => `  <url>\n    <loc>${SITE}${route}</loc>\n    <changefreq>${changefreq(route)}</changefreq>\n    <priority>${priority(route)}</priority>\n  </url>`)
  .join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${body}\n\n</urlset>\n`;
await writeFile(join(ROOT, 'public/sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml regenerated with ${routes.size} URLs`);
