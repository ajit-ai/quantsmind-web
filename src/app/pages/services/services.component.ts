import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

interface ServiceArea {
  id: string;
  icon: string;
  title: string;
  description: string;
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
        <div class="services-grid">
          @for (area of areas; track area; let i = $index) {
            <article class="service-card" [id]="area.id">
              <div class="service-card__num" aria-hidden="true">0{{ i + 1 }}</div>
              <div class="service-card__icon" aria-hidden="true" [innerHTML]="area.icon | qmSafeHtml"></div>
              <h2 class="service-card__title">{{ area.title }}</h2>
              <p class="service-card__desc">{{ area.description }}</p>
            </article>
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

    .services-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 640px)  { .services-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(3, 1fr); } }

    .service-card {
      position: relative;
      display: flex; flex-direction: column; gap: 12px;
      padding: 32px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 12px;
      scroll-margin-top: 88px;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .service-card:hover {
      border-color: #BFDBFE;
      box-shadow: 0 4px 16px rgba(37,99,235,0.08);
    }
    .service-card__num {
      position: absolute; top: 24px; right: 28px;
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.06em; color: #CBD5E1;
    }
    .service-card__icon {
      width: 44px; height: 44px; display: flex;
      align-items: center; justify-content: center;
      background: #EFF6FF; border-radius: 10px; color: #2563EB;
    }
    .service-card__title { font-size: 18px; font-weight: 600; color: #111827; margin: 0; }
    .service-card__desc  { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; }

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
  `]
})
export class ServicesComponent {
  areas: ServiceArea[] = [
    {
      id: 'software-architecture',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/></svg>`,
      title: 'Software Architecture',
      description: 'System design, solution architecture and technical foundations for maintainable software — making sure the structural decisions are sound before implementation begins.'
    },
    {
      id: 'application-development',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      title: 'Application Development',
      description: 'Backend systems, APIs and developer platforms, engineered for correctness and clarity — applications that are practical to build, test and evolve.'
    },
    {
      id: 'ai-ml-engineering',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI & ML Engineering',
      description: 'AI/ML application development, intelligent systems and the practical integration of modern AI technologies into products that genuinely benefit from them.'
    },
    {
      id: 'cloud-engineering',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
      title: 'Cloud Engineering',
      description: 'Cloud architecture, deployment, infrastructure automation and engineering environments built for reliability, observability and controlled cost.'
    },
    {
      id: 'devops-ci-cd',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      title: 'DevOps & CI/CD',
      description: 'Continuous integration and deployment pipelines, automated testing and release engineering — software delivery that is repeatable, observable and safe.'
    },
    {
      id: 'technical-consulting',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
      title: 'Technical Consulting',
      description: 'Technical modernization, system design and engineering guidance — independent, honest advice that helps teams make sound technical decisions.'
    }
  ];
}