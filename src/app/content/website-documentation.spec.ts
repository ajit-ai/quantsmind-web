import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read = (relativePath: string): string =>
  readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('website documentation claims', () => {
  it('does not claim client hydration when it is not configured', () => {
    const appConfig = read('src/app/app.config.ts');
    const readme = read('README.md');

    expect(/provideClientHydration\s*\(/.test(appConfig)).toBe(false);
    expect(readme).not.toMatch(/after hydration/i);
    expect(readme).toMatch(/Client hydration is not enabled/i);
  });

  it('includes developer tools in the documented product inventory', () => {
    const readme = read('README.md');
    expect(readme).toMatch(/`\/products`[^\n]*developer tools/i);
  });

  it('reports internally consistent release figures and a non-ready disposition', () => {
    const report = read('docs/website-v2/WEBSITE_V2_0_0_IMPLEMENTATION_REPORT.md');

    // Route/sitemap consistency: prerendered route files must equal sitemap URLs.
    expect(report).toMatch(/34 route files \+ `404\.html`/);
    expect(report).toMatch(/sitemap declares 34 URLs/);
    // Honest disposition: historical docs must not claim a public release.
    expect(report).toMatch(/v2\.0\.0 is not released/);
    expect(report).not.toMatch(/READY WITH OBSERVATIONS/i);
    // Stale figures from earlier qualification reports must not bleed into this record.
    expect(report).not.toMatch(/523\.24/);
    expect(report).not.toMatch(/0\.23 kB above/i);
  });
});
