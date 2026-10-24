import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';
import { HrefPartsPipe }        from '../../shared/pipes/href-parts.pipe';

interface Capability {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface EcosystemTech {
  name: string;
  tagline: string;
  description: string;
  status: string;
  version: string;
  badge: BadgeVariant;
  cta: string;
  href: string;
}

interface EcosystemLink {
  name: string;
  label: string;
  description: string;
  href: string;
}

@Component({
    selector: 'app-home',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, SafeHtmlPipe, HrefPartsPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- HERO                                                     -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="hero" aria-label="QuantsMind overview">
      <qm-container>
        <div class="hero__grid">
          <div class="hero__inner">
            <span class="eyebrow hero__eyebrow">QUANTSMIND</span>
            <h1 class="hero__headline">
              Software Engineering, AI and Data Solutions for Modern Businesses
            </h1>
            <p class="hero__lead">
              QuantsMind helps organisations design, build, modernise and integrate
              software systems through architecture consulting, AI engineering, data
              platforms, cloud technologies and specialised technical development.
            </p>
            <div class="hero__actions">
              <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
                Discuss Your Requirement →
              </qm-button>
              <qm-button variant="secondary" size="lg" [routerLinkValue]="'/services'">
                Explore Services →
              </qm-button>
            </div>
            <div class="hero__focus">
              @for (area of focusAreas; track area) {
                <span class="hero__focus-chip">{{ area }}</span>
              }
            </div>
          </div>

          <!-- Decorative: software engineering delivery lifecycle diagram -->
          <div class="hero__visual" aria-hidden="true">
            <div class="hero__visual-panel qm-glass">
              <svg class="qm-visual" viewBox="0 0 520 300" role="presentation" focusable="false">
                <defs>
                  <marker id="qmHeroArrow" markerWidth="8" markerHeight="8" refX="7" refY="4"
                          orient="auto" markerUnits="strokeWidth">
                    <path d="M0 0 L8 4 L0 8 Z" style="fill: var(--color-accent)" />
                  </marker>
                </defs>

                <!-- Delivery lifecycle -->
                <g>
                  <rect x="24" y="62" width="112" height="74" rx="12"
                        style="fill: var(--color-surface); stroke: var(--color-border)" stroke-width="1"/>
                  <text x="80" y="92" text-anchor="middle" font-size="12" font-weight="600"
                        style="fill: var(--color-text-primary)">Business</text>
                  <text x="80" y="108" text-anchor="middle" font-size="12" font-weight="600"
                        style="fill: var(--color-text-primary)">requirements</text>
                  <text x="80" y="126" text-anchor="middle" font-size="11"
                        style="fill: var(--color-text-secondary)">Discovery &amp; scope</text>
                </g>

                <line x1="136" y1="99" x2="146" y2="99" stroke-width="1.5"
                      marker-end="url(#qmHeroArrow)" style="stroke: var(--color-accent)"/>

                <g>
                  <rect x="148" y="62" width="112" height="74" rx="12"
                        style="fill: var(--color-surface); stroke: var(--color-border)" stroke-width="1"/>
                  <text x="204" y="92" text-anchor="middle" font-size="12" font-weight="600"
                        style="fill: var(--color-text-primary)">Solution</text>
                  <text x="204" y="108" text-anchor="middle" font-size="12" font-weight="600"
                        style="fill: var(--color-text-primary)">architecture</text>
                  <text x="204" y="126" text-anchor="middle" font-size="11"
                        style="fill: var(--color-text-secondary)">Design &amp; decisions</text>
                </g>

                <line x1="260" y1="99" x2="270" y2="99" stroke-width="1.5"
                      marker-end="url(#qmHeroArrow)" style="stroke: var(--color-accent)"/>

                <g>
                  <rect x="272" y="62" width="112" height="74" rx="12"
                        style="fill: var(--color-surface); stroke: var(--color-border)" stroke-width="1"/>
                  <text x="328" y="92" text-anchor="middle" font-size="12" font-weight="600"
                        style="fill: var(--color-text-primary)">Engineering &amp;</text>
                  <text x="328" y="108" text-anchor="middle" font-size="12" font-weight="600"
                        style="fill: var(--color-text-primary)">integration</text>
                  <text x="328" y="126" text-anchor="middle" font-size="11"
                        style="fill: var(--color-text-secondary)">Build &amp; test</text>
                </g>

                <line x1="384" y1="99" x2="394" y2="99" stroke-width="1.5"
                      marker-end="url(#qmHeroArrow)" style="stroke: var(--color-accent)"/>

                <g>
                  <rect x="396" y="62" width="100" height="74" rx="12"
                        style="fill: var(--color-surface); stroke: var(--color-border)" stroke-width="1"/>
                  <text x="446" y="92" text-anchor="middle" font-size="12" font-weight="600"
                        style="fill: var(--color-text-primary)">Deployment &amp;</text>
                  <text x="446" y="108" text-anchor="middle" font-size="12" font-weight="600"
                        style="fill: var(--color-text-primary)">operations</text>
                  <text x="446" y="126" text-anchor="middle" font-size="11"
                        style="fill: var(--color-text-secondary)">Release &amp; run</text>
                </g>

                <!-- Supporting capabilities -->
                <text x="260" y="174" text-anchor="middle" font-size="11" font-weight="600"
                      style="fill: var(--color-text-muted)">Supporting capabilities</text>

                <g>
                  <rect x="44" y="188" width="132" height="46" rx="10"
                        style="fill: var(--color-canvas); stroke: var(--color-border)" stroke-width="1"/>
                  <text x="110" y="210" text-anchor="middle" font-size="11" font-weight="600"
                        style="fill: var(--color-text-primary)">AI engineering</text>
                  <text x="110" y="226" text-anchor="middle" font-size="11"
                        style="fill: var(--color-text-secondary)">Applied where useful</text>
                </g>

                <g>
                  <rect x="194" y="188" width="132" height="46" rx="10"
                        style="fill: var(--color-canvas); stroke: var(--color-border)" stroke-width="1"/>
                  <text x="260" y="210" text-anchor="middle" font-size="11" font-weight="600"
                        style="fill: var(--color-text-primary)">Data platforms</text>
                  <text x="260" y="226" text-anchor="middle" font-size="11"
                        style="fill: var(--color-text-secondary)">Applied where useful</text>
                </g>

                <g>
                  <rect x="344" y="188" width="132" height="46" rx="10"
                        style="fill: var(--color-canvas); stroke: var(--color-border)" stroke-width="1"/>
                  <text x="410" y="210" text-anchor="middle" font-size="11" font-weight="600"
                        style="fill: var(--color-text-primary)">Cloud delivery</text>
                  <text x="410" y="226" text-anchor="middle" font-size="11"
                        style="fill: var(--color-text-secondary)">Applied where useful</text>
                </g>

                <text x="260" y="262" text-anchor="middle" font-size="11"
                      style="fill: var(--color-text-muted)">Capabilities are selected per engagement.</text>
              </svg>
            </div>
          </div>

        </div>
      </qm-container>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- WHAT WE DO                                              -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="sm">
      <qm-container>
        <div class="section-header">
          <span class="eyebrow">WHAT WE DO</span>
          <h2>Engineering Capabilities.</h2>
          <p class="lead section-header__lead">
            Clear, practical engineering across the core disciplines that building
            software depends on.
          </p>
        </div>

        <div class="capability-grid">
          @for (cap of capabilities; track cap) {
            @let capLink = cap.href | hrefParts;
            <a [routerLink]="capLink.path" [fragment]="capLink.fragment" class="capability-card" [attr.aria-label]="cap.title">
              <div class="capability-card__icon" aria-hidden="true" [innerHTML]="cap.icon | qmSafeHtml"></div>
              <h3 class="capability-card__title">{{ cap.title }}</h3>
              <p class="capability-card__desc">{{ cap.description }}</p>
              <span class="capability-card__link">Explore Services →</span>
            </a>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- WHAT WE DELIVER                                          -->
    <!-- ════════════════════════════════════════════════════════ -->
    <qm-section surface="subtle" size="sm">
      <qm-container>
        <div class="section-header">
          <span class="eyebrow">WHAT WE DELIVER</span>
          <h2>Capabilities You Can Engage.</h2>
          <p class="lead section-header__lead">
            Practical outcomes QuantsMind can design, build and deliver with you.
          </p>
        </div>
        <div class="delivery-grid">
          <div class="delivery-card">
            <h3 class="delivery-card__title">Software Architecture & Modernisation</h3>
            <p class="delivery-card__desc">
              System design, legacy modernisation, architecture reviews and
              engineering guidance for teams building or evolving software platforms.
            </p>
          </div>
          <div class="delivery-card">
            <h3 class="delivery-card__title">AI & Intelligent Automation</h3>
            <p class="delivery-card__desc">
              Practical AI/ML application development, intelligent systems and
              integration of modern AI technologies into existing workflows.
            </p>
          </div>
          <div class="delivery-card">
            <h3 class="delivery-card__title">Data Engineering & Analytics</h3>
            <p class="delivery-card__desc">
              Data platforms, pipelines and analytics foundations that support
              informed decision-making and operational reporting.
            </p>
          </div>
          <div class="delivery-card">
            <h3 class="delivery-card__title">Cloud & Infrastructure Engineering</h3>
            <p class="delivery-card__desc">
              Cloud architecture, deployment, CI/CD, infrastructure automation and
              engineering environments across AWS, Azure and GCP.
            </p>
          </div>
          <div class="delivery-card">
            <h3 class="delivery-card__title">Specialised Software Development</h3>
            <p class="delivery-card__desc">
              Custom software development for domains where general-purpose
              off-the-shelf tools do not fit the problem.
            </p>
          </div>
          <div class="delivery-card">
            <h3 class="delivery-card__title">Quantum Software Experimentation</h3>
            <p class="delivery-card__desc">
              Quantum program and algorithm development, classical simulation of
              circuits and hybrid optimisation workflows for feasibility exploration.
            </p>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- TECHNOLOGY ECOSYSTEM                                     -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="canvas" size="sm">
      <qm-container>
        <div class="section-header">
          <span class="eyebrow">TECHNOLOGY ECOSYSTEM</span>
          <h2>Technologies We Develop.</h2>
          <p class="lead section-header__lead">
            Alongside engineering services, QuantsMind develops and maintains its own
            software technologies. Each has a published, versioned release.
          </p>
        </div>

        <div class="ecosystem-grid">
          @for (tech of ecosystem; track tech) {
            <article class="tech-card">
              <div class="tech-card__meta">
                <h3 class="tech-card__title">{{ tech.name }}</h3>
                <qm-badge [variant]="tech.badge">{{ tech.status }}</qm-badge>
              </div>
              <p class="tech-card__version">{{ tech.version }}</p>
              <p class="tech-card__tagline">{{ tech.tagline }}</p>
              <p class="tech-card__desc">{{ tech.description }}</p>
              <a [routerLink]="tech.href" class="tech-card__link">{{ tech.cta }} →</a>
            </article>
          }
        </div>

        <div class="mt-8">
          <qm-button variant="outline" [routerLinkValue]="'/technology'">
            View the Technology Ecosystem →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- PRODUCTS & DEVELOPER TOOLS                             -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="subtle">
      <qm-container>
        <div class="section-header">
          <span class="eyebrow">PRODUCTS &amp; DEVELOPER TOOLS</span>
          <h2>Also Available.</h2>
          <p class="lead section-header__lead">
            A released product, and the tooling we publish for the technologies above.
          </p>
        </div>

        <div class="link-grid">
          @for (item of productsAndTools; track item.label) {
            @let itemLink = item.href | hrefParts;
            <a [routerLink]="itemLink.path" [fragment]="itemLink.fragment" class="link-card"
              [attr.aria-label]="item.name + ': ' + item.label">
              <span class="link-card__kind">{{ item.name }}</span>
              <h3 class="link-card__title">{{ item.label }}</h3>
              <p class="link-card__desc">{{ item.description }}</p>
              <span class="link-card__cta">Learn more →</span>
            </a>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- QUANTSMIND LABS                                         -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white">
      <qm-container>
        <div class="labs-layout">
          <div class="labs-text">
            <span class="eyebrow">QUANTSMIND LABS</span>
            <h2>Where We Explore Emerging Technologies.</h2>
            <p>
              QuantsMind Labs is where we explore emerging technologies, experimental
              architectures and new computing approaches.
            </p>
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/labs'">
              Explore Labs →
            </qm-button>
          </div>
          <div class="labs-areas">
            @for (area of labsAreas; track area) {
              <div class="labs-area-card">
                <span class="labs-area-card__name">{{ area }}</span>
              </div>
            }
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- WHY QUANTSMIND                                          -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="subtle" size="sm">
      <qm-container>
        <div class="section-header">
          <span class="eyebrow">WHY QUANTSMIND</span>
          <h2>How We Work.</h2>
        </div>
        <div class="why-grid">
          @for (why of whyCards; track why) {
            <div class="why-card">
              <h3 class="why-card__title">{{ why.title }}</h3>
              <p class="why-card__desc">{{ why.description }}</p>
            </div>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- FINAL CTA                                               -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="lg">
      <qm-container size="narrow">
        <div class="final-cta">
          <span class="eyebrow">WORK WITH US</span>
          <h2 class="final-cta__headline">Let's Build Something Useful.</h2>
          <p class="final-cta__sub">
            Have an engineering requirement, technology challenge or collaboration
            idea? Get in touch with QuantsMind.
          </p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Discuss an Engineering Requirement →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    /* ── HERO ── */
    .hero {
      padding: 72px 0 56px;
      background:
        radial-gradient(1200px 520px at 78% -12%, var(--color-accent-wash) 0%, rgba(239,246,255,0) 62%),
        radial-gradient(900px 420px at 6% 110%, var(--color-canvas-lagoon) 0%, rgba(232,238,245,0) 60%),
        var(--color-canvas);
      border-bottom: 1px solid var(--color-border);
      overflow: hidden;
    }
    @media (min-width: 1024px) {
      .hero { padding: 88px 0 64px; }
    }

    .hero__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 48px;
      align-items: center;
    }
    @media (min-width: 1024px) {
      .hero__grid {
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
        gap: 64px;
      }
    }

    .hero__inner { max-width: 760px; }
    .hero__eyebrow { margin-bottom: 20px; }
    .hero__headline {
      font-size: clamp(38px, 5vw, 60px);
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.03em;
      color: var(--color-text-primary);
      margin: 0 0 24px;
      text-wrap: balance;
    }
    .hero__lead {
      font-size: 18px;
      line-height: 1.7;
      color: var(--color-text-secondary);
      margin: 0 0 32px;
      max-width: 620px;
      text-wrap: pretty;
    }
    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 36px;
    }
    .hero__focus {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .hero__focus-chip {
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-secondary);
      background: var(--color-surface-subtle);
      border: 1px solid var(--color-border);
      border-radius: 9999px;
      padding: 4px 12px;
    }

    /* Hero visual — decorative, so it is hidden from AT and the
       reader keeps a clean mobile-first hierarchy. */
    .hero__visual { display: none; }
    @media (min-width: 768px) {
      .hero__visual { display: block; max-width: 460px; margin: 0 auto; }
    }
    @media (min-width: 1024px) {
      .hero__visual { max-width: none; margin: 0; }
    }
    .hero__visual-panel {
      padding: 20px;
      border-radius: 20px;
    }
    .hero__visual-panel .qm-visual { max-width: 520px; margin: 0 auto; }

    /* ── SECTION HEADER ── */
    .section-header { margin-bottom: 40px; max-width: 640px; }
    .section-header__lead { margin-top: 12px; }

    /* ── CAPABILITY GRID ── */
    .capability-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 640px)  { .capability-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .capability-grid { grid-template-columns: repeat(4, 1fr); } }

    .capability-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 28px;
      background: var(--card-bg-subtle);
      border: 1px solid var(--card-border);
      border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      text-decoration: none;
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
    }
    .capability-card:hover {
      border-color: var(--card-border-hi);
      box-shadow: var(--card-shadow-hi);
      transform: translateY(-2px);
    }
    .capability-card:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 3px;
    }
    .capability-card__icon {
      width: 44px; height: 44px;
      display: flex; align-items: center; justify-content: center;
      background: var(--mark-bg); border: 1px solid var(--mark-border);
      border-radius: var(--mark-radius); color: var(--mark-color);
    }
    .capability-card__title { font-size: 16px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
    .capability-card__desc  { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; flex: 1; }
    .capability-card__link  { font-size: 13px; font-weight: 500; color: var(--color-accent); margin-top: 4px; }

    @media (prefers-reduced-motion: reduce) {
      .capability-card { transition: none; }
      .capability-card:hover { transform: none; }
    }

    /* ── ECOSYSTEM ── */
    .ecosystem-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }
    @media (min-width: 768px) { .ecosystem-grid { grid-template-columns: repeat(3, 1fr); } }

