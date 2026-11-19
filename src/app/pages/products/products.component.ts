import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import {
  PRODUCT_CATEGORY_LABELS,
  Product,
  ProductCategory,
  availabilityBadgeVariant as availabilityBadgeVariantFor,
  availabilityLabel as availabilityLabelFor,
  isAvailableProduct,
  maturityBadgeVariant as maturityBadgeVariantFor,
  maturityLabel as maturityLabelFor
} from '../../content/products/product.model';
import {
  getAvailableProducts,
  getCategoryCounts,
  getInDevelopmentProducts,
  getStoreCategories
} from '../../content/products/product.registry';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent } from '../../shared/components/qm-section/qm-section.component';
import { QmRevealDirective } from '../../shared/directives/qm-reveal.directive';

type StoreSection = 'all' | 'available' | 'in-development';

interface CategoryChip {
  readonly id: ProductCategory | 'all';
  readonly label: string;
  readonly count: number;
}

@Component({
  selector: 'app-products',
  imports: [
    RouterModule,
    QmBadgeComponent,
    QmContainerComponent,
    QmSectionComponent,
    QmRevealDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Products">
      <qm-container>
        <header class="store-hero">
          <span class="eyebrow">THE QUANTSMIND PRODUCTS STORE</span>
          <h1>Software you can use today</h1>
          <p class="store-hero__lead">
            Verified, installable QuantsMind software — available products first, with development initiatives
            clearly separated and never presented as installable. Versions, maturity and distribution links
            are registry-driven and verified against public package indices and marketplaces.
          </p>
          <div class="store-hero__cta">
            <a class="store-hero__button store-hero__button--primary" href="#available">Explore available products</a>
            <a class="store-hero__button" href="#in-development">In development</a>
          </div>
          <p class="store-hero__trust">
            {{ availableCount }} available · {{ inDevelopmentCount }} in development · installation links verified 2026-11-19
          </p>
        </header>

        <div class="store-controls" role="search" aria-label="Filter products">
          <label class="store-search">
            <span class="sr-only">Search products</span>
            <input
              type="search"
              placeholder="Search products, capabilities, versions…"
              [value]="searchQuery()"
              (input)="searchQuery.set($any($event.target).value)"
              aria-label="Search products" />
          </label>

          <div class="store-chips" aria-label="Filter by category">
            @for (chip of categoryChips; track chip.id) {
              <button
                type="button"
                class="store-chip"
                [class.store-chip--active]="selectedCategory() === chip.id"
                (click)="selectedCategory.set(chip.id)"
                [attr.aria-pressed]="selectedCategory() === chip.id">
                {{ chip.label }}<span class="store-chip__count">{{ chip.count }}</span>
              </button>
            }
          </div>

          <div class="store-chips" aria-label="Filter by stage">
            <button type="button" class="store-chip" [class.store-chip--active]="section() === 'all'" (click)="section.set('all')" [attr.aria-pressed]="section() === 'all'">All</button>
            <button type="button" class="store-chip" [class.store-chip--active]="section() === 'available'" (click)="section.set('available')" [attr.aria-pressed]="section() === 'available'">Available now</button>
            <button type="button" class="store-chip" [class.store-chip--active]="section() === 'in-development'" (click)="section.set('in-development')" [attr.aria-pressed]="section() === 'in-development'">In development</button>
          </div>
        </div>

        @if (featuredProducts.length && !filtersActive()) {
          <section aria-labelledby="featured-title" id="featured">
            <h2 id="featured-title" class="store-section-title">Featured</h2>
            <div class="store-grid store-grid--featured">
              @for (product of featuredProducts; track product.id) {
                <article class="product-card product-card--featured" qmReveal>
                  <span class="product-card__category">{{ categoryLabel(product) }}</span>
                  <h3 class="product-card__name">{{ product.shortName ?? product.name }}</h3>
                  <p class="product-card__summary">{{ product.summary }}</p>
                  <div class="product-card__badges">
                    <qm-badge [variant]="maturityVariant(product.maturity)">{{ maturityLabel(product.maturity) }}</qm-badge>
                    <qm-badge [variant]="availabilityVariant(product.availability)">{{ availabilityLabel(product.availability) }}</qm-badge>
                    @if (product.version) { <span class="product-card__version">{{ product.version }}</span> }
                  </div>
                  <a class="product-card__cta" [routerLink]="detailLinkFor(product)">Open &amp; install →</a>
                </article>
              }
            </div>
          </section>
        }

        @if (section() !== 'in-development') {
          <section aria-labelledby="available-title" id="available">
            <h2 id="available-title" class="store-section-title">Available Products</h2>
            <p class="store-section-lead">Verified releases and previews you can install now. Each card shows its real version, maturity and distribution status.</p>
            @if (filteredAvailable().length === 0) {
              <div class="store-empty" role="status">
                <h3>No available products match “{{ searchQuery() }}”</h3>
                <p>Try a different search term or clear the filters.</p>
                <button type="button" class="store-chip store-chip--active" (click)="clearFilters()">Clear filters</button>
              </div>
            } @else {
              <div class="store-grid">
                @for (product of filteredAvailable(); track product.id) {
                  <article class="product-card" qmReveal>
                    <span class="product-card__category">{{ categoryLabel(product) }}</span>
                    <h3 class="product-card__name">{{ product.name }}</h3>
                    <p class="product-card__summary">{{ product.summary }}</p>
                    <div class="product-card__badges">
                      <qm-badge [variant]="maturityVariant(product.maturity)">{{ maturityLabel(product.maturity) }}</qm-badge>
                      <qm-badge [variant]="availabilityVariant(product.availability)">{{ availabilityLabel(product.availability) }}</qm-badge>
                      @if (product.version) { <span class="product-card__version">{{ product.version }}</span> }
                    </div>
                    @if (distributionLabels(product).length) {
                      <p class="product-card__distribution">{{ distributionLabels(product).join(' · ') }}</p>
                    }
                    <a class="product-card__cta" [routerLink]="detailLinkFor(product)">Install &amp; details →</a>
                  </article>
                }
              </div>
            }
          </section>
        }

        @if (section() !== 'available') {
          <section aria-labelledby="indev-title" id="in-development">
            <h2 id="indev-title" class="store-section-title">In Development</h2>
            <p class="store-section-lead">Initiatives that are not yet available to ordinary users. Nothing on this page is presented as installable unless a public distribution or approved access mechanism exists.</p>
            @if (filteredInDevelopment().length === 0) {
              <div class="store-empty" role="status">
                <h3>No in-development products match “{{ searchQuery() }}”</h3>
                <p>Try a different search term or clear the filters.</p>
                <button type="button" class="store-chip store-chip--active" (click)="clearFilters()">Clear filters</button>
              </div>
            } @else {
              <div class="store-grid">
                @for (product of filteredInDevelopment(); track product.id) {
                  <article class="product-card product-card--indev" qmReveal>
                    <span class="product-card__category">{{ categoryLabel(product) }}</span>
                    <h3 class="product-card__name">{{ product.name }}</h3>
                    <p class="product-card__summary">{{ product.summary }}</p>
                    <div class="product-card__badges">
                      <qm-badge [variant]="maturityVariant(product.maturity)">{{ maturityLabel(product.maturity) }}</qm-badge>
                      <span class="product-card__not-available">Not available</span>
                    </div>
                    <a class="product-card__cta product-card__cta--muted" [routerLink]="detailLinkFor(product)">Details →</a>
                  </article>
                }
              </div>
            }
          </section>
        }

        <aside class="store-footer-links" aria-label="Product support">
          <a routerLink="/support">Product support →</a>
          <a routerLink="/releases">Release information →</a>
          <a routerLink="/docs">Documentation index →</a>
          <a routerLink="/licensing">Licensing →</a>
          <a routerLink="/insights">Product updates &amp; publications →</a>
        </aside>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    :host { display: block; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
    .eyebrow { font-size: 12px; letter-spacing: 0.08em; font-weight: 700; color: var(--color-accent); }
    .store-hero { padding: 32px 0 8px; max-width: 880px; }
    .store-hero h1 { margin: 8px 0 12px; font-size: clamp(32px, 5vw, 52px); line-height: 1.1; }
    .store-hero__lead { margin: 0; max-width: 720px; color: var(--color-text-secondary); font-size: 17px; line-height: 1.65; }
    .store-hero__cta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px; }
    .store-hero__button { display: inline-block; padding: 12px 20px; border-radius: var(--radius-pill); border: 1px solid var(--color-border); color: var(--color-text-primary); text-decoration: none; font-weight: 600; }
    .store-hero__button--primary { background: var(--color-accent); border-color: var(--color-accent); color: #fff; }
    .store-hero__button:hover { border-color: var(--color-accent); color: var(--color-accent); }
    .store-hero__button--primary:hover { background: var(--color-accent-dark); color: #fff; }
    .store-hero__trust { margin-top: 14px; font-size: 13px; color: var(--color-text-muted); }

    .store-controls { display: flex; flex-direction: column; gap: 12px; margin: 24px 0 8px; padding: 16px; border: 1px solid var(--color-border); border-radius: var(--radius-lg, 14px); background: var(--color-surface-subtle, #f1f5f9); }
    .store-search input { width: 100%; box-sizing: border-box; padding: 12px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-md, 10px); font: inherit; background: #fff; }
    .store-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .store-chip { padding: 8px 12px; border-radius: var(--radius-pill); border: 1px solid var(--color-border); background: #fff; color: var(--color-text-secondary); font: inherit; font-size: 13px; cursor: pointer; }
    .store-chip:hover { border-color: var(--color-accent); color: var(--color-accent); }
    .store-chip--active { background: var(--color-accent); border-color: var(--color-accent); color: #fff; }
    .store-chip__count { margin-left: 6px; font-size: 11px; opacity: 0.75; }

    .store-section-title { margin: 36px 0 4px; font-size: 24px; }
    .store-section-lead { margin: 0 0 16px; color: var(--color-text-secondary); max-width: 720px; }
    .store-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .store-grid--featured { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
    .product-card { display: flex; flex-direction: column; gap: 10px; padding: 18px; border: 1px solid var(--color-border); border-radius: var(--radius-lg, 14px); background: #fff; }
    .product-card--indev { background: var(--color-surface-subtle, #f8fafc); border-style: dashed; }
    .product-card--featured { border-color: var(--color-accent); box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06); }
    .product-card__category { font-size: 11px; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 700; color: var(--color-text-muted); }
    .product-card__name { margin: 0; font-size: 19px; }
    .product-card__summary { margin: 0; color: var(--color-text-secondary); font-size: 14px; line-height: 1.55; min-height: 44px; }
    .product-card__badges { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .product-card__version { font-size: 12px; color: var(--color-text-muted); }
    .product-card__distribution { margin: 0; font-size: 12px; color: var(--color-text-muted); }
    .product-card__not-available { font-size: 12px; color: var(--color-text-muted); font-weight: 600; }
    .product-card__cta { margin-top: auto; color: var(--color-accent); text-decoration: none; font-weight: 700; }
    .product-card__cta:hover { text-decoration: underline; }
    .product-card__cta--muted { color: var(--color-text-secondary); }
    .store-empty { padding: 36px 24px; text-align: center; border: 1px dashed var(--color-border); border-radius: var(--radius-lg, 14px); }
    .store-empty h3 { margin: 0 0 8px; }
    .store-empty p { margin: 0 0 12px; color: var(--color-text-secondary); }
    .store-footer-links { display: flex; flex-wrap: wrap; gap: 16px 24px; margin: 40px 0 8px; padding: 20px 0; border-top: 1px solid var(--color-border); }
    .store-footer-links a { color: var(--color-accent); text-decoration: none; font-weight: 600; }
    .store-footer-links a:hover { text-decoration: underline; }
    @media (prefers-reduced-motion: no-preference) {
      .product-card { transition: transform 150ms ease, box-shadow 150ms ease; }
      .product-card:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08); }
    }
  `]
})
export class ProductsComponent {
  private readonly route = inject(ActivatedRoute);

  readonly searchQuery = signal('');
  readonly section = signal<StoreSection>('all');
  readonly selectedCategory = signal<ProductCategory | 'all'>(this.initialCategory());

  readonly availableProducts: readonly Product[] = getAvailableProducts();
  readonly inDevelopmentProducts: readonly Product[] = getInDevelopmentProducts();
  readonly featuredProducts: readonly Product[] = this.availableProducts.filter(p => p.featured).slice(0, 6);

  readonly availableCount = this.availableProducts.length;
  readonly inDevelopmentCount = this.inDevelopmentProducts.length;

  readonly categoryChips: CategoryChip[] = this.buildCategoryChips();

  readonly filteredAvailable = computed(() => this.filter(this.availableProducts));
  readonly filteredInDevelopment = computed(() => this.filter(this.inDevelopmentProducts));

  constructor() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category && (PRODUCT_CATEGORY_LABELS as Record<string, string>)[category]) {
        this.selectedCategory.set(category as ProductCategory);
      }
    });
  }

  categoryLabel(product: Product): string {
    return product.category ? PRODUCT_CATEGORY_LABELS[product.category] : product.portfolio;
  }

  detailLinkFor(product: Product): string {
    return product.dedicatedRoute ?? `/products/${product.id}`;
  }

  distributionLabels(product: Product): string[] {
    const labels: string[] = [];
    for (const link of product.marketplaceUrls ?? []) {
      const label = link.label.split('—')[0].trim();
      if (!labels.includes(label)) { labels.push(label); }
    }
    for (const link of product.packageUrls ?? []) {
      const label = link.label.split(' ')[0].replace(/[()]/g, '');
      if (!labels.includes(label)) { labels.push(label); }
    }
    if (!labels.length && product.repositoryUrl) { labels.push('GitHub'); }
    return labels;
  }

  maturityVariant(maturity: Product['maturity']): BadgeVariant {
    return maturityBadgeVariantFor(maturity) as BadgeVariant;
  }

  availabilityVariant(availability: Product['availability']): BadgeVariant {
    return availabilityBadgeVariantFor(availability) as BadgeVariant;
  }

  maturityLabel(maturity: Product['maturity']): string {
    return maturityLabelFor(maturity);
  }

  availabilityLabel(availability: Product['availability']): string {
    return availabilityLabelFor(availability);
  }

  filtersActive(): boolean {
    return this.searchQuery().trim().length > 0 || this.selectedCategory() !== 'all';
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('all');
    this.section.set('all');
  }

  private initialCategory(): ProductCategory | 'all' {
    const category = this.route.snapshot.paramMap.get('category');
    return category && (PRODUCT_CATEGORY_LABELS as Record<string, string>)[category]
      ? (category as ProductCategory)
      : 'all';
  }

  private buildCategoryChips(): CategoryChip[] {
    const counts = getCategoryCounts();
    const chips: CategoryChip[] = [{ id: 'all', label: 'All', count: this.availableCount + this.inDevelopmentCount }];
    for (const category of getStoreCategories()) {
      chips.push({ id: category, label: PRODUCT_CATEGORY_LABELS[category], count: counts[category].total });
    }
    return chips;
  }

  private filter(products: readonly Product[]): Product[] {
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.selectedCategory();
    return products.filter(product => {
      if (category !== 'all' && product.category !== category) { return false; }
      if (!query) { return true; }
      const haystack = [
        product.name,
        product.shortName,
        product.summary,
        product.description,
        product.version,
        product.releaseChannel,
        ...(product.capabilities ?? []),
        ...(product.technologyTags ?? [])
      ].filter(Boolean).join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }
}
