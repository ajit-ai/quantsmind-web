import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';
import { HrefPartsPipe }        from '../../shared/pipes/href-parts.pipe';

interface Capability {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

type HomeBadgeVariant = 'ai' | 'data' | 'software' | 'cloud' | 'optimization' | 'quantum' | 'default';

interface InsightPreview {
  slug: string;
  category: string;
  badge: HomeBadgeVariant;
  title: string;
  description: string;
  readingTime: string;
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
        <div class="hero__layout">
          <div class="hero__content">
            <span class="eyebrow">QUANTSMIND</span>
            <h1 class="hero__headline">
              Technology Engineering<br>for Complex Problems.
            </h1>
            <p class="hero__lead">
              We design and engineer enterprise software, intelligent systems,
              data platforms, cloud infrastructure, and advanced computing
              solutions for organisations facing genuinely difficult problems.
            </p>
            <div class="hero__actions">
              <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
                Talk to QuantsMind →
              </qm-button>
              <qm-button variant="secondary" size="lg" [routerLinkValue]="'/what-we-build'">
                Explore What We Build
              </qm-button>
            </div>
            <div class="hero__pillars">
              <span>Enterprise Software</span>
              <span class="hero__pillars-dot" aria-hidden="true">·</span>
              <span>Intelligent Systems</span>
              <span class="hero__pillars-dot" aria-hidden="true">·</span>
              <span>Advanced Computing</span>
            </div>
          </div>
    
          <!-- Technical diagram -->
          <div class="hero__diagram" aria-hidden="true">
            <svg class="hero__svg" viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Background grid -->
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="480" height="400" fill="#F8FAFC" rx="16"/>
              <rect width="480" height="400" fill="url(#grid)" rx="16"/>
    
              <!-- Central system node -->
              <rect x="170" y="160" width="140" height="80" rx="10" fill="#FFFFFF"
                stroke="#2563EB" stroke-width="1.5"/>
                <text x="240" y="193" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="11" font-weight="600" fill="#111827" letter-spacing="0.06em">COMPLEX</text>
                <text x="240" y="211" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="11" font-weight="600" fill="#111827" letter-spacing="0.06em">PROBLEM</text>
                <text x="240" y="229" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="10" fill="#64748B">Your challenge</text>
    
                <!-- Arrow down to UNDERSTAND -->
                <path d="M240 240 L240 274" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 3"/>
                <polygon points="236,270 244,270 240,278" fill="#CBD5E1"/>
    
                <!-- UNDERSTAND -->
                <rect x="190" y="278" width="100" height="36" rx="8" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1"/>
                <text x="240" y="300" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="10" font-weight="600" fill="#2563EB" letter-spacing="0.05em">UNDERSTAND</text>
    
                <!-- Arrow right to ARCHITECT -->
                <path d="M290 296 L332 296" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 3"/>
                <polygon points="328,292 336,296 328,300" fill="#CBD5E1"/>
    
                <!-- ARCHITECT -->
                <rect x="336" y="278" width="100" height="36" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
                <text x="386" y="300" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="10" font-weight="600" fill="#475569" letter-spacing="0.05em">ARCHITECT</text>
    
                <!-- Arrow up from ARCHITECT to ENGINEER -->
                <path d="M386 278 L386 244" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 3"/>
                <polygon points="382,248 390,248 386,240" fill="#CBD5E1"/>
    
                <!-- ENGINEER node -->
                <rect x="336" y="200" width="100" height="36" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
                <text x="386" y="222" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="10" font-weight="600" fill="#475569" letter-spacing="0.05em">ENGINEER</text>
    
                <!-- Arrow left to INTEGRATE -->
                <path d="M336 218 L294 218" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 3"/>
                <polygon points="298,214 290,218 298,222" fill="#CBD5E1"/>
    
                <!-- INTEGRATE -->
                <rect x="190" y="200" width="100" height="36" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
                <text x="240" y="222" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="10" font-weight="600" fill="#475569" letter-spacing="0.05em">INTEGRATE</text>
    
