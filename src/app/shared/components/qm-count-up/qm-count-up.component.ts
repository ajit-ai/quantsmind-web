import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  inject,
  signal
} from '@angular/core';

/**
 * QmCountUp
 *
 * A small, dependency-free number counter used in stat strips.
 * It renders the final value immediately when motion is reduced or
 * IntersectionObserver is unavailable.
 */
@Component({
  selector: 'qm-count-up',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="qm-tabular">{{ display() }}</span>`,
  styles: [`
    :host { display: inline; }
    span { font-variant-numeric: tabular-nums; }
  `]
})
export class QmCountUpComponent implements AfterViewInit, OnDestroy {
  @Input() end = 0;
  @Input() duration = 1600;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() decimals = 0;

  readonly display = signal('0');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;
  private frame?: number;

  ngAfterViewInit(): void {
    this.display.set(this.format(this.end));

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return;
    }

    this.display.set(this.format(0));

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) {
            return;
          }

          this.observer?.disconnect();
          this.animate();
        },
        { threshold: 0.4 }
      );

      this.observer.observe(this.host.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }

  private animate(): void {
    const start = performance.now();
    const end = this.end;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.display.set(this.format(end * eased));

      if (progress < 1) {
        this.frame = requestAnimationFrame(tick);
      }
    };

    this.frame = requestAnimationFrame(tick);
  }

  private format(value: number): string {
    return `${this.prefix}${value.toFixed(this.decimals)}${this.suffix}`;
  }
}
