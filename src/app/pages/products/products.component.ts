import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

interface Product {
  name: string;
  shortName: string;
  version: string;
  tagline: string;
  description: string;
  intendedUse: string[];
  deployment: string;
}

interface FlowStep {
  title: string;
  body: string;
}

@Component({
    selector: 'app-products',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">PRODUCTS</span>
        <h1>QuantsMind Products</h1>
        <p class="lead">
          Software built from the QuantsMind engineering and technology ecosystem —
          practical applications developed from the same foundations, disciplines and
          maturity standards as our engineering work.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white" ariaLabel="QuantsMind products">
      <qm-container>
        @for (product of products; track product.name) {
          <article class="product">
            <div class="product__head">
              <div>
                <h2 class="product__name">{{ product.name }}</h2>
                <p class="product__tagline">{{ product.tagline }}</p>
              </div>
              <div class="product__badges">
                <qm-badge variant="product">{{ product.shortName }}</qm-badge>
                <qm-badge variant="default">{{ product.version }}</qm-badge>
              </div>
            </div>

            <p class="product__desc">{{ product.description }}</p>

            <div class="product__grid">
              <div>
                <h3 class="product__h3">Intended use</h3>
                <ul class="product__list">
                  @for (use of product.intendedUse; track use) {
                    <li>{{ use }}</li>
                  }
                </ul>
              </div>
              <div>
                <h3 class="product__h3">Deployment</h3>
                <p class="product__body">{{ product.deployment }}</p>
              </div>
            </div>

            <p class="product__note">
              Product details, availability and licensing terms are confirmed directly
              with QuantsMind.
            </p>

            <div class="product__cta">
              <qm-button variant="primary" size="md" [routerLinkValue]="'/contact'"
                [ariaLabel]="'Request access to ' + product.name">
                Request Product Access →
              </qm-button>
            </div>
          </article>
        }
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" ariaLabel="Technologies and products">
      <qm-container>
        <span class="eyebrow">ECOSYSTEM</span>
        <h2>Technologies and products are different things.</h2>
        <p class="lead section-lead">
          The QuantsMind technology ecosystem is developed and maintained as independent
          software technologies. A product is a usable application built on top of that
          work.
        </p>

        <div class="compare">
          <article class="compare__card">
            <h3 class="compare__title">QuantsMind Technologies</h3>
            <p class="compare__body">
              Independently developed software technologies, languages and foundations.
            </p>
            <ul class="compare__list">
              <li>Karkain</li>
              <li>MicroQuantum</li>
              <li>QuantsMind SDK</li>
            </ul>
            <qm-button variant="secondary" size="sm" [routerLinkValue]="'/technology'">
              Explore Technologies →
            </qm-button>
          </article>

          <article class="compare__card">
            <h3 class="compare__title">QuantsMind Products</h3>
            <p class="compare__body">
              Applications delivered from the ecosystem for practical day-to-day use.
            </p>
            <ul class="compare__list">
              @for (product of products; track product.name) {
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
        <p class="product__note product__note--center">
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
            @for (step of flow; track step; let last = $last) {
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
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 720px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 640px; margin: 0; }
    .section-lead { max-width: 680px; margin: 0 0 40px; }

    .product {
      display: flex; flex-direction: column; gap: 20px;
      padding: 32px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 16px;
    }
    @media (min-width: 768px) { .product { padding: 40px; } }
    .product__head {
      display: flex; align-items: flex-start; justify-content: space-between;
      flex-wrap: wrap; gap: 16px;
    }
    .product__name {
      font-size: clamp(22px, 2.6vw, 30px); font-weight: 700; color: #111827;
      margin: 0 0 6px; letter-spacing: -0.02em;
    }
    .product__tagline { font-size: 15px; font-weight: 500; color: #2563EB; margin: 0; }
    .product__badges { display: flex; flex-wrap: wrap; gap: 8px; }
    .product__desc { font-size: 16px; line-height: 1.7; color: #475569; margin: 0; max-width: 760px; }
    .product__grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
    @media (min-width: 768px) { .product__grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
    .product__h3 {
      margin: 0 0 12px; font-size: 13px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase; color: #2563EB;
    }
    .product__list { margin: 0; padding-left: 20px; color: #475569; }
    .product__list li { margin-bottom: 8px; line-height: 1.6; font-size: 15px; }
    .product__list li:last-child { margin-bottom: 0; }
    .product__body { margin: 0; font-size: 15px; line-height: 1.7; color: #475569; max-width: 420px; }
    .product__note {
      margin: 0; padding: 14px 18px; font-size: 14px; line-height: 1.7;
      color: #475569; background: #FFFFFF;
      border-left: 3px solid #2563EB; border-radius: 0 8px 8px 0;
    }
    .product__note--center { text-align: center; border-left: none; background: none; padding: 16px 0 0; }
    .product__cta { display: flex; flex-wrap: wrap; }

    .compare { display: grid; grid-template-columns: 1fr; gap: 24px; }
    @media (min-width: 768px) { .compare { grid-template-columns: 1fr 1fr; } }
    .compare__card {
      display: flex; flex-direction: column; align-items: flex-start; gap: 14px;
      padding: 32px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 16px;
    }
    .compare__title { font-size: 20px; font-weight: 600; color: #111827; margin: 0; }
    .compare__body { font-size: 15px; line-height: 1.7; color: #475569; margin: 0; }
    .compare__list { margin: 0; padding-left: 20px; color: #475569; flex: 1; }
    .compare__list li { margin-bottom: 8px; line-height: 1.6; font-size: 15px; }
    .compare__list li:last-child { margin-bottom: 0; }

    .stages {
      display: flex; flex-wrap: wrap; align-items: center;
      justify-content: center; gap: 10px 12px;
    }
    .stages__stage {
      font-size: 14px; font-weight: 500; color: #0F766E; background: #F0FDFA;
      border: 1px solid #99F6E4; border-radius: 8px; padding: 10px 18px;
    }
    .stages__arrow { color: #94A3B8; font-size: 16px; }

    .flow-block { max-width: 900px; }
    .flow {
      display: flex; flex-direction: column; gap: 16px; margin-bottom: 36px;
    }
    @media (min-width: 1024px) { .flow { flex-direction: row; align-items: flex-start; gap: 12px; } }
    .flow__step {
      flex: 1; display: flex; flex-direction: column; gap: 8px;
      padding: 24px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .flow__title { font-size: 15px; font-weight: 600; color: #111827; margin: 0; }
    .flow__body { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; }
    .flow__arrow {
      color: #94A3B8; font-size: 18px; line-height: 1;
      text-align: center; flex-shrink: 0;
    }
    @media (min-width: 1024px) { .flow__arrow { padding-top: 32px; } }
    .flow-block__cta { display: flex; flex-wrap: wrap; gap: 12px; }
    `]
})
export class ProductsComponent {
  products: Product[] = [
    {
      name: 'QuantsMind Document Intelligence Mini',
      shortName: 'DI Mini',
      version: 'v1.0.0',
      tagline: 'Lightweight document intelligence software',
      description:
        'A compact document-intelligence product developed by QuantsMind. DI Mini is the ' +
        'first product released from the QuantsMind technology ecosystem, and is intended ' +
        'to be small, practical and easy to run.',
      intendedUse: [
        'Organising and working with document collections locally',
        'Exploring document-intelligence workflows on your own machine',
        'Evaluating the product before committing to licensed use'
      ],
      deployment:
        'Runs on your own machine. No cloud account is required.'
    }
  ];

  stages: string[] = [
    'Concept',
    'Experiment',
    'Prototype',
    'Technology',
    'Product / Service'
  ];

  flow: FlowStep[] = [
    { title: 'Explore',     body: 'Read what the product is and how it is intended to be used.' },
    { title: 'Evaluate',   body: 'Assess whether it fits your documents and your workflow.' },
    { title: 'Request Access', body: 'Contact QuantsMind to request access and licensing details.' },
    { title: 'Licensed Use',   body: 'Use the product under the licence agreed with QuantsMind.' }
  ];
}
