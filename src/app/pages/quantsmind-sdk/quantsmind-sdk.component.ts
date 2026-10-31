import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';

interface PrincipleCard { index: string; title: string; text: string; }
interface ModelConcept { name: string; detail: string; }
interface PackageGroup { name: string; variant: BadgeVariant; status: string; modules: string; }
interface StatusRow { area: string; status: string; variant: BadgeVariant; note: string; }
interface RoadItem { phase: string; variant: BadgeVariant; stage: string; items: string[]; }

@Component({
    selector: 'app-quantsmind-sdk',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, QmPageHeroComponent, QmRevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ══════════ HERO ══════════ -->
    <qm-page-hero
      eyebrow="QUANTSMIND SDK"
      title="QuantsMind SDK"
      lead="A universal, vendor-independent scientific computing SDK."
      tone="sdk"
      art="none"
      [hasProjectedArt]="true">
      <div heroBadge class="sdk-badges">
        <a routerLink="/technology" class="sdk-back">&larr; Technology Ecosystem</a>
        <div class="sdk-badge-row">
          <qm-badge variant="stable">v1.1.0</qm-badge>
          <qm-badge variant="experimental">Developer Preview</qm-badge>
          <qm-badge variant="software">Python</qm-badge>
        </div>
      </div>
      <p heroLead class="sdk-hero__note">
        QuantsMind SDK is an open Python SDK for scientific computing. Version 1.1.0 is a
        published public release with implemented functionality across mathematics,
        chemistry, biology, astronomy, cosmology, finance, AI agents, knowledge graphs
        and a compiler front-end, organised around a first-principles model for
        representing systems, entities, interactions and knowledge.
      </p>
      <div heroActions class="sdk-cta sdk-cta--hero">
        <qm-button variant="primary" size="lg" [href]="'https://github.com/ajit-ai/quantsmind-quantum-sdk'" [target]="'_blank'" [ariaLabel]="'View QuantsMind SDK on GitHub (opens in a new tab)'">
          View on GitHub →
        </qm-button>
        <qm-button variant="outline" size="lg" [routerLinkValue]="'/contact'" [ariaLabel]="'Get in touch about the QuantsMind SDK'">
          Get in Touch
        </qm-button>
      </div>
      <ul heroMeta class="sdk-meta" aria-label="QuantsMind SDK at a glance">
        <li><span class="sdk-chip sdk-chip--violet">Python 3.13+</span></li>
        <li><span class="sdk-chip">v1.1.0 Published Release</span></li>
        <li><span class="sdk-chip">Package: quantsmind</span></li>
        <li><span class="sdk-chip">Entity → State → Interaction</span></li>
        <li><span class="sdk-chip">Observation → Knowledge</span></li>
      </ul>
      <div heroArt class="sdk-hero-art" aria-hidden="true">
        <svg class="sdk-hero-art__web" viewBox="0 0 400 400" focusable="false">
          <circle cx="200" cy="200" r="158" fill="none" stroke="rgba(124, 58, 237, 0.16)" stroke-width="1"/>
          <circle cx="200" cy="200" r="108" fill="none" stroke="rgba(167, 139, 250, 0.20)" stroke-width="1" stroke-dasharray="4 5"/>
          <g stroke="rgba(124, 58, 237, 0.22)" stroke-width="1">
            <line x1="200" y1="200" x2="200" y2="42"/>
            <line x1="200" y1="200" x2="366" y2="122"/>
            <line x1="200" y1="200" x2="330" y2="326"/>
            <line x1="200" y1="200" x2="200" y2="366"/>
            <line x1="200" y1="200" x2="66" y2="122"/>
          </g>
          <circle cx="200" cy="42" r="5" fill="#7C3AED"/>
          <circle cx="366" cy="122" r="5" fill="#A78BFA"/>
          <circle cx="330" cy="326" r="5" fill="#7C3AED"/>
          <circle cx="200" cy="366" r="5" fill="#A78BFA"/>
          <circle cx="66" cy="122" r="5" fill="#7C3AED"/>
        </svg>
        <div class="sdk-hero-art__core">
          <strong>SDK</strong>
          <span>v1.1.0</span>
        </div>
        <span class="sdk-hero-art__node sdk-hero-art__node--a">Entity</span>
        <span class="sdk-hero-art__node sdk-hero-art__node--b">State</span>
        <span class="sdk-hero-art__node sdk-hero-art__node--c">Interaction</span>
        <span class="sdk-hero-art__node sdk-hero-art__node--d">Observation</span>
        <span class="sdk-hero-art__node sdk-hero-art__node--e">Knowledge</span>
      </div>
    </qm-page-hero>

    <!-- ══════════ WHAT IS SDK ══════════ -->
    <qm-section surface="white" ariaLabel="What is QuantsMind SDK">
      <qm-container size="narrow">
        <span class="eyebrow">OVERVIEW</span>
        <h2 class="sdk-h2">What is QuantsMind SDK?</h2>
        <div class="sdk-body" qmReveal>
          <p>
            QuantsMind SDK is a universal, vendor-independent Python SDK for scientific
            computing. It is not tied to a single domain, hardware vendor or cloud: the
            same first-principles model is reused across mathematics, the physical and
            life sciences, finance and AI.
          </p>
          <p>
            The SDK is <strong>separate from MicroQuantum</strong>, which is a focused quantum
            computing SDK. It is also <strong>separate from Karkain</strong>, which is a systems
            programming language and toolchain. QuantsMind SDK provides a technology-neutral
            modelling layer that is designed to sit below higher-level applications.
          </p>
          <p>
            Version 1.1.0 is a published public release. It contains implemented functionality
            across mathematics, chemistry, biology, astronomy, cosmology, finance, AI
            agents, knowledge graphs and a compiler front-end, and ships runnable examples.
            Capabilities continue to evolve after this release.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ CORE MODEL ══════════ -->
    <qm-section surface="canvas" ariaLabel="The QuantsMind SDK core model">
      <qm-container>
        <span class="eyebrow">CORE MODEL</span>
        <h2 class="sdk-h2">A first-principles ontology</h2>
        <p class="sdk-section-lead">
          At the centre of QuantsMind SDK is a single conceptual model for how systems,
          entities, state, interactions and knowledge relate to each other.
        </p>
        <div class="sdk-model">
          <div class="sdk-model-track" aria-hidden="true">
            <i></i><i></i><i></i><i></i>
          </div>
          @for (c of concepts; track c.name; let i = $index) {
            <article class="sdk-concept" qmReveal [qmRevealDelay]="i * 55">
              <h3 class="sdk-concept-name">{{ c.name }}</h3>
              <p class="sdk-concept-detail">{{ c.detail }}</p>
            </article>
          }
        </div>
        <p class="sdk-note sdk-note--center">
          This model originates from the SDK's architecture documents and first-principles
          design. It provides the shared vocabulary that the implemented domain packages
          in v1.1.0 build on.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ ARCHITECTURE ══════════ -->
    <section class="sdk-dark-band" aria-label="SDK architecture">
      <qm-container>
        <div class="sdk-dark-head" qmReveal>
          <span class="sdk-eyebrow-dark">ARCHITECTURE</span>
          <h2 class="sdk-h2 sdk-h2--dark">v1.1.0: a layered scientific computing SDK</h2>
          <p class="sdk-lead sdk-lead--dark">
            QuantsMind SDK layers a common core beneath domain-specific capability. The
            v1.1.0 release implements the ontology, mathematics and a set of scientific
            domain packages on top of it, with further capability added in later releases.
          </p>
        </div>

        <div class="sdk-layer" aria-label="SDK architecture layers" qmReveal [qmRevealDelay]="80">
          <div class="sdk-layer-row">
            <span class="sdk-layer-chip sdk-layer-chip--muted">Applications / Future Products</span>
          </div>
          <div class="sdk-layer-arrow" aria-hidden="true">↓</div>
          <div class="sdk-layer-row">
            <span class="sdk-layer-chip sdk-layer-chip--primary">QuantsMind SDK</span>
          </div>
          <div class="sdk-layer-arrow" aria-hidden="true">↓</div>
          <div class="sdk-layer-row">
            <span class="sdk-layer-chip">Entity · State · Interaction</span>
            <span class="sdk-layer-chip">Observation · Knowledge</span>
          </div>
          <div class="sdk-layer-arrow" aria-hidden="true">↓</div>
          <div class="sdk-layer-row">
            <span class="sdk-layer-chip sdk-layer-chip--muted">Python ecosystem</span>
          </div>
        </div>

        <p class="sdk-dark-note" qmReveal>
          This is the architectural model. v1.1.0 implements the middle layers — the
          ontology, the mathematics foundation and the domain packages built on them —
          with further capability layered on in later releases.
        </p>
      </qm-container>
    </section>

    <!-- ══════════ DESIGN PRINCIPLES ══════════ -->
    <qm-section surface="white" ariaLabel="Design principles">
      <qm-container>
        <span class="eyebrow">DESIGN PRINCIPLES</span>
        <h2 class="sdk-h2">Guided by eight principles</h2>
        <p class="sdk-section-lead">
          Every package in the SDK is intended to specialise the same ontology rather
          than reinvent its own. These principles govern how the SDK is designed and extended.
        </p>
        <div class="sdk-grid">
          @for (p of principles; track p.index; let i = $index) {
            <article class="sdk-card" qmReveal [qmRevealDelay]="i * 45">
              <div class="sdk-index">{{ p.index }}</div>
              <h3 class="sdk-card-title">{{ p.title }}</h3>
              <p class="sdk-card-text">{{ p.text }}</p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ PACKAGE DIRECTION ══════════ -->
    <qm-section surface="canvas" ariaLabel="SDK package direction">
      <qm-container>
        <span class="eyebrow">IMPLEMENTED CAPABILITY</span>
        <h2 class="sdk-h2">Scientific domains in v1.1.0</h2>
        <p class="sdk-section-lead">
          v1.1.0 implements functionality across the following domains. Each is a real
          package with tests and runnable examples; the map below shows what is present in
          this release.
        </p>
        <div class="sdk-grid sdk-grid--pkgs">
          @for (g of groups; track g.name; let i = $index) {
            <article class="sdk-card" qmReveal [qmRevealDelay]="i * 45">
              <div class="sdk-card-head">
                <h3 class="sdk-card-title">{{ g.name }}</h3>
                <qm-badge [variant]="g.variant">{{ g.status }}</qm-badge>
              </div>
              <div class="sdk-modules k-mono">{{ g.modules }}</div>
            </article>
          }
        </div>
        <p class="sdk-note sdk-note--center">
          These are the domains implemented in v1.1.0. Each is backed by tests and
          runnable examples in the repository; the roadmap below covers what continues
          to be added after this release.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ ECOSYSTEM ══════════ -->
    <qm-section surface="subtle" ariaLabel="Relationship to QuantsMind technologies">
      <qm-container>
        <span class="eyebrow">QUANTSMIND ECOSYSTEM</span>
        <h2 class="sdk-h2">Part of a wider technology family</h2>
        <p class="sdk-section-lead">
          QuantsMind builds more than one technology. The SDK provides a general-purpose
          modelling foundation; other technologies focus on specific domains.
        </p>
        <div class="sdk-grid">
          <article class="sdk-card sdk-card--highlight" qmReveal>
            <div class="sdk-card-head">
              <h3 class="sdk-card-title">QuantsMind SDK</h3>
              <qm-badge variant="stable">Stable</qm-badge>
            </div>
            <p class="sdk-card-text">Universal, vendor-independent scientific computing SDK with implemented capability across mathematics, the sciences, finance, AI and knowledge graphs. A technology-neutral base layer.</p>
          </article>
          <article class="sdk-card" qmReveal [qmRevealDelay]="70">
            <div class="sdk-card-head">
              <h3 class="sdk-card-title">MicroQuantum</h3>
              <qm-badge variant="quantum">Quantum</qm-badge>
            </div>
            <p class="sdk-card-text">Focused quantum computing SDK for building, executing and analyzing quantum circuits in Python. Separate domain focus.</p>
          </article>
          <article class="sdk-card" qmReveal [qmRevealDelay]="140">
            <div class="sdk-card-head">
              <h3 class="sdk-card-title">Karkain</h3>
              <qm-badge variant="software">Language</qm-badge>
            </div>
            <p class="sdk-card-text">Systems programming language with ownership-based memory safety and a self-hosted compiler toolchain. Separate technology focus.</p>
          </article>
        </div>
        <p class="sdk-note sdk-note--center">
          These projects are part of the same ecosystem but are independently
          engineered with different technical focuses. The SDK provides a shared
          foundation layer rather than a unifying runtime dependency.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ DEVELOPMENT STATUS ══════════ -->
    <qm-section surface="white" ariaLabel="Development status">
      <qm-container size="narrow">
        <span class="eyebrow">RELEASE STATUS</span>
        <h2 class="sdk-h2">An honest status</h2>
        <p class="sdk-section-lead">
          v1.1.0 is a published public release. Here is what that release contains and what
          continues to be developed after it.
        </p>
        <div class="sdk-table-wrap" qmReveal>
          <table class="sdk-table">
            <caption class="sr-only">QuantsMind SDK current status</caption>
            <thead>
              <tr><th scope="col">Area</th><th scope="col">Status</th><th scope="col">Notes</th></tr>
            </thead>
            <tbody>
              @for (r of statusRows; track r.area) {
                <tr>
                  <td data-label="Area">{{ r.area }}</td>
                  <td data-label="Status"><qm-badge [variant]="r.variant">{{ r.status }}</qm-badge></td>
                  <td data-label="Notes">{{ r.note }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ DOCUMENTATION ══════════ -->
    <qm-section surface="subtle" ariaLabel="Documentation and architecture">
      <qm-container>
        <div class="sdk-two">
          <div qmReveal>
            <span class="eyebrow">DOCUMENTATION</span>
            <h2 class="sdk-h2">Architecture documentation is evolving</h2>
            <p>
              The SDK's architecture, design decisions and class specifications are
              captured in the repository itself — including architecture decision
              records (ADRs) and a detailed foundation specification covering
              classes, lifecycle, events, validation, serialization and UML.
            </p>
            <p>
              As the SDK matures, documentation will expand alongside implementation.
            </p>
          </div>
          <div class="sdk-card sdk-card--compact" qmReveal [qmRevealDelay]="90">
            <h4 class="sdk-card-title">What v1.1.0 documents include</h4>
            <ul class="sdk-doc-list">
              <li>Architecture overview and layering model</li>
              <li>Package dependency rules</li>
              <li>Foundation package specification</li>
              <li>Entity / System / State / Interaction class designs</li>
              <li>Architecture Decision Records (ADRs)</li>
              <li>Coding standards, naming standards, versioning policy</li>
            </ul>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ DEVELOPER EXPERIENCE ══════════ -->
    <qm-section surface="canvas" ariaLabel="Developer experience">
      <qm-container size="narrow">
        <span class="eyebrow">DEVELOPER EXPERIENCE</span>
        <h2 class="sdk-h2">Developer flow</h2>
        <p class="sdk-section-lead">
          v1.1.0 is a usable release rather than a structural sketch. The developer path
          below is the model the implemented packages are organised around.
        </p>
        <div class="sdk-flow" qmReveal>
          @for (s of devFlow; track s[0]) {
            <span class="sdk-flow-chip k-mono">{{ s[0] }}</span><span class="sdk-flow-arrow" aria-hidden="true">↓</span>
          }
          <span class="sdk-flow-chip sdk-flow-chip--accent k-mono">Knowledge</span>
        </div>
        <p class="sdk-note">
          The Python distribution is published as
          <span class="k-mono">quantsmind</span>. Version 1.1.0 is the current public
          release; see the repository for installation and usage details.
        </p>
      </qm-container>
    </qm-section>

    <!-- ══════════ ROADMAP ══════════ -->
    <qm-section surface="white" ariaLabel="SDK roadmap">
      <qm-container>
        <span class="eyebrow">ROADMAP</span>
        <h2 class="sdk-h2">Where it is heading</h2>
        <p class="sdk-section-lead">
          v1.1.0 is a published public release. The roadmap below records what shipped in
          that release and what continues to be developed after it.
        </p>
        <div class="sdk-grid sdk-grid--road">
          @for (r of roadmap; track r.phase; let i = $index) {
            <article class="sdk-road" qmReveal [qmRevealDelay]="i * 70">
              <qm-badge [variant]="r.variant">{{ r.phase }}</qm-badge>
              <h3 class="sdk-road-title">{{ r.stage }}</h3>
              <ul class="sdk-road-list">
                @for (item of r.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ QUANTSMIND ECOSYSTEM ══════════ -->
    <qm-section surface="canvas" size="sm" ariaLabel="Part of the QuantsMind technology ecosystem">
      <qm-container size="narrow">
        <div class="sdk-eco-band" qmReveal>
          <span class="eyebrow">TECHNOLOGY ECOSYSTEM</span>
          <h2>Part of QuantsMind</h2>
          <p class="lead">
            QuantsMind SDK is one of a family of technologies from QuantsMind. Each
            addresses a different focus.
          </p>
          <div class="sdk-cta sdk-cta--center">
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/technology'">Technology Ecosystem</qm-button>
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/microquantum'">MicroQuantum</qm-button>
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/karkain'">Karkain</qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ══════════ FINAL CTA ══════════ -->
    <qm-section surface="canvas" size="sm" ariaLabel="Explore the QuantsMind SDK">
      <qm-container size="narrow">
        <div class="qm-cta-band" qmReveal>
          <span class="eyebrow">EXPLORE</span>
          <h2>Explore the QuantsMind SDK</h2>
          <p>
            v1.1.0 is a published public release. The source, implemented domain packages,
            runnable examples and architecture documentation are in the repository. If
            the SDK is relevant to your work, we would be glad to hear from you.
          </p>
          <div class="qm-cta-band__actions">
            <qm-button variant="primary" size="lg" [href]="'https://github.com/ajit-ai/quantsmind-quantum-sdk'" [target]="'_blank'" [ariaLabel]="'View QuantsMind SDK on GitHub (opens in a new tab)'">
              View on GitHub →
            </qm-button>
            <qm-button variant="outline" size="lg" [routerLinkValue]="'/contact'" [ariaLabel]="'Get in touch about the QuantsMind SDK'">
              Get in Touch
            </qm-button>
          </div>
          <p class="sdk-docs-note">
            Architecture documentation — including ADRs, the layering model and the
            foundation specification — lives in the repository and continues to expand
            as the SDK develops beyond 1.1.0.
          </p>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    /* ══════════ SHARED ══════════ */
    .sdk-h2 { margin: 0 0 12px; max-width: 760px; }
    .sdk-section-lead { max-width: 680px; margin: 0 0 40px; font-size: 18px; line-height: 1.7; color: #475569; }
    .sdk-lead { max-width: 680px; margin: 0 0 24px; font-size: 18px; line-height: 1.7; color: #475569; }
    .sdk-note { font-size: 14px; line-height: 1.6; color: #64748B; margin: 20px 0 0; }
    .sdk-note--center { text-align: center; max-width: 720px; margin-left: auto; margin-right: auto; }
    .k-mono { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, 'SFMono-Regular', Consolas, monospace; font-size: 14px; }
    .sdk-index { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, Consolas, monospace; font-size: 13px; color: #7C3AED; margin-bottom: 12px; }
    .sdk-two { display: grid; gap: 40px; }
    @media (min-width: 1024px) { .sdk-two { grid-template-columns: 1.2fr 1fr; gap: 56px; align-items: start; } }
    .sdk-grid { display: grid; gap: 24px; grid-template-columns: 1fr; }
    @media (min-width: 640px) { .sdk-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .sdk-grid { grid-template-columns: repeat(3, 1fr); } }
    .sdk-card {
      position: relative; overflow: hidden;
      background:
        radial-gradient(360px 200px at 100% 0%, rgba(124, 58, 237, 0.06), transparent 62%),
        #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: var(--radius-lg);
      padding: 28px; box-shadow: var(--shadow-xs);
      transition: box-shadow 260ms var(--qm-ease-out), transform 260ms var(--qm-ease-out), border-color 260ms ease;
    }
    .sdk-card::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: linear-gradient(90deg, #7C3AED, #A78BFA 55%, #2563EB);
      opacity: 0.7;
    }
    .sdk-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); border-color: rgba(124, 58, 237, 0.24); }
    .sdk-card-title { margin: 0 0 8px; font-size: 20px; }
    .sdk-card-text { font-size: 15px; line-height: 1.7; color: #475569; margin: 0; }
    .sdk-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
    .sdk-card-head .sdk-card-title { margin: 0; }
    .sdk-card--highlight {
      border-color: #DDD6FE;
      background:
        radial-gradient(420px 220px at 100% 0%, rgba(124, 58, 237, 0.10), transparent 64%),
        #FAFAFF;
    }
    .sdk-card--compact { padding: 24px; }
    .sdk-modules { color: #7C3AED; font-size: 13px; margin-bottom: 4px; word-break: break-word; }

    /* ══════════ HERO ══════════ */
    .sdk-badges { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; margin-bottom: 22px; }
    .sdk-badge-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .sdk-back {
      display: inline-block;
      font-size: 13px; font-weight: 500; color: #64748B; text-decoration: none;
      transition: color 160ms ease, transform 160ms ease;
    }
    .sdk-back:hover { color: #7C3AED; transform: translateX(-2px); }
    .sdk-hero__note {
      margin: 22px 0 0; max-width: 680px;
      font-size: 16px; line-height: 1.75; color: #475569;
      text-wrap: pretty;
    }
    .sdk-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
    .sdk-cta--hero { margin-top: 0; }
    .sdk-cta--center { justify-content: center; }
    .sdk-meta { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin: 28px 0 0; }
    .sdk-meta li { margin: 0; }
    .sdk-chip { display: inline-flex; align-items: center; font-size: 12px; color: #475569; background: rgba(255, 255, 255, 0.72); border: 1px solid #E2E8F0; border-radius: 9999px; padding: 6px 13px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
    .sdk-chip--violet { color: #6D28D9; background: #F5F3FF; border-color: #DDD6FE; }

    /* ── HERO ARTWORK ── */
    .sdk-hero-art { position: relative; width: 100%; max-width: 440px; aspect-ratio: 1; margin: 0 auto; }
    .sdk-hero-art__web { position: absolute; inset: 0; width: 100%; height: 100%; }
    .sdk-hero-art__core {
      position: absolute; left: 50%; top: 50%; translate: -50% -50%;
      width: 34%; aspect-ratio: 1; border-radius: 50%;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
      background:
        radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.08) 42%),
        linear-gradient(145deg, #7C3AED, #4F46E5 55%, #2563EB);
      box-shadow:
        0 30px 70px -22px rgba(124, 58, 237, 0.7),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
      color: #fff;
      animation: qm-float 9s ease-in-out infinite;
    }
    .sdk-hero-art__core strong { font-family: 'Sora', 'Inter', system-ui, sans-serif; font-size: clamp(16px, 2vw, 22px); letter-spacing: 0.08em; }
    .sdk-hero-art__core span { font-size: 9px; letter-spacing: 0.14em; opacity: 0.82; }
    .sdk-hero-art__node {
      position: absolute; z-index: 2;
      display: inline-flex; align-items: center; gap: 7px;
      padding: 7px 11px; border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.9);
      box-shadow: var(--shadow-lg);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      font-size: 10px; font-weight: 600; color: #475569; white-space: nowrap;
      animation: qm-float 8s ease-in-out infinite;
    }
    .sdk-hero-art__node::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: #7C3AED;
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.10);
    }
    .sdk-hero-art__node--a { top: 0; left: 50%; translate: -50% 0; animation-delay: -1s; }
    .sdk-hero-art__node--b { top: 24%; right: 0; animation-delay: -3s; }
    .sdk-hero-art__node--c { bottom: 22%; right: 2%; animation-delay: -5s; }
    .sdk-hero-art__node--d { bottom: 0; left: 50%; translate: -50% 0; animation-delay: -2s; }
    .sdk-hero-art__node--e { top: 24%; left: 0; animation-delay: -4s; }

    /* ══════════ WHAT IS / BODY ══════════ */
    .sdk-body { max-width: 720px; }
    .sdk-body h2 { margin: 0 0 16px; }
    .sdk-body p { font-size: 16px; line-height: 1.8; color: #475569; margin: 0 0 16px; }
    .sdk-body p:last-child { margin: 0; }

    /* ══════════ CORE MODEL ══════════ */
    .sdk-model { display: grid; gap: 20px; grid-template-columns: 1fr; margin-bottom: 40px; }
    @media (min-width: 480px) { .sdk-model { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
    @media (min-width: 768px) { .sdk-model { grid-template-columns: repeat(3, 1fr); gap: 28px; } }
    @media (min-width: 1024px) { .sdk-model { grid-template-columns: repeat(5, 1fr); gap: 20px; } }
    .sdk-concept {
      position: relative; overflow: hidden;
      background:
        radial-gradient(260px 160px at 100% 0%, rgba(124, 58, 237, 0.07), transparent 64%),
        #FFFFFF;
      border: 1px solid #E2E8F0; border-left: 4px solid #7C3AED;
      border-radius: var(--radius-lg); padding: 24px 20px;
      box-shadow: var(--shadow-xs);
      transition: transform 260ms var(--qm-ease-out), box-shadow 260ms var(--qm-ease-out), border-color 260ms ease;
    }
    .sdk-concept:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: rgba(124, 58, 237, 0.24); border-left-color: #7C3AED; }
    .sdk-concept-name { margin: 0 0 8px; font-size: 17px; color: #111827; }
    .sdk-concept-detail { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; }
    .sdk-model-track { display: none; }

    /* ══════════ DARK / ARCHITECTURE ══════════ */
    .sdk-dark-band {
      position: relative; isolation: isolate; overflow: hidden;
      padding: 96px 0;
      background:
        radial-gradient(820px 420px at 84% 0%, rgba(124, 58, 237, 0.28), transparent 62%),
        radial-gradient(620px 380px at 4% 110%, rgba(37, 99, 235, 0.20), transparent 62%),
        var(--gradient-ink);
      color: var(--color-ink-text);
    }
    @media (min-width: 768px) { .sdk-dark-band { padding: 112px 0; } }
    .sdk-dark-band::before {
      content: ''; position: absolute; inset: 0; z-index: -1;
      background-image:
        linear-gradient(to right, rgba(148, 197, 255, 0.055) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148, 197, 255, 0.055) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse 72% 82% at 76% 0%, #000, transparent 72%);
      -webkit-mask-image: radial-gradient(ellipse 72% 82% at 76% 0%, #000, transparent 72%);
      pointer-events: none;
    }
    .sdk-dark-band::after {
      content: ''; position: absolute; right: -160px; top: -210px; z-index: -1;
      width: 480px; height: 480px; border-radius: 50%;
      border: 1px solid rgba(196, 181, 253, 0.18);
      box-shadow: 0 0 0 52px rgba(196, 181, 253, 0.035);
      pointer-events: none;
    }
    .sdk-dark-band qm-container { position: relative; }
    .sdk-dark-head { max-width: 760px; margin: 0 0 40px; }
    .sdk-eyebrow-dark { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #C4B5FD; margin-bottom: 16px; }
    .sdk-eyebrow-dark::before { content: ''; width: 22px; height: 1.5px; border-radius: 999px; background: linear-gradient(90deg, #A78BFA, #67E8F9); }
    .sdk-h2--dark { color: var(--color-ink-text); }
    .sdk-lead--dark { color: var(--color-ink-muted); }
    .sdk-layer { display: flex; flex-direction: column; align-items: center; gap: 0; max-width: 640px; margin: 0 auto 40px; }
    .sdk-layer-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
    .sdk-layer-chip {
      font-size: 13px; color: var(--color-ink-text);
      background: rgba(11, 27, 51, 0.72); border: 1px solid var(--color-ink-border);
      border-radius: 999px; padding: 10px 18px; white-space: nowrap;
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }
    .sdk-layer-chip--primary {
      background: linear-gradient(135deg, #7C3AED, #4F46E5 60%, #2563EB);
      border-color: transparent; color: #FFFFFF; font-weight: 600;
      box-shadow: 0 14px 32px -16px rgba(124, 58, 237, 0.8);
    }
    .sdk-layer-chip--muted { color: var(--color-ink-muted); border-color: rgba(148, 197, 255, 0.10); }
    .sdk-layer-arrow { color: rgba(196, 181, 253, 0.55); font-size: 20px; padding: 6px 0; line-height: 1; }
    .sdk-dark-note { color: var(--color-ink-muted); font-size: 13px; line-height: 1.6; margin: 0; max-width: 720px; }

    /* ══════════ DOCS ══════════ */
    .sdk-doc-list { margin: 0; padding-left: 20px; color: #475569; }
    .sdk-doc-list li { margin-bottom: 10px; line-height: 1.6; font-size: 15px; }

    /* ══════════ DEV FLOW ══════════ */
    .sdk-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin: 0 0 32px; }
    .sdk-flow-chip { font-size: 13px; color: #475569; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 8px 14px; border-radius: 8px; white-space: nowrap; }
    .sdk-flow-chip--accent { background: #7C3AED; border-color: #7C3AED; color: #FFFFFF; font-weight: 600; }
    .sdk-flow-arrow { color: #94A3B8; font-size: 18px; }

    /* ══════════ STATUS TABLE ══════════ */
    .sdk-table-wrap { overflow-x: auto; border: 1px solid #E2E8F0; border-radius: 12px; background: #FFFFFF; }
    .sdk-table { width: 100%; border-collapse: collapse; min-width: 640px; }
    .sdk-table th { text-align: left; font-size: 12px; letter-spacing: 0.07em; text-transform: uppercase; color: #64748B; padding: 14px 18px; border-bottom: 1px solid #E2E8F0; }
    .sdk-table td { padding: 14px 18px; border-bottom: 1px solid #F1F5F9; vertical-align: top; }
    .sdk-table tr:last-child td { border-bottom: none; }
    .sdk-table td:first-child { font-weight: 600; color: #111827; }
    .sdk-table td:last-child { color: #475569; font-size: 14px; line-height: 1.6; min-width: 240px; }
    .sdk-table td:nth-child(2) { white-space: nowrap; }
    .sdk-table tr:hover td { background: #F8FAFC; }
    @media (max-width: 640px) {
      .sdk-table th { display: none; }
      .sdk-table, .sdk-table tbody, .sdk-table tr, .sdk-table td { display: block; width: 100%; }
      .sdk-table tr { padding: 12px 16px; border-bottom: 1px solid #E2E8F0; }
      .sdk-table tr:last-child { border-bottom: none; }
      .sdk-table td { border: none; padding: 6px 0; }
      .sdk-table td:first-child { padding-top: 0; font-size: 15px; }
      .sdk-table td:nth-child(2) { white-space: normal; }
      .sdk-table td::before { display: block; font-size: 11px; letter-spacing: 0.07em; text-transform: uppercase; color: #64748B; margin-bottom: 2px; content: attr(data-label); }
      .sdk-table td:last-child { min-width: 0; }
    }

    /* ══════════ ROADMAP ══════════ */
    .sdk-grid--road { grid-template-columns: 1fr; }
    @media (min-width: 768px) { .sdk-grid--road { grid-template-columns: repeat(3, 1fr); } }
    .sdk-road {
      position: relative; overflow: hidden;
      background:
        radial-gradient(320px 180px at 100% 0%, rgba(124, 58, 237, 0.06), transparent 64%),
        #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: var(--radius-lg); padding: 28px;
      transition: transform 260ms var(--qm-ease-out), box-shadow 260ms var(--qm-ease-out), border-color 260ms ease;
    }
    .sdk-road::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: linear-gradient(90deg, #7C3AED, #A78BFA 55%, #2563EB);
      opacity: 0.65;
    }
    .sdk-road:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: rgba(124, 58, 237, 0.24); }
    .sdk-road-title { margin: 16px 0 12px; font-size: 20px; color: #111827; }
    .sdk-road-list { margin: 0; padding-left: 20px; color: #475569; }
    .sdk-road-list li { margin-bottom: 10px; line-height: 1.6; font-size: 15px; }

    /* ══════════ CTA ══════════ */
    .sdk-eco-band {
      position: relative; overflow: hidden; text-align: center;
      padding: 40px 28px;
      background:
        radial-gradient(420px 220px at 100% 0%, rgba(124, 58, 237, 0.08), transparent 64%),
        #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-xs);
      display: flex; flex-direction: column; align-items: center; gap: 16px;
    }
    .sdk-eco-band::before {
      content: ''; position: absolute; inset: 0 0 auto; height: 3px;
      background: linear-gradient(90deg, #7C3AED, #A78BFA 55%, #2563EB);
    }
    .sdk-eco-band h2 { margin: 0; }
    .sdk-eco-band p { margin: 0; max-width: 620px; }
    .sdk-docs-note { max-width: 600px; margin: 24px auto 0; font-size: 14px; line-height: 1.6; }

    /* ══════════ A11Y ══════════ */
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

    @media (prefers-reduced-motion: reduce) {
      .sdk-card, .sdk-concept, .sdk-road { transition: none; }
      .sdk-card:hover, .sdk-concept:hover, .sdk-road:hover { transform: none; }
      .sdk-hero-art__core, .sdk-hero-art__node { animation: none; }
    }
  `]
})
export class QuantsMindSdkComponent {
  concepts: ModelConcept[] = [
    { name: 'Entity', detail: 'A thing, actor, object, or system being represented — with identity, properties, behaviour, relationships and constraints.' },
    { name: 'State', detail: 'The condition or configuration of an entity at a point in time. State is what changes.' },
    { name: 'Interaction', detail: 'An event or operation between entities that causes state to change.' },
    { name: 'Observation', detail: 'Information captured from interactions or system state — the raw material of understanding.' },
    { name: 'Knowledge', detail: 'Structured understanding derived from observations, state and patterns over time.' }
  ];

  principles: PrincipleCard[] = [
    { index: '01', title: 'General Purpose', text: 'Not built for one domain. The same foundational model specialises across mathematics, physics, quantum, AI, finance and more.' },
    { index: '02', title: 'Modular', text: 'A structured package architecture so that each capability area can develop independently without entangling others.' },
    { index: '03', title: 'Python Native', text: 'Designed for Python 3.13+ — using modern Python typing, protocols and dataclass conventions from the start.' },
    { index: '04', title: 'Reusable', text: 'Foundation abstractions designed to be inherited and specialised across many packages without duplication.' },
    { index: '05', title: 'Explicit Architecture', text: 'The layering and dependency rules are defined before implementation, so structure is not an afterthought.' },
    { index: '06', title: 'Extensible', text: 'A plugin-oriented design so third parties and future packages can extend the SDK without modifying the core.' },
    { index: '07', title: 'Developer Oriented', text: 'APIs designed around clarity, discoverability and explicitness rather than cleverness or magic.' },
    { index: '08', title: 'Technology Neutral', text: 'No built-in assumption about which hardware, cloud, database or runtime the SDK runs on.' }
  ];

  groups: PackageGroup[] = [
    { name: 'Foundation Ontology', status: 'Implemented', variant: 'stable', modules: 'foundation (Entity · System · State · Interaction · Observation · Knowledge)' },
    { name: 'Mathematics', status: 'Implemented', variant: 'stable', modules: 'math · algebra · calculus · numerical · statistics · optimization' },
    { name: 'Chemistry', status: 'Implemented', variant: 'stable', modules: 'chemistry (molecular systems domain model)' },
    { name: 'Biology', status: 'Implemented', variant: 'stable', modules: 'biology (biological systems domain model)' },
    { name: 'Astronomy & Cosmology', status: 'Implemented', variant: 'stable', modules: 'astronomy · cosmology (domain models)' },
    { name: 'Finance', status: 'Implemented', variant: 'stable', modules: 'finance (time-value, cash-flow and bond mathematics)' },
    { name: 'AI Agents', status: 'Implemented', variant: 'stable', modules: 'ai · ai_reasoning (messages, model-backend interface, memory, tools, agent loop)' },
    { name: 'Knowledge Graphs', status: 'Implemented', variant: 'stable', modules: 'knowledge (graph traversal and provenance)' },
    { name: 'Compiler Front-end', status: 'Implemented', variant: 'stable', modules: 'compiler (expression lexer, parser, AST, folding, evaluation)' }
  ];

  statusRows: StatusRow[] = [
    { area: 'Release', status: 'v1.1.0', variant: 'experimental', note: 'Current published release of the SDK, following 1.0.1 and 1.0.0. A version number means a release exists; it is not a claim of production readiness.' },
    { area: 'Stage', status: 'Developer Preview', variant: 'experimental', note: 'The PyPI project metadata for this package carries the "Development Status :: 5 - Production/Stable" classifier. That classifier is a self-declared packaging label, not an independent assessment, and this page does not treat it as one. The project is presented here as a developer preview.' },
    { area: 'Package', status: 'quantsmind', variant: 'stable', note: 'The Python distribution name for the SDK.' },
    { area: 'Language', status: 'Python 3.13+', variant: 'default', note: 'Modern Python typing, protocols and dataclass conventions used from the start.' },
    { area: 'Source', status: 'GitHub', variant: 'default', note: 'Repository: ajit-ai/quantsmind-quantum-sdk. Apache 2.0 licensed.' },
    { area: 'Examples', status: 'Runnable', variant: 'stable', note: 'Domain and cross-domain examples are included and covered by an example-execution test suite.' },
    { area: 'Documentation', status: 'In-repository', variant: 'default', note: 'ADRs, architecture overview, layering model, domain guides and developer docs live in the repository.' }
  ];

  devFlow: Array<[string]> = [
    ['clone'], ['install quantsmind'], ['build models'], ['compose interactions'], ['capture observations'], ['Knowledge']
  ];

  roadmap: RoadItem[] = [
    { phase: 'v1.1.0', variant: 'experimental', stage: 'Current published release', items: ['Implemented mathematics, chemistry, biology, astronomy, cosmology and finance domains', 'AI abstractions including an agent loop and knowledge-graph traversal', 'Expression compiler front-end', 'Runnable domain and cross-domain examples'] },
    { phase: 'Next', variant: 'development', stage: 'Core and runtime', items: ['Core abstractions and exception hierarchy', 'Runtime executor, provider contracts and simulation', 'Deeper AI reasoning, datasets and visualization'] },
    { phase: 'Ongoing', variant: 'concept', stage: 'Wider reach', items: ['Broader physics, chemistry and quantum integration', 'Plugins, telemetry and security hardening', 'Continued evolution of the public API beyond 1.1.0'] }
  ];
}