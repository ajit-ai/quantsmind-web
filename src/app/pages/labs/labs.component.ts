import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

export type MaturityVariant = 'concept' | 'research' | 'experimental' | 'prototype' | 'development' | 'early-access' | 'product';

interface LabProject {
  title: string;
  domain: string;
  domainBadge: 'ai' | 'data' | 'optimization' | 'quantum' | 'software';
  maturity: MaturityVariant;
  problem: string;
  hypothesis: string;
  description: string;
  technologies: string[];
}

@Component({
    selector: 'app-labs',
    imports: [CommonModule, RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- Hero — dark surface -->
    <section class="labs-hero">
      <qm-container>
        <span class="labs-eyebrow">QUANTSMIND LABS</span>
        <h1 class="labs-hero__headline">
          Research, Experimentation,<br>and Intellectual Property.
        </h1>
        <p class="labs-hero__lead">
          QuantsMind Labs investigates problems at the frontier of applied technology.
          Work here is honest about maturity — we distinguish clearly between a concept
          under exploration and a system ready for production.
        </p>
        <div class="labs-hero__maturity">
          <span class="labs-hero__maturity-label">Maturity states:</span>
          <qm-badge variant="concept">Concept</qm-badge>
          <qm-badge variant="research">Research</qm-badge>
          <qm-badge variant="experimental">Experimental</qm-badge>
          <qm-badge variant="prototype">Prototype</qm-badge>
          <qm-badge variant="development">Development</qm-badge>
          <qm-badge variant="early-access">Early Access</qm-badge>
          <qm-badge variant="product">Product</qm-badge>
        </div>
      </qm-container>
    </section>
    
    <!-- Domain overview -->
    <qm-section surface="canvas">
      <qm-container>
        <span class="eyebrow">RESEARCH DOMAINS</span>
        <h2>Five Areas of Investigation.</h2>
        <div class="domain-overview-grid">
          @for (d of labsDomains; track d) {
            <div class="domain-overview-card">
              <div class="domain-overview-card__icon" aria-hidden="true" [innerHTML]="d.icon | qmSafeHtml"></div>
              <h3 class="domain-overview-card__title">{{ d.name }}</h3>
              <p class="domain-overview-card__desc">{{ d.description }}</p>
            </div>
          }
        </div>
      </qm-container>
    </qm-section>
    
    <!-- Projects -->
    <qm-section surface="white">
      <qm-container>
        <span class="eyebrow">CURRENT WORK</span>
        <h2>Active Research and Experiments.</h2>
        <div class="projects-grid">
          @for (project of projects; track project) {
            <article class="project-card">
              <div class="project-card__meta">
                <qm-badge [variant]="project.domainBadge">{{ project.domain }}</qm-badge>
                <qm-badge [variant]="project.maturity">{{ project.maturity | uppercase }}</qm-badge>
              </div>
              <h3 class="project-card__title">{{ project.title }}</h3>
              <div class="project-card__section">
                <div class="project-card__label">Problem</div>
                <p class="project-card__text">{{ project.problem }}</p>
              </div>
              <div class="project-card__section">
                <div class="project-card__label">Hypothesis</div>
                <p class="project-card__text">{{ project.hypothesis }}</p>
              </div>
              <p class="project-card__desc">{{ project.description }}</p>
              <div class="project-card__tech">
                @for (t of project.technologies; track t) {
                  <span class="project-tag">{{ t }}</span>
                }
              </div>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>
    
    <!-- Principles -->
    <qm-section surface="canvas" size="sm">
      <qm-container>
        <div class="labs-principles">
          <div class="labs-principles__text">
            <span class="eyebrow">LABS PRINCIPLES</span>
            <h2>How We Approach Research.</h2>
          </div>
          <div class="labs-principles__list">
            @for (p of labsPrinciples; track p) {
              <div class="labs-principle">
                <div class="labs-principle__title">{{ p.title }}</div>
                <p class="labs-principle__desc">{{ p.description }}</p>
              </div>
            }
          </div>
        </div>
      </qm-container>
    </qm-section>
    
    <!-- CTA -->
    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <span class="eyebrow">COLLABORATE</span>
          <h2>Interested in the Research?</h2>
          <p class="lead">
            If you are working on a problem that overlaps with our research domains,
            or if you want to explore an emerging technology challenge, get in touch.
          </p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Talk to QuantsMind Labs →
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
      font-size: clamp(32px, 4.5vw, 56px);
      font-weight: 700; line-height: 1.1;
      letter-spacing: -0.025em;
      color: #F1F5F9; margin: 0 0 24px;
      text-wrap: balance; max-width: 800px;
    }

    .labs-hero__lead {
      font-size: 18px; line-height: 1.7;
      color: #94A3B8; max-width: 640px;
      margin: 0 0 40px;
    }

    .labs-hero__maturity {
      display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
    }
    .labs-hero__maturity-label {
      font-size: 12px; font-weight: 500;
      color: #475569; letter-spacing: 0.04em;
      margin-right: 4px;
    }

    /* Domain overview */
    .domain-overview-grid {
      display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 40px;
    }
    @media (min-width: 640px)  { .domain-overview-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .domain-overview-grid { grid-template-columns: repeat(5, 1fr); } }

    .domain-overview-card {
      padding: 24px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 12px;
      display: flex; flex-direction: column; gap: 12px;
    }
    .domain-overview-card__icon {
      width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
      background: #EFF6FF; border-radius: 10px; color: #2563EB;
    }
    .domain-overview-card__title {
      font-size: 15px; font-weight: 600; color: #111827; margin: 0;
    }
    .domain-overview-card__desc {
      font-size: 13px; color: #475569; line-height: 1.6; margin: 0;
    }

    /* Projects */
    .projects-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 40px;
    }
    @media (min-width: 768px)  { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1280px) { .projects-grid { grid-template-columns: repeat(3, 1fr); } }

    .project-card {
      padding: 28px; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 12px;
      display: flex; flex-direction: column; gap: 16px;
    }
    .project-card__meta { display: flex; gap: 8px; flex-wrap: wrap; }
    .project-card__title {
      font-size: 17px; font-weight: 600; color: #111827; margin: 0;
      line-height: 1.35;
    }
    .project-card__section { display: flex; flex-direction: column; gap: 4px; }
    .project-card__label {
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase; color: #94A3B8;
    }
    .project-card__text {
      font-size: 13px; color: #475569; line-height: 1.6; margin: 0;
    }
    .project-card__desc {
      font-size: 13px; color: #475569; line-height: 1.6; margin: 0;
    }
    .project-card__tech { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; }
    .project-tag {
      font-size: 11px; color: #64748B; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 9999px; padding: 2px 8px;
    }

    /* Labs Principles */
    .labs-principles {
      display: grid; grid-template-columns: 1fr; gap: 40px;
    }
    @media (min-width: 1024px) {
      .labs-principles { grid-template-columns: 1fr 2fr; align-items: start; }
    }
    .labs-principles__text h2 { margin: 0; }
    .labs-principles__list {
      display: grid; grid-template-columns: 1fr; gap: 20px;
    }
    @media (min-width: 640px) { .labs-principles__list { grid-template-columns: repeat(2, 1fr); } }

    .labs-principle {
      padding: 20px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 10px;
    }
    .labs-principle__title {
      font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 6px;
    }
    .labs-principle__desc {
      font-size: 13px; color: #475569; line-height: 1.6; margin: 0;
    }

    /* CTA */
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
export class LabsComponent {
  labsDomains = [
    {
      name: 'AI Systems',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      description: 'Reasoning systems, agent architectures, evaluation methods, and AI reliability research.'
    },
    {
      name: 'Data & Knowledge',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
      description: 'Knowledge graph construction, semantic data models, and queryable knowledge representation.'
    },
    {
      name: 'Optimisation',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      description: 'Novel algorithms for combinatorial and continuous optimisation in real operational contexts.'
    },
    {
      name: 'Quantum Computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      description: 'Quantum algorithm research, hybrid quantum-classical methods, and near-term hardware applications.'
    },
    {
      name: 'Computing Systems',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      description: 'Specialised compute architectures, GPU programming, and high-performance scientific computing.'
    }
  ];

  projects: LabProject[] = [
    {
      title: 'Structured Reasoning with LLM Agents',
      domain: 'AI', domainBadge: 'ai', maturity: 'research',
      problem: 'Large language models produce inconsistent outputs when applied to multi-step reasoning tasks that require maintaining structured state across many inference steps.',
      hypothesis: 'Combining chain-of-thought prompting with explicit graph-structured working memory can improve consistency and correctness in complex reasoning tasks.',
      description: 'We are investigating architectures that allow LLMs to externalise reasoning state into a queryable structure, reducing hallucination and improving step-wise correctness in domains such as legal analysis and financial modelling.',
      technologies: ['LLM Agents', 'LangGraph', 'Neo4j', 'GPT-4', 'Claude', 'Python']
    },
    {
      title: 'Enterprise Knowledge Graph Construction',
      domain: 'Data', domainBadge: 'data', maturity: 'experimental',
      problem: 'Enterprise organisations have valuable knowledge distributed across documents, databases, and systems in formats that cannot be efficiently queried or traversed together.',
      hypothesis: 'A semi-automated knowledge graph construction pipeline using LLM-assisted entity and relation extraction can produce queryable knowledge representations at acceptable precision for enterprise use cases.',
      description: 'Building an extraction and construction pipeline that ingests heterogeneous enterprise documents, extracts entities and relationships using language models, resolves entity identity across sources, and produces a queryable knowledge graph.',
      technologies: ['spaCy', 'LLM Extraction', 'Neo4j', 'Weaviate', 'FastAPI', 'Python']
    },
    {
      title: 'QAOA for Combinatorial Scheduling',
      domain: 'Quantum', domainBadge: 'quantum', maturity: 'research',
      problem: 'Resource-constrained scheduling problems in manufacturing and logistics are NP-hard at operational scale, and classical exact solvers become impractical beyond moderate problem sizes.',
      hypothesis: 'QAOA with problem-specific circuit design and hybrid classical post-processing may provide meaningful solution quality improvements over classical heuristics for structured scheduling problem instances on near-term quantum hardware.',
      description: 'We are studying the applicability of Quantum Approximate Optimisation Algorithm to scheduling problems, benchmarking against classical metaheuristics, and characterising the problem classes where quantum approaches show promise.',
      technologies: ['Qiskit', 'PennyLane', 'Amazon Braket', 'QAOA', 'Python', 'OR-Tools']
    },
    {
      title: 'Adaptive Metaheuristic Framework',
      domain: 'Optimisation', domainBadge: 'optimization', maturity: 'prototype',
      problem: 'Different operational optimisation problems respond differently to metaheuristic strategies, and selecting and tuning algorithms for each new problem is expensive and requires specialist knowledge.',
      hypothesis: 'A framework that characterises problem instances using fitness landscape analysis and selects or adapts metaheuristic strategy automatically can reduce the expertise required to apply optimisation effectively.',
      description: 'Developing a framework that analyses optimisation problem structure, characterises the fitness landscape, and applies a selected or hybridised metaheuristic with automated parameter adaptation, targeting routing and scheduling problem domains.',
      technologies: ['Python', 'NumPy', 'SciPy', 'DEAP', 'Optuna', 'OR-Tools']
    },
    {
      title: 'ML Evaluation Infrastructure',
      domain: 'AI', domainBadge: 'ai', maturity: 'experimental',
      problem: 'Teams building AI-powered products lack systematic, reproducible evaluation infrastructure, leading to regressions going undetected and deployment decisions based on insufficient evidence.',
      hypothesis: 'A structured evaluation framework with domain-specific test suites, regression tracking, and automated statistical comparison can substantially improve deployment decision quality for production AI systems.',
      description: 'Building evaluation infrastructure that integrates into ML development workflows, maintains curated test suites per domain, tracks evaluation results across model versions, and surfaces statistically significant regressions before deployment.',
      technologies: ['Python', 'MLflow', 'RAGAS', 'DeepEval', 'PostgreSQL', 'Grafana']
    },
    {
      title: 'Semantic Data Contract Framework',
      domain: 'Data', domainBadge: 'data', maturity: 'concept',
      problem: 'Data pipelines break silently when upstream schema or semantic assumptions change, and data contracts as typically implemented are syntactic rather than semantic — they do not capture meaning.',
      hypothesis: 'Enriching data contracts with semantic annotations and machine-readable business rules, combined with automated validation at pipeline boundaries, can detect semantic drift before it propagates through analytical systems.',
      description: 'Investigating a framework for expressing, versioning, and validating semantic data contracts across pipeline boundaries, including schema constraints, value distributions, referential integrity, and business rule compliance.',
      technologies: ['dbt', 'Great Expectations', 'JSON Schema', 'Python', 'Kafka', 'Apache Atlas']
    }
  ];

  labsPrinciples = [
    { title: 'Honest Maturity',         description: 'Every project is labelled with its true maturity state. We do not present research as product readiness.' },
    { title: 'Problem-First',           description: 'Every investigation starts with a clearly defined problem and a testable hypothesis, not a technology we want to explore.' },
    { title: 'Reproducibility',         description: 'Experiments are designed to be reproducible. Results are measured against defined baselines with appropriate rigour.' },
    { title: 'Practical Orientation',   description: 'Labs work is evaluated against practical applicability — can this eventually produce real engineering value?' },
    { title: 'Honest Benchmarking',     description: 'We compare against classical baselines fairly. Quantum or AI approaches are not declared winners without evidence.' },
    { title: 'IP Development',          description: 'Successful research directions are developed into reusable frameworks, tooling, and intellectual property.' }
  ];
}
