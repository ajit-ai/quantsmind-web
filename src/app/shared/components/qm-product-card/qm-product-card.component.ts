import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QmButtonComponent } from '../qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../qm-badge/qm-badge.component';

import {
  Product,
  maturityLabel as maturityLabelFor,
  availabilityLabel as availabilityLabelFor,
  maturityBadgeVariant as maturityBadgeVariantFor,
  availabilityBadgeVariant as availabilityBadgeVariantFor,
  serviceRoute
} from '../../../content/products/product.model';


@Component({
  selector: 'qm-product-card',
  imports: [RouterModule, QmButtonComponent, QmBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="qm-product-card">
      <header class="qm-product-card__head">
        <div>
          <h3 class="qm-product-card__name">{{ product.name }}</h3>
          @if (product.shortName && product.shortName !== product.name) {
            <qm-badge variant="product">{{ product.shortName }}</qm-badge>
          }
        </div>
      </header>

      <p class="qm-product-card__summary">{{ product.summary }}</p>

      <dl class="qm-product-card__meta">
        <div class="qm-product-card__meta-row">
          <dt>Maturity</dt>
          <dd>
            <qm-badge [variant]="maturityBadgeVariant(product.maturity)">
              {{ maturityLabel }}
            </qm-badge>
          </dd>
        </div>
        <div class="qm-product-card__meta-row">
          <dt>Availability</dt>
          <dd>
            <qm-badge [variant]="availabilityBadgeVariant(product.availability)">
              {{ availabilityLabel }}
            </qm-badge>
          </dd>
        </div>
        @if (product.version) {
          <div class="qm-product-card__meta-row">
            <dt>Version</dt>
            <dd>
              {{ product.version }}@if (product.releaseChannel) { · {{ product.releaseChannel }} }
            </dd>
          </div>
        }
      </dl>

      @if (capabilitiesPreview.length) {
        <ul class="qm-product-card__capabilities" role="list">
          @for (capability of capabilitiesPreview; track capability) {
            <li>{{ capability }}</li>
          }
        </ul>
      }

      @if (product.technologyTags?.length) {
        <ul class="qm-product-card__tags" role="list" aria-label="Associated technologies">
          @for (tag of product.technologyTags; track tag) {
            <li class="qm-product-card__tag">{{ tag }}</li>
          }
        </ul>
      }

      @if (ctaRoute) {
        <div class="qm-product-card__cta">
          <qm-button variant="primary" size="sm" [routerLinkValue]="ctaRoute"
            [ariaLabel]="ctaLabel + ' for ' + product.name">
            {{ ctaLabel }}
          </qm-button>
        </div>
      }

      @if (relatedServiceRoute) {
        <a class="qm-product-card__service-link"
           [routerLink]="relatedServicePath"
           [fragment]="relatedServiceFragment">
          Related service
        </a>
      }
    </article>
  `,
  styles: [`
    :host { display: block; }
    .qm-product-card {
      display: flex; flex-direction: column; gap: 16px;
      padding: 24px; height: 100%;
      background: var(--card-bg, var(--color-surface));
      border: 1px solid var(--card-border, var(--color-border));
      border-radius: var(--card-radius, var(--radius-md));
      transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
    }
    .qm-product-card:hover {
      border-color: var(--color-border-strong);
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
      transform: translateY(-2px);
    }
    .qm-product-card__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .qm-product-card__name { margin: 0; font-size: 18px; font-weight: 600; color: var(--color-text-primary); }
    .qm-product-card__summary { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--color-text-secondary); }
    .qm-product-card__meta { margin: 0; display: flex; flex-direction: column; gap: 8px; }
    .qm-product-card__meta-row { display: flex; align-items: center; gap: 12px; font-size: 13px; }
    .qm-product-card__meta-row dt { color: var(--color-text-muted); min-width: 96px; }
    .qm-product-card__meta-row dd { margin: 0; }
    .qm-product-card__capabilities { margin: 0; padding-left: 18px; font-size: 13.5px; line-height: 1.6; color: var(--color-text-secondary); }
    .qm-product-card__capabilities li { margin-bottom: 4px; }
    .qm-product-card__tags {
      display: flex; flex-wrap: wrap; gap: 6px;
      margin: 0; padding: 0; list-style: none;
    }
    .qm-product-card__tag {
      padding: 3px 8px; border-radius: var(--radius-pill);
      background: var(--color-accent-subtle); color: var(--color-accent-dark);
      font-size: 11px; font-weight: 600; line-height: 1.4;
      overflow-wrap: anywhere;
    }
    .qm-product-card__cta { margin-top: auto; }
    .qm-product-card__service-link { font-size: 13px; color: var(--color-accent); text-decoration: none; }
    .qm-product-card__service-link:hover { text-decoration: underline; }
    .qm-product-card__service-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) {
      .qm-product-card { transition: none; }
      .qm-product-card:hover { transform: none; }
    }
  `]
})
export class QmProductCardComponent {
  @Input({ required: true }) product!: Product;

  get maturityLabel(): string {
    return maturityLabelFor(this.product.maturity);
  }

  get availabilityLabel(): string {
    return availabilityLabelFor(this.product.availability);
  }

  get capabilitiesPreview(): readonly string[] {
    return (this.product.capabilities ?? []).slice(0, 3);
  }

  get ctaRoute(): string | null {
    return this.product.cta?.route ?? this.product.route ?? null;
  }

  get ctaLabel(): string {
    return this.product.cta?.label ?? 'View product';
  }

  get relatedServiceRoute(): string | null {
    return this.product.relatedServiceId ? serviceRoute(this.product.relatedServiceId) : null;
  }

  get relatedServicePath(): string | null {
    const route = this.relatedServiceRoute;
    if (!route) return null;
    const hashIndex = route.indexOf('#');
    return hashIndex >= 0 ? route.slice(0, hashIndex) : route;
  }

  get relatedServiceFragment(): string | undefined {
    const route = this.relatedServiceRoute;
    if (!route) return undefined;
    const hashIndex = route.indexOf('#');
    return hashIndex >= 0 ? route.slice(hashIndex + 1) : undefined;
  }

  maturityBadgeVariant(maturity: Product['maturity']): BadgeVariant {
    return maturityBadgeVariantFor(maturity) as BadgeVariant;
  }

  availabilityBadgeVariant(availability: Product['availability']): BadgeVariant {
    return availabilityBadgeVariantFor(availability) as BadgeVariant;
  }
}

