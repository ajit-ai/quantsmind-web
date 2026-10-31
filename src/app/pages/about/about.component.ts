import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';

interface Pillar {
  title: string;
  description: string;
  points: string[];
  cta: string;
  href: string;
}

@Component({
    selector: 'app-about',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmPageHeroComponent, QmRevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <qm-page-hero
      eyebrow="ABOUT"
      title="About QuantsMind."
      lead="QuantsMind is a technology engineering company focused on two things: engineering services and technology development."
      [artLabels]="['Engineering', 'Technology', 'Research', 'Delivery']">
    </qm-page-hero>

    <qm-section surface="white">
      <qm-container>
        <div class="pillars-grid">
          @for (pillar of pillars; track pillar; let i = $index) {
            <article class="pillar-card" qmReveal [qmRevealDelay]="i * 90">
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
    .pillars-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 768px) { .pillars-grid { grid-template-columns: repeat(2, 1fr); } }

    .pillar-card {
      position: relative;
      display: flex; flex-direction: column; align-items: flex-start; gap: 16px;
      padding: 36px; overflow: hidden;
      background:
        radial-gradient(420px 220px at 100% 0%, rgba(37, 99, 235, 0.08), transparent 62%),
        var(--color-surface);
      border: 1px solid var(--card-border); border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xs);
      transition: transform 280ms var(--qm-ease-out), box-shadow 280ms var(--qm-ease-out), border-color 280ms var(--qm-ease-out);
    }
    .pillar-card::before {
      content: '';
      position: absolute;
      inset: 0 0 auto;
      height: 3px;
      background: var(--gradient-signal);
    }
    .pillar-card:hover {
      transform: translateY(-3px);
      border-color: rgba(37, 99, 235, 0.22);
      box-shadow: var(--shadow-xl);
    }
    .pillar-card__desc {
      font-size: 15px; line-height: 1.7; color: var(--color-text-secondary);
      margin: 0 0 8px;
    }
    .pillar-card__list {
      margin: 0 0 8px; padding-left: 18px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .pillar-card__list li { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); }

    .principles-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 40px;
    }
    @media (min-width: 640px)  { .principles-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .principles-grid { grid-template-columns: repeat(3, 1fr); } }

    .principle-card {
      padding: 24px; background: var(--card-bg);
      border: 1px solid var(--card-border); border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
    }
    .principle-card__title {
      font-size: 15px; font-weight: 600; color: var(--color-text-primary); margin: 0 0 8px;
    }
    .principle-card__desc {
      font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; margin: 0;
    }

    .direction-block { text-align: left; }
    .direction-block h2 { margin: 0 0 16px; }
    .direction-block p {
      font-size: 16px; line-height: 1.8; color: var(--color-text-secondary);
      margin: 0 0 32px; max-width: 720px;
    }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); }
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
      description: 'Independent software technologies and languages built, released and maintained openly.',
      points: [
        'MicroQuantum — an open quantum computing SDK',
        'Karkain — a programming language and computing ecosystem',
        'QuantsMind SDK — a universal scientific computing SDK',
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