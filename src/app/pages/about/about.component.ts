import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';

interface BusinessArea {
  title: string;
  description: string;
}

interface Principle {
  title: string;
  description: string;
}

@Component({
    selector: 'app-about',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmPageHeroComponent, QmRevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <qm-page-hero
      eyebrow="ABOUT"
      title="About QuantsMind."
      lead="QuantsMind is an independent technology engineering and innovation company delivering advanced engineering services, proprietary software products and research-driven technology solutions for businesses and enterprises."
      [artLabels]="['Engineering', 'Technology', 'Research', 'Delivery']">
    </qm-page-hero>

    <qm-section surface="white" ariaLabel="Company">
      <qm-container>
        <span class="eyebrow">COMPANY</span>
        <h2>An engineering-led technology company.</h2>
        <p class="lead">
          QuantsMind exists to build genuine technical depth — across software,
          artificial intelligence, data, cloud and advanced computing. We deliver
          engineering services to organisations building, scaling and modernising
          technology systems, and we develop our own proprietary technologies in
          parallel. The aim is steady, compounding engineering capability rather
          than a broad portfolio of claims.
        </p>
        <p class="lead">
          Our purpose is to solve real engineering problems with practical,
          maintainable solutions and to be honest about the maturity of what we
          build. Research is presented as research, and product capability is
          claimed only where it has been demonstrated.
        </p>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" ariaLabel="What we do">
      <qm-container>
        <span class="eyebrow">WHAT WE DO</span>
        <h2>Key business areas.</h2>
        <div class="pillars-grid">
          @for (area of businessAreas; track area; let i = $index) {
            <article class="pillar-card" qmReveal [qmRevealDelay]="i * 90">
              <span class="eyebrow">{{ area.title }}</span>
              <p class="pillar-card__desc">{{ area.description }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="white" ariaLabel="Our approach">
      <qm-container>
        <span class="eyebrow">OUR APPROACH</span>
        <h2>How we work.</h2>
        <div class="principles-grid">
          @for (p of approach; track p) {
            <div class="principle-card">
              <h3 class="principle-card__title">{{ p.title }}</h3>
              <p class="principle-card__desc">{{ p.description }}</p>
            </div>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" ariaLabel="Technology and innovation">
      <qm-container>
        <span class="eyebrow">TECHNOLOGY &amp; INNOVATION</span>
        <h2>Technology capabilities and innovation.</h2>
        <p class="lead">
          QuantsMind develops and maintains its own software technologies and
          explores emerging computing approaches through QuantsMind Labs. Our
          portfolio includes MicroQuantum, Karkain, the QuantsMind SDK and
          QuantsMind Labs, alongside the services and product initiatives
          described across the site.
        </p>
        <qm-button variant="primary" size="md" [routerLinkValue]="'/products'">
          Explore Products &amp; Technology →
        </qm-button>
      </qm-container>
    </qm-section>

    <qm-section surface="white" ariaLabel="Contact">
      <qm-container size="narrow">
        <div class="direction-block">
          <span class="eyebrow">CONTACT</span>
          <h2>Get in touch.</h2>
          <p>
            Have an engineering requirement, technology challenge or
            collaboration idea? We welcome conversations about how QuantsMind
            can support your work.
          </p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Contact QuantsMind →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .pillars-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 24px;
    }
    @media (min-width: 768px) { .pillars-grid { grid-template-columns: repeat(2, 1fr); } }

    .pillar-card {
      position: relative;
      display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
      padding: 32px; overflow: hidden;
      background:
        radial-gradient(420px 220px at 100% 0%, rgba(37, 99, 235, 0.08), transparent 62%),
        var(--color-surface);
      border: 1px solid var(--card-border); border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xs);
    }
    .pillar-card::before {
      content: '';
      position: absolute;
      inset: 0 0 auto;
      height: 3px;
      background: var(--gradient-signal);
    }
    .pillar-card__desc {
      font-size: 15px; line-height: 1.7; color: var(--color-text-secondary);
      margin: 0;
    }

    .principles-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 24px;
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
    .lead { font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); max-width: 760px; }
    `]
})
export class AboutComponent {
  businessAreas: BusinessArea[] = [
    { title: 'Engineering and Software Development',
      description: 'Software architecture, full-stack application development, platform and cloud engineering, and technical modernisation of business systems.' },
    { title: 'Artificial Intelligence',
      description: 'AI and machine-learning engineering applied to real business problems, with measurable behaviour rather than speculative capability.' },
    { title: 'Data Intelligence',
      description: 'Data engineering, analytics and decision-support systems built on sound architecture and maintainable pipelines.' },
    { title: 'Financial Intelligence',
      description: 'Software and analytical systems supporting financial and quantitative workflows.' },
    { title: 'Advanced Technology and Research',
      description: 'Independent research and development of proprietary technologies and computing approaches, including quantum software initiatives.' }
  ];

  approach: Principle[] = [
    { title: 'Engineering-Led Execution', description: 'Practical engineering rather than technology for technology\u2019s sake.' },
    { title: 'Practical Problem Solving', description: 'Technology is the answer to a problem, not the start of one.' },
    { title: 'Scalable and Maintainable Solutions', description: 'We build systems the next engineering team can understand, maintain and evolve.' },
    { title: 'Responsible Technology Development', description: 'We do not present research as product capability or claim expertise we do not have.' },
    { title: 'Evidence-Based Engineering', description: 'Decisions are grounded in measured, characterised behaviour \u2014 not fashion.' }
  ];
}
