import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


export type SectionSize    = 'sm' | 'md' | 'lg';
export type SectionSurface = 'canvas' | 'white' | 'subtle' | 'accent' | 'dark';

/**
 * QmSection
 * Vertical spacing wrapper with surface colour variants.
 * Wraps QmContainer internally when layout="contained" (default).
 */
@Component({
    selector: 'qm-section',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<section [class]="sectionClass" [attr.id]="id || null" [attr.aria-label]="ariaLabel || null"><ng-content></ng-content></section>`,
    styles: [`
    :host { display: block; scroll-margin-top: 88px; }

    .qm-section {
      padding-top: 64px;
      padding-bottom: 64px;
    }
    .qm-section--sm {
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .qm-section--lg {
      padding-top: 80px;
      padding-bottom: 80px;
    }
    @media (min-width: 768px) {
      .qm-section     { padding-top: 80px;  padding-bottom: 80px; }
      .qm-section--sm { padding-top: 56px;  padding-bottom: 56px; }
      .qm-section--lg { padding-top: 104px; padding-bottom: 104px; }
    }

    .surface-canvas  { background-color: var(--color-canvas); }
    .surface-white   { background-color: var(--color-surface); }
    .surface-subtle  { background-color: var(--color-surface-subtle); }
    .surface-accent  { background-color: var(--color-accent-subtle); }
    .surface-dark    { background-color: var(--color-dark-canvas); color: var(--color-dark-text); }
  `]
})
export class QmSectionComponent {
  @Input() size: SectionSize       = 'md';
  @Input() surface: SectionSurface = 'canvas';
  @Input() ariaLabel?: string;
  /**
   * Anchor target. Applied to the inner <section> so in-page fragments
   * (e.g. /technology#developer-tools) resolve to a real element.
   */
  @Input() id?: string;

  get sectionClass(): string {
    const classes = ['qm-section'];
    if (this.size !== 'md') classes.push(`qm-section--${this.size}`);
    classes.push(`surface-${this.surface}`);
    return classes.join(' ');
  }
}
