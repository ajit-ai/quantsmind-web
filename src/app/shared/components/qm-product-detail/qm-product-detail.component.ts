import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { getProductById } from '../../../content/products/product.registry';
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
            <h1>{{ product.name }}</h1>
            <p class="qm-product-detail__lead">{{ product.summary }}</p>
            <div class="qm-product-detail__badges" aria-label="Product status">
              <qm-badge [variant]="maturityBadgeVariant(product.maturity)">
                {{ maturityLabel }}
              </qm-badge>
              <qm-badge [variant]="availabilityBadgeVariant(product.availability)">
                {{ availabilityLabel }}
              </qm-badge>
              @if (product.version) {
                <span class="qm-product-detail__version">{{ product.version }}</span>
              }
            </div>
          </header>

          <qm-section surface="white" class="qm-product-detail__section" ariaLabel="Product information">
            <div class="qm-product-detail__grid">
              <div class="qm-product-detail__column">
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
              </div>

              <aside class="qm-product-detail__column qm-product-detail__column--meta">
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
              </aside>
            </div>
          </qm-section>

          @if (product.technologyTags?.length) {
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
            <qm-button
              variant="primary"
              size="md"
              [routerLinkValue]="'/contact'"
              [queryParams]="{ product: product.id }"
              [ariaLabel]="'Request access to ' + product.name">
              Request {{ product.name }} Access
            </qm-button>
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
    }
    .qm-product-detail__block ul {
      padding-left: 20px;
    }
    .qm-product-detail__block li { margin-bottom: 6px; }
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
    }
  `]
})
export class QmProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly product = requireProduct(this.route.snapshot.data['productId']);

  get maturityLabel(): string {
    return maturityLabelFor(this.product.maturity);
  }

  get availabilityLabel(): string {
    return availabilityLabelFor(this.product.availability);
  }

  maturityBadgeVariant(maturity: Product['maturity']): BadgeVariant {
    return maturityBadgeVariantFor(maturity) as BadgeVariant;
  }

  availabilityBadgeVariant(availability: Product['availability']): BadgeVariant {
    return availabilityBadgeVariantFor(availability) as BadgeVariant;
  }
}
