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
    template: `<section [class]="sectionClass" [attr.aria-label]="ariaLabel || null"><ng-content></ng-content></section>`,
    styles: [`
    :host { display: block; scroll-margin-top: 88px; }

    .qm-section {
      padding-top: 80px;
      padding-bottom: 80px;
    }
    .qm-section--sm {
      padding-top: 48px;
      padding-bottom: 48px;
    }
    .qm-section--lg {
      padding-top: 96px;
      padding-bottom: 96px;
    }
    @media (min-width: 768px) {
      .qm-section     { padding-top: 96px;  padding-bottom: 96px; }
      .qm-section--sm { padding-top: 64px;  padding-bottom: 64px; }
      .qm-section--lg { padding-top: 128px; padding-bottom: 128px; }
    }

    .surface-canvas  { background-color: #F8FAFC; }
    .surface-white   { background-color: #FFFFFF; }
    .surface-subtle  { background-color: #F1F5F9; }
    .surface-accent  { background-color: #EFF6FF; }
    .surface-dark    { background-color: #0F172A; color: #F1F5F9; }
  `]
})
export class QmSectionComponent {
  @Input() size: SectionSize       = 'md';
  @Input() surface: SectionSurface = 'canvas';
  @Input() ariaLabel?: string;

  get sectionClass(): string {
    const classes = ['qm-section'];
    if (this.size !== 'md') classes.push(`qm-section--${this.size}`);
    classes.push(`surface-${this.surface}`);
    return classes.join(' ');
  }
}
