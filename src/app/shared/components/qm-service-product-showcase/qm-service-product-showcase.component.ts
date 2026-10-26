import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QmBadgeComponent, BadgeVariant } from '../qm-badge/qm-badge.component';

import {
  Product,
  maturityLabel as maturityLabelFor,
  maturityBadgeVariant as maturityBadgeVariantFor
} from '../../../content/products/product.model';
import { getProductById } from '../../../content/products/product.registry';

@Component({
  selector: 'qm-service-product-showcase',
  imports: [RouterModule, QmBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (featuredProducts.length) {
      <section class="qm-service-showcase" [attr.aria-labelledby]="headingId">
        <h3 [id]="headingId" class="qm-service-showcase__title">{{ resolvedHeading }}</h3>
        <p class="qm-service-showcase__desc">{{ resolvedDescription }}</p>
        <p class="qm-service-showcase__note">
          Representative QuantsMind software initiatives associated with this service
          domain. Status and availability reflect the current product registry.
        </p>

        <ul class="qm-service-showcase__list" role="list">
          @for (product of featuredProducts; track product.id) {
            <li class="qm-service-showcase__item">
              <div class="qm-service-showcase__item-head">
                <span class="qm-service-showcase__name">{{ product.name }}</span>
                @if (product.shortName && product.shortName !== product.name) {
                  <qm-badge variant="product">{{ product.shortName }}</qm-badge>
                }
                <qm-badge [variant]="maturityBadgeVariant(product.maturity)">
                  {{ maturityLabel(product.maturity) }}
                </qm-badge>
              </div>
              <p class="qm-service-showcase__summary">{{ product.summary }}</p>
            </li>
          }
        </ul>

        <a class="qm-service-showcase__link"
           [routerLink]="['/products']"
           [fragment]="resolvedAnchor">
          {{ resolvedLinkLabel }}
        </a>
      </section>
    }
  `,
  styles: [`
    :host { display: block; }
    .qm-service-showcase {
      margin-top: 24px;
      padding: 20px;
      border: 1px solid var(--card-border, var(--color-border));
      border-radius: var(--card-radius, var(--radius-md));
      background: var(--card-bg-subtle, var(--color-surface-subtle));
    }
    .qm-service-showcase__title {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
    }
    .qm-service-showcase__desc,
    .qm-service-showcase__note {
      margin: 0 0 12px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-secondary);
    }
    .qm-service-showcase__list {
      list-style: none;
      margin: 0 0 16px;
      padding: 0;
      display: grid;
      gap: 12px;
    }
    .qm-service-showcase__item {
      padding: 12px;
      border-radius: var(--radius-sm, 8px);
      background: var(--card-bg, var(--color-surface));
      border: 1px solid var(--card-border, var(--color-border));
    }
    .qm-service-showcase__item-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .qm-service-showcase__name {
      font-size: 15px;
      font-weight: 600;
      color: var(--color-text-primary);
    }
    .qm-service-showcase__summary {
      margin: 0;
      font-size: 13.5px;
      line-height: 1.5;
      color: var(--color-text-secondary);
    }
    .qm-service-showcase__link {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-accent);
      text-decoration: none;
    }
    .qm-service-showcase__link:hover { text-decoration: underline; }
    .qm-service-showcase__link:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }
  `]
})
export class QmServiceProductShowcaseComponent {
  private _featuredProductIds: readonly string[] = [];

  @Input() set featuredProductIds(value: readonly string[] | null | undefined) {
    this._featuredProductIds = value ?? [];
  }

  @Input() set productIds(value: readonly string[] | null | undefined) {
    this._featuredProductIds = value ?? [];
  }

  @Input() heading?: string;
  @Input() title?: string;

  @Input() description?: string;
  @Input() summary?: string;

  private _anchor = 'products';

  @Input() set productsAnchor(value: string | undefined) {
    if (value) this._anchor = value;
  }

  @Input() set anchor(value: string | undefined) {
    if (value) this._anchor = value;
  }

  @Input() linkLabel?: string;
  @Input() productsLinkLabel?: string;

  get featuredProducts(): readonly Product[] {
    const seen = new Set<string>();
    const products: Product[] = [];
    for (const id of this._featuredProductIds) {
      if (seen.has(id)) continue;
      const product = getProductById(id);
      if (product) {
        seen.add(id);
        products.push(product);
      }
    }
    return products;
  }

  get resolvedHeading(): string {
    return this.heading ?? this.title ?? 'Related software initiatives';
  }

  get resolvedDescription(): string {
    return this.description ?? this.summary ??
      'Representative QuantsMind software initiatives associated with this service domain.';
  }

  get resolvedAnchor(): string {
    return this._anchor;
  }

  get resolvedLinkLabel(): string {
    return this.linkLabel ?? this.productsLinkLabel ?? 'View these initiatives on the Products page';
  }

  get headingId(): string {
    return `qm-service-showcase-${this.resolvedHeading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  maturityLabel(maturity: Product['maturity']): string {
    return maturityLabelFor(maturity);
  }

  maturityBadgeVariant(maturity: Product['maturity']): BadgeVariant {
    return maturityBadgeVariantFor(maturity) as BadgeVariant;
  }
}


