import {
  Component, HostListener, OnInit, OnDestroy, ViewChild, ElementRef,
  ChangeDetectionStrategy, ChangeDetectorRef, signal, computed
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule, Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { QmButtonComponent } from '../../shared/components/qm-button/qm-button.component';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
import { HrefPartsPipe } from '../../shared/pipes/href-parts.pipe';

interface MegaChild {
  label: string;
  href: string;
  description?: string;
  icon: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: MegaChild[];
}

interface SearchEntry {
  type: string;
  title: string;
  href: string;
  keywords: string;
}

@Component({
    selector: 'qm-header',
    imports: [FormsModule, RouterModule, QmButtonComponent, SafeHtmlPipe, HrefPartsPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ═══════════════════════════════════════════════ -->
    <!-- MAIN HEADER                                      -->
    <!-- ═══════════════════════════════════════════════ -->
    <header class="qm-header" [class.qm-header--scrolled]="isScrolled" role="banner">
      <div class="qm-header__accent" aria-hidden="true"></div>
    
      <div class="qm-header__inner">
    
        <!-- Logo -->
        <a routerLink="/" class="qm-header__logo" aria-label="QuantsMind — Home">
          <span class="qm-header__logo-mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l7 4v5c0 5-3 9.5-7 11-4-1.5-7-6-7-11V6l7-4z" stroke="#fff"
                stroke-width="1.6" stroke-linejoin="round"/>
              <path d="M9 9.5l3 3 3-3M12 12.5v3" stroke="#fff" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="qm-header__logo-text">
            <span class="qm-header__logo-name">QuantsMind</span>
            <span class="qm-header__logo-tag">Technology Engineering</span>
          </span>
        </a>
    
        <!-- Desktop Navigation -->
        <nav class="qm-header__nav" aria-label="Primary navigation" role="navigation">
          <ul class="qm-header__nav-list" role="list">
            @for (item of navItems; track item) {
              <li class="qm-header__nav-item"
                [class.qm-header__nav-item--has-menu]="item.children?.length"
                (mouseenter)="item.children ? openMega(item.label) : null"
                (mouseleave)="item.children ? closeMega() : null"
                (focusin)="item.children ? openMega(item.label) : null"
                (focusout)="item.children ? closeMega() : null">
                <a [routerLink]="item.href"
                  routerLinkActive="qm-header__nav-link--active"
                  [routerLinkActiveOptions]="{exact: item.href === '/'}"
                  class="qm-header__nav-link"
                  [attr.aria-expanded]="item.children ? (activeMega === item.label) : null"
                  [attr.aria-haspopup]="item.children ? 'true' : null"
                  (click)="onNavClick($event, item)">
                  {{ item.label }}
                  @if (item.children) {
                    <svg class="qm-header__nav-chevron" aria-hidden="true"
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  }
                </a>
                <!-- Mega Menu -->
                @if (item.children && activeMega === item.label) {
                  <div
                    class="qm-mega"
                    role="region"
                    [attr.aria-label]="item.label + ' submenu'">
                    <div class="qm-mega__inner">
                      <div class="qm-mega__grid" [class.qm-mega__grid--wide]="item.children.length > 5">
                        @for (child of item.children; track child) {
                          @let childLink = child.href | hrefParts;
                          <a [routerLink]="childLink.path" [fragment]="childLink.fragment"
                            class="qm-mega__link" (click)="closeMega()">
                            <span class="qm-mega__icon" aria-hidden="true" [innerHTML]="child.icon | qmSafeHtml"></span>
                            <span class="qm-mega__body">
                              <span class="qm-mega__label">{{ child.label }}</span>
                              @if (child.description) {
                                <span class="qm-mega__desc">{{ child.description }}</span>
                              }
                            </span>
                          </a>
                        }
                      </div>
                      <div class="qm-mega__footer">
                        <a [routerLink]="item.href" class="qm-mega__overview" (click)="closeMega()">
                          Explore {{ item.label }}
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                }
              </li>
            }
          </ul>
        </nav>
    
        <!-- Actions: Search / Theme / CTA -->
        <div class="qm-header__actions">
          <button type="button" class="qm-header__icon-btn" (click)="openSearch()"
            aria-label="Search site">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
              <path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round"/>
            </svg>
          </button>
    
          <button type="button" class="qm-header__icon-btn" (click)="toggleTheme()"
            [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
            @if (!isDark()) {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" stroke="currentColor"
                  stroke-width="1.8" stroke-linejoin="round"/>
              </svg>
            }
            @if (isDark()) {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
                <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            }
          </button>
    
          <div class="qm-header__cta">
            <qm-button variant="primary" size="sm" [routerLinkValue]="'/contact'">
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </qm-button>
          </div>
        </div>
    
        <!-- Mobile menu toggle -->
        <button type="button" class="qm-header__mobile-toggle"
          [class.qm-header__mobile-toggle--open]="mobileOpen"
          [attr.aria-expanded]="mobileOpen"
          aria-controls="qm-mobile-nav"
          aria-label="Toggle navigation menu"
          (click)="toggleMobile()">
          <span class="qm-header__mobile-line"></span>
          <span class="qm-header__mobile-line"></span>
          <span class="qm-header__mobile-line"></span>
        </button>
      </div>
    
      <!-- Mobile drawer backdrop -->
      @if (mobileOpen) {
        <div class="qm-mobile-backdrop" (click)="closeMobile()"></div>
      }
    
      <!-- Mobile Navigation drawer -->
      @if (mobileOpen) {
        <div class="qm-mobile-nav"
          id="qm-mobile-nav"
          role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div class="qm-mobile-nav__head">
            <a routerLink="/" class="qm-header__logo" aria-label="QuantsMind — Home"
              (click)="closeMobile()">
              <span class="qm-header__logo-mark" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l7 4v5c0 5-3 9.5-7 11-4-1.5-7-6-7-11V6l7-4z" stroke="#fff"
                    stroke-width="1.6" stroke-linejoin="round"/>
                  <path d="M9 9.5l3 3 3-3M12 12.5v3" stroke="#fff" stroke-width="1.6"
                    stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="qm-header__logo-text">
                <span class="qm-header__logo-name">QuantsMind</span>
                <span class="qm-header__logo-tag">Technology Engineering</span>
              </span>
            </a>
            <button type="button" class="qm-mobile-nav__close" (click)="closeMobile()"
              aria-label="Close menu">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <!-- Mobile actions -->
          <div class="qm-mobile-nav__actions">
            <button type="button" class="qm-mobile-nav__action" (click)="openSearch()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
                <path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
              Search
            </button>
            <button type="button" class="qm-mobile-nav__action" (click)="toggleTheme()">
              @if (!isDark()) {
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" stroke="currentColor"
                    stroke-width="1.8" stroke-linejoin="round"/>
                </svg>
              }
              @if (isDark()) {
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
                    stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              }
              {{ isDark() ? 'Light mode' : 'Dark mode' }}
            </button>
          </div>
          <ul class="qm-mobile-nav__list" role="list">
            @for (item of navItems; track item) {
              <li class="qm-mobile-nav__item"
                [class.qm-mobile-nav__item--open]="mobileSubOpen[item.label]">
                <a [routerLink]="item.href"
                  class="qm-mobile-nav__link"
                  routerLinkActive="qm-mobile-nav__link--active"
                  [routerLinkActiveOptions]="{exact: item.href === '/'}"
                  (click)="closeMobile()">
                  {{ item.label }}
                  @if (item.children) {
                    <button type="button"
                      class="qm-mobile-nav__toggle"
                      aria-hidden="true" tabindex="-1"
                      (click)="toggleSub($event, item.label)">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5.5l4 4 4-4" stroke="currentColor" stroke-width="1.6"
                          stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  }
                </a>
                @if (item.children) {
                  <ul class="qm-mobile-nav__sub"
                    role="list" [class.qm-mobile-nav__sub--open]="mobileSubOpen[item.label]">
                    @for (child of item.children; track child) {
                      <li>
                        @let childLink = child.href | hrefParts;
                        <a [routerLink]="childLink.path" [fragment]="childLink.fragment" class="qm-mobile-nav__sub-link" (click)="closeMobile()">
                          {{ child.label }}
                        </a>
                      </li>
                    }
                  </ul>
                }
              </li>
            }
          </ul>
          <div class="qm-mobile-nav__cta">
            <qm-button variant="primary" [routerLinkValue]="'/contact'" [fullWidth]="true"
              (clicked)="closeMobile()">
              Get in Touch →
            </qm-button>
          </div>
        </div>
      }
    </header>
    
    <!-- ═══════════════════════════════════════════════ -->
    <!-- SEARCH OVERLAY                                   -->
    <!-- ═══════════════════════════════════════════════ -->
    @if (searchOpen()) {
      <div class="qm-search-overlay" role="dialog"
        aria-modal="true" aria-label="Search site">
        <div class="qm-search-overlay__backdrop" (click)="closeSearch()"></div>
        <div class="qm-search-overlay__panel">
          <div class="qm-search-overlay__input-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
              <path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            <input #searchInput type="search"
              [ngModel]="searchQuery()"
              (ngModelChange)="onQueryChange($event)"
              (keydown.enter)="goToTopResult()"
              placeholder="Search pages, capabilities, technologies…"
              autocomplete="off" spellcheck="false" aria-label="Search"/>
            <button type="button" class="qm-search-overlay__close" (click)="closeSearch()"
              aria-label="Close search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          @if (searchQuery().trim()) {
            <div class="qm-search-overlay__results">
              @if (searchResults().length) {
                @for (r of searchResults(); track r) {
                  @let resultLink = r.href | hrefParts;
                  <a [routerLink]="resultLink.path" [fragment]="resultLink.fragment"
                    class="qm-search-overlay__result" (click)="closeSearch()">
                    <span class="qm-search-overlay__result-type">{{ r.type }}</span>
                    <span class="qm-search-overlay__result-title">{{ r.title }}</span>
                  </a>
                }
              }
              @if (searchResults().length === 0) {
                <p class="qm-search-overlay__empty">
                  No matches for “{{ searchQuery() }}”. Try “AI”, “data”, “cloud”.
                </p>
              }
            </div>
          }
          <div class="qm-search-overlay__footer">
            <span><kbd>Enter</kbd> to open</span>
            <span><kbd>Esc</kbd> to close</span>
          </div>
        </div>
      </div>
    }
    `,
    styles: [`
    /* ── Header shell ────────────────────────────────── */
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 200;
    }
    .qm-header {
      position: relative;
      background: transparent;
      border-bottom: 1px solid var(--qm-header-border);
      transition: box-shadow 250ms ease;
    }
    .qm-header::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background: var(--qm-header-bg);
      backdrop-filter: blur(18px) saturate(1.5);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
    }
    .qm-header--scrolled { box-shadow: var(--qm-header-shadow); }

    .qm-header__accent {
      height: 2px;
      background: linear-gradient(90deg, #2563EB, #7C3AED, #06B6D4);
    }

    .qm-header__inner {
      display: flex;
      align-items: center;
      gap: 20px;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 32px;
      height: 68px;
    }

    /* ── Logo ────────────────────────────────────────── */
    .qm-header__logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .qm-header__logo-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, #2563EB, #4F46E5);
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
    }
    .qm-header__logo-text { display: flex; flex-direction: column; line-height: 1.15; }
    .qm-header__logo-name {
      font-size: 16px;
      font-weight: 700;
      color: var(--qm-header-text-strong);
      letter-spacing: -0.02em;
    }
    .qm-header__logo-tag {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--qm-header-muted);
    }

    /* ── Desktop nav ─────────────────────────────────── */
    .qm-header__nav { flex: 1; display: none; }
    @media (min-width: 1200px) { .qm-header__nav { display: block; } }

    .qm-header__nav-list {
      display: flex;
      align-items: center;
      gap: 2px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .qm-header__nav-item { position: relative; }

    .qm-header__nav-link {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 9px 12px;
      font-size: 14px;
      font-weight: 500;
      color: var(--qm-header-text);
      text-decoration: none;
      border-radius: 8px;
      transition: color 150ms ease;
    }
    .qm-header__nav-link:hover,
    .qm-header__nav-link--active {
      color: var(--qm-header-text-strong);
    }
    .qm-header__nav-link--active { color: var(--qm-header-accent); }
    .qm-header__nav-link::after {
      content: '';
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 2px;
      height: 2px;
      border-radius: 2px;
      background: var(--qm-header-accent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 200ms ease;
    }
    .qm-header__nav-link:hover::after,
    .qm-header__nav-link--active::after { transform: scaleX(1); }
    .qm-header__nav-link:focus-visible {
      outline: 2px solid var(--qm-header-accent);
      outline-offset: 2px;
    }

    .qm-header__nav-chevron {
      opacity: 0.5;
      transition: transform 200ms ease, opacity 200ms ease;
    }
    .qm-header__nav-item--has-menu:hover .qm-header__nav-chevron,
    .qm-header__nav-item--has-menu:focus-within .qm-header__nav-chevron {
      transform: rotate(180deg);
      opacity: 1;
    }

    /* ── Actions ─────────────────────────────────────── */
    .qm-header__actions {
      display: none;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    @media (min-width: 1200px) { .qm-header__actions { display: flex; } }

    .qm-header__icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border: 1px solid var(--qm-header-border);
      border-radius: 10px;
      background: transparent;
      color: var(--qm-header-text);
      cursor: pointer;
      transition: color 150ms ease, border-color 150ms ease, transform 150ms ease, background 150ms ease;
    }
    .qm-header__icon-btn:hover {
      color: var(--qm-header-accent);
      border-color: var(--qm-header-accent);
      background: var(--qm-panel-icon);
      transform: translateY(-1px);
    }
    .qm-header__icon-btn:focus-visible { outline: 2px solid var(--qm-header-accent); outline-offset: 2px; }

    .qm-header__cta { display: none; }
    @media (min-width: 1200px) { .qm-header__cta { display: block; } }

    /* ── Mega menu ───────────────────────────────────── */
    .qm-mega {
      position: absolute;
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      background: var(--qm-panel-bg);
      border: 1px solid var(--qm-panel-border);
      border-radius: 14px;
      box-shadow: 0 24px 60px rgba(2, 6, 23, 0.14);
      z-index: 300;
      min-width: 300px;
      animation: qmMegaIn 180ms ease;
    }
    .qm-mega::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 0;
      right: 0;
      height: 10px;
    }
    @keyframes qmMegaIn {
      from { opacity: 0; transform: translateX(-50%) translateY(8px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .qm-mega__inner { padding: 10px; }
    .qm-mega__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 4px;
    }
    .qm-mega__grid--wide { grid-template-columns: 1fr 1fr; }
    @media (max-width: 1199px) { .qm-mega__grid--wide { grid-template-columns: 1fr; } }

    .qm-mega__link {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px;
      border-radius: 10px;
      text-decoration: none;
      transition: background 150ms ease, transform 150ms ease;
    }
    .qm-mega__link:hover {
      background: var(--qm-panel-hover);
      transform: translateX(2px);
    }
    .qm-mega__link:focus-visible {
      outline: 2px solid var(--qm-header-accent);
      outline-offset: 2px;
    }
    .qm-mega__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: var(--qm-panel-icon);
      color: var(--qm-header-accent);
      flex-shrink: 0;
    }
    .qm-mega__body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
    .qm-mega__label {
      font-size: 14px;
      font-weight: 600;
      color: var(--qm-header-text-strong);
    }
    .qm-mega__desc {
      font-size: 12px;
      color: var(--qm-header-muted);
      line-height: 1.45;
    }
    .qm-mega__footer {
      margin-top: 6px;
      padding-top: 8px;
      border-top: 1px solid var(--qm-panel-border);
    }
    .qm-mega__overview {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      font-size: 13px;
      font-weight: 600;
      color: var(--qm-header-accent);
      text-decoration: none;
      border-radius: 8px;
      transition: background 150ms ease;
    }
    .qm-mega__overview:hover { background: var(--qm-panel-hover); }

    /* ── Mobile toggle ───────────────────────────────── */
    .qm-header__mobile-toggle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 42px;
      height: 42px;
      padding: 0 10px;
      background: transparent;
      border: 1px solid var(--qm-header-border);
      border-radius: 10px;
      cursor: pointer;
      margin-left: auto;
      transition: border-color 150ms ease, background 150ms ease;
    }
    @media (min-width: 1200px) { .qm-header__mobile-toggle { display: none; } }
    .qm-header__mobile-line {
      display: block;
      height: 2px;
      border-radius: 2px;
      background: var(--qm-header-text);
      transition: transform 220ms ease, opacity 220ms ease;
    }
    .qm-header__mobile-toggle--open .qm-header__mobile-line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .qm-header__mobile-toggle--open .qm-header__mobile-line:nth-child(2) { opacity: 0; }
    .qm-header__mobile-toggle--open .qm-header__mobile-line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* ── Mobile drawer ───────────────────────────────── */
    .qm-mobile-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(2, 6, 23, 0.5);
      z-index: 210;
      animation: qmFadeIn 200ms ease;
    }
    @keyframes qmFadeIn { from { opacity: 0; } to { opacity: 1; } }

    .qm-mobile-nav {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(88vw, 380px);
      background: var(--qm-panel-bg);
      z-index: 220;
      overflow-y: auto;
      box-shadow: -20px 0 60px rgba(0, 0, 0, 0.25);
      animation: qmDrawerIn 260ms ease;
    }
    @keyframes qmDrawerIn {
      from { transform: translateX(100%); }
      to   { transform: translateX(0); }
    }

    .qm-mobile-nav__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid var(--qm-panel-border);
    }
    .qm-mobile-nav__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--qm-panel-border);
      border-radius: 8px;
      background: transparent;
      color: var(--qm-header-text);
      cursor: pointer;
      transition: color 150ms ease, border-color 150ms ease;
    }
    .qm-mobile-nav__close:hover { color: var(--qm-header-accent); border-color: var(--qm-header-accent); }

    .qm-mobile-nav__actions {
      display: flex;
      gap: 10px;
      padding: 16px 20px;
    }
    .qm-mobile-nav__action {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 12px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      color: var(--qm-header-text);
      background: transparent;
      border: 1px solid var(--qm-panel-border);
      border-radius: 10px;
      cursor: pointer;
      transition: color 150ms ease, border-color 150ms ease, background 150ms ease;
    }
    .qm-mobile-nav__action:hover {
      color: var(--qm-header-accent);
      border-color: var(--qm-header-accent);
      background: var(--qm-panel-icon);
    }

    .qm-mobile-nav__list { list-style: none; margin: 0; padding: 0; }
    .qm-mobile-nav__item { border-bottom: 1px solid var(--qm-panel-border); }
    .qm-mobile-nav__link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 16px 20px;
      font-size: 16px;
      font-weight: 600;
      color: var(--qm-header-text-strong);
      text-decoration: none;
      transition: color 150ms ease;
    }
    .qm-mobile-nav__link--active { color: var(--qm-header-accent); }
    .qm-mobile-nav__toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: transparent;
      border: none;
      color: var(--qm-header-muted);
      cursor: pointer;
      pointer-events: none;
    }
    .qm-mobile-nav__item--open .qm-mobile-nav__toggle svg { transform: rotate(180deg); }
    .qm-mobile-nav__toggle svg { transition: transform 200ms ease; }
    .qm-mobile-nav__sub {
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 260ms ease;
    }
    .qm-mobile-nav__sub--open { max-height: 400px; }
    .qm-mobile-nav__sub-link {
      display: block;
      padding: 12px 32px;
      font-size: 14px;
      color: var(--qm-header-text);
      text-decoration: none;
      transition: color 150ms ease, background 150ms ease;
    }
    .qm-mobile-nav__sub-link:hover {
      color: var(--qm-header-accent);
      background: var(--qm-panel-hover);
    }
    .qm-mobile-nav__cta { padding: 20px; }

    /* ── Search overlay ──────────────────────────────── */
    .qm-search-overlay {
      position: fixed;
      inset: 0;
      z-index: 500;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 10vh 24px 24px;
    }
    .qm-search-overlay__backdrop {
      position: absolute;
      inset: 0;
      background: rgba(2, 6, 23, 0.6);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    }
    .qm-search-overlay__panel {
      position: relative;
      width: 100%;
      max-width: 620px;
      background: var(--qm-panel-bg);
      border: 1px solid var(--qm-panel-border);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
      animation: qmPanelIn 200ms ease;
    }
    @keyframes qmPanelIn {
      from { opacity: 0; transform: translateY(-12px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .qm-search-overlay__input-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 18px 20px;
      border-bottom: 1px solid var(--qm-panel-border);
      color: var(--qm-header-muted);
    }
    .qm-search-overlay__input-wrap input {
      flex: 1;
      min-width: 0;
      font-family: inherit;
      font-size: 17px;
      color: var(--qm-header-text-strong);
      background: transparent;
      border: none;
      outline: none;
    }
    .qm-search-overlay__input-wrap input::placeholder { color: var(--qm-header-muted); }
    .qm-search-overlay__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--qm-header-muted);
      cursor: pointer;
      transition: color 150ms ease, background 150ms ease;
    }
    .qm-search-overlay__close:hover {
      color: var(--qm-header-text-strong);
      background: var(--qm-panel-hover);
    }

    .qm-search-overlay__results {
      max-height: 50vh;
      overflow-y: auto;
      padding: 8px;
    }
    .qm-search-overlay__result {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      text-decoration: none;
      transition: background 150ms ease;
    }
    .qm-search-overlay__result:hover { background: var(--qm-panel-hover); }
    .qm-search-overlay__result:focus-visible { outline: 2px solid var(--qm-header-accent); }
    .qm-search-overlay__result-type {
      flex-shrink: 0;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--qm-header-accent);
      background: var(--qm-panel-icon);
      border-radius: 9999px;
      padding: 3px 10px;
    }
    .qm-search-overlay__result-title {
      font-size: 15px;
      font-weight: 500;
      color: var(--qm-header-text-strong);
    }
    .qm-search-overlay__empty {
      padding: 24px 16px;
      margin: 0;
      text-align: center;
      font-size: 14px;
      color: var(--qm-header-muted);
    }
    .qm-search-overlay__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      border-top: 1px solid var(--qm-panel-border);
      font-size: 12px;
      color: var(--qm-header-muted);
    }
    .qm-search-overlay__footer kbd {
      font-family: inherit;
      font-size: 11px;
      background: var(--qm-panel-hover);
      border: 1px solid var(--qm-panel-border);
      border-radius: 4px;
      padding: 1px 6px;
      margin: 0 2px;
      color: var(--qm-header-text);
    }

    @media (max-width: 767px) {
      .qm-header__inner { padding: 0 16px; }
      .qm-header__logo-tag { display: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      .qm-header__nav-link::after,
      .qm-mega,
      .qm-mobile-nav,
      .qm-mobile-backdrop,
      .qm-search-overlay__panel,
      .qm-mobile-nav__toggle svg,
      .qm-header__mobile-line {
        transition: none;
        animation: none;
      }
    }
  `]
})
export class QmHeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  mobileOpen = false;
  activeMega: string | null = null;
  mobileSubOpen: Record<string, boolean> = {};

  searchOpen = signal(false);
  searchQuery = signal('');
  isDark = signal(false);

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  private routerSub?: Subscription;

  navItems: NavItem[] = [
    {
      label: 'Services',
      href: '/services',
      children: [
        {
          label: 'Software Architecture', href: '/services#software-architecture',
          description: 'System design and technical foundations',
          icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`
        },
        {
          label: 'Application Development', href: '/services#application-development',
          description: 'Backend systems, APIs and platforms',
          icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
        },
        {
          label: 'AI & Machine Learning', href: '/services#ai-ml-engineering',
          description: 'Applied AI built into products',
          icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`
        },
        {
          label: 'Cloud Engineering', href: '/services#cloud-engineering',
          description: 'Cloud architecture and infrastructure',
          icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`
        },
        {
          label: 'DevOps & CI/CD', href: '/services#devops-ci-cd',
          description: 'Reliable delivery and environments',
          icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 18 13.5 6 4.5 6"/><polyline points="21.5 15.5 23 18 21.5 20.5"/><polyline points="6 3.5 4.5 6 6 8.5"/><circle cx="21.5" cy="18" r="1.5"/><circle cx="4.5" cy="6" r="1.5"/></svg>`
        },
        {
          label: 'Technical Consulting', href: '/services#technical-consulting',
          description: 'Modernization and engineering guidance',
          icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>`
        }
      ]
    },
    {
      label: 'Technology',
      href: '/technology',
      children: [
        {
          label: 'MicroQuantum', href: '/microquantum',
          description: 'Open quantum computing SDK',
          icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/></svg>`
        },
        {
          label: 'Karkain', href: '/karkain',
          description: 'General-purpose programming language',
          icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
        },
        {
          label: 'QuantsMind SDK', href: '/quantsmind-sdk',
          description: 'Foundations for intelligent applications',
          icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`
        }
      ]
    },
    { label: 'Labs', href: '/labs' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  searchIndex: SearchEntry[] = [
    { type: 'Page', title: 'Home', href: '/', keywords: 'home quantsmind technology engineering intelligent software' },
    { type: 'Page', title: 'Services', href: '/services', keywords: 'services capabilities software architecture ai cloud devops consulting' },
    { type: 'Page', title: 'Technology', href: '/technology', keywords: 'technology ecosystem microquantum karkain sdk quantum' },
    { type: 'Page', title: 'MicroQuantum', href: '/microquantum', keywords: 'microquantum quantum computing sdk python open' },
    { type: 'Page', title: 'Karkain', href: '/karkain', keywords: 'karkain programming language compiler computing' },
    { type: 'Page', title: 'QuantsMind SDK', href: '/quantsmind-sdk', keywords: 'quantsmind sdk software foundation intelligent computing' },
    { type: 'Page', title: 'QuantsMind Labs', href: '/labs', keywords: 'labs research experimentation emerging technologies quantum ai ml' },
    { type: 'Page', title: 'About', href: '/about', keywords: 'about company engineering services technology development' },
    { type: 'Page', title: 'Contact', href: '/contact', keywords: 'contact enquiry email form build' },
    { type: 'Capability', title: 'Software Architecture', href: '/services#software-architecture', keywords: 'architecture system design technical foundations' },
    { type: 'Capability', title: 'Application Development', href: '/services#application-development', keywords: 'application development backend systems apis platforms engineering' },
    { type: 'Capability', title: 'AI & Machine Learning', href: '/services#ai-ml-engineering', keywords: 'ai artificial intelligence machine learning llm' },
    { type: 'Capability', title: 'Cloud Engineering', href: '/services#cloud-engineering', keywords: 'cloud kubernetes platform infrastructure distributed' },
    { type: 'Capability', title: 'DevOps & CI/CD', href: '/services#devops-ci-cd', keywords: 'devops ci cd delivery environments pipelines' },
    { type: 'Capability', title: 'Technical Consulting', href: '/services#technical-consulting', keywords: 'consulting modernization system design engineering guidance' },
    { type: 'Legal', title: 'Privacy Policy', href: '/privacy', keywords: 'privacy policy data gdpr' },
    { type: 'Legal', title: 'Terms of Use', href: '/terms', keywords: 'terms use conditions legal' },
    { type: 'Legal', title: 'Cookie Policy', href: '/cookies', keywords: 'cookies cookie policy tracking' }
  ];

  searchResults = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return [];
    return this.searchIndex
      .filter(entry =>
        (entry.title + ' ' + entry.type + ' ' + entry.keywords).toLowerCase().includes(q))
      .slice(0, 8);
  });

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initTheme();
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(() => {
        this.closeMega();
        this.closeMobile();
        this.closeSearch();
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

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMega();
      this.closeMobile();
      this.closeSearch();
      this.cdr.markForCheck();
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }

  /* ── Navigation ─────────────────────────────────────────── */
  openMega(label: string): void {
    if (this.activeMega !== label) {
      this.activeMega = label;
      this.cdr.markForCheck();
    }
  }

  closeMega(): void {
    if (this.activeMega !== null) {
      this.activeMega = null;
      this.cdr.markForCheck();
    }
  }

  onNavClick(event: Event, item: NavItem): void {
    if (item.children?.length) {
      event.preventDefault();
      if (this.activeMega === item.label) {
        this.closeMega();
      } else {
        this.openMega(item.label);
      }
    } else {
      this.closeMega();
    }
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
    this.cdr.markForCheck();
  }

  closeMobile(): void {
    if (this.mobileOpen) {
      this.mobileOpen = false;
      this.cdr.markForCheck();
    }
  }

  toggleSub(event: Event, label: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.mobileSubOpen[label] = !this.mobileSubOpen[label];
    this.cdr.markForCheck();
  }

  /* ── Search ─────────────────────────────────────────────── */
  openSearch(): void {
    this.searchOpen.set(true);
    this.closeMobile();
    this.cdr.markForCheck();
    setTimeout(() => this.searchInput?.nativeElement.focus(), 60);
  }

  closeSearch(): void {
    if (this.searchOpen()) {
      this.searchOpen.set(false);
      this.searchQuery.set('');
      this.cdr.markForCheck();
    }
  }

  onQueryChange(value: string): void {
    this.searchQuery.set(value);
  }

  goToTopResult(): void {
    const results = this.searchResults();
    if (results.length) {
      this.closeSearch();
      this.router.navigateByUrl(results[0].href);
    }
  }

  /* ── Theme ──────────────────────────────────────────────── */
  initTheme(): void {
    let dark = false;
    try {
      const stored = localStorage.getItem('qm-theme');
      if (stored) {
        dark = stored === 'dark';
      } else {
        dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    } catch { /* noop */ }
    this.applyTheme(dark);
  }

  toggleTheme(): void {
    this.applyTheme(!this.isDark());
  }

  private applyTheme(dark: boolean): void {
    this.isDark.set(dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try {
      localStorage.setItem('qm-theme', dark ? 'dark' : 'light');
    } catch { /* noop */ }
    this.cdr.markForCheck();
  }
}
