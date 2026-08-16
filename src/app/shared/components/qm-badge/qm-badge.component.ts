import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant =
  | 'default'
  | 'concept' | 'research' | 'experimental' | 'prototype'
  | 'development' | 'early-access' | 'product'
  | 'ai' | 'data' | 'cloud' | 'software' | 'quantum' | 'optimization'
  | 'build' | 'modernize' | 'explore';

/**
 * QmBadge
 * Compact label for categories, maturity states, and entry-point signals.
 */
@Component({
  selector: 'qm-badge',
  standalone: true,
  imports: [CommonModule],
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
    .qm-badge--default       { background: #F1F5F9; color: #475569; border-color: #CBD5E1; }

    /* Maturity states */
    .qm-badge--concept       { background: #F1F5F9; color: #475569; border-color: #CBD5E1; }
    .qm-badge--research      { background: #FEF3C7; color: #92400E; border-color: #FDE68A; }
    .qm-badge--experimental  { background: #E0F2FE; color: #0369A1; border-color: #BAE6FD; }
    .qm-badge--prototype     { background: #F3E8FF; color: #7C3AED; border-color: #DDD6FE; }
    .qm-badge--development   { background: #DCFCE7; color: #166534; border-color: #BBF7D0; }
    .qm-badge--early-access  { background: #EFF6FF; color: #1D4ED8; border-color: #BFDBFE; }
    .qm-badge--product       { background: #2563EB; color: #FFFFFF; border-color: transparent; }

    /* Domain categories */
    .qm-badge--ai            { background: #EDE9FE; color: #5B21B6; border-color: #DDD6FE; }
    .qm-badge--data          { background: #E0F2FE; color: #0C4A6E; border-color: #BAE6FD; }
    .qm-badge--cloud         { background: #ECFDF5; color: #065F46; border-color: #A7F3D0; }
    .qm-badge--software      { background: #F0F9FF; color: #0369A1; border-color: #BAE6FD; }
    .qm-badge--quantum       { background: #0F172A; color: #94A3B8; border-color: #334155; }
    .qm-badge--optimization  { background: #FFF7ED; color: #C2410C; border-color: #FED7AA; }

    /* Entry-point tags */
    .qm-badge--build         { background: #EFF6FF; color: #2563EB; border-color: #BFDBFE; }
    .qm-badge--modernize     { background: #E0F2FE; color: #0369A1; border-color: #BAE6FD; }
    .qm-badge--explore       { background: #EDE9FE; color: #5B21B6; border-color: #DDD6FE; }
  `]
})
export class QmBadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() ariaLabel?: string;

  get badgeClass(): string {
    return `qm-badge qm-badge--${this.variant}`;
  }
}
