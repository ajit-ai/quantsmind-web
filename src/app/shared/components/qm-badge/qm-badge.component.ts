import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


export type BadgeVariant =
  | 'default'
  | 'concept' | 'research' | 'experimental' | 'prototype'
  | 'development' | 'early-access' | 'product'
  | 'stable'
  | 'ai' | 'data' | 'cloud' | 'software' | 'quantum' | 'optimization'
  | 'build' | 'modernize' | 'explore';

/**
 * QmBadge
 * Compact label for categories, maturity states, and entry-point signals.
 */
@Component({
    selector: 'qm-badge',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<span [class]="badgeClass" [attr.aria-label]="ariaLabel || null"><ng-content></ng-content></span>`,
    styles: [`
    :host { display: inline-block; }

    .qm-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 9999px;
      border: 1px solid transparent;
      white-space: nowrap;
    }

    /* Default */
    .qm-badge--default       { background: var(--color-surface-subtle); color: var(--color-text-secondary); border-color: var(--color-border-strong); }

    /* Maturity states */
    .qm-badge--concept       { background: var(--color-surface-subtle); color: var(--color-text-secondary); border-color: var(--color-border-strong); }
    .qm-badge--research      { background: var(--color-warning-soft); color: var(--color-warning-deep); border-color: var(--color-warning-muted); }
    .qm-badge--experimental  { background: var(--color-sky-subtle); color: var(--color-sky-deep); border-color: var(--color-sky-muted); }
    .qm-badge--prototype     { background: var(--color-sdk-subtle); color: var(--color-sdk-deep); border-color: var(--color-sdk-muted); }
    .qm-badge--development   { background: var(--color-success-subtle); color: var(--color-success-deep); border-color: var(--color-success-muted); }
    .qm-badge--early-access  { background: var(--color-accent-subtle); color: var(--color-accent-dark); border-color: var(--color-accent-muted); }
    .qm-badge--product       { background: var(--color-accent); color: var(--color-text-inverse); border-color: transparent; }

    /* Released / stable — a public, versioned release (distinct from 'development',
       which describes work still in progress). */
    .qm-badge--stable        { background: var(--color-success-deep); color: var(--color-text-inverse); border-color: transparent; }

    /* Domain categories */
    .qm-badge--ai            { background: var(--color-sdk-subtle); color: var(--color-sdk-deep); border-color: var(--color-sdk-muted); }
    .qm-badge--data          { background: var(--color-sky-subtle); color: var(--color-sky-dark); border-color: var(--color-sky-muted); }
    .qm-badge--cloud         { background: var(--color-labs-subtle); color: var(--color-labs-dark); border-color: var(--color-labs-muted); }
    .qm-badge--software      { background: #F0F9FF; color: var(--color-sky-deep); border-color: var(--color-sky-muted); }
    .qm-badge--quantum       { background: var(--color-dark-canvas); color: var(--color-dark-text-muted); border-color: var(--color-dark-border); }
    .qm-badge--optimization  { background: var(--color-orange-subtle); color: var(--color-orange-deep); border-color: var(--color-orange-muted); }

    /* Entry-point tags */
    .qm-badge--build         { background: var(--color-accent-subtle); color: var(--color-accent); border-color: var(--color-accent-muted); }
    .qm-badge--modernize     { background: var(--color-sky-subtle); color: var(--color-sky-deep); border-color: var(--color-sky-muted); }
    .qm-badge--explore       { background: var(--color-sdk-subtle); color: var(--color-sdk-deep); border-color: var(--color-sdk-muted); }
  `]
})
export class QmBadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() ariaLabel?: string;

  get badgeClass(): string {
    return `qm-badge qm-badge--${this.variant}`;
  }
}
