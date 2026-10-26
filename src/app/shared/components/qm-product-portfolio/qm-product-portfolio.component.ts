import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QmProductCardComponent } from '../qm-product-card/qm-product-card.component';

import { Product, ServiceId, serviceRoute } from '../../../content/products/product.model';

@Component({
  selector: 'qm-product-portfolio',
  imports: [RouterModule, QmProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="qm-portfolio" [attr.aria-labelledby]="headingId">
      <header class="qm-portfolio__head">
        <h2 [id]="headingId" class="qm-portfolio__title">{{ title }}</h2>
        @if (description) {
          <p class="qm-portfolio__desc">{{ description }}</p>
        }
        <p class="qm-portfolio__count">
          <span class="qm-portfolio__count-value">{{ uniqueProducts.length }}</span>
          {{ uniqueProducts.length === 1 ? 'product' : 'products' }}
        </p>
      </header>

      @if (uniqueProducts.length) {
        <div class="qm-portfolio__grid">
          @for (product of uniqueProducts; track product.id) {
            <qm-product-card [product]="product" />
          }
        </div>
      } @else {
        <p class="qm-portfolio__empty">No products are currently listed in this portfolio.</p>
      }

      @if (resolvedServiceRoute) {
        <a class="qm-portfolio__service-link"
           [routerLink]="resolvedServicePath"
           [fragment]="resolvedServiceFragment">
          {{ serviceLinkLabel }}
        </a>
      }
    </section>
  `,
  styles: [`
    :host { display: block; }
    .qm-portfolio { display: flex; flex-direction: column; gap: 24px; }
    .qm-portfolio__title { margin: 0 0 8px; font-size: 24px; font-weight: 600; color: var(--color-text-primary); }
    .qm-portfolio__desc { margin: 0 0 8px; font-size: 15px; line-height: 1.6; color: var(--color-text-secondary); max-width: 720px; }
    .qm-portfolio__count { margin: 0; font-size: 13px; color: var(--color-text-muted); }
    .qm-portfolio__count-value { font-weight: 600; color: var(--color-text-secondary); }
    .qm-portfolio__grid {
      display: grid; gap: 24px;
      grid-template-columns: 1fr;
    }
    @media (min-width: 768px) {
      .qm-portfolio__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (min-width: 1024px) {
      .qm-portfolio__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .qm-portfolio__empty { font-size: 14.5px; color: var(--color-text-secondary); }
    .qm-portfolio__service-link { font-size: 14px; color: var(--color-accent); text-decoration: none; font-weight: 500; }
    .qm-portfolio__service-link:hover { text-decoration: underline; }
    .qm-portfolio__service-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
  `]
})
export class QmProductPortfolioComponent {
  @Input({ required: true }) title!: string;
  @Input() description = '';
  @Input() products: readonly Product[] = [];
  @Input() relatedServiceId?: ServiceId;
  @Input() serviceRoute?: string;
  @Input() serviceLinkLabel = 'Explore related service';

  get headingId(): string {
    return `qm-portfolio-${this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  get uniqueProducts(): readonly Product[] {
    const seen = new Set<string>();
    return this.products.filter(product => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    });
  }

  get resolvedServiceRoute(): string | null {
    if (this.serviceRoute) return this.serviceRoute;
    return this.relatedServiceId ? serviceRoute(this.relatedServiceId) : null;
  }

  get resolvedServicePath(): string | null {
    const route = this.resolvedServiceRoute;
    if (!route) return null;
    const hashIndex = route.indexOf('#');
    return hashIndex >= 0 ? route.slice(0, hashIndex) : route;
  }

  get resolvedServiceFragment(): string | undefined {
    const route = this.resolvedServiceRoute;
    if (!route) return undefined;
    const hashIndex = route.indexOf('#');
    return hashIndex >= 0 ? route.slice(hashIndex + 1) : undefined;
  }
}
