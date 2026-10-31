import {
  Component, ChangeDetectionStrategy
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { HrefPartsPipe } from '../../shared/pipes/href-parts.pipe';

interface FooterLink {
  label: string;
  href: string;
}

@Component({
    selector: 'qm-footer',
    imports: [RouterModule, SafeHtmlPipe, HrefPartsPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <footer class="qm-footer" role="contentinfo">
      <div class="qm-footer__accent" aria-hidden="true"></div>

      <div class="qm-footer__main">
        <div class="qm-footer__container qm-footer__grid">

          <!-- Company -->
          <div class="qm-footer__brand">
            <a routerLink="/" class="qm-footer__logo" aria-label="QuantsMind — Home">
              <span class="qm-footer__logo-mark" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <g stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="10.5" cy="10.5" r="7" stroke-width="2.1"/>
                    <path d="M14.9 14.9 19.8 19.8" stroke-width="2.3"/>
                    <path d="M7.1 9.2 11.3 6.5 13.3 11.4" stroke-width="0.95" opacity="0.55"/>
                  </g>
                  <g fill="#fff">
                    <circle cx="7.1" cy="9.2" r="1.25"/>
                    <circle cx="11.3" cy="6.5" r="1"/>
                    <circle cx="13.3" cy="11.4" r="1.25"/>
                  </g>
                </svg>
              </span>
              <span class="qm-footer__logo-text">
                <span class="qm-footer__logo-name">QuantsMind</span>
                <span class="qm-footer__logo-tag">Technology Engineering</span>
              </span>
            </a>
            <p class="qm-footer__about">
              Engineering software products, intelligent systems and advanced
              technology for businesses and emerging domains.
            </p>
            <div class="qm-footer__social">
              @for (s of socials; track s.label) {
                <a [href]="s.href" target="_blank"
                  rel="noopener noreferrer" class="qm-footer__social-link"
                  [attr.aria-label]="s.label + ' — opens in a new tab'"
                  [innerHTML]="s.icon | qmSafeHtml"></a>
              }
            </div>
          </div>

          <!-- Explore -->
          <nav class="qm-footer__col" aria-label="Explore">
            <h3 class="qm-footer__heading">Explore</h3>
            <ul class="qm-footer__list" role="list">
              @for (link of explore; track link.label) {
                @let target = link.href | hrefParts;
                <li>
                  <a [routerLink]="target.path" [fragment]="target.fragment" class="qm-footer__link">{{ link.label }}</a>
                </li>
              }
            </ul>
          </nav>

          <!-- Products & Technology -->
          <nav class="qm-footer__col" aria-label="Products and technology">
            <h3 class="qm-footer__heading">Products &amp; Technology</h3>
            <ul class="qm-footer__list" role="list">
              @for (link of productsTechnology; track link.label) {
                @let target = link.href | hrefParts;
                <li>
                  <a [routerLink]="target.path" [fragment]="target.fragment" class="qm-footer__link">{{ link.label }}</a>
                </li>
              }
            </ul>
          </nav>

          <!-- Connect -->
          <div class="qm-footer__col qm-footer__connect">
            <h3 class="qm-footer__heading">Connect</h3>
            <ul class="qm-footer__connect-list" role="list">
              <li>
                <a href="mailto:ajitkumar&#64;quantsmind.com" class="qm-footer__contact-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="1.7"
                      stroke-linejoin="round"/>
                  </svg>
                  <span>ajitkumar&#64;quantsmind.com</span>
                </a>
              </li>
              <li>
                <span class="qm-footer__location">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 21s7-6.13 7-11a7 7 0 1 0-14 0c0 4.87 7 11 7 11z"
                      stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.7"/>
                  </svg>
                  <span>Jodhpur, Rajasthan, India</span>
                </span>
              </li>
              <li>
                <a routerLink="/contact" class="qm-footer__connect-link">
                  Start a conversation
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div class="qm-footer__bottom">
        <div class="qm-footer__container qm-footer__bottom-inner">
          <p class="qm-footer__copyright">
            © {{ currentYear }} QuantsMind. All rights reserved.
          </p>
          <ul class="qm-footer__legal" role="list">
            @for (link of legal; track link.label) {
              @let target = link.href | hrefParts;
              <li>
                <a [routerLink]="target.path" [fragment]="target.fragment" class="qm-footer__legal-link">{{ link.label }}</a>
              </li>
            }
          </ul>
          <button type="button" class="qm-footer__top" (click)="scrollToTop()"
            aria-label="Back to top">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Top
          </button>
        </div>
      </div>
    </footer>
    `,
    styles: [`
    /* ── Shell ─────────────────────────────────────────── */
    .qm-footer {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      background:
        radial-gradient(900px 460px at 82% -20%, rgba(37, 99, 235, 0.16), transparent 62%),
        radial-gradient(700px 400px at 8% 120%, rgba(6, 182, 212, 0.08), transparent 62%),
        var(--qm-footer-bg);
      color: var(--qm-footer-text);
      font-size: 13.5px;
    }
    .qm-footer::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background-image:
        linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse 70% 80% at 70% 0%, #000, transparent 72%);
      -webkit-mask-image: radial-gradient(ellipse 70% 80% at 70% 0%, #000, transparent 72%);
      pointer-events: none;
    }
    .qm-footer__accent {
      height: 3px;
      background: linear-gradient(90deg,
        var(--color-accent),
        var(--color-cyan),
        var(--color-accent-indigo),
        var(--color-labs));
    }
    .qm-footer__container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 28px;
    }
    a { color: inherit; }
    a:hover { color: var(--qm-footer-text-strong); }

    /* ── Main grid ─────────────────────────────────────── */
    .qm-footer__main {
      padding: 44px 0 36px;
      border-bottom: 1px solid var(--qm-footer-border);
    }
    .qm-footer__grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 30px;
    }

    /* Brand */
    .qm-footer__logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      margin-bottom: 16px;
    }
    .qm-footer__logo-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: var(--gradient-brand);
      border-radius: 10px;
      box-shadow:
        0 10px 22px -10px rgba(37, 99, 235, 0.75),
        inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }
    .qm-footer__logo-text { display: flex; flex-direction: column; line-height: 1.12; }
    .qm-footer__logo-name {
      font-family: 'Sora', 'Inter', system-ui, sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: var(--qm-footer-text-strong);
      letter-spacing: -0.03em;
    }
    .qm-footer__logo-tag {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: var(--qm-footer-muted);
    }
    .qm-footer__about {
      margin: 0 0 18px;
      max-width: 310px;
      line-height: 1.65;
      color: var(--qm-footer-text);
    }

    /* Social */
    .qm-footer__social { display: flex; gap: 8px; }
    .qm-footer__social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: var(--qm-footer-text);
      background: var(--qm-footer-bg-soft);
      border: 1px solid var(--qm-footer-border);
      border-radius: 8px;
      transition: color 150ms ease, border-color 150ms ease, transform 150ms ease;
    }
    .qm-footer__social-link:hover {
      color: #fff;
      border-color: var(--color-accent);
      transform: translateY(-2px);
    }
    .qm-footer__social-link:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }

    /* Columns */
    .qm-footer__col { min-width: 0; }
    .qm-footer__heading {
      display: flex;
      align-items: center;
      gap: 9px;
      margin: 0 0 14px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.11em;
      text-transform: uppercase;
      color: var(--qm-footer-heading);
    }
    .qm-footer__heading::before {
      content: '';
      width: 14px;
      height: 1.5px;
      border-radius: 999px;
      background: var(--gradient-signal);
    }
    .qm-footer__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 9px;
    }
    .qm-footer__link {
      color: var(--qm-footer-text);
      text-decoration: none;
      transition: color 150ms ease, transform 150ms ease;
      display: inline-block;
    }
    .qm-footer__link:hover {
      color: var(--qm-footer-text-strong);
      transform: translateX(2px);
    }
    .qm-footer__link:focus-visible,
    .qm-footer__contact-link:focus-visible,
    .qm-footer__connect-link:focus-visible,
    .qm-footer__legal-link:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 3px;
      border-radius: 3px;
    }

    /* Connect */
    .qm-footer__connect-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .qm-footer__contact-link,
    .qm-footer__location {
      display: inline-flex;
      align-items: flex-start;
      gap: 9px;
      max-width: 100%;
      color: var(--qm-footer-text);
      line-height: 1.5;
      text-decoration: none;
    }
    .qm-footer__contact-link svg,
    .qm-footer__location svg {
      flex: 0 0 auto;
      margin-top: 1px;
      color: var(--color-accent-on-dark);
    }
    .qm-footer__contact-link:hover { color: var(--qm-footer-text-strong); }
    .qm-footer__contact-link span,
    .qm-footer__location span { min-width: 0; overflow-wrap: anywhere; }
    .qm-footer__connect-link {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: var(--color-accent-on-dark);
      font-weight: 600;
      text-decoration: none;
    }
    .qm-footer__connect-link:hover { color: var(--qm-footer-text-strong); }
    .qm-footer__connect-link span { transition: transform 150ms ease; }
    .qm-footer__connect-link:hover span { transform: translateX(2px); }

    /* ── Bottom bar ────────────────────────────────────── */
    .qm-footer__bottom-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px 24px;
      padding-top: 18px;
      padding-bottom: 18px;
    }
    .qm-footer__copyright {
      margin: 0;
      color: var(--qm-footer-muted);
      font-size: 12px;
    }
    .qm-footer__legal {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 8px 20px;
    }
    .qm-footer__legal-link {
      color: var(--qm-footer-text);
      text-decoration: none;
      font-size: 12px;
      transition: color 150ms ease;
    }
    .qm-footer__legal-link:hover { color: var(--qm-footer-text-strong); }
    .qm-footer__top {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 10px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      color: var(--qm-footer-text);
      background: transparent;
      border: 1px solid var(--qm-footer-border);
      border-radius: 7px;
      cursor: pointer;
      transition: color 150ms ease, border-color 150ms ease;
    }
    .qm-footer__top:hover {
      color: #fff;
      border-color: var(--color-accent);
    }
    .qm-footer__top:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }

    /* ── Responsive ────────────────────────────────────── */
    @media (min-width: 640px) {
      .qm-footer__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 32px 40px;
      }
      .qm-footer__brand { grid-column: 1 / -1; }
      .qm-footer__connect { grid-column: 1 / -1; }
      .qm-footer__connect-list {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px 28px;
      }
    }
    @media (min-width: 1024px) {
      .qm-footer__grid {
        grid-template-columns: 1.4fr 0.85fr 1.25fr 1.1fr;
        gap: 40px;
      }
      .qm-footer__brand,
      .qm-footer__connect { grid-column: auto; }
      .qm-footer__connect-list {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
    }
    @media (max-width: 767px) {
      .qm-footer__container { padding: 0 16px; }
      .qm-footer__bottom-inner { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class QmFooterComponent {
  currentYear = new Date().getFullYear();

  explore: FooterLink[] = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Labs', href: '/labs' },
    { label: 'Blog', href: '/blog' }
  ];

  productsTechnology: FooterLink[] = [
    { label: 'Products', href: '/products' },
    { label: 'Quantum Mission', href: '/quantum-mission' },
    { label: 'Space Systems', href: '/products#space-software' },
    { label: 'Cybersecurity', href: '/products#cybersecurity-software' },
    { label: 'Karkain', href: '/karkain' },
    { label: 'MicroQuantum', href: '/microquantum' },
    { label: 'QuantsMind Quantum SDK', href: '/quantsmind-sdk' }
  ];

  legal: FooterLink[] = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' }
  ];

  socials: Array<{ label: string; href: string; icon: string }> = [
    {
      label: 'QuantsMind on LinkedIn',
      href: 'https://www.linkedin.com/company/quantsmind',
      icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`
    },
    {
      label: 'QuantsMind on GitHub',
      href: 'https://github.com/quantsmind',
      icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14v3.17c0 .3.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>`
    }
  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: this.scrollBehavior() });
  }

  private scrollBehavior(): ScrollBehavior {
    try {
      return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ? 'auto' : 'smooth';
    } catch {
      return 'smooth';
    }
  }
}
