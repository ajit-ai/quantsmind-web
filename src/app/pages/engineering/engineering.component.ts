import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';

@Component({
  selector: 'app-engineering',
  standalone: true,
  imports: [CommonModule, RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">ENGINEERING</span>
        <h1>Architecture First.</h1>
        <p class="lead">
          Before we write code, we understand the system. We reason about structure,
          data flows, failure modes, integration boundaries, and long-term evolution.
          The architecture is the foundation everything else depends on.
        </p>
      </qm-container>
    </section>

    <!-- Principles -->
    <qm-section surface="white">
      <qm-container>
        <span class="eyebrow">PRINCIPLES</span>
        <h2>What Guides Our Engineering.</h2>
        <div class="principle-grid">
          <div *ngFor="let p of principles" class="principle-card">
            <div class="principle-card__number">{{ p.number }}</div>
            <h3 class="principle-card__title">{{ p.title }}</h3>
            <p class="principle-card__desc">{{ p.description }}</p>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- Disciplines -->
    <qm-section surface="canvas">
      <qm-container>
        <span class="eyebrow">DISCIPLINES</span>
        <h2>Eight Engineering Disciplines.</h2>
        <div class="discipline-list">
          <div *ngFor="let d of disciplines" class="discipline-item">
            <div class="discipline-item__header">
              <h3 class="discipline-item__title">{{ d.title }}</h3>
              <div class="discipline-item__tags">
                <span *ngFor="let tag of d.tags" class="discipline-tag">{{ tag }}</span>
              </div>
            </div>
            <p class="discipline-item__desc">{{ d.description }}</p>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- How We Work -->
    <qm-section surface="white">
      <qm-container>
        <div class="two-col">
          <div>
            <span class="eyebrow">HOW WE WORK</span>
            <h2>From Problem to Production.</h2>
            <p>We do not begin with a technology choice. We begin with a thorough
            understanding of the problem domain, the organisational constraints,
            and the technical requirements. From that foundation, architecture
            decisions have clear rationale.</p>
            <p>Every QuantsMind engagement starts with questions, not proposals.
            What does the system need to do? Who will maintain it? What are the
            real performance requirements? What is the cost of failure?</p>
            <qm-button variant="secondary" [routerLinkValue]="'/contact'">
              Start With Your Problem →
            </qm-button>
          </div>
          <div class="work-steps">
            <div *ngFor="let step of workSteps; let last = last" class="work-step">
              <div class="work-step__content">
                <div class="work-step__num">{{ step.num }}</div>
                <div>
                  <div class="work-step__title">{{ step.title }}</div>
                  <div class="work-step__desc">{{ step.desc }}</div>
                </div>
              </div>
              <div *ngIf="!last" class="work-step__line"></div>
            </div>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <h2>Ready to Talk Engineering?</h2>
          <p class="lead">Tell us about the system you are building, modernising, or struggling with.</p>
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

    .principle-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 40px;
    }
    @media (min-width: 640px) { .principle-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .principle-grid { grid-template-columns: repeat(3, 1fr); } }

    .principle-card {
      padding: 28px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 12px;
    }
    .principle-card__number {
      font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
      color: #2563EB; margin-bottom: 12px;
    }
    .principle-card__title { font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 8px; }
    .principle-card__desc  { font-size: 14px; color: #475569; line-height: 1.6; margin: 0; }

    .discipline-list { display: flex; flex-direction: column; gap: 0; margin-top: 40px; }
    .discipline-item {
      padding: 28px 0;
      border-bottom: 1px solid #E2E8F0;
    }
    .discipline-item:first-child { border-top: 1px solid #E2E8F0; }
    .discipline-item__header {
      display: flex; flex-wrap: wrap; align-items: flex-start;
      justify-content: space-between; gap: 16px; margin-bottom: 12px;
    }
    .discipline-item__title { font-size: 18px; font-weight: 600; color: #111827; margin: 0; }
    .discipline-item__tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .discipline-tag {
      font-size: 12px; color: #475569; background: #F1F5F9;
      border: 1px solid #E2E8F0; border-radius: 9999px; padding: 3px 10px;
    }
    .discipline-item__desc { font-size: 15px; color: #475569; line-height: 1.7; margin: 0; max-width: 680px; }

    .two-col {
      display: grid; grid-template-columns: 1fr; gap: 48px; align-items: start;
    }
    @media (min-width: 1024px) { .two-col { grid-template-columns: 1fr 1fr; } }
    .two-col p { color: #475569; line-height: 1.7; margin: 0 0 16px; }

    .work-steps { display: flex; flex-direction: column; }
    .work-step__content {
      display: flex; gap: 16px; align-items: flex-start;
      padding: 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px;
    }
    .work-step__num {
      width: 28px; height: 28px; border-radius: 50%;
      background: #2563EB; color: #fff; font-size: 12px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .work-step__title { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 4px; }
    .work-step__desc  { font-size: 13px; color: #475569; }
    .work-step__line {
      width: 1px; height: 16px; background: #E2E8F0; margin-left: 30px;
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
export class EngineeringComponent {
  principles = [
    { number: '01', title: 'Clarity Over Cleverness',     description: 'Code and architecture that can be read, understood, and changed by engineers who did not write it. Cleverness that obscures meaning is a liability.' },
    { number: '02', title: 'Architecture Before Implementation', description: 'The structural decisions made before writing code determine the constraints on everything that follows. They deserve the most careful thought.' },
    { number: '03', title: 'Correctness as a Requirement', description: 'Systems must behave correctly under all specified conditions, including edge cases and failure modes. Correctness is not optional.' },
    { number: '04', title: 'Observability by Design',     description: 'Every production system must produce the signals needed to understand its behaviour. Observability cannot be retrofitted effectively.' },
    { number: '05', title: 'Security as Structure',       description: 'Security controls belong in the architecture, not bolted on after the fact. Threat modelling is part of design.' },
    { number: '06', title: 'Systems Built to Evolve',     description: 'Requirements change. Systems must be designed to accommodate change without requiring complete rewrites. Evolvability is a design goal.' },
    { number: '07', title: 'Performance Under Evidence',  description: 'Performance decisions should be driven by measurement, not assumption. Premature optimisation is a persistent engineering hazard.' },
    { number: '08', title: 'Maintainability Over Novelty', description: 'The engineering team that will maintain a system deserves to inherit something they can understand and work with confidently.' },
    { number: '09', title: 'Explicit Over Implicit',      description: 'Implicit behaviour, hidden state, and magic configuration are sources of failure. Make behaviour explicit and intentions clear.' }
  ];

  disciplines = [
    { title: 'Architecture Engineering',
      tags: ['System Design', 'Domain Modelling', 'Integration Patterns'],
      description: 'Designing the structure of complex systems — defining components, boundaries, data flows, and interaction patterns before implementation begins. We apply domain-driven design, clean architecture, and event-driven patterns where appropriate.' },
    { title: 'Software Engineering',
      tags: ['Backend', 'API Design', 'Testing', 'Code Quality'],
      description: 'Engineering software that is correct, maintainable, and performant. We apply disciplined software engineering practices including automated testing, code review, continuous integration, and static analysis across all our work.' },
    { title: 'AI Engineering',
      tags: ['ML Systems', 'LLM Integration', 'MLOps', 'Evaluation'],
      description: 'Building AI capabilities that are reliable, measurable, and maintainable in production. We treat AI components as engineering artefacts — with defined contracts, observable behaviour, and systematic evaluation frameworks.' },
    { title: 'Data Engineering',
      tags: ['Pipelines', 'Warehousing', 'Streaming', 'Data Quality'],
      description: 'Designing and building data infrastructure from ingestion through to serving analytical requirements. We apply modern data platform patterns with a focus on reliability, lineage, and correctness.' },
    { title: 'Cloud & Platform Engineering',
      tags: ['Infrastructure as Code', 'Kubernetes', 'GitOps', 'FinOps'],
      description: 'Building and operating distributed systems and cloud infrastructure with a software engineering discipline. Infrastructure is code, every resource is auditable, and production is designed to be observable.' },
    { title: 'Integration Engineering',
      tags: ['APIs', 'Event Streaming', 'ESB Patterns', 'Message Queuing'],
      description: 'Designing and implementing the interfaces between systems — APIs, event streams, message queues, and integration layers. Clean integration boundaries are as important as the systems they connect.' },
    { title: 'Modernisation Engineering',
      tags: ['Legacy Migration', 'Strangler Fig', 'Domain Extraction', 'Re-platforming'],
      description: 'Systematic transformation of legacy systems with controlled risk. We understand the existing system thoroughly before designing the migration path, and we validate each step before proceeding.' },
    { title: 'Advanced Computing Engineering',
      tags: ['Optimisation', 'Quantum Algorithms', 'Scientific Computing', 'GPU Computing'],
      description: 'Applying mathematical and computational methods to problems where conventional approaches are insufficient. We combine theoretical rigour with practical implementation, and we are honest about what current technology can and cannot achieve.' }
  ];

  workSteps = [
    { num: '1', title: 'Problem Understanding', desc: 'Understand the problem domain, constraints, and real requirements.' },
    { num: '2', title: 'Architecture Design',   desc: 'Design the system structure with documented decisions and rationale.' },
    { num: '3', title: 'Engineering',           desc: 'Implement with discipline — tests, reviews, and CI from day one.' },
    { num: '4', title: 'Integration & Testing', desc: 'Validate behaviour at system level, not just unit level.' },
    { num: '5', title: 'Production Readiness',  desc: 'Observability, security review, runbook, and deployment pipeline.' },
    { num: '6', title: 'Evolution',             desc: 'The system is designed to change. We plan for it from the start.' }
  ];
}
