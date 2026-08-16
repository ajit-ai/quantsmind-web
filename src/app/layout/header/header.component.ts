import {
  Component, HostListener, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { QmButtonComponent } from '../../shared/components/qm-button/qm-button.component';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

@Component({
  selector: 'qm-header',
  standalone: true,
  imports: [CommonModule, RouterModule, QmButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="qm-header" [class.qm-header--scrolled]="isScrolled" role="banner">
      <div class="qm-header__inner">

        <!-- Logo -->
        <a routerLink="/" class="qm-header__logo" aria-label="QuantsMind — Home">
          <span class="qm-header__logo-mark" aria-hidden="true">QM</span>
          <span class="qm-header__logo-name">QuantsMind</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="qm-header__nav" aria-label="Primary navigation" role="navigation">
          <ul class="qm-header__nav-list" role="list">
            <li *ngFor="let item of navItems" class="qm-header__nav-item"
                [class.qm-header__nav-item--has-menu]="item.children?.length"
                (mouseenter)="item.children ? openMega(item.label) : null"
                (mouseleave)="item.children ? closeMega() : null">

              <a [routerLink]="item.href"
                 routerLinkActive="qm-header__nav-link--active"
                 [routerLinkActiveOptions]="{exact: item.href === '/'}"
                 class="qm-header__nav-link"
                 [attr.aria-expanded]="item.children ? (activeMega === item.label) : null"
                 [attr.aria-haspopup]="item.children ? 'true' : null"
                 (click)="closeMega()">
                {{ item.label }}
                <svg *ngIf="item.children" class="qm-header__nav-chevron" aria-hidden="true"
                     width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>

              <!-- Mega Menu -->
              <div *ngIf="item.children && activeMega === item.label"
                   class="qm-mega"
                   role="region"
                   [attr.aria-label]="item.label + ' submenu'">
                <div class="qm-mega__inner">
                  <div class="qm-mega__eyebrow">{{ item.label }}</div>
                  <ul class="qm-mega__list" role="list">
                    <li *ngFor="let child of item.children" class="qm-mega__item">
                      <a [routerLink]="child.href" class="qm-mega__link" (click)="closeMega()">
                        <span class="qm-mega__link-label">{{ child.label }}</span>
                        <span *ngIf="child.description" class="qm-mega__link-desc">
                          {{ child.description }}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <!-- CTA -->
        <div class="qm-header__cta">
          <qm-button variant="primary" size="sm" [routerLinkValue]="'/contact'">
            Talk to QuantsMind
          </qm-button>
        </div>

        <!-- Mobile menu toggle -->
        <button class="qm-header__mobile-toggle"
                [attr.aria-expanded]="mobileOpen"
                aria-controls="qm-mobile-nav"
                aria-label="Toggle navigation menu"
                (click)="toggleMobile()">
          <svg *ngIf="!mobileOpen" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round"/>
          </svg>
          <svg *ngIf="mobileOpen" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <nav *ngIf="mobileOpen"
           id="qm-mobile-nav"
           class="qm-mobile-nav"
           aria-label="Mobile navigation">
        <ul class="qm-mobile-nav__list" role="list">
          <li *ngFor="let item of navItems">
            <a [routerLink]="item.href"
               class="qm-mobile-nav__link"
               routerLinkActive="qm-mobile-nav__link--active"
               [routerLinkActiveOptions]="{exact: item.href === '/'}"
               (click)="closeMobile()">
              {{ item.label }}
            </a>
            <ul *ngIf="item.children" class="qm-mobile-nav__sub" role="list">
              <li *ngFor="let child of item.children">
                <a [routerLink]="child.href" class="qm-mobile-nav__sub-link" (click)="closeMobile()">
                  {{ child.label }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="qm-mobile-nav__cta">
          <qm-button variant="primary" [routerLinkValue]="'/contact'" [fullWidth]="true" (clicked)="closeMobile()">
            Talk to QuantsMind →
          </qm-button>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .qm-header {
      position: sticky;
      top: 0;
      z-index: 200;
      background: rgba(255,255,255,0.96);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid #E2E8F0;
      transition: box-shadow 200ms ease;
    }
    .qm-header--scrolled {
      box-shadow: 0 1px 8px rgba(0,0,0,0.06);
    }

    .qm-header__inner {
      display: flex;
      align-items: center;
      gap: 24px;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 32px;
      height: 64px;
    }

    /* Logo */
    .qm-header__logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .qm-header__logo-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #2563EB;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      border-radius: 8px;
    }
    .qm-header__logo-name {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      letter-spacing: -0.02em;
    }

    /* Desktop nav */
    .qm-header__nav {
      flex: 1;
      display: none;
    }
    @media (min-width: 1024px) {
      .qm-header__nav { display: block; }
    }

    .qm-header__nav-list {
      display: flex;
      align-items: center;
      gap: 2px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .qm-header__nav-item {
      position: relative;
    }

    .qm-header__nav-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 500;
      color: #475569;
      text-decoration: none;
      border-radius: 6px;
      transition: color 150ms ease, background 150ms ease;
    }
    .qm-header__nav-link:hover,
    .qm-header__nav-link--active {
      color: #111827;
      background: #F1F5F9;
    }
    .qm-header__nav-link:focus-visible {
      outline: 2px solid #2563EB;
      outline-offset: 2px;
    }

    .qm-header__nav-chevron {
      opacity: 0.5;
      transition: transform 150ms ease;
    }
    .qm-header__nav-item--has-menu:hover .qm-header__nav-chevron {
      transform: rotate(180deg);
      opacity: 1;
    }

    /* CTA */
    .qm-header__cta {
      display: none;
      flex-shrink: 0;
    }
    @media (min-width: 1024px) {
      .qm-header__cta { display: block; }
    }

    /* Mobile toggle */
    .qm-header__mobile-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: none;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      color: #475569;
      cursor: pointer;
      margin-left: auto;
      transition: background 150ms ease, color 150ms ease;
    }
    .qm-header__mobile-toggle:hover {
      background: #F1F5F9;
      color: #111827;
    }
    .qm-header__mobile-toggle:focus-visible {
      outline: 2px solid #2563EB;
      outline-offset: 2px;
    }
    @media (min-width: 1024px) {
      .qm-header__mobile-toggle { display: none; }
    }

    /* Mega menu */
    .qm-mega {
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      z-index: 300;
      min-width: 280px;
      padding: 8px;
    }
    .qm-mega__inner { padding: 8px; }
    .qm-mega__eyebrow {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94A3B8;
      padding: 0 8px 8px;
      border-bottom: 1px solid #F1F5F9;
      margin-bottom: 8px;
    }
    .qm-mega__list { list-style: none; margin: 0; padding: 0; }
    .qm-mega__item { margin: 0; }
    .qm-mega__link {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-radius: 8px;
      text-decoration: none;
      transition: background 150ms ease;
    }
    .qm-mega__link:hover { background: #F8FAFC; }
    .qm-mega__link:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; }
    .qm-mega__link-label {
      font-size: 14px;
      font-weight: 500;
      color: #111827;
    }
    .qm-mega__link-desc {
      font-size: 12px;
      color: #64748B;
      margin-top: 2px;
    }

    /* Mobile nav */
    .qm-mobile-nav {
      border-top: 1px solid #E2E8F0;
      background: #FFFFFF;
      padding: 16px;
    }
    @media (min-width: 1024px) {
      .qm-mobile-nav { display: none; }
    }
    .qm-mobile-nav__list { list-style: none; margin: 0 0 16px; padding: 0; }
    .qm-mobile-nav__link {
      display: block;
      padding: 12px 8px;
      font-size: 16px;
      font-weight: 500;
      color: #475569;
      text-decoration: none;
      border-bottom: 1px solid #F1F5F9;
    }
    .qm-mobile-nav__link--active { color: #2563EB; }
    .qm-mobile-nav__sub { list-style: none; margin: 0; padding: 0 0 0 16px; }
    .qm-mobile-nav__sub-link {
      display: block;
      padding: 8px;
      font-size: 14px;
      color: #64748B;
      text-decoration: none;
    }
    .qm-mobile-nav__cta { padding-top: 16px; }

    @media (max-width: 767px) {
      .qm-header__inner { padding: 0 16px; }
      .qm-header__logo-name { display: none; }
    }
  `]
})
export class QmHeaderComponent implements OnInit, OnDestroy {
  isScrolled   = false;
  mobileOpen   = false;
  activeMega: string | null = null;
  private routerSub?: Subscription;

  navItems: NavItem[] = [
    {
      label: 'What We Build',
      href: '/what-we-build',
      children: [
        { label: 'Enterprise Software',         href: '/what-we-build#enterprise-software',   description: 'Mission-critical systems at scale' },
        { label: 'AI Engineering',              href: '/what-we-build#ai-engineering',         description: 'Applied AI built into products' },
        { label: 'Data Engineering',            href: '/what-we-build#data-engineering',       description: 'Pipelines, platforms, and analytics' },
        { label: 'Cloud & Platform Engineering',href: '/what-we-build#cloud-engineering',      description: 'Distributed systems and infrastructure' },
        { label: 'Enterprise Modernization',    href: '/what-we-build#modernization',          description: 'Evolving legacy platforms' },
        { label: 'Advanced Computing',          href: '/what-we-build#advanced-computing',     description: 'Optimization and emerging computation' },
      ]
    },
    { label: 'Engineering',  href: '/engineering' },
    { label: 'Industries',   href: '/industries' },
    {
      label: 'Technology',
      href: '/technology',
      children: [
        { label: 'Artificial Intelligence',    href: '/technology#ai' },
        { label: 'Data & Analytics',           href: '/technology#data' },
        { label: 'Cloud & Distributed Systems',href: '/technology#cloud' },
        { label: 'Software Systems',           href: '/technology#software' },
        { label: 'Optimization',               href: '/technology#optimization' },
        { label: 'Quantum Computing',          href: '/technology#quantum' },
        { label: 'Advanced Computing',         href: '/technology#advanced-computing' },
      ]
    },
    { label: 'Labs',     href: '/labs' },
    { label: 'Insights', href: '/insights' },
    { label: 'About',    href: '/about' },
  ];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(() => {
        this.closeMega();
        this.closeMobile();
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrolled = window.scrollY > 16;
    if (scrolled !== this.isScrolled) {
      this.isScrolled = scrolled;
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMega();
    this.closeMobile();
    this.cdr.markForCheck();
  }

  openMega(label: string): void {
    this.activeMega = label;
    this.cdr.markForCheck();
  }

  closeMega(): void {
    this.activeMega = null;
    this.cdr.markForCheck();
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
    this.cdr.markForCheck();
  }

  closeMobile(): void {
    this.mobileOpen = false;
    this.cdr.markForCheck();
  }
}