    .tech-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 32px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
    }
    .tech-card:hover {
      border-color: var(--card-border-hi);
      box-shadow: var(--card-shadow-hi);
      transform: translateY(-2px);
    }
    @media (prefers-reduced-motion: reduce) {
      .tech-card { transition: none; }
      .tech-card:hover { transform: none; }
    }
    .tech-card__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tech-card__title { font-size: 18px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
    .tech-card__version { font-size: 13px; font-weight: 600; color: var(--color-text-muted); margin: 0; font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace; }
    .tech-card__tagline { font-size: 14px; font-weight: 500; color: var(--color-accent); margin: 0; }
    .tech-card__desc { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; flex: 1; }
    .tech-card__link {
      font-size: 13px; font-weight: 500; color: var(--color-accent);
      text-decoration: none; margin-top: 4px;
    }
    .tech-card__link:hover { text-decoration: underline; }

    /* ── Products & Developer Tools ── */
    .link-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
    @media (min-width: 768px) { .link-grid { grid-template-columns: repeat(2, 1fr); } }
    .link-card {
      display: flex; flex-direction: column; gap: 8px;
      padding: 28px; background: var(--card-bg);
      border: 1px solid var(--card-border); border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
      text-decoration: none;
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
    }
    .link-card:hover {
      border-color: var(--card-border-hi);
      box-shadow: var(--card-shadow-hi);
      transform: translateY(-2px);
    }
    @media (prefers-reduced-motion: reduce) {
      .link-card { transition: none; }
      .link-card:hover { transform: none; }
    }
    .link-card__kind {
      font-size: 11px; font-weight: 600; letter-spacing: 0.07em;
      text-transform: uppercase; color: var(--color-accent);
    }
    .link-card__title { font-size: 18px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
    .link-card__desc { font-size: 14px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; flex: 1; }
    .link-card__cta { font-size: 13px; font-weight: 500; color: var(--color-accent); margin-top: 4px; }

    .mt-8 { margin-top: 32px; }

    /* ── LABS ── */
    .labs-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 48px;
      align-items: center;
    }
    @media (min-width: 1024px) { .labs-layout { grid-template-columns: 1fr 1fr; } }
    .labs-text { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
    .labs-text h2 { margin: 0; }
    .labs-text p  { margin: 0; max-width: 460px; }

    .labs-areas {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .labs-area-card {
      padding: 10px 18px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 9999px;
    }
    .labs-area-card__name { font-size: 13px; font-weight: 500; color: var(--color-text-secondary); }

    /* ── WHY ── */
    .why-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 640px)  { .why-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .why-grid { grid-template-columns: repeat(4, 1fr); } }

    .why-card {
      padding: 24px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
    }
    .why-card__title { font-size: 15px; font-weight: 600; color: var(--color-text-primary); margin: 0 0 8px; }
    .why-card__desc  { font-size: 13px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; }

    /* ── DELIVERY ── */
    .delivery-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 640px)  { .delivery-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .delivery-grid { grid-template-columns: repeat(3, 1fr); } }

    .delivery-card {
      padding: 24px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .delivery-card__title { font-size: 15px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
    .delivery-card__desc  { font-size: 13px; line-height: 1.6; color: var(--color-text-secondary); margin: 0; flex: 1; }

    /* ── FINAL CTA ── */
    .final-cta {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .final-cta__headline {
      font-size: clamp(28px, 3.5vw, 44px);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-text-primary);
      margin: 0;
      text-wrap: balance;
    }
    .final-cta__sub {
      font-size: 18px;
      color: var(--color-text-secondary);
      line-height: 1.7;
      max-width: 560px;
      margin: 0;
      text-wrap: pretty;
    }

    /* Utility */
    .eyebrow {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-accent);
      margin-bottom: 16px;
    }
    .lead {
      font-size: 18px;
      line-height: 1.7;
      color: var(--color-text-secondary);
    }
  `]
})
export class HomeComponent {
  focusAreas = [
    'Software Engineering',
    'AI / ML',
    'Cloud & Infrastructure',
    'Emerging Computing'
  ];

  capabilities: Capability[] = [
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>`,
      title: 'Quantum Computing',
      description: 'Quantum program and algorithm development, with classical simulation of circuits and hybrid optimisation workflows.',
      href: '/services#quantum-computing'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI & Machine Learning',
      description: 'AI/ML application development, intelligent systems and practical integration of modern AI technologies.',
      href: '/services#ai-ml-engineering'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
      title: 'Cloud & Infrastructure',
      description: 'Cloud architecture, deployment, CI/CD, infrastructure automation and engineering environments.',
      href: '/services#cloud-engineering'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
      title: 'Architecture & Consulting',
      description: 'Solution architecture, technical modernization, system design and engineering guidance.',
      href: '/services#technical-consulting'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'Software Architecture',
      description: 'System design, technical foundations and architecture reviews for teams building or modernising software.',
      href: '/services#software-architecture'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06-.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      title: 'DevOps & CI/CD',
      description: 'Continuous delivery, automated testing and release engineering that make software delivery repeatable and safe.',
      href: '/services#devops-ci-cd'
    }
  ];

  ecosystem: EcosystemTech[] = [
    {
name: 'MicroQuantum',
      tagline: 'Open Quantum Computing SDK',
      description: 'An open, NumPy-only Python SDK for building, executing and analyzing quantum programs, published on PyPI at version 1.1.0. Execution is by simulation.',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      cta: 'Explore MicroQuantum',
      href: '/microquantum'
    },
    {
      name: 'Karkain',
      tagline: 'General-Purpose Programming Language',
      description: 'An independent, statically typed systems programming language with a self-hosted compiler, published at version 1.1.0.',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      cta: 'Explore Karkain',
      href: '/karkain'
    },
    {
      name: 'QuantsMind SDK',
      tagline: 'Scientific Computing SDK',
      description: 'An open, vendor-independent Python SDK for scientific computing, published on PyPI at version 1.1.0. Coverage and numerical accuracy vary by domain.',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      cta: 'Explore QuantsMind SDK',
      href: '/quantsmind-sdk'
    }
  ];

  productsAndTools: EcosystemLink[] = [
    {
      name: 'Products',
      label: 'QuantsMind Document Intelligence Mini',
      description: 'Our lightweight document-processing software, currently at v0.1.0 and available by arrangement.',
      href: '/products'
    },
    {
      name: 'Technologies',
      label: 'QuantsMind Relational DB and GuardMCP',
      description: 'An embeddable Rust relational database engine, and a policy and security control layer for MCP tool calls. Both are alpha.',
      href: '/technology'
    }
  ];

  labsAreas = [
    'Artificial Intelligence',
    'Machine Learning',
    'Quantum Computing',
    'Programming Languages',
    'Scientific Computing',
    'Developer Technologies',
    'Data Intelligence'
  ];

  whyCards = [
    {
      title: 'Engineering First',
      description: 'Practical engineering rather than technology for technology\u2019s sake.'
    },
    {
      title: 'Architecture Driven',
      description: 'Strong focus on maintainable systems and sound technical foundations.'
    },
    {
      title: 'Build & Experiment',
      description: 'Developing real software while exploring emerging technologies.'
    },
    {
      title: 'Open Technology',
      description: 'Where appropriate, technologies are shared openly with the developer community.'
    }
  ];
}