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

import { BLOG_ARTICLES } from '../blog/articles';
import { BlogArticle } from '../blog/blog-article.model';
import { getProductById, getProductsByPortfolio } from '../../content/products/product.registry';
import {
  Product,
  maturityLabel,
  availabilityLabel,
  maturityBadgeVariant
} from '../../content/products/product.model';

interface Capability {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface TrustMetric {
  value: number;
  label: string;
}

interface FeaturedProduct {
  product: Product;
  href: string;
  maturity: string;
  availability: string;
  maturityVariant: BadgeVariant;
  portfolio: string;
}

interface EcosystemTech {
  name: string;
  tagline: string;
  description: string;
  status: string;
  version: string;
  badge: BadgeVariant;
  accent: 'blue' | 'violet' | 'teal';
  mark: string;
  cta: string;
  href: string;
}

interface WhyCard {
  icon: string;
  title: string;
  description: string;
}

interface FeaturedSelection {
  id: string;
  href: string;
}

const FEATURED_SELECTION: readonly FeaturedSelection[] = [
  { id: 'quantsmind-document-intelligence-mini', href: '/products' },
  { id: 'microquantum', href: '/microquantum' },
  { id: 'quantum-studio', href: '/quantum-mission' },
  { id: 'ground-link', href: '/products#space-software' },
  { id: 'threat-intel', href: '/products#cybersecurity-software' },
  { id: 'ai-guard', href: '/products#cybersecurity-software' }
];

const INSIGHT_SLUGS: readonly string[] = [
  'quantsmind-document-intelligence-mini',
  'karkain',
  'vsector'
];

const PORTFOLIO_LABELS: Readonly<Record<Product['portfolio'], string>> = {
  standalone: 'Product',
  quantum: 'Quantum',
  space: 'Space Systems',
  cybersecurity: 'Cybersecurity'
};

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
    <!-- 01 · HERO                                                -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="home-hero qm-aurora qm-precision-grid" aria-label="QuantsMind overview">
      <qm-container>
        <div class="home-hero__grid">
          <div class="home-hero__copy">
            <span class="eyebrow">QUANTSMIND · TECHNOLOGY ENGINEERING</span>
            <h1>
              Engineering Intelligent Software for a
              <span class="qm-gradient-text">Changing World.</span>
            </h1>
            <p class="home-hero__lead">
              We build software products, intelligent systems and advanced engineering
              solutions for businesses and emerging technology domains.
            </p>
            <div class="home-hero__actions">
              <qm-button variant="primary" size="lg" [routerLinkValue]="'/products'">
                Explore Our Products
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                    stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </qm-button>
              <qm-button variant="secondary" size="lg" [routerLinkValue]="'/contact'">
                Discuss Your Project
              </qm-button>
            </div>
            <div class="home-hero__values">
              <span>Products</span>
              <span>Intelligent systems</span>
              <span>Advanced engineering</span>
            </div>
          </div>

          <!-- Decorative: connected engineering system map -->
          <div class="home-hero__visual" aria-hidden="true">
            <div class="home-hero__panel qm-glass-panel">
              <div class="home-hero__panel-head">
                <span class="home-hero__signal"><i></i> Engineering system map</span>
                <span class="home-hero__live">Live</span>
              </div>

              <div class="home-hero__orbit">
                <span class="home-hero__ring home-hero__ring--1"></span>
                <span class="home-hero__ring home-hero__ring--2"></span>
                <span class="home-hero__ring home-hero__ring--3"></span>

                <span class="home-hero__node home-hero__node--1"><i></i>Quantum</span>
                <span class="home-hero__node home-hero__node--2"><i></i>AI systems</span>
                <span class="home-hero__node home-hero__node--3"><i></i>Space</span>
                <span class="home-hero__node home-hero__node--4"><i></i>Security</span>
                <span class="home-hero__node home-hero__node--5"><i></i>Digital twins</span>

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
                <div><strong>40</strong><span>portfolio products</span></div>
                <div><strong>03</strong><span>published technologies</span></div>
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
    <!-- 02 · TRUST AND CAPABILITIES                              -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="sm" ariaLabel="Trust and capabilities">
      <qm-container>
        <div class="trust-panel">
          <div class="trust-head" qmReveal>
            <div>
              <span class="eyebrow">TRUST &amp; CAPABILITIES</span>
              <h2>Engineering depth, across connected domains.</h2>
            </div>
            <p>
              QuantsMind combines product engineering with advanced technology
              development. Our portfolio spans software applications, quantum
              software, space systems, AI, scientific computing and cybersecurity.
            </p>
          </div>

