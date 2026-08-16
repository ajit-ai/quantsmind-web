import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


export type ContainerSize = 'default' | 'narrow' | 'wide';

/**
 * QmContainer
 * Responsive max-width wrapper with consistent horizontal padding.
 * Use this as the primary layout constraint for page content.
 */
@Component({
    selector: 'qm-container',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div [class]="containerClass">
      <ng-content></ng-content>
    </div>
  `,
    styles: [`
    :host {
      display: block;
    }
    .qm-container {
      width: 100%;
      max-width: var(--container-max, 1280px);
      margin-left: auto;
      margin-right: auto;
      padding-left: 16px;
      padding-right: 16px;
    }
    @media (min-width: 768px) {
      .qm-container {
        padding-left: 32px;
        padding-right: 32px;
      }
    }
    .qm-container--narrow {
      max-width: 900px;
    }
    .qm-container--wide {
      max-width: 1440px;
    }
  `]
})
export class QmContainerComponent {
  @Input() size: ContainerSize = 'default';

  get containerClass(): string {
    const classes = ['qm-container'];
    if (this.size === 'narrow') classes.push('qm-container--narrow');
    if (this.size === 'wide') classes.push('qm-container--wide');
    return classes.join(' ');
  }
}
