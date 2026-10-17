import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { QmInfoCardComponent, InfoCardKind } from './qm-info-card.component';

/** Hex value of every colour token declared in the design system. */
const TOKENS: Record<string, string> = Object.fromEntries(
  [...readFileSync(resolve(process.cwd(), 'src/styles/_tokens.scss'), 'utf8')
    .matchAll(/\$color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8});/g)]
    .map(match => [match[1], match[2]])
);

/**
 * The stylesheet the browser actually receives for this component, with
 * Angular's view-encapsulation attributes removed so selectors read exactly as
 * authored (".qm-info--concept .qm-info__kind").
 */
const CSS = ((QmInfoCardComponent as unknown as { ɵcmp: { styles: string[] } }).ɵcmp.styles ?? [])
  .join('\n')
  .replace(/\[_ngcontent-[^\]]*\]/g, '')
  .replace(/%NS%/g, '');

const kindIdx = CSS.indexOf('.qm-info__kind');

const KINDS: InfoCardKind[] = [
  'concept', 'architecture', 'implementation', 'example', 'requirements', 'maturity', 'distinction'
];

function tokenValue(reference: string): string {
  // Token keys are stored without the leading "--color-" prefix.
  const hex = TOKENS[reference.replace(/^--color-/, '')];
  if (!hex) throw new Error(`Unknown design token: ${reference}`);
  return hex;
}

function relativeLuminance(hex: string): number {
  const full = hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;
  const channels = [1, 3, 5].map(i => parseInt(full.slice(i, i + 2), 16) / 255);

  return channels
    .map(c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)))
    .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
}

/** WCAG 2.1 contrast ratio between two hex colours. */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [lighter, darker] = a > b ? [a, b] : [b, a];

  return (lighter + 0.05) / (darker + 0.05);
}

/** Resolves the colour a variant uses for its small uppercase kind label. */
function labelColour(kind: InfoCardKind): string {
  const rule = CSS.match(
    new RegExp(`\\.qm-info--${kind}\\s+\\.qm-info__kind\\s*\\{[^}]*color:\\s*var\\((--[a-z0-9-]+)\\)`)
  );
  if (!rule) throw new Error(`No explicit kind-label colour declared for "${kind}"`);

  return tokenValue(rule[1]);
}

/** Resolves the pale background a variant paints. */
function backgroundColour(kind: InfoCardKind): string {
  const rule = CSS.match(
    new RegExp(`\\.qm-info--${kind}\\s*\\{[^}]*background:\\s*var\\((--[a-z0-9-]+)\\)`)
  );
  if (!rule) throw new Error(`No background declared for "${kind}"`);

  return tokenValue(rule[1]);
}

describe('info-card colour contrast', () => {
  it('reads the real token values and the compiled stylesheet', () => {
    expect(Object.keys(TOKENS).length).toBeGreaterThan(20);
    expect(CSS.length).toBeGreaterThan(100);
  });

  it.each(KINDS)(
    'the "%s" kind label meets WCAG AA for small text (4.5:1)',
    kind => {
      const ratio = contrastRatio(labelColour(kind), backgroundColour(kind));

      expect(
        ratio,
        `Kind "${kind}" label is ${ratio.toFixed(2)}:1 — below the 4.5:1 required for 11px text.`
      ).toBeGreaterThanOrEqual(4.5);
    }
  );

  it('declares every kind label explicitly rather than inheriting the muted token', () => {
    // The muted token is only 4.34:1 on the subtle surface, so an inherited
    // label colour would silently regress. Every variant must state its own.
    for (const kind of KINDS) {
      expect(labelColour(kind)).not.toBe(TOKENS['text-muted']);
    }
  });

  it('keeps the implementation label readable on its background', () => {
    const ratio = contrastRatio(labelColour('implementation'), backgroundColour('implementation'));

    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