          <div class="qm-stat-strip" qmReveal>
            @for (metric of trustMetrics; track metric.label) {
              <div class="qm-stat">
                <span class="qm-stat__value"><qm-count-up [end]="metric.value"></qm-count-up></span>
                <span class="qm-stat__label">{{ metric.label }}</span>
              </div>
            }
          </div>

          <div class="trust-values" qmReveal>
            <span class="trust-value">Architecture-led</span>
            <span class="trust-value">Simulation-first</span>
            <span class="trust-value">Production-minded</span>
            <span class="trust-value">Open technology where appropriate</span>
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 03 · ENGINEERING SERVICES                                -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="canvas" size="md" ariaLabel="Engineering services">
      <qm-container>
        <div class="qm-section-head">
          <div class="qm-section-head__copy">
            <span class="eyebrow">ENGINEERING SERVICES</span>
            <h2>Six domains. One engineering discipline.</h2>
            <p>
              Focused capabilities for organisations building software in demanding
              or emerging technology domains.
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

        <div class="service-grid">
          @for (cap of capabilities; track cap.title; let i = $index) {
            @let capLink = cap.href | hrefParts;
            <a [routerLink]="capLink.path" [fragment]="capLink.fragment"
              class="home-card service-card"
              [attr.aria-label]="cap.title"
              qmReveal
              [qmRevealDelay]="i * 60">
              <div class="service-card__top">
                <span class="service-card__icon" aria-hidden="true" [innerHTML]="cap.icon | qmSafeHtml"></span>
                <span class="service-card__index">0{{ i + 1 }}</span>
              </div>
              <h3>{{ cap.title }}</h3>
              <p>{{ cap.description }}</p>
              <span class="service-card__link">Explore service <span aria-hidden="true">→</span></span>
            </a>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 04 · FEATURED PRODUCTS                                   -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="subtle" size="md" ariaLabel="Featured products">
      <qm-container>
        <div class="qm-section-head">
          <div class="qm-section-head__copy">
            <span class="eyebrow">FEATURED PRODUCTS</span>
            <h2>A balanced view of the product portfolio.</h2>
            <p>
              Selected applications and initiatives from the central QuantsMind
              product registry, shown with their current maturity and availability.
            </p>
          </div>
          <div class="qm-section-head__aside">
            <qm-button variant="outline" [routerLinkValue]="'/products'">
              Explore All Products
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </qm-button>
          </div>
        </div>

        <div class="featured-grid">
          @for (item of featuredProducts; track item.product.id; let i = $index) {
            @let productLink = item.href | hrefParts;
            <article class="home-card featured-card" qmReveal [qmRevealDelay]="i * 55">
              <div class="featured-card__top">
                <span class="featured-card__portfolio">{{ item.portfolio }}</span>
                <qm-badge [variant]="item.maturityVariant">{{ item.maturity }}</qm-badge>
              </div>
              <h3>{{ item.product.name }}</h3>
              <p>{{ item.product.summary }}</p>
              <dl class="featured-card__meta">
                <div>
                  <dt>Availability</dt>
                  <dd>{{ item.availability }}</dd>
                </div>
                @if (item.product.version) {
                  <div>
                    <dt>Version</dt>
                    <dd>{{ item.product.version }}</dd>
                  </div>
                }
              </dl>
              <a class="featured-card__link"
                [routerLink]="productLink.path"
                [fragment]="productLink.fragment"
                [attr.aria-label]="'View ' + item.product.name">
                View product <span aria-hidden="true">→</span>
              </a>
            </article>
          }
        </div>

        <p class="featured-note" qmReveal>
          Maturity and availability reflect the current product registry. Proposed and
          in-development initiatives are not generally available.
        </p>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 05 · QUANTUM MISSION SPOTLIGHT                           -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="mission-band" aria-labelledby="home-mission-title">
      <div class="mission-band__glow" aria-hidden="true"></div>
      <qm-container>
        <div class="mission-band__grid">
          <div class="mission-band__intro" qmReveal>
            <span class="eyebrow">QUANTUM MISSION</span>
            <h2 id="home-mission-title">Ten independent applications for quantum software engineering.</h2>
            <p>
              Quantum Mission brings together ten independent quantum software applications,
              now available through their official QuantsMind GitHub v1.0.0 releases. Explore
              the portfolio, release evidence and engineering context.
            </p>
            <div class="mission-band__meta">
              <qm-badge variant="product">10 applications · v1.0.0 GA</qm-badge>
              <span>MicroQuantum is a separate published technology.</span>
            </div>
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/quantum-mission'">
              Explore Quantum Mission
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </qm-button>
          </div>

          <div class="mission-list" qmReveal>
            @for (app of quantumMission; track app.id; let i = $index) {
              <article class="mission-item">
                <span class="mission-item__index">{{ formatCount(i + 1) }}</span>
                <div>
                  <h3>{{ app.name }}</h3>
                  <p>{{ app.summary }}</p>
                </div>
              </article>
            }
          </div>
        </div>
      </qm-container>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 06 · TECHNOLOGIES WE DEVELOP                             -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="md" ariaLabel="Technologies we develop">
      <qm-container>
        <div class="qm-section-head">
          <div class="qm-section-head__copy">
            <span class="eyebrow">TECHNOLOGIES WE DEVELOP</span>
            <h2>Published technologies, built from first principles.</h2>
            <p>
              Alongside engineering services, QuantsMind develops and maintains its own
              software technologies. Each has a published, versioned developer preview.
            </p>
          </div>
          <div class="qm-section-head__aside">
            <qm-button variant="outline" [routerLinkValue]="'/technology'">
              View the Ecosystem
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </qm-button>
          </div>
        </div>

        <div class="tech-grid">
          @for (tech of ecosystem; track tech.name; let i = $index) {
            <article [class]="'home-card tech-card tech-card--' + tech.accent"
              qmReveal [qmRevealDelay]="i * 70">
              <div class="tech-card__head">
                <span class="tech-card__mark" aria-hidden="true">{{ tech.mark }}</span>
                <qm-badge [variant]="tech.badge">{{ tech.status }}</qm-badge>
              </div>
              <h3>{{ tech.name }}</h3>
              <p class="tech-card__tagline">{{ tech.tagline }}</p>
              <p>{{ tech.description }}</p>
              <div class="tech-card__meta">
                <span>{{ tech.version }}</span>
                <a [routerLink]="tech.href" class="tech-card__link">{{ tech.cta }} <span aria-hidden="true">→</span></a>
              </div>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 07 · WHY QUANTSMIND                                      -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="subtle" size="md" ariaLabel="Why QuantsMind">
      <qm-container>
        <div class="why-layout">
          <div class="why-intro" qmReveal>
            <span class="eyebrow">WHY QUANTSMIND</span>
            <h2>Built for difficult engineering.</h2>
            <p>
              A practical engineering posture: sound architecture, real software and
              careful exploration of what comes next.
            </p>
          </div>
          <div class="why-grid">
            @for (why of whyCards; track why.title; let i = $index) {
              <article class="why-card" qmReveal [qmRevealDelay]="i * 65">
                <span class="why-card__icon" aria-hidden="true" [innerHTML]="why.icon | qmSafeHtml"></span>
                <h3>{{ why.title }}</h3>
                <p>{{ why.description }}</p>
              </article>
            }
          </div>
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 08 · LABS AND INNOVATION                                 -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="labs-band" aria-labelledby="home-labs-title">
      <div class="labs-band__glow" aria-hidden="true"></div>
      <qm-container>
        <div class="labs-band__grid">
          <div class="labs-band__copy" qmReveal>
            <span class="eyebrow">LABS &amp; INNOVATION</span>
            <h2 id="home-labs-title">Where we explore emerging technologies.</h2>
            <p>
              QuantsMind Labs is where we explore emerging technologies, experimental
              architectures and new computing approaches. Research projects are kept
              distinct from commercial products.
            </p>
            <qm-button variant="secondary" size="md" [routerLinkValue]="'/labs'">
              Explore Labs
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </qm-button>
          </div>

          <div class="qm-orbit labs-orbit" aria-hidden="true">
            <span class="qm-orbit__ring"></span>
            <span class="qm-orbit__ring qm-orbit__ring--2"></span>
            <span class="qm-orbit__ring qm-orbit__ring--3"></span>
            <span class="qm-orbit__core">
              <span>LABS</span>
              <small>research</small>
            </span>
            <span class="qm-orbit__satellite qm-orbit__satellite--a">Quantum</span>
            <span class="qm-orbit__satellite qm-orbit__satellite--b">Languages</span>
            <span class="qm-orbit__satellite qm-orbit__satellite--c">AI / ML</span>
            <span class="qm-orbit__satellite qm-orbit__satellite--d">Scientific</span>
          </div>
        </div>

        <div class="labs-band__areas" qmReveal>
          @for (area of labsAreas; track area; let i = $index) {
            <span class="labs-area">
              <span class="labs-area__index">{{ formatCount(i + 1) }}</span>
              {{ area }}
            </span>
          }
        </div>
      </qm-container>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 09 · INSIGHTS AND BLOG                                   -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="md" ariaLabel="Insights and blog">
      <qm-container>
        <div class="qm-section-head">
          <div class="qm-section-head__copy">
            <span class="eyebrow">INSIGHTS &amp; BLOG</span>
            <h2>Notes from the work.</h2>
            <p>
              Technical articles on the QuantsMind product and technology ecosystem,
              written with their real scope, maturity and limitations.
            </p>
          </div>
          <div class="qm-section-head__aside">
            <qm-button variant="outline" [routerLinkValue]="'/blog'">
              Read All Articles
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </qm-button>
          </div>
        </div>

        <div class="insights-grid">
          @for (article of insights; track article.slug; let i = $index) {
            <a class="home-card insight-card" [routerLink]="['/blog', article.slug]"
              qmReveal [qmRevealDelay]="i * 65">
              <div class="insight-card__top">
                <span class="insight-card__category">{{ article.category }}</span>
                <span class="insight-card__maturity">{{ article.maturity }}</span>
              </div>
              <h3>{{ article.title }}</h3>
              <p>{{ article.summary }}</p>
              <span class="insight-card__link">Read article <span aria-hidden="true">→</span></span>
            </a>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 10 · BUSINESS CONTACT CTA                                -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="canvas" size="md" ariaLabel="Business contact">
      <qm-container>
        <div class="qm-cta-band" qmReveal>
          <span class="eyebrow">BUSINESS CONTACT</span>
          <h2>Have an Engineering Challenge?</h2>
          <p>
            Let's discuss your software, AI, data or advanced technology requirements.
          </p>
          <div class="qm-cta-band__actions">
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
              Discuss Your Project
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
      padding: 56px 0 48px;
      border-bottom: 1px solid var(--color-border);
    }
    .home-hero__grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 40px;
      align-items: center;
    }
    .home-hero__copy { min-width: 0; max-width: 780px; }
    .home-hero h1 {
      margin: 0 0 22px;
      font-size: clamp(40px, 5.1vw, 66px);
      line-height: 1.03;
      letter-spacing: -0.045em;
      max-width: 820px;
      text-wrap: balance;
    }
    .home-hero__lead {
      margin: 0 0 28px;
      max-width: 640px;
      font-size: clamp(17px, 1.3vw, 19px);
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
      margin-top: 26px;
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
    .home-hero__visual { display: none; position: relative; min-width: 0; }

    /* ── TRUST ──────────────────────────────────────────── */
    .trust-panel { display: grid; gap: 26px; }
    .trust-head {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
      align-items: end;
    }
    .trust-head h2 {
      margin: 0;
      font-size: clamp(28px, 3.2vw, 44px);
      line-height: 1.08;
      letter-spacing: -0.03em;
      text-wrap: balance;
    }
    .trust-head p {
      margin: 0;
      max-width: 620px;
      color: var(--color-text-secondary);
      font-size: 16px;
      line-height: 1.7;
      text-wrap: pretty;
    }
    .trust-values {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .trust-value {
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      border: 1px solid var(--color-border);
      border-radius: 999px;
      background: var(--color-canvas);
      color: var(--color-text-secondary);
      font-size: 11.5px;
      font-weight: 500;
    }

    /* ── SHARED CARD + GRID ─────────────────────────────── */
    .home-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 0;
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
      background: var(--card-bg);
      box-shadow: var(--shadow-xs);
      transition:
        transform 260ms var(--qm-ease-out),
        border-color 260ms var(--qm-ease-out),
        box-shadow 260ms var(--qm-ease-out);
    }
    .home-card:hover {
      transform: translateY(-3px);
      border-color: rgba(37, 99, 235, 0.22);
      box-shadow: var(--shadow-lg);
    }
    .home-card:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 3px;
    }

    /* ── SERVICES ───────────────────────────────────────── */
    .service-grid,
    .featured-grid,
    .tech-grid,
    .insights-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
    }
    .service-card {
      position: relative;
      min-height: 224px;
      padding: 24px;
      overflow: hidden;
      text-decoration: none;
    }
    .service-card::before {
      content: '';
      position: absolute;
      inset: 0 0 auto;
      height: 2px;
      background: var(--gradient-signal);
      opacity: 0;
      transition: opacity 220ms ease;
    }
    .service-card:hover::before { opacity: 1; }
    .service-card__top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .service-card__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(37, 99, 235, 0.16);
      border-radius: 12px;
      background: var(--color-accent-subtle);
      color: var(--color-accent);
    }
    .service-card__index {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);
    }
    .service-card h3 {
      margin: 2px 0 0;
      font-size: 17px;
      line-height: 1.35;
      letter-spacing: -0.02em;
    }
    .service-card p {
      margin: 0;
      font-size: 13.5px;
      line-height: 1.65;
      color: var(--color-text-secondary);
    }
    .service-card__link {
      margin-top: auto;
      padding-top: 4px;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-accent);
    }

    /* ── FEATURED PRODUCTS ─────────────────────────────── */
    .featured-card {
      min-height: 250px;
      padding: 22px;
    }
    .featured-card__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
    }
    .featured-card__portfolio {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-accent);
    }
    .featured-card h3 {
      margin: 2px 0 0;
      font-size: 18px;
      line-height: 1.3;
      letter-spacing: -0.02em;
      overflow-wrap: anywhere;
    }
    .featured-card p {
      margin: 0;
      font-size: 13.5px;
      line-height: 1.6;
      color: var(--color-text-secondary);
    }
    .featured-card__meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 18px;
      margin: 0;
      font-size: 12px;
    }
    .featured-card__meta div { display: flex; gap: 6px; }
    .featured-card__meta dt { color: var(--color-text-muted); }
    .featured-card__meta dd { margin: 0; color: var(--color-text-secondary); font-weight: 600; }
    .featured-card__link {
      margin-top: auto;
      padding-top: 4px;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-accent);
      text-decoration: none;
    }
    .featured-card__link:hover { text-decoration: underline; }
    .featured-card__link:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 3px;
      border-radius: 4px;
    }
    .featured-note {
      margin: 18px 0 0;
      color: var(--color-text-muted);
      font-size: 12px;
      line-height: 1.6;
    }

    /* ── QUANTUM MISSION ────────────────────────────────── */
    .mission-band {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      padding: 64px 0;
      background:
        radial-gradient(760px 420px at 86% -10%, rgba(6, 182, 212, 0.22), transparent 62%),
        radial-gradient(620px 380px at 4% 112%, rgba(79, 70, 229, 0.20), transparent 62%),
        var(--gradient-ink);
      color: var(--color-ink-text);
    }
    .mission-band__glow {
      position: absolute;
      top: -180px;
      right: -120px;
      width: 460px;
      height: 460px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(34, 211, 238, 0.18), transparent 68%);
      filter: blur(22px);
      pointer-events: none;
    }
    .mission-band__grid {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 36px;
      align-items: start;
    }
    .mission-band .eyebrow { color: var(--color-cyan-soft); }
    .mission-band .eyebrow::before {
      background: linear-gradient(90deg, var(--color-cyan-soft), var(--color-labs-bright));
    }
    .mission-band__intro h2 {
      margin: 0 0 16px;
      max-width: 600px;
      color: var(--color-ink-text);
      font-size: clamp(30px, 3.6vw, 48px);
      line-height: 1.08;
      letter-spacing: -0.035em;
      text-wrap: balance;
    }
    .mission-band__intro > p {
      margin: 0;
      max-width: 580px;
      color: var(--color-ink-muted);
      font-size: 16px;
      line-height: 1.7;
      text-wrap: pretty;
    }
    .mission-band__meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px 14px;
      margin: 22px 0 24px;
      color: var(--color-ink-muted);
      font-size: 12px;
      line-height: 1.5;
    }
    .mission-list {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1px;
      overflow: hidden;
      border: 1px solid rgba(148, 197, 255, 0.16);
      border-radius: var(--radius-lg);
      background: rgba(148, 197, 255, 0.14);
    }
    .mission-item {
      display: grid;
      grid-template-columns: 30px minmax(0, 1fr);
      gap: 10px;
      padding: 13px 15px;
      background: rgba(11, 27, 51, 0.78);
    }
    .mission-item__index {
      padding-top: 2px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px;
      font-weight: 600;
      color: var(--color-cyan-soft);
    }
    .mission-item h3 {
      margin: 0 0 3px;
      color: var(--color-ink-text);
      font-size: 14px;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    .mission-item p {
      margin: 0;
      color: var(--color-ink-muted);
      font-size: 11.5px;
      line-height: 1.5;
    }

    /* ── TECHNOLOGIES ───────────────────────────────────── */
    .tech-card {
      position: relative;
      min-height: 280px;
      padding: 24px;
      overflow: hidden;
    }
    .tech-card::before {
      content: '';
      position: absolute;
      inset: 0 0 auto;
      height: 3px;
      background: var(--gradient-signal);
    }
    .tech-card--violet::before {
      background: linear-gradient(90deg, var(--color-sdk), var(--color-sdk-soft));
    }
    .tech-card--teal::before {
      background: linear-gradient(90deg, var(--color-labs), var(--color-labs-bright));
    }
    .tech-card__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .tech-card__mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-accent-muted);
      border-radius: 12px;
      background: var(--color-accent-subtle);
      color: var(--color-accent-dark);
      font-family: 'Sora', 'Inter', system-ui, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .tech-card--violet .tech-card__mark {
      border-color: var(--color-sdk-muted);
      background: var(--color-sdk-subtle);
      color: var(--color-sdk-deep);
    }
    .tech-card--teal .tech-card__mark {
      border-color: var(--color-labs-muted);
      background: var(--color-labs-subtle);
      color: var(--color-labs-dark);
    }
    .tech-card h3 {
      margin: 4px 0 0;
      font-size: 20px;
      line-height: 1.25;
      letter-spacing: -0.025em;
      overflow-wrap: anywhere;
    }
    .tech-card__tagline {
      margin: 0;
      color: var(--color-accent);
      font-size: 13px;
      font-weight: 600;
    }
    .tech-card--violet .tech-card__tagline { color: var(--color-sdk); }
    .tech-card--teal .tech-card__tagline { color: var(--color-labs-dark); }
    .tech-card p {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: 13.5px;
      line-height: 1.65;
    }
    .tech-card__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: auto;
      padding-top: 14px;
      border-top: 1px solid var(--color-border);
      color: var(--color-text-muted);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px;
    }
    .tech-card__link {
      color: var(--color-accent);
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
    }
    .tech-card__link:hover { text-decoration: underline; }
    .tech-card__link:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 3px;
      border-radius: 4px;
    }

    /* ── WHY ────────────────────────────────────────────── */
    .why-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 32px;
    }
    .why-intro h2 {
      margin: 0 0 14px;
      font-size: clamp(30px, 3.4vw, 46px);
      line-height: 1.08;
      letter-spacing: -0.03em;
      text-wrap: balance;
    }
    .why-intro p {
      margin: 0;
      max-width: 420px;
      font-size: 16px;
      line-height: 1.7;
      color: var(--color-text-secondary);
    }
    .why-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1px;
      overflow: hidden;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-border);
    }
    .why-card {
      padding: 24px;
      background: var(--card-bg);
      transition: background-color 220ms ease;
    }
    .why-card:hover { background: var(--color-canvas); }
    .why-card__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border: 1px solid rgba(37, 99, 235, 0.16);
      border-radius: 10px;
      background: var(--color-accent-subtle);
      color: var(--color-accent);
    }
    .why-card h3 {
      margin: 14px 0 7px;
      font-size: 16px;
      letter-spacing: -0.02em;
    }
    .why-card p {
      margin: 0;
      font-size: 13px;
      line-height: 1.65;
      color: var(--color-text-secondary);
    }

    /* ── LABS ───────────────────────────────────────────── */
    .labs-band {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      padding: 64px 0 56px;
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
      gap: 36px;
      align-items: center;
    }
    .labs-band .eyebrow { color: var(--color-labs-bright); }
    .labs-band .eyebrow::before {
      background: linear-gradient(90deg, var(--color-labs-soft), var(--color-cyan));
    }
    .labs-band__copy h2 {
      margin: 0 0 16px;
      max-width: 560px;
      color: var(--color-ink-text);
      font-size: clamp(30px, 3.7vw, 50px);
      line-height: 1.07;
      letter-spacing: -0.035em;
      text-wrap: balance;
    }
    .labs-band__copy p {
      margin: 0 0 26px;
      max-width: 500px;
      color: var(--color-ink-muted);
      font-size: 16px;
      line-height: 1.7;
    }
    .labs-orbit { max-width: 430px; }
    .labs-orbit .qm-orbit__core {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      line-height: 1;
      text-align: center;
    }
    .labs-orbit .qm-orbit__core span {
      font-family: 'Sora', 'Inter', system-ui, sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.12em;
    }
    .labs-orbit .qm-orbit__core small {
      font-size: 8px;
      line-height: 1.1;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.68);
    }
    .labs-band__areas {
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 24px;
      margin-top: 44px;
      padding-top: 8px;
      border-top: 1px solid rgba(94, 234, 212, 0.16);
    }
    .labs-area {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 0;
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

    /* ── INSIGHTS ───────────────────────────────────────── */
    .insight-card {
      min-height: 250px;
      padding: 24px;
      text-decoration: none;
    }
    .insight-card__top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .insight-card__category {
      color: var(--color-accent);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .insight-card__maturity {
      max-width: 100%;
      color: var(--color-text-muted);
      font-size: 10.5px;
      line-height: 1.4;
      text-align: right;
      overflow-wrap: anywhere;
    }
    .insight-card h3 {
      margin: 0;
      color: var(--color-text-primary);
      font-size: 18px;
      line-height: 1.35;
      letter-spacing: -0.02em;
    }
    .insight-card p {
      display: -webkit-box;
      margin: 0;
      overflow: hidden;
      color: var(--color-text-secondary);
      font-size: 13.5px;
      line-height: 1.65;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
    }
    .insight-card__link {
      margin-top: auto;
      padding-top: 4px;
      color: var(--color-accent);
      font-size: 13px;
      font-weight: 600;
    }

    /* ── RESPONSIVE ─────────────────────────────────────── */
    @media (min-width: 640px) {
      .service-grid,
      .featured-grid,
      .insights-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .mission-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .labs-band__areas { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }

    @media (min-width: 768px) {
      .home-hero { padding: 68px 0 58px; }
      .home-hero__visual { display: block; max-width: 520px; margin: 0 auto; }
      .tech-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .trust-head { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 40px; }
      .trust-head p { justify-self: end; }
      .insights-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .labs-band__areas { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    }

    @media (min-width: 1024px) {
      .home-hero { padding: 78px 0 68px; }
      .home-hero__grid {
        grid-template-columns: minmax(0, 1.02fr) minmax(420px, 0.98fr);
        gap: 56px;
      }
      .home-hero__visual { max-width: none; margin: 0; }
      .service-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .featured-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .mission-band { padding: 76px 0; }
      .mission-band__grid {
        grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
        gap: 56px;
      }
      .why-layout {
        grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
        gap: 64px;
      }
      .labs-band { padding: 76px 0 64px; }
      .labs-band__grid {
        grid-template-columns: minmax(0, 1.05fr) minmax(380px, 0.95fr);
        gap: 56px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .home-hero__ring,
      .home-hero__node,
      .home-hero__float,
      .home-hero__signal i { animation: none; }
      .home-card,
      .why-card { transition: none; }
      .home-card:hover { transform: none; }
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
    }
  ];

  quantumMission: Product[] = getProductsByPortfolio('quantum')
    .filter(product => product.id !== 'microquantum');

  trustMetrics: TrustMetric[] = [
    { value: 6, label: 'engineering domains' },
    { value: 40, label: 'portfolio products' },
    { value: 3, label: 'published technologies' },
    { value: this.quantumMission.length, label: 'quantum applications · proposed' }
  ];

  featuredProducts: FeaturedProduct[] = FEATURED_SELECTION
    .map(selection => this.toFeaturedProduct(selection))
    .filter((item): item is FeaturedProduct => item !== null);

  ecosystem: EcosystemTech[] = [
    {
      name: 'Karkain',
      tagline: 'General-Purpose Programming Language',
      description: 'An independently developed, statically typed systems programming language with a self-hosted compiler, published at version 1.1.0. A developer preview: the language and API surface may still change.',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      accent: 'violet',
      mark: 'K',
      cta: 'Explore Karkain',
      href: '/karkain'
    },
    {
      name: 'MicroQuantum',
      tagline: 'Open Quantum Computing SDK',
      description: 'An open, NumPy-only Python SDK for building, executing and analyzing quantum programs, published on PyPI at version 1.1.0. Execution is by simulation.',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      accent: 'blue',
      mark: 'MQ',
      cta: 'Explore MicroQuantum',
      href: '/microquantum'
    },
    {
      name: 'QuantsMind Quantum SDK',
      tagline: 'Scientific Computing SDK',
      description: 'An open, vendor-independent Python SDK for scientific computing, published on PyPI at version 1.1.0. Module coverage and numerical accuracy vary by domain.',
      status: 'Developer Preview',
      version: 'v1.1.0',
      badge: 'experimental',
      accent: 'teal',
      mark: 'SDK',
      cta: 'Explore QuantsMind SDK',
      href: '/quantsmind-sdk'
    }
  ];

  whyCards: WhyCard[] = [
    {
      icon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg>`,
      title: 'Deep Engineering',
      description: 'We work from first principles across software, systems and emerging computing — not just surface-level integration.'
    },
    {
      icon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI-Native Thinking',
      description: 'Intelligent systems are designed into the architecture, with clear boundaries, evaluation and human oversight.'
    },
    {
      icon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
      title: 'Engineering Quality',
      description: 'Maintainable code, sound architecture and honest maturity labels are part of the deliverable.'
    },
    {
      icon: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2z"/></svg>`,
      title: 'Innovation Focus',
      description: 'We explore quantum, space and scientific computing through Labs and turn validated ideas into products.'
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

  insights: BlogArticle[] = INSIGHT_SLUGS
    .map(slug => BLOG_ARTICLES.find(article => article.slug === slug))
    .filter((article): article is BlogArticle => article !== undefined);

  formatCount(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private toFeaturedProduct(selection: FeaturedSelection): FeaturedProduct | null {
    const product = getProductById(selection.id);
    if (!product) return null;

    return {
      product,
      href: selection.href,
      maturity: maturityLabel(product.maturity),
      availability: availabilityLabel(product.availability),
      maturityVariant: maturityBadgeVariant(product.maturity) as BadgeVariant,
      portfolio: PORTFOLIO_LABELS[product.portfolio]
    };
  }
}