                <!-- Arrow up to OPTIMISE -->
                <path d="M240 200 L240 164" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 3"/>
                <polygon points="236,168 244,168 240,160" fill="#CBD5E1"/>
    
                <!-- Left side: INTELLIGENCE -->
                <rect x="44" y="160" width="100" height="36" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
                <text x="94" y="182" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="10" font-weight="600" fill="#475569" letter-spacing="0.04em">INTELLIGENCE</text>
    
                <!-- OPTIMISE -->
                <rect x="44" y="218" width="100" height="36" rx="8" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1"/>
                <text x="94" y="240" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="10" font-weight="600" fill="#2563EB" letter-spacing="0.05em">OPTIMISE</text>
    
                <!-- EVOLVE -->
                <rect x="44" y="278" width="100" height="36" rx="8" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1"/>
                <text x="94" y="300" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="10" font-weight="600" fill="#2563EB" letter-spacing="0.05em">EVOLVE</text>
    
                <!-- Connecting lines on left -->
                <path d="M170 200 L148 200 L148 178" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 3"/>
                <polygon points="144,182 152,182 148,174" fill="#CBD5E1"/>
                <path d="M94 196 L94 218" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 3"/>
                <path d="M94 254 L94 278" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 3"/>
    
                <!-- Top labels -->
                <text x="240" y="48" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="11" font-weight="500" fill="#94A3B8" letter-spacing="0.04em">ENTERPRISE SOFTWARE</text>
                <text x="240" y="68" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="11" font-weight="500" fill="#94A3B8" letter-spacing="0.04em">INTELLIGENT SYSTEMS</text>
                <text x="240" y="88" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
                font-size="11" font-weight="500" fill="#94A3B8" letter-spacing="0.04em">ADVANCED COMPUTING</text>
    
                <!-- Top accent line -->
                <line x1="120" y1="100" x2="360" y2="100" stroke="#E2E8F0" stroke-width="1"/>
                <circle cx="240" cy="100" r="4" fill="#2563EB" opacity="0.6"/>
              </svg>
            </div>
          </div>
        </qm-container>
      </section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- WHAT IS QUANTSMIND                                       -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="white">
        <qm-container size="narrow">
          <div class="text-center mb-12">
            <span class="eyebrow">WHO WE ARE</span>
            <h2>A Technology Engineering Company.</h2>
            <p class="lead">
              QuantsMind works on problems where the technology itself is
              part of the difficulty — not just the implementation.
              We start with the architecture, reason carefully about the
              constraints, and engineer systems built to last.
            </p>
          </div>
    
          <div class="process-row">
            @for (step of processSteps; track step; let last = $last) {
              <div class="process-row__step">
                <div class="process-row__label">{{ step }}</div>
                @if (!last) {
                  <div class="process-row__arrow" aria-hidden="true">→</div>
                }
              </div>
            }
          </div>
        </qm-container>
      </qm-section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- WHAT WE BUILD                                            -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="canvas">
        <qm-container>
          <div class="section-header">
            <span class="eyebrow">WHAT WE BUILD</span>
            <h2>Six Engineering Disciplines.</h2>
            <p class="lead section-header__lead">
              Each capability reflects a domain where QuantsMind applies
              deep technical thinking to real organisational problems.
            </p>
          </div>
    
