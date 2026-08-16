import {
  Component, ChangeDetectionStrategy, signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { HrefPartsPipe } from '../../shared/pipes/href-parts.pipe';

interface FooterLink {
  label: string;
  href: string;
}

@Component({
    selector: 'qm-footer',
    imports: [FormsModule, RouterModule, SafeHtmlPipe, HrefPartsPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <footer class="qm-footer" role="contentinfo">
      <div class="qm-footer__accent" aria-hidden="true"></div>
    
      <!-- ═══════════════════════════════════════════════ -->
      <!-- NEWSLETTER BAND                                  -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="qm-footer__newsletter">
        <div class="qm-footer__container">
          <div class="qm-footer__newsletter-text">
            <h2 class="qm-footer__newsletter-title">Engineering insights, occasionally.</h2>
            <p class="qm-footer__newsletter-sub">
              A monthly letter on software architecture, AI, and building systems that last.
              No spam — unsubscribe anytime.
            </p>
          </div>
    
          <form class="qm-footer__newsletter-form"
            [class.qm-footer__newsletter-form--error]="newsletterError()"
            (ngSubmit)="subscribe()" novalidate>
            <div class="qm-footer__newsletter-row">
              <input type="email" name="email"
                [(ngModel)]="newsletterEmail"
                placeholder="you@company.com"
                aria-label="Email address"
                autocomplete="email" spellcheck="false"/>
              <button type="submit" class="qm-footer__newsletter-btn"
                [disabled]="newsletterSuccess()">
                {{ newsletterSuccess() ? 'Subscribed ✓' : 'Subscribe' }}
              </button>
            </div>
            @if (newsletterError()) {
              <p class="qm-footer__newsletter-msg" role="alert">
                Please enter a valid email address.
              </p>
            }
            @if (newsletterSuccess()) {
              <p class="qm-footer__newsletter-msg qm-footer__newsletter-msg--ok"
                role="status">
                Thanks — you're on the list. See you in your inbox.
              </p>
            }
          </form>
        </div>
      </div>
    
      <!-- ═══════════════════════════════════════════════ -->
      <!-- MAIN GRID                                        -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="qm-footer__main">
        <div class="qm-footer__container qm-footer__grid">
    
          <!-- Brand column -->
          <div class="qm-footer__brand">
            <a routerLink="/" class="qm-footer__logo" aria-label="QuantsMind — Home">
              <span class="qm-footer__logo-mark" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l7 4v5c0 5-3 9.5-7 11-4-1.5-7-6-7-11V6l7-4z" stroke="#fff"
                    stroke-width="1.6" stroke-linejoin="round"/>
                  <path d="M9 9.5l3 3 3-3M12 12.5v3" stroke="#fff" stroke-width="1.6"
                    stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="qm-footer__logo-text">
                <span class="qm-footer__logo-name">QuantsMind</span>
                <span class="qm-footer__logo-tag">Technology Engineering</span>
              </span>
            </a>
            <p class="qm-footer__about">
              We design and engineer complex software systems — from architecture to
              production — for problems that demand correctness, scale, and depth.
            </p>
            <div class="qm-footer__social">
              @for (s of socials; track s) {
                <a [href]="s.href" target="_blank"
                  rel="noopener noreferrer" class="qm-footer__social-link"
                [attr.aria-label]="s.label" [innerHTML]="s.icon | qmSafeHtml"></a>
              }
            </div>
          </div>
    
          <!-- Link columns -->
          <nav class="qm-footer__col" aria-label="Services links">
            <h3 class="qm-footer__heading">Services</h3>
            <ul class="qm-footer__list" role="list">
              @for (link of services; track link) {
                <li>
                  @let target = link.href | hrefParts;
                  <a [routerLink]="target.path" [fragment]="target.fragment" class="qm-footer__link">{{ link.label }}</a>
                </li>
              }
            </ul>
          </nav>
    
          <nav class="qm-footer__col" aria-label="Company links">
            <h3 class="qm-footer__heading">Company</h3>
            <ul class="qm-footer__list" role="list">
              @for (link of company; track link) {
                <li>
                  @let target = link.href | hrefParts;
                  <a [routerLink]="target.path" [fragment]="target.fragment" class="qm-footer__link">{{ link.label }}</a>
                </li>
              }
            </ul>
          </nav>
    
          <nav class="qm-footer__col" aria-label="Resources links">
            <h3 class="qm-footer__heading">Resources</h3>
            <ul class="qm-footer__list" role="list">
              @for (link of resources; track link) {
                <li>
                  @let target = link.href | hrefParts;
                  <a [routerLink]="target.path" [fragment]="target.fragment" class="qm-footer__link">{{ link.label }}</a>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    
      <!-- ═══════════════════════════════════════════════ -->
      <!-- CONTACT                                          -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="qm-footer__contact">
        <div class="qm-footer__container qm-footer__contact-grid">
          <span class="qm-footer__contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
              <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="1.7"
                stroke-linejoin="round"/>
            </svg>
            <a href="mailto:ajitkumar&#64;quantsmind.com" class="qm-footer__contact-link">
              ajitkumar&#64;quantsmind.com
            </a>
          </span>
          <span class="qm-footer__contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 21s7-6.13 7-11a7 7 0 1 0-14 0c0 4.87 7 11 7 11z" stroke="currentColor"
                stroke-width="1.7" stroke-linejoin="round"/>
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.7"/>
            </svg>
            <span class="qm-footer__contact-text">
              28, Shikargarh, Jodhpur – 342015, Rajasthan, India
            </span>
          </span>
        </div>
      </div>
    
      <!-- ═══════════════════════════════════════════════ -->
      <!-- BOTTOM BAR                                       -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="qm-footer__bottom">
        <div class="qm-footer__container qm-footer__bottom-inner">
          <p class="qm-footer__copyright">
            © {{ currentYear }} QuantsMind. All rights reserved.
          </p>
          <ul class="qm-footer__legal" role="list">
            @for (link of legal; track link) {
              <li>
                @let target = link.href | hrefParts;
                <a [routerLink]="target.path" [fragment]="target.fragment" class="qm-footer__legal-link">{{ link.label }}</a>
              </li>
            }
          </ul>
          <button type="button" class="qm-footer__top" (click)="scrollToTop()"
            aria-label="Back to top">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      background: var(--qm-footer-bg);
      color: var(--qm-footer-text);
      font-size: 14px;
    }
    .qm-footer__accent {
      height: 3px;
      background: linear-gradient(90deg, #2563EB, #7C3AED, #06B6D4);
    }
    .qm-footer__container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 32px;
    }
    a { color: inherit; }
    a:hover { color: var(--qm-footer-text-strong); }

    /* ── Newsletter band ───────────────────────────────── */
    .qm-footer__newsletter {
      background: var(--qm-footer-bg-soft);
      border-bottom: 1px solid var(--qm-footer-border);
    }
    .qm-footer__newsletter .qm-footer__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 24px;
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .qm-footer__newsletter-title {
      margin: 0 0 6px;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--qm-footer-heading);
    }
    .qm-footer__newsletter-sub {
      margin: 0;
      max-width: 460px;
      color: var(--qm-footer-text);
      line-height: 1.6;
    }
    .qm-footer__newsletter-form { min-width: min(100%, 400px); }
    .qm-footer__newsletter-row {
      display: flex;
      gap: 10px;
    }
    .qm-footer__newsletter-row input {
      flex: 1;
      min-width: 0;
      padding: 12px 16px;
      font-family: inherit;
      font-size: 14px;
      color: var(--qm-footer-text-strong);
      background: var(--qm-footer-bg);
      border: 1px solid var(--qm-footer-border);
      border-radius: 10px;
      transition: border-color 150ms ease;
    }
    .qm-footer__newsletter-row input::placeholder { color: var(--qm-footer-muted); }
    .qm-footer__newsletter-row input:focus {
      outline: none;
      border-color: #2563EB;
    }
    .qm-footer__newsletter-btn {
      padding: 12px 22px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      background: #2563EB;
      border: 1px solid #2563EB;
      border-radius: 10px;
      cursor: pointer;
      white-space: nowrap;
      transition: background 150ms ease, transform 150ms ease;
    }
    .qm-footer__newsletter-btn:hover:not(:disabled) {
      background: #1D4ED8;
      transform: translateY(-1px);
    }
    .qm-footer__newsletter-btn:disabled { opacity: 0.7; cursor: default; }
    .qm-footer__newsletter-btn:focus-visible {
      outline: 2px solid #93C5FD;
      outline-offset: 2px;
    }
    .qm-footer__newsletter-msg {
      margin: 8px 0 0;
      font-size: 12.5px;
      color: #FCA5A5;
    }
    .qm-footer__newsletter-msg--ok { color: #86EFAC; }

    /* ── Main grid ─────────────────────────────────────── */
    .qm-footer__main {
      padding: 56px 0 40px;
      border-bottom: 1px solid var(--qm-footer-border);
    }
    .qm-footer__grid {
      display: grid;
      grid-template-columns: 1.4fr repeat(3, 1fr);
      gap: 40px;
    }

    /* Brand */
    .qm-footer__logo {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      margin-bottom: 18px;
    }
    .qm-footer__logo-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #2563EB, #4F46E5);
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
    }
    .qm-footer__logo-text { display: flex; flex-direction: column; line-height: 1.15; }
    .qm-footer__logo-name {
      font-size: 16px;
      font-weight: 700;
      color: var(--qm-footer-text-strong);
      letter-spacing: -0.02em;
    }
    .qm-footer__logo-tag {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--qm-footer-muted);
    }
    .qm-footer__about {
      margin: 0 0 22px;
      max-width: 320px;
      line-height: 1.65;
    }

    /* Social */
    .qm-footer__social { display: flex; gap: 10px; }
    .qm-footer__social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      color: var(--qm-footer-text);
      background: var(--qm-footer-bg-soft);
      border: 1px solid var(--qm-footer-border);
      border-radius: 9px;
      transition: color 150ms ease, border-color 150ms ease, transform 150ms ease;
    }
    .qm-footer__social-link:hover {
      color: #fff;
      border-color: #2563EB;
      transform: translateY(-2px);
    }
    .qm-footer__social-link:focus-visible {
      outline: 2px solid #2563EB;
      outline-offset: 2px;
    }

    /* Columns */
    .qm-footer__heading {
      margin: 0 0 18px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--qm-footer-heading);
    }
    .qm-footer__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .qm-footer__link {
      color: var(--qm-footer-text);
      text-decoration: none;
      transition: color 150ms ease;
    }
    .qm-footer__link:hover { color: var(--qm-footer-text-strong); }

    /* ── Contact ───────────────────────────────────────── */
    .qm-footer__contact {
      border-bottom: 1px solid var(--qm-footer-border);
    }
    .qm-footer__contact-grid {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px 40px;
      padding-top: 24px;
      padding-bottom: 24px;
    }
    .qm-footer__contact-item {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: var(--qm-footer-text);
    }
    .qm-footer__contact-link {
      color: inherit;
      text-decoration: none;
      transition: color 150ms ease;
    }
    .qm-footer__contact-link:hover { color: var(--qm-footer-text-strong); }

    /* ── Bottom bar ────────────────────────────────────── */
    .qm-footer__bottom-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 14px 24px;
      padding-top: 24px;
      padding-bottom: 24px;
    }
    .qm-footer__copyright { margin: 0; color: var(--qm-footer-muted); }
    .qm-footer__legal {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 8px 24px;
    }
    .qm-footer__legal-link {
      color: var(--qm-footer-text);
      text-decoration: none;
      font-size: 13px;
      transition: color 150ms ease;
    }
    .qm-footer__legal-link:hover { color: var(--qm-footer-text-strong); }
    .qm-footer__top {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      color: var(--qm-footer-text);
      background: transparent;
      border: 1px solid var(--qm-footer-border);
      border-radius: 8px;
      cursor: pointer;
      transition: color 150ms ease, border-color 150ms ease;
    }
    .qm-footer__top:hover {
      color: #fff;
      border-color: #2563EB;
    }
    .qm-footer__top:focus-visible {
      outline: 2px solid #2563EB;
      outline-offset: 2px;
    }

    /* ── Responsive ────────────────────────────────────── */
    @media (max-width: 1023px) {
      .qm-footer__grid { grid-template-columns: 1fr 1fr; }
      .qm-footer__brand { grid-column: 1 / -1; }
    }
    @media (max-width: 767px) {
      .qm-footer__container { padding: 0 16px; }
      .qm-footer__grid { grid-template-columns: 1fr; gap: 28px; }
      .qm-footer__newsletter-row { flex-direction: column; }
      .qm-footer__newsletter-btn { width: 100%; justify-content: center; }
      .qm-footer__bottom-inner { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class QmFooterComponent {
  currentYear = new Date().getFullYear();

  newsletterEmail = '';
  newsletterError = signal(false);
  newsletterSuccess = signal(false);

  services: FooterLink[] = [
    { label: 'What We Build', href: '/what-we-build' },
    { label: 'Engineering', href: '/engineering' },
    { label: 'Industries', href: '/industries' },
    { label: 'Technology', href: '/technology' }
  ];

  company: FooterLink[] = [
    { label: 'About', href: '/about' },
    { label: 'QuantsMind Labs', href: '/labs' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' }
  ];

  resources: FooterLink[] = [
    { label: 'Enterprise Software', href: '/what-we-build#enterprise-software' },
    { label: 'AI Engineering', href: '/what-we-build#ai-engineering' },
    { label: 'Data Engineering', href: '/what-we-build#data-engineering' },
    { label: 'Cloud & Platform Engineering', href: '/what-we-build#cloud-engineering' }
  ];

  legal: FooterLink[] = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' }
  ];

  socials: Array<{ label: string; href: string; icon: string }> = [
    {
      label: 'Email QuantsMind',
      href: 'mailto:ajitkumar&#64;quantsmind.com',
      icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>`
    },
    {
      label: 'QuantsMind on LinkedIn',
      href: 'https://www.linkedin.com/company/quantsmind',
      icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`
    },
    {
      label: 'QuantsMind on X',
      href: 'https://x.com/quantsmind',
      icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg>`
    },
    {
      label: 'QuantsMind on GitHub',
      href: 'https://github.com/quantsmind',
      icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14v3.17c0 .3.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>`
    }
  ];

  subscribe(): void {
    const email = this.newsletterEmail.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      this.newsletterError.set(true);
      this.newsletterSuccess.set(false);
      return;
    }
    this.newsletterError.set(false);
    this.newsletterSuccess.set(true);
    this.newsletterEmail = '';
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
