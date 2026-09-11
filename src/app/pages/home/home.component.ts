import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';
import { SafeHtmlPipe }         from '../../shared/pipes/safe-html.pipe';

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
  badge: 'early-access' | 'development';
  cta: string;
  href: string;
}

@Component({
    selector: 'app-home',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent, SafeHtmlPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- HERO                                                     -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="hero" aria-label="QuantsMind overview">
      <qm-container>
        <div class="hero__inner">
          <span class="eyebrow hero__eyebrow">QUANTSMIND</span>
          <h1 class="hero__headline">
            Engineering Software.<br />
            Building Intelligent Technologies.
          </h1>
          <p class="hero__lead">
            QuantsMind is an engineering and technology company focused on software
            architecture, application engineering, AI/ML, cloud technologies, and
            emerging computing technologies.
          </p>
          <div class="hero__actions">
            <qm-button variant="primary" size="lg" [routerLinkValue]="'/services'">
              Explore Services →
            </qm-button>
            <qm-button variant="secondary" size="lg" [routerLinkValue]="'/technology'">
              Explore Technology →
            </qm-button>
          </div>
          <div class="hero__focus">
            @for (area of focusAreas; track area) {
              <span class="hero__focus-chip">{{ area }}</span>
            }
          </div>
        </div>
      </qm-container>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- WHAT WE DO                                              -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white">
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
            <a [routerLink]="cap.href" class="capability-card" [attr.aria-label]="cap.title">
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
    <!-- TECHNOLOGY ECOSYSTEM                                     -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="canvas">
      <qm-container>
        <div class="section-header">
          <span class="eyebrow">TECHNOLOGY ECOSYSTEM</span>
          <h2>Software We Are Building.</h2>
          <p class="lead section-header__lead">
            Alongside engineering services, QuantsMind develops its own software
            technologies and experimental platforms.
          </p>
        </div>

        <div class="ecosystem-grid">
          @for (tech of ecosystem; track tech) {
            <article class="tech-card">
              <div class="tech-card__meta">
                <h3 class="tech-card__title">{{ tech.name }}</h3>
                <qm-badge [variant]="tech.badge">{{ tech.status }}</qm-badge>
              </div>
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
    <qm-section surface="subtle">
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
      padding: 88px 0 72px;
      background:
        radial-gradient(1200px 480px at 80% -10%, #EFF6FF 0%, rgba(239,246,255,0) 60%),
        #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
    }
    @media (min-width: 1024px) {
      .hero { padding: 128px 0 112px; }
    }

    .hero__inner { max-width: 760px; }
    .hero__eyebrow { margin-bottom: 20px; }
    .hero__headline {
      font-size: clamp(38px, 5vw, 60px);
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.03em;
      color: #111827;
      margin: 0 0 24px;
      text-wrap: balance;
    }
    .hero__lead {
      font-size: 18px;
      line-height: 1.7;
      color: #475569;
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
      color: #475569;
      background: #F1F5F9;
      border: 1px solid #E2E8F0;
      border-radius: 9999px;
      padding: 4px 12px;
    }

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
      background: #F8FAFC;
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
      width: 44px; height: 44px;
      display: flex; align-items: center; justify-content: center;
      background: #EFF6FF; border-radius: 10px; color: #2563EB;
    }
    .capability-card__title { font-size: 16px; font-weight: 600; color: #111827; margin: 0; }
    .capability-card__desc  { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; flex: 1; }
    .capability-card__link  { font-size: 13px; font-weight: 500; color: #2563EB; margin-top: 4px; }

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
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
    }
    .tech-card__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tech-card__title { font-size: 18px; font-weight: 600; color: #111827; margin: 0; }
    .tech-card__tagline { font-size: 14px; font-weight: 500; color: #2563EB; margin: 0; }
    .tech-card__desc { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; flex: 1; }
    .tech-card__link {
      font-size: 13px; font-weight: 500; color: #2563EB;
      text-decoration: none; margin-top: 4px;
    }
    .tech-card__link:hover { text-decoration: underline; }

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
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 9999px;
    }
    .labs-area-card__name { font-size: 13px; font-weight: 500; color: #475569; }

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
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
    }
    .why-card__title { font-size: 15px; font-weight: 600; color: #111827; margin: 0 0 8px; }
    .why-card__desc  { font-size: 13px; line-height: 1.6; color: #475569; margin: 0; }

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
  focusAreas = [
    'Software Engineering',
    'AI / ML',
    'Cloud & Infrastructure',
    'Emerging Computing'
  ];

  capabilities: Capability[] = [
    {
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      title: 'Software Engineering',
      description: 'Application architecture, backend systems, APIs, developer platforms and software engineering.',
      href: '/services#application-development'
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
    }
  ];

  ecosystem: EcosystemTech[] = [
    {
      name: 'MicroQuantum',
      tagline: 'Open Quantum Computing SDK',
      description: 'An open Python SDK for building, executing and analyzing quantum programs.',
      status: 'Developer Preview · v0.4.0',
      badge: 'early-access',
      cta: 'Explore MicroQuantum',
      href: '/microquantum'
    },
    {
      name: 'Karkain',
      tagline: 'General-Purpose Programming Language',
      description: 'An independent programming language and computing ecosystem being developed by QuantsMind.',
      status: 'Active Development',
      badge: 'development',
      cta: 'Explore Karkain',
      href: '/karkain'
    },
    {
      name: 'QuantsMind SDK',
      tagline: 'General-Purpose Technology SDK',
      description: 'A software foundation exploring reusable abstractions for intelligent computing, data and advanced technology applications.',
      status: 'Development',
      badge: 'development',
      cta: 'Explore QuantsMind SDK',
      href: '/quantsmind-sdk'
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