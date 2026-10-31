import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize    = 'sm' | 'md' | 'lg';

/**
 * QmButton
 * Accessible, keyboard-navigable button component.
 * Renders as <button> or <a> depending on [href]/[routerLink].
 */
@Component({
    selector: 'qm-button',
    imports: [CommonModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- Anchor variant (external) -->
    @if (href) {
      <a
        [href]="href"
        [target]="target"
        [rel]="target === '_blank' ? 'noopener noreferrer' : null"
        [class]="buttonClass"
        [attr.aria-label]="ariaLabel || null"
        >
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
      </a>
    } @else {
      @if (routerLinkValue) {
        <a
          [routerLink]="routerLinkValue"
          [fragment]="fragment"
          [class]="buttonClass"
          [attr.aria-label]="ariaLabel || null"
          >
          <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </a>
      } @else {
        <button
          [type]="type"
          [disabled]="disabled"
          [class]="buttonClass"
          [attr.aria-label]="ariaLabel || null"
          (click)="handleClick($event)"
          >
          <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </button>
      }
    }
    
    <!-- RouterLink variant -->
    
    <!-- Native button -->
    
    <!-- Shared content -->
    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
    `,
    styles: [`
    :host { display: inline-block; }

    .qm-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: inherit;
      font-weight: 600;
      letter-spacing: -0.01em;
      border: 1px solid transparent;
      border-radius: 10px;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 200ms ease, color 200ms ease,
                  border-color 200ms ease, box-shadow 250ms ease,
                  transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
    }

    /* Sizes */
    .qm-btn--sm {
      font-size: 13px;
      padding: 8px 16px;
    }
    .qm-btn--md {
      font-size: 15px;
      padding: 12px 24px;
    }
    .qm-btn--lg {
      font-size: 16px;
      padding: 16px 30px;
      border-radius: 12px;
    }

    /* Primary */
    .qm-btn--primary {
      background: var(--gradient-brand, linear-gradient(135deg, #2563EB, #4F46E5 48%, #06B6D4));
      background-size: 140% 140%;
      background-position: 0% 50%;
      color: var(--color-text-inverse);
      border-color: transparent;
      box-shadow: 0 10px 26px -12px rgba(37, 99, 235, 0.55);
    }
    .qm-btn--primary:hover {
      background-position: 100% 50%;
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 18px 38px -14px rgba(37, 99, 235, 0.65);
      text-decoration: none;
    }
    .qm-btn--primary:active {
      transform: translateY(0);
      box-shadow: 0 6px 16px -10px rgba(37, 99, 235, 0.45);
    }

    /* Secondary */
    .qm-btn--secondary {
      background: rgba(255, 255, 255, 0.82);
      color: var(--color-accent-dark);
      border-color: rgba(37, 99, 235, 0.22);
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    }
    .qm-btn--secondary:hover {
      background: #fff;
      border-color: var(--color-accent);
      color: var(--color-accent-dark);
      transform: translateY(-1px);
      box-shadow: 0 12px 26px -16px rgba(37, 99, 235, 0.4);
      text-decoration: none;
    }

    /* Ghost */
    .qm-btn--ghost {
      background: transparent;
      color: var(--color-text-secondary);
      border-color: transparent;
    }
    .qm-btn--ghost:hover {
      background: var(--color-surface-subtle);
      color: var(--color-text-primary);
    }

    /* Outline */
    .qm-btn--outline {
      background: transparent;
      color: var(--color-text-primary);
      border-color: var(--color-border);
    }
    .qm-btn--outline:hover {
      border-color: var(--color-border-strong);
      background: var(--color-canvas);
    }

    /* Disabled */
    .qm-btn:disabled,
    .qm-btn--disabled {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Focus */
    .qm-btn:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 3px;
    }

    /* Full width */
    .qm-btn--full {
      width: 100%;
      justify-content: center;
    }

    @media (prefers-reduced-motion: reduce) {
      .qm-btn { transition: none; }
      .qm-btn:hover { transform: none; }
    }
  `]
})
export class QmButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize       = 'md';
  @Input() href?: string;
  @Input() routerLinkValue?: string | string[];
  @Input() fragment?: string;
  @Input() target: string         = '_self';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled               = false;
  @Input() fullWidth              = false;
  @Input() ariaLabel?: string;

  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClass(): string {
    const classes = ['qm-btn', `qm-btn--${this.variant}`, `qm-btn--${this.size}`];
    if (this.disabled)  classes.push('qm-btn--disabled');
    if (this.fullWidth) classes.push('qm-btn--full');
    return classes.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) this.clicked.emit(event);
  }
}
