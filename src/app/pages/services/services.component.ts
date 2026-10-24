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
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, SafeHtmlPipe],
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
    @media (min-width: 1200px) { .svc-tabs { grid-template-columns: repeat(6, 1fr); } }

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
      id: 'software-architecture',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/></svg>`,
      title: 'Software Architecture',
      short: 'System design and solution architecture that establishes sound structural decisions before implementation begins.',
      problem: 'A system that is hard to change, costly to operate, or unable to support the next stage of growth.',
      provides: [
        'Solution architecture and system design',
        'Technical foundations, patterns and design guidelines',
        'Architecture review and technical decision support',
        'Modular design built for maintainability and change',
        'Technology selection guidance'
      ],
      deliverables: [
        'Architecture blueprints and component diagrams',
        'Design documents and technical decision records',
        'API and data contract designs',
        'Migration and refactoring plans'
      ],
      context: 'Modern backend and platform stacks, distributed systems and cloud-native architectures.',
      outcome: 'A codebase with sound structural decisions — one that is maintainable, testable and cheaper to evolve.'
    },
    {
      id: 'quantum-computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>`,
      title: 'Quantum Computing',
      short: 'Quantum program and algorithm development, with classical simulation, built on QuantsMind’s open quantum SDK.',
      problem: 'A quantum algorithm or program that needs to be prototyped and evaluated without access to quantum hardware.',
      provides: [
        'Quantum circuit construction: states, gates, circuits and measurement',
        'Quantum algorithm development across variational, search, optimisation and phase-estimation families',
        'Simulation of quantum programs using statevector and density-matrix backends',
        'Parameterised and hybrid optimisation workflows built around quantum subroutines',
        'Quantum technology research, including circuit interchange formats such as OpenQASM and QIR'
      ],
      deliverables: [
        'Implemented, tested quantum programs and algorithms',
        'Simulation results backed by reproducible experiment records',
        'Parameter sweeps and analysis of sampled results',
        'Technical assessments that separate demonstrated behaviour from roadmap intent'
      ],
      context: 'Open, NumPy-based quantum tooling with local simulation backends. No quantum hardware backend is included, so results describe simulated behaviour rather than device behaviour.',
      outcome: 'Quantum programs that are implemented, testable and honestly characterised, with the limits of simulation stated explicitly.'
    },
    {
      id: 'ai-ml-engineering',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI & ML Engineering',
      short: 'Applied AI and ML development, integrated into products that genuinely benefit from it.',
      problem: 'A product idea that may benefit from AI, but where the value, cost and reliability are not yet clear.',
      provides: [
        'AI/ML application development',
        'Integration of modern AI models into products',
        'Intelligent features: search, classification, extraction, prediction',
        'Model evaluation and observability',
        'Prototyping and feasibility experiments'
      ],
      deliverables: [
        'Production-integrated AI/ML features',
        'Evaluation reports with measured results',
        'Model serving and integration pipelines',
        'Feasibility proofs-of-concept'
      ],
      context: 'Modern LLM APIs, classical ML, Python tooling and cloud AI services.',
      outcome: 'Reliable AI functionality that adds clear, measurable product value.'
    },
    {
      id: 'cloud-engineering',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
      title: 'Cloud Engineering',
      short: 'Cloud architecture, deployment and infrastructure automation built for reliability and controlled cost.',
      problem: 'Cloud infrastructure that is unreliable, hard to reason about, or more expensive than it should be.',
      provides: [
        'Cloud architecture and environment design',
        'Infrastructure-as-code and environment automation',
        'Observability: logging, monitoring and alerting',
        'Cost-aware infrastructure decisions',
        'Migration planning and execution support'
      ],
      deliverables: [
        'Infrastructure-as-code modules and environments',
        'Deployable cloud architecture designs',
        'Monitoring and alerting setup',
        'Migration and cost plans'
      ],
      context: 'AWS, Azure and GCP, Kubernetes, serverless and managed services.',
      outcome: 'Reliable, observable environments with predictable cost and clean team onboarding.'
    },
    {
      id: 'devops-ci-cd',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      title: 'DevOps & CI/CD',
      short: 'Continuous delivery, automated testing and release engineering that make delivery repeatable and safe.',
      problem: 'Releases that depend on manual steps, take too long, or fail in ways nobody can trace.',
      provides: [
        'CI/CD pipeline design and implementation',
        'Build, test and release automation',
        'Testing strategy and automated test suites',
        'Environment and deployment management',
        'Release process and runbook engineering'
      ],
      deliverables: [
        'Working CI/CD pipelines',
        'Automated tests wired into CI',
        'Deployment automation and runbooks',
        'Repeatable environment configuration'
      ],
      context: 'GitHub Actions, GitLab CI, containers and multi-environment workflows.',
      outcome: 'Faster, safer, repeatable releases with fewer manual steps and clear visibility.'
    },
    {
      id: 'technical-consulting',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
      title: 'Technical Consulting',
      short: 'Technical modernization, system design and honest engineering guidance for teams making important decisions.',
      problem: 'An important technical decision where the team needs an independent, experienced assessment.',
      provides: [
        'Modernization assessments and roadmaps',
        'Architecture and code reviews',
        'Technology evaluation and selection advice',
        'Design consultation for new systems',
        'Engineering guidance for teams'
      ],
      deliverables: [
        'Assessment reports with prioritized findings',
        'Review findings and actionable recommendations',
        'Technology evaluation summaries',
        'Modernization roadmaps'
      ],
      context: 'A wide range of legacy and modern stacks, from established frameworks to greenfield services.',
      outcome: 'Sound, defensible technical decisions made with good information.'
    }
  ];

  activeTab = 'software-architecture';
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
    if (this.activeTab === id) {
      return;
    }
    this.activeTab = id;
    this.cdr.markForCheck();
    this.router.navigate([], { fragment: id, replaceUrl: true });
  }
  private initIllustrations(): void {
    this.illustrations['technical-consulting'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><defs><marker id="consArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="var(--color-accent)"/></marker></defs><rect x="20" y="44" width="64" height="72" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="52" y="62" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Assess</text><line x1="30" y1="74" x2="74" y2="74" stroke="var(--color-text-muted)" stroke-width="1"/><line x1="30" y1="82" x2="74" y2="82" stroke="var(--color-text-muted)" stroke-width="1"/><line x1="30" y1="90" x2="60" y2="90" stroke="var(--color-text-muted)" stroke-width="1"/><rect x="96" y="44" width="64" height="72" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="128" y="62" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Options</text><circle cx="116" cy="80" r="6" fill="none" stroke="var(--color-accent)" stroke-width="1.2"/><circle cx="140" cy="80" r="6" fill="none" stroke="var(--color-accent)" stroke-width="1.2"/><circle cx="128" cy="96" r="6" fill="none" stroke="var(--color-accent)" stroke-width="1.2"/><rect x="172" y="44" width="64" height="72" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="204" y="62" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Recommend</text><path d="M184 78 L196 90 L224 70" fill="none" stroke="var(--color-accent)" stroke-width="1.5"/><rect x="248" y="44" width="52" height="72" rx="6" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" stroke-width="1"/><text x="274" y="62" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-accent)">Plan</text><line x1="258" y1="74" x2="290" y2="74" stroke="var(--color-accent)" stroke-width="1"/><line x1="258" y1="82" x2="290" y2="82" stroke="var(--color-accent)" stroke-width="1"/><line x1="258" y1="90" x2="278" y2="90" stroke="var(--color-accent)" stroke-width="1"/><line x1="84" y1="80" x2="96" y2="80" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#consArrow)"/><line x1="160" y1="80" x2="172" y2="80" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#consArrow)"/><line x1="236" y1="80" x2="248" y2="80" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#consArrow)"/></svg>`;

    this.illustrations['devops-ci-cd'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><defs><marker id="devArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="var(--color-accent)"/></marker></defs><rect x="14" y="56" width="50" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="39" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Source</text><text x="39" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">git</text><rect x="76" y="56" width="50" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="101" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Build</text><text x="101" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">compile</text><rect x="138" y="56" width="50" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="163" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Test</text><text x="163" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">verify</text><rect x="200" y="56" width="50" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="225" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Release</text><text x="225" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">deploy</text><rect x="262" y="56" width="46" height="40" rx="6" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" stroke-width="1"/><text x="285" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-accent)">Monitor</text><text x="285" y="88" text-anchor="middle" font-size="8" fill="var(--color-accent)">observe</text><line x1="64" y1="76" x2="76" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#devArrow)"/><line x1="126" y1="76" x2="138" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#devArrow)"/><line x1="188" y1="76" x2="200" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#devArrow)"/><line x1="250" y1="76" x2="262" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#devArrow)"/></svg>`;

    this.illustrations['cloud-engineering'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><rect x="24" y="24" width="272" height="36" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="160" y="46" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">Application services</text><rect x="24" y="72" width="272" height="36" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="160" y="94" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">Infrastructure (IaC)</text><rect x="24" y="120" width="272" height="24" rx="6" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" stroke-width="1"/><text x="160" y="136" text-anchor="middle" font-size="9" fill="var(--color-accent)">Observability · cost · access controls</text><line x1="60" y1="60" x2="60" y2="72" stroke="var(--color-text-muted)" stroke-width="1.2"/><line x1="260" y1="60" x2="260" y2="72" stroke="var(--color-text-muted)" stroke-width="1.2"/><line x1="160" y1="108" x2="160" y2="120" stroke="var(--color-text-muted)" stroke-width="1.2"/></svg>`;

    this.illustrations['ai-ml-engineering'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><defs><marker id="aiArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="var(--color-accent)"/></marker></defs><rect x="16" y="56" width="52" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="42" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Data</text><text x="42" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">prep</text><rect x="84" y="56" width="52" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="110" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Model</text><text x="110" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">integrate</text><rect x="152" y="56" width="52" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="178" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">Eval</text><text x="178" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">metrics</text><rect x="220" y="56" width="52" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="246" y="74" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-primary)">App</text><text x="246" y="88" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">integrate</text><line x1="68" y1="76" x2="84" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#aiArrow)"/><line x1="136" y1="76" x2="152" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#aiArrow)"/><line x1="204" y1="76" x2="220" y2="76" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#aiArrow)"/><path d="M178 96 L178 120 L42 120 L42 96" fill="none" stroke="var(--color-text-muted)" stroke-width="1.2" stroke-dasharray="3 3"/><text x="110" y="134" text-anchor="middle" font-size="8" fill="var(--color-text-muted)">feedback loop</text></svg>`;

    this.illustrations['quantum-computing'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><text x="16" y="24" font-size="9" fill="var(--color-text-muted)">Simulated execution context</text><line x1="40" y1="48" x2="280" y2="48" stroke="var(--color-border-strong)" stroke-width="1.5"/><line x1="40" y1="80" x2="280" y2="80" stroke="var(--color-border-strong)" stroke-width="1.5"/><line x1="40" y1="112" x2="280" y2="112" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="24" y="52" font-size="9" fill="var(--color-text-muted)">q0</text><text x="24" y="84" font-size="9" fill="var(--color-text-muted)">q1</text><text x="24" y="116" font-size="9" fill="var(--color-text-muted)">q2</text><rect x="60" y="36" width="24" height="24" rx="4" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="72" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="var(--color-accent)">H</text><circle cx="110" cy="80" r="12" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="110" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="var(--color-accent)">X</text><line x1="110" y1="48" x2="110" y2="112" stroke="var(--color-accent)" stroke-width="1.5"/><rect x="150" y="68" width="24" height="24" rx="4" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="162" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="var(--color-accent)">Ry</text><path d="M210 68 L234 92 M210 92 L234 68" stroke="var(--color-text-primary)" stroke-width="1.5"/><line x1="222" y1="48" x2="222" y2="68" stroke="var(--color-text-primary)" stroke-width="1.5"/><text x="206" y="130" font-size="9" fill="var(--color-text-muted)">Measure</text><rect x="250" y="100" width="50" height="22" rx="4" fill="var(--color-accent-subtle)" stroke="var(--color-accent-muted)" stroke-width="1"/><text x="275" y="115" text-anchor="middle" font-size="8" fill="var(--color-accent)">Simulated</text></svg>`;

    this.illustrations['software-architecture'] = `<svg class="svc-illustration" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" focusable="false"><rect x="12" y="12" width="296" height="136" rx="10" fill="none" stroke="var(--color-border)" stroke-dasharray="4 4"/><text x="24" y="26" font-size="9" fill="var(--color-text-muted)">System boundary</text><rect x="34" y="52" width="70" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="69" y="76" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">UI</text><rect x="125" y="36" width="70" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-accent)" stroke-width="1.5"/><text x="160" y="60" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">API</text><rect x="125" y="92" width="70" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="160" y="116" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">Data</text><rect x="216" y="52" width="70" height="40" rx="6" fill="var(--card-bg-subtle)" stroke="var(--color-border-strong)" stroke-width="1.5"/><text x="251" y="76" text-anchor="middle" font-size="10" font-weight="600" fill="var(--color-text-primary)">Service</text><defs><marker id="archArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="var(--color-accent)"/></marker></defs><line x1="104" y1="72" x2="125" y2="56" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#archArrow)"/><line x1="195" y1="56" x2="216" y2="72" stroke="var(--color-accent)" stroke-width="1.5" marker-end="url(#archArrow)"/><line x1="160" y1="76" x2="160" y2="92" stroke="var(--color-text-muted)" stroke-width="1.5" marker-end="url(#archArrow)"/><text x="168" y="86" font-size="8" fill="var(--color-text-muted)">interface</text></svg>`;

  }



  private readFragment(): string | null {
    const url = this.router.url;
    const hashIndex = url.indexOf('#');
    return hashIndex >= 0 ? url.slice(hashIndex + 1) : null;
  }

  private applyFragment(frag: string | null): boolean {
    if (frag && this.services.some(s => s.id === frag) && frag !== this.activeTab) {
      this.activeTab = frag;
      this.cdr.markForCheck();
      return true;
    }
    return false;
  }

  private doScroll(): void {
    requestAnimationFrame(() => {
      this.panel?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}