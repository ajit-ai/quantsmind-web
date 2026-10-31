import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { QmContainerComponent } from '../qm-container/qm-container.component';

export type PageHeroTone = 'blue' | 'labs' | 'sdk' | 'quantum';

/**
 * QmPageHero
 *
 * The shared editorial hero used by interior pages. It supplies the
 * precision-grid background, copy rhythm and an optional orbital artwork
 * while leaving actions, metadata and bespoke visuals to projection.
 */
@Component({
  selector: 'qm-page-hero',
  standalone: true,
  imports: [QmContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="qm-page-hero"
      [class.qm-page-hero--labs]="tone === 'labs'"
      [class.qm-page-hero--sdk]="tone === 'sdk'"
      [class.qm-page-hero--quantum]="tone === 'quantum'"
      [attr.aria-label]="ariaLabel || null">
      <qm-container>
        <div class="qm-page-hero__grid" [class.qm-page-hero__grid--solo]="art === 'none' && !hasProjectedArt">
          <div class="qm-page-hero__copy">
            @if (eyebrow) {
              <span class="eyebrow">{{ eyebrow }}</span>
            }
            <ng-content select="[heroBadge]"></ng-content>
            <h1>
              @if (title) {
                {{ title }}
              }
              <ng-content select="[heroTitle]"></ng-content>
            </h1>
            @if (lead) {
              <p class="qm-page-hero__lead">{{ lead }}</p>
            }
            <ng-content select="[heroLead]"></ng-content>
            <div class="qm-page-hero__actions">
              <ng-content select="[heroActions]"></ng-content>
            </div>
            <ng-content select="[heroMeta]"></ng-content>
            <ng-content select="[heroExtra]"></ng-content>
          </div>

          <div class="qm-page-hero__art">
            <ng-content select="[heroArt]"></ng-content>
            @if (art === 'orbit') {
              <div class="qm-orbit" aria-hidden="true">
                <span class="qm-orbit__ring"></span>
                <span class="qm-orbit__ring qm-orbit__ring--2"></span>
                <span class="qm-orbit__ring qm-orbit__ring--3"></span>
                <span class="qm-orbit__core">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>
                    <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(35 12 12)"/>
                    <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(-35 12 12)"/>
                    <circle cx="19" cy="6" r="1.4" fill="currentColor" stroke="none"/>
                  </svg>
                </span>
                @for (label of artLabels.slice(0, 4); track label; let i = $index) {
                  <span [class]="'qm-orbit__satellite qm-orbit__satellite--' + satelliteClass(i)">{{ label }}</span>
                }
              </div>
            }
          </div>
        </div>
      </qm-container>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .qm-page-hero__actions:empty,
    .qm-page-hero__meta:empty {
      display: none;
    }

    .qm-page-hero__art:empty {
      display: none;
    }

    .qm-page-hero__copy > .eyebrow + * {
      margin-top: 0;
    }

    @media (max-width: 1023px) {
      .qm-page-hero__art {
        max-width: 420px;
        margin: 0 auto;
        width: 100%;
      }
    }
  `]
})
export class QmPageHeroComponent {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() lead = '';
  @Input() tone: PageHeroTone = 'blue';
  @Input() art: 'orbit' | 'none' = 'orbit';
  @Input() artLabels: string[] = ['Engineering', 'Intelligence', 'Cloud', 'Research'];
  @Input() ariaLabel = '';
  @Input() hasProjectedArt = false;

  satelliteClass(index: number): string {
    return ['a', 'b', 'c', 'd'][index] ?? 'a';
  }
}
