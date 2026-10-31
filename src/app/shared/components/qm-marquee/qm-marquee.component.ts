import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * QmMarquee
 *
 * A quiet capability ticker. Content is duplicated for a seamless loop
 * and the duplicate is hidden from assistive technology.
 */
@Component({
  selector: 'qm-marquee',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="qm-marquee" [attr.aria-label]="label || null">
      <div class="qm-marquee__track" [style.animation-duration]="duration + 's'">
        <span class="qm-marquee__group">
          @for (item of items; track item) {
            <span class="qm-marquee__item">{{ item }}</span>
          }
        </span>
        <span class="qm-marquee__group" aria-hidden="true">
          @for (item of items; track item) {
            <span class="qm-marquee__item">{{ item }}</span>
          }
        </span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .qm-marquee__track { gap: 0; }
    .qm-marquee__group {
      display: inline-flex;
      align-items: center;
      gap: 40px;
      padding-right: 40px;
    }
  `]
})
export class QmMarqueeComponent {
  @Input() items: string[] = [];
  @Input() duration = 38;
  @Input() label = '';
}
