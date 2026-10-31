import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';
import { getProductById, getProductsByPortfolio } from '../../content/products/product.registry';
import { Product } from '../../content/products/product.model';

@Component({
    selector: 'app-quantum-mission',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, QmPageHeroComponent, QmRevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <qm-page-hero
      eyebrow="QUANTUM MISSION"
      title="Quantum Mission"
      lead="Ten independent proposed applications exploring how quantum software is designed, simulated, optimised, verified and integrated with classical systems."
      tone="quantum"
      [artLabels]="['Proposed', 'Simulation', 'Verification', 'Hybrid']">
      <p heroLead class="qm-page-hero__lead">
        Quantum Mission brings together ten independent quantum software engineering applications,
        now available through their official QuantsMind GitHub v1.0.0 releases. MicroQuantum is a
        separate published technology and is not one of the ten.
      </p>
      <div heroActions class="hero-actions">
        <qm-button variant="primary" size="md" [routerLinkValue]="'/contact'">
          Discuss a Quantum Requirement →
        </qm-button>
        <qm-button variant="outline" size="md" [routerLinkValue]="'/services'" [fragment]="'quantum-computing'">
          Explore Quantum Services
        </qm-button>
      </div>
      <div heroMeta class="mission-meta" aria-label="Quantum Mission status">
        <qm-badge variant="product">10 applications · v1.0.0 GA</qm-badge>
        <qm-badge variant="product">General Availability</qm-badge>
        <qm-badge variant="default">GitHub releases</qm-badge>
      </div>
    </qm-page-hero>

    <qm-section surface="white" size="sm" ariaLabel="Quantum Mission principles">
      <qm-container>
        <div class="mission-principles">
          @for (principle of principles; track principle.title; let i = $index) {
            <article class="principle" qmReveal [qmRevealDelay]="i * 70">
              <span class="principle__index" aria-hidden="true">0{{ i + 1 }}</span>
              <h2 class="principle__title">{{ principle.title }}</h2>
              <p class="principle__body">{{ principle.body }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" ariaLabel="The ten Quantum Mission applications">
      <qm-container>
        <header class="applications-head" qmReveal>
          <span class="eyebrow">THE PORTFOLIO</span>
          <h2 class="applications-head__title">Ten independent applications.</h2>
          <p class="applications-head__body">
            Each application is a separate proposed initiative. They share a domain and a
            standard of evidence, not a single product roadmap, release or availability
            commitment. Capabilities below describe intended scope, not shipped features.
          </p>
        </header>

        <ol class="application-grid" aria-label="Quantum Mission applications">
          @for (app of applications; track app.id; let i = $index) {
            <li class="application-card" qmReveal [qmRevealDelay]="(i % 3) * 60">
              <article class="application-card__inner">
                <header class="application-card__head">
                  <span class="application-card__index" aria-hidden="true">{{ formatIndex(i + 1) }}</span>
                  <div class="application-card__badges">
                    <qm-badge variant="product">Released</qm-badge>
                    <qm-badge variant="product">General Availability</qm-badge>
                  </div>
                </header>

                <h3 class="application-card__name">{{ app.name }}</h3>
                <p class="application-card__summary">{{ app.summary }}</p>

                @if (app.capabilities?.length) {
                  <h4 class="application-card__label">Intended scope</h4>
                  <ul class="application-card__list">
                    @for (capability of app.capabilities; track capability) {
                      <li>{{ capability }}</li>
                    }
                  </ul>
                }

                <p class="application-card__docs">
                  Released as v1.0.0 through the QuantsMind GitHub organization.
                  Per-application links are provided where verified.
                </p>

                <div class="application-card__cta">
                  <qm-button variant="outline" size="sm" [routerLinkValue]="'/contact'"
                    [ariaLabel]="'Express interest in ' + app.name">
                    Express Interest →
                  </qm-button>
                </div>
              </article>
            </li>
          }
        </ol>
      </qm-container>
    </qm-section>

    @if (microquantum) {
      <qm-section surface="white" ariaLabel="MicroQuantum is a separate technology">
        <qm-container>
          <article class="microquantum-callout" qmReveal>
            <div class="microquantum-callout__copy">
              <span class="eyebrow">SEPARATE TECHNOLOGY</span>
              <h2 class="microquantum-callout__title">MicroQuantum is not part of the ten.</h2>
              <p class="microquantum-callout__body">
                MicroQuantum is a published quantum computing SDK, not a Quantum Mission
                application. It is a developer preview with a public download, and it is
                counted separately from the proposed portfolio above.
              </p>
              <dl class="microquantum-callout__meta">
                <div>
                  <dt>Maturity</dt>
                  <dd>Developer Preview</dd>
                </div>
                <div>
                  <dt>Version</dt>
                  <dd>{{ microquantum.version }}</dd>
                </div>
                <div>
                  <dt>Availability</dt>
                  <dd>Public Download</dd>
                </div>
              </dl>
              <div class="microquantum-callout__actions">
                <qm-button variant="primary" size="md" [routerLinkValue]="'/microquantum'">
                  Explore MicroQuantum →
                </qm-button>
                <qm-button variant="outline" size="md" [routerLinkValue]="'/technology'">
                  View Technologies
                </qm-button>
              </div>
            </div>
            <div class="microquantum-callout__aside" aria-hidden="true">
              <span class="microquantum-callout__mark">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1.6"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4.2"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/>
                </svg>
              </span>
              <span class="microquantum-callout__label">v{{ microquantum.version?.replace('v', '') }}</span>
            </div>
          </article>
        </qm-container>
      </qm-section>
    }

    <qm-section surface="subtle" size="sm" ariaLabel="Quantum Mission evidence and status">
      <qm-container size="narrow">
        <div class="evidence-note" qmReveal>
          <span class="eyebrow">STATUS &amp; EVIDENCE</span>
          <h2 class="evidence-note__title">What this page does and does not claim.</h2>
          <ul class="evidence-note__list">
            <li>All ten applications are proposed initiatives at proposed maturity.</li>
            <li>None is generally available, in production or available for download.</li>
            <li>No benchmark results, deployments, certifications or customer adoption are claimed.</li>
            <li>No application documentation has been published; links are not invented.</li>
            <li>MicroQuantum is a separate developer-preview technology with a verified public release.</li>
          </ul>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas" size="sm">
      <qm-container size="narrow">
        <div class="qm-cta-band page-cta" qmReveal>
          <span class="eyebrow">GET INVOLVED</span>
          <h2>Discuss a quantum software requirement.</h2>
          <p>
            If one of these directions overlaps with work you are planning, tell us about
            the problem. We will discuss whether an engagement or a research collaboration
            makes sense.
          </p>
          <div class="qm-cta-band__actions">
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
              Discuss a Quantum Requirement →
            </qm-button>
            <qm-button variant="secondary" size="lg" [routerLinkValue]="'/products'" [fragment]="'quantum-software'">
              View Quantum Software Portfolio
            </qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
    .mission-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }

    .mission-principles {
      display: grid; grid-template-columns: 1fr; gap: 16px;
    }
    @media (min-width: 768px) { .mission-principles { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .principle {
      padding: 24px; background: var(--color-surface);
      border: 1px solid var(--card-border); border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xs);
    }
    .principle__index {
      display: block; margin-bottom: 10px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
      color: var(--color-accent);
    }
    .principle__title { margin: 0 0 8px; font-size: 17px; font-weight: 650; color: var(--color-text-primary); }
    .principle__body { margin: 0; font-size: 14px; line-height: 1.7; color: var(--color-text-secondary); }

    .applications-head { max-width: 820px; margin-bottom: 36px; }
    .applications-head__title {
      margin: 0 0 12px; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.12;
      letter-spacing: -0.03em; color: var(--color-text-primary);
    }
    .applications-head__body { margin: 0; font-size: 16.5px; line-height: 1.7; color: var(--color-text-secondary); }

    .application-grid {
      display: grid; grid-template-columns: 1fr; gap: 20px;
      margin: 0; padding: 0; list-style: none;
    }
    @media (min-width: 768px) { .application-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1200px) { .application-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

    .application-card { min-width: 0; }
    .application-card__inner {
      position: relative; display: flex; flex-direction: column; gap: 12px;
      height: 100%; padding: 26px; overflow: hidden;
      background:
        radial-gradient(420px 240px at 100% 0%, rgba(37, 99, 235, 0.06), transparent 62%),
        var(--card-bg);
      border: 1px solid var(--card-border); border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xs);
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms var(--qm-ease-out);
    }
    .application-card__inner::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: var(--gradient-signal); opacity: 0.8;
    }
    .application-card__inner:hover {
      border-color: rgba(37, 99, 235, 0.24);
      box-shadow: var(--shadow-lg);
      transform: translateY(-3px);
    }
    .application-card__head {
      display: flex; align-items: flex-start; justify-content: space-between;
      flex-wrap: wrap; gap: 10px;
    }
    .application-card__index {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
      color: var(--color-accent);
    }
    .application-card__badges { display: flex; flex-wrap: wrap; gap: 6px; }
    .application-card__name {
      margin: 0; font-size: 21px; font-weight: 650; line-height: 1.25;
      letter-spacing: -0.015em; color: var(--color-text-primary);
      overflow-wrap: anywhere;
    }
    .application-card__summary { margin: 0; font-size: 14px; line-height: 1.65; color: var(--color-text-secondary); }
    .application-card__label {
      margin: 4px 0 0; font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--color-accent);
    }
    .application-card__list {
      margin: 0; padding: 0; list-style: none;
      display: flex; flex-direction: column; gap: 6px;
    }
    .application-card__list li {
      display: flex; align-items: flex-start; gap: 8px;
      font-size: 13px; line-height: 1.55; color: var(--color-text-secondary);
    }
    .application-card__list li::before {
      content: ''; flex: 0 0 auto; width: 5px; height: 5px; margin-top: 7px;
      border-radius: 50%; background: var(--gradient-signal);
    }
    .application-card__docs {
      margin: auto 0 0; padding-top: 12px;
      border-top: 1px solid var(--card-border);
      font-size: 12.5px; line-height: 1.6; color: var(--color-text-muted);
    }
    .application-card__cta { display: flex; }

    .microquantum-callout {
      display: grid; grid-template-columns: 1fr; gap: 28px;
      padding: 32px; overflow: hidden;
      background:
        radial-gradient(520px 280px at 100% 0%, rgba(6, 182, 212, 0.10), transparent 62%),
        var(--gradient-ink);
      color: var(--color-ink-text);
      border: 1px solid var(--color-ink-border); border-radius: var(--radius-2xl);
    }
    @media (min-width: 900px) { .microquantum-callout { grid-template-columns: minmax(0, 1fr) auto; align-items: center; padding: 40px; } }
    .microquantum-callout .eyebrow { color: var(--color-cyan-soft); }
    .microquantum-callout__title {
      margin: 0 0 12px; font-size: clamp(24px, 3vw, 34px); line-height: 1.2;
      letter-spacing: -0.025em; color: var(--color-ink-text);
    }
    .microquantum-callout__body { margin: 0 0 20px; max-width: 720px; font-size: 15px; line-height: 1.7; color: var(--color-ink-muted); }
    .microquantum-callout__meta { display: flex; flex-wrap: wrap; gap: 24px; margin: 0 0 24px; }
    .microquantum-callout__meta dt {
      margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--color-cyan-soft);
    }
    .microquantum-callout__meta dd { margin: 0; font-size: 14px; font-weight: 600; color: var(--color-ink-text); }
    .microquantum-callout__actions { display: flex; flex-wrap: wrap; gap: 12px; }
    .microquantum-callout__aside {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 10px; min-width: 150px; padding: 24px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--color-ink-border); border-radius: var(--radius-xl);
      color: var(--color-cyan-soft);
    }
    .microquantum-callout__mark { display: flex; }
    .microquantum-callout__label {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: var(--color-ink-text);
    }

    .evidence-note {
      padding: 28px; background: var(--color-surface);
      border: 1px solid var(--card-border); border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xs);
    }
    .evidence-note__title {
      margin: 0 0 16px; font-size: clamp(22px, 2.6vw, 30px); line-height: 1.2;
      letter-spacing: -0.02em; color: var(--color-text-primary);
    }
    .evidence-note__list { margin: 0; padding-left: 20px; color: var(--color-text-secondary); }
    .evidence-note__list li { margin-bottom: 10px; line-height: 1.65; font-size: 14.5px; }
    .evidence-note__list li:last-child { margin-bottom: 0; }
    .evidence-note__list li::marker { color: var(--color-accent); }

    .page-cta { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px; }
    .page-cta .eyebrow { margin-bottom: 0; }
    .page-cta h2 { margin: 0; }
    .page-cta p { margin: 0; }

    @media (prefers-reduced-motion: reduce) {
      .application-card__inner { transition: none; }
      .application-card__inner:hover { transform: none; }
    }
  `]
})
export class QuantumMissionComponent {
  readonly applications: readonly Product[] = getProductsByPortfolio('quantum')
    .filter(product => product.id !== 'microquantum');
  readonly microquantum = getProductById('microquantum');

  readonly principles = [
    {
      title: 'Independent initiatives',
      body: 'Each application is scoped separately. A direction in one does not commit the others to the same roadmap or release.'
    },
    {
      title: 'Released v1.0.0',
      body: 'Every application is released as v1.0.0 through the QuantsMind GitHub organization. Capabilities describe the implemented scope; Windows qualification is reported complete for all ten.'
    },
    {
      title: 'Evidence before claims',
      body: 'No adoption, deployment, benchmark or commercial availability is implied without public evidence.'
    }
  ];

  formatIndex(index: number): string {
    return index.toString().padStart(2, '0');
  }
}
