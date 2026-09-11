import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';

interface Pillar {
  title: string;
  description: string;
  points: string[];
  cta: string;
  href: string;
}

@Component({
    selector: 'app-about',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">ABOUT</span>
        <h1>About QuantsMind.</h1>
        <p class="lead">
          QuantsMind is a technology engineering company focused on two things:
          engineering services and technology development.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container>
        <div class="pillars-grid">
          @for (pillar of pillars; track pillar) {
            <article class="pillar-card">
              <span class="eyebrow">{{ pillar.title }}</span>
              <p class="pillar-card__desc">{{ pillar.description }}</p>
              <ul class="pillar-card__list">
                @for (point of pillar.points; track point) {
                  <li>{{ point }}</li>
                }
              </ul>
              <qm-button variant="secondary" size="md" [routerLinkValue]="pillar.href">
                {{ pillar.cta }} →
              </qm-button>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas">
      <qm-container>
        <span class="eyebrow">WHY QUANTSMIND</span>
        <h2>How We Approach It.</h2>
        <div class="principles-grid">
          @for (p of principles; track p) {
            <div class="principle-card">
              <h3 class="principle-card__title">{{ p.title }}</h3>
              <p class="principle-card__desc">{{ p.description }}</p>
            </div>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="white">
      <qm-container size="narrow">
        <div class="direction-block">
          <span class="eyebrow">DIRECTION</span>
          <h2>Where We Are Headed.</h2>
          <p>
            We are building a company with genuine technical depth — across software,
            AI, data, cloud and advanced computing. Alongside client engineering, we
            develop our own technologies and openly share what we learn where it makes
            sense. The goal is steady, compounding engineering capability rather than a
            broad portfolio of claims.
          </p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Get in Touch →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 700px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 640px; margin: 0; }

    .pillars-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 768px) { .pillars-grid { grid-template-columns: repeat(2, 1fr); } }

    .pillar-card {
      display: flex; flex-direction: column; align-items: flex-start; gap: 16px;
      padding: 36px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 16px;
    }
    .pillar-card__desc {
      font-size: 15px; line-height: 1.7; color: #475569;
      margin: 0 0 8px;
    }
    .pillar-card__list {
      margin: 0 0 8px; padding-left: 18px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .pillar-card__list li { font-size: 14px; line-height: 1.6; color: #475569; }

    .principles-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 40px;
    }
    @media (min-width: 640px)  { .principles-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .principles-grid { grid-template-columns: repeat(3, 1fr); } }

    .principle-card {
      padding: 24px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .principle-card__title {
      font-size: 15px; font-weight: 600; color: #111827; margin: 0 0 8px;
    }
    .principle-card__desc {
      font-size: 13px; color: #475569; line-height: 1.6; margin: 0;
    }

    .direction-block { text-align: left; }
    .direction-block h2 { margin: 0 0 16px; }
    .direction-block p {
      font-size: 16px; line-height: 1.8; color: #475569;
      margin: 0 0 32px; max-width: 720px;
    }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
  `]
})
export class AboutComponent {
  pillars: Pillar[] = [
    {
      title: 'ENGINEERING SERVICES',
      description: 'Professional software engineering talent for companies building, scaling and maintaining technology systems.',
      points: [
        'Software architecture and full-stack application development',
        'AI/ML engineering applied to real business problems',
        'Cloud, platform and CI/CD engineering',
        'Technical modernization, system design and consulting'
      ],
      cta: 'Explore Our Services',
      href: '/services'
    },
    {
      title: 'TECHNOLOGY DEVELOPMENT',
      description: 'Independent software technologies, languages and experimental platforms built and shared openly.',
      points: [
        'MicroQuantum — an open quantum computing SDK',
        'Karkain — a programming language and computing ecosystem',
        'QuantsMind SDK — foundations for intelligent applications',
        'QuantsMind Labs — exploration of emerging computing'
      ],
      cta: 'Explore Our Technologies',
      href: '/technology'
    }
  ];

  principles = [
    { title: 'Engineering First',     description: 'Practical engineering rather than technology for technology\u2019s sake.' },
    { title: 'Architecture Driven',   description: 'Structural decisions matter most. We design systems before building them.' },
    { title: 'Honest About Maturity', description: 'We do not present research as product capability or claim expertise we do not have.' },
    { title: 'Long-Term Thinking',    description: 'We build systems the next engineering team can understand, maintain and evolve.' },
    { title: 'Evidence Over Assumption', description: 'Decisions are grounded in measured, characterised behaviour — not fashion.' },
    { title: 'Problems Before Technology', description: 'Technology is the answer to a problem, not the start of one.' }
  ];
}