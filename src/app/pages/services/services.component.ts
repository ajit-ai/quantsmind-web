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
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 720px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 640px; margin: 0; }

    .services-intro {
      max-width: 680px; margin: 0 0 36px;
      font-size: 16px; line-height: 1.7; color: #475569;
    }

    /* ── TABS ── */
    .svc-tabs {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 0 0 36px;
      padding: 10px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
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
      transition: background-color 150ms ease, border-color 150ms ease;
    }
    .svc-tab:hover { background: #FFFFFF; border-color: #E2E8F0; }
    .svc-tab--active {
      background: #FFFFFF;
      border-color: #BFDBFE;
      box-shadow: 0 2px 10px rgba(37, 99, 235, 0.10);
    }
    .svc-tab__icon {
      width: 40px; height: 40px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: #EFF6FF; border-radius: 10px; color: #2563EB;
      transition: background-color 150ms ease, color 150ms ease;
    }
    .svc-tab--active .svc-tab__icon { background: #2563EB; color: #FFFFFF; }
    .svc-tab__label { font-size: 13px; font-weight: 500; color: #334155; line-height: 1.3; }
    .svc-tab--active .svc-tab__label { font-weight: 600; color: #111827; }
    .svc-tab:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; }

    /* ── DETAIL PANEL ── */
    .svc-panel { scroll-margin-top: 96px; }
    .svc-detail {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
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
      background: #EFF6FF; border-radius: 12px; color: #2563EB;
    }
    .svc-detail__title { font-size: clamp(24px, 3vw, 30px); font-weight: 700; color: #111827; margin: 0 0 8px; letter-spacing: -0.02em; }
    .svc-detail__short { margin: 0; font-size: 16px; line-height: 1.7; color: #475569; }

    .svc-detail__grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
      margin-bottom: 24px;
    }
    @media (min-width: 768px) { .svc-detail__grid { grid-template-columns: 1fr 1fr; gap: 32px; } }

    .svc-detail__h3 {
      margin: 0 0 12px;
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: #2563EB;
    }
    .svc-detail__list { margin: 0; padding-left: 20px; color: #475569; }
    .svc-detail__list li { margin-bottom: 8px; line-height: 1.6; font-size: 15px; }
    .svc-detail__list li:last-child { margin-bottom: 0; }

    .svc-detail__context { margin-bottom: 24px; }
    .svc-detail__context p { margin: 0; max-width: 720px; color: #475569; font-size: 15px; line-height: 1.7; text-wrap: pretty; }

    .svc-detail__outcome {
      margin: 0 0 24px;
      padding: 14px 18px;
      background: #F8FAFC;
      border-left: 3px solid #2563EB;
      border-radius: 0 8px 8px 0;
      color: #475569;
      font-size: 15px; line-height: 1.7;
    }
    .svc-detail__outcome strong { color: #111827; }

    .svc-detail__cta { display: flex; }

    /* ── CTA ── */
    .page-cta {
      text-align: center; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }
    .page-cta h2 { margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; margin: 0; }

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
      id: 'application-development',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      title: 'Application Development',
      short: 'Backend systems, APIs and developer platforms engineered for correctness and clarity.',
      provides: [
        'Backend services and business APIs',
        'Developer platforms and internal tooling',
        'Data modelling and storage design',
        'System integration and third-party connectivity',
        'Code review and quality engineering practices'
      ],
      deliverables: [
        'Working, tested applications and services',
        'Documented API contracts',
        'Deployment-ready builds and configuration',
        'Integration code and connectors'
      ],
      context: 'Modern backend stacks, databases, message queues and cloud services.',
      outcome: 'Applications that are practical to build, test and evolve over time.'
    },
    {
      id: 'ai-ml-engineering',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI & ML Engineering',
      short: 'Applied AI and ML development, integrated into products that genuinely benefit from it.',
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

  @ViewChild('panel') panel?: ElementRef<HTMLElement>;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private routerSub?: Subscription;
  private viewReady = false;
  private pendingScroll = false;

  ngOnInit(): void {
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