import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { QmProductPortfolioComponent } from '../../shared/components/qm-product-portfolio/qm-product-portfolio.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';
import { getProductById, getProductsByPortfolio } from '../../content/products/product.registry';
import {
  Product,
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

@Component({
    selector: 'app-products',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, QmProductPortfolioComponent, QmPageHeroComponent, QmRevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <qm-page-hero
      eyebrow="PRODUCTS"
      title="QuantsMind Products"
      lead="A registry-driven portfolio of software applications and initiatives, presented with the maturity, availability and evidence that currently exist."
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
          product registry; they are not adoption, sales or deployment figures.
        </p>
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
          [products]="standaloneProducts" />
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
          description="The published MicroQuantum developer preview and ten proposed Quantum Mission applications. Status and availability are stated per entry."
          [products]="quantumProducts"
          relatedServiceId="quantum-computing"
          serviceLinkLabel="Explore quantum computing services" />
      </qm-container>
    </qm-section>

    <span id="space-software" class="anchor-alias" aria-hidden="true"></span>
    <qm-section surface="white" ariaLabel="Space systems software">
      <qm-container>
        <qm-product-portfolio
          title="Space Systems Software"
          description="Ground-segment, telemetry and mission-support software initiatives. None is claimed to be flight-qualified, deployed or production-ready."
          [products]="spaceProducts"
          relatedServiceId="space-systems"
          serviceLinkLabel="Explore space systems services" />
      </qm-container>
    </qm-section>

    <span id="cybersecurity-software" class="anchor-alias" aria-hidden="true"></span>
    <qm-section surface="subtle" ariaLabel="Cybersecurity and digital trust software">
      <qm-container>
        <qm-product-portfolio
          title="Cybersecurity &amp; Digital Trust Software"
          description="Proposed cybersecurity and digital trust software initiatives. They are not certified security products and are not available for use."
          [products]="cyberProducts"
          relatedServiceId="cybersecurity-digital-trust"
          serviceLinkLabel="Explore cybersecurity services" />
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" ariaLabel="Technologies and products">
      <qm-container>
        <span class="eyebrow">ECOSYSTEM</span>
        <h2>Technologies and products are different things.</h2>
        <p class="lead section-lead">
          The QuantsMind technology ecosystem is developed and maintained as independent
          software technologies. A product is a usable application built on top of that
          work. This page lists both, but does not blur the distinction between them.
        </p>

        <div class="compare">
          <article class="compare__card" qmReveal>
            <h3 class="compare__title">QuantsMind Technologies</h3>
            <p class="compare__body">
              Independently developed software technologies, languages and foundations.
            </p>
            <ul class="compare__list">
              <li>Karkain</li>
              <li>MicroQuantum</li>
              <li>QuantsMind SDK</li>
              <li>QuantsMind Relational DB</li>
              <li>GuardMCP</li>
            </ul>
            <qm-button variant="secondary" size="sm" [routerLinkValue]="'/technology'">
              Explore Technologies →
            </qm-button>
          </article>

          <article class="compare__card" qmReveal [qmRevealDelay]="80">
            <h3 class="compare__title">QuantsMind Products</h3>
            <p class="compare__body">
              Applications delivered from the ecosystem for practical day-to-day use.
            </p>
            <ul class="compare__list">
              @for (product of allProducts; track product.id) {
                <li>{{ product.name }}</li>
              }
            </ul>
            <qm-button variant="secondary" size="sm" [routerLinkValue]="'/contact'">
              Request Access →
            </qm-button>
          </article>
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

  readonly standaloneProducts = getProductsByPortfolio('standalone')
    .filter(product => product.id !== 'quantsmind-document-intelligence-mini');
  readonly quantumProducts = getProductsByPortfolio('quantum');
  readonly spaceProducts = getProductsByPortfolio('space');
  readonly cyberProducts = getProductsByPortfolio('cybersecurity');
  readonly allProducts = [
    ...getProductsByPortfolio('standalone'),
    ...this.quantumProducts,
    ...this.spaceProducts,
    ...this.cyberProducts
  ];

  readonly categories: ProductCategory[] = [
    { id: 'standalone-software', label: 'Standalone Software', count: getProductsByPortfolio('standalone').length },
    { id: 'quantum-software', label: 'Quantum Software', count: this.quantumProducts.length },
    { id: 'space-software', label: 'Space Systems', count: this.spaceProducts.length },
    { id: 'cybersecurity-software', label: 'Cybersecurity', count: this.cyberProducts.length }
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
