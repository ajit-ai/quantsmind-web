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
        <div class="labs-hero__grid">
          <div class="labs-hero__inner">
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
          </div>

          <!-- Decorative: abstract research-network visual, same family as Home -->
          <div class="labs-hero__visual" aria-hidden="true">
            <svg class="qm-visual" viewBox="0 0 460 460" role="presentation" focusable="false">
              <!-- Colours are set via style="" because var() does not resolve
                   inside SVG presentation attributes. -->
              <defs>
                <radialGradient id="qmLabsGlow" cx="50%" cy="50%" r="52%">
                  <stop offset="0%" stop-opacity="0.8" style="stop-color: var(--color-labs-glow)"/>
                  <stop offset="100%" stop-opacity="0" style="stop-color: var(--color-labs-glow)"/>
                </radialGradient>
              </defs>

              <circle cx="230" cy="230" r="190" fill="url(#qmLabsGlow)"/>

              <g class="qm-visual__drift" fill="none" stroke-width="1" stroke-opacity="0.6"
                 style="stroke: var(--color-labs-bright)">
                <circle cx="230" cy="230" r="176"/>
                <circle cx="230" cy="230" r="124" stroke-opacity="0.4"/>
              </g>

              <g fill="none" stroke-width="1.25" stroke-opacity="0.75"
                 style="stroke: var(--color-labs-soft)">
                <path d="M230 92 L344 158 L368 286 L252 356 L128 300 L108 168 Z"/>
                <path d="M230 92 L252 356"/>
                <path d="M128 300 L344 158"/>
                <path d="M108 168 L368 286"/>
              </g>

              <g fill="none" stroke-width="1" stroke-opacity="0.7" stroke-dasharray="3 5"
                 style="stroke: var(--color-labs-muted)">
                <path d="M344 158 L252 356"/>
                <path d="M368 286 L128 300"/>
              </g>

              <circle class="qm-visual__pulse" cx="230" cy="230" r="46"
                      fill="none" stroke-width="1.5" stroke-opacity="0.5"
                      style="stroke: var(--color-labs)"/>
              <circle cx="230" cy="230" r="11" fill-opacity="0.9"
                      style="fill: var(--color-labs)"/>
              <circle cx="230" cy="230" r="4.5" style="fill: var(--color-surface)"/>

              <g stroke-width="1.5" style="fill: var(--color-surface); stroke: var(--color-labs)">
                <circle cx="230" cy="92" r="5.5"/>
                <circle cx="344" cy="158" r="5.5"/>
                <circle cx="368" cy="286" r="5.5"/>
                <circle cx="252" cy="356" r="5.5"/>
                <circle cx="128" cy="300" r="5.5"/>
                <circle cx="108" cy="168" r="5.5"/>
              </g>
            </svg>
          </div>
        </div>
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
    .labs-section-lead { max-width: 680px; margin: 0 0 40px; font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); }
    .labs-lead { max-width: 680px; margin: 0 0 24px; font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); }
    .labs-note { font-size: 14px; line-height: 1.6; color: var(--color-text-muted); margin: 20px 0 0; }
    .labs-note--center { text-align: center; max-width: 720px; margin-left: auto; margin-right: auto; }
    .labs-index { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, Consolas, monospace; font-size: 13px; color: var(--color-labs); margin-bottom: 12px; }

    .labs-grid { display: grid; gap: 24px; grid-template-columns: 1fr; margin-bottom: 24px; }
    @media (min-width: 640px) { .labs-grid { grid-template-columns: repeat(2, 1fr); } }

    .labs-card {
      background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      padding: 28px; transition: box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease;
    }
    .labs-card:hover { box-shadow: var(--card-shadow-hi); transform: translateY(-2px); border-color: var(--card-border-hi); }
    .labs-card-title { margin: 0 0 8px; font-size: 20px; }
    .labs-card-text { font-size: 15px; line-height: 1.7; color: var(--color-text-secondary); margin: 0; }
    .labs-card__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
    .labs-card__head .labs-card-title { margin: 0; }

    .labs-card__icon {
      width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
      background: var(--color-labs-subtle); border: 1px solid var(--color-labs-muted); border-radius: 10px; color: var(--color-labs); margin-bottom: 16px;
    }

    /* ══════════ HERO ══════════ */
    .labs-hero {
      background:
        radial-gradient(1000px 460px at 82% -10%, var(--color-labs-subtle) 0%, rgba(240,253,250,0) 62%),
        var(--color-surface-subtle);
      padding: 80px 0 56px; border-bottom: 1px solid var(--color-border);
      position: relative;
      overflow: hidden;
    }
    @media (min-width: 768px) { .labs-hero { padding: 112px 0 72px; } }
    .labs-hero::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background-image: radial-gradient(var(--color-border-strong) 1px, transparent 1px);
      background-size: 22px 22px; opacity: 0.35;
    }
    .labs-hero qm-container { position: relative; }

    .labs-hero__grid {
      display: grid; grid-template-columns: 1fr; gap: 44px; align-items: center;
    }
    @media (min-width: 1024px) {
      .labs-hero__grid {
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
        gap: 56px;
      }
    }
    .labs-hero__inner { min-width: 0; }
    .labs-hero__badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
    .labs-hero__title { margin: 0 0 12px; font-size: clamp(40px, 5vw, 64px); line-height: 1.05; letter-spacing: -0.03em; font-weight: 700; }
    .labs-hero__tagline { margin: 0 0 20px; font-size: 22px; font-weight: 600; color: var(--color-text-primary); }
    .labs-hero__lead { max-width: 680px; margin: 0 0 0; font-size: 17px; line-height: 1.8; color: var(--color-text-secondary); }
    .labs-hero__cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
    .labs-hero__meta { list-style: none; display: flex; flex-wrap: wrap; gap: 10px 20px; padding: 24px 0 0; margin: 32px 0 0; border-top: 1px solid var(--color-border); }
    .labs-hero__meta li { margin: 0; }
    .labs-chip { display: inline-flex; align-items: center; font-size: 13px; color: var(--color-text-secondary); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 9999px; padding: 6px 14px; }

    /* Labs hero visual — decorative, stacked then side-by-side */
    .labs-hero__visual { display: none; }
    @media (min-width: 768px) {
      .labs-hero__visual { display: block; max-width: 400px; margin: 0 auto; }
    }
    @media (min-width: 1024px) {
      .labs-hero__visual { max-width: none; margin: 0; }
    }
    .labs-hero__visual .qm-visual { max-width: 460px; margin: 0 auto; }

    /* ══════════ PHILOSOPHY ══════════ */
    .labs-grid--philosophy { grid-template-columns: 1fr; }
    @media (min-width: 640px) { .labs-grid--philosophy { grid-template-columns: repeat(3, 1fr); } }
    @media (min-width: 1024px) { .labs-grid--philosophy { grid-template-columns: repeat(5, 1fr); } }

    .labs-ph-flow { display: grid; gap: 12px; grid-template-columns: 1fr; align-items: center; justify-items: center; margin: 40px 0 16px; }
    .labs-ph-stage {
      font-size: 14px; font-weight: 500; color: var(--color-labs-dark); background: var(--color-labs-subtle);
      border: 1px solid var(--color-labs-muted); border-radius: 8px; padding: 10px 18px; white-space: nowrap;
    }
    /* Horizontal stage row. The five nowrap chips plus arrows need ~741px, so
       between 768px and 820px the chip padding and track gap are tightened to
       keep every stage on one fully visible row. At >=820px the container is
       wide enough for the full values and the desktop layout is unchanged. */
    @media (min-width: 768px) {
      .labs-ph-flow { grid-auto-flow: column; grid-template-columns: none; grid-auto-columns: max-content; }
    }
    @media (min-width: 768px) and (max-width: 819px) {
      .labs-ph-flow { gap: 8px; }
      .labs-ph-stage { padding-left: 12px; padding-right: 12px; }
    }
    .labs-ph-arrow { color: var(--color-dark-text-muted); font-size: 18px; line-height: 1; }
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
    .labs-eyebrow-dark { display: inline-block; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-labs-bright); margin-bottom: 16px; }
    .labs-h2--dark { color: var(--color-surface-subtle); }
    .labs-lead--dark { color: var(--color-dark-text-muted); }
    .labs-pipeline { display: flex; flex-direction: column; align-items: center; gap: 0; max-width: 480px; margin: 0 auto 40px; }
    .labs-pipe-chip { font-size: 14px; font-weight: 500; color: var(--color-border); background: var(--color-dark-surface); border: 1px solid var(--color-dark-border); border-radius: 8px; padding: 10px 24px; white-space: nowrap; }
    .labs-pipe-chip:first-child { background: var(--color-labs); border-color: var(--color-labs); color: var(--color-surface); font-weight: 600; }
    .labs-pipe-arrow { color: var(--color-text-secondary); font-size: 20px; padding: 6px 0; line-height: 1; }
    .labs-dark-note { color: var(--color-text-muted); font-size: 13px; line-height: 1.6; margin: 0; max-width: 720px; }

    /* ══════════ CONNECTIONS ══════════ */
    .labs-grid--connections { grid-template-columns: 1fr; }
    @media (min-width: 768px) { .labs-grid--connections { grid-template-columns: repeat(3, 1fr); } }
    .labs-card--connection { display: flex; flex-direction: column; }
    .labs-card__cta { margin-top: auto; padding-top: 20px; }

    /* ══════════ AREAS ══════════ */
    .labs-areas { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin: 0 0 12px; }
    .labs-area {
      display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px;
      background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: 9999px; font-size: 14px; color: var(--color-text-primary);
    }
    .labs-area-name { font-weight: 500; }
    .labs-area-tag { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-labs-dark); }

    /* ══════════ LABS → TECHNOLOGY → BUSINESS ══════════ */
    .labs-eco { display: flex; flex-direction: column; align-items: center; max-width: 640px; margin: 0 auto 16px; }
    .labs-eco-node {
      font-size: 15px; font-weight: 600; color: var(--color-text-primary); background: var(--color-surface);
      border: 1px solid var(--color-border-strong); border-radius: 10px; padding: 12px 28px; white-space: nowrap;
    }
    .labs-eco-node--accent { background: var(--color-labs); border-color: var(--color-labs); color: var(--color-surface); }
    .labs-eco-node--muted { color: var(--color-text-muted); border-color: var(--color-border); }
    .labs-eco-node--sm { font-size: 13px; padding: 10px 20px; }
    .labs-eco-vline { width: 2px; height: 20px; background: var(--color-border-strong); }
    .labs-eco-label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-dark-text-muted); padding-bottom: 14px; margin-top: -4px; }
    .labs-eco-fork { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 100%; max-width: 520px; border-top: 2px solid var(--color-border-strong); margin: 0 0 0; }
    .labs-eco-col { display: flex; flex-direction: column; align-items: center; gap: 12px; padding-top: 0; }
    .labs-eco-line { width: 2px; height: 18px; background: var(--color-border-strong); }

    /* ══════════ DISCLAIMER ══════════ */
    .labs-disclaimer {
      text-align: center; background: var(--color-labs-subtle); border: 1px solid var(--color-labs-muted);
      border-radius: 12px; padding: 32px 24px;
    }
    .labs-disclaimer .eyebrow { color: var(--color-labs-dark); }
    .labs-disclaimer-text { margin: 0; font-size: 17px; line-height: 1.7; color: var(--color-labs-dark); max-width: 560px; }

    /* ══════════ FINAL CTA ══════════ */
    .labs-cta { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .labs-cta h2 { margin: 0; }
    .labs-cta .labs-lead { max-width: 600px; }
    .labs-h2--dark { color: var(--color-surface-subtle); font-size: clamp(28px, 3.2vw, 40px); }
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
    { label: 'Active Development', variant: 'development' },
    { label: 'Released / Stable', variant: 'stable' }
  ];

  directions: DirectionCard[] = [
    {
      name: 'Quantum Computing',
      variant: 'development',
      status: 'Active Development',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>',
      description: 'Quantum program construction, execution and analysis tooling, explored and built as the open MicroQuantum SDK. MicroQuantum 1.1.0 is a stable public SDK release; quantum-computing research and future capabilities continue beyond the current release.'
    },
    {
      name: 'Programming Languages',
      variant: 'development',
      status: 'Active Development',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      description: 'Language, compiler, runtime and tooling exploration through Karkain. Karkain 1.1.0 is a stable released language and compiler, while language evolution and additional capabilities continue through subsequent development.'
    },
    {
      name: 'AI & Machine Learning',
      variant: 'concept',
      status: 'Concept',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11h-6a4 4 0 0 1-4-4V3"/><path d="M6 21a8 8 0 0 1 0-16"/><circle cx="18" cy="5" r="2"/><circle cx="18" cy="11" r="2"/><circle cx="18" cy="17" r="2"/><circle cx="6" cy="17" r="1.5"/></svg>',
      description: 'Exploring future intelligent-system and machine-learning engineering directions. The QuantsMind SDK 1.1.0 already implements AI abstractions including an agent loop, so this direction extends shipped capability rather than starting from nothing.'
    },
    {
      name: 'Developer Tools',
      variant: 'development',
      status: 'Active Development',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
      description: 'Ongoing work on the tooling that surrounds Karkain — Language Server intelligence, editor integration and developer experience. Karkain Language Tools v0.9.0 is the published baseline presented on the Technology side; the work tracked here is the capability added beyond it, including the semantic features the language server does not yet provide.'
    },
    {
      name: 'Data & Intelligence',
      variant: 'concept',
      status: 'Concept',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>',
      description: 'Knowledge representation, data intelligence and intelligent data systems. QuantsMind SDK 1.1.0 implements finance mathematics and knowledge-graph functionality; wider data capability continues to develop.'
    },
    {
      name: 'Systems & Infrastructure',
      variant: 'concept',
      status: 'Concept',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 6.5h.01M6 17.5h.01"/></svg>',
      description: 'Runtime, compiler, provider and simulation directions for future computing architectures. Karkain 1.1.0 already ships a self-hosted compiler and toolchain; the wider infrastructure research continues beyond that.'
    },
    {
      name: 'Scientific Computing',
      variant: 'concept',
      status: 'Concept',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v6L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8V2"/><path d="M8.5 2h7M7 14h10"/></svg>',
      description: 'Numerical methods, mathematical foundations, simulation and scientific domains. QuantsMind SDK 1.1.0 is already a stable scientific-computing SDK with implemented functionality across these domains, and this direction continues to grow from there.'
    }
  ];

  connections: ConnectionCard[] = [
    {
      name: 'MicroQuantum',
      variant: 'stable',
      status: 'Stable · v1.1.0',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>',
      description: 'A concrete QuantsMind technology: an open Python SDK for building, executing and analyzing quantum programs. Released as a stable public version on PyPI — the shipped result of quantum-computing exploration.',
      cta: 'Explore MicroQuantum',
      route: '/microquantum'
    },
    {
      name: 'Karkain',
      variant: 'stable',
      status: 'Stable · v1.1.0',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      description: 'A concrete QuantsMind technology: a statically typed systems programming language and computing ecosystem with a self-hosted compiler. Released as a stable version; further language and compiler development continues.',
      cta: 'Explore Karkain',
      route: '/karkain'
    },
    {
      name: 'QuantsMind SDK',
      variant: 'stable',
      status: 'Stable · v1.1.0',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>',
      description: 'An open, universal, vendor-independent scientific computing SDK with implemented functionality across mathematics, the sciences, finance, AI agents and knowledge graphs. Released as a stable version; further capability continues to be added.',
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