import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { getResearchItemBySlug, ResearchItem } from '../../content/research/research-items';
import { getProductById, isAvailableProduct } from '../../content/products/product.registry';
import { Product } from '../../content/products/product.model';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent } from '../../shared/components/qm-section/qm-section.component';
import { QmBadgeComponent } from '../../shared/components/qm-badge/qm-badge.component';

@Component({
  selector: 'qm-research-detail',
  imports: [
    RouterModule,
    QmContainerComponent,
    QmSectionComponent,
    QmBadgeComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Research detail">
      <qm-container>
        @if (missing) {
          <div class="research-detail__missing" role="alert">
            <span class="eyebrow">RESEARCH NOT FOUND</span>
            <h1>We could not find that research item</h1>
            <a routerLink="/labs">← Back to Labs &amp; Research</a>
          </div>
        } @else if (item) {
          <nav class="research-detail__crumbs" aria-label="Breadcrumb">
            <a routerLink="/labs">Labs &amp; Research</a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{{ item.name }}</span>
          </nav>

          <header class="research-detail__head">
            <span class="eyebrow">RESEARCH · {{ item.theme.toUpperCase() }}</span>
            <h1>{{ item.name }}</h1>
            <div class="research-detail__badges">
              <qm-badge variant="research">{{ item.status }}</qm-badge>
            </div>
            <p class="research-detail__lead">{{ item.objective }}</p>
          </header>

          <div class="research-detail__grid">
            <div class="research-detail__column">
              <section class="research-detail__block" aria-labelledby="rd-problem">
                <h2 id="rd-problem">Problem or hypothesis</h2>
                <p>{{ item.problem }}</p>
              </section>

              <section class="research-detail__block" aria-labelledby="rd-methodology">
                <h2 id="rd-methodology">Methodology</h2>
                <p>{{ item.methodology }}</p>
              </section>

              <section class="research-detail__block" aria-labelledby="rd-evidence">
                <h2 id="rd-evidence">What the evidence shows</h2>
                <p>{{ item.evidence }}</p>
              </section>

              @if (item.limitations.length) {
                <section class="research-detail__block" aria-labelledby="rd-limits">
                  <h2 id="rd-limits">Limitations</h2>
                  <ul>
                    @for (limitation of item.limitations; track limitation) {
                      <li>{{ limitation }}</li>
                    }
                  </ul>
                </section>
              }

              <section class="research-detail__block" aria-labelledby="rd-next">
                <h2 id="rd-next">Next milestone</h2>
                <p>{{ item.nextMilestone }}</p>
              </section>
            </div>

            <aside class="research-detail__aside">
              @if (item.repoUrl || item.links.length) {
                <section class="research-detail__card" aria-labelledby="rd-links">
                  <h2 id="rd-links">Evidence &amp; code</h2>
                  <ul class="research-detail__links">
                    @if (item.repoUrl) {
                      <li><a [href]="item.repoUrl" target="_blank" rel="noopener noreferrer">Repository on GitHub ↗</a></li>
                    }
                    @for (link of item.links; track link.url) {
                      <li><a [href]="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }} ↗</a></li>
                    }
                  </ul>
                </section>
              }

              @if (relatedProduct) {
                <section class="research-detail__card" aria-labelledby="rd-product">
                  <h2 id="rd-product">Related product</h2>
                  <p>This effort relates to a product entry.</p>
                  <a class="research-detail__product-link"
                     [routerLink]="relatedProduct.dedicatedRoute ?? ['/products', relatedProduct.id]">
                    {{ relatedProduct.name }} →
                  </a>
                </section>
              }

              <section class="research-detail__card" aria-labelledby="rd-note">
                <h2 id="rd-note">What this is — and is not</h2>
                <p>Labs &amp; Research documents experiments and feasibility work. Inclusion here is not a claim of a validated outcome, a release, or a product.</p>
              </section>
            </aside>
          </div>
        }
      </qm-container>
    </qm-section>
  `,
  styles: [`
    :host { display: block; }
    .eyebrow { font-size: 12px; letter-spacing: 0.08em; font-weight: 700; color: var(--color-accent); }
    .research-detail__crumbs { display: flex; gap: 8px; padding: 20px 0 0; font-size: 13px; color: var(--color-text-muted); }
    .research-detail__crumbs a { color: var(--color-accent); text-decoration: none; }
    .research-detail__head { padding: 16px 0 24px; max-width: 880px; display: flex; flex-direction: column; gap: 12px; }
    h1 { margin: 0; font-size: clamp(28px, 4.4vw, 42px); line-height: 1.14; }
    .research-detail__badges { display: flex; gap: 8px; }
    .research-detail__lead { margin: 0; color: var(--color-text-secondary); font-size: 17px; line-height: 1.65; }
    .research-detail__grid { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(280px, 1fr); gap: 28px; align-items: start; }
    .research-detail__column { display: flex; flex-direction: column; gap: 26px; }
    .research-detail__block h2 { margin: 0 0 8px; font-size: 20px; }
    .research-detail__block p { margin: 0; color: var(--color-text-secondary); line-height: 1.65; }
    .research-detail__block ul { margin: 0; padding-left: 20px; color: var(--color-text-secondary); line-height: 1.65; }
    .research-detail__block li { margin-bottom: 6px; }
    .research-detail__aside { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 88px; }
    .research-detail__card { padding: 18px; border: 1px solid var(--color-border); border-radius: var(--radius-lg, 14px); background: #fff; display: flex; flex-direction: column; gap: 8px; }
    .research-detail__card h2 { margin: 0; font-size: 15px; }
    .research-detail__card p { margin: 0; color: var(--color-text-secondary); line-height: 1.6; font-size: 14px; }
    .research-detail__links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
    .research-detail__links a { color: var(--color-accent); text-decoration: none; overflow-wrap: anywhere; }
    .research-detail__product-link { color: var(--color-accent); text-decoration: none; font-weight: 700; }
    .research-detail__missing { padding: 48px 0; display: flex; flex-direction: column; gap: 12px; }
    .research-detail__missing a { color: var(--color-accent); }
    @media (max-width: 900px) {
      .research-detail__grid { grid-template-columns: 1fr; }
      .research-detail__aside { position: static; }
    }
  `]
})
export class ResearchDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly item: ResearchItem | null;
  readonly missing: boolean;

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.item = getResearchItemBySlug(slug) ?? null;
    this.missing = !this.item;
  }

  get relatedProduct(): Product | null {
    if (!this.item?.relatedProductId) { return null; }
    const product = getProductById(this.item.relatedProductId);
    return product ?? null;
  }

  get isRelatedAvailable(): boolean {
    return this.relatedProduct ? isAvailableProduct(this.relatedProduct) : false;
  }
}
