import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

@Component({
  selector: 'app-what-we-build',
  standalone: true,
  imports: [CommonModule, RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Page Header -->
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">WHAT WE BUILD</span>
        <h1>Enterprise Technology Built Around Real Problems.</h1>
        <p class="lead">
          Each of our six engineering disciplines reflects a domain where deep technical
          thinking, careful architecture, and disciplined engineering create systems worth
          building and maintaining.
        </p>
      </qm-container>
    </section>

    <!-- Capabilities -->
    <ng-container *ngFor="let cap of capabilities; let i = index">
      <qm-section [surface]="i % 2 === 0 ? 'white' : 'canvas'" [id]="cap.id">
        <qm-container>
          <div class="cap-layout" [class.cap-layout--reverse]="i % 2 !== 0">
            <div class="cap-content">
              <div class="cap-icon" aria-hidden="true" [innerHTML]="cap.icon"></div>
              <h2>{{ cap.title }}</h2>
              <p class="lead">{{ cap.lead }}</p>
              <h3 class="cap-sub-heading">Problems We Address</h3>
              <ul class="cap-list">
                <li *ngFor="let problem of cap.problems">{{ problem }}</li>
              </ul>
              <h3 class="cap-sub-heading">Engineering Approach</h3>
              <p>{{ cap.approach }}</p>
              <div class="cap-tags">
                <span *ngFor="let tag of cap.tags" class="cap-tag">{{ tag }}</span>
              </div>
              <div class="cap-cta">
                <qm-badge [variant]="cap.entry">{{ cap.entryLabel }}</qm-badge>
                <qm-button variant="secondary" [routerLinkValue]="'/contact'">
                  Discuss This →
                </qm-button>
              </div>
            </div>
            <div class="cap-diagram" aria-hidden="true">
              <div class="cap-diagram__inner">
                <div class="cap-diagram__title">{{ cap.diagramTitle }}</div>
                <div class="cap-diagram__flow">
                  <div *ngFor="let step of cap.diagramSteps; let last = last" class="cap-diagram__step">
                    <div class="cap-diagram__step-label">{{ step }}</div>
                    <div *ngIf="!last" class="cap-diagram__step-arrow">↓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </qm-container>
      </qm-section>
    </ng-container>

    <!-- Final CTA -->
    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <h2>Not Sure Which Capability Applies?</h2>
          <p class="lead">Start with the problem. We will help you identify the right engineering approach.</p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Talk to QuantsMind →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    .page-hero {
      padding: 80px 0 64px;
      border-bottom: 1px solid #E2E8F0;
    }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 760px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 640px; margin: 0; }

    .cap-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 48px;
      align-items: start;
    }
    @media (min-width: 1024px) {
      .cap-layout { grid-template-columns: 1fr 1fr; align-items: center; }
      .cap-layout--reverse .cap-content { order: 2; }
      .cap-layout--reverse .cap-diagram { order: 1; }
    }

    .cap-icon {
      width: 56px; height: 56px;
      display: flex; align-items: center; justify-content: center;
      background: #EFF6FF; border-radius: 12px; color: #2563EB;
      margin-bottom: 20px;
    }
    .cap-content h2 { margin: 0 0 16px; }
    .cap-content .lead { margin: 0 0 28px; }

    .cap-sub-heading {
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.06em; text-transform: uppercase;
      color: #64748B; margin: 0 0 12px;
    }

    .cap-list {
      list-style: none; margin: 0 0 24px; padding: 0;
      display: flex; flex-direction: column; gap: 8px;
    }
    .cap-list li {
      font-size: 14px; color: #475569; line-height: 1.5;
      padding-left: 16px; position: relative;
    }
    .cap-list li::before {
      content: '–'; position: absolute; left: 0; color: #2563EB;
    }

    .cap-tags {
      display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0 24px;
    }
    .cap-tag {
      font-size: 12px; color: #475569;
      background: #F1F5F9; border: 1px solid #E2E8F0;
      border-radius: 9999px; padding: 4px 10px;
    }

    .cap-cta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }

    .cap-diagram__inner {
      background: #0F172A; border-radius: 12px;
      padding: 32px; border: 1px solid #1E293B;
    }
    .cap-diagram__title {
      font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; color: #475569; margin-bottom: 24px;
    }
    .cap-diagram__flow { display: flex; flex-direction: column; gap: 0; }
    .cap-diagram__step { display: flex; flex-direction: column; align-items: flex-start; }
    .cap-diagram__step-label {
      font-size: 13px; font-weight: 500; color: #E2E8F0;
      background: #1E293B; border: 1px solid #334155;
      border-radius: 8px; padding: 10px 16px; width: 100%;
    }
    .cap-diagram__step-arrow {
      font-size: 14px; color: #334155;
      padding: 4px 22px;
    }

    .page-cta { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
    .page-cta h2 { margin: 0; }
    .page-cta .lead { margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
  `]
})
export class WhatWeBuildComponent {
  capabilities = [
    {
      id: 'enterprise-software',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      title: 'Enterprise Software',
      lead: 'Mission-critical software engineered for correctness, performance, and long-term maintainability. We design systems that your organisation can depend on and your engineering team can evolve with confidence.',
      problems: [
        'Systems that must handle high transaction volumes with strict correctness requirements',
        'Complex domain logic that is difficult to reason about and expensive to change',
        'Integration challenges across multiple enterprise systems and data sources',
        'Platforms that need to scale without sacrificing reliability or maintainability'
      ],
      approach: 'We begin with domain modelling — understanding the problem deeply before writing a line of code. We apply patterns from domain-driven design, clean architecture, and distributed systems thinking to create software that accurately models the business and remains comprehensible under change.',
      tags: ['Domain-Driven Design', 'Clean Architecture', 'API Design', 'Event-Driven Systems', 'Java', 'Go', 'TypeScript', '.NET'],
      entry: 'build' as const, entryLabel: 'BUILD',
      diagramTitle: 'ENTERPRISE SOFTWARE STRUCTURE',
      diagramSteps: ['Domain Model', 'Application Layer', 'Infrastructure', 'Integration Layer', 'Observability']
    },
    {
      id: 'ai-engineering',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI Engineering',
      lead: 'Applied artificial intelligence integrated into real products and systems. We design AI capabilities that earn their place — measurably improving outcomes without introducing unnecessary complexity or fragility.',
      problems: [
        'Products that need to reason, predict, or classify based on data and learned patterns',
        'Workflows where manual processes can be reliably automated using trained models',
        'Knowledge retrieval and synthesis challenges across large document corpora',
        'Decision support systems where AI-augmented analysis improves human judgement'
      ],
      approach: 'We treat AI engineering as systems engineering. That means defining the problem clearly, choosing the right model architecture, building evaluation frameworks before deployment, and designing the human-AI interaction carefully. We do not add AI because it is fashionable — we add it when it genuinely solves the problem better than alternatives.',
      tags: ['LLM Integration', 'RAG Architecture', 'MLOps', 'Fine-tuning', 'Python', 'PyTorch', 'LangChain', 'Vector Databases'],
      entry: 'build' as const, entryLabel: 'BUILD',
      diagramTitle: 'AI ENGINEERING PIPELINE',
      diagramSteps: ['Data & Knowledge', 'Model Selection', 'Fine-Tuning / RAG', 'Evaluation', 'Production Integration']
    },
    {
      id: 'data-engineering',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
      title: 'Data Engineering',
      lead: 'Data pipelines, platforms, and analytical systems that transform fragmented, unreliable data into structured, queryable intelligence your organisation can trust and act on.',
      problems: [
        'Data scattered across incompatible systems with no reliable single source of truth',
        'Analytical requirements that cannot be met by operational databases alone',
        'Real-time data processing needs where batch processing is insufficient',
        'Data quality and lineage challenges that undermine analytical confidence'
      ],
      approach: 'We design data architectures with the end analytical requirement in mind. From ingestion through transformation to serving, every component is designed for reliability, observability, and evolvability. We apply modern data platform patterns including lakehouse architecture, data mesh principles, and event-streaming where appropriate.',
      tags: ['dbt', 'Apache Spark', 'Kafka', 'Airflow', 'Snowflake', 'BigQuery', 'Data Vault', 'Medallion Architecture'],
      entry: 'build' as const, entryLabel: 'BUILD',
      diagramTitle: 'DATA PLATFORM LAYERS',
      diagramSteps: ['Sources', 'Ingestion', 'Storage (Bronze)', 'Transform (Silver)', 'Serve (Gold)', 'Analytics']
    },
    {
      id: 'cloud-engineering',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
      title: 'Cloud & Platform Engineering',
      lead: 'Cloud infrastructure and distributed platform engineering for organisations that need to run complex workloads reliably, observably, and at controlled cost.',
      problems: [
        'Services that must scale automatically without compromising latency or availability',
        'Complex microservice deployments requiring coordinated networking and security',
        'Infrastructure that needs to be version-controlled, testable, and auditable',
        'Cloud costs that are growing faster than the value being delivered'
      ],
      approach: 'We treat infrastructure as software. Every architectural decision is documented, every resource is defined as code, and every platform is designed with observability built in from the start. We design for failure, plan for change, and size infrastructure based on evidence rather than assumptions.',
      tags: ['Kubernetes', 'Terraform', 'AWS', 'GCP', 'Azure', 'Helm', 'GitOps', 'OpenTelemetry', 'Service Mesh'],
      entry: 'build' as const, entryLabel: 'BUILD',
      diagramTitle: 'PLATFORM ENGINEERING STACK',
      diagramSteps: ['Infrastructure as Code', 'Container Orchestration', 'Service Mesh', 'Observability', 'Security Baseline']
    },
    {
      id: 'modernization',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
      title: 'Enterprise Modernization',
      lead: 'Systematic transformation of legacy platforms and aging technology estates — reducing operational risk, increasing engineering velocity, and extending the productive life of critical systems.',
      problems: [
        'Critical systems built on end-of-life technology that is becoming unsafe or unscalable',
        'Monolithic architectures that slow development and make change dangerous',
        'Business-critical logic trapped in technology stacks that prevent adoption of modern capabilities',
        'High operational risk from systems that nobody fully understands'
      ],
      approach: 'We approach modernisation as an engineering problem, not a migration project. We begin by understanding the existing system thoroughly — its domain logic, its data model, its failure modes. We then design a target architecture and a migration path that keeps the business running, reduces risk incrementally, and builds engineering confidence at every step.',
      tags: ['Strangler Fig Pattern', 'Event Sourcing', 'CQRS', 'API Gateways', 'Database Migration', 'Parallel Running'],
      entry: 'modernize' as const, entryLabel: 'MODERNIZE',
      diagramTitle: 'MODERNIZATION APPROACH',
      diagramSteps: ['Understand Current System', 'Map Domain & Data', 'Define Target Architecture', 'Incremental Migration', 'Decommission Legacy']
    },
    {
      id: 'advanced-computing',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      title: 'Advanced Computing',
      lead: 'Optimisation, quantum computing, and specialised computation for problems where conventional algorithms are provably insufficient or where emerging computation models offer meaningful advantage.',
      problems: [
        'Scheduling, routing, and allocation problems at a scale where exact methods are computationally intractable',
        'Simulation workloads that exceed the capacity of standard compute',
        'Research problems that may benefit from quantum algorithms as hardware matures',
        'Mathematical optimisation embedded in operational software systems'
      ],
      approach: 'We apply rigorous mathematical thinking before selecting algorithms. We characterise the problem, understand its complexity class, identify applicable methods, and design solutions that are both theoretically sound and practically implementable. For quantum computing specifically, we are honest about current hardware limitations and focus on genuinely promising application areas.',
      tags: ['Linear Programming', 'Mixed-Integer Programming', 'QAOA', 'Quantum Simulation', 'Metaheuristics', 'GPU Computing'],
      entry: 'explore' as const, entryLabel: 'EXPLORE',
      diagramTitle: 'ADVANCED COMPUTING SPECTRUM',
      diagramSteps: ['Problem Characterisation', 'Complexity Analysis', 'Algorithm Selection', 'Implementation', 'Benchmarking']
    }
  ];
}