          <div class="capability-grid">
            @for (cap of capabilities; track cap) {
              <a
                [routerLink]="cap.href"
                class="capability-card"
                [attr.aria-label]="cap.title">
                <div class="capability-card__icon" aria-hidden="true" [innerHTML]="cap.icon | qmSafeHtml"></div>
                <h3 class="capability-card__title">{{ cap.title }}</h3>
                <p class="capability-card__desc">{{ cap.description }}</p>
                <span class="capability-card__link">Explore →</span>
              </a>
            }
          </div>
        </qm-container>
      </qm-section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- ENTRY POINTS (BUILD / MODERNIZE / EXPLORE)              -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="subtle" size="sm">
        <qm-container>
          <div class="entry-row">
            @for (entry of entryPoints; track entry) {
              <div class="entry-card">
                <div class="entry-card__tag">
                  <qm-badge [variant]="entry.badge">{{ entry.label }}</qm-badge>
                </div>
                <h3 class="entry-card__title">{{ entry.title }}</h3>
                <p class="entry-card__desc">{{ entry.description }}</p>
                <a [routerLink]="'/contact'" class="entry-card__link">Start a conversation →</a>
              </div>
            }
          </div>
        </qm-container>
      </qm-section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- ENGINEERING APPROACH                                     -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="white">
        <qm-container>
          <div class="two-col">
            <div class="two-col__text">
              <span class="eyebrow">ENGINEERING</span>
              <h2>Architecture First.</h2>
              <p>
                Before we write code, we understand the system. We reason about
                data flows, integration boundaries, failure modes, and long-term
                evolution. The architecture is the foundation everything else rests on.
              </p>
              <p>
                QuantsMind engineering is defined by clarity over cleverness,
                correctness over speed, and systems that your team can reason
                about and evolve confidently over time.
              </p>
              <qm-button variant="secondary" size="md" [routerLinkValue]="'/engineering'">
                Our Engineering Approach →
              </qm-button>
            </div>
            <div class="two-col__diagram" aria-hidden="true">
              <div class="principle-list">
                @for (p of principles; track p) {
                  <div class="principle-item">
                    <div class="principle-item__dot"></div>
                    <div>
                      <div class="principle-item__title">{{ p.title }}</div>
                      <div class="principle-item__desc">{{ p.desc }}</div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </qm-container>
      </qm-section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- PROBLEMS WE SOLVE                                        -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="canvas">
        <qm-container>
          <div class="section-header text-center">
            <span class="eyebrow">PROBLEMS</span>
            <h2>We Start With the Problem.</h2>
            <p class="lead section-header__lead">
              Technology is the answer. First we understand the question.
            </p>
          </div>
          <div class="problem-grid">
            @for (problem of problems; track problem) {
              <div class="problem-card">
                <h3 class="problem-card__title">{{ problem.title }}</h3>
                <p class="problem-card__desc">{{ problem.desc }}</p>
              </div>
            }
          </div>
        </qm-container>
      </qm-section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- TECHNOLOGY                                               -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="white">
        <qm-container>
          <div class="section-header">
            <span class="eyebrow">TECHNOLOGY</span>
            <h2>Across the Full Stack of Modern Engineering.</h2>
          </div>
          <div class="tech-domain-grid">
            @for (domain of techDomains; track domain) {
              @let domainLink = domain.href | hrefParts;
              <a
                [routerLink]="domainLink.path" [fragment]="domainLink.fragment"
                class="tech-domain-card">
                <div class="tech-domain-card__name">{{ domain.name }}</div>
                <div class="tech-domain-card__items">
                  @for (item of domain.items; track item) {
                    <span class="tech-domain-card__item">
                      {{ item }}
                    </span>
                  }
                </div>
              </a>
            }
          </div>
          <div class="mt-8 text-center">
            <qm-button variant="outline" [routerLinkValue]="'/technology'">
              Explore Our Technology Landscape →
            </qm-button>
          </div>
        </qm-container>
      </qm-section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- LABS                                                     -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="dark">
        <qm-container>
          <div class="labs-layout">
            <div class="labs-text">
              <span class="eyebrow" style="color:#93C5FD">QUANTSMIND LABS</span>
              <h2 style="color:#F1F5F9">
                Research, Experimentation,<br>and Intellectual Property.
              </h2>
              <p style="color:#94A3B8">
                QuantsMind Labs investigates problems at the frontier of
                applied technology — AI systems, data knowledge graphs,
                mathematical optimisation, quantum algorithms, and advanced
                computing models. Work here is honest about maturity.
              </p>
              <qm-button variant="secondary" size="md" [routerLinkValue]="'/labs'">
                Explore QuantsMind Labs →
              </qm-button>
            </div>
            <div class="labs-areas">
              @for (area of labsAreas; track area) {
                <div class="labs-area-card">
                  <div class="labs-area-card__name">{{ area.name }}</div>
                  <qm-badge [variant]="area.badgeVariant">{{ area.status }}</qm-badge>
                </div>
              }
            </div>
          </div>
        </qm-container>
      </qm-section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- INSIGHTS                                                 -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="canvas">
        <qm-container>
          <div class="section-header">
            <span class="eyebrow">INSIGHTS</span>
            <h2>Technical Thinking on Hard Problems.</h2>
          </div>
          <div class="insights-grid">
            @for (insight of insights; track insight) {
              <a [routerLink]="['/insights', insight.slug]" class="insight-card">
                <div class="insight-card__meta">
                  <qm-badge [variant]="insight.badge">{{ insight.category }}</qm-badge>
                  <span class="insight-card__time">{{ insight.readingTime }}</span>
                </div>
                <h3 class="insight-card__title">{{ insight.title }}</h3>
                <p class="insight-card__desc">{{ insight.description }}</p>
              </a>
            }
          </div>
          <div class="mt-8">
            <qm-button variant="outline" [routerLinkValue]="'/insights'">
              View All Insights →
            </qm-button>
          </div>
        </qm-container>
      </qm-section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- ABOUT SNIPPET                                            -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="subtle" size="sm">
        <qm-container size="narrow">
          <div class="about-snippet">
            <span class="eyebrow">ABOUT</span>
            <h2>Built Around Deep Technical Craft.</h2>
            <p class="lead">
              QuantsMind exists because complex technology problems deserve
              engineers who think carefully, design rigorously, and build
              systems worth maintaining. We are a technology engineering
              company — not a services marketplace.
            </p>
            <qm-button variant="secondary" [routerLinkValue]="'/about'">
              About QuantsMind →
            </qm-button>
          </div>
        </qm-container>
      </qm-section>
    
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- FINAL CTA                                                -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <qm-section surface="white" size="lg">
        <qm-container size="narrow">
          <div class="final-cta">
            <h2 class="final-cta__headline">
              Have a Complex Technology Challenge?
            </h2>
            <p class="final-cta__sub">
              Start with the problem — not the technology.
              We will help you understand it, architect a path through it,
              and engineer a solution worth building.
            </p>
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
              Talk to QuantsMind →
            </qm-button>
          </div>
        </qm-container>
      </qm-section>
    `,
    styles: [`
    /* ── HERO ── */
    .hero {
      padding: 80px 0 64px;
      background: #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
    }
    @media (min-width: 1024px) {
      .hero { padding: 112px 0 96px; }
    }

    .hero__layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 48px;
      align-items: center;
    }
    @media (min-width: 1024px) {
      .hero__layout { grid-template-columns: 1fr 1fr; gap: 64px; }
    }

