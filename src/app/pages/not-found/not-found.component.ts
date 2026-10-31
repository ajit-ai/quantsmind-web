import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmPageHeroComponent }  from '../../shared/components/qm-page-hero/qm-page-hero.component';
import { QmRevealDirective }    from '../../shared/directives/qm-reveal.directive';

interface Destination { label: string; route: string; description: string; }

@Component({
    selector: 'app-not-found',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmPageHeroComponent, QmRevealDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <qm-page-hero
      eyebrow="ERROR 404"
      title="Page not found"
      lead="The page you are looking for does not exist or has moved."
      [hasProjectedArt]="true"
      ariaLabel="Page not found">
      <div heroActions class="nf-actions">
        <qm-button variant="primary" size="lg" [routerLinkValue]="'/'">
          Back to Home →
        </qm-button>
        <qm-button variant="outline" size="lg" [routerLinkValue]="'/contact'">
          Contact QuantsMind
        </qm-button>
      </div>
      <p heroLead class="nf-note">
        Nothing was lost — here are the places people usually need.
      </p>
      <div heroArt class="nf-art" aria-hidden="true">
        <svg class="nf-art__rings" viewBox="0 0 400 400" focusable="false">
          <circle cx="200" cy="200" r="168" fill="none" stroke="rgba(37, 99, 235, 0.14)" stroke-width="1"/>
          <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(6, 182, 212, 0.18)" stroke-width="1" stroke-dasharray="4 6"/>
          <circle cx="200" cy="200" r="72" fill="none" stroke="rgba(37, 99, 235, 0.16)" stroke-width="1"/>
        </svg>
        <div class="nf-art__core">404</div>
        <span class="nf-art__chip nf-art__chip--a">signal lost</span>
        <span class="nf-art__chip nf-art__chip--b">route not found</span>
        <span class="nf-art__chip nf-art__chip--c">off the grid</span>
      </div>
    </qm-page-hero>

    <qm-section surface="canvas" size="sm" ariaLabel="Popular destinations">
      <qm-container>
        <div class="nf-destinations" qmReveal>
          <span class="eyebrow">POPULAR DESTINATIONS</span>
          <h2>Continue exploring</h2>
        </div>
        <div class="nf-dest-grid">
          @for (d of destinations; track d.route; let i = $index) {
            <a [routerLink]="d.route" class="nf-dest" qmReveal [qmRevealDelay]="i * 60">
              <strong class="nf-dest__label">{{ d.label }}</strong>
              <span class="nf-dest__desc">{{ d.description }}</span>
              <span class="nf-dest__go" aria-hidden="true">→</span>
            </a>
          }
        </div>
      </qm-container>
    </qm-section>
  `,
    styles: [`
    .nf-actions { display: flex; flex-wrap: wrap; gap: 12px; }
    .nf-note {
      margin: 20px 0 0;
      font-size: 15px;
      color: var(--color-text-secondary);
    }

    /* ── Lost-signal artwork ─────────────────────────── */
    .nf-art {
      position: relative;
      width: 100%;
      max-width: 420px;
      aspect-ratio: 1;
      margin: 0 auto;
    }
    .nf-art__rings {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .nf-art__rings circle:first-child {
      transform-origin: center;
      animation: qm-orbit-spin 36s linear infinite;
    }
    .nf-art__core {
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      width: 38%;
      aspect-ratio: 1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Sora', 'Inter', system-ui, sans-serif;
      font-size: clamp(44px, 8vw, 78px);
      font-weight: 700;
      letter-spacing: -0.04em;
      color: #fff;
      background:
        radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 46%),
        linear-gradient(145deg, #2563EB, #4F46E5 55%, #06B6D4);
      box-shadow:
        0 30px 70px -22px rgba(37, 99, 235, 0.55),
        inset 0 1px 0 rgba(255, 255, 255, 0.35);
      animation: qm-float 9s ease-in-out infinite;
    }
    .nf-art__chip {
      position: absolute;
      z-index: 2;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 7px 11px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.88);
      box-shadow: var(--shadow-lg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px;
      font-weight: 600;
      color: var(--color-text-secondary);
      white-space: nowrap;
      animation: qm-float 8s ease-in-out infinite;
    }
    .nf-art__chip::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--gradient-signal);
    }
    .nf-art__chip--a { top: 4px; right: 4px; animation-delay: -2s; }
    .nf-art__chip--b { bottom: 22%; left: -4px; animation-delay: -5s; }
    .nf-art__chip--c { bottom: 2px; right: 14%; animation-delay: -3.5s; }

    /* ── Destinations ────────────────────────────────── */
    .nf-destinations {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 36px;
    }
    .nf-destinations h2 { margin: 0; }
    .nf-dest-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
      max-width: 880px;
      margin: 0 auto;
    }
    @media (min-width: 640px) {
      .nf-dest-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .nf-dest {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 22px 24px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--card-border);
      background:
        radial-gradient(360px 200px at 100% 0%, rgba(37, 99, 235, 0.06), transparent 62%),
        #FFFFFF;
      box-shadow: var(--shadow-xs);
      text-decoration: none;
      transition: transform 260ms var(--qm-ease-out), box-shadow 260ms var(--qm-ease-out), border-color 260ms ease;
    }
    .nf-dest::before {
      content: '';
      position: absolute;
      inset: 0 0 auto;
      height: 3px;
      background: var(--gradient-signal);
      opacity: 0.7;
    }
    .nf-dest:hover {
      transform: translateY(-3px);
      border-color: rgba(37, 99, 235, 0.24);
      box-shadow: var(--shadow-lg);
    }
    .nf-dest__label {
      font-family: 'Sora', 'Inter', system-ui, sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
    }
    .nf-dest__desc {
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-secondary);
    }
    .nf-dest__go {
      position: absolute;
      right: 20px;
      bottom: 18px;
      font-size: 16px;
      color: var(--color-accent);
      transition: transform 260ms var(--qm-ease-out);
    }
    .nf-dest:hover .nf-dest__go { transform: translateX(4px); }

    @media (prefers-reduced-motion: reduce) {
      .nf-art__rings circle:first-child,
      .nf-art__core,
      .nf-art__chip { animation: none; }
      .nf-dest { transition: none; }
      .nf-dest:hover { transform: none; }
    }
  `]
})
export class NotFoundComponent {
  readonly destinations: Destination[] = [
    { label: 'Services', route: '/services', description: 'Software engineering, quantum computing, AI/ML, cloud and DevOps.' },
    { label: 'Technology', route: '/technology', description: 'The QuantsMind technology ecosystem and current maturity.' },
    { label: 'Articles', route: '/blog', description: 'Technical articles from the QuantsMind team and Labs.' },
    { label: 'About', route: '/about', description: 'Who we are and how we approach engineering work.' }
  ];
}
