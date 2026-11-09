import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { QmProductPortfolioComponent } from '../../shared/components/qm-product-portfolio/qm-product-portfolio.component';
import { QmProductCardComponent } from '../../shared/components/qm-product-card/qm-product-card.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';
import { getProductById, getProductsByPortfolio } from '../../content/products/product.registry';
import {
  VERIFIED_DIRECTORY_ENTRIES,
  VERIFIED_DIRECTORY_NOTE,
  VerifiedDirectoryEntry
} from '../../content/products/directory-entries';
import {
  Product,
  ServiceId,
  maturityLabel as maturityLabelFor,
  availabilityLabel as availabilityLabelFor,
  maturityBadgeVariant as maturityBadgeVariantFor,
  availabilityBadgeVariant as availabilityBadgeVariantFor
} from '../../content/products/product.model';

interface FlowStep {
  title: string;
  body: string;
}

interface ProductCategory {
  id: string;
  label: string;
  count: number;
}

interface MarketplaceEntry {
  readonly serviceId: ServiceId;
  readonly serviceTitle: string;
  readonly product: Product;
  readonly rationale: string;
}

function requireProduct(id: string): Product {
  const product = getProductById(id);
  if (!product) {
    throw new Error(`Product registry entry not found: ${id}`);
  }
  return product;
}