    .hero__content { max-width: 600px; }

    .hero__headline {
      font-size: clamp(36px, 4.5vw, 56px);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.025em;
      color: #111827;
      margin: 0 0 24px;
      text-wrap: balance;
    }

    .hero__lead {
      font-size: 18px;
      line-height: 1.7;
      color: #475569;
      margin: 0 0 32px;
      text-wrap: pretty;
    }

    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 32px;
    }

    .hero__pillars {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      font-size: 13px;
      font-weight: 500;
      color: #64748B;
      letter-spacing: 0.02em;
    }
    .hero__pillars-dot { color: #CBD5E1; }

    .hero__diagram { display: none; }
    @media (min-width: 1024px) {
      .hero__diagram { display: block; }
      .hero__svg { width: 100%; max-width: 480px; height: auto; }
    }

    /* ── PROCESS ROW ── */
    .process-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 48px;
    }

    .process-row__step { display: flex; align-items: center; gap: 8px; }

    .process-row__label {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #475569;
      padding: 8px 16px;
      background: #F1F5F9;
      border-radius: 6px;
      border: 1px solid #E2E8F0;
    }

    .process-row__arrow {
      font-size: 16px;
      color: #2563EB;
      font-weight: 400;
    }

    /* ── SECTION HEADER ── */
    .section-header {
      margin-bottom: 48px;
      max-width: 640px;
    }
    .section-header.text-center {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    .section-header__lead { margin-top: 12px; }

    /* ── CAPABILITY GRID ── */
    .capability-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 640px) {
      .capability-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .capability-grid { grid-template-columns: repeat(3, 1fr); }
    }

