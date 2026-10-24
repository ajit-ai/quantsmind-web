import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

interface Capability { icon: string; title: string; description: string; }
interface EngagementStep { number: string; title: string; description: string; }
interface TechLink { title: string; description: string; href: string; badge: string; badgeVariant: BadgeVariant; }

@Component({
    selector: 'app-quantum',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="q-page-hero" aria-label="Quantum Computing Engineering">
      <qm-container>
        <a routerLink="/services" class="q-back">&larr; Services</a>
        <div class="q-hero__grid">
          <div class="q-hero__content">
            <qm-badge variant="quantum" class="q-hero__badge">Engineering Capability</qm-badge>
            <h1 class="q-hero__title">Quantum Computing Engineering</h1>
            <p class="q-hero__lead">Explore quantum software, algorithms, simulation, and hybrid computing workflows with practical engineering support.</p>
            <p class="q-hero__note">QuantsMind provides quantum engineering services built on classical simulation. We do not claim access to quantum hardware, demonstrated quantum advantage, or production-ready quantum infrastructure.</p>
            <div class="q-hero__actions">
              <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">Discuss a Quantum Project</qm-button>
              <qm-button variant="secondary" size="lg" [routerLinkValue]="'/microquantum'">Explore MicroQuantum</qm-button>
            </div>
          </div>
          <div class="q-hero__visual">
            <svg class="q-bloch" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schematic Bloch sphere: a geometric model of a single qubit state">
              <title>Bloch sphere: a geometric representation of a single qubit state</title>
              <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-border)" stroke-width="1.5"/>
              <ellipse cx="100" cy="100" rx="80" ry="28" fill="none" stroke="var(--color-border)" stroke-width="1" opacity="0.5"/>
              <ellipse cx="100" cy="100" rx="28" ry="80" fill="none" stroke="var(--color-border)" stroke-width="1" opacity="0.5"/>
              <line x1="100" y1="20" x2="100" y2="180" stroke="var(--color-text-muted)" stroke-width="1" stroke-dasharray="4 3" opacity="0.4"/>
              <line x1="20" y1="100" x2="180" y2="100" stroke="var(--color-text-muted)" stroke-width="1" stroke-dasharray="4 3" opacity="0.4"/>
              <line x1="100" y1="100" x2="155" y2="55" stroke="var(--color-accent, #6366f1)" stroke-width="2.5" stroke-linecap="round" class="q-state-vector"/>
              <circle cx="155" cy="55" r="5" fill="var(--color-accent, #6366f1)" class="q-state-dot"/>
              <text x="100" y="14" text-anchor="middle" font-size="11" fill="var(--color-text-muted)" font-family="monospace">|0&gt;</text>
              <text x="100" y="196" text-anchor="middle" font-size="11" fill="var(--color-text-muted)" font-family="monospace">|1&gt;</text>
              <text x="188" y="104" text-anchor="start" font-size="11" fill="var(--color-text-muted)" font-family="monospace">x</text>
            </svg>
            <p class="q-visual-caption">Bloch sphere — a schematic geometric model of a single qubit state used in circuit design and simulation.</p>
          </div>
        </div>
      </qm-container>
    </section>

    <qm-section surface="subtle" size="md">
      <qm-container>
        <figure class="q-workflow" aria-labelledby="q-workflow-title" aria-describedby="q-workflow-caption">
          <h2 id="q-workflow-title" class="q-workflow__title">Example Hybrid Quantum–Classical Workflow</h2>
          <p class="q-workflow__lead">A representative variational loop, shown as a software pattern rather than a finished product.</p>
          <ol class="q-workflow__flow" aria-label="Hybrid quantum-classical variational workflow stages">
            <li class="q-workflow__node">
              <span class="q-workflow__node-label">Classical input</span>
              <span class="q-workflow__node-detail">Problem, data and initial parameters</span>
            </li>
            <li class="q-workflow__connector" aria-hidden="true">→</li>
            <li class="q-workflow__node q-workflow__node--quantum">
              <span class="q-workflow__node-label">Parameterized quantum circuit (simulated)</span>
              <span class="q-workflow__node-detail">Executed by classical simulation</span>
            </li>
            <li class="q-workflow__connector" aria-hidden="true">→</li>
            <li class="q-workflow__node">
              <span class="q-workflow__node-label">Measurement / expectation estimate</span>
              <span class="q-workflow__node-detail">Sampled or exact expectation values</span>
            </li>
            <li class="q-workflow__connector" aria-hidden="true">→</li>
            <li class="q-workflow__node">
              <span class="q-workflow__node-label">Classical optimizer</span>
              <span class="q-workflow__node-detail">Updates parameters from the estimate</span>
            </li>
            <li class="q-workflow__connector" aria-hidden="true">→</li>
            <li class="q-workflow__node">
              <span class="q-workflow__node-label">Updated parameters</span>
              <span class="q-workflow__node-detail">Fed back into the circuit</span>
            </li>
          </ol>
          <div class="q-workflow__feedback" aria-hidden="true">
            <svg class="q-workflow__feedback-arrow" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
              <defs>
                <marker id="qWorkflowArrowLeft" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto" markerUnits="strokeWidth">
                  <path d="M8 0 L0 4 L8 8 Z" style="fill: var(--color-accent)" />
                </marker>
              </defs>
              <line x1="112" y1="12" x2="8" y2="12" stroke-width="1.5" marker-end="url(#qWorkflowArrowLeft)" style="stroke: var(--color-accent)" />
            </svg>
            <span class="q-workflow__feedback-label">Feedback: updated parameters return to the parameterized circuit, repeating the loop</span>
          </div>
          <figcaption id="q-workflow-caption" class="q-workflow__caption">
            Illustrative example only. The diagram shows a representative hybrid variational software pattern: a classical loop drives a parameterized quantum circuit whose execution here is by classical simulation. It is not proof of an implemented end-to-end product, and it does not imply quantum advantage, speedup, validated algorithm performance, or production readiness. Whether this pattern applies, and how far MicroQuantum or the QuantsMind SDK currently support it, depends on the specific engagement.
          </figcaption>
        </figure>
      </qm-container>
    </qm-section>

    <qm-section surface="white" size="md">
      <qm-container>
        <div class="q-section-header"><h2>Engineering Capabilities</h2><p class="lead">Service offerings framed as engineering capabilities — not guaranteed commercial outcomes.</p></div>
        <div class="q-cap-grid">
          @for (cap of capabilities; track cap.title) {
            <article class="q-cap-card">
              <div class="q-cap-card__icon" aria-hidden="true" [innerHTML]="cap.icon | qmSafeHtml"></div>
              <h3 class="q-cap-card__title">{{ cap.title }}</h3>
              <p class="q-cap-card__desc">{{ cap.description }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" size="md">
      <qm-container>
        <div class="q-section-header"><h2>Engagement Approach</h2><p class="lead">A realistic, step-by-step process for assessing and prototyping quantum solutions.</p></div>
        <ol class="q-steps">
          @for (step of engagementSteps; track step.number) {
            <li class="q-step">
              <span class="q-step__number" aria-hidden="true">{{ step.number }}</span>
              <div class="q-step__content">
                <h3 class="q-step__title">{{ step.title }}</h3>
                <p class="q-step__desc">{{ step.description }}</p>
              </div>
            </li>
          }
        </ol>
      </qm-container>
    </qm-section>

    <qm-section surface="white" size="md">
      <qm-container>
        <div class="q-section-header"><h2>Technology Connections</h2><p class="lead">Quantum engineering services connect to QuantsMind's open-source quantum tooling and research.</p></div>
        <div class="q-tech-grid">
          @for (link of techLinks; track link.title) {
            <a [routerLink]="link.href" class="q-tech-card">
              <div class="q-tech-card__header"><h3 class="q-tech-card__title">{{ link.title }}</h3><qm-badge [variant]="link.badgeVariant" class="q-tech-card__badge">{{ link.badge }}</qm-badge></div>
              <p class="q-tech-card__desc">{{ link.description }}</p>
              <span class="q-tech-card__cta">Learn more &rarr;</span>
            </a>
          }
        </div>
        <div class="q-disclaimer"><p><strong>Important distinctions:</strong> MicroQuantum and the QuantsMind SDK are developer-preview tools executed by classical simulation. They are not quantum hardware. Labs projects are experimental research. No production-ready quantum infrastructure or validated customer deployments are claimed.</p></div>
      </qm-container>
    </qm-section>

    <qm-section surface="accent" size="md">
      <qm-container>
        <div class="q-cta">
          <h2>Discuss Your Quantum Engineering Needs</h2>
          <p>Whether you are exploring quantum feasibility, prototyping algorithms, or evaluating simulation-based approaches, we can help assess what is realistic today.</p>
          <div class="q-cta__actions">
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">Discuss a Quantum Project</qm-button>
            <qm-button variant="secondary" size="lg" [routerLinkValue]="'/services'">View All Services</qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
      .q-page-hero { padding: 64px 0 48px; border-bottom: 1px solid var(--color-border); }
      @media (min-width: 768px) { .q-page-hero { padding: 88px 0 64px; } }
      .q-back { display: inline-block; margin-bottom: 24px; font-size: 14px; color: var(--color-text-muted); text-decoration: none; }
      .q-back:hover { color: var(--color-text-primary); }
      .q-hero__grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
      @media (min-width: 1024px) { .q-hero__grid { grid-template-columns: 1fr 1fr; gap: 64px; } }
      .q-hero__badge { margin-bottom: 16px; }
      .q-hero__title { font-size: 36px; line-height: 1.1; margin: 0 0 16px; font-weight: 700; }
      @media (min-width: 768px) { .q-hero__title { font-size: 48px; } }
      .q-hero__lead { font-size: 18px; line-height: 1.6; color: var(--color-text-secondary); margin: 0 0 16px; max-width: 560px; }
      .q-hero__note { font-size: 14px; line-height: 1.6; color: var(--color-text-muted); margin: 0 0 24px; max-width: 560px; font-style: italic; }
      .q-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; }
      .q-hero__visual { display: flex; flex-direction: column; align-items: center; }
      .q-bloch { width: 100%; max-width: 280px; height: auto; }
      .q-state-vector { animation: q-pulse 3s ease-in-out infinite; }
      .q-state-dot { animation: q-pulse 3s ease-in-out infinite; }
      @keyframes q-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      @media (prefers-reduced-motion: reduce) { .q-state-vector, .q-state-dot { animation: none; } }
      .q-visual-caption { font-size: 12px; color: var(--color-text-muted); text-align: center; margin-top: 12px; max-width: 280px; }
      .q-section-header { margin-bottom: 40px; }
      .q-section-header h2 { margin: 0 0 8px; }
      .q-section-header .lead { margin: 0; color: var(--color-text-secondary); }
      .q-cap-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
      @media (min-width: 640px) { .q-cap-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (min-width: 1024px) { .q-cap-grid { grid-template-columns: repeat(3, 1fr); } }
      .q-cap-card { padding: 24px; border: 1px solid var(--color-border); border-radius: 12px; background: var(--color-surface, var(--color-bg)); transition: box-shadow 0.2s ease, transform 0.2s ease; }
      .q-cap-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
      @media (prefers-reduced-motion: reduce) { .q-cap-card { transition: none; } .q-cap-card:hover { transform: none; } }
      .q-cap-card__icon { margin-bottom: 12px; color: var(--color-accent, #6366f1); }
      .q-cap-card__icon svg { width: 24px; height: 24px; }
      .q-cap-card__title { font-size: 16px; font-weight: 600; margin: 0 0 8px; }
      .q-cap-card__desc { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; }
      .q-steps { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 24px; counter-reset: step; }
      .q-step { display: flex; gap: 20px; align-items: flex-start; }
      .q-step__number { flex-shrink: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: var(--color-accent, #6366f1); color: #fff; font-weight: 700; font-size: 16px; }
      .q-step__title { font-size: 16px; font-weight: 600; margin: 0 0 4px; }
      .q-step__desc { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; }
      .q-tech-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 32px; }
      @media (min-width: 640px) { .q-tech-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (min-width: 1024px) { .q-tech-grid { grid-template-columns: repeat(3, 1fr); } }
      .q-tech-card { display: flex; flex-direction: column; padding: 20px; border: 1px solid var(--color-border); border-radius: 12px; text-decoration: none; color: inherit; transition: box-shadow 0.2s ease, transform 0.2s ease; }
      .q-tech-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
      @media (prefers-reduced-motion: reduce) { .q-tech-card { transition: none; } .q-tech-card:hover { transform: none; } }
      .q-tech-card__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
      .q-tech-card__title { font-size: 16px; font-weight: 600; margin: 0; }
      .q-tech-card__badge { font-size: 11px; }
      .q-tech-card__desc { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin: 0 0 12px; flex: 1; }
      .q-tech-card__cta { font-size: 13px; color: var(--color-accent, #6366f1); font-weight: 500; }
      .q-disclaimer { padding: 16px 20px; border-left: 3px solid var(--color-border); background: var(--color-surface, var(--color-bg)); border-radius: 0 8px 8px 0; }
      .q-disclaimer p { margin: 0; font-size: 13px; line-height: 1.6; color: var(--color-text-secondary); }
      .q-cta { text-align: center; max-width: 640px; margin: 0 auto; }
      .q-cta h2 { margin: 0 0 12px; }
      .q-cta p { margin: 0 0 24px; color: var(--color-text-secondary); }
      .q-cta__actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }

      /* ── Hybrid workflow diagram ─────────────────────────────── */
      .q-workflow { margin: 0; }
      .q-workflow__title { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
      @media (min-width: 768px) { .q-workflow__title { font-size: 28px; } }
      .q-workflow__lead { font-size: 16px; line-height: 1.6; color: var(--color-text-secondary); margin: 0 0 24px; max-width: 720px; }
      .q-workflow__flow {
        list-style: none; padding: 0; margin: 0;
        display: flex; flex-direction: column; gap: 8px; align-items: stretch;
      }
      @media (min-width: 1024px) {
        .q-workflow__flow { flex-direction: row; align-items: stretch; gap: 6px; }
      }
      .q-workflow__node {
        flex: 1 1 0; min-width: 0;
        display: flex; flex-direction: column; gap: 4px;
        padding: 14px 16px;
        background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 10px;
      }
      .q-workflow__node--quantum {
        border-color: var(--color-accent-muted, var(--color-border));
        background: var(--color-accent-subtle, var(--color-surface));
      }
      .q-workflow__node-label { font-size: 14px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
      .q-workflow__node-detail { font-size: 12px; line-height: 1.5; color: var(--color-text-secondary); margin: 0; }
      .q-workflow__connector {
        display: flex; align-items: center; justify-content: center;
        color: var(--color-accent); font-size: 18px; line-height: 1; flex-shrink: 0;
      }
      @media (max-width: 1023px) { .q-workflow__connector { transform: rotate(90deg); } }
      @media (min-width: 1024px) { .q-workflow__connector { padding-top: 18px; } }
      .q-workflow__feedback {
        display: flex; align-items: center; gap: 10px; margin-top: 16px; flex-wrap: wrap;
      }
      .q-workflow__feedback-arrow { width: 120px; height: 24px; flex-shrink: 0; }
      @media (max-width: 1023px) { .q-workflow__feedback-arrow { transform: rotate(-90deg); width: 24px; height: 60px; } }
      .q-workflow__feedback-label { font-size: 12px; line-height: 1.5; color: var(--color-text-secondary); }
      .q-workflow__caption { font-size: 13px; line-height: 1.6; color: var(--color-text-secondary); margin: 16px 0 0; max-width: 880px; }
      @media (prefers-reduced-motion: reduce) {
        .q-workflow__node { transition: none; }
      }
    `]
})
export class QuantumComponent {
    capabilities: Capability[] = [
        { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`, title: 'Quantum Programming & Algorithm Prototyping', description: 'Design and implement quantum algorithms across variational, search, optimisation, and phase-estimation families using established circuit models.' },
        { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>`, title: 'Circuit Design & Simulation', description: 'Construct quantum circuits (states, gates, measurement) and simulate them using statevector and density-matrix backends on classical hardware.' },
        { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`, title: 'Hybrid Classical–Quantum Workflows', description: 'Build parameterised and hybrid optimisation workflows that combine quantum subroutines with classical pre- and post-processing.' },
        { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`, title: 'Quantum Software Architecture', description: 'Structure quantum software projects with modular, testable, and maintainable codebases using established patterns and interchange formats (OpenQASM, QIR).' },
        { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`, title: 'Feasibility Studies & Technical Assessments', description: 'Evaluate whether a problem is suitable for quantum approaches, identify limitations, and provide honest characterisation of what simulation can and cannot demonstrate.' },
        { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`, title: 'Testing, Benchmarking & Simulation-Based Evaluation', description: 'Reproducible experiment records, parameter sweeps, and analysis of sampled results with explicit separation of demonstrated behaviour from roadmap intent.' }
    ];
    engagementSteps: EngagementStep[] = [
        { number: '1', title: 'Understand the Technical Problem', description: 'Clarify the problem domain, constraints, data characteristics, and success criteria before considering quantum approaches.' },
        { number: '2', title: 'Assess Quantum Suitability & Limitations', description: 'Evaluate whether the problem is amenable to quantum methods, identify classical alternatives, and state limitations honestly.' },
        { number: '3', title: 'Build a Prototype or Simulation', description: 'Implement quantum circuits or algorithms using classical simulation backends, with reproducible experiment records.' },
        { number: '4', title: 'Evaluate Results Against Classical Alternatives', description: 'Compare quantum approach results against classical baselines, documenting where simulation provides insight and where it does not.' },
        { number: '5', title: 'Document Findings & Recommended Next Steps', description: 'Deliver technical assessments that separate demonstrated behaviour from roadmap intent, with clear recommendations.' }
    ];
    techLinks: TechLink[] = [
        { title: 'MicroQuantum', description: 'Open quantum computing SDK for Python. NumPy-only, published on PyPI. Developer preview — execution is by classical simulation.', href: '/microquantum', badge: 'Developer Preview', badgeVariant: 'experimental' },
        { title: 'QuantsMind SDK', description: 'Universal scientific computing SDK with quantum modules. Developer preview — module coverage varies by domain.', href: '/quantsmind-sdk', badge: 'Developer Preview', badgeVariant: 'experimental' },
        { title: 'QuantsMind Labs', description: 'Open research projects including quantum algorithms. Experimental — each project states its maturity and limitations.', href: '/labs', badge: 'Experimental', badgeVariant: 'research' }
    ];
}