import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { getPortfolioBySlug, TechnologyPortfolio } from '../../content/technology/portfolios';
import { getProductById } from '../../content/products/product.registry';
import { Product } from '../../content/products/product.model';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent } from '../../shared/components/qm-section/qm-section.component';

@Component({
  selector: 'qm-technology-portfolio',
  imports: [
    RouterModule,
    QmContainerComponent,
    QmSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Technology portfolio">
      <qm-container>
        @if (missing) {
          <div class="portfolio__missing" role="alert">
            <span class="eyebrow">PORTFOLIO NOT FOUND</span>
            <h1>We could not find that portfolio</h1>
            <a routerLink="/technology">← Back to Technology</a>
          </div>
        } @else if (portfolio) {
          <nav class="portfolio__crumbs" aria-label="Breadcrumb">
            <a routerLink="/technology">Technology</a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{{ portfolio.title }}</span>
          </nav>

          <header class="portfolio__head">
            <span class="eyebrow">TECHNOLOGY PORTFOLIO</span>
            <h1>{{ portfolio.title }}</h1>
            <p class="portfolio__lead">{{ portfolio.short }}</p>
            <p class="portfolio__purpose">{{ portfolio.purpose }}</p>
            <p class="portfolio__maturity">{{ portfolio.maturity }}</p>
          </header>

          <div class="portfolio__grid">
            <div class="portfolio__column">
              <section class="portfolio__block" aria-labelledby="pf-foundations">
                <h2 id="pf-foundations">Technical foundations</h2>
                <ul class="portfolio__foundations">
                  @for (foundation of portfolio.foundations; track foundation.name) {
                    <li>
                      @if (foundation.href) {
                        <a [routerLink]="foundation.href">{{ foundation.name }}</a>
                      } @else {
                        <span>{{ foundation.name }}</span>
                      }
                      <span class="portfolio__foundation-status">{{ foundation.status }}</span>
                    </li>
                  }
                </ul>
              </section>

              <section class="portfolio__block" aria-labelledby="pf-architecture">
                <h2 id="pf-architecture">Architecture &amp; design approach</h2>
                <p>{{ portfolio.architecture }}</p>
              </section>

              <section class="portfolio__block" aria-labelledby="pf-evidence">
                <h2 id="pf-evidence">What exists today</h2>
                <p>{{ portfolio.evidence }}</p>
              </section>

              @if (relatedProducts.length) {
                <section class="portfolio__block" aria-labelledby="pf-products">
                  <h2 id="pf-products">Related products</h2>
                  <ul class="portfolio__products">
                    @for (product of relatedProducts; track product.id) {
                      <li>
                        <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
                        <span class="portfolio__product-meta">{{ maturityLabel(product.maturity) }}{{ product.version ? ' · ' + product.version : '' }}</span>
                      </li>
                    }
                  </ul>
                  <a class="portfolio__store-link" routerLink="/products">Browse the Products Store →</a>
                </section>
              }
            </div>

            <aside class="portfolio__aside">
              <section class="portfolio__card" aria-labelledby="pf-boundaries">
                <h2 id="pf-boundaries">Research boundaries</h2>
                <ul>
                  @for (boundary of portfolio.boundaries; track boundary) {
                    <li>{{ boundary }}</li>
                  }
                </ul>
              </section>

              <section class="portfolio__card" aria-labelledby="pf-direction">
                <h2 id="pf-direction">Where it goes next</h2>
                <p>{{ portfolio.direction }}</p>
              </section>

              @if (portfolio.docs.length) {
                <section class="portfolio__card" aria-labelledby="pf-docs">
                  <h2 id="pf-docs">Documentation</h2>
                  <ul class="portfolio__docs">
                    @for (doc of portfolio.docs; track doc.url) {
                      <li><a [href]="doc.url" target="_blank" rel="noopener noreferrer">{{ doc.label }} ↗</a></li>
                    }
                  </ul>
                </section>
              }

              <section class="portfolio__card portfolio__card--accent">
                <h2>Need this capability?</h2>
                <p>Portfolio work is delivered as bounded engagements.</p>
                <a class="portfolio__contact" routerLink="/contact" [queryParams]="{ portfolio: portfolio.slug }">Discuss Your Requirement →</a>
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
    .portfolio__crumbs { display: flex; gap: 8px; padding: 20px 0 0; font-size: 13px; color: var(--color-text-muted); }
    .portfolio__crumbs a { color: var(--color-accent); text-decoration: none; }
    .portfolio__head { padding: 16px 0 24px; max-width: 880px; display: flex; flex-direction: column; gap: 12px; }
    h1 { margin: 0; font-size: clamp(30px, 4.6vw, 44px); line-height: 1.12; }
    .portfolio__lead { margin: 0; color: var(--color-accent); font-weight: 600; font-size: 16px; }
    .portfolio__purpose { margin: 0; color: var(--color-text-secondary); line-height: 1.65; font-size: 17px; max-width: 720px; }
    .portfolio__maturity { margin: 0; font-size: 13px; color: var(--color-text-muted); }
    .portfolio__grid { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(280px, 1fr); gap: 28px; align-items: start; }
    .portfolio__column { display: flex; flex-direction: column; gap: 26px; }
    .portfolio__block h2 { margin: 0 0 8px; font-size: 20px; }
    .portfolio__block p { margin: 0; color: var(--color-text-secondary); line-height: 1.65; }
    .portfolio__foundations { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .portfolio__foundations li { display: flex; flex-direction: column; padding: 12px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-md, 10px); }
    .portfolio__foundations a { color: var(--color-accent); font-weight: 600; text-decoration: none; }
    .portfolio__foundation-status { font-size: 13px; color: var(--color-text-muted); }
    .portfolio__products { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .portfolio__products li { display: flex; justify-content: space-between; gap: 12px; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md, 10px); align-items: baseline; }
    .portfolio__products a { color: var(--color-accent); text-decoration: none; font-weight: 600; }
    .portfolio__product-meta { font-size: 13px; color: var(--color-text-muted); white-space: nowrap; }
    .portfolio__store-link { display: inline-block; margin-top: 10px; color: var(--color-accent); text-decoration: none; font-weight: 600; }
    .portfolio__aside { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 88px; }
    .portfolio__card { padding: 18px; border: 1px solid var(--color-border); border-radius: var(--radius-lg, 14px); background: #fff; display: flex; flex-direction: column; gap: 8px; }
    .portfolio__card h2 { margin: 0; font-size: 15px; }
    .portfolio__card ul { margin: 0; padding-left: 18px; color: var(--color-text-secondary); line-height: 1.6; font-size: 14px; }
    .portfolio__card p { margin: 0; color: var(--color-text-secondary); line-height: 1.6; font-size: 14px; }
    .portfolio__card--accent { border-color: var(--color-accent); background: var(--color-accent-subtle, #eff6ff); }
    .portfolio__docs { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px; }
    .portfolio__docs a { color: var(--color-accent); text-decoration: none; }
    .portfolio__contact { color: var(--color-accent); text-decoration: none; font-weight: 700; }
    .portfolio__missing { padding: 48px 0; display: flex; flex-direction: column; gap: 12px; }
    .portfolio__missing a { color: var(--color-accent); }
    @media (max-width: 900px) {
      .portfolio__grid { grid-template-columns: 1fr; }
      .portfolio__aside { position: static; }
      .portfolio__products li { flex-direction: column; gap: 2px; }
    }
  `]
})
export class TechnologyPortfolioComponent {
  private readonly route = inject(ActivatedRoute);

  readonly portfolio: TechnologyPortfolio | null;
  readonly missing: boolean;

  constructor() {
    const slug = this.route.snapshot.paramMap.get('portfolio') ?? '';
    this.portfolio = getPortfolioBySlug(slug) ?? null;
    this.missing = !this.portfolio;
  }

  get relatedProducts(): Product[] {
    if (!this.portfolio) { return []; }
    return this.portfolio.relatedProductIds
      .map(id => getProductById(id))
      .filter((p): p is Product => Boolean(p));
  }

  maturityLabel(maturity: Product['maturity']): string {
    switch (maturity) {
      case 'released': return 'Released';
      case 'developer-preview': return 'Developer Preview';
      case 'alpha': return 'Alpha';
      case 'beta': return 'Beta';
      case 'in-development': return 'In Development';
      case 'proposed': return 'Proposed';
      case 'research-prototype': return 'Research Prototype';
      default: return maturity;
    }
  }
}
