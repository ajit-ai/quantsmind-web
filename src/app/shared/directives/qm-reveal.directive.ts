import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  inject
} from '@angular/core';

/**
 * QmReveal
 *
 * Adds a restrained enter animation when an element scrolls into view.
 * The hidden state is only applied after the directive has confirmed
 * IntersectionObserver support, so content remains visible without JS.
 */
@Directive({
  selector: '[qmReveal]',
  standalone: true
})
export class QmRevealDirective implements AfterViewInit, OnDestroy {
  /** Optional stagger in milliseconds. */
  @Input() qmRevealDelay = 0;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const element = this.host.nativeElement;
    document.documentElement.classList.add('qm-js', 'qm-reveal-ready');
    element.style.setProperty('--qm-reveal-delay', `${this.qmRevealDelay}ms`);

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }

            entry.target.classList.add('qm-reveal--in');
            this.observer?.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
