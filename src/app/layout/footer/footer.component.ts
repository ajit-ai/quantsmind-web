import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'qm-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="qm-footer" role="contentinfo">
      <div class="qm-footer__inner">

        <!-- Brand -->
        <div class="qm-footer__brand">
          <a routerLink="/" class="qm-footer__logo" aria-label="QuantsMind Home">
            <span class="qm-footer__logo-mark" aria-hidden="true">QM</span>
            <span class="qm-footer__logo-name">QuantsMind</span>
          </a>
          <p class="qm-footer__tagline">Technology Engineering for Complex Problems.</p>
          <p class="qm-footer__sub">Enterprise Software. Intelligent Systems. Advanced Computing.</p>

          <!-- Address -->
          <address class="qm-footer__address">
            28, Shikargarh<br>
            Jodhpur – 342015<br>
            Rajasthan, India
          </address>

          <!-- Email + LinkedIn -->
          <div class="qm-footer__social">
            <a href="mailto:hello&#64;quantsmind.com"
               class="qm-footer__social-link"
               aria-label="Email QuantsMind">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>hello&#64;quantsmind.com</span>
            </a>

            <a href="https://www.linkedin.com/company/quantsmind"
               class="qm-footer__social-link"
               target="_blank" rel="noopener noreferrer"
               aria-label="QuantsMind on LinkedIn">
              <!-- LinkedIn brand icon -->
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037
                         -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
                         c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z
                         M5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065z
                         m1.782 13.019H3.555V9h3.564v11.452z
                         M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24
                         h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <!-- Nav columns -->
        <nav class="qm-footer__nav" aria-label="Footer navigation">
          <div class="qm-footer__col">
            <h3 class="qm-footer__col-heading">Services</h3>
            <ul class="qm-footer__list" role="list">
              <li><a routerLink="/what-we-build">What We Build</a></li>
              <li><a routerLink="/engineering">Engineering</a></li>
              <li><a routerLink="/industries">Industries</a></li>
              <li><a routerLink="/technology">Technology</a></li>
            </ul>
          </div>
          <div class="qm-footer__col">
            <h3 class="qm-footer__col-heading">Research</h3>
            <ul class="qm-footer__list" role="list">
              <li><a routerLink="/labs">QuantsMind Labs</a></li>
              <li><a routerLink="/insights">Insights</a></li>
            </ul>
          </div>
          <div class="qm-footer__col">
            <h3 class="qm-footer__col-heading">Company</h3>
            <ul class="qm-footer__list" role="list">
              <li><a routerLink="/about">About</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <!-- Bottom bar -->
      <div class="qm-footer__bottom">
        <div class="qm-footer__bottom-inner">
          <p class="qm-footer__copy">
            &copy; {{ currentYear }} QuantsMind. All rights reserved.
          </p>
          <ul class="qm-footer__legal" role="list">
            <li><a routerLink="/privacy">Privacy Policy</a></li>
            <li><a routerLink="/terms">Terms of Use</a></li>
            <li><a routerLink="/cookies">Cookie Policy</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .qm-footer { background: #0F172A; color: #94A3B8; }

    .qm-footer__inner {
      display: grid; grid-template-columns: 1fr; gap: 48px;
      max-width: 1280px; margin: 0 auto; padding: 64px 16px 48px;
    }
    @media (min-width: 768px) {
      .qm-footer__inner {
        grid-template-columns: 1fr 2fr; padding: 80px 32px 64px; gap: 64px;
      }
    }

    /* Brand */
    .qm-footer__logo {
      display: inline-flex; align-items: center; gap: 10px;
      text-decoration: none; margin-bottom: 20px;
    }
    .qm-footer__logo-mark {
      display: inline-flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; background: #2563EB; color: #fff;
      font-size: 12px; font-weight: 700; letter-spacing: 0.04em; border-radius: 8px;
    }
    .qm-footer__logo-name {
      font-size: 16px; font-weight: 600; color: #F1F5F9; letter-spacing: -0.02em;
    }
    .qm-footer__tagline {
      font-size: 15px; color: #F1F5F9; font-weight: 500; margin: 0 0 6px; line-height: 1.5;
    }
    .qm-footer__sub { font-size: 13px; color: #475569; margin: 0 0 20px; line-height: 1.6; }

    .qm-footer__address {
      font-size: 13px; color: #64748B; line-height: 1.8;
      font-style: normal; margin: 0 0 20px;
    }

    /* Social / contact links */
    .qm-footer__social {
      display: flex; flex-direction: column; gap: 10px;
    }
    .qm-footer__social-link {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 13px; color: #64748B; text-decoration: none;
      transition: color 150ms ease;
    }
    .qm-footer__social-link:hover { color: #94A3B8; }
    .qm-footer__social-link:focus-visible {
      outline: 2px solid #2563EB; outline-offset: 2px; border-radius: 2px;
    }
    .qm-footer__social-link svg { flex-shrink: 0; }

    /* Nav columns */
    .qm-footer__nav {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
    }
    @media (max-width: 480px) { .qm-footer__nav { grid-template-columns: 1fr 1fr; } }

    .qm-footer__col-heading {
      font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; color: #475569; margin: 0 0 16px;
    }
    .qm-footer__list {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-direction: column; gap: 10px;
    }
    .qm-footer__list a {
      font-size: 14px; color: #94A3B8; text-decoration: none; transition: color 150ms ease;
    }
    .qm-footer__list a:hover { color: #F1F5F9; }
    .qm-footer__list a:focus-visible {
      outline: 2px solid #2563EB; outline-offset: 2px; border-radius: 2px;
    }

    /* Bottom bar */
    .qm-footer__bottom { border-top: 1px solid #1E293B; }
    .qm-footer__bottom-inner {
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 16px;
      max-width: 1280px; margin: 0 auto; padding: 24px 32px;
    }
    @media (max-width: 767px) {
      .qm-footer__bottom-inner { padding: 20px 16px; flex-direction: column; align-items: flex-start; }
    }

    .qm-footer__copy { font-size: 13px; color: #475569; margin: 0; }

    .qm-footer__legal {
      display: flex; flex-wrap: wrap; gap: 20px; list-style: none; margin: 0; padding: 0;
    }
    .qm-footer__legal a {
      font-size: 13px; color: #475569; text-decoration: none; transition: color 150ms ease;
    }
    .qm-footer__legal a:hover { color: #94A3B8; }
    .qm-footer__legal a:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; }
  `]
})
export class QmFooterComponent {
  currentYear = new Date().getFullYear();
}
