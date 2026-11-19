import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { SERVICE_AREAS, ServiceArea } from '../../content/services/service.registry';
import { ENGAGEMENT_MODELS } from '../../content/services/engagement.models';
import { PRODUCT_REGISTRY } from '../../content/products/product.registry';
import {
  Product,
  availabilityLabel as availabilityLabelFor,
  maturityLabel as maturityLabelFor
} from '../../content/products/product.model';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent } from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent } from '../../shared/components/qm-button/qm-button.component';

const SLUG_TO_ID: Readonly<Record<string, string>> = {
  'quantum-computing': 'quantum-computing',
  'space-systems': 'space-systems',
  'ai-engineering': 'ai-intelligent-systems',
  'scientific-computing': 'scientific-computing',
  'cybersecurity': 'cybersecurity-digital-trust',
  'industrial-intelligence': 'industrial-intelligence-digital-twin'
};

@Component({
  selector: 'qm-service-detail',
  imports: [
    RouterModule,
    QmContainerComponent,
    QmSectionComponent,
    QmButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Service detail">
      <qm-container>
        @if (missing) {
          <div class="service-detail__missing" role="alert">
            <span class="eyebrow">SERVICE NOT FOUND</span>
            <h1>We could not find that service</h1>
            <a routerLink="/services">← Back to Services</a>
          </div>
        } @else if (service) {
          <nav class="service-detail__crumbs" aria-label="Breadcrumb">
            <a routerLink="/services">Services</a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{{ service.title }}</span>
          </nav>

          <header class="service-detail__head">
            <span class="eyebrow">ENGINEERING SERVICE</span>
            <h1>{{ service.title }}</h1>
            <p class="service-detail__lead">{{ service.short }}</p>
            <p class="service-detail__problem">{{ service.problem }}</p>
            <div class="service-detail__cta">
              <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'" [queryParams]="{ service: service.id }" [ariaLabel]="'Discuss ' + service.title + ' with QuantsMind'">
                Discuss Your Requirement →
              </qm-button>
            </div>
          </header>

          <div class="service-detail__grid">
            <div class="service-detail__column">
              <section aria-labelledby="svc-scope" class="service-detail__block">
                <h2 id="svc-scope">Scope of services</h2>
                <ul>
                  @for (item of service.provides; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              </section>

              <section aria-labelledby="svc-deliverables" class="service-detail__block">
                <h2 id="svc-deliverables">Expected deliverables</h2>
                <ul>
                  @for (item of service.deliverables; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              </section>

              <section aria-labelledby="svc-engagement" class="service-detail__block">
                <h2 id="svc-engagement">How the work engages</h2>
                <p class="service-detail__note">Ways to scope work, not claims of existing customer contracts or delivery history. The right starting point depends on the evidence available.</p>
                <ol class="service-detail__engagement">
                  @for (model of engagementModels; track model.id) {
                    <li>
                      <strong>{{ model.title }}</strong>
                      <span>{{ model.summary }}</span>
                    </li>
                  }
                </ol>
              </section>

              @if (relatedProducts.length) {
                <section aria-labelledby="svc-products" class="service-detail__block">
                  <h2 id="svc-products">Related QuantsMind software</h2>
                  <p class="service-detail__note">Software is not a service; these are products and initiatives relevant to this domain. Availability is stated per product.</p>
                  <ul class="service-detail__products">
                    @for (product of relatedProducts; track product.id) {
                      <li>
                        <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
                        <span>{{ maturityLabel(product.maturity) }} · {{ availabilityLabel(product.availability) }}{{ product.version ? ' · ' + product.version : '' }}</span>
                      </li>
                    }
                  </ul>
                </section>
              }
            </div>

            <aside class="service-detail__aside">
              @if (service.technologies.length) {
                <section aria-labelledby="svc-tech" class="service-detail__block service-detail__card">
                  <h2 id="svc-tech">Relevant technology</h2>
                  <ul class="service-detail__tech">
                    @for (tech of service.technologies; track tech.name) {
                      <li><a [routerLink]="tech.href">{{ tech.name }}</a> <span>{{ tech.status }}</span></li>
                    }
                  </ul>
                </section>
              }

              <section aria-labelledby="svc-limits" class="service-detail__block service-detail__card">
                <h2 id="svc-limits">Limitations and exclusions</h2>
                <p>{{ service.context }}</p>
                <p>{{ service.outcome }}</p>
              </section>

              <section class="service-detail__card service-detail__card--accent" aria-labelledby="svc-discuss">
                <h2 id="svc-discuss">Not sure where to start?</h2>
                <p>Start with a discovery &amp; feasibility engagement: a structured assessment of the problem, constraints, evidence and realistic options.</p>
                <qm-button variant="primary" size="md" [fullWidth]="true" [routerLinkValue]="'/contact'" [queryParams]="{ service: service.id }" [ariaLabel]="'Discuss ' + service.title + ' with QuantsMind'">
                  Discuss Your Requirement →
                </qm-button>
              </section>
            </aside>
          </div>
        }
      </qm-container>
    </qm-section>
  `,
  styles: [`
    :host { display: block; }
    .eyebrow { font-size: 12px; letter-spacing: 0.08em; font-weight: 700; color: var(--color-accent); }
    .service-detail__crumbs { display: flex; gap: 8px; padding: 20px 0 0; font-size: 13px; color: var(--color-text-muted); align-items: center; }
    .service-detail__crumbs a { color: var(--color-accent); text-decoration: none; }
    .service-detail__head { padding: 16px 0 24px; max-width: 900px; display: flex; flex-direction: column; gap: 14px; }
    h1 { margin: 0; font-size: clamp(30px, 4.6vw, 46px); line-height: 1.12; }
    .service-detail__lead { margin: 0; color: var(--color-text-secondary); font-size: 18px; line-height: 1.6; }
    .service-detail__problem { margin: 0; color: var(--color-text-secondary); line-height: 1.65; border-left: 3px solid var(--color-accent); padding-left: 14px; }
    .service-detail__cta { margin-top: 4px; }
    .service-detail__grid { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(280px, 1fr); gap: 28px; align-items: start; }
    .service-detail__column { display: flex; flex-direction: column; gap: 28px; }
    .service-detail__block h2 { margin: 0 0 8px; font-size: 20px; }
    .service-detail__block ul { margin: 0; padding-left: 20px; color: var(--color-text-secondary); line-height: 1.65; }
    .service-detail__block li { margin-bottom: 6px; }
    .service-detail__block p { margin: 0 0 8px; color: var(--color-text-secondary); line-height: 1.65; }
    .service-detail__note { font-size: 13px; color: var(--color-text-muted); }
    .service-detail__engagement { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; counter-reset: step; }
    .service-detail__engagement li { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2px; padding: 12px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-md, 10px); counter-increment: step; }
    .service-detail__engagement li strong { color: var(--color-text-primary); }
    .service-detail__engagement li span { color: var(--color-text-secondary); font-size: 14px; }
    .service-detail__products { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .service-detail__products li { display: flex; flex-direction: column; gap: 2px; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md, 10px); }
    .service-detail__products a { color: var(--color-accent); font-weight: 600; text-decoration: none; }
    .service-detail__products span { font-size: 13px; color: var(--color-text-muted); }
    .service-detail__aside { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 88px; }
    .service-detail__card { padding: 18px; border: 1px solid var(--color-border); border-radius: var(--radius-lg, 14px); background: #fff; display: flex; flex-direction: column; gap: 8px; }
    .service-detail__card h2 { font-size: 16px; margin: 0; }
    .service-detail__card p { margin: 0; color: var(--color-text-secondary); line-height: 1.6; font-size: 14px; }
    .service-detail__card--accent { border-color: var(--color-accent); background: var(--color-accent-subtle, #eff6ff); }
    .service-detail__tech { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .service-detail__tech a { color: var(--color-accent); text-decoration: none; font-weight: 600; }
    .service-detail__tech span { color: var(--color-text-muted); font-size: 13px; margin-left: 6px; }
    .service-detail__missing { max-width: 700px; padding: 48px 0; display: flex; flex-direction: column; gap: 12px; }
    .service-detail__missing a { color: var(--color-accent); }
    @media (max-width: 900px) {
      .service-detail__grid { grid-template-columns: 1fr; }
      .service-detail__aside { position: static; }
    }
  `]
})
export class ServiceDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly service: ServiceArea | null;
  readonly missing: boolean;
  readonly engagementModels = ENGAGEMENT_MODELS;

  constructor() {
    const slug = this.route.snapshot.paramMap.get('service') ?? '';
    const id = SLUG_TO_ID[slug] ?? slug;
    this.service = SERVICE_AREAS.find(area => area.id === id) ?? null;
    this.missing = !this.service;
  }

  get relatedProducts() {
    const id = this.service?.id;
    if (!id) { return []; }
    return PRODUCT_REGISTRY.filter(p => p.relatedServiceId === id).slice(0, 6);
  }

  maturityLabel(maturity: Product['maturity']): string {
    return maturityLabelFor(maturity);
  }

  availabilityLabel(availability: Product['availability']): string {
    return availabilityLabelFor(availability);
  }
}
