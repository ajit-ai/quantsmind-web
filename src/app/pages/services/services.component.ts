import {
  Component, ChangeDetectionStrategy, OnInit, OnDestroy,
  ViewChild, ElementRef, inject, ChangeDetectorRef
} from '@angular/core';

import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmServiceProductShowcaseComponent } from '../../shared/components/qm-service-product-showcase/qm-service-product-showcase.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

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
}

@Component({
    selector: 'app-services',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmServiceProductShowcaseComponent, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">SERVICES</span>
        <h1>Engineering Services</h1>
        <p class="lead">
          Practical software engineering and technology consulting for organizations
          building, modernizing or scaling software systems.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container>
        <p class="services-intro">
          Six core service areas. Select a service to see what QuantsMind provides,
          what you can expect to receive, and the value it is designed to deliver.
        </p>

        <section class="svc-commercial" aria-label="Engagement models and solutions">
          <div class="svc-commercial__block">
            <h2 class="svc-commercial__title">Engagement Models</h2>
            <p class="svc-commercial__lead">
              Flexible ways to work with QuantsMind, from a short assessment to an
              ongoing technology partnership.
            </p>
            <ul class="svc-commercial__list">
              <li><strong>Technical Assessment</strong> — review an existing system, architecture or decision.</li>
              <li><strong>Solution Design</strong> — define the approach, interfaces and delivery plan.</li>
              <li><strong>Project Engineering</strong> — build or modernise the software with QuantsMind.</li>
              <li><strong>Technology Partnership</strong> — ongoing engineering support and evolution.</li>
            </ul>
          </div>
          <div class="svc-commercial__block">
            <h2 class="svc-commercial__title">Solutions and Use Cases</h2>
            <p class="svc-commercial__lead">
              Illustrative examples of the kinds of work QuantsMind takes on. These are
              representative scenarios, not completed client case studies.
            </p>
            <ul class="svc-commercial__list">
              <li>Enterprise application modernisation</li>
              <li>Data-platform and ETL modernisation</li>
              <li>AI-assisted document-processing workflows</li>
              <li>Cloud and DevOps automation</li>
              <li>Spacecraft telemetry and mission-data feasibility</li>
              <li>Quantum simulation and software prototyping</li>
            </ul>
          </div>
          <div class="svc-commercial__cta">
            <qm-button variant="primary" size="md" [routerLinkValue]="'/contact'">
              Discuss a Requirement
            </qm-button>
          </div>
        </section>

        <section class="svc-overview" aria-label="Service overview">
          <div class="svc-grid">
            @for (svc of services; track svc.id) {
              <button type="button"
                class="svc-card"
                [class.svc-card--active]="activeTab === svc.id"
                [attr.aria-pressed]="activeTab === svc.id"
                (click)="selectTab(svc.id)">
                <span class="svc-card__icon" aria-hidden="true" [innerHTML]="svc.icon | qmSafeHtml"></span>
                <span class="svc-card__title">{{ svc.title }}</span>
                <p class="svc-card__desc">{{ svc.short }}</p>
              </button>
            }
          </div>
        </section>

        <div class="svc-tabs" role="group" aria-label="Service areas">
          @for (svc of services; track svc.id) {
            <button type="button"
              class="svc-tab"
              [class.svc-tab--active]="activeTab === svc.id"
              [attr.aria-pressed]="activeTab === svc.id"
              (click)="selectTab(svc.id)">
              <span class="svc-tab__icon" aria-hidden="true" [innerHTML]="svc.icon | qmSafeHtml"></span>
              <span class="svc-tab__label">{{ svc.title }}</span>
            </button>
          }
        </div>

        <div class="svc-panel" #panel>
          @for (svc of services; track svc.id) {
            @if (activeTab === svc.id) {
              <article class="svc-detail">
                <div class="svc-detail__head">
                  <div class="svc-detail__icon" aria-hidden="true" [innerHTML]="svc.icon | qmSafeHtml"></div>
                  <div>
                    <h2 class="svc-detail__title">{{ svc.title }}</h2>
                    <p class="svc-detail__short">{{ svc.short }}</p>
                  </div>
                </div>
                 <div class="svc-detail__illustration" aria-hidden="true" [innerHTML]="illustrations[svc.id] | qmSafeHtml"></div>


                <p class="svc-detail__problem">
                  <strong>Typical problem.</strong> {{ svc.problem }}
                </p>

                <div class="svc-detail__grid">
                  <div>
                    <h3 class="svc-detail__h3">What we provide</h3>
                    <ul class="svc-detail__list">
                      @for (p of svc.provides; track p) {
                        <li>{{ p }}</li>
                      }
                    </ul>
                  </div>
                  <div>
                    <h3 class="svc-detail__h3">Practical deliverables</h3>
                    <ul class="svc-detail__list">
                      @for (d of svc.deliverables; track d) {
                        <li>{{ d }}</li>
                      }
                    </ul>
                  </div>
                </div>

                <div class="svc-detail__context">
                  <h3 class="svc-detail__h3">Technology & capability context</h3>
                  <p>{{ svc.context }}</p>
                </div>

                <p class="svc-detail__outcome">
                  <strong>Outcome.</strong> {{ svc.outcome }}
                </p>

                @if (showcaseProductIds[svc.id]) {
                  <qm-service-product-showcase
                    [featuredProductIds]="showcaseProductIds[svc.id]"
                    [heading]="showcaseHeadings[svc.id]"
                    [description]="showcaseDescriptions[svc.id]"
                    [productsAnchor]="showcaseAnchors[svc.id]"
                    [linkLabel]="showcaseLinkLabels[svc.id]" />
                }

                @if (svc.id === 'quantum-computing') {
                  <p class="svc-detail__explore">
                    <a routerLink="/quantum" class="svc-detail__explore-link">Explore Quantum Computing Services &rarr;</a>
                  </p>
                }

                <div class="svc-detail__cta">
                  <qm-button variant="primary" size="md" [routerLinkValue]="'/contact'" [ariaLabel]="'Discuss ' + svc.title + ' with QuantsMind'">
                    Discuss this requirement →
                  </qm-button>
                </div>
              </article>
            }
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <span class="eyebrow">ENGAGEMENT</span>
          <h2>Discuss an Engineering Requirement</h2>
          <p class="lead">
            Tell us about the system you are building or the problem you are facing.
            We will discuss whether and how we can help.
          </p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Discuss an Engineering Requirement →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .page-hero { padding: 64px 0 48px; border-bottom: 1px solid var(--color-border); }
    @media (min-width: 768px) { .page-hero { padding: 88px 0 64px; } }
    .page-hero h1 { max-width: 720px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 640px; margin: 0; }

    .services-intro {
      max-width: 680px; margin: 0 0 36px;
      font-size: 16px; line-height: 1.7; color: var(--color-text-secondary);
    }

    /* ── TABS ── */
    .svc-tabs {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 0 0 36px;
      padding: 10px;
      background: var(--color-canvas);
      border: 1px solid var(--card-border);
      border-radius: var(--card-radius);
    }
    @media (min-width: 768px)  { .svc-tabs { grid-template-columns: repeat(3, 1fr); } }
    @media (min-width: 1200px) { .svc-tabs { grid-template-columns: repeat(4, 1fr); } }

    .svc-tab {
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      padding: 16px 10px;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 10px;
      cursor: pointer;
      font-family: inherit;
      text-align: center;
      transition: background-color var(--duration-fast) var(--easing-standard),
                  border-color var(--duration-fast) var(--easing-standard);
    }
    .svc-tab:hover { background: var(--card-bg); border-color: var(--card-border); }
    .svc-tab--active {
      background: var(--card-bg);
      border-color: var(--card-border-hi);
      box-shadow: 0 2px 10px rgba(37, 99, 235, 0.10);
    }
    .svc-tab__icon {
      width: 40px; height: 40px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: var(--mark-bg); border-radius: 10px; color: var(--mark-color);
      transition: background-color var(--duration-fast) var(--easing-standard),
                  color var(--duration-fast) var(--easing-standard);
    }
    .svc-tab--active .svc-tab__icon { background: var(--color-accent); color: var(--color-text-inverse); }
    .svc-tab__label {
      font-size: 13px; font-weight: 500; color: var(--color-text-secondary); line-height: 1.3;
    }
    .svc-tab--active .svc-tab__label { font-weight: 600; color: var(--color-text-primary); }
    .svc-tab:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

    /* ── SERVICE OVERVIEW GRID ── */
    .svc-commercial {
      display: grid; gap: 24px; margin-bottom: 48px;
      padding: 24px; background: var(--color-canvas); border: 1px solid var(--card-border);
      border-radius: var(--card-radius);
    }
    @media (min-width: 768px) { .svc-commercial { grid-template-columns: 1fr 1fr; align-items: start; } }
    .svc-commercial__title { margin: 0 0 8px; font-size: 18px; font-weight: 600; color: var(--color-text-primary); }
    .svc-commercial__lead { margin: 0 0 12px; font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); }
    .svc-commercial__list { margin: 0; padding-left: 18px; color: var(--color-text-secondary); font-size: 14px; line-height: 1.7; }
    .svc-commercial__list li { margin-bottom: 6px; }
    .svc-commercial__cta { grid-column: 1 / -1; display: flex; justify-content: flex-start; }
    @media (max-width: 767px) { .svc-commercial { padding: 18px; } }

    .svc-overview { margin-bottom: 48px; }
    @media (min-width: 768px) { .svc-overview { margin-bottom: 64px; } }
    .svc-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 640px) { .svc-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .svc-grid { grid-template-columns: repeat(3, 1fr); } }
    .svc-card {
      display: flex; flex-direction: column; gap: 12px;
      padding: 20px; background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: 12px; text-align: left; cursor: pointer;
      transition: border-color var(--duration-fast) var(--easing-standard),
                  box-shadow var(--duration-fast) var(--easing-standard);
    }
    .svc-card:hover { border-color: var(--color-accent-muted); }
    .svc-card--active { border-color: var(--color-accent); box-shadow: 0 2px 10px rgba(37, 99, 235, 0.08); }
    .svc-card:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
    .svc-card__icon {
      width: 40px; height: 40px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: var(--mark-bg); border-radius: 10px; color: var(--mark-color);
    }
    .svc-card__title {
      margin: 0; font-size: 15px; font-weight: 600; color: var(--color-text-primary);
      line-height: 1.4;
    }
    .svc-card__desc {
      margin: 0; font-size: 13px; line-height: 1.6; color: var(--color-text-secondary);
    }

    /* ── DETAIL PANEL ── */
    .svc-panel { scroll-margin-top: 96px; }
    .svc-detail {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 28px;
    }
    @media (min-width: 768px) { .svc-detail { padding: 40px; } }

    .svc-detail__head {
      display: flex; gap: 16px; align-items: flex-start;
      margin-bottom: 28px;
    }
    .svc-detail__icon {
      width: 52px; height: 52px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: var(--mark-bg); border-radius: var(--radius-md); color: var(--mark-color);
    }
    .svc-detail__title {
      font-size: clamp(24px, 3vw, 30px); font-weight: 700;
      color: var(--color-text-primary); margin: 0 0 8px; letter-spacing: -0.02em;
    }
    .svc-detail__short { margin: 0; font-size: 16px; line-height: 1.7; color: var(--color-text-secondary); }

    .svc-detail__grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
      margin-bottom: 24px;
    }
    @media (min-width: 768px) { .svc-detail__grid { grid-template-columns: 1fr 1fr; gap: 32px; } }

    .svc-detail__h3 {
      margin: 0 0 12px;
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: var(--color-accent);
    }
    .svc-detail__list { margin: 0; padding-left: 20px; color: var(--color-text-secondary); }
    .svc-detail__list li { margin-bottom: 8px; line-height: 1.6; font-size: 15px; }
    .svc-detail__list li:last-child { margin-bottom: 0; }

    .svc-detail__context { margin-bottom: 24px; }
    .svc-detail__context p {
      margin: 0; max-width: 720px; color: var(--color-text-secondary);
      font-size: 15px; line-height: 1.7; text-wrap: pretty;
    }

    .svc-detail__problem {
      margin: 0 0 24px;
      color: var(--color-text-secondary);
      font-size: 15px; line-height: 1.7;
    }
    .svc-detail__problem strong { color: var(--color-text-primary); }

    .svc-detail__outcome {
      margin: 0 0 24px;
      padding: 14px 18px;
      background: var(--card-bg-subtle);
      border-left: 3px solid var(--color-accent);
      border-radius: 0 8px 8px 0;
      color: var(--color-text-secondary);
      font-size: 15px; line-height: 1.7;
    }
    .svc-detail__outcome strong { color: var(--color-text-primary); }

    .svc-detail__cta { display: flex; }
    .svc-detail__explore { margin: 0 0 24px; }
    .svc-detail__explore-link { font-weight: 500; color: var(--color-accent); text-decoration: none; }
    .svc-detail__explore-link:hover { text-decoration: underline; }

    .svc-detail__illustration {
      margin: 0 0 24px;
      padding: 16px;
      background: var(--card-bg-subtle);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      overflow: hidden;
    }
    .svc-illustration {
      width: 100%;
      height: auto;
      display: block;
      max-height: 160px;
    }
    @media (max-width: 639px) {
      .svc-illustration { max-height: 140px; }
    }

    /* ── CTA ── */
    .page-cta {
      text-align: center; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }
    .page-cta h2 { margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--color-accent); margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); margin: 0; }

    @media (prefers-reduced-motion: reduce) {
      .svc-tab { transition: none; }
    }
  `]
})
export class ServicesComponent implements OnInit, OnDestroy {
  services: ServiceArea[] = [
    {
      id: 'quantum-computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>`,
      title: 'Quantum Computing & Quantum Software Engineering',
      short: 'Quantum circuit software engineering, simulation, algorithm experimentation, and quantum-classical workflows.',
      problem: 'A quantum algorithm or workflow that needs to be implemented, simulated, tested, or integrated with classical software without access to quantum hardware.',
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
      outcome: 'Quantum software that is implemented, testable, and honestly characterised, with simulation limits stated explicitly.'
    },
    {
      id: 'space-systems',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><path d="M2 12h4M18 12h4"/></svg>`,
      title: 'Space Systems & Mission Software Engineering',
      short: 'Software for ground-segment operations, telemetry processing, mission-support workflows, and satellite engineering data.',
      problem: 'Telemetry, mission data, or simulation software that must be reliable, maintainable, and well validated without overstating deployment or qualification status.',
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
      outcome: 'Clear feasibility evidence and maintainable ground software, with limitations and validation gaps stated explicitly.'
    },
    {
      id: 'ai-intelligent-systems',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI Engineering & Autonomous Intelligent Systems',
      short: 'Engineering intelligent software, AI integrations, controlled agent workflows, and reliable AI-enabled applications.',
      problem: 'An AI-enabled product idea where value, reliability, permission boundaries, and human oversight are not yet clear.',
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
      outcome: 'AI capabilities that are measurable, maintainable, and honestly scoped, with oversight and security boundaries stated.'
    },
    {
      id: 'scientific-computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 16l4-8 4 8"/><path d="M9 14h6"/></svg>`,
      title: 'Scientific Computing & Digital Simulation',
      short: 'Numerical software, scientific workflows, modelling systems, and computational simulations.',
      problem: 'A scientific or engineering computation that needs rigorous methods, validation, and reproducible results.',
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
      outcome: 'Computations that are correct, reproducible, and defensible, with assumptions and limits stated.'
    },
    {
      id: 'cybersecurity-digital-trust',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      title: 'Cybersecurity Engineering & Digital Trust',
      short: 'Security-focused software, security analysis workflows, integrity verification, and trustworthy digital systems.',
      problem: 'A system where security, privacy, trust boundaries, or evidence integrity are unclear and need systematic review.',
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
      outcome: 'Systems with clear trust boundaries and actionable security improvements.'
    },
    {
      id: 'industrial-intelligence-digital-twin',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="14" r="2"/></svg>`,
      title: 'Industrial Intelligence & Digital Twin Engineering',
      short: 'Industrial data systems, operational intelligence software, digital simulation models, and digital twin integration workflows.',
      problem: 'Industrial equipment, assets, or workflows where operational data, simulation, and software integration need to be engineered without overstating deployment status.',
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
      outcome: 'Capability-oriented industrial intelligence engineering, with deployment and validation limits stated explicitly.'
    }
];


  activeTab = 'quantum-computing';

  showcaseProductIds: Record<string, readonly string[]> = {
    'quantum-computing': ['microquantum', 'quantum-studio', 'quantum-bench', 'quantum-verify'],
    'space-systems': ['ground-link', 'telemetry-hub', 'sat-health', 'mission-ops'],
    'cybersecurity-digital-trust': ['threat-intel', 'ai-guard', 'code-sentinel', 'forensic-vault']
  };

  showcaseHeadings: Record<string, string> = {
    'quantum-computing': 'Related QuantsMind quantum software',
    'space-systems': 'Related QuantsMind space software',
    'cybersecurity-digital-trust': 'Related QuantsMind cybersecurity software'
  };

  showcaseDescriptions: Record<string, string> = {
    'quantum-computing': 'Representative software initiatives from the Quantum Computing Software portfolio associated with this engineering service.',
    'space-systems': 'Representative software initiatives from the Space Systems Software portfolio associated with this engineering service.',
    'cybersecurity-digital-trust': 'Representative proposed software initiatives from the Cybersecurity & Digital Trust Software portfolio associated with this engineering service.'
  };

  showcaseAnchors: Record<string, string> = {
    'quantum-computing': 'quantum-software',
    'space-systems': 'space-software',
    'cybersecurity-digital-trust': 'cybersecurity-software'
  };

  showcaseLinkLabels: Record<string, string> = {
    'quantum-computing': 'View quantum software initiatives on the Products page',
    'space-systems': 'View space software initiatives on the Products page',
    'cybersecurity-digital-trust': 'View cybersecurity software initiatives on the Products page'
  };
  private readonly legacyServiceAliases: Record<string, string> = {
    'software-architecture': 'industrial-intelligence-digital-twin'
  };
  illustrations: Record<string, string> = {};


  @ViewChild('panel') panel?: ElementRef<HTMLElement>;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private routerSub?: Subscription;
  private viewReady = false;
  private pendingScroll = false;

  ngOnInit(): void {
    this.initIllustrations();

    const frag = this.readFragment();
    if (this.applyFragment(frag)) {
      this.pendingScroll = true;
    }
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.applyFragment(this.readFragment())) {
          if (this.viewReady) {
            this.doScroll();
          } else {
            this.pendingScroll = true;
          }
        }
      });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.pendingScroll) {
      this.pendingScroll = false;
      this.doScroll();
    }
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  selectTab(id: string): void {
    const resolved = this.legacyServiceAliases[id] ?? id;
    if (this.activeTab === resolved) {
      return;
    }
    this.activeTab = resolved;
    this.cdr.markForCheck();
    this.router.navigate([], { fragment: resolved, replaceUrl: true });
  }
  private initIllustrations(): void {
    this.illustrations['technical-consulting'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><defs><marker id="consArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="var(--color-accent)"/></marker></defs><rect x="20" y="44" width="64" height="72" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="52" y="62" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Assess</text><line x1="30" y1="74" x2="74" y2="74" stroke="var(--color-text-muted)" stroke-width="1"/><line x1="30" y1="82" x2="74" y2="82" stroke="var(--color-text-muted)" stroke-width="1"/><line x1="30" y1="90" x2="60" y2="90" stroke="var(--color-text-muted)" stroke-width="1"/><rect x="96" y="44" width="64" height="72" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="128" y="62" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Options</text><circle cx="116" cy="80" r="6" fill="none" stroke="var(--color-accent)" stroke-width="1.2"/><circle cx="140" cy="80" r="6" fill="none" stroke="var(--color-accent)" stroke-width="1.2"/><circle cx="128" cy="96" r="6" fill="none" stroke="var(--color-accent)" stroke-width="1.2"/><rect x="172" y="44" width="64" height="72" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="204" y="62" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Recommend</text><path d="M184 78 L196 90 L224 70" fill="none" stroke="var(--color-accent)" stroke-width="1.5"/><rect x="248" y="44" width="52" height="72" rx="6" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" stroke-width="1"/><text x="274" y="62" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-accent)">Plan</text><line x1="258" y1="74" x2="290" y2="74" stroke="var(--color-accent)" stroke-width="1"/><line x1="258" y1="82" x2="290" y2="82" stroke="var(--color-accent)" stroke-width="1"/><line x1="258" y1="90" x2="278" y2="90" stroke="var(--color-accent)" stroke-width="1"/><line x1="84" y1="80" x2="96" y2="80" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#consArrow)"/><line x1="160" y1="80" x2="172" y2="80" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#consArrow)"/><line x1="236" y1="80" x2="248" y2="80" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#consArrow)"/></svg>`;

    this.illustrations['devops-ci-cd'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><defs><marker id="devArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="var(--color-accent)"/></marker></defs><rect x="14" y="56" width="50" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="39" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Source</text><text x="39" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">git</text><rect x="76" y="56" width="50" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="101" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Build</text><text x="101" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">compile</text><rect x="138" y="56" width="50" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="163" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Test</text><text x="163" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">verify</text><rect x="200" y="56" width="50" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="225" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Release</text><text x="225" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">deploy</text><rect x="262" y="56" width="46" height="40" rx="6" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" stroke-width="1"/><text x="285" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-accent)">Monitor</text><text x="285" y="88" text-anchor="middle" font-size="8" fill="var(--color-accent)">observe</text><line x1="64" y1="76" x2="76" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#devArrow)"/><line x1="126" y1="76" x2="138" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#devArrow)"/><line x1="188" y1="76" x2="200" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#devArrow)"/><line x1="250" y1="76" x2="262" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#devArrow)"/></svg>`;

    this.illustrations['cloud-engineering'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><rect x="24" y="24" width="272" height="36" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="160" y="46" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">Application services</text><rect x="24" y="72" width="272" height="36" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="160" y="94" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">Infrastructure (IaC)</text><rect x="24" y="120" width="272" height="24" rx="6" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" stroke-width="1"/><text x="160" y="136" text-anchor="middle" font-size="9" fill="var(--color-accent)">Observability · cost · access controls</text><line x1="60" y1="60" x2="60" y2="72" stroke="var(--color-text-muted)" stroke-width="1.2"/><line x1="260" y1="60" x2="260" y2="72" stroke="var(--color-text-muted)" stroke-width="1.2"/><line x1="160" y1="108" x2="160" y2="120" stroke="var(--color-text-muted)" stroke-width="1.2"/></svg>`;

    this.illustrations['ai-ml-engineering'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><defs><marker id="aiArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="var(--color-accent)"/></marker></defs><rect x="16" y="56" width="52" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="42" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Data</text><text x="42" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">prep</text><rect x="84" y="56" width="52" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="110" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Model</text><text x="110" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">integrate</text><rect x="152" y="56" width="52" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="178" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Eval</text><text x="178" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">metrics</text><rect x="220" y="56" width="52" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="246" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">App</text><text x="246" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">integrate</text><line x1="68" y1="76" x2="84" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#aiArrow)"/><line x1="136" y1="76" x2="152" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#aiArrow)"/><line x1="204" y1="76" x2="220" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#aiArrow)"/><path d="M178 96 L178 120 L42 120 L42 96" fill="none" stroke="var(--color-text-muted)" stroke-width="1.2" stroke-dasharray="3 3"/><text x="110" y="134" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">feedback loop</text></svg>`;

    this.illustrations['quantum-computing'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><text x="16" y="24" font-size="9" fill="var(--color-text-muted)">Simulated execution context</text><line x1="40" y1="48" x2="280" y2="48" stroke="var(--color-border-strong)" stroke-width="1.5"/><line x1="40" y1="80" x2="280" y2="80" stroke="var(--color-border-strong)" stroke-width="1.5"/><line x1="40" y1="112" x2="280" y2="112" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="24" y="52" font-size="9" fill="var(--color-text-muted)">q0</text><text x="24" y="84" font-size="9" fill="var(--color-text-muted)">q1</text><text x="24" y="116" font-size="9" fill="var(--color-text-muted)">q2</text><rect x="60" y="36" width="24" height="24" rx="4" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="72" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="var(--color-accent)">H</text><circle cx="110" cy="80" r="12" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="110" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="var(--color-accent)">X</text><line x1="110" y1="48" x2="110" y2="112" stroke="var(--color-accent)" stroke-width="1.5"/><rect x="150" y="68" width="24" height="24" rx="4" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="162" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="var(--color-accent)">Ry</text><path d="M210 68 L234 92 M210 92 L234 68" stroke="var(--color-text-primary)" stroke-width="1.5"/><line x1="222" y1="48" x2="222" y2="68" stroke="var(--color-text-primary)" stroke-width="1.5"/><text x="206" y="130" font-size="9" fill="var(--color-text-muted)">Measure</text><rect x="250" y="100" width="50" height="22" rx="4" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" stroke-width="1"/><text x="275" y="115" text-anchor="middle" font-size="8" fill="var(--color-accent)">Simulated</text></svg>`;

    this.illustrations['software-architecture'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><rect x="12" y="12" width="296" height="136" rx="10" fill="none" stroke="var(--color-border)" stroke-dasharray="4 4"/><text x="24" y="26" font-size="9" fill="var(--color-text-muted)">System boundary</text><rect x="34" y="52" width="70" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="69" y="76" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">UI</text><rect x="125" y="36" width="70" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="160" y="60" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">API</text><rect x="125" y="92" width="70" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="160" y="116" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">Data</text><rect x="216" y="52" width="70" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="251" y="76" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">Service</text><defs><marker id="archArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="var(--color-accent)"/></marker></defs><line x1="104" y1="72" x2="125" y2="56" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#archArrow)"/><line x1="195" y1="56" x2="216" y2="72" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#archArrow)"/><line x1="160" y1="76" x2="160" y2="92" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#archArrow)"/><text x="168" y="86" font-size="8" fill="var(--color-text-muted)">interface</text></svg>`;
    this.illustrations['data-engineering'] = `<svg class=\"svc-illustration\" viewBox=\"0 0 320 160\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\"><rect x=\"12\" y=\"12\" width=\"296\" height=\"136\" rx=\"10\" fill=\"none\" stroke=\"var(--color-border)\" stroke-dasharray=\"4 4\"/><text x=\"24\" y=\"26\" font-size=\"9\" fill=\"var(--color-text-muted)\">Data pipeline</text><rect x=\"40\" y=\"60\" width=\"60\" height=\"40\" rx=\"6\" fill=\"var(--card-bg-subtle)\" stroke=\"var(--color-accent)\" stroke-width=\"1.5\"/><text x=\"70\" y=\"85\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"var(--color-text-primary)\">Source</text><rect x=\"130\" y=\"60\" width=\"60\" height=\"40\" rx=\"6\" fill=\"var(--card-bg-subtle)\" stroke=\"var(--color-accent)\" stroke-width=\"1.5\"/><text x=\"160\" y=\"85\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"var(--color-text-primary)\">ETL</text><rect x=\"220\" y=\"60\" width=\"60\" height=\"40\" rx=\"6\" fill=\"var(--card-bg-subtle)\" stroke=\"var(--color-border-strong)\" stroke-width=\"1.5\"/><text x=\"250\" y=\"85\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"600\" fill=\"var(--color-text-primary)\">Lake</text></svg>`;

    this.illustrations['space-exploration'] = `<svg class=\"svc-illustration\" viewBox=\"0 0 320 160\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\"><rect x=\"12\" y=\"12\" width=\"296\" height=\"136\" rx=\"10\" fill=\"none\" stroke=\"var(--color-border)\" stroke-dasharray=\"4 4\"/><text x=\"24\" y=\"26\" font-size=\"9\" fill=\"var(--color-text-muted)\">Mission data flow</text><circle cx=\"70\" cy=\"80\" r=\"24\" fill=\"var(--card-bg-subtle)\" stroke=\"var(--color-accent)\" stroke-width=\"1.5\"/><text x=\"70\" y=\"84\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"600\" fill=\"var(--color-text-primary)\">Telemetry</text><rect x=\"130\" y=\"62\" width=\"60\" height=\"36\" rx=\"6\" fill=\"var(--card-bg-subtle)\" stroke=\"var(--color-border-strong)\" stroke-width=\"1.5\"/><text x=\"160\" y=\"84\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"600\" fill=\"var(--color-text-primary)\">Ground</text><rect x=\"220\" y=\"62\" width=\"60\" height=\"36\" rx=\"6\" fill=\"var(--color-accent-subtle)\" stroke=\"var(--color-accent-muted)\" stroke-width=\"1\"/><text x=\"250\" y=\"84\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"600\" fill=\"var(--color-accent)\">Sim</text></svg>`;



    this.illustrations['ai-intelligent-systems'] = this.illustrations['ai-ml-engineering'];
    this.illustrations['scientific-computing'] = this.illustrations['data-engineering'];
    this.illustrations['cybersecurity-digital-trust'] = this.illustrations['technical-consulting'];
    this.illustrations['space-systems'] = this.illustrations['space-exploration'];
    this.illustrations['industrial-intelligence-digital-twin'] = this.illustrations['data-engineering'];

  }



  private readFragment(): string | null {
    const url = this.router.url;
    const hashIndex = url.indexOf('#');
    return hashIndex >= 0 ? url.slice(hashIndex + 1) : null;
  }

  private applyFragment(frag: string | null): boolean {
    const resolved = frag ? (this.legacyServiceAliases[frag] ?? frag) : null;
    if (resolved && this.services.some(s => s.id === resolved)) {
      if (resolved !== this.activeTab) {
        this.activeTab = resolved;
        this.cdr.markForCheck();
      }
      return true;
    }
    return false;
  }

  private doScroll(): void {
    requestAnimationFrame(() => {
      this.panel?.nativeElement.scrollIntoView({ behavior: this.scrollBehavior(), block: 'start' });
    });
  }

  private scrollBehavior(): ScrollBehavior {
    try {
      return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ? 'auto' : 'smooth';
    } catch {
      return 'smooth';
    }
  }
}
