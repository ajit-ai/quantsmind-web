import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent } from '../../shared/components/qm-badge/qm-badge.component';
import { QmServiceProductShowcaseComponent } from '../../shared/components/qm-service-product-showcase/qm-service-product-showcase.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';
import { SERVICE_AREAS, ServiceArea } from '../../content/services/service.registry';

interface DeliveryStep {
  title: string;
  body: string;
}

@Component({
    selector: 'app-services',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, QmServiceProductShowcaseComponent, QmPageHeroComponent, QmRevealDirective, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <qm-page-hero
      eyebrow="BUSINESS SOLUTIONS"
      title="Business Solutions"
      lead="Advanced engineering services for technology companies, product startups, growing SMEs, enterprise engineering teams and research organisations."
      tone="quantum"
      [artLabels]="['Architecture', 'Quantum', 'AI & ML', 'Cloud']">
      <p heroLead class="qm-page-hero__lead">
        Six fixed engineering domains, each with a clear scope, a defined delivery
        approach and an honest statement of what the work can and cannot establish.
      </p>
      <p class="hero-lead__sub">
        Engagements typically progress from initial discussion through to delivered
        engineering work. Scope, timelines and commercial terms are agreed for each
        engagement individually.
      </p>
      <div heroActions class="hero-actions">
        <qm-button variant="primary" size="md" [routerLinkValue]="'/contact'">
          Discuss Your Requirement →
        </qm-button>
        <qm-button variant="outline" size="md" [routerLinkValue]="'/products'">
          Explore Products
        </qm-button>
      </div>
    </qm-page-hero>

    <div class="engagement-model" qmReveal>
      <qm-container>
        <span id="engagement-models" class="anchor-alias" aria-hidden="true"></span>
        <h2 class="engagement-model__heading">Engineering Engagement Model</h2>
        <p class="engagement-model__intro">
          Engagements typically progress from initial discussion through to delivered
          engineering work. Scope, timelines and commercial terms are agreed for each
          engagement individually.
        </p>
        <div class="engagement-model__grid">
          <article class="engagement-model__card">
            <span class="engagement-model__number">01</span>
            <h3 class="engagement-model__title">Discovery &amp; Feasibility</h3>
            <p class="engagement-model__body">
              Initial technical discussion to assess whether QuantsMind's capabilities
              align with the problem domain. This may include a feasibility study,
              architecture probe, or prototype spike.
            </p>
          </article>
          <article class="engagement-model__card">
            <span class="engagement-model__number">02</span>
            <h3 class="engagement-model__title">Architecture &amp; Consulting</h3>
            <p class="engagement-model__body">
              Design of system architecture, technology selection, integration
              planning, or risk assessment for the identified scope.
            </p>
          </article>
          <article class="engagement-model__card">
            <span class="engagement-model__number">03</span>
            <h3 class="engagement-model__title">Prototype &amp; Development</h3>
            <p class="engagement-model__body">
              Delivery of a prototype, proof-of-concept, or production-relevant
              engineering work to validate the approach and produce concrete
              deliverables.
            </p>
          </article>
          <article class="engagement-model__card">
            <span class="engagement-model__number">04</span>
            <h3 class="engagement-model__title">Implementation &amp; Support</h3>
            <p class="engagement-model__body">
              Ongoing engineering integration, validation, and technical support
              as agreed. Engagement terms including duration, deliverables and
              commercial conditions are agreed upfront.
            </p>
          </article>
        </div>
      </qm-container>
    </div>

    <qm-section surface="white">
      <qm-container>
        <header class="services-intro" qmReveal>
          <span class="eyebrow">SERVICE AREAS</span>
          <h2>Six engineering domains. One delivery approach.</h2>
          <p>
            Every engagement starts with the customer's problem rather than a predetermined
            technology. We assess the requirement, define the approach, engineer the
            software and state the evidence behind the result. QuantsMind works as an
            engineering partner - translating research and emerging technology into
            practical, maintainable software systems.
          </p>
        </header>

        <nav class="service-nav" aria-label="Service areas">
          @for (svc of services; track svc.id; let i = $index) {
            <a class="service-nav__link"
               [routerLink]="['/services']"
               [fragment]="svc.id">
              <span class="service-nav__index" aria-hidden="true">0{{ i + 1 }}</span>
              <span>{{ svc.title }}</span>
            </a>
          }
        </nav>

        <ol class="delivery-steps" aria-label="How QuantsMind engagements work">
          @for (step of deliverySteps; track step.title; let i = $index) {
            <li class="delivery-step" qmReveal [qmRevealDelay]="i * 55">
              <span class="delivery-step__index" aria-hidden="true">0{{ i + 1 }}</span>
              <h3 class="delivery-step__title">{{ step.title }}</h3>
              <p class="delivery-step__body">{{ step.body }}</p>
            </li>
          }
        </ol>

        <div class="service-list">
          @for (svc of services; track svc.id; let i = $index) {
            @if (svc.id === 'industrial-intelligence-digital-twin') {
              <span id="software-architecture" class="anchor-alias" aria-hidden="true"></span>
            }
            <section class="service" [id]="svc.id" qmReveal [qmRevealDelay]="i * 40">
              <header class="service__head">
                <div class="service__icon" aria-hidden="true" [innerHTML]="svc.icon | qmSafeHtml"></div>
                <div class="service__heading">
                  <span class="service__index" aria-hidden="true">0{{ i + 1 }}</span>
                  <h2 class="service__title">{{ svc.title }}</h2>
                  <p class="service__short">{{ svc.short }}</p>
                </div>
              </header>

              <p class="service__problem">
                <strong>Typical problem.</strong> {{ svc.problem }}
              </p>

              <div class="service__grid">
                <div class="service__group">
                  <h3 class="service__h3">What we provide</h3>
                  <ul class="service__list">
                    @for (item of svc.provides; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>
                <div class="service__group">
                  <h3 class="service__h3">Practical deliverables</h3>
                  <ul class="service__list">
                    @for (item of svc.deliverables; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>
              </div>

              <div class="service__context">
                <h3 class="service__h3">Technology &amp; capability context</h3>
                <p>{{ svc.context }}</p>
              </div>

              <p class="service__outcome">
                <strong>Outcome.</strong> {{ svc.outcome }}
              </p>

              @if (svc.technologies.length) {
                <div class="service__tech">
                  <h3 class="service__h3">Related QuantsMind technologies</h3>
                  <ul class="service__tech-list" role="list">
                    @for (tech of svc.technologies; track tech.name) {
                      <li class="service__tech-item">
                        <a class="service__tech-link" [routerLink]="tech.href">{{ tech.name }}</a>
                        <qm-badge [variant]="tech.badge"
                          [attr.aria-label]="tech.name + ' maturity: ' + tech.status">{{ tech.status }}</qm-badge>
                      </li>
                    }
                  </ul>
                </div>
              }

              @if (svc.showcaseIds) {
                <qm-service-product-showcase
                  [featuredProductIds]="svc.showcaseIds"
                  [heading]="svc.showcaseHeading"
                  [description]="svc.showcaseDescription"
                  [productsAnchor]="svc.productsAnchor"
                  [linkLabel]="svc.productsLinkLabel" />
              }

              @if (svc.detailLink) {
                <p class="service__detail">
                  <a class="service__detail-link" [routerLink]="svc.detailLink.route">
                    {{ svc.detailLink.label }} &rarr;
                  </a>
                </p>
              }

              @if (svc.extraLink) {
                <p class="service__extra">
                  <a class="service__extra-link" [routerLink]="svc.extraLink.route">
                    {{ svc.extraLink.label }} &rarr;
                  </a>
                </p>
              }

              <div class="service__cta">
                <qm-button variant="primary" size="md" [routerLinkValue]="'/contact'"
                  [ariaLabel]="'Discuss ' + svc.title + ' with QuantsMind'">
                  Discuss this requirement →
                </qm-button>
                <qm-button variant="outline" size="md" [routerLinkValue]="'/products'">
                  View related products
                </qm-button>
              </div>
            </section>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" size="sm">
      <qm-container size="narrow">
        <div class="qm-cta-band page-cta" qmReveal>
          <span class="eyebrow">ENGAGEMENT</span>
          <h2>Discuss Your Requirement</h2>
          <p>
            Tell us about the system you are building or the problem you are facing.
            We will discuss whether and how we can help.
          </p>
          <div class="qm-cta-band__actions">
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
              Discuss Your Requirement →
            </qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }

    /* ── ENGAGEMENT MODEL ─────────────────────────────── */
    .engagement-model {
      padding: 48px 0;
      border-bottom: 1px solid var(--color-border);
    }
    .engagement-model__heading {
      margin: 0 0 12px;
      font-size: clamp(26px, 3.4vw, 38px);
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: var(--color-text-primary);
    }
    .engagement-model__intro {
      margin: 0 0 32px;
      max-width: 720px;
      font-size: 17px;
      line-height: 1.7;
      color: var(--color-text-secondary);
      text-wrap: pretty;
    }
    .engagement-model__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 768px) {
      .engagement-model__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    .engagement-model__card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 24px;
      background: var(--color-surface);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xs);
      min-height: 0;
    }
    .engagement-model__number {
      display: block;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--color-accent);
      margin-bottom: 4px;
    }
    .engagement-model__title {
      margin: 0;
      font-size: 16px;
      font-weight: 650;
      line-height: 1.3;
      color: var(--color-text-primary);
    }
    .engagement-model__body {
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-secondary);
    }

    .services-intro { max-width: 820px; margin: 0 0 28px; }
    .services-intro h2 {
      margin: 0 0 12px; font-size: clamp(26px, 3.4vw, 38px); line-height: 1.15;
      letter-spacing: -0.03em; color: var(--color-text-primary);
    }
    .services-intro p {
      margin: 0; font-size: 17px; line-height: 1.7; color: var(--color-text-secondary);
      text-wrap: pretty;
    }

    .service-nav {
      display: grid; grid-template-columns: 1fr; gap: 8px;
      margin: 0 0 32px;
    }
    @media (min-width: 640px) { .service-nav { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1024px) { .service-nav { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .service-nav__link {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 13px 16px; min-height: 44px;
      background: var(--color-surface-subtle);
      border: 1px solid var(--card-border); border-radius: var(--radius-md);
      color: var(--color-text-primary); text-decoration: none;
      font-size: 13.5px; font-weight: 600; line-height: 1.4;
      transition: border-color 180ms ease, background-color 180ms ease, transform 180ms var(--qm-ease-out);
    }
    .service-nav__link:hover {
      background: var(--color-accent-subtle); border-color: var(--color-accent-muted);
      transform: translateY(-1px);
    }
    .service-nav__link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
    .service-nav__index {
      flex: 0 0 auto; font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      color: var(--color-accent); padding-top: 3px;
    }

    .delivery-steps {
      display: grid; grid-template-columns: 1fr; gap: 12px;
      margin: 0 0 48px; padding: 0; list-style: none;
    }
    @media (min-width: 640px) { .delivery-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1024px) { .delivery-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .delivery-step {
      position: relative; padding: 20px;
      background: var(--color-surface);
      border: 1px solid var(--card-border); border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xs);
    }
    .delivery-step__index {
      display: block; margin-bottom: 10px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      color: var(--color-accent);
    }
    .delivery-step__title { margin: 0 0 6px; font-size: 15px; font-weight: 650; color: var(--color-text-primary); }
    .delivery-step__body { margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--color-text-secondary); }

    .service-list { display: flex; flex-direction: column; gap: 32px; }
    .anchor-alias { display: block; height: 0; scroll-margin-top: 96px; }

    .service {
      position: relative; overflow: hidden;
      padding: 28px;
      background:
        radial-gradient(620px 320px at 100% 0%, rgba(37, 99, 235, 0.06), transparent 62%),
        var(--color-surface);
      border: 1px solid var(--card-border); border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-sm);
      scroll-margin-top: 96px;
    }
    .service::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: var(--gradient-signal);
    }
    @media (min-width: 768px) { .service { padding: 40px; } }

    .service__head { display: flex; gap: 18px; align-items: flex-start; margin-bottom: 22px; }
    .service__icon {
      width: 52px; height: 52px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: var(--gradient-brand); border-radius: var(--radius-md); color: #fff;
      box-shadow: 0 12px 26px -14px rgba(37, 99, 235, 0.65);
    }
    .service__heading { min-width: 0; }
    .service__index {
      display: block; margin-bottom: 6px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
      color: var(--color-accent);
    }
    .service__title {
      margin: 0 0 8px; font-size: clamp(22px, 2.8vw, 31px); line-height: 1.2;
      font-weight: 700; letter-spacing: -0.025em; color: var(--color-text-primary);
    }
    .service__short { margin: 0; font-size: 15.5px; line-height: 1.7; color: var(--color-text-secondary); max-width: 760px; }

    .service__problem {
      margin: 0 0 24px; padding: 16px 18px;
      color: var(--color-text-secondary); font-size: 14.5px; line-height: 1.7;
      background: var(--color-surface-subtle);
      border-left: 3px solid var(--color-accent); border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    }
    .service__problem strong { color: var(--color-text-primary); }

    .service__grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 20px; }
    @media (min-width: 768px) { .service__grid { grid-template-columns: 1fr 1fr; gap: 20px; } }
    .service__group {
      padding: 22px; background: var(--color-surface-subtle);
      border: 1px solid var(--card-border); border-radius: var(--radius-lg);
    }
    .service__h3 {
      margin: 0 0 12px; font-family: 'Inter', system-ui, sans-serif;
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--color-accent);
    }
    .service__list { margin: 0; padding: 0; list-style: none; color: var(--color-text-secondary); }
    .service__list li {
      display: flex; align-items: flex-start; gap: 10px;
      margin-bottom: 9px; line-height: 1.6; font-size: 14px;
    }
    .service__list li::before {
      content: ''; flex: 0 0 auto; width: 6px; height: 6px; margin-top: 8px;
      border-radius: 50%; background: var(--gradient-signal);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.07);
    }
    .service__list li:last-child { margin-bottom: 0; }

    .service__context { margin-bottom: 20px; }
    .service__context p {
      margin: 0; max-width: 820px; color: var(--color-text-secondary);
      font-size: 14.5px; line-height: 1.7; text-wrap: pretty;
    }

    .service__outcome {
      margin: 0 0 24px; padding: 16px 18px;
      background: linear-gradient(100deg, rgba(37, 99, 235, 0.08), rgba(6, 182, 212, 0.04));
      border: 1px solid rgba(37, 99, 235, 0.14);
      border-left: 3px solid var(--color-accent);
      border-radius: var(--radius-md);
      color: var(--color-text-secondary); font-size: 14.5px; line-height: 1.7;
    }
    .service__outcome strong { color: var(--color-text-primary); }

    .service__tech { margin: 0 0 8px; }
    .service__tech-list {
      display: flex; flex-wrap: wrap; gap: 10px;
      margin: 0; padding: 0; list-style: none;
    }
    .service__tech-item {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 12px; min-width: 0;
      background: var(--color-surface); border: 1px solid var(--card-border);
      border-radius: var(--radius-md);
    }
    .service__tech-link {
      font-size: 13.5px; font-weight: 600; color: var(--color-text-primary);
      text-decoration: none; overflow-wrap: anywhere;
    }
    .service__tech-link:hover { color: var(--color-accent); text-decoration: underline; }
    .service__tech-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

    .service__extra { margin: 16px 0 0; }
    .service__extra-link { font-size: 14px; font-weight: 600; color: var(--color-accent); text-decoration: none; }
    .service__extra-link:hover { text-decoration: underline; }
    .service__extra-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

    .service__detail { margin: 16px 0 0; }
    .service__detail-link { font-size: 14px; font-weight: 600; color: var(--color-accent); text-decoration: none; }
    .service__detail-link:hover { text-decoration: underline; }
    .service__detail-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

    .service__cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }

    .page-cta { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px; }
    .page-cta .eyebrow { margin-bottom: 0; }
    .page-cta h2 { margin: 0; }
    .page-cta p { margin: 0; }

    @media (prefers-reduced-motion: reduce) {
      .service-nav__link { transition: none; }
      .service-nav__link:hover { transform: none; }
    }
  `]
})
export class ServicesComponent {
  readonly deliverySteps: DeliveryStep[] = [
    {
      title: 'Assess',
      body: 'Understand the system, constraints, evidence and the decision that has to be made.'
    },
    {
      title: 'Design',
      body: 'Define the approach, interfaces, delivery scope and the limits of what can be claimed.'
    },
    {
      title: 'Engineer',
      body: 'Build, integrate and verify the software with reproducible engineering records.'
    },
    {
      title: 'Support',
      body: 'Document the result, hand over the evidence and support the next iteration.'
    }
  ];

  services: ServiceArea[] = SERVICE_AREAS;
}