    .capability-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 28px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      text-decoration: none;
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
    }
    .capability-card:hover {
      border-color: #BFDBFE;
      box-shadow: 0 4px 16px rgba(37,99,235,0.08);
      transform: translateY(-2px);
    }
    .capability-card:focus-visible {
      outline: 2px solid #2563EB;
      outline-offset: 3px;
    }

    .capability-card__icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #EFF6FF;
      border-radius: 10px;
      color: #2563EB;
    }
    .capability-card__title {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }
    .capability-card__desc {
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      margin: 0;
      flex: 1;
    }
    .capability-card__link {
      font-size: 13px;
      font-weight: 500;
      color: #2563EB;
      margin-top: 4px;
    }

    @media (prefers-reduced-motion: reduce) {
      .capability-card { transition: none; }
      .capability-card:hover { transform: none; }
    }

    /* ── ENTRY POINTS ── */
    .entry-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }
    @media (min-width: 768px) {
      .entry-row { grid-template-columns: repeat(3, 1fr); }
    }

    .entry-card {
      padding: 28px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
    }
    .entry-card__tag { margin-bottom: 16px; }
    .entry-card__title {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 10px;
    }
    .entry-card__desc {
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      margin: 0 0 16px;
    }
    .entry-card__link {
      font-size: 13px;
      font-weight: 500;
      color: #2563EB;
      text-decoration: none;
    }
    .entry-card__link:hover { text-decoration: underline; }

    /* ── TWO COL ── */
    .two-col {
      display: grid;
      grid-template-columns: 1fr;
      gap: 48px;
      align-items: start;
    }
    @media (min-width: 1024px) {
      .two-col { grid-template-columns: 1fr 1fr; }
    }
    .two-col__text { display: flex; flex-direction: column; gap: 16px; }
    .two-col__text p { margin: 0; }

    .principle-list { display: flex; flex-direction: column; gap: 16px; }
    .principle-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
    }
    .principle-item__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2563EB;
      flex-shrink: 0;
      margin-top: 5px;
    }
    .principle-item__title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 2px;
    }
    .principle-item__desc {
      font-size: 13px;
      color: #475569;
      line-height: 1.5;
    }

    /* ── PROBLEM GRID ── */
    .problem-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 640px) { .problem-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .problem-grid { grid-template-columns: repeat(3, 1fr); } }

    .problem-card {
      padding: 24px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
    }
    .problem-card__title {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 8px;
    }
    .problem-card__desc {
      font-size: 13px;
      line-height: 1.6;
      color: #475569;
      margin: 0;
    }

    /* ── TECH DOMAIN GRID ── */
    .tech-domain-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    @media (min-width: 1024px) {
      .tech-domain-grid { grid-template-columns: repeat(4, 1fr); }
    }

    .tech-domain-card {
      padding: 20px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      text-decoration: none;
      transition: border-color 150ms ease, background 150ms ease;
    }
    .tech-domain-card:hover {
      border-color: #BFDBFE;
      background: #EFF6FF;
    }
    .tech-domain-card:focus-visible {
      outline: 2px solid #2563EB;
      outline-offset: 2px;
    }
    .tech-domain-card__name {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 10px;
    }
    .tech-domain-card__items {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .tech-domain-card__item {
      font-size: 11px;
      color: #64748B;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 9999px;
      padding: 2px 8px;
    }

    /* ── LABS ── */
    .labs-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 48px;
      align-items: center;
    }
    @media (min-width: 1024px) {
      .labs-layout { grid-template-columns: 1fr 1fr; }
    }
    .labs-text { display: flex; flex-direction: column; gap: 20px; }
    .labs-text h2 { margin: 0; }
    .labs-text p  { margin: 0; }

    .labs-areas {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .labs-area-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 10px;
    }
    .labs-area-card__name {
      font-size: 14px;
      font-weight: 500;
      color: #F1F5F9;
    }

    /* ── INSIGHTS GRID ── */
    .insights-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 640px) {
      .insights-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .insights-grid { grid-template-columns: repeat(3, 1fr); }
    }

    .insight-card {
      display: block;
      padding: 24px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      text-decoration: none;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .insight-card:hover {
      border-color: #BFDBFE;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .insight-card:focus-visible {
      outline: 2px solid #2563EB;
      outline-offset: 3px;
    }
    .insight-card__meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .insight-card__time {
      font-size: 12px;
      color: #64748B;
    }
    .insight-card__title {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 8px;
      line-height: 1.4;
    }
    .insight-card__desc {
      font-size: 13px;
      line-height: 1.6;
      color: #475569;
      margin: 0;
    }

    /* ── ABOUT SNIPPET ── */
    .about-snippet { display: flex; flex-direction: column; gap: 20px; }
    .about-snippet h2 { margin: 0; }
    .about-snippet .lead { margin: 0; }

    /* ── FINAL CTA ── */
    .final-cta {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }
    .final-cta__headline {
      font-size: clamp(28px, 3.5vw, 44px);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #111827;
      margin: 0;
      text-wrap: balance;
    }
    .final-cta__sub {
      font-size: 18px;
      color: #475569;
      line-height: 1.7;
      max-width: 560px;
      margin: 0;
      text-wrap: pretty;
    }

    /* Utility */
    .text-center { text-align: center; }
    .mb-12 { margin-bottom: 48px; }
    .mt-8  { margin-top: 32px; }
    .eyebrow {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #2563EB;
      margin-bottom: 16px;
    }
    .lead {
      font-size: 18px;
      line-height: 1.7;
      color: #475569;
    }
  `]
})
export class HomeComponent {
  processSteps = ['Understand', 'Architect', 'Engineer', 'Integrate', 'Optimise', 'Evolve'];

  capabilities: Capability[] = [
    {
      id: 'enterprise-software',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      title: 'Enterprise Software',
      description: 'Mission-critical systems engineered for correctness, reliability, and long-term maintainability at organisational scale.',
      href: '/what-we-build'
    },
    {
      id: 'ai-engineering',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI Engineering',
      description: 'Applied artificial intelligence integrated into real products — not experimentation for its own sake, but intelligence that earns its place.',
      href: '/what-we-build'
    },
    {
      id: 'data-engineering',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
      title: 'Data Engineering',
      description: 'Pipelines, platforms, and analytical systems that transform raw data into reliable, queryable intelligence your organisation can act on.',
      href: '/what-we-build'
    },
    {
      id: 'cloud-engineering',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
      title: 'Cloud & Platform Engineering',
      description: 'Distributed systems and cloud infrastructure designed for scale, observability, and operational confidence.',
      href: '/what-we-build'
    },
    {
      id: 'modernization',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
      title: 'Enterprise Modernization',
      description: 'Systematic transformation of legacy platforms — reducing risk, increasing capability, and extending the life of critical systems.',
      href: '/what-we-build'
    },
    {
      id: 'advanced-computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      title: 'Advanced Computing',
      description: 'Optimisation, quantum computing, and specialised computation for problems where conventional approaches reach their limits.',
      href: '/what-we-build'
    }
  ];

  entryPoints = [
    {
      label: 'BUILD',
      badge: 'build' as const,
      title: 'Build Something New.',
      description: 'You have a clear vision for a system that does not yet exist. We architect and engineer it from first principles.'
    },
    {
      label: 'MODERNIZE',
      badge: 'modernize' as const,
      title: 'Transform Something Existing.',
      description: 'You have systems that are slowing you down, carrying risk, or limiting what your organisation can do. We evolve them.'
    },
    {
      label: 'EXPLORE',
      badge: 'explore' as const,
      title: 'Investigate a Difficult Problem.',
      description: 'You face a complex or emerging technology challenge where the right approach is not yet clear. We research and reason through it.'
    }
  ];

  principles = [
    { title: 'Architecture Before Implementation', desc: 'We reason about the system before we build it.' },
    { title: 'Correctness Over Speed',             desc: 'Systems that behave predictably under pressure.' },
    { title: 'Observability as a First-Class Concern', desc: 'Every system must be understood in production.' },
    { title: 'Built to Evolve',                    desc: 'Today\'s design must support tomorrow\'s requirements.' },
    { title: 'Security by Design',                 desc: 'Security is a structural decision, not an afterthought.' }
  ];

  problems = [
    { title: 'Complex Enterprise Systems',       desc: 'Multi-system integrations with competing data models, high transaction volumes, and strict correctness requirements.' },
    { title: 'Fragmented and Siloed Data',       desc: 'Data spread across incompatible systems with no reliable single source of truth.' },
    { title: 'Legacy Platform Risk',             desc: 'Critical systems built on aging foundations that are expensive to change and risky to run.' },
    { title: 'Intelligent Application Requirements', desc: 'Products that need to reason, predict, classify, or automate based on data and learned models.' },
    { title: 'Scaling Cloud Infrastructure',     desc: 'Distributed systems that must perform reliably under variable load with controlled cost.' },
    { title: 'Hard Optimisation Problems',       desc: 'Scheduling, routing, allocation, and planning problems where conventional solvers are insufficient.' }
  ];

  techDomains = [
    { name: 'Artificial Intelligence', href: '/technology#ai',
      items: ['LLMs', 'ML Platforms', 'RAG Systems', 'Computer Vision', 'NLP'] },
    { name: 'Data & Analytics', href: '/technology#data',
      items: ['Data Platforms', 'Streaming', 'Warehouses', 'Knowledge Graphs'] },
    { name: 'Cloud & Distributed', href: '/technology#cloud',
      items: ['Kubernetes', 'Event-Driven', 'Microservices', 'Serverless'] },
    { name: 'Software Systems', href: '/technology#software',
      items: ['Domain-Driven Design', 'API Design', 'Distributed Systems'] },
    { name: 'Optimisation', href: '/technology#optimization',
      items: ['Linear Programming', 'Metaheuristics', 'Constraint Solving'] },
    { name: 'Quantum Computing', href: '/technology#quantum',
      items: ['Quantum Algorithms', 'QAOA', 'Hybrid Quantum-Classical'] },
    { name: 'Advanced Computing', href: '/technology#advanced-computing',
      items: ['Specialised Compute', 'GPU Computing', 'Scientific Computing'] },
    { name: 'Security & Reliability', href: '/technology',
      items: ['Zero Trust', 'Observability', 'Resilience Engineering'] }
  ];

  labsAreas = [
    { name: 'AI Systems Research',        status: 'RESEARCH',     badgeVariant: 'research' as const },
    { name: 'Data & Knowledge Engineering', status: 'EXPERIMENTAL', badgeVariant: 'experimental' as const },
    { name: 'Mathematical Optimisation',   status: 'PROTOTYPE',    badgeVariant: 'prototype' as const },
    { name: 'Quantum Algorithms',          status: 'RESEARCH',     badgeVariant: 'research' as const },
    { name: 'Computing Systems',           status: 'CONCEPT',      badgeVariant: 'concept' as const }
  ];

  insights: InsightPreview[] = [
    {
      slug: 'designing-systems-that-can-be-reasoned-about',
      category: 'Architecture',
      badge: 'software',
      title: 'Designing Systems That Can Be Reasoned About',
      description: 'The most important property of a complex system is not performance or scalability — it is understandability. How we design for cognitive clarity.',
      readingTime: '8 min read'
    },
    {
      slug: 'when-to-use-an-llm-and-when-not-to',
      category: 'AI Engineering',
      badge: 'ai',
      title: 'When to Use an LLM and When Not To',
      description: 'Large language models are powerful but not universally appropriate. A framework for deciding where AI adds genuine value versus where it adds complexity.',
      readingTime: '6 min read'
    },
    {
      slug: 'beyond-greedy-thinking-about-hard-optimisation-problems',
      category: 'Optimisation',
      badge: 'optimization',
      title: 'Beyond Greedy: Thinking About Hard Optimisation Problems',
      description: 'When your scheduling or allocation problem grows to real-world scale, simple heuristics break down. An introduction to the landscape of optimisation methods.',
      readingTime: '10 min read'
    }
  ];
}
