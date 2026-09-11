import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

interface PhilosophyCard { index: string; title: string; text: string; }
interface DirectionCard { name: string; variant: BadgeVariant; status: string; icon: string; description: string; }
interface StatusLegend { label: string; variant: BadgeVariant; }
interface ConnectionCard { name: string; variant: BadgeVariant; status: string; icon: string; description: string; cta: string; route: string; }
interface ExploreArea { name: string; tag: string; }

@Component({
    selector: 'app-labs',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ══════════ HERO ══════════ -->
    <section class="labs-hero">
      <qm-container>
        <div class="labs-hero__badges">
          <qm-badge variant="experimental">Experimental</qm-badge>
          <qm-badge variant="concept">Exploration</qm-badge>
        </div>
        <h1 class="labs-hero__title">QuantsMind Labs</h1>
        <p class="labs-hero__tagline">Exploring ideas before they become technologies.</p>
        <p class="labs-hero__lead">
          QuantsMind Labs is the exploration space for experiments, prototypes,
          technical investigations and emerging ideas across the QuantsMind
          technology ecosystem. Labs explores new ideas, prototypes technologies
          and validates technical directions before they are committed to a product
          or commercial offering.
        </p>
        <div class="labs-hero__cta">
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/technology'" [ariaLabel]="'Explore the QuantsMind technology ecosystem'">
            Explore the Ecosystem →
          </qm-button>
          <qm-button variant="outline" size="lg" [routerLinkValue]="'/contact'" [ariaLabel]="'Get in touch with QuantsMind'">
            Get in Touch
          </qm-button>
        </div>
        <ul class="labs-hero__meta" aria-label="What you will find in Labs">
          <li class="labs-chip">Experiments</li>
          <li class="labs-chip">Prototypes</li>
          <li class="labs-chip">Technical investigations</li>
          <li class="labs-chip">Future directions</li>
        </ul>
      </qm-container>
    </section>

    <!-- ══════════ PHILOSOPHY ══════════ -->
    <qm-section surface="white" ariaLabel="QuantsMind Labs philosophy">
      <qm-container>
        <span class="eyebrow">PHILOSOPHY</span>
        <h2 class="labs-h2">Experimentation before commitment</h2>
        <p class="labs-section-lead">
          Labs gives QuantsMind a place to explore technical possibilities before
          they harden into products. It is a working philosophy — a way of directing
          curiosity, not a promise about any single project.
        </p>

        <div class="labs-grid labs-grid--philosophy">
          @for (p of philosophy; track p.index) {
            <article class="labs-card">
              <span class="labs-index">{{ p.index }}</span>
              <h3 class="labs-card-title">{{ p.title }}</h3>
              <p class="labs-card-text">{{ p.text }}</p>
            </article>
          }
        </div>

        <div class="labs-ph-flow" aria-label="How an idea can move through Labs stages">
          @for (s of philosophyStages; track s; let last = $last) {
            <span class="labs-ph-stage">{{ s }}</span>
            @if (!last) {
              <span class="labs-ph-arrow labs-ph-arrow--down" aria-hidden="true">↓</span>
              <span class="labs-ph-arrow labs-ph-arrow--right" aria-hidden="true">→</span>
            }
          }
        </div>
        <p class="labs-note">
          An idea can move through these stages — or stop at any point. Not every
          experiment reaches the final stages.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ EXPLORATION DIRECTIONS ══════════ -->
    <qm-section surface="canvas" ariaLabel="Technology exploration directions">
      <qm-container>
        <span class="eyebrow">EXPLORE</span>
        <h2 class="labs-h2">Technology exploration directions</h2>
        <p class="labs-section-lead">
          Labs explores across computing. Some directions are already producing
          concrete open technologies; others are still forming. Every card carries
          its current status so the maturity is always clear.
        </p>

        <div class="labs-legend" aria-label="Labs status vocabulary">
          @for (l of legend; track l.label) {
            <span class="labs-legend-item">
              <qm-badge [variant]="l.variant">{{ l.label }}</qm-badge>
            </span>
          }
          <span class="labs-legend-item">
            <qm-badge variant="default">Archived</qm-badge>
          </span>
        </div>

        <div class="labs-grid labs-grid--directions">
          @for (d of directions; track d.name) {
            <article class="labs-card labs-card--direction">
              <div class="labs-card__icon" aria-hidden="true" [innerHTML]="d.icon | qmSafeHtml"></div>
              <div class="labs-card__head">
                <h3 class="labs-card-title">{{ d.name }}</h3>
                <qm-badge [variant]="d.variant">{{ d.status }}</qm-badge>
              </div>
              <p class="labs-card-text">{{ d.description }}</p>
            </article>
          }
        </div>
        <p class="labs-note labs-note--center">
          These are exploration directions, not completed projects. A direction may
          evolve, be incorporated into another technology, or be discontinued.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ EXPLORATION PIPELINE ══════════ -->
    <qm-section surface="dark" size="lg" ariaLabel="The exploration pipeline">
      <qm-container>
        <div class="labs-dark-head">
          <span class="labs-eyebrow-dark">HOW IDEAS MATURE</span>
          <h2 class="labs-h2 labs-h2--dark">The exploration pipeline</h2>
          <p class="labs-lead labs-lead--dark">
            Labs provides a place to explore technical possibilities before committing
            them to a product or commercial offering.
          </p>
        </div>

        <div class="labs-pipeline" aria-label="Exploration pipeline stages">
          @for (s of pipelineStages; track s; let last = $last) {
            <span class="labs-pipe-chip">{{ s }}</span>
            @if (!last) {
              <span class="labs-pipe-arrow" aria-hidden="true">↓</span>
            }
          }
        </div>

        <p class="labs-dark-note">
          The pipeline is directional. Ideas enter at the idea stage and move forward
          as they gain confidence — or are stopped while still early.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ ECOSYSTEM CONNECTIONS ══════════ -->
    <qm-section surface="subtle" ariaLabel="Exploration that matured into technology">
      <qm-container>
        <span class="eyebrow">TECHNOLOGIES</span>
        <h2 class="labs-h2">From exploration into technology</h2>
        <p class="labs-section-lead">
          Some exploration has already matured into concrete, public technologies.
          These represent where QuantsMind exploration has produced tangible results.
        </p>

        <div class="labs-grid labs-grid--connections">
          @for (c of connections; track c.name) {
            <article class="labs-card labs-card--connection">
              <div class="labs-card__icon" aria-hidden="true" [innerHTML]="c.icon | qmSafeHtml"></div>
              <div class="labs-card__head">
                <h3 class="labs-card-title">{{ c.name }}</h3>
                <qm-badge [variant]="c.variant">{{ c.status }}</qm-badge>
              </div>
              <p class="labs-card-text">{{ c.description }}</p>
              <div class="labs-card__cta">
                <qm-button variant="secondary" size="sm" [routerLinkValue]="c.route" [ariaLabel]="'Explore ' + c.name">
                  {{ c.cta }} →
                </qm-button>
              </div>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ EXPLORATION AREAS ══════════ -->
    <qm-section surface="white" ariaLabel="Wider exploration areas">
      <qm-container size="narrow">
        <span class="eyebrow">HORIZON</span>
        <h2 class="labs-h2">Wider exploration areas</h2>
        <p class="labs-section-lead">
          Beyond today's projects, Labs keeps an eye on broader directions. These are
          areas of interest — not commitments and not completed products.
        </p>
        <div class="labs-areas">
          @for (a of areas; track a.name) {
            <span class="labs-area">
              <span class="labs-area-name">{{ a.name }}</span>
              <span class="labs-area-tag">{{ a.tag }}</span>
            </span>
          }
        </div>
        <p class="labs-note labs-note--center">
          QuantsMind does not have products in every category listed above. These are
          the areas the Labs exploration surface keeps open.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ LABS → TECHNOLOGY → BUSINESS ══════════ -->
    <qm-section surface="canvas" ariaLabel="How exploration feeds the ecosystem">
      <qm-container>
        <span class="eyebrow">ECOSYSTEM</span>
        <h2 class="labs-h2">Labs → Technology → Business</h2>
        <p class="labs-section-lead">
          Exploration can feed the wider QuantsMind ecosystem. The diagram below is
          conceptual — it shows a direction, not a claim that every project follows
          this path.
        </p>

        <div class="labs-eco" aria-label="Conceptual flow from Labs to engineering services">
          <div class="labs-eco-node labs-eco-node--accent">QuantsMind Labs</div>
          <div class="labs-eco-vline" aria-hidden="true"></div>
          <div class="labs-eco-label">Exploration</div>
          <div class="labs-eco-vline" aria-hidden="true"></div>
          <div class="labs-eco-node">Technologies</div>

          <div class="labs-eco-fork">
            <span class="labs-eco-col">
              <span class="labs-eco-line" aria-hidden="true"></span>
              <span class="labs-eco-node labs-eco-node--sm">SDK</span>
            </span>
            <span class="labs-eco-col">
              <span class="labs-eco-line" aria-hidden="true"></span>
              <span class="labs-eco-node labs-eco-node--sm">MicroQuantum</span>
            </span>
            <span class="labs-eco-col">
              <span class="labs-eco-line" aria-hidden="true"></span>
              <span class="labs-eco-node labs-eco-node--sm">Karkain</span>
            </span>
          </div>

          <div class="labs-eco-vline" aria-hidden="true"></div>
          <div class="labs-eco-node labs-eco-node--muted">Future Products</div>
          <div class="labs-eco-vline" aria-hidden="true"></div>
          <div class="labs-eco-node labs-eco-node--muted">Engineering Services</div>
        </div>

        <p class="labs-note labs-note--center">
          Not every Labs project becomes a product. This flow shows how experimentation
          can feed the wider QuantsMind ecosystem over time.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ DISCLAIMER ══════════ -->
    <qm-section surface="white" size="sm" ariaLabel="Experimental work disclaimer">
      <qm-container size="narrow">
        <div class="labs-disclaimer">
          <span class="eyebrow">TRANSPARENCY</span>
          <p class="labs-disclaimer-text">
            Labs work is exploratory. Projects may change direction, remain experimental,
            be incorporated into other technologies, or be discontinued.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ FINAL CTA ══════════ -->
    <qm-section surface="dark" size="sm" ariaLabel="Explore the QuantsMind ecosystem">
      <qm-container size="narrow">
        <div class="labs-cta">
          <span class="labs-eyebrow-dark">EXPLORE</span>
          <h2 class="labs-h2--dark">Explore the QuantsMind ecosystem</h2>
          <p class="labs-lead labs-lead--dark">
            From SDKs and languages to the ideas still forming, the QuantsMind
            ecosystem is open, experimental and underway.
          </p>
          <div class="labs-cta__buttons">
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/technology'" [ariaLabel]="'Explore the QuantsMind technology ecosystem'">
              Technology →
            </qm-button>
            <qm-button variant="outline" size="lg" [href]="'https://github.com/quantsmind'" [target]="'_blank'" [ariaLabel]="'View QuantsMind on GitHub (opens in a new tab)'">
              GitHub
            </qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    /* ══════════ SHARED ══════════ */
    .labs-h2 { margin: 0 0 12px; max-width: 760px; }
    .labs-section-lead { max-width: 680px; margin: 0 0 40px; font-size: 18px; line-height: 1.7; color: #475569; }
    .labs-lead { max-width: 680px; margin: 0 0 24px; font-size: 18px; line-height: 1.7; color: #475569; }
    .labs-note { font-size: 14px; line-height: 1.6; color: #64748B; margin: 20px 0 0; }
    .labs-note--center { text-align: center; max-width: 720px; margin-left: auto; margin-right: auto; }
    .labs-index { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, Consolas, monospace; font-size: 13px; color: #0D9488; margin-bottom: 12px; }

    .labs-grid { display: grid; gap: 24px; grid-template-columns: 1fr; margin-bottom: 24px; }
    @media (min-width: 640px) { .labs-grid { grid-template-columns: repeat(2, 1fr); } }

    .labs-card {
      background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
      padding: 28px; transition: box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease;
    }
    .labs-card:hover { box-shadow: 0 10px 15px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.04); transform: translateY(-2px); border-color: #CBD5E1; }
    .labs-card-title { margin: 0 0 8px; font-size: 20px; }
    .labs-card-text { font-size: 15px; line-height: 1.7; color: #475569; margin: 0; }
    .labs-card__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
    .labs-card__head .labs-card-title { margin: 0; }

    .labs-card__icon {
      width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
      background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 10px; color: #0D9488; margin-bottom: 16px;
    }

    /* ══════════ HERO ══════════ */
    .labs-hero {
      background: #F1F5F9; padding: 80px 0 56px; border-bottom: 1px solid #E2E8F0;
      position: relative;
    }
    @media (min-width: 768px) { .labs-hero { padding: 112px 0 72px; } }
    .labs-hero::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background-image: radial-gradient(#CBD5E1 1px, transparent 1px);
      background-size: 22px 22px; opacity: 0.35;
    }
    .labs-hero qm-container { position: relative; }
    .labs-hero__badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
    .labs-hero__title { margin: 0 0 12px; font-size: clamp(40px, 5vw, 64px); line-height: 1.05; letter-spacing: -0.03em; font-weight: 700; }
    .labs-hero__tagline { margin: 0 0 20px; font-size: 22px; font-weight: 600; color: #111827; }
    .labs-hero__lead { max-width: 680px; margin: 0 0 0; font-size: 17px; line-height: 1.8; color: #475569; }
    .labs-hero__cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
    .labs-hero__meta { list-style: none; display: flex; flex-wrap: wrap; gap: 10px 20px; padding: 24px 0 0; margin: 32px 0 0; border-top: 1px solid #E2E8F0; }
    .labs-hero__meta li { margin: 0; }
    .labs-chip { display: inline-flex; align-items: center; font-size: 13px; color: #475569; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 9999px; padding: 6px 14px; }

    /* ══════════ PHILOSOPHY ══════════ */
    .labs-grid--philosophy { grid-template-columns: 1fr; }
    @media (min-width: 640px) { .labs-grid--philosophy { grid-template-columns: repeat(3, 1fr); } }
    @media (min-width: 1024px) { .labs-grid--philosophy { grid-template-columns: repeat(5, 1fr); } }

    .labs-ph-flow { display: grid; gap: 12px; grid-template-columns: 1fr; align-items: center; justify-items: center; margin: 40px 0 16px; }
    @media (min-width: 768px) {
      .labs-ph-flow { grid-auto-flow: column; grid-template-columns: none; grid-auto-columns: max-content; gap: 12px; }
    }
    .labs-ph-stage {
      font-size: 14px; font-weight: 500; color: #0F766E; background: #F0FDFA;
      border: 1px solid #99F6E4; border-radius: 8px; padding: 10px 18px; white-space: nowrap;
    }
    .labs-ph-arrow { color: #94A3B8; font-size: 18px; line-height: 1; }
    .labs-ph-arrow--down { display: inline; }
    .labs-ph-arrow--right { display: none; }
    @media (min-width: 768px) {
      .labs-ph-arrow--down { display: none; }
      .labs-ph-arrow--right { display: inline; }
    }

    /* ══════════ DIRECTIONS ══════════ */
    .labs-legend { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 32px; align-items: center; }
    .labs-legend-item { display: inline-flex; align-items: center; }
    .labs-grid--directions { grid-template-columns: 1fr; }
    @media (min-width: 640px) { .labs-grid--directions { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .labs-grid--directions { grid-template-columns: repeat(3, 1fr); } }

    /* ══════════ DARK / PIPELINE ══════════ */
    .labs-dark-head { max-width: 760px; margin: 0 0 40px; }
    .labs-eyebrow-dark { display: inline-block; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #5EEAD4; margin-bottom: 16px; }
    .labs-h2--dark { color: #F1F5F9; }
    .labs-lead--dark { color: #94A3B8; }
    .labs-pipeline { display: flex; flex-direction: column; align-items: center; gap: 0; max-width: 480px; margin: 0 auto 40px; }
    .labs-pipe-chip { font-size: 14px; font-weight: 500; color: #E2E8F0; background: #1E293B; border: 1px solid #334155; border-radius: 8px; padding: 10px 24px; white-space: nowrap; }
    .labs-pipe-chip:first-child { background: #0D9488; border-color: #0D9488; color: #FFFFFF; font-weight: 600; }
    .labs-pipe-arrow { color: #475569; font-size: 20px; padding: 6px 0; line-height: 1; }
    .labs-dark-note { color: #64748B; font-size: 13px; line-height: 1.6; margin: 0; max-width: 720px; }

    /* ══════════ CONNECTIONS ══════════ */
    .labs-grid--connections { grid-template-columns: 1fr; }
    @media (min-width: 768px) { .labs-grid--connections { grid-template-columns: repeat(3, 1fr); } }
    .labs-card--connection { display: flex; flex-direction: column; }
    .labs-card__cta { margin-top: auto; padding-top: 20px; }

    /* ══════════ AREAS ══════════ */
    .labs-areas { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin: 0 0 12px; }
    .labs-area {
      display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px;
      background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 9999px; font-size: 14px; color: #111827;
    }
    .labs-area-name { font-weight: 500; }
    .labs-area-tag { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #0D9488; }

    /* ══════════ LABS → TECHNOLOGY → BUSINESS ══════════ */
    .labs-eco { display: flex; flex-direction: column; align-items: center; max-width: 640px; margin: 0 auto 16px; }
    .labs-eco-node {
      font-size: 15px; font-weight: 600; color: #111827; background: #FFFFFF;
      border: 1px solid #CBD5E1; border-radius: 10px; padding: 12px 28px; white-space: nowrap;
    }
    .labs-eco-node--accent { background: #0D9488; border-color: #0D9488; color: #FFFFFF; }
    .labs-eco-node--muted { color: #64748B; border-color: #E2E8F0; }
    .labs-eco-node--sm { font-size: 13px; padding: 10px 20px; }
    .labs-eco-vline { width: 2px; height: 20px; background: #CBD5E1; }
    .labs-eco-label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #94A3B8; padding-bottom: 14px; margin-top: -4px; }
    .labs-eco-fork { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 100%; max-width: 520px; border-top: 2px solid #CBD5E1; margin: 0 0 0; }
    .labs-eco-col { display: flex; flex-direction: column; align-items: center; gap: 12px; padding-top: 0; }
    .labs-eco-line { width: 2px; height: 18px; background: #CBD5E1; }

    /* ══════════ DISCLAIMER ══════════ */
    .labs-disclaimer {
      text-align: center; background: #F0FDFA; border: 1px solid #99F6E4;
      border-radius: 12px; padding: 32px 24px;
    }
    .labs-disclaimer .eyebrow { color: #0F766E; }
    .labs-disclaimer-text { margin: 0; font-size: 17px; line-height: 1.7; color: #0F766E; max-width: 560px; }

    /* ══════════ FINAL CTA ══════════ */
    .labs-cta { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .labs-cta h2 { margin: 0; }
    .labs-cta .labs-lead { max-width: 600px; }
    .labs-h2--dark { color: #F1F5F9; font-size: clamp(28px, 3.2vw, 40px); }
    .labs-cta__buttons { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 8px; }

    @media (prefers-reduced-motion: reduce) {
      .labs-card { transition: none; transform: none; }
    }
  `]
})
export class LabsComponent {
  philosophy: PhilosophyCard[] = [
    { index: '01', title: 'Explore', text: 'Follow interesting ideas and technical questions before deciding whether they are worth pursuing.' },
    { index: '02', title: 'Experiment', text: 'Build small, honest prototypes to test whether an idea works in practice — not just on paper.' },
    { index: '03', title: 'Validate', text: 'Check assumptions against reality, keeping scope clear and claims measured.' },
    { index: '04', title: 'Learn', text: 'Capture what works and what does not — even abandoned directions teach the next one.' },
    { index: '05', title: 'Evolve', text: 'Let mature experiments find a home: a technology, a product, or the wider engineering work of QuantsMind.' }
  ];

  philosophyStages: string[] = ['Concept', 'Experiment', 'Prototype', 'Technology', 'Product / Service'];

  legend: StatusLegend[] = [
    { label: 'Concept', variant: 'concept' },
    { label: 'Experiment', variant: 'experimental' },
    { label: 'Prototype', variant: 'prototype' },
    { label: 'Active Development', variant: 'development' }
  ];

  directions: DirectionCard[] = [
    {
      name: 'Quantum Computing',
      variant: 'development',
      status: 'Active Development',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>',
      description: 'Quantum program construction, execution and analysis tooling, explored and built as the open MicroQuantum SDK — the most mature direction in Labs.'
    },
    {
      name: 'Programming Languages',
      variant: 'development',
      status: 'Active Development',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      description: 'Language, compiler, runtime and tooling exploration through Karkain, QuantsMind\'s actively developed programming language and computing ecosystem.'
    },
    {
      name: 'AI & Machine Learning',
      variant: 'concept',
      status: 'Concept',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11h-6a4 4 0 0 1-4-4V3"/><path d="M6 21a8 8 0 0 1 0-16"/><circle cx="18" cy="5" r="2"/><circle cx="18" cy="11" r="2"/><circle cx="18" cy="17" r="2"/><circle cx="6" cy="17" r="1.5"/></svg>',
      description: 'Exploring future intelligent-system and machine-learning engineering directions, including a general-purpose modelling foundation for intelligent systems.'
    },
    {
      name: 'Developer Tools',
      variant: 'prototype',
      status: 'Prototype',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
      description: 'SDKs, foundations and tooling that improve how software is built. The QuantsMind SDK establishes the first reusable foundation layer.'
    },
    {
      name: 'Data & Intelligence',
      variant: 'concept',
      status: 'Concept',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>',
      description: 'Knowledge representation, data intelligence and intelligent data systems — drafted as future directions inside the SDK package architecture.'
    },
    {
      name: 'Systems & Infrastructure',
      variant: 'concept',
      status: 'Concept',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 6.5h.01M6 17.5h.01"/></svg>',
      description: 'Runtime, compiler, provider and simulation directions for future computing architectures — a longer-horizon area of exploration.'
    },
    {
      name: 'Scientific Computing',
      variant: 'concept',
      status: 'Concept',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v6L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8V2"/><path d="M8.5 2h7M7 14h10"/></svg>',
      description: 'Numerical methods, mathematical foundations, simulation and scientific domains — drafted as future directions inside the SDK package architecture.'
    }
  ];

  connections: ConnectionCard[] = [
    {
      name: 'MicroQuantum',
      variant: 'development',
      status: 'Quantum SDK',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>',
      description: 'A concrete QuantsMind technology: an open Python SDK for building, executing and analyzing quantum programs — the public result of quantum-computing exploration.',
      cta: 'Explore MicroQuantum',
      route: '/microquantum'
    },
    {
      name: 'Karkain',
      variant: 'development',
      status: 'Language',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      description: 'A concrete QuantsMind technology: an actively developed, general-purpose programming language and computing ecosystem exploring modern compiler architecture.',
      cta: 'Explore Karkain',
      route: '/karkain'
    },
    {
      name: 'QuantsMind SDK',
      variant: 'prototype',
      status: 'Foundation',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>',
      description: 'An open, general-purpose Python foundation that establishes the architecture for future QuantsMind technologies. Early-stage: architecture and contracts, not production-ready.',
      cta: 'Explore the SDK',
      route: '/quantsmind-sdk'
    }
  ];

  areas: ExploreArea[] = [
    { name: 'Intelligent Systems', tag: 'Exploring' },
    { name: 'AI / Machine Learning', tag: 'Emerging' },
    { name: 'Quantum Computing', tag: 'Exploring' },
    { name: 'Programming Languages', tag: 'Developing' },
    { name: 'Developer Infrastructure', tag: 'Exploring' },
    { name: 'Data Intelligence', tag: 'Emerging' },
    { name: 'Scientific Computing', tag: 'Emerging' },
    { name: 'Future Computing Architectures', tag: 'Future Direction' }
  ];

  pipelineStages: string[] = [
    'IDEA', 'EXPLORE', 'EXPERIMENT', 'PROTOTYPE', 'VALIDATE', 'TECHNOLOGY', 'PRODUCT / SERVICE'
  ];
}