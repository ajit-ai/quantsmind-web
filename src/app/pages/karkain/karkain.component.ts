import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

@Component({
    selector: 'app-karkain',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="product-hero surface-subtle">
      <qm-container>
        <a routerLink="/technology" class="product-back">&larr; Technology Ecosystem</a>
        <qm-badge variant="development">Active Development</qm-badge>
        <h1>Karkain</h1>
        <p class="product-tagline">General-Purpose Programming Language</p>
        <p class="lead">
          An independent programming language and computing ecosystem being
          developed by QuantsMind.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container size="narrow">
        <div class="product-body">
          <h2>Overview</h2>
          <p>
            Karkain is a general-purpose programming language being developed as an
            independent project within the QuantsMind technology ecosystem. It is
            being designed for practical software engineering while providing a
            foundation for the language and computing research QuantsMind explores.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas">
      <qm-container size="narrow">
        <div class="product-body">
          <h2>Status</h2>
          <p>
            Karkain is in <strong>active development</strong>. It is an ongoing
            engineering effort, and it is not yet a finished or production-ready
            language. Language design, tooling and the surrounding ecosystem are
            evolving as the project progresses.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <span class="eyebrow">FOLLOW</span>
          <h2>Karkain Is Being Built</h2>
          <p class="lead">
            Technical documentation, design notes and releases will be shared as the
            language develops. If you are working on or interested in language
            engineering, we would be glad to hear from you.
          </p>
          <qm-button variant="primary" size="lg" [routerLinkValue]="'/contact'">
            Get in Touch →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    .product-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .product-hero { padding: 112px 0 80px; } }
    .product-hero h1 { max-width: 720px; margin: 16px 0 8px; font-size: clamp(40px, 5vw, 60px); }
    .product-tagline { font-size: 18px; font-weight: 500; color: #475569; margin: 0 0 16px; }
    .product-hero .lead { max-width: 640px; margin: 0; }

    .product-back {
      display: inline-block; margin-bottom: 24px;
      font-size: 14px; font-weight: 500; color: #475569; text-decoration: none;
    }
    .product-back:hover { color: #2563EB; text-decoration: underline; }

    .product-body { max-width: 720px; }
    .product-body h2 { margin: 0 0 16px; }
    .product-body p { font-size: 16px; line-height: 1.8; color: #475569; margin: 0 0 16px; }
    .product-body p:last-child { margin: 0; }

    .page-cta {
      text-align: center; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }
    .page-cta h2 { margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; margin: 0; }
  `]
})
export class KarkainComponent {}