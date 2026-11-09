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

  it('reports internally consistent bundle figures and a non-ready disposition', () => {
    const report = read('docs/website/WEBSITE_V1.1.0_FINAL_RELEASE_READINESS_REPORT.md');

    const figure = (pattern: RegExp): number => {
      const match = report.match(pattern);
      expect(match).toBeTruthy();
      return Number(match![1]);
    };

    const initial = figure(/Initial total:\s*([\d.]+)\s*kB/i);
    const main = figure(/Main:\s*([\d.]+)\s*kB/i);
    const styles = figure(/Styles:\s*([\d.]+)\s*kB/i);
    const polyfills = figure(/Polyfills:\s*([\d.]+)\s*kB/i);

    expect(Math.abs(main + styles + polyfills - initial)).toBeLessThan(0.05);
    expect(report).not.toMatch(/READY WITH OBSERVATIONS/i);
    expect(report).not.toMatch(/523\.24/);
    expect(report).not.toMatch(/0\.23 kB above/i);
    expect(report).toMatch(/P0 corrections are complete/i);
    expect(report).toMatch(/NOT READY/i);
  });
});