@Component({
    selector: 'app-products',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, QmProductPortfolioComponent, QmProductCardComponent, QmPageHeroComponent, QmRevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <qm-page-hero
      eyebrow="PRODUCTS & TECHNOLOGY"
      title="Products & Technology"
      lead="Explore the engineering technologies, software platforms and specialised intelligence products developed by QuantsMind."
      [artLabels]="['DI Mini', 'v0.1.0', 'Portfolio', 'Access']">
      <p heroLead class="qm-page-hero__lead">
        Products are separated from proposed initiatives and from the underlying
        technologies. Nothing on this page is described as generally available unless
        its registry entry supports that status.
      </p>
      <div heroActions class="hero-actions">
        <qm-button variant="primary" size="md" [routerLinkValue]="'/contact'">
          Request Product Access →
        </qm-button>
        <qm-button variant="outline" size="md" [routerLinkValue]="'/technology'">
          Explore Technologies
        </qm-button>
      </div>
    </qm-page-hero>

    <qm-section surface="white" size="sm" ariaLabel="Product categories">
      <qm-container>
        <nav class="category-nav" aria-label="Product categories">
          @for (category of categories; track category.id) {
            <a class="category-nav__link"
               [routerLink]="['/products']"
               [fragment]="category.id">
              <span class="category-nav__label">{{ category.label }}</span>
              <span class="category-nav__count">{{ category.count }}</span>
            </a>
          }
          <a class="category-nav__link category-nav__link--mission"
             routerLink="/quantum-mission">
            <span class="category-nav__label">Quantum Mission</span>
            <span class="category-nav__count">10</span>
          </a>
        </nav>
        <p class="category-nav__note">
          Category navigation jumps to a portfolio section. Counts reflect the current
          product registry. The featured product is presented separately and is not
          repeated in the portfolio grids. These are not adoption, sales or deployment
          figures.
        </p>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" size="sm" ariaLabel="Engineering technologies and platforms">
      <qm-container>
        <header class="division-head" qmReveal>
          <span class="eyebrow">DIVISION A</span>
          <h2>Engineering Technologies &amp; Platforms</h2>
          <p>
            Programming languages, developer tools, AI platforms, language models,
            scientific computing and quantum technologies developed by QuantsMind.
          </p>
        </header>

        <div class="division-groups">
          <div class="division-group" qmReveal>
            <h3 class="division-group__title">A1 — Programming Languages &amp; Developer Engineering</h3>
            <div class="division-group__grid">
              @for (entry of a1Entries; track entry.id) {
                <article class="directory-card">
                  <span class="directory-card__source directory-card__source--verified">Verified Technology</span>
                  <h4 class="directory-card__title">{{ entry.name }}</h4>
                  <p class="directory-card__desc">{{ entry.summary }}</p>
                  @if (entry.version) { <p class="directory-card__version">{{ entry.version }}</p> }
                  @if (entry.maturity) { <p class="directory-card__maturity">{{ entry.maturity }}</p> }
                  @if (entry.route) {
                    <a class="directory-card__link" [routerLink]="entry.route">Explore →</a>
                  }
                </article>
              }
            </div>
          </div>

          <div class="division-group" qmReveal>
            <h3 class="division-group__title">A2 — AI Development &amp; Agent Platforms</h3>
            <div class="division-group__grid">
              @for (entry of a2Entries; track entry.id) {
                <article class="directory-card">
                  <span class="directory-card__source directory-card__source--verified">Verified Technology</span>
                  <h4 class="directory-card__title">{{ entry.name }}</h4>
                  <p class="directory-card__desc">{{ entry.summary }}</p>
                  @if (entry.version) { <p class="directory-card__version">{{ entry.version }}</p> }
                  @if (entry.maturity) { <p class="directory-card__maturity">{{ entry.maturity }}</p> }
                  @if (entry.route) {
                    <a class="directory-card__link" [routerLink]="entry.route">Explore →</a>
                  }
                </article>
              }
            </div>
          </div>

          <div class="division-group" qmReveal>
            <h3 class="division-group__title">A3 — Language Models &amp; AI Systems</h3>
            <div class="division-group__grid">
              @if (a3Entries.length) {
                @for (entry of a3Entries; track entry.id) {
                  <article class="directory-card">
                    <span class="directory-card__source directory-card__source--verified">Verified Technology</span>
                    <h4 class="directory-card__title">{{ entry.name }}</h4>
                    <p class="directory-card__desc">{{ entry.summary }}</p>
                    @if (entry.version) { <p class="directory-card__version">{{ entry.version }}</p> }
                    @if (entry.maturity) { <p class="directory-card__maturity">{{ entry.maturity }}</p> }
                    @if (entry.route) {
                      <a class="directory-card__link" [routerLink]="entry.route">Explore →</a>
                    }
                  </article>
                }
              } @else {
                <p class="directory-empty">No verified entries are currently classified under A3.</p>
              }
            </div>
          </div>

          <div class="division-group" qmReveal>
            <h3 class="division-group__title">A4 — Scientific, Data &amp; Quantum Technologies</h3>
            <div class="division-group__grid">
              @for (entry of a4Entries; track entry.id) {
                <article class="directory-card">
                  <span class="directory-card__source directory-card__source--verified">Verified Technology</span>
                  <h4 class="directory-card__title">{{ entry.name }}</h4>
                  <p class="directory-card__desc">{{ entry.summary }}</p>
                  @if (entry.version) { <p class="directory-card__version">{{ entry.version }}</p> }
                  @if (entry.maturity) { <p class="directory-card__maturity">{{ entry.maturity }}</p> }
                  @if (entry.route) {
                    <a class="directory-card__link" [routerLink]="entry.route">Explore →</a>
                  }
                </article>
              }
            </div>
          </div>
        </div>

        <p class="directory-note">{{ directoryNote }}</p>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" size="sm" ariaLabel="Product catalogue search and filters">
      <qm-container>
        <div class="catalogue-discovery" aria-label="Find by need">
          <span class="catalogue-discovery__label">Find by need</span>
          <div class="catalogue-discovery__chips">
            <button type="button" class="catalogue-discovery__chip"
                    [class.catalogue-discovery__chip--active]="selectedDomain() === 'all'"
                    (click)="selectedDomain.set('all')">All</button>
            <button type="button" class="catalogue-discovery__chip"
                    [class.catalogue-discovery__chip--active]="selectedDomain() === 'standalone'"
                    (click)="selectedDomain.set('standalone')">Software engineering</button>
            <button type="button" class="catalogue-discovery__chip"
                    [class.catalogue-discovery__chip--active]="selectedDomain() === 'quantum'"
                    (click)="selectedDomain.set('quantum')">Quantum &amp; advanced</button>
            <button type="button" class="catalogue-discovery__chip"
                    [class.catalogue-discovery__chip--active]="selectedDomain() === 'space'"
                    (click)="selectedDomain.set('space')">Space &amp; cybersecurity</button>
            <button type="button" class="catalogue-discovery__chip"
                    [class.catalogue-discovery__chip--active]="selectedDomain() === 'cybersecurity'"
                    (click)="selectedDomain.set('cybersecurity')">Cybersecurity</button>
            <button type="button" class="catalogue-discovery__chip"
                    [class.catalogue-discovery__chip--active]="selectedDomain() === 'developer-tools'"
                    (click)="selectedDomain.set('developer-tools')">Developer tools</button>
          </div>
        </div>
        <div class="catalogue-tools">
          <div class="catalogue-search">
            <label class="catalogue-search__label" for="product-search">Search products</label>
            <input
              id="product-search"
              type="search"
              class="catalogue-search__input"
              placeholder="Search by name, capability or description"
              [value]="searchQuery()"
              (input)="searchQuery.set($any($event.target).value)" />
          </div>
          <div class="catalogue-filters">
            <div class="catalogue-filter">
              <label class="catalogue-filter__label" for="domain-filter">Domain</label>
              <select id="domain-filter" class="catalogue-filter__select"
                      [value]="selectedDomain()"
                      (change)="selectedDomain.set($any($event.target).value)">
                <option value="all">All domains</option>
                <option value="standalone">Standalone Software</option>
                <option value="quantum">Quantum Software</option>
                <option value="space">Space Systems</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="developer-tools">Programming Languages & Developer Tools</option>
              </select>
            </div>
            <div class="catalogue-filter">
              <label class="catalogue-filter__label" for="status-filter">Status</label>
              <select id="status-filter" class="catalogue-filter__select"
                      [value]="selectedStatus()"
                      (change)="selectedStatus.set($any($event.target).value)">
                <option value="all">All statuses</option>
                <option value="released">Released</option>
                <option value="developer-preview">Developer Preview</option>
                <option value="alpha">Alpha</option>
                <option value="in-development">In Development</option>
                <option value="proposed">Proposed</option>
              </select>
            </div>
            @if (hasActiveFilters()) {
              <button type="button" class="catalogue-reset" (click)="clearFilters()">
                Clear filters
              </button>
            }
          </div>
        </div>

        @if (hasActiveFilters()) {
          <div class="catalogue-results" aria-live="polite">
            <p class="catalogue-results__summary">
              {{ filteredProducts().length }} of {{ catalogueProducts.length }} catalogue products match.
              Marketplace selections are presented separately.
            </p>
            @if (filteredProducts().length) {
              <div class="catalogue-results__grid">
                @for (product of filteredProducts(); track product.id) {
                  <qm-product-card [product]="product" />
                }
              </div>
            } @else {
              <p class="catalogue-results__empty">
                No products match your search or filters. Try a different term or reset the filters.
              </p>
            }
          </div>
        }
      </qm-container>
    </qm-section>

    @if (featuredProduct) {
      <span id="di-mini" class="anchor-alias" aria-hidden="true"></span>
      <qm-section surface="subtle" ariaLabel="Featured product">
        <qm-container>
          <article class="featured-product" qmReveal>
            <header class="featured-product__head">
              <div>
                <span class="eyebrow">FEATURED PRODUCT</span>
                <h2 class="featured-product__name">{{ featuredProduct.name }}</h2>
                <p class="featured-product__tagline">{{ featuredProduct.summary }}</p>
              </div>
              <div class="featured-product__badges">
                @if (featuredProduct.shortName) {
                  <qm-badge variant="product">{{ featuredProduct.shortName }}</qm-badge>
                }
                @if (featuredProduct.version) {
                  <qm-badge variant="default">{{ featuredProduct.version }}</qm-badge>
                }
                <qm-badge [variant]="maturityBadgeVariant(featuredProduct)">
                  {{ maturityLabel(featuredProduct) }}
                </qm-badge>
                <qm-badge [variant]="availabilityBadgeVariant(featuredProduct)">
                  {{ availabilityLabel(featuredProduct) }}
                </qm-badge>
              </div>
            </header>

            <p class="featured-product__desc">{{ featuredProduct.description }}</p>

            @if (featuredProduct.technologyTags?.length) {
              <ul class="featured-product__tags" role="list" aria-label="Associated technologies">
                @for (tag of featuredProduct.technologyTags; track tag) {
                  <li class="featured-product__tag">{{ tag }}</li>
                }
              </ul>
            }

            <div class="featured-product__workflow" aria-labelledby="product-workflow-title">
              <h3 id="product-workflow-title" class="featured-product__h3">Processing workflow</h3>
              <ol class="doc-flow" aria-label="Document Intelligence Mini processing workflow">
                @for (step of workflow; track step.label; let last = $last) {
                  <li class="doc-flow__step">
                    <span class="doc-flow__label">{{ step.label }}</span>
                    <span class="doc-flow__detail">{{ step.detail }}</span>
                  </li>
                  @if (!last) {
                    <li class="doc-flow__connector" aria-hidden="true">→</li>
                  }
                }
              </ol>
              <p class="doc-flow__note">
                Deterministic parsing: no OCR, machine learning, classification,
                embeddings or semantic search.
              </p>
            </div>

            <div class="featured-product__grid">
              <div>
                <h3 class="featured-product__h3">Capabilities</h3>
                <ul class="featured-product__list">
                  @for (capability of featuredProduct.capabilities; track capability) {
                    <li>{{ capability }}</li>
                  }
                </ul>
              </div>
              <div>
                <h3 class="featured-product__h3">Intended use</h3>
                <ul class="featured-product__list">
                  @for (use of featuredProduct.useCases; track use) {
                    <li>{{ use }}</li>
                  }
                </ul>
              </div>
            </div>

            <div class="featured-product__notes">
              @if (featuredProduct.deployment) {
                <p class="featured-product__note">
                  <strong>Deployment.</strong> {{ featuredProduct.deployment }}
                </p>
              }
              @if (featuredProduct.availabilityDetail) {
                <p class="featured-product__note">
                  <strong>Availability.</strong> {{ featuredProduct.availabilityDetail }}
                </p>
              }
            </div>

            <div class="featured-product__cta">
              <qm-button variant="primary" size="md" [routerLinkValue]="'/contact'"
                [ariaLabel]="'Request access to ' + featuredProduct.name">
                {{ featuredProduct.cta?.label ?? 'Request Product Access' }} →
              </qm-button>
              <qm-button variant="outline" size="md" [routerLinkValue]="'/technology'">
                Explore Technologies
              </qm-button>
            </div>
          </article>
        </qm-container>
      </qm-section>
    }

    <span id="standalone-software" class="anchor-alias" aria-hidden="true"></span>
    <qm-section surface="white" ariaLabel="Standalone software products">
      <qm-container>
        <qm-product-portfolio
          title="Standalone Software"
          description="Business and productivity applications at different stages of development. DI Mini is featured above and is not repeated in this grid."
          [products]="catalogueStandaloneProducts" />
      </qm-container>
    </qm-section>

    <span id="quantum-software" class="anchor-alias" aria-hidden="true"></span>
    <qm-section surface="subtle" ariaLabel="Quantum computing software">
      <qm-container>
        <div class="mission-callout" qmReveal>
          <div>
            <span class="eyebrow">QUANTUM MISSION</span>
            <h2 class="mission-callout__title">Ten independent applications. One proposed portfolio.</h2>
            <p class="mission-callout__body">
              Quantum Mission presents the ten proposed quantum applications as
              independent initiatives. MicroQuantum is a separate published technology
              and is not counted among them.
            </p>
          </div>
          <qm-button variant="secondary" size="md" [routerLinkValue]="'/quantum-mission'">
            Explore Quantum Mission →
          </qm-button>
        </div>

        <qm-product-portfolio
          title="Quantum Computing Software"
          description="The published MicroQuantum developer preview and the proposed Quantum Mission applications not featured in the Marketplace below. QuantumStudio and QubitSim are presented in the Marketplace; all ten Quantum Mission applications remain proposed and not available. Status and availability are stated per entry."
          [products]="catalogueQuantumProducts"
          relatedServiceId="quantum-computing"
          serviceLinkLabel="Explore quantum computing services" />
      </qm-container>
    </qm-section>

    <span id="space-software" class="anchor-alias" aria-hidden="true"></span>
    <qm-section surface="white" ariaLabel="Space systems software">
      <qm-container>
        <qm-product-portfolio
          title="Space Systems Software"
          description="Ground-segment, telemetry and mission-support software initiatives not featured in the Marketplace below. GroundLink and TelemetryHub are presented in the Marketplace. None is claimed to be flight-qualified, deployed or production-ready."
          [products]="catalogueSpaceProducts"
          relatedServiceId="space-systems"
          serviceLinkLabel="Explore space systems services" />
      </qm-container>
    </qm-section>

    <span id="cybersecurity-software" class="anchor-alias" aria-hidden="true"></span>
    <qm-section surface="subtle" ariaLabel="Cybersecurity and digital trust software">
      <qm-container>
        <qm-product-portfolio
          title="Cybersecurity &amp; Digital Trust Software"
          description="Proposed cybersecurity and digital trust software initiatives not featured in the Marketplace below. AIGuard and ThreatIntel are presented in the Marketplace. They are not certified security products and are not available for use."
          [products]="catalogueCyberProducts"
          relatedServiceId="cybersecurity-digital-trust"
          serviceLinkLabel="Explore cybersecurity services" />
      </qm-container>
    </qm-section>

    <span id="developer-tools" class="anchor-alias" aria-hidden="true"></span>
    <qm-section surface="subtle" ariaLabel="Programming languages and developer tools">
      <qm-container>
        <qm-product-portfolio
          title="Programming Languages &amp; Developer Tools"
          description="Karkain is QuantsMind's statically typed systems programming language with a self-hosted compiler. It is a developer preview with a verified public release and documentation."
          [products]="catalogueDeveloperToolsProducts"
          serviceLinkLabel="Explore Karkain technology"
          serviceRoute="/karkain" />
      </qm-container>
    </qm-section>


    <qm-section surface="canvas" size="sm" ariaLabel="Intelligence product portfolios">
      <qm-container>
        <header class="division-head" qmReveal>
          <span class="eyebrow">DIVISION B</span>
          <h2>Intelligence Product Portfolios</h2>
          <p>
            Five approved business intelligence portfolios. Products for these
            portfolios are developed and published separately; the current registry
            does not yet contain entries classified under these portfolios.
          </p>
        </header>
        <div class="portfolio-grid portfolio-grid--portfolios">
          @for (portfolio of intelligencePortfolios; track portfolio.id) {
            <article class="portfolio-card" qmReveal>
              <h3 class="portfolio-card__title">{{ portfolio.name }}</h3>
              <p class="portfolio-card__desc">{{ portfolio.description }}</p>
              <p class="portfolio-card__status">No products currently classified under this portfolio.</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="white" size="sm" ariaLabel="How products develop">
      <qm-container size="narrow">
        <span class="eyebrow">MATURITY</span>
        <h2>How work becomes a product.</h2>
        <p class="lead section-lead">
          QuantsMind Labs explores ideas before they are committed. A product is the
          final stage of that same path — not a separate process.
        </p>
        <div class="stages" aria-label="Maturity stages used across the QuantsMind ecosystem">
          @for (stage of stages; track stage; let last = $last) {
            <span class="stages__stage">{{ stage }}</span>
            @if (!last) {
              <span class="stages__arrow" aria-hidden="true">→</span>
            }
          }
        </div>
        <p class="product-note product-note--center">
          These stages are shared with QuantsMind Labs and the technology ecosystem. An
          idea can stop at any stage.
        </p>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" ariaLabel="How to get a QuantsMind product">
      <qm-container>
        <div class="flow-block">
          <span class="eyebrow">ACCESS</span>
          <h2>How to get a product.</h2>
          <p class="lead section-lead">
            Products are introduced to new users directly by QuantsMind. This website
            does not offer automated purchase, checkout or download.
          </p>

          <div class="flow" aria-label="Product access steps">
            @for (step of flow; track step.title; let last = $last) {
              <div class="flow__step">
                <h3 class="flow__title">{{ step.title }}</h3>
                <p class="flow__body">{{ step.body }}</p>
              </div>
              @if (!last) {
                <span class="flow__arrow" aria-hidden="true">→</span>
              }
            }
          </div>

          <div class="flow-block__cta">
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'"
              [ariaLabel]="'Request access to QuantsMind products'">
              Request Product Access →
            </qm-button>
            <qm-button variant="secondary" size="lg" [routerLinkValue]="'/technology'">
              Explore QuantsMind Technologies →
            </qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }

    .division-head { max-width: 820px; margin: 0 0 28px; }
    .division-head h2 {
      margin: 0 0 12px; font-size: clamp(26px, 3.4vw, 38px); line-height: 1.15;
      letter-spacing: -0.03em; color: var(--color-text-primary);
    }
    .division-head p {
      margin: 0; font-size: 17px; line-height: 1.7; color: var(--color-text-secondary);
      text-wrap: pretty;
    }
    .division-groups { display: grid; gap: 28px; margin-top: 8px; }
    .division-group {
      padding: 24px;
      background: var(--color-surface);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
    }
    .division-group__title {
      margin: 0 0 16px; font-size: 15px; font-weight: 700;
      color: var(--color-text-primary);
    }
    .division-group__grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
    @media (min-width: 768px) {
      .division-group__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    .directory-card {
      display: flex; flex-direction: column; gap: 6px;
      padding: 16px;
      background: var(--color-canvas);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-md);
    }
    .directory-card__source {
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--color-accent);
    }
    .directory-card__title { margin: 0; font-size: 15px; font-weight: 650; color: var(--color-text-primary); }
    .directory-card__desc { margin: 0; font-size: 13px; line-height: 1.6; color: var(--color-text-secondary); }
    .directory-card__version, .directory-card__maturity { margin: 0; font-size: 12px; color: var(--color-text-muted); }
    .directory-card__link {
      margin-top: 4px; font-size: 13px; font-weight: 600;
      color: var(--color-accent); text-decoration: none;
    }
    .directory-card__link:hover { text-decoration: underline; text-underline-offset: 3px; }
    .directory-empty { margin: 0; font-size: 13px; color: var(--color-text-muted); font-style: italic; }
    .directory-note { margin: 16px 0 0; font-size: 12px; color: var(--color-text-muted); }
    .portfolio-grid--portfolios {
      display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px;
    }
    @media (min-width: 640px) {
      .portfolio-grid--portfolios { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (min-width: 1024px) {
      .portfolio-grid--portfolios { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .portfolio-card__status {
      margin: 0; font-size: 13px; line-height: 1.6; color: var(--color-text-muted);
      font-style: italic;
    }

    .anchor-alias { display: block; height: 0; scroll-margin-top: 96px; }

    .category-nav {
      display: grid; grid-template-columns: 1fr; gap: 8px;
    }
    @media (min-width: 640px) { .category-nav { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1024px) { .category-nav { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
    .category-nav__link {
      display: flex; align-items: center; justify-content: space-between; gap: 10px;
      padding: 14px 16px; min-height: 44px;
      background: var(--color-surface-subtle);
      border: 1px solid var(--card-border); border-radius: var(--radius-md);
      color: var(--color-text-primary); text-decoration: none;
      transition: border-color 180ms ease, background-color 180ms ease, transform 180ms var(--qm-ease-out);
    }
    .category-nav__link:hover {
      background: var(--color-accent-subtle); border-color: var(--color-accent-muted);
      transform: translateY(-1px);
    }
    .category-nav__link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
    .category-nav__link--mission {
      background: var(--gradient-brand); border-color: transparent; color: #fff;
    }
    .category-nav__link--mission:hover {
      background: var(--gradient-brand); border-color: transparent;
      box-shadow: 0 12px 28px -16px rgba(37, 99, 235, 0.7);
    }
    .category-nav__label { font-size: 13px; font-weight: 650; line-height: 1.35; }
    .category-nav__count {
      flex: 0 0 auto; min-width: 26px; text-align: center;
      padding: 2px 7px; border-radius: var(--radius-pill);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; font-weight: 700;
      background: rgba(37, 99, 235, 0.08); color: var(--color-accent);
    }
    .category-nav__link--mission .category-nav__count {
      background: rgba(255, 255, 255, 0.18); color: #fff;
    }
    .category-nav__note {
      margin: 14px 0 0; font-size: 13px; line-height: 1.6; color: var(--color-text-secondary);
    }

    .catalogue-tools {
      display: flex; flex-direction: column; gap: 16px;
    .catalogue-discovery { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-bottom: 8px; }
    .catalogue-discovery__label { font-size: 12px; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }
    .catalogue-discovery__chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .catalogue-discovery__chip { font-size: 13px; font-weight: 500; padding: 6px 14px; border-radius: 999px; border: 1px solid var(--card-border); background: var(--card-bg); color: var(--color-text-secondary); cursor: pointer; transition: border-color 160ms ease, background 160ms ease, color 160ms ease; }
    .catalogue-discovery__chip:hover { border-color: var(--color-accent); color: var(--color-accent); }
    .catalogue-discovery__chip--active { background: var(--color-accent-subtle); border-color: var(--color-accent); color: var(--color-accent-dark); font-weight: 600; }
    .catalogue-discovery__chip:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
    }
    .catalogue-search { display: flex; flex-direction: column; gap: 6px; }
    .catalogue-search__label { font-size: 12px; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }
    .catalogue-search__input {
      padding: 10px 14px; font-size: 14.5px; font-family: inherit;
      background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: var(--radius-md, 8px); color: var(--color-text-primary);
      width: 100%; box-sizing: border-box;
    }
    .catalogue-search__input:focus { outline: 2px solid var(--color-accent); outline-offset: 1px; }
    .catalogue-filters { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end; }
    .catalogue-filter { display: flex; flex-direction: column; gap: 6px; min-width: 0; flex: 1 1 140px; }
    .catalogue-filter__label { font-size: 12px; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }
    .catalogue-filter__select {
      padding: 10px 14px; font-size: 14.5px; font-family: inherit;
      background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: var(--radius-md, 8px); color: var(--color-text-primary);
      width: 100%; box-sizing: border-box;
    }
    .catalogue-reset {
      padding: 10px 16px; font-size: 14px; font-weight: 600;
      background: transparent; border: 1px solid var(--card-border);
      border-radius: var(--radius-md, 8px); color: var(--color-accent);
      cursor: pointer;
    }
    .catalogue-reset:hover { background: var(--color-accent-subtle); }
    .catalogue-results { margin-top: 20px; display: flex; flex-direction: column; gap: 16px; }
    .catalogue-results__summary { font-size: 13px; color: var(--color-text-muted); margin: 0; }
    .catalogue-results__grid {
      display: grid; gap: 24px; grid-template-columns: 1fr;
    }
    @media (min-width: 768px) {
      .catalogue-results__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (min-width: 1024px) {
      .catalogue-results__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .catalogue-results__empty {
      font-size: 14.5px; color: var(--color-text-secondary); padding: 24px;
      background: var(--card-bg); border: 1px dashed var(--card-border);
      border-radius: var(--radius-md, 8px);
    }

    .marketplace__head { max-width: 760px; margin-bottom: 32px; }
    .marketplace__title {
      margin: 0 0 12px; font-size: clamp(24px, 3vw, 34px); font-weight: 700;
      letter-spacing: -0.025em; color: var(--color-text-primary);
    }
    .marketplace__intro {
      margin: 0; font-size: 15.5px; line-height: 1.7;
      color: var(--color-text-secondary);
    }
    .marketplace__count { margin: 14px 0 0; font-size: 13px; color: var(--color-text-muted); }
    .marketplace__count-value { font-weight: 600; color: var(--color-text-secondary); }
    .marketplace__grid {
      display: grid; gap: 24px; grid-template-columns: 1fr;
    }
    @media (min-width: 768px) {
      .marketplace__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (min-width: 1024px) {
      .marketplace__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .marketplace__item { display: flex; flex-direction: column; gap: 12px; }
    .marketplace__item qm-product-card { flex: 1; }
    .marketplace__domain {                                                                  \r\n      font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;\r\n      color: var(--color-accent);                                                          \r\n    }\r\n    .marketplace__rationale {                                                              \r\n      font-size: 13px; line-height: 1.6; color: var(--color-text-secondary);                \r\n    }\r\n    .marketplace__product-link {\r\n      text-decoration: none;\r\n      display: block;\r\n      transition: transform 150ms ease, box-shadow 150ms ease;\r\n    }\r\n    .marketplace__product-link:hover {\r\n      transform: translateY(-2px);\r\n      box-shadow: 0 4px 16px rgba(0,0,0,0.06);\r\n    }\r\n    .marketplace__product-link:focus-visible {\r\n      outline: 2px solid var(--color-accent);\r\n      outline-offset: 2px;\r\n    }\r\n
    .marketplace__item qm-product-card { flex: 1; }
    .marketplace__domain {
      margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--color-accent); line-height: 1.4;
    }
    .marketplace__rationale {
      margin: 0; font-size: 13px; line-height: 1.6; color: var(--color-text-secondary);
    }
    .marketplace__empty {
      font-size: 14.5px; color: var(--color-text-secondary); padding: 24px;
      background: var(--card-bg); border: 1px dashed var(--card-border);
      border-radius: var(--radius-md, 8px);
    }

    .featured-product {
      position: relative; overflow: hidden;
      display: flex; flex-direction: column; gap: 22px;
      padding: 28px;
      background:
        radial-gradient(620px 320px at 100% 0%, rgba(37, 99, 235, 0.08), transparent 62%),
        var(--card-bg);
      border: 1px solid var(--card-border); border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-sm);
    }
    .featured-product::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: var(--gradient-signal);
    }
    @media (min-width: 768px) { .featured-product { padding: 40px; } }
    .featured-product__head {
      display: flex; align-items: flex-start; justify-content: space-between;
      flex-wrap: wrap; gap: 16px;
    }
    .featured-product__name {
      margin: 0 0 6px; font-size: clamp(24px, 3vw, 34px); font-weight: 700;
      letter-spacing: -0.025em; color: var(--color-text-primary);
    }
    .featured-product__tagline { margin: 0; font-size: 15px; font-weight: 500; color: var(--color-accent); }
    .featured-product__badges { display: flex; flex-wrap: wrap; gap: 8px; }
    .featured-product__tags {
      display: flex; flex-wrap: wrap; gap: 6px;
      margin: 0; padding: 0; list-style: none;
    }
    .featured-product__tag {
      padding: 3px 8px; border-radius: var(--radius-pill);
      background: var(--color-accent-subtle); color: var(--color-accent-dark);
      font-size: 11px; font-weight: 600; line-height: 1.4;
      overflow-wrap: anywhere;
    }
    .featured-product__desc {
      margin: 0; max-width: 820px; font-size: 15.5px; line-height: 1.7;
      color: var(--color-text-secondary);
    }
    .featured-product__grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
    @media (min-width: 768px) { .featured-product__grid { grid-template-columns: 1fr 1fr; gap: 28px; } }
    .featured-product__h3 {
      margin: 0 0 12px; font-family: 'Inter', system-ui, sans-serif;
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--color-accent);
    }
    .featured-product__list { margin: 0; padding-left: 20px; color: var(--color-text-secondary); }
    .featured-product__list li { margin-bottom: 8px; line-height: 1.6; font-size: 14.5px; }
    .featured-product__list li:last-child { margin-bottom: 0; }
    .featured-product__notes { display: flex; flex-direction: column; gap: 12px; }
    .featured-product__note {
      margin: 0; padding: 14px 18px; font-size: 14px; line-height: 1.7;
      color: var(--color-text-secondary); background: var(--color-surface);
      border-left: 3px solid var(--color-accent); border-radius: 0 8px 8px 0;
    }
    .featured-product__cta { display: flex; flex-wrap: wrap; gap: 12px; }

    .featured-product__workflow { margin: 0; }
    .doc-flow {
      display: flex; flex-direction: column; gap: 10px;
      margin: 14px 0 12px; padding: 0; list-style: none;
    }
    .doc-flow__step {
      display: flex; flex-direction: column; gap: 4px;
      padding: 14px 16px; background: var(--color-canvas);
      border: 1px solid var(--color-border); border-radius: var(--radius-sm);
      min-width: 0;
    }
    .doc-flow__label { font-size: 14px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
    .doc-flow__detail { font-size: 13px; line-height: 1.5; color: var(--color-text-secondary); margin: 0; }
    .doc-flow__connector {
      display: flex; align-items: center; justify-content: center;
      color: var(--color-accent); font-size: 18px; line-height: 1; flex-shrink: 0;
    }
    .doc-flow__note { margin: 0; font-size: 13px; line-height: 1.6; color: var(--color-text-secondary); }
    @media (min-width: 768px) {
      .doc-flow { flex-direction: row; align-items: stretch; gap: 8px; }
      .doc-flow__step { flex: 1 1 0; }
      .doc-flow__connector { padding-top: 18px; }
    }
    @media (max-width: 767px) {
      .doc-flow__connector { transform: rotate(90deg); }
    }

    .mission-callout {
      display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
      gap: 20px; margin-bottom: 40px; padding: 28px;
      background: var(--gradient-ink); color: var(--color-ink-text);
      border: 1px solid var(--color-ink-border); border-radius: var(--radius-xl);
    }
    .mission-callout .eyebrow { color: var(--color-cyan-soft); }
    .mission-callout__title {
      margin: 0 0 8px; font-size: clamp(22px, 2.6vw, 30px); line-height: 1.2;
      color: var(--color-ink-text); letter-spacing: -0.02em;
    }
    .mission-callout__body { margin: 0; max-width: 720px; font-size: 14.5px; line-height: 1.7; color: var(--color-ink-muted); }

    .section-lead { max-width: 680px; margin: 0 0 40px; }
    .lead { font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); }

    .compare { display: grid; grid-template-columns: 1fr; gap: 24px; }
    @media (min-width: 768px) { .compare { grid-template-columns: 1fr 1fr; } }
    .compare__card {
      display: flex; flex-direction: column; align-items: flex-start; gap: 14px;
      padding: 32px; background: var(--card-bg);
      border: 1px solid var(--card-border); border-radius: var(--radius-lg);
    }
    .compare__title { font-size: 20px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
    .compare__body { font-size: 15px; line-height: 1.7; color: var(--color-text-secondary); margin: 0; }
    .compare__list { margin: 0; padding-left: 20px; color: var(--color-text-secondary); flex: 1; }
    .compare__list li { margin-bottom: 8px; line-height: 1.6; font-size: 15px; }
    .compare__list li:last-child { margin-bottom: 0; }

    .stages { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px 12px; }
    .stages__stage {
      font-size: 14px; font-weight: 500;
      color: var(--color-labs-dark); background: var(--color-labs-subtle);
      border: 1px solid var(--color-labs-muted); border-radius: var(--radius-sm);
      padding: 10px 18px;
    }
    .stages__arrow { color: var(--color-text-muted); font-size: 16px; }

    .product-note {
      margin: 0; padding: 14px 18px; font-size: 14px; line-height: 1.7;
      color: var(--color-text-secondary); background: var(--color-surface);
      border-left: 3px solid var(--color-accent); border-radius: 0 8px 8px 0;
    }
    .product-note--center { text-align: center; border-left: none; background: none; padding: 16px 0 0; }

    .flow-block { max-width: 900px; }
    .flow { display: flex; flex-direction: column; gap: 16px; margin-bottom: 36px; }
    @media (min-width: 1024px) { .flow { flex-direction: row; align-items: flex-start; gap: 12px; } }
    .flow__step {
      flex: 1; display: flex; flex-direction: column; gap: 8px;
      padding: 24px; background: var(--card-bg);
      border: 1px solid var(--card-border); border-radius: var(--card-radius);
    }
    .flow__title { font-size: 15px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
    .flow__body { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; }
    .flow__arrow { color: var(--color-text-muted); font-size: 18px; line-height: 1; text-align: center; flex-shrink: 0; }
    @media (min-width: 1024px) { .flow__arrow { padding-top: 32px; } }
    .flow-block__cta { display: flex; flex-wrap: wrap; gap: 12px; }

    @media (prefers-reduced-motion: reduce) {
      .category-nav__link { transition: none; }
      .category-nav__link:hover { transform: none; }
    }
    `]
})
export class ProductsComponent {
  readonly featuredProduct = getProductById('quantsmind-document-intelligence-mini');

  /**
   * Marketplace curation layer. Each entry names the approved service domain,
   * the registry product that represents it and the evidence-based rationale.
   * This does not change a product's portfolio, maturity or availability.
   */
  readonly marketplaceEntries: readonly MarketplaceEntry[] = [
    {
      serviceId: 'quantum-computing',
      serviceTitle: 'Quantum Computing & Quantum Software Engineering',
      product: requireProduct('quantum-studio'),
      rationale:
        'Proposed quantum circuit development and experimentation environment, directly scoped to quantum software engineering.'
    },
    {
      serviceId: 'space-systems',
      serviceTitle: 'Space Systems & Mission Software Engineering',
      product: requireProduct('ground-link'),
      rationale:
        'Ground-station frame reception, validation, deduplication, continuity and routing, with active engineering history.'
    },
    {
      serviceId: 'ai-intelligent-systems',
      serviceTitle: 'AI Engineering & Autonomous Intelligent Systems',
      product: requireProduct('ai-guard'),
      rationale:
        'The registry\'s only product explicitly addressing AI, LLM and agent systems; a cybersecurity-portfolio initiative for AI security assessment and control review.'
    },
    {
      serviceId: 'scientific-computing',
      serviceTitle: 'Scientific Computing & Digital Simulation',
      product: requireProduct('qubit-sim'),
      rationale:
        'Quantum circuit and state simulation with reproducible experimentation; a quantum-portfolio initiative selected for its simulation and experiment evidence.'
    },
    {
      serviceId: 'cybersecurity-digital-trust',
      serviceTitle: 'Cybersecurity Engineering & Digital Trust',
      product: requireProduct('threat-intel'),
      rationale:
        'Threat intelligence and indicator correlation, directly matching the cybersecurity and digital trust service.'
    },
    {
      serviceId: 'industrial-intelligence-digital-twin',
      serviceTitle: 'Industrial Intelligence & Digital Twin Engineering',
      product: requireProduct('telemetry-hub'),
      rationale:
        'Telemetry ingestion, distribution, backpressure and journaling; a space-portfolio initiative selected for telemetry-processing evidence, not an industrial deployment or digital twin.'
    }
  ];

  readonly marketplaceProductIds: readonly string[] =
    this.marketplaceEntries.map(entry => entry.product.id);
  private readonly marketplaceProductIdSet = new Set(this.marketplaceProductIds);

  readonly marketplaceProducts = computed(() =>
    this.marketplaceEntries.map(entry => entry.product)
  );

  readonly standaloneProducts = getProductsByPortfolio('standalone')
    .filter(product => product.id !== 'quantsmind-document-intelligence-mini');
  readonly quantumProducts = getProductsByPortfolio('quantum');
  readonly spaceProducts = getProductsByPortfolio('space');
  readonly cyberProducts = getProductsByPortfolio('cybersecurity');
  readonly developerToolsProducts = getProductsByPortfolio('developer-tools');
  readonly allProducts = [
    ...getProductsByPortfolio('standalone'),
    ...this.quantumProducts,
    ...this.spaceProducts,
    ...this.cyberProducts,
    ...this.developerToolsProducts
  ];

  readonly intelligencePortfolios = [
    { id: 'financial-intelligence', name: 'Financial Intelligence', description: 'Financial intelligence products and applications.' },
    { id: 'enterprise-ai', name: 'Enterprise AI', description: 'Enterprise AI products and applications.' },
    { id: 'data-intelligence', name: 'Data Intelligence', description: 'Data intelligence products and applications.' },
    { id: 'bio-intelligence', name: 'Bio Intelligence', description: 'Bio intelligence products and applications.' },
    { id: 'aerospace-intelligence', name: 'Aerospace Intelligence', description: 'Aerospace intelligence products and applications.' }
  ];

  readonly directoryEntries = VERIFIED_DIRECTORY_ENTRIES;
  readonly directoryNote = VERIFIED_DIRECTORY_NOTE;

  /** A1 entries — Programming Languages & Developer Engineering. */
  readonly a1Entries: readonly VerifiedDirectoryEntry[] = [
    ...this.directoryEntries.filter(entry => entry.category === 'a1-programming-languages')
  ];

  /** A2 entries — AI Development & Agent Platforms. */
  readonly a2Entries: readonly VerifiedDirectoryEntry[] = [
    ...this.directoryEntries.filter(entry =>
      entry.category === 'a2-ai-development' || entry.secondaryCategory === 'a2-ai-development'
    )
  ];

  /** A3 entries — Language Models & AI Systems. */
  readonly a3Entries: readonly VerifiedDirectoryEntry[] = [
    ...this.directoryEntries.filter(entry =>
      entry.category === 'a3-language-models' || entry.secondaryCategory === 'a3-language-models'
    )
  ];

  /** A4 entries — Scientific, Data & Quantum Technologies. */
  readonly a4Entries: readonly VerifiedDirectoryEntry[] = [
    ...this.directoryEntries.filter(entry => entry.category === 'a4-scientific-data-quantum')
  ];

  /**
   * Portfolio grids and catalogue search exclude the six Marketplace selections
   * so the same product is not presented twice as a catalogue card.
   */
  readonly catalogueStandaloneProducts = this.standaloneProducts
    .filter(product => !this.marketplaceProductIdSet.has(product.id));
  readonly catalogueQuantumProducts = this.quantumProducts
    .filter(product => !this.marketplaceProductIdSet.has(product.id));
  readonly catalogueSpaceProducts = this.spaceProducts
    .filter(product => !this.marketplaceProductIdSet.has(product.id));
  readonly catalogueCyberProducts = this.cyberProducts
    .filter(product => !this.marketplaceProductIdSet.has(product.id));
  readonly catalogueDeveloperToolsProducts = this.developerToolsProducts
    .filter(product => !this.marketplaceProductIdSet.has(product.id));
  readonly catalogueProducts = [
    ...this.catalogueStandaloneProducts,
    ...this.catalogueQuantumProducts,
    ...this.catalogueSpaceProducts,
    ...this.catalogueCyberProducts,
    ...this.catalogueDeveloperToolsProducts
  ];

  readonly searchQuery = signal('');
  readonly selectedDomain = signal('all');
  readonly selectedStatus = signal('all');

  readonly hasActiveFilters = computed(() =>
    this.searchQuery().trim() !== '' ||
    this.selectedDomain() !== 'all' ||
    this.selectedStatus() !== 'all'
  );

  readonly filteredProducts = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const domain = this.selectedDomain();
    const status = this.selectedStatus();
    return this.catalogueProducts.filter(product => {
      if (domain !== 'all' && product.portfolio !== domain) return false;
      if (status !== 'all' && product.maturity !== status) return false;
      if (query) {
        const haystack = [
          product.name,
          product.summary,
          product.description,
          ...(product.capabilities ?? []),
          ...(product.useCases ?? []),
          ...(product.technologyTags ?? [])
        ].join(' ').toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  });

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedDomain.set('all');
    this.selectedStatus.set('all');
  }

  readonly categories: ProductCategory[] = [
    { id: 'standalone-software', label: 'Standalone Software', count: getProductsByPortfolio('standalone').length },
    { id: 'quantum-software', label: 'Quantum Software', count: this.quantumProducts.length },
    { id: 'space-software', label: 'Space Systems', count: this.spaceProducts.length },
    { id: 'cybersecurity-software', label: 'Cybersecurity', count: this.cyberProducts.length },
    { id: 'developer-tools', label: 'Programming Languages & Developer Tools', count: getProductsByPortfolio('developer-tools').length }
  ];

  readonly workflow = [
    { label: 'Input documents', detail: 'PDF, DOCX, TXT' },
    { label: 'Text extraction', detail: 'Format readers resolve to one text representation' },
    { label: 'Field identification', detail: 'Configurable labels; value follows label' },
    { label: 'Structured output', detail: 'JSON or CSV; missing fields reported as absent' }
  ];

  readonly stages: string[] = [
    'Concept',
    'Experiment',
    'Prototype',
    'Technology',
    'Product / Service'
  ];

  readonly flow: FlowStep[] = [
    { title: 'Explore', body: 'Read what the product is and how it is intended to be used.' },
    { title: 'Evaluate', body: 'Assess whether it fits your documents and your workflow.' },
    { title: 'Request Access', body: 'Contact QuantsMind to request access and licensing details.' },
    { title: 'Licensed Use', body: 'Use the product under the licence agreed with QuantsMind.' }
  ];

  maturityLabel(product: Product): string {
    return maturityLabelFor(product.maturity);
  }

  availabilityLabel(product: Product): string {
    return availabilityLabelFor(product.availability);
  }

  maturityBadgeVariant(product: Product): BadgeVariant {
    return maturityBadgeVariantFor(product.maturity) as BadgeVariant;
  }

  availabilityBadgeVariant(product: Product): BadgeVariant {
    return availabilityBadgeVariantFor(product.availability) as BadgeVariant;
  }
}
