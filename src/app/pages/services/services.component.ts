import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { QmServiceProductShowcaseComponent } from '../../shared/components/qm-service-product-showcase/qm-service-product-showcase.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

interface TechnologyAssociation {
  name: string;
  status: string;
  badge: BadgeVariant;
  href: string;
}

interface ServiceArea {
  id: string;
  icon: string;
  title: string;
  short: string;
  /** The customer situation this service is intended to address. */
  problem: string;
  provides: string[];
  deliverables: string[];
  context: string;
  outcome: string;
  technologies: TechnologyAssociation[];
  /** Optional product showcase wiring. */
  showcaseIds?: readonly string[];
  showcaseHeading?: string;
  showcaseDescription?: string;
  productsAnchor?: string;
  productsLinkLabel?: string;
  /** Extra destination shown beneath the product showcase. */
  extraLink?: { label: string; route: string };
  /** Optional link to a dedicated service detail page. */
  detailLink?: { label: string; route: string };
}

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
      eyebrow="SERVICES"
      title="Engineering Services"
      lead="Practical software engineering and technology consulting for organizations building, modernizing or scaling software systems."
      tone="quantum"
      [artLabels]="['Architecture', 'Quantum', 'AI & ML', 'Cloud']">
      <p heroLead class="qm-page-hero__lead">
        Six fixed engineering domains, each with a clear scope, a defined delivery
        approach and an honest statement of what the work can and cannot establish.
      </p>
      <div heroActions class="hero-actions">
        <qm-button variant="primary" size="md" [routerLinkValue]="'/contact'">
          Discuss an Engineering Requirement →
        </qm-button>
        <qm-button variant="outline" size="md" [routerLinkValue]="'/products'">
          Explore Products
        </qm-button>
      </div>
    </qm-page-hero>

    <qm-section surface="white">
      <qm-container>
        <header class="services-intro" qmReveal>
          <span class="eyebrow">SERVICE AREAS</span>
          <h2>Six engineering domains. One delivery approach.</h2>
          <p>
            Every engagement starts with the problem rather than a predetermined
            technology. We assess the requirement, define the approach, engineer the
            software and state the evidence behind the result.
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
          <h2>Discuss an Engineering Requirement</h2>
          <p>
            Tell us about the system you are building or the problem you are facing.
            We will discuss whether and how we can help.
          </p>
          <div class="qm-cta-band__actions">
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
              Discuss an Engineering Requirement →
            </qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }

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

  services: ServiceArea[] = [
    {
      id: 'quantum-computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>`,
      title: 'Quantum Computing & Quantum Software Engineering',
      short: 'Quantum circuit software engineering, simulation, algorithm experimentation, and quantum-classical workflows.',
      problem: 'A quantum algorithm or workflow needs to be implemented, simulated, tested or integrated with classical software — without access to quantum hardware or an established quantum software team.',
      provides: [
        'Quantum circuit software engineering',
        'Circuit representation and simulation',
        'Quantum algorithm experimentation',
        'Quantum-classical workflow integration',
        'Quantum software testing and verification',
        'Performance and resource analysis',
        'Reproducible research tooling'
      ],
      deliverables: [
        'Implemented and tested quantum programs and algorithms',
        'Simulation results backed by reproducible experiment records',
        'Parameter sweeps and analysis of sampled results',
        'Technical assessments that separate demonstrated behaviour from roadmap intent'
      ],
      context: 'Open, NumPy-based quantum tooling with local simulation backends. No quantum hardware access or validated quantum advantage is claimed.',
      outcome: 'Quantum software that is implemented, testable, and honestly characterised, with simulation limits stated explicitly.',
      technologies: [
        { name: 'MicroQuantum', status: 'Developer Preview', badge: 'experimental', href: '/microquantum' },
        { name: 'QuantsMind SDK', status: 'Developer Preview', badge: 'experimental', href: '/quantsmind-sdk' }
      ],
      showcaseIds: ['microquantum', 'quantum-studio', 'quantum-bench', 'quantum-verify'],
      showcaseHeading: 'Related QuantsMind quantum software',
      showcaseDescription: 'Representative software initiatives from the Quantum Computing Software portfolio associated with this engineering service.',
      productsAnchor: 'quantum-software',
      productsLinkLabel: 'View quantum software initiatives on the Products page',
      detailLink: { label: 'Explore Quantum Computing Services', route: '/quantum' },
      extraLink: { label: 'Explore the ten Quantum Mission applications', route: '/quantum-mission' }
    },
    {
      id: 'space-systems',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><path d="M2 12h4M18 12h4"/></svg>`,
      title: 'Space Systems & Mission Software Engineering',
      short: 'Software for ground-segment operations, telemetry processing, mission-support workflows, and satellite engineering data.',
      problem: 'Telemetry, mission data or simulation software must be reliable and maintainable, but its qualification, deployment and operational status need to be described accurately.',
      provides: [
        'Ground-station software integration',
        'Telemetry frame processing',
        'Flight-data decoding',
        'Telemetry ingestion and distribution',
        'Satellite subsystem health monitoring',
        'Mission operations workflows',
        'Satellite contact scheduling',
        'Mission-data archival and integrity verification'
      ],
      deliverables: [
        'Ground software and data pipelines',
        'Telemetry processing and decoding components',
        'Health monitoring and mission-support workflows',
        'Archival and integrity verification procedures',
        'Feasibility and integration assessments'
      ],
      context: 'Telemetry formats, mission-data pipelines, simulation environments, and ground-system integration. Software and feasibility engineering only; no flight qualification, operational spacecraft deployment, autonomous spacecraft commanding, or mission heritage is claimed.',
      outcome: 'Clear feasibility evidence and maintainable ground software, with limitations and validation gaps stated explicitly.',
      technologies: [],
      showcaseIds: ['ground-link', 'telemetry-hub', 'sat-health', 'mission-ops'],
      showcaseHeading: 'Related QuantsMind space software',
      showcaseDescription: 'Representative software initiatives from the Space Systems Software portfolio associated with this engineering service.',
      productsAnchor: 'space-software',
      productsLinkLabel: 'View space software initiatives on the Products page'
    },
    {
      id: 'ai-intelligent-systems',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI Engineering & Autonomous Intelligent Systems',
      short: 'Engineering intelligent software, AI integrations, controlled agent workflows, and reliable AI-enabled applications.',
      problem: 'An AI-enabled product idea exists, but its value, reliability, permission boundaries and human oversight requirements are not yet clear.',
      provides: [
        'AI application engineering',
        'LLM application integration',
        'Intelligent workflow design',
        'Agent orchestration',
        'Retrieval and data integration where applicable',
        'Evaluation and observability',
        'AI security and permission boundaries',
        'Human oversight and controlled automation'
      ],
      deliverables: [
        'Production-integrated AI features',
        'Evaluation reports with measured results',
        'Model serving and integration pipelines',
        'Feasibility proofs-of-concept',
        'Controlled automation workflows with oversight points'
      ],
      context: 'Modern LLM APIs, classical ML, Python tooling, cloud AI services, and permission-aware application architecture. No fully autonomous, unsupervised, or production-proven system is claimed.',
      outcome: 'AI capabilities that are measurable, maintainable, and honestly scoped, with oversight and security boundaries stated.',
      technologies: [
        { name: 'GuardMCP', status: 'Alpha · Under Development', badge: 'prototype', href: '/technology' },
        { name: 'QuantsMind-Agent', status: 'Alpha · Under Development', badge: 'prototype', href: '/technology' },
        { name: 'QuantsMind-LLM', status: 'Research Prototype', badge: 'research', href: '/technology' }
      ]
    },
    {
      id: 'scientific-computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 16l4-8 4 8"/><path d="M9 14h6"/></svg>`,
      title: 'Scientific Computing & Digital Simulation',
      short: 'Numerical software, scientific workflows, modelling systems, and computational simulations.',
      problem: 'A scientific or engineering computation needs rigorous methods, validation and reproducible results that another team can inspect.',
      provides: [
        'Numerical software development',
        'Computational modeling',
        'Scientific data processing',
        'Simulation workflow engineering',
        'Algorithm evaluation',
        'Reproducible experimentation',
        'Scientific software verification',
        'Data visualization where supported'
      ],
      deliverables: [
        'Validated numerical implementations',
        'Simulation code and experiment records',
        'Performance and accuracy reports',
        'Documentation of methods and assumptions'
      ],
      context: 'Python, NumPy/SciPy-style numerical stacks, simulation environments, and HPC-friendly workflows. No validated scientific performance result is claimed.',
      outcome: 'Computations that are correct, reproducible, and defensible, with assumptions and limits stated.',
      technologies: [
        { name: 'QuantsMind SDK', status: 'Developer Preview', badge: 'experimental', href: '/quantsmind-sdk' },
        { name: 'MicroQuantum', status: 'Developer Preview', badge: 'experimental', href: '/microquantum' }
      ]
    },
    {
      id: 'cybersecurity-digital-trust',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      title: 'Cybersecurity Engineering & Digital Trust',
      short: 'Security-focused software, security analysis workflows, integrity verification, and trustworthy digital systems.',
      problem: 'A system has unclear security, privacy or trust boundaries, and the team needs a systematic review rather than an unverified assurance claim.',
      provides: [
        'Application security engineering',
        'Secure development practices',
        'AI application security',
        'Digital evidence integrity',
        'Identity and access-security analysis',
        'Incident workflow engineering',
        'Software supply-chain security',
        'Cloud security assessment',
        'Privacy engineering',
        'Information integrity research'
      ],
      deliverables: [
        'Threat models and risk registers',
        'Security review reports',
        'Hardening and remediation plans',
        'Security test scenarios',
        'Evidence integrity and workflow designs'
      ],
      context: 'Web, backend, cloud, AI, and data systems. No certifications, penetration-testing accreditations, security guarantees, or deployed security products are claimed.',
      outcome: 'Systems with clear trust boundaries and actionable security improvements.',
      technologies: [
        { name: 'GuardMCP', status: 'Alpha · Under Development', badge: 'prototype', href: '/technology' }
      ],
      showcaseIds: ['threat-intel', 'ai-guard', 'code-sentinel', 'forensic-vault'],
      showcaseHeading: 'Related QuantsMind cybersecurity software',
      showcaseDescription: 'Representative proposed software initiatives from the Cybersecurity & Digital Trust Software portfolio associated with this engineering service.',
      productsAnchor: 'cybersecurity-software',
      productsLinkLabel: 'View cybersecurity software initiatives on the Products page'
    },
    {
      id: 'industrial-intelligence-digital-twin',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="14" r="2"/></svg>`,
      title: 'Industrial Intelligence & Digital Twin Engineering',
      short: 'Industrial data systems, operational intelligence software, digital simulation models, and digital twin integration workflows.',
      problem: 'Industrial equipment, assets or workflows hold operational data that is not yet connected to the simulation, monitoring and software systems the business needs.',
      provides: [
        'Industrial data integration',
        'Sensor and telemetry data processing',
        'Operational monitoring software',
        'Digital twin architecture',
        'Simulation-data integration',
        'Asset-state modeling',
        'Industrial analytics',
        'Engineering visualization',
        'Reliability-oriented software design'
      ],
      deliverables: [
        'Industrial data integration designs',
        'Operational monitoring and analytics components',
        'Digital twin architecture and simulation-data integration plans',
        'Asset-state models and visualization prototypes',
        'Reliability and integration documentation'
      ],
      context: 'Manufacturing, industrial automation, energy systems, engineering R&D, and industrial IoT. No industrial deployments, validated digital twins, hardware partnerships, or production integrations are claimed. Cross-domain software architecture, integration design, API design, cloud and deployment architecture, reliability engineering, verification, secure system design, and engineering consulting capabilities are preserved here.',
      outcome: 'Capability-oriented industrial intelligence engineering, with deployment and validation limits stated explicitly.',
      technologies: []
    }
  ];
}
