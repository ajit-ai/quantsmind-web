import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

interface EcosystemTech {
  name: string;
  tagline: string;
  status: string;
  badge: 'early-access' | 'development';
  description: string;
  href: string;
}

@Component({
    selector: 'app-technology',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">TECHNOLOGY</span>
        <h1>Technology Ecosystem</h1>
        <p class="lead">
          Technologies being designed, engineered and explored within the QuantsMind
          ecosystem.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container>
        <div class="ecosystem-grid">
          @for (tech of ecosystem; track tech) {
            <a [routerLink]="tech.href" class="tech-card" [attr.aria-label]="'Explore ' + tech.name">
              <div class="tech-card__meta">
                <h2 class="tech-card__title">{{ tech.name }}</h2>
                <qm-badge [variant]="tech.badge">{{ tech.status }}</qm-badge>
              </div>
              <p class="tech-card__tagline">{{ tech.tagline }}</p>
              <p class="tech-card__desc">{{ tech.description }}</p>
              <span class="tech-card__link">Explore {{ tech.name }} →</span>
            </a>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" size="sm">
      <qm-container size="narrow">
        <div class="intro-block">
          <h2>Behind the Ecosystem</h2>
          <p class="lead">
            These technologies are built with the same engineering discipline we apply
            to client work. Some are approaching developer availability; others are
            still early explorations. Each project page states its current maturity
            honestly.
          </p>
          <qm-button variant="secondary" [routerLinkValue]="'/contact'">
            Discuss a Collaboration Idea →
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

    .ecosystem-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 768px) { .ecosystem-grid { grid-template-columns: repeat(3, 1fr); } }

    .tech-card {
      display: flex; flex-direction: column; gap: 12px;
      padding: 32px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 12px;
      text-decoration: none;
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
    }
    .tech-card:hover {
      border-color: #BFDBFE;
      box-shadow: 0 4px 16px rgba(37,99,235,0.08);
      transform: translateY(-2px);
    }
    .tech-card:focus-visible {
      outline: 2px solid #2563EB; outline-offset: 3px;
    }
    .tech-card__meta {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; flex-wrap: wrap;
    }
    .tech-card__title { font-size: 20px; font-weight: 600; color: #111827; margin: 0; }
    .tech-card__tagline { font-size: 14px; font-weight: 500; color: #2563EB; margin: 0; }
    .tech-card__desc  { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; flex: 1; }
    .tech-card__link  { font-size: 13px; font-weight: 500; color: #2563EB; margin-top: 4px; }

    @media (prefers-reduced-motion: reduce) {
      .tech-card { transition: none; }
      .tech-card:hover { transform: none; }
    }

    .intro-block {
      text-align: center; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }
    .intro-block h2 { margin: 0; }
    .intro-block .lead { max-width: 640px; margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
  `]
})
export class TechnologyComponent {
  ecosystem: EcosystemTech[] = [
    {
      name: 'MicroQuantum',
      tagline: 'Open Quantum Computing SDK',
      status: 'Developer Preview · v0.4.0',
      badge: 'early-access',
      description: 'An open Python SDK for building, executing and analyzing quantum programs.',
      href: '/microquantum'
    },
    {
      name: 'Karkain',
      tagline: 'General-Purpose Programming Language',
      status: 'Active Development',
      badge: 'development',
      description: 'An independent programming language and computing ecosystem being developed by QuantsMind.',
      href: '/karkain'
    },
    {
      name: 'QuantsMind SDK',
      tagline: 'General-Purpose Technology SDK',
      status: 'Development',
      badge: 'development',
      description: 'A software foundation exploring reusable abstractions for intelligent computing, data and advanced technology applications.',
      href: '/quantsmind-sdk'
    }
  ];
}