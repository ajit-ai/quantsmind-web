import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { QmMarqueeComponent }   from '../../shared/components/qm-marquee/qm-marquee.component';
import { QmCountUpComponent }   from '../../shared/components/qm-count-up/qm-count-up.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';
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

interface DeliveryItem {
  title: string;
  description: string;
}

@Component({
    selector: 'app-home',
    imports: [
      RouterModule,
      QmContainerComponent,
      QmSectionComponent,
      QmButtonComponent,
      QmBadgeComponent,
      QmMarqueeComponent,
      QmCountUpComponent,
      QmRevealDirective,
      SafeHtmlPipe,
      HrefPartsPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- HERO                                                     -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="home-hero qm-aurora qm-precision-grid" aria-label="QuantsMind overview">
      <qm-container>
        <div class="home-hero__grid">
          <div class="home-hero__copy">
            <span class="eyebrow">QUANTSMIND · TECHNOLOGY ENGINEERING</span>
            <h1>
              Software engineering, AI and data solutions for
              <span class="qm-gradient-text">modern businesses.</span>
            </h1>
            <p class="home-hero__lead">
              QuantsMind helps organisations design, build, modernise and integrate
              software systems through architecture consulting, AI engineering, data
              platforms, cloud technologies and specialised technical development.
            </p>
            <div class="home-hero__actions">
              <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
                Discuss Your Requirement
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                    stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </qm-button>
              <qm-button variant="secondary" size="lg" [routerLinkValue]="'/services'">
                Explore Services
              </qm-button>
            </div>
            <div class="home-hero__values">
              <span>Architecture-led</span>
              <span>Simulation-first</span>
              <span>Production-minded</span>
            </div>
          </div>

          <!-- Decorative: connected engineering system map -->
          <div class="home-hero__visual" aria-hidden="true">
            <div class="home-hero__panel qm-glass-panel">
              <div class="home-hero__panel-head">
                <span class="home-hero__signal"><i></i> System map</span>
                <span class="home-hero__live">Live</span>
              </div>

              <div class="home-hero__orbit">
                <span class="home-hero__ring home-hero__ring--1"></span>
                <span class="home-hero__ring home-hero__ring--2"></span>
                <span class="home-hero__ring home-hero__ring--3"></span>

                <span class="home-hero__node home-hero__node--1"><i></i>Quantum</span>
                <span class="home-hero__node home-hero__node--2"><i></i>AI systems</span>
                <span class="home-hero__node home-hero__node--3"><i></i>Cloud</span>
                <span class="home-hero__node home-hero__node--4"><i></i>Security</span>
                <span class="home-hero__node home-hero__node--5"><i></i>Data</span>

                <div class="home-hero__core">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <g stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="10.5" cy="10.5" r="7" stroke-width="1.7"/>
                      <path d="M14.9 14.9 19.8 19.8" stroke-width="1.9"/>
                      <path d="M7.1 9.2 11.3 6.5 13.3 11.4" stroke-width="0.8" opacity="0.55"/>
                    </g>
                    <g fill="#fff">
                      <circle cx="7.1" cy="9.2" r="1.05"/>
                      <circle cx="11.3" cy="6.5" r="0.85"/>
                      <circle cx="13.3" cy="11.4" r="1.05"/>
                    </g>
                  </svg>
                  <span>QM</span>
                </div>
              </div>

              <div class="home-hero__panel-foot">
                <div><strong>06</strong><span>engineering domains</span></div>
                <div><strong>03</strong><span>published technologies</span></div>
                <div><strong>01</strong><span>released product</span></div>
              </div>
            </div>

            <span class="home-hero__float home-hero__float--a">Architecture-led</span>
            <span class="home-hero__float home-hero__float--b">Simulation-first</span>
          </div>
        </div>
      </qm-container>
    </section>

    <qm-marquee [items]="focusAreas" label="Areas of engineering focus"></qm-marquee>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- PROOF / STATS                                            -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="sm">
      <qm-container>
        <div class="qm-stat-strip" qmReveal>
          <div class="qm-stat">
            <span class="qm-stat__value"><qm-count-up [end]="6"></qm-count-up></span>
            <span class="qm-stat__label">engineering domains</span>
          </div>
          <div class="qm-stat">
            <span class="qm-stat__value"><qm-count-up [end]="40"></qm-count-up></span>
            <span class="qm-stat__label">portfolio products</span>
          </div>
          <div class="qm-stat">
            <span class="qm-stat__value"><qm-count-up [end]="3"></qm-count-up></span>
            <span class="qm-stat__label">published technologies</span>
          </div>
          <div class="qm-stat">
            <span class="qm-stat__value"><qm-count-up [end]="1"></qm-count-up></span>
            <span class="qm-stat__label">released product</span>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- WHAT WE DO                                              -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="canvas" size="lg">
      <qm-container>
        <div class="qm-section-head">
          <div class="qm-section-head__copy">
            <span class="eyebrow">WHAT WE DO</span>
            <h2>Engineering capabilities, connected.</h2>
            <p>
              Clear, practical engineering across the core disciplines that building
              software depends on.
            </p>
          </div>
          <div class="qm-section-head__aside">
            <qm-button variant="outline" [routerLinkValue]="'/services'">
              All Services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </qm-button>
          </div>
        </div>

        <div class="cap-bento">
          @for (cap of capabilities; track cap; let i = $index) {
            @let capLink = cap.href | hrefParts;
            <a [routerLink]="capLink.path" [fragment]="capLink.fragment"
              class="qm-bento-card cap-card"
              [class.qm-bento-card--dark]="i === 0"
              [class.qm-bento-card--tint]="i === 1"
              [class.cap-card--feature]="i < 2"
              [attr.aria-label]="cap.title"
              qmReveal
              [qmRevealDelay]="i * 70">
              <div class="cap-card__top">
                <span class="qm-bento-card__index">0{{ i + 1 }}</span>
                <span class="cap-card__icon" aria-hidden="true" [innerHTML]="cap.icon | qmSafeHtml"></span>
              </div>
              <h3>{{ cap.title }}</h3>
              <p>{{ cap.description }}</p>
              <span class="qm-bento-card__link">Explore service →</span>
            </a>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- WHAT WE DELIVER                                          -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="subtle" size="lg">
      <qm-container>
        <div class="delivery-layout">
          <div class="delivery-intro" qmReveal>
            <span class="eyebrow">WHAT WE DELIVER</span>
            <h2>Capabilities you can engage.</h2>
            <p>
              Practical outcomes QuantsMind can design, build and deliver with you.
            </p>
            <div class="delivery-intro__note">
              <span class="delivery-intro__count">06</span>
              <span>delivery tracks, selected to fit the requirement</span>
            </div>
          </div>

          <div class="delivery-list">
            @for (item of deliveryItems; track item.title; let i = $index) {
              <article class="delivery-item" qmReveal [qmRevealDelay]="i * 55">
                <span class="delivery-item__index">0{{ i + 1 }}</span>
                <div class="delivery-item__body">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                </div>
                <span class="delivery-item__arrow" aria-hidden="true">↗</span>
              </article>
            }
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- TECHNOLOGY ECOSYSTEM                                     -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="lg">
      <qm-container>
        <div class="qm-section-head">
          <div class="qm-section-head__copy">
            <span class="eyebrow">TECHNOLOGY ECOSYSTEM</span>
            <h2>Technologies we develop.</h2>
            <p>
              Alongside engineering services, QuantsMind develops and maintains its own
              software technologies. Each has a published, versioned release.
            </p>
          </div>
          <div class="qm-section-head__aside">
            <qm-button variant="outline" [routerLinkValue]="'/technology'">
              View the Ecosystem
            </qm-button>
          </div>
        </div>

        <div class="tech-showcase">
          <div class="tech-map" aria-hidden="true" qmReveal>
            <div class="tech-map__head">
              <span class="home-hero__signal"><i></i> Ecosystem topology</span>
              <span class="tech-map__version">v1.1.0</span>
            </div>
            <svg viewBox="0 0 460 330" role="presentation" focusable="false">
              <defs>
                <linearGradient id="qmTechLine" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#2563EB"/>
                  <stop offset="55%" stop-color="#06B6D4"/>
                  <stop offset="100%" stop-color="#5EEAD4"/>
                </linearGradient>
                <radialGradient id="qmTechCore" cx="35%" cy="30%" r="80%">
                  <stop offset="0%" stop-color="#60A5FA"/>
                  <stop offset="55%" stop-color="#2563EB"/>
                  <stop offset="100%" stop-color="#4F46E5"/>
                </radialGradient>
                <filter id="qmTechGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="7" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <g fill="none" stroke="url(#qmTechLine)" stroke-width="1.3" opacity="0.72">
                <path class="tech-map__path" d="M230 165 C 166 118, 128 98, 86 82"/>
                <path class="tech-map__path" d="M230 165 C 302 116, 338 98, 382 82"/>
                <path class="tech-map__path" d="M230 165 C 174 216, 130 242, 92 266"/>
                <path class="tech-map__path" d="M230 165 C 292 216, 336 242, 374 266"/>
              </g>

              <circle cx="230" cy="165" r="52" fill="rgba(37,99,235,0.12)" filter="url(#qmTechGlow)"/>
              <circle cx="230" cy="165" r="44" fill="url(#qmTechCore)" stroke="rgba(255,255,255,0.5)"/>
              <text x="230" y="161" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">QuantsMind</text>
              <text x="230" y="177" text-anchor="middle" font-size="9" letter-spacing="1.2" fill="rgba(255,255,255,0.72)">ECOSYSTEM</text>

              <g>
                <circle cx="86" cy="82" r="26" fill="#EFF6FF" stroke="#BFDBFE"/>
                <text x="86" y="86" text-anchor="middle" font-size="9" font-weight="700" fill="#1D4ED8">MQ</text>
                <text x="86" y="124" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">MicroQuantum</text>
              </g>
              <g>
                <circle cx="382" cy="82" r="26" fill="#F5F3FF" stroke="#C4B5FD"/>
                <text x="382" y="86" text-anchor="middle" font-size="9" font-weight="700" fill="#5B21B6">K</text>
                <text x="382" y="124" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Karkain</text>
              </g>
              <g>
                <circle cx="92" cy="266" r="26" fill="#F0FDFA" stroke="#99F6E4"/>
                <text x="92" y="270" text-anchor="middle" font-size="9" font-weight="700" fill="#0F766E">SDK</text>
                <text x="92" y="308" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">QuantsMind SDK</text>
              </g>
              <g>
                <circle cx="374" cy="266" r="26" fill="#FFF7ED" stroke="#FED7AA"/>
                <text x="374" y="270" text-anchor="middle" font-size="9" font-weight="700" fill="#C2410C">DB</text>
                <text x="374" y="308" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Relational DB</text>
              </g>
            </svg>
          </div>

          <div class="tech-list">
            @for (tech of ecosystem; track tech.name; let i = $index) {
              <article class="tech-row" qmReveal [qmRevealDelay]="i * 80">
                <div class="tech-row__head">
                  <h3>{{ tech.name }}</h3>
                  <qm-badge [variant]="tech.badge">{{ tech.status }}</qm-badge>
                </div>
                <div class="tech-row__meta">
                  <span class="tech-row__tagline">{{ tech.tagline }}</span>
                  <span class="tech-row__version">{{ tech.version }}</span>
                </div>
                <p>{{ tech.description }}</p>
                <a [routerLink]="tech.href" class="tech-row__link">{{ tech.cta }} →</a>
              </article>
            }
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- PRODUCTS & DEVELOPER TOOLS                             -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="subtle" size="lg">
      <qm-container>
        <div class="products-layout">
          <div class="products-intro" qmReveal>
            <span class="eyebrow">PRODUCTS &amp; DEVELOPER TOOLS</span>
            <h2>Also available.</h2>
            <p>
              A released product, and the tooling we publish for the technologies above.
            </p>
            <qm-button variant="secondary" [routerLinkValue]="'/products'">
              Explore Products
            </qm-button>
          </div>

          <div class="products-cards">
            @for (item of productsAndTools; track item.label; let i = $index) {
              @let itemLink = item.href | hrefParts;
              <a [routerLink]="itemLink.path" [fragment]="itemLink.fragment" class="product-link"
                [attr.aria-label]="item.name + ': ' + item.label"
                qmReveal
                [qmRevealDelay]="i * 90">
                <span class="product-link__kind">{{ item.name }}</span>
                <h3>{{ item.label }}</h3>
                <p>{{ item.description }}</p>
                <span class="product-link__cta">Learn more <span aria-hidden="true">→</span></span>
                <span class="product-link__mark" aria-hidden="true">0{{ i + 1 }}</span>
              </a>
            }
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- QUANTSMIND LABS                                         -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="labs-band" aria-labelledby="home-labs-title">
      <div class="labs-band__glow" aria-hidden="true"></div>
      <qm-container>
        <div class="labs-band__grid">
          <div class="labs-band__copy" qmReveal>
            <span class="eyebrow">QUANTSMIND LABS</span>
            <h2 id="home-labs-title">Where we explore emerging technologies.</h2>
            <p>
              QuantsMind Labs is where we explore emerging technologies, experimental
              architectures and new computing approaches.
            </p>
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/labs'">
              Explore Labs
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </qm-button>
          </div>

          <div class="labs-visual" aria-hidden="true">
            <div class="labs-visual__ring labs-visual__ring--1"></div>
            <div class="labs-visual__ring labs-visual__ring--2"></div>
            <div class="labs-visual__ring labs-visual__ring--3"></div>
            <div class="labs-visual__core">
              <span>LABS</span>
              <small>research</small>
            </div>
            <span class="labs-visual__node labs-visual__node--1">Quantum</span>
            <span class="labs-visual__node labs-visual__node--2">Languages</span>
            <span class="labs-visual__node labs-visual__node--3">AI / ML</span>
            <span class="labs-visual__node labs-visual__node--4">Scientific</span>
          </div>
        </div>

        <div class="labs-band__areas" qmReveal>
          @for (area of labsAreas; track area; let i = $index) {
            <span class="labs-area">
              <span class="labs-area__index">0{{ i + 1 }}</span>
              {{ area }}
            </span>
          }
        </div>
      </qm-container>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- WHY QUANTSMIND                                          -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="lg">
      <qm-container>
        <div class="why-layout">
          <div class="why-intro" qmReveal>
            <span class="eyebrow">WHY QUANTSMIND</span>
            <h2>How we work.</h2>
            <p>
              A practical engineering posture: sound architecture, real software and
              careful exploration of what comes next.
            </p>
          </div>
          <div class="why-grid">
            @for (why of whyCards; track why.title; let i = $index) {
              <article class="why-card" qmReveal [qmRevealDelay]="i * 70">
                <span class="why-card__index">0{{ i + 1 }}</span>
                <h3>{{ why.title }}</h3>
                <p>{{ why.description }}</p>
              </article>
            }
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- FINAL CTA                                               -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="canvas" size="lg">
      <qm-container>
        <div class="qm-cta-band" qmReveal>
          <span class="eyebrow">WORK WITH US</span>
          <h2>Let's build something useful.</h2>
          <p>
            Have an engineering requirement, technology challenge or collaboration
            idea? Get in touch with QuantsMind.
          </p>
          <div class="qm-cta-band__actions">
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
              Discuss an Engineering Requirement
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </qm-button>
          </div>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    /* ── HERO ───────────────────────────────────────────── */
    .home-hero {
      padding: 64px 0 56px;
      border-bottom: 1px solid var(--color-border);
    }
    .home-hero__grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 48px;
      align-items: center;
    }
    .home-hero__copy { min-width: 0; max-width: 780px; }
    .home-hero h1 {
      margin: 0 0 24px;
      font-size: clamp(42px, 5.2vw, 68px);
      line-height: 1.02;
      letter-spacing: -0.045em;
      max-width: 820px;
    }
    .home-hero__lead {
      margin: 0 0 32px;
      max-width: 640px;
      font-size: clamp(17px, 1.35vw, 20px);
      line-height: 1.7;
      color: var(--color-text-secondary);
      text-wrap: pretty;
    }
    .home-hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .home-hero__values {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 20px;
      margin-top: 30px;
      color: var(--color-text-muted);
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.02em;
    }
    .home-hero__values span {
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }
    .home-hero__values span::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--gradient-signal);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
    }

    .home-hero__visual { display: none; position: relative; }
    /* ── CAPABILITY BENTO ───────────────────────────────── */
    .cap-bento {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
    }
    .cap-card { min-height: 232px; }
    .cap-card__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .cap-card__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 12px;
      border: 1px solid rgba(37, 99, 235, 0.16);
      background: rgba(239, 246, 255, 0.9);
      color: var(--color-accent);
    }
    .cap-card.qm-bento-card--dark .cap-card__icon {
      border-color: rgba(103, 232, 249, 0.22);
      background: rgba(6, 182, 212, 0.10);
      color: var(--color-cyan-soft);
    }
    .cap-card h3 { margin-top: 4px; }

    /* ── DELIVERY ───────────────────────────────────────── */
    .delivery-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 40px;
    }
    .delivery-intro h2 {
      margin: 0 0 16px;
      font-size: clamp(30px, 3.4vw, 48px);
      line-height: 1.08;
      letter-spacing: -0.03em;
    }
    .delivery-intro p {
      margin: 0;
      max-width: 420px;
      font-size: 17px;
      line-height: 1.7;
    }
    .delivery-intro__note {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 28px;
      padding-top: 22px;
      border-top: 1px solid var(--color-border);
      max-width: 380px;
      color: var(--color-text-muted);
      font-size: 12px;
      line-height: 1.5;
    }
    .delivery-intro__count {
      font-family: 'Sora', 'Inter', system-ui, sans-serif;
      font-size: 32px;
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.04em;
      color: var(--color-accent);
    }
    .delivery-list { border-top: 1px solid var(--color-border); }
    .delivery-item {
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr) auto;
      gap: 16px;
      align-items: start;
      padding: 22px 8px;
      border-bottom: 1px solid var(--color-border);
      transition: background-color 220ms ease, padding-left 220ms ease;
    }
    .delivery-item:hover {
      background: rgba(255, 255, 255, 0.62);
      padding-left: 16px;
    }
    .delivery-item__index {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-muted);
      padding-top: 4px;
    }
    .delivery-item__body h3 {
      margin: 0 0 7px;
      font-size: 16px;
      line-height: 1.35;
      letter-spacing: -0.015em;
    }
    .delivery-item__body p {
      margin: 0;
      font-size: 13px;
      line-height: 1.65;
      color: var(--color-text-secondary);
    }
    .delivery-item__arrow {
      color: var(--color-text-muted);
      font-size: 16px;
      transition: color 180ms ease, transform 180ms ease;
    }
    .delivery-item:hover .delivery-item__arrow {
      color: var(--color-accent);
      transform: translate(2px, -2px);
    }

    /* ── TECHNOLOGY MAP ─────────────────────────────────── */
    .tech-showcase {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 32px;
      align-items: start;
    }
    .tech-map {
      position: relative;
      overflow: hidden;
      padding: 18px;
      border-radius: var(--radius-xl);
      border: 1px solid rgba(148, 197, 255, 0.18);
      background:
        radial-gradient(500px 300px at 80% 0%, rgba(6, 182, 212, 0.18), transparent 60%),
        var(--gradient-ink);
      box-shadow: var(--shadow-float);
    }
    .tech-map__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 4px;
    }
    .tech-map .home-hero__signal { color: rgba(159, 179, 207, 0.85); }
    .tech-map__version {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px;
      color: var(--color-cyan-soft);
    }
    .tech-map svg { width: 100%; height: auto; }
    .tech-map__path {
      stroke-dasharray: 7 7;
      animation: tech-dash 18s linear infinite;
    }
    .tech-list { display: flex; flex-direction: column; }
    .tech-row {
      padding: 22px 4px;
      border-bottom: 1px solid var(--color-border);
    }
    .tech-row:first-child { padding-top: 0; }
    .tech-row__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tech-row__head h3 {
      margin: 0;
      font-size: 20px;
      letter-spacing: -0.025em;
    }
    .tech-row__meta {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin: 5px 0 10px;
    }
    .tech-row__tagline {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-accent);
    }
    .tech-row__version {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px;
      color: var(--color-text-muted);
    }
    .tech-row p {
      margin: 0 0 10px;
      font-size: 13px;
      line-height: 1.65;
    }
    .tech-row__link {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-accent);
    }
    .tech-row__link:hover { text-decoration: underline; }

    /* ── PRODUCTS ───────────────────────────────────────── */
    .products-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 32px;
      align-items: start;
    }
    .products-intro h2 {
      margin: 0 0 16px;
      font-size: clamp(30px, 3.4vw, 48px);
      line-height: 1.08;
      letter-spacing: -0.03em;
    }
    .products-intro p {
      margin: 0 0 24px;
      max-width: 400px;
      font-size: 17px;
      line-height: 1.7;
    }
    .products-cards {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
    }
    .product-link {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 250px;
      padding: 28px;
      overflow: hidden;
      border-radius: var(--radius-xl);
      border: 1px solid var(--color-border);
      background: rgba(255, 255, 255, 0.82);
      box-shadow: var(--shadow-xs);
      text-decoration: none;
      transition: transform 300ms var(--qm-ease-out), box-shadow 300ms var(--qm-ease-out), border-color 300ms var(--qm-ease-out);
    }
    .product-link::before {
      content: '';
      position: absolute;
      inset: 0 0 auto;
      height: 3px;
      background: var(--gradient-signal);
      opacity: 0.8;
    }
    .product-link:hover {
      transform: translateY(-4px);
      border-color: rgba(37, 99, 235, 0.24);
      box-shadow: var(--shadow-xl);
    }
    .product-link__kind {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-accent);
    }
    .product-link h3 {
      margin: 14px 0 10px;
      font-size: 20px;
      line-height: 1.3;
      letter-spacing: -0.025em;
      max-width: 340px;
    }
    .product-link p {
      margin: 0 0 24px;
      font-size: 13px;
      line-height: 1.65;
      color: var(--color-text-secondary);
      max-width: 400px;
    }
    .product-link__cta {
      margin-top: auto;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-accent);
    }
    .product-link__mark {
      position: absolute;
      right: 22px;
      bottom: 12px;
      font-family: 'Sora', 'Inter', system-ui, sans-serif;
      font-size: 64px;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.06em;
      color: rgba(37, 99, 235, 0.055);
      pointer-events: none;
    }

    /* ── LABS BAND ──────────────────────────────────────── */
    .labs-band {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      padding: 80px 0 64px;
      background:
        radial-gradient(800px 420px at 82% 0%, rgba(13, 148, 136, 0.26), transparent 62%),
        radial-gradient(620px 380px at 6% 110%, rgba(37, 99, 235, 0.16), transparent 62%),
        var(--gradient-ink);
      color: var(--color-ink-text);
    }
    .labs-band__glow {
      position: absolute;
      right: -140px;
      top: -180px;
      width: 480px;
      height: 480px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(45, 212, 191, 0.18), transparent 68%);
      filter: blur(20px);
      pointer-events: none;
    }
    .labs-band__grid {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 40px;
      align-items: center;
    }
    .labs-band .eyebrow { color: var(--color-labs-bright); }
    .labs-band .eyebrow::before { background: linear-gradient(90deg, var(--color-labs-soft), var(--color-cyan)); }
    .labs-band__copy h2 {
      margin: 0 0 18px;
      max-width: 560px;
      color: var(--color-ink-text);
      font-size: clamp(32px, 3.8vw, 52px);
      line-height: 1.07;
      letter-spacing: -0.035em;
    }
    .labs-band__copy p {
      margin: 0 0 28px;
      max-width: 500px;
      color: var(--color-ink-muted);
      font-size: 17px;
      line-height: 1.7;
    }
    .labs-visual {
      position: relative;
      width: 100%;
      max-width: 430px;
      aspect-ratio: 1;
      margin: 0 auto;
      display: grid;
      place-items: center;
    }
    .labs-visual__ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(94, 234, 212, 0.20);
      animation: qm-orbit-spin 28s linear infinite;
    }
    .labs-visual__ring--1 { inset: 4%; }
    .labs-visual__ring--2 {
      inset: 20%;
      border-color: rgba(103, 232, 249, 0.16);
      animation-duration: 20s;
      animation-direction: reverse;
    }
    .labs-visual__ring--3 { inset: 36%; border-color: rgba(94, 234, 212, 0.14); animation-duration: 14s; }
    .labs-visual__ring::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -3px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-labs-bright);
      box-shadow: 0 0 0 5px rgba(94, 234, 212, 0.08), 0 0 18px rgba(94, 234, 212, 0.5);
    }
    .labs-visual__core {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 30%;
      aspect-ratio: 1;
      border-radius: 50%;
      background:
        radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.08) 42%),
        linear-gradient(145deg, #0D9488, #0891B2 55%, #2563EB);
      box-shadow: 0 28px 64px -18px rgba(13, 148, 136, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.4);
      color: #fff;
    }
    .labs-visual__core span {
      font-family: 'Sora', 'Inter', system-ui, sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.12em;
    }
    .labs-visual__core small {
      font-size: 8px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.68);
    }
    .labs-visual__node {
      position: absolute;
      z-index: 3;
      padding: 7px 12px;
      border-radius: 999px;
      border: 1px solid rgba(94, 234, 212, 0.2);
      background: rgba(11, 27, 51, 0.78);
      color: var(--color-labs-bright);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.02em;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      animation: qm-float 8s ease-in-out infinite;
    }
    .labs-visual__node--1 { top: 6%; left: 12%; }
    .labs-visual__node--2 { top: 24%; right: 0; animation-delay: -3s; }
    .labs-visual__node--3 { bottom: 18%; left: -2%; animation-delay: -5s; }
    .labs-visual__node--4 { bottom: 5%; right: 10%; animation-delay: -2s; }
    .labs-band__areas {
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 24px;
      margin-top: 56px;
      padding-top: 8px;
      border-top: 1px solid rgba(94, 234, 212, 0.16);
    }
    .labs-area {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 13px 0;
      border-bottom: 1px solid rgba(148, 197, 255, 0.10);
      color: var(--color-ink-muted);
      font-size: 12px;
      font-weight: 500;
    }
    .labs-area__index {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 9px;
      color: rgba(94, 234, 212, 0.65);
    }

    /* ── WHY ────────────────────────────────────────────── */
    .why-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 36px;
    }
    .why-intro h2 {
      margin: 0 0 16px;
      font-size: clamp(30px, 3.4vw, 48px);
      line-height: 1.08;
      letter-spacing: -0.03em;
    }
    .why-intro p {
      margin: 0;
      max-width: 420px;
      font-size: 17px;
      line-height: 1.7;
    }
    .why-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1px;
      background: var(--color-border);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .why-card {
      padding: 26px;
      background: var(--color-surface);
      transition: background-color 220ms ease;
    }
    .why-card:hover { background: #F8FBFF; }
    .why-card__index {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px;
      font-weight: 600;
      color: var(--color-accent);
    }
    .why-card h3 {
      margin: 14px 0 8px;
      font-size: 17px;
      letter-spacing: -0.02em;
    }
    .why-card p {
      margin: 0;
      font-size: 13px;
      line-height: 1.65;
      color: var(--color-text-secondary);
    }

    /* ── MOTION ─────────────────────────────────────────── */
    @keyframes tech-dash { to { stroke-dashoffset: -140; } }

    @media (min-width: 640px) {
      .cap-bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }

    @media (min-width: 768px) {
      .home-hero { padding: 80px 0 64px; }
      .home-hero__visual { display: block; max-width: 520px; margin: 0 auto; }
      .products-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .labs-band__areas { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }

    @media (min-width: 1024px) {
      .home-hero { padding: 92px 0 76px; }
      .home-hero__grid {
        grid-template-columns: minmax(0, 1.02fr) minmax(420px, 0.98fr);
        gap: 56px;
      }
      .home-hero__visual { max-width: none; margin: 0; }
      .cap-bento { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .cap-card--feature { grid-column: span 2; }
      .delivery-layout { grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr); gap: 72px; }
      .tech-showcase { grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr); gap: 56px; }
      .products-layout { grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr); gap: 64px; }
      .labs-band__grid { grid-template-columns: minmax(0, 1.05fr) minmax(380px, 0.95fr); gap: 64px; }
      .labs-band__areas { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .why-layout { grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr); gap: 72px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .home-hero__ring,
      .home-hero__node,
      .home-hero__float,
      .home-hero__signal i,
      .labs-visual__ring,
      .labs-visual__node,
      .tech-map__path {
        animation: none;
      }
      .delivery-item,
      .product-link,
      .why-card { transition: none; }
    }
  `]
})
export class HomeComponent {
  focusAreas = [
    'Quantum Computing & Quantum Software Engineering',
    'Space Systems & Mission Software Engineering',
    'AI Engineering & Autonomous Intelligent Systems',
    'Scientific Computing & Digital Simulation',
    'Cybersecurity Engineering & Digital Trust',
    'Industrial Intelligence & Digital Twin Engineering'
  ];

  capabilities: Capability[] = [
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>`,
      title: 'Quantum Computing & Quantum Software Engineering',
      description: 'Quantum circuit software engineering, simulation, algorithm experimentation, and quantum-classical workflows.',
      href: '/services#quantum-computing'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><path d="M2 12h4M18 12h4"/></svg>`,
      title: 'Space Systems & Mission Software Engineering',
      description: 'Ground-segment operations, telemetry processing, mission-support workflows, and satellite engineering data.',
      href: '/services#space-systems'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI Engineering & Autonomous Intelligent Systems',
      description: 'Intelligent software, AI integrations, controlled agent workflows, and reliable AI-enabled applications.',
      href: '/services#ai-intelligent-systems'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 16l4-8 4 8"/><path d="M9 14h6"/></svg>`,
      title: 'Scientific Computing & Digital Simulation',
      description: 'Numerical software, scientific workflows, modelling systems, and computational simulations.',
      href: '/services#scientific-computing'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      title: 'Cybersecurity Engineering & Digital Trust',
      description: 'Security-focused software, security analysis workflows, integrity verification, and trustworthy digital systems.',
      href: '/services#cybersecurity-digital-trust'
    },
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="14" r="2"/></svg>`,
      title: 'Industrial Intelligence & Digital Twin Engineering',
      description: 'Industrial data systems, operational intelligence software, digital simulation models, and digital twin integration workflows.',
      href: '/services#industrial-intelligence-digital-twin'
    },
  ];

  deliveryItems: DeliveryItem[] = [
    {
      title: 'Software Architecture & Modernisation',
      description: 'System design, legacy modernisation, architecture reviews and engineering guidance for teams building or evolving software platforms.'
    },
    {
      title: 'AI & Intelligent Automation',
      description: 'Practical AI/ML application development, intelligent systems and integration of modern AI technologies into existing workflows.'
    },
    {
      title: 'Data Engineering & Analytics',
      description: 'Data platforms, pipelines and analytics foundations that support informed decision-making and operational reporting.'
    },
    {
      title: 'Cloud & Infrastructure Engineering',
      description: 'Cloud architecture, deployment, CI/CD, infrastructure automation and engineering environments across AWS, Azure and GCP.'
    },
    {
      title: 'Specialised Software Development',
      description: 'Custom software development for domains where general-purpose off-the-shelf tools do not fit the problem.'
    },
    {
      title: 'Quantum Software Experimentation',
      description: 'Quantum program and algorithm development, classical simulation of circuits and hybrid optimisation workflows for feasibility exploration.'
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
