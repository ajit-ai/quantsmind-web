import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

interface LabArea {
  name: string;
  icon: string;
  description: string;
}

@Component({
    selector: 'app-labs',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="labs-hero">
      <qm-container>
        <span class="labs-eyebrow">QUANTSMIND LABS</span>
        <h1 class="labs-hero__headline">
          Technology, Experimentally.
        </h1>
        <p class="labs-hero__lead">
          QuantsMind Labs is where we explore emerging technologies, experimental
          architectures and new computing approaches.
        </p>
      </qm-container>
    </section>

    <qm-section surface="canvas">
      <qm-container>
        <div class="section-header">
          <span class="eyebrow">AREAS OF EXPLORATION</span>
          <h2>What We Explore.</h2>
          <p class="lead section-header__lead">
            Labs work spans the technologies QuantsMind is curious about — some of
            which feed into the engineering ecosystem we develop.
          </p>
        </div>

        <div class="areas-grid">
          @for (area of areas; track area) {
            <article class="area-card">
              <div class="area-card__icon" aria-hidden="true" [innerHTML]="area.icon | qmSafeHtml"></div>
              <h3 class="area-card__title">{{ area.name }}</h3>
              <p class="area-card__desc">{{ area.description }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="white">
      <qm-container size="narrow">
        <div class="distinction-block">
          <span class="eyebrow">EXPERIMENTAL, NOT PRODUCTION</span>
          <h2>Clear About Maturity.</h2>
          <p class="lead">
            Labs work is experimental by definition. It represents technology
            development and exploration rather than production products or services.
            We label projects honestly so it is always clear what is a working system
            and what is still being investigated.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <span class="eyebrow">COLLABORATE</span>
          <h2>Exploring Something Interesting?</h2>
          <p class="lead">
            If you are working on or curious about the technologies we explore, we
            would be glad to hear from you.
          </p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Get in Touch →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    /* Hero — dark */
    .labs-hero {
      background: #0F172A;
      padding: 96px 0 80px;
      border-bottom: 1px solid #1E293B;
    }
    @media (min-width: 768px) { .labs-hero { padding: 128px 0 96px; } }

    .labs-eyebrow {
      display: inline-block;
      font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #93C5FD; margin-bottom: 20px;
    }

    .labs-hero__headline {
      font-size: clamp(34px, 4.5vw, 56px);
      font-weight: 700; line-height: 1.1;
      letter-spacing: -0.025em;
      color: #F1F5F9; margin: 0 0 24px;
      text-wrap: balance; max-width: 800px;
    }

    .labs-hero__lead {
      font-size: 18px; line-height: 1.7;
      color: #94A3B8; max-width: 640px;
      margin: 0;
    }

    .section-header { margin-bottom: 40px; max-width: 640px; }
    .section-header__lead { margin-top: 12px; }

    .areas-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px;
    }
    @media (min-width: 640px)  { .areas-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .areas-grid { grid-template-columns: repeat(4, 1fr); } }

    .area-card {
      display: flex; flex-direction: column; gap: 12px;
      padding: 24px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .area-card__icon {
      width: 44px; height: 44px; display: flex;
      align-items: center; justify-content: center;
      background: #EFF6FF; border-radius: 10px; color: #2563EB;
    }
    .area-card__title { font-size: 15px; font-weight: 600; color: #111827; margin: 0; }
    .area-card__desc { font-size: 13px; line-height: 1.6; color: #475569; margin: 0; }

    .distinction-block { max-width: 720px; }
    .distinction-block h2 { margin: 0 0 16px; }
    .distinction-block .lead { margin: 0; }

    .page-cta {
      text-align: center; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }
    .page-cta h2 { margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
  `]
})
export class LabsComponent {
  areas: LabArea[] = [
    {
      name: 'Artificial Intelligence',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      description: 'Intelligent systems, agent architectures and practical applications of modern AI.'
    },
    {
      name: 'Machine Learning',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>`,
      description: 'ML pipelines, evaluation methodology and reliable model deployment.'
    },
    {
      name: 'Quantum Computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      description: 'Quantum program development, algorithms and hybrid quantum-classical approaches.'
    },
    {
      name: 'Programming Languages',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      description: 'Language design, tooling and computing ecosystems developed in-house.'
    },
    {
      name: 'Scientific Computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      description: 'Numerical methods, simulation and high-performance computing approaches.'
    },
    {
      name: 'Developer Infrastructure',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      description: 'Developer tooling, SDKs, and reusable foundations for building software.'
    },
    {
      name: 'Data Intelligence',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
      description: 'Knowledge representation, data platforms and intelligent data systems.'
    }
  ];
}