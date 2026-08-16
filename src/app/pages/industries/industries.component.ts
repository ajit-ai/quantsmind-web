import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">INDUSTRIES</span>
        <h1>Technology Problems Across Sectors.</h1>
        <p class="lead">
          Complex technology challenges appear across every industry.
          We bring deep engineering thinking to the sectors where our capabilities
          create the most value.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container>
        <div class="industry-grid">
          <div *ngFor="let industry of industries" class="industry-card">
            <div class="industry-card__icon" aria-hidden="true" [innerHTML]="industry.icon"></div>
            <h2 class="industry-card__name">{{ industry.name }}</h2>
            <p class="industry-card__desc">{{ industry.description }}</p>
            <h3 class="industry-card__sub">Common Challenges</h3>
            <ul class="industry-card__list">
              <li *ngFor="let challenge of industry.challenges">{{ challenge }}</li>
            </ul>
            <div class="industry-card__caps">
              <span *ngFor="let cap of industry.capabilities" class="industry-tag">{{ cap }}</span>
            </div>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <h2>Working in a Different Sector?</h2>
          <p class="lead">The engineering challenges we address appear across many industries. Tell us about your problem.</p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Talk to QuantsMind →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 700px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 620px; margin: 0; }

    .industry-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 768px) { .industry-grid { grid-template-columns: repeat(2, 1fr); } }

    .industry-card {
      padding: 32px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .industry-card__icon {
      width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
      background: #EFF6FF; border-radius: 10px; color: #2563EB; margin-bottom: 16px;
    }
    .industry-card__name { font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 10px; }
    .industry-card__desc { font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 20px; }
    .industry-card__sub {
      font-size: 11px; font-weight: 600; letter-spacing: 0.07em;
      text-transform: uppercase; color: #64748B; margin: 0 0 10px;
    }
    .industry-card__list {
      list-style: none; margin: 0 0 16px; padding: 0;
      display: flex; flex-direction: column; gap: 6px;
    }
    .industry-card__list li {
      font-size: 13px; color: #475569; padding-left: 14px; position: relative; line-height: 1.5;
    }
    .industry-card__list li::before { content: '–'; position: absolute; left: 0; color: #94A3B8; }
    .industry-card__caps { display: flex; flex-wrap: wrap; gap: 6px; }
    .industry-tag {
      font-size: 11px; color: #475569; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 9999px; padding: 3px 10px;
    }

    .page-cta { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
    .page-cta h2 { margin: 0; }
    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
  `]
})
export class IndustriesComponent {
  industries = [
    {
      name: 'Financial Services',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      description: 'Financial institutions face technology problems characterised by high transaction volumes, strict regulatory requirements, complex risk models, and legacy systems that cannot simply be replaced.',
      challenges: ['Core banking modernisation with zero tolerance for data loss', 'Real-time risk calculation and regulatory reporting', 'Fraud detection with high-volume event stream processing', 'Data lineage and auditability across complex system landscapes'],
      capabilities: ['Enterprise Software', 'Data Engineering', 'AI Engineering', 'Modernization']
    },
    {
      name: 'Insurance',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      description: 'Insurance technology involves complex product configuration, actuarial data models, claims processing workflows, and the challenge of extracting insights from heterogeneous policy and claims data.',
      challenges: ['Policy administration system modernisation', 'Claims automation with appropriate human oversight', 'Actuarial model implementation and validation', 'Regulatory reporting across multiple jurisdictions'],
      capabilities: ['Enterprise Software', 'AI Engineering', 'Data Engineering', 'Modernization']
    },
    {
      name: 'Manufacturing',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`,
      description: 'Manufacturing organisations deal with scheduling complexity, supply chain optimisation, IoT data management, and quality systems that require reliable data from heterogeneous sources.',
      challenges: ['Production scheduling optimisation across constrained resources', 'Supply chain visibility and disruption response', 'Quality management with sensor data integration', 'Digital twin development for process simulation'],
      capabilities: ['Advanced Computing', 'Data Engineering', 'Cloud Engineering', 'AI Engineering']
    },
    {
      name: 'Healthcare',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      description: 'Healthcare technology must navigate strict regulatory frameworks, complex clinical data models, interoperability requirements, and the high cost of errors in systems affecting patient outcomes.',
      challenges: ['Clinical data platform development and HL7 FHIR integration', 'Clinical decision support system engineering', 'Healthcare analytics with appropriate data governance', 'Legacy EMR/EHR system integration and modernisation'],
      capabilities: ['Enterprise Software', 'Data Engineering', 'AI Engineering', 'Integration Engineering']
    },
    {
      name: 'Retail & Consumer',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
      description: 'Retail and consumer organisations manage complex product catalogues, multi-channel order management, demand forecasting, and personalisation systems at scale.',
      challenges: ['Order management and fulfilment platform engineering', 'Demand forecasting and inventory optimisation', 'Personalisation systems at production scale', 'Omnichannel data integration and customer identity resolution'],
      capabilities: ['AI Engineering', 'Data Engineering', 'Enterprise Software', 'Advanced Computing']
    },
    {
      name: 'Logistics & Supply Chain',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
      description: 'Logistics technology involves routing optimisation, real-time tracking, network planning, and the challenge of reacting intelligently to disruptions across complex supply networks.',
      challenges: ['Vehicle routing and fleet optimisation', 'Warehouse management system engineering', 'Supply chain visibility and event-driven response', 'Network design and capacity planning optimisation'],
      capabilities: ['Advanced Computing', 'Data Engineering', 'Enterprise Software', 'AI Engineering']
    },
    {
      name: 'Public Sector',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      description: 'Public sector technology operates under unique constraints — accessibility requirements, procurement rules, legacy debt accumulated over decades, and the imperative to serve every citizen reliably.',
      challenges: ['Legacy government system modernisation with continuity of service', 'Data sharing across agencies with appropriate governance', 'Digital service platform development to accessibility standards', 'Case management and workflow system engineering'],
      capabilities: ['Modernization', 'Enterprise Software', 'Data Engineering', 'Cloud Engineering']
    },
    {
      name: 'Technology Companies',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      description: 'Technology companies building products face the engineering challenges of scale, reliability, and the need to embed intelligence into products without creating unmaintainable systems.',
      challenges: ['Platform engineering for product scalability', 'AI feature development with rigorous evaluation', 'Data platform development for product analytics', 'Technical debt management and architectural evolution'],
      capabilities: ['Cloud Engineering', 'AI Engineering', 'Enterprise Software', 'Data Engineering']
    }
  ];
}
