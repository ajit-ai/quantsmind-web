import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { getProductById, getAllProducts } from '../../../content/products/product.registry';
import {
  Product,
  PRODUCT_CATEGORY_LABELS,
  availabilityBadgeVariant as availabilityBadgeVariantFor,
  availabilityLabel as availabilityLabelFor,
  isAvailableProduct,
  maturityBadgeVariant as maturityBadgeVariantFor,
  maturityLabel as maturityLabelFor
} from '../../../content/products/product.model';
import { BadgeVariant, QmBadgeComponent } from '../qm-badge/qm-badge.component';
import { QmContainerComponent } from '../qm-container/qm-container.component';
import { QmSectionComponent } from '../qm-section/qm-section.component';

@Component({
  selector: 'qm-product-detail',
  imports: [
    RouterModule,
    QmBadgeComponent,
    QmContainerComponent,
    QmSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Product detail">
      <qm-container>
        @if (missing) {
          <div class="qm-product-detail__missing" role="alert">
            <span class="eyebrow">PRODUCT NOT FOUND</span>
            <h1>We could not find that product</h1>
            <p>The product identifier does not match anything in the QuantsMind product registry.</p>
            <a routerLink="/products">← Back to the Products Store</a>
          </div>
        } @else if (product) {
          <nav class="qm-product-detail__crumbs" aria-label="Breadcrumb">
            <a routerLink="/products">Products</a>
            @if (categoryLabel) {
              <span aria-hidden="true">›</span>
              <a [routerLink]="['/products/category', product.category]">{{ categoryLabel }}</a>
            }
            <span aria-hidden="true">›</span>
            <span aria-current="page">{{ product.name }}</span>
          </nav>

          <article class="qm-product-detail__article">
            <header class="qm-product-detail__head">
              <span class="eyebrow">{{ categoryLabel }}</span>
              <h1>{{ product.name }}</h1>
              <p class="qm-product-detail__lead">{{ product.summary }}</p>
              <div class="qm-product-detail__badges" aria-label="Product status">
                <qm-badge [variant]="maturityBadgeVariant(product.maturity)">{{ maturityLabel }}</qm-badge>
                <qm-badge [variant]="availabilityBadgeVariant(product.availability)">{{ availabilityLabel }}</qm-badge>
                @if (product.version) {
                  <span class="qm-product-detail__version">{{ product.version }}</span>
                }
                @if (product.releaseChannel) {
                  <span class="qm-product-detail__version">{{ product.releaseChannel }}</span>
                }
              </div>
              <p class="qm-product-detail__verified">
                {{ isAvailable ? 'Available today' : 'Not available yet' }}{{ product.lastVerified ? ' · Claims last verified ' + product.lastVerified : '' }}
              </p>
            </header>

            <div class="qm-product-detail__grid">
              <div class="qm-product-detail__column">
                <section class="qm-product-detail__block" aria-labelledby="pd-overview">
                  <h2 id="pd-overview">Overview</h2>
                  <p>{{ product.description }}</p>
                </section>

                @if (product.useCases?.length) {
                  <section class="qm-product-detail__block" aria-labelledby="pd-solves">
                    <h2 id="pd-solves">Problems it is designed to solve</h2>
                    <ul>
                      @for (item of product.useCases; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  </section>
                }

                @if (product.capabilities?.length) {
                  <section class="qm-product-detail__block" aria-labelledby="pd-capabilities">
                    <h2 id="pd-capabilities">{{ isAvailable ? 'Implemented capabilities' : 'Planned scope' }}</h2>
                    <ul>
                      @for (item of product.capabilities; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  </section>
                }

                @if (product.targetDomains?.length || product.targetClients?.length) {
                  <section class="qm-product-detail__block" aria-labelledby="pd-audience">
                    <h2 id="pd-audience">Who it is for</h2>
                    @if (product.targetDomains?.length) {
                      <p class="qm-product-detail__subhead">Domains</p>
                      <ul>
                        @for (item of product.targetDomains; track item) {
                          <li>{{ item }}</li>
                        }
                      </ul>
                    }
                    @if (product.targetClients?.length) {
                      <p class="qm-product-detail__subhead">Audience</p>
                      <ul>
                        @for (item of product.targetClients; track item) {
                          <li>{{ item }}</li>
                        }
                      </ul>
                    }
                  </section>
                }

                @if (product.releaseHistory?.length) {
                  <section class="qm-product-detail__block" aria-labelledby="pd-history">
                    <h2 id="pd-history">Release history</h2>
                    <ol class="qm-product-detail__history">
                      @for (entry of product.releaseHistory; track entry.version) {
                        <li>
                          <span class="qm-product-detail__history-version">{{ entry.version }}</span>
                          @if (entry.date) {
                            <time class="qm-product-detail__history-date">{{ entry.date }}</time>
                          }
                          <span class="qm-product-detail__history-notes">{{ entry.notes }}</span>
                        </li>
                      }
                    </ol>
                  </section>
                }

                @if (product.limitations?.length) {
                  <section class="qm-product-detail__block" aria-labelledby="pd-limits">
                    <h2 id="pd-limits">Known limitations</h2>
                    <ul>
                      @for (item of product.limitations; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  </section>
                }

                @if (relatedProducts.length) {
                  <section class="qm-product-detail__block" aria-labelledby="pd-related">
                    <h2 id="pd-related">Related products</h2>
                    <ul class="qm-product-detail__related">
                      @for (related of relatedProducts; track related.id) {
                        <li><a [routerLink]="detailLinkFor(related)">{{ related.name }}</a></li>
                      }
                    </ul>
                  </section>
                }
              </div>

              <aside class="qm-product-detail__aside" aria-label="Get this product">
                @if (isAvailable) {
                  <div class="qm-product-detail__get">
                    <h2>Install or get access</h2>
                    @if (product.installInstructions) {
                      <pre class="qm-product-detail__install">{{ product.installInstructions }}</pre>
                    }
                    <ul class="qm-product-detail__links">
                      @for (link of product.marketplaceUrls ?? []; track link.url) {
                        <li><a [href]="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }} ↗</a></li>
                      }
                      @for (link of product.packageUrls ?? []; track link.url) {
                        <li><a [href]="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }} ↗</a></li>
                      }
                      @if (product.repositoryUrl) {
                        <li><a [href]="product.repositoryUrl" target="_blank" rel="noopener noreferrer">Repository on GitHub ↗</a></li>
                      }
                      @if (product.documentationUrl) {
                        <li><a [href]="product.documentationUrl" target="_blank" rel="noopener noreferrer">Documentation ↗</a></li>
                      }
                    </ul>
                  </div>
                } @else {
                  <div class="qm-product-detail__get">
                    <h2>Availability</h2>
                    <p>{{ product.availabilityDetail ?? 'This product is not yet publicly available. Access and licences are arranged directly with QuantsMind.' }}</p>
                    <a class="qm-product-detail__explore" [routerLink]="ctaRoute" [queryParams]="ctaQueryParams">{{ ctaLabel }}</a>
                  </div>
                }

                <dl class="qm-product-detail__meta">
                  <div>
                    <dt>Category</dt>
                    <dd>{{ categoryLabel }}</dd>
                  </div>
                  <div>
                    <dt>Maturity</dt>
                    <dd>{{ maturityLabel }}</dd>
                  </div>
                  <div>
                    <dt>Availability</dt>
                    <dd>{{ availabilityLabel }}</dd>
                  </div>
                  @if (product.version) {
                    <div>
                      <dt>Version</dt>
                      <dd>{{ product.version }}</dd>
                    </div>
                  }
                  @if (product.releaseChannel) {
                    <div>
                      <dt>Release channel</dt>
                      <dd>{{ product.releaseChannel }}</dd>
                    </div>
                  }
                  @if (product.license) {
                    <div>
                      <dt>Licence</dt>
                      <dd>{{ product.license }}</dd>
                    </div>
                  }
                  @if (product.platforms?.length) {
                    <div>
                      <dt>Platforms</dt>
                      <dd>{{ product.platforms.join(' · ') }}</dd>
                    </div>
                  }
                  @if (product.systemRequirements) {
                    <div>
                      <dt>Requirements</dt>
                      <dd>{{ product.systemRequirements }}</dd>
                    </div>
                  }
                  @if (product.deployment) {
                    <div>
                      <dt>Deployment</dt>
                      <dd>{{ product.deployment }}</dd>
                    </div>
                  }
                  @if (product.lastVerified) {
                    <div>
                      <dt>Last verified</dt>
                      <dd>{{ product.lastVerified }}</dd>
                    </div>
                  }
                </dl>
              </aside>
            </div>

            <footer class="qm-product-detail__footer">
              <a class="qm-product-detail__back-link" routerLink="/products">← Back to the Products Store</a>
              @if (product.documentationUrl) {
                <a class="qm-product-detail__explore" [href]="product.documentationUrl" target="_blank" rel="noopener noreferrer">Documentation ↗</a>
              } @else {
                <a class="qm-product-detail__explore" [routerLink]="ctaRoute" [queryParams]="ctaQueryParams">{{ ctaLabel }}</a>
              }
            </footer>
          </article>
        }
      </qm-container>
    </qm-section>
  `,
  styles: [`
    :host { display: block; }
    .qm-product-detail__crumbs {
      display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
      padding: 20px 0 0; font-size: 13px; color: var(--color-text-muted);
    }
    .qm-product-detail__crumbs a { color: var(--color-accent); text-decoration: none; }
    .qm-product-detail__crumbs a:hover { text-decoration: underline; }
    .qm-product-detail__article { max-width: 1120px; }
    .qm-product-detail__head {
      display: flex; flex-direction: column; gap: 14px; padding: 16px 0 8px;
    }
    h1 { margin: 0; }
    .qm-product-detail__lead {
      max-width: 760px; margin: 0;
      color: var(--color-text-secondary); font-size: 17px; line-height: 1.65;
    }
    .qm-product-detail__back-link,
    .qm-product-detail__explore { color: var(--color-accent); text-decoration: none; }
    .qm-product-detail__back-link:hover,
    .qm-product-detail__explore:hover { text-decoration: underline; }
    .qm-product-detail__explore:focus-visible,
    .qm-product-detail__back-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 4px; }
    .qm-product-detail__badges { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .qm-product-detail__version { color: var(--color-text-muted); font-size: 13px; }
    .qm-product-detail__verified { margin: 0; font-size: 13px; color: var(--color-text-muted); }
    .qm-product-detail__grid {
      display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(280px, 1fr);
      gap: 32px; margin-top: 24px; align-items: start;
    }
    .qm-product-detail__column { display: flex; flex-direction: column; gap: 28px; }
    .qm-product-detail__block { display: flex; flex-direction: column; gap: 8px; }
    .qm-product-detail__block h2 { margin: 0; font-size: 19px; }
    .qm-product-detail__subhead { margin: 8px 0 0; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-muted); }
    .qm-product-detail__block p,
    .qm-product-detail__block ul,
    .qm-product-detail__block ol { margin: 0; color: var(--color-text-secondary); line-height: 1.65; overflow-wrap: anywhere; }
    .qm-product-detail__block ul,
    .qm-product-detail__block ol { padding-left: 20px; }
    .qm-product-detail__block li { margin-bottom: 6px; overflow-wrap: anywhere; }
    .qm-product-detail__block a { color: var(--color-accent); overflow-wrap: anywhere; }
    .qm-product-detail__history { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .qm-product-detail__history li { display: grid; grid-template-columns: 84px 110px minmax(0, 1fr); gap: 12px; align-items: baseline; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md, 10px); }
    .qm-product-detail__history-version { font-weight: 700; color: var(--color-text-primary); }
    .qm-product-detail__history-date { color: var(--color-text-muted); font-size: 13px; }
    .qm-product-detail__history-notes { color: var(--color-text-secondary); font-size: 14px; }
    .qm-product-detail__related { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
    .qm-product-detail__related a { display: inline-block; padding: 6px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); text-decoration: none; font-size: 13px; }
    .qm-product-detail__related a:hover { border-color: var(--color-accent); }
    .qm-product-detail__aside { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 88px; }
    .qm-product-detail__get {
      display: flex; flex-direction: column; gap: 10px;
      padding: 20px; border: 1px solid var(--color-border); border-radius: var(--radius-lg, 14px);
      background: var(--color-surface-white, #fff);
    }
    .qm-product-detail__get h2 { margin: 0; font-size: 17px; }
    .qm-product-detail__get p { margin: 0; color: var(--color-text-secondary); line-height: 1.6; }
    .qm-product-detail__install {
      margin: 0; padding: 12px; overflow-x: auto;
      background: #0f172a; color: #e2e8f0; border-radius: var(--radius-md, 10px);
      font-size: 13px; line-height: 1.6; white-space: pre-wrap; overflow-wrap: anywhere;
    }
    .qm-product-detail__links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .qm-product-detail__links a { color: var(--color-accent); text-decoration: none; font-weight: 600; }
    .qm-product-detail__links a:hover { text-decoration: underline; }
    .qm-product-detail__meta { display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 20px; border: 1px solid var(--color-border); border-radius: var(--radius-lg, 14px); }
    .qm-product-detail__meta div { display: grid; grid-template-columns: 132px minmax(0, 1fr); gap: 12px; }
    .qm-product-detail__meta dt { color: var(--color-text-muted); font-size: 13px; }
    .qm-product-detail__meta dd { margin: 0; color: var(--color-text-secondary); overflow-wrap: anywhere; }
    .qm-product-detail__footer {
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--color-border);
    }
    .qm-product-detail__missing { max-width: 720px; padding: 48px 0; display: flex; flex-direction: column; gap: 12px; }
    .qm-product-detail__missing a { color: var(--color-accent); }
    @media (max-width: 900px) {
      .qm-product-detail__grid { grid-template-columns: 1fr; }
      .qm-product-detail__aside { position: static; }
      .qm-product-detail__history li { grid-template-columns: 1fr; gap: 4px; }
      .qm-product-detail__footer { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class QmProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly missing: boolean;
  readonly product: Product | null;

  constructor() {
    const slug =
      this.route.snapshot.paramMap.get('slug')
      ?? (typeof this.route.snapshot.data['productId'] === 'string' ? this.route.snapshot.data['productId'] : undefined);

    const product = slug ? getProductById(slug) : undefined;
    if (product?.dedicatedRoute) {
      this.router.navigateByUrl(product.dedicatedRoute, { replaceUrl: true });
      this.missing = true; // transient; navigation replaces this view
      this.product = null;
      return;
    }
    this.missing = !product;
    this.product = product ?? null;
  }

  get isAvailable(): boolean {
    return this.product ? isAvailableProduct(this.product) : false;
  }

  get categoryLabel(): string {
    return this.product?.category ? PRODUCT_CATEGORY_LABELS[this.product.category] : this.portfolioLabel;
  }

  get portfolioLabel(): string {
    switch (this.product?.portfolio) {
      case 'standalone': return 'Business Applications';
      case 'quantum': return 'Scientific & Quantum Computing';
      case 'space': return 'Space Systems';
      case 'cybersecurity': return 'Cybersecurity & Digital Trust';
      case 'developer-tools': return 'Programming Languages & Developer Tools';
      default: return '';
    }
  }

  get relatedProducts(): Product[] {
    const current = this.product;
    if (!current?.category) { return []; }
    return getAllProducts()
      .filter(p => p.id !== current.id && p.category === current.category && p.category !== 'research')
      .slice(0, 3);
  }

  detailLinkFor(product: Product): string {
    return product.dedicatedRoute ?? `/products/${product.id}`;
  }

  get maturityLabel(): string {
    return this.product ? maturityLabelFor(this.product.maturity) : '';
  }

  get availabilityLabel(): string {
    return this.product ? availabilityLabelFor(this.product.availability) : '';
  }

  get ctaLabel(): string {
    return this.product?.cta?.label ?? 'Request Information';
  }

  get ctaRoute(): string {
    return this.product?.cta?.route ?? '/contact';
  }

  get ctaQueryParams(): Record<string, string> | null {
    const route = this.product?.cta?.route;
    return !route || route === '/contact' ? { product: this.product?.id ?? '' } : null;
  }

  maturityBadgeVariant(maturity: Product['maturity']): BadgeVariant {
    return maturityBadgeVariantFor(maturity) as BadgeVariant;
  }

  availabilityBadgeVariant(availability: Product['availability']): BadgeVariant {
    return availabilityBadgeVariantFor(availability) as BadgeVariant;
  }
}
