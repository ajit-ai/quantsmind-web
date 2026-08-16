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
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Anchor variant (external) -->
    <a
      *ngIf="href; else buttonTpl"
      [href]="href"
      [target]="target"
      [rel]="target === '_blank' ? 'noopener noreferrer' : null"
      [class]="buttonClass"
      [attr.aria-label]="ariaLabel || null"
    >
      <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
    </a>

    <!-- RouterLink variant -->
    <ng-template #buttonTpl>
      <a
        *ngIf="routerLinkValue; else nativeBtnTpl"
        [routerLink]="routerLinkValue"
        [class]="buttonClass"
        [attr.aria-label]="ariaLabel || null"
      >
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
      </a>
    </ng-template>

    <!-- Native button -->
    <ng-template #nativeBtnTpl>
      <button
        [type]="type"
        [disabled]="disabled"
        [class]="buttonClass"
        [attr.aria-label]="ariaLabel || null"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
      </button>
    </ng-template>

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
      gap: 8px;
      font-family: inherit;
      font-weight: 500;
      letter-spacing: -0.01em;
      border: 1px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 200ms ease, color 200ms ease,
                  border-color 200ms ease, box-shadow 200ms ease,
                  transform 150ms ease;
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
      padding: 16px 32px;
      border-radius: 10px;
    }

    /* Primary */
    .qm-btn--primary {
      background: #2563EB;
      color: #FFFFFF;
      border-color: #2563EB;
    }
    .qm-btn--primary:hover {
      background: #1D4ED8;
      border-color: #1D4ED8;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }
    .qm-btn--primary:active {
      transform: translateY(0);
      box-shadow: none;
    }

    /* Secondary */
    .qm-btn--secondary {
      background: #FFFFFF;
      color: #2563EB;
      border-color: #BFDBFE;
    }
    .qm-btn--secondary:hover {
      background: #EFF6FF;
      border-color: #2563EB;
    }

    /* Ghost */
    .qm-btn--ghost {
      background: transparent;
      color: #475569;
      border-color: transparent;
    }
    .qm-btn--ghost:hover {
      background: #F1F5F9;
      color: #111827;
    }

    /* Outline */
    .qm-btn--outline {
      background: transparent;
      color: #111827;
      border-color: #E2E8F0;
    }
    .qm-btn--outline:hover {
      border-color: #CBD5E1;
      background: #F8FAFC;
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
      outline: 2px solid #2563EB;
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
