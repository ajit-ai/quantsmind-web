import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * The kinds of supporting information an article can present between its
 * paragraphs. Each kind maps to a pale, restrained background so that the
 * supporting material reads as a family rather than a set of unrelated boxes.
 */
export type InfoCardKind =
  | 'concept'
  | 'architecture'
  | 'implementation'
  | 'example'
  | 'requirements'
  | 'maturity'
  | 'distinction';

/** Fixed label shown above each card title, so the card type is always legible. */
const KIND_LABELS: Record<InfoCardKind, string> = {
  'concept':      'Key concept',
  'architecture': 'Architecture',
  'implementation': 'Implementation detail',
  'example':      'Practical example',
  'requirements': 'Requirements',
  'maturity':     'Maturity and limitations',
  'distinction':  'Important distinction'
};

/**
 * QmInfoCard
 *
 * A light-coloured supporting-information panel used inside articles. Cards
 * supplement the prose: they carry the compact facts, inventories and
 * clarifications that would break the rhythm of a paragraph, never replace it.
 */
@Component({
    selector: 'qm-info-card',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <aside class="qm-info" [class]="cardClass" [attr.aria-label]="ariaLabel || (kindLabel + ': ' + title)">
      <p class="qm-info__kind">{{ kindLabel }}</p>
      <h3 class="qm-info__title">{{ title }}</h3>
      @if (body) {
        <p class="qm-info__body">{{ body }}</p>
      }
      @if (points?.length) {
        <ul class="qm-info__points" role="list">
          @for (point of points; track point) {
            <li>{{ point }}</li>
          }
        </ul>
      }
      @if (code) {
        <div class="qm-info__code">
          @if (codeLabel) {
            <p class="qm-info__code-label">{{ codeLabel }}</p>
          }
          <pre class="qm-info__code-block"><code>{{ code }}</code></pre>
        </div>
      }
    </aside>
    `,
    styles: [`
    :host { display: block; }

    .qm-info {
      display: flex; flex-direction: column; gap: 10px;
      padding: 22px 24px;
      border: 1px solid transparent;
      border-radius: var(--radius-md);
    }

    /* ── Pale palette ────────────────────────────────
       Every variant is a light background with dark text, so
       contrast holds without inverting the card. */
    .qm-info--concept      { background: var(--color-sky-subtle);     border-color: var(--color-sky-muted); }
    .qm-info--architecture { background: var(--color-sdk-subtle);     border-color: var(--color-sdk-muted); }
    .qm-info--implementation { background: var(--color-surface-subtle); border-color: var(--color-border-strong); }
    .qm-info--example      { background: var(--color-accent-subtle);  border-color: var(--color-accent-muted); }
    .qm-info--requirements { background: var(--color-orange-subtle);  border-color: var(--color-orange-muted); }
    .qm-info--maturity     { background: var(--color-labs-subtle);    border-color: var(--color-labs-muted); }
    .qm-info--distinction  { background: var(--color-warning-soft);   border-color: var(--color-warning-muted); }

    /* ── Kind label ─────────────────────────────────── */
    .qm-info__kind {
      margin: 0;
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: var(--color-text-muted);
    }
    .qm-info--concept .qm-info__kind      { color: var(--color-sky-deep); }
    .qm-info--architecture .qm-info__kind { color: var(--color-sdk-deep); }
    .qm-info--example .qm-info__kind      { color: var(--color-accent-dark); }
    .qm-info--requirements .qm-info__kind { color: var(--color-orange-deep); }
    .qm-info--maturity .qm-info__kind     { color: var(--color-labs-dark); }
    .qm-info--distinction .qm-info__kind  { color: var(--color-warning-deep); }
    /* Explicit rather than inherited: the muted token only reaches 4.34:1 on
       the subtle surface, which is below the 4.5:1 needed for 11px text. */
    .qm-info--implementation .qm-info__kind { color: var(--color-text-secondary); }

    /* ── Content ────────────────────────────────────── */
    .qm-info__title {
      margin: 0;
      font-size: 16px; font-weight: 600; line-height: 1.4;
      color: var(--color-text-primary);
    }
    .qm-info__body {
      margin: 0;
      font-size: 14.5px; line-height: 1.7;
      color: var(--color-text-secondary);
      text-wrap: pretty;
    }
    .qm-info__points {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-direction: column; gap: 8px;
    }
    .qm-info__points li {
      position: relative; padding-left: 18px;
      font-size: 14px; line-height: 1.6;
      color: var(--color-text-secondary);
    }
    .qm-info__points li::before {
      content: ''; position: absolute; left: 0; top: 8px;
      width: 6px; height: 6px; border-radius: 2px;
      background: currentColor; opacity: 0.45;
    }

    /* ── Code sample ────────────────────────────────── */
    .qm-info__code {
      margin-top: 4px;
      background: var(--color-dark-canvas);
      border: 1px solid var(--color-dark-border);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }
    .qm-info__code-label {
      margin: 0; padding: 8px 14px;
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: var(--color-dark-text-muted);
      border-bottom: 1px solid var(--color-dark-border);
    }
    .qm-info__code-block {
      margin: 0; padding: 14px 16px;
      overflow-x: auto;
      white-space: pre;
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
      font-size: 12.5px; line-height: 1.6;
      color: var(--color-border);
    }
    `]
})
export class QmInfoCardComponent {
  /** Selects the pale background family for this card. */
  @Input({ required: true }) kind!: InfoCardKind;
  /** Short heading for the supporting fact being presented. */
  @Input({ required: true }) title!: string;
  /** Optional explanatory paragraph. */
  @Input() body?: string;
  /** Optional compact inventory: prerequisites, limitations, module names. */
  @Input() points?: string[];
  /** Optional small code sample or command sequence. */
  @Input() code?: string;
  /** Language or caption for the code sample. */
  @Input() codeLabel?: string;
  /** Overrides the accessible name announced for the card. */
  @Input() ariaLabel?: string;

  get kindLabel(): string {
    return KIND_LABELS[this.kind] ?? 'Note';
  }

  get cardClass(): string {
    return `qm-info qm-info--${this.kind}`;
  }
}
