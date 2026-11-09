import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { getProductById } from '../../../content/products/product.registry';
import { VERIFIED_DIRECTORY_ENTRIES, VerifiedDirectoryEntry } from '../../../content/products/directory-entries';
import {
  Product,
  availabilityBadgeVariant as availabilityBadgeVariantFor,
  availabilityLabel as availabilityLabelFor,
  maturityBadgeVariant as maturityBadgeVariantFor,
  maturityLabel as maturityLabelFor
} from '../../../content/products/product.model';
import { BadgeVariant, QmBadgeComponent } from '../qm-badge/qm-badge.component';
import { QmButtonComponent } from '../qm-button/qm-button.component';
import { QmContainerComponent } from '../qm-container/qm-container.component';
import { QmSectionComponent } from '../qm-section/qm-section.component';

function requireProduct(productId: unknown): Product {
  if (typeof productId !== 'string') {
    throw new Error('Product detail route is missing a product identifier');
  }

  const product = getProductById(productId);
  if (!product) {
    throw new Error(`Product registry entry not found: ${productId}`);
  }

  return product;
}

@Component({
  selector: 'qm-product-detail',
  imports: [
    RouterModule,
    QmBadgeComponent,
    QmButtonComponent,
    QmContainerComponent,
    QmSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Product detail">
      <qm-container>
        <article class="qm-product-detail__article">
          <header class="qm-product-detail__head">
            <a class="qm-product-detail__back-link" routerLink="/products">
              ← Back to Products
            </a>
            <span class="eyebrow">PRODUCT DETAIL</span>
            <h1>{{ directoryEntry ? directoryEntry.name : product.name }}</h1>
            <p class="qm-product-detail__lead">{{ directoryEntry ? directoryEntry.summary : product.summary }}</p>
            <div class="qm-product-detail__badges" aria-label="Product status">
              @if (directoryEntry) {
                @if (directoryEntry.maturity) {
                  <span class="qm-product-detail__version">{{ directoryEntry.maturity }}</span>
                }
                @if (directoryEntry.version) {
                  <span class="qm-product-detail__version">{{ directoryEntry.version }}</span>
                }
                @if (directoryEntry.license) {
                  <span class="qm-product-detail__version">{{ directoryEntry.license }}</span>
                }
              } @else {
                <qm-badge [variant]="maturityBadgeVariant(product.maturity)">
                  {{ maturityLabel }}
                </qm-badge>
                <qm-badge [variant]="availabilityBadgeVariant(product.availability)">
                  {{ availabilityLabel }}
                </qm-badge>
                @if (product.version) {
                  <span class="qm-product-detail__version">{{ product.version }}</span>
                }
              }
            </div>
            <p class="qm-product-detail__category">{{ portfolioLabel }}</p>
          </header>

          <qm-section surface="white" class="qm-product-detail__section" ariaLabel="Product information">
            <div class="qm-product-detail__grid">
              <div class="qm-product-detail__column">
                @if (directoryEntry) {
                  <section class="qm-product-detail__block">
                    <h2>Purpose</h2>
                    <p>{{ directoryEntry.summary }}</p>
                  </section>
                } @else {
                  <section class="qm-product-detail__block">
                    <h2>Description</h2>
                    <p>{{ product.description }}</p>
                  </section>

                  @if (product.capabilities?.length) {
                    <section class="qm-product-detail__block">
                      <h2>Capabilities</h2>
                      <ul>
                        @for (capability of product.capabilities; track capability) {
                          <li>{{ capability }}</li>
                        }
                      </ul>
                    </section>
                  }

                  @if (product.useCases?.length) {
                    <section class="qm-product-detail__block">
                      <h2>Use Cases</h2>
                      <ul>
                        @for (useCase of product.useCases; track useCase) {
                          <li>{{ useCase }}</li>
                        }
                      </ul>
                    </section>
                  }

                  @if (product.modules?.length) {
                    <section class="qm-product-detail__block">
                      <h2>Modules</h2>
                      <ul>
                        @for (module of product.modules; track module) {
                          <li>{{ module }}</li>
                        }
                      </ul>
                    </section>
                  }

                  @if (product.targetDomains?.length) {
                    <section class="qm-product-detail__block">
                      <h2>Target Domains</h2>
                      <ul>
                        @for (domain of product.targetDomains; track domain) {
                          <li>{{ domain }}</li>
                        }
                      </ul>
                    </section>
                  }

                  @if (product.targetClients?.length) {
                    <section class="qm-product-detail__block">
                      <h2>Target Clients</h2>
                      <ul>
                        @for (client of product.targetClients; track client) {
                          <li>{{ client }}</li>
                        }
                      </ul>
                    </section>
                  }
                }
              </div>

              <aside class="qm-product-detail__column qm-product-detail__column--meta">
                @if (directoryEntry) {
                  <dl class="qm-product-detail__meta">
                    <div>
                      <dt>Maturity</dt>
                      <dd>{{ directoryEntry.maturity }}</dd>
                    </div>
                    @if (directoryEntry.version) {
                      <div>
                        <dt>Version</dt>
                        <dd>{{ directoryEntry.version }}</dd>
                      </div>
                    }
                    @if (directoryEntry.license) {
                      <div>
                        <dt>License</dt>
                        <dd>{{ directoryEntry.license }}</dd>
                      </div>
                    }
                  </dl>

                  @if (directoryEntry.distribution) {
                    <section class="qm-product-detail__block">
                      <h2>Distribution</h2>
                      <p>{{ directoryEntry.distribution }}</p>
                    </section>
                  }
                  @if (directoryEntry.repository) {
                    <section class="qm-product-detail__block">
                      <h2>Repository</h2>
                      <a [href]="directoryEntry.repository" target="_blank" rel="noopener">{{ directoryEntry.repository }}</a>
                    </section>
                  }
                  @if (directoryEntry.evidence) {
                    <section class="qm-product-detail__block">
                      <h2>Evidence</h2>
                      <p>{{ directoryEntry.evidence }}</p>
                    </section>
                  }
                } @else {
                  <dl class="qm-product-detail__meta">
                    <div>
                      <dt>Maturity</dt>
                      <dd>{{ maturityLabel }}</dd>
                    </div>
                    <div>
                      <dt>Availability</dt>
                      <dd>{{ availabilityLabel }}</dd>
                    </div>
                    @if (product.releaseChannel) {
                      <div>
                        <dt>Release channel</dt>
                        <dd>{{ product.releaseChannel }}</dd>
                      </div>
                    }
                    @if (product.deployment) {
                      <div>
                        <dt>Deployment</dt>
                        <dd>{{ product.deployment }}</dd>
                      </div>
                    }
                  </dl>

                  @if (product.limitations?.length) {
                    <section class="qm-product-detail__block">
                      <h2>Limitations</h2>
                      <ul>
                        @for (limitation of product.limitations; track limitation) {
                          <li>{{ limitation }}</li>
                        }
                      </ul>
                    </section>
                  }

                  @if (product.documentationUrl) {
                    <section class="qm-product-detail__block">
                      <h2>Documentation</h2>
                      <a [href]="product.documentationUrl" target="_blank" rel="noopener">
                        {{ product.documentationUrl }}
                      </a>
                    </section>
                  }
                }
              </aside>
            </div>
          </qm-section>

          @if (!directoryEntry && product.technologyTags?.length) {
            <div class="qm-product-detail__tags" aria-label="Associated technologies">
              @for (tag of product.technologyTags; track tag) {
                <span>{{ tag }}</span>
              }
            </div>
          }

          <footer class="qm-product-detail__footer">
            <a class="qm-product-detail__back-link" routerLink="/products" fragment="marketplace">
              Back to Products
            </a>
            @if (directoryEntry) {
              @if (directoryEntry.route) {
                <a class="qm-product-detail__explore" [routerLink]="directoryEntry.route">
                  {{ detailExploreLabel }}
                </a>
              } @else {
                <qm-button
                  variant="primary"
                  size="md"
                  [fullWidth]="true"
                  [routerLinkValue]="'/contact'"
                  [queryParams]="{ product: directoryEntry.id }"
                  [ariaLabel]="'Request access to ' + directoryEntry.name">
                  Request {{ directoryEntry.name }} Access
                </qm-button>
              }
            } @else {
              <qm-button
                variant="primary"
                size="md"
                [fullWidth]="true"
                [routerLinkValue]="'/contact'"
                [queryParams]="{ product: product.id }"
                [ariaLabel]="'Request access to ' + product.name">
                Request {{ product.name }} Access
              </qm-button>
            }
          </footer>
        </article>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    :host { display: block; }
    .qm-product-detail__article { max-width: 1120px; }
    .qm-product-detail__head {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 24px 0 8px;
    }
    h1 { margin: 0; }
    .qm-product-detail__lead {
      max-width: 760px;
      margin: 0;
      color: var(--color-text-secondary);
      font-size: 17px;
      line-height: 1.65;
    }
    .qm-product-detail__back-link {
      color: var(--color-accent);
      text-decoration: none;
    }
    .qm-product-detail__back-link:hover { text-decoration: underline; }
    .qm-product-detail__badges,
    .qm-product-detail__tags {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .qm-product-detail__version {
      color: var(--color-text-muted);
      font-size: 13px;
    }
    .qm-product-detail__category {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--color-text-secondary);
    }
    .qm-product-detail__section { margin-top: 24px; }
    .qm-product-detail__grid {
      display: grid;
      grid-template-columns: minmax(0, 1.5fr) minmax(260px, 1fr);
      gap: 32px;
    }
    .qm-product-detail__column {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .qm-product-detail__column--meta {
      align-self: start;
      border-left: 2px solid var(--color-border);
      padding-left: 24px;
    }
    .qm-product-detail__block {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .qm-product-detail__block h2 {
      margin: 0;
      font-size: 18px;
    }
    .qm-product-detail__block p,
    .qm-product-detail__block ul {
      margin: 0;
      color: var(--color-text-secondary);
      line-height: 1.65;
      overflow-wrap: anywhere;
    }
    .qm-product-detail__block ul {
      padding-left: 20px;
    }
    .qm-product-detail__block li { margin-bottom: 6px; overflow-wrap: anywhere; }
    .qm-product-detail__block a {
      color: var(--color-accent);
      overflow-wrap: anywhere;
    }
    .qm-product-detail__meta {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 0;
    }
    .qm-product-detail__meta div {
      display: grid;
      grid-template-columns: 120px minmax(0, 1fr);
      gap: 12px;
    }
    .qm-product-detail__meta dt { color: var(--color-text-muted); }
    .qm-product-detail__meta dd { margin: 0; color: var(--color-text-secondary); }
    .qm-product-detail__tags { margin-top: 24px; }
    .qm-product-detail__tags span {
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      background: var(--color-accent-subtle);
      color: var(--color-accent-dark);
      font-size: 12px;
      font-weight: 600;
    }
    .qm-product-detail__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid var(--color-border);
    }
    .qm-product-detail__footer qm-button { max-width: 100%; }
    .qm-product-detail__explore {
      color: var(--color-accent);
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
    }
    .qm-product-detail__explore:hover { text-decoration: underline; }
    .qm-product-detail__explore:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
    @media (max-width: 767px) {
      .qm-product-detail__grid { grid-template-columns: 1fr; }
      .qm-product-detail__column--meta {
        border-left: 0;
        border-top: 1px solid var(--color-border);
        padding: 24px 0 0;
      }
      .qm-product-detail__footer {
        align-items: flex-start;
        flex-direction: column;
      }
      .qm-product-detail__footer qm-button { width: 100%; }
    }
  `]
})
export class QmProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly directoryEntry: VerifiedDirectoryEntry | null =
    typeof this.route.snapshot.data['productId'] === 'string'
      ? VERIFIED_DIRECTORY_ENTRIES.find(entry => entry.id === this.route.snapshot.data['productId']) ?? null
      : null;
  private readonly registryProduct: Product | null = this.directoryEntry
    ? null
    : requireProduct(this.route.snapshot.data['productId']);

  get product(): Product {
    const product = this.registryProduct;
    if (product) { return product; }
    throw new Error(`No product detail available for identifier: ${this.route.snapshot.data['productId']}`);
  }

  get maturityLabel(): string {
    if (this.directoryEntry) { return this.directoryEntry.maturity ?? ''; }
    return maturityLabelFor(this.product.maturity);
  }

  get availabilityLabel(): string {
    if (this.directoryEntry) { return ''; }
    return availabilityLabelFor(this.product.availability);
  }

  get portfolioLabel(): string {
    if (this.directoryEntry) { return this.directoryCategoryLabel; }
    switch (this.product.portfolio) {
      case 'standalone': return 'Standalone Software';
      case 'quantum': return 'Quantum Software';
      case 'space': return 'Space Systems';
      case 'cybersecurity': return 'Cybersecurity';
      case 'developer-tools': return 'Programming Languages & Developer Tools';
    }
  }

  get directoryCategoryLabel(): string {
    switch (this.directoryEntry?.category) {
      case 'a1-programming-languages': return 'Programming Languages & Developer Engineering';
      case 'a2-ai-development': return 'AI Development & Agent Platforms';
      case 'a3-language-models': return 'Language Models & AI Systems';
      case 'a4-scientific-data-quantum': return 'Scientific, Data & Quantum Technologies';
      default: return this.directoryEntry?.category ?? '';
    }
  }

  get detailExploreRoute(): string {
    return this.directoryEntry?.route ?? '';
  }

  get detailExploreLabel(): string {
    return this.directoryEntry?.route ? 'Explore ' + this.directoryEntry.name + ' →' : '';
  }

  maturityBadgeVariant(maturity: Product['maturity']): BadgeVariant {
    return maturityBadgeVariantFor(maturity) as BadgeVariant;
  }

  availabilityBadgeVariant(availability: Product['availability']): BadgeVariant {
    return availabilityBadgeVariantFor(availability) as BadgeVariant;
  }
}
