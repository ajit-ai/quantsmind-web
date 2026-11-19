import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { getReleaseHistory, ReleaseRecord } from '../../content/products/product.registry';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent } from '../../shared/components/qm-section/qm-section.component';

@Component({
  selector: 'app-releases',
  imports: [RouterModule, QmContainerComponent, QmSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Release information">
      <qm-container>
        <span class="eyebrow">RELEASE INFORMATION</span>
        <h1>QuantsMind release history</h1>
        <p class="lead">Verified public releases across QuantsMind software, newest first. Versions are never rewritten after the fact: each entry records exactly what was verified on its date.</p>

        <div class="releases__list">
          @for (record of records; track record.product.id + record.version) {
            <article class="releases__item">
              <div class="releases__item-head">
                <a class="releases__product" [routerLink]="record.product.dedicatedRoute ?? ['/products', record.product.id]">{{ record.product.name }}</a>
                <span class="releases__version">{{ record.version }}</span>
                @if (record.date) {
                  <time class="releases__date">{{ record.date }}</time>
                }
              </div>
              <p class="releases__notes">{{ record.notes }}</p>
            </article>
          }
        </div>

        <footer class="releases__foot">
          <p class="note">Karkain v1.2.0 was built locally; the CI release matrix could not run, as stated in its release notes. Website releases are documented in the repository docs directory. No release on this page implies production readiness; maturity is stated per product.</p>
          <a routerLink="/products">Browse the Products Store →</a>
        </footer>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    :host { display: block; }
    .eyebrow { font-size: 12px; letter-spacing: 0.08em; font-weight: 700; color: var(--color-accent); }
    h1 { margin: 8px 0 12px; font-size: clamp(30px, 4.4vw, 44px); line-height: 1.14; }
    .lead { color: var(--color-text-secondary); font-size: 17px; line-height: 1.65; max-width: 780px; }
    .releases__list { display: flex; flex-direction: column; gap: 12px; margin: 24px 0 28px; }
    .releases__item { border: 1px solid var(--color-border); border-radius: var(--radius-lg, 14px); padding: 16px 18px; background: #fff; }
    .releases__item-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px; }
    .releases__product { color: var(--color-accent); font-weight: 700; text-decoration: none; }
    .releases__product:hover { text-decoration: underline; }
    .releases__version { font-weight: 700; color: var(--color-text-primary); }
    .releases__date { color: var(--color-text-muted); font-size: 13px; }
    .releases__notes { margin: 8px 0 0; color: var(--color-text-secondary); line-height: 1.6; }
    .releases__foot { display: flex; flex-direction: column; gap: 10px; border-top: 1px solid var(--color-border); padding-top: 18px; }
    .note { margin: 0; font-size: 13px; color: var(--color-text-muted); line-height: 1.6; max-width: 780px; }
    .releases__foot a { color: var(--color-accent); font-weight: 600; }
  `]
})
export class ReleasesComponent {
  readonly records: readonly ReleaseRecord[] = getReleaseHistory();
}
