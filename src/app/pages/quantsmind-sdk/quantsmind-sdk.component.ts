import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

@Component({
    selector: 'app-quantsmind-sdk',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="product-hero surface-subtle">
      <qm-container>
        <a routerLink="/technology" class="product-back">&larr; Technology Ecosystem</a>
        <qm-badge variant="development">Development</qm-badge>
        <h1>QuantsMind SDK</h1>
        <p class="product-tagline">General-Purpose Technology SDK</p>
        <p class="lead">
          A software foundation exploring reusable abstractions for intelligent
          computing, data and advanced technology applications.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container size="narrow">
        <div class="product-body">
          <h2>Overview</h2>
          <p>
            The QuantsMind SDK is an early-stage software project focused on reusable
            abstractions for building intelligent, data-aware and technically advanced
            applications. It is part of the QuantsMind technology ecosystem and is
            intended to evolve into developer tooling and components shared openly.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas">
      <qm-container size="narrow">
        <div class="product-body">
          <h2>Status</h2>
          <p>
            The QuantsMind SDK is in <strong>development</strong>. It is an
            experimental software foundation rather than a production-ready SDK, and
            its public surface is still being explored. No stable API has been
            released yet.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <span class="eyebrow">EXPLORATION</span>
          <h2>An Early Foundation</h2>
          <p class="lead">
            This project is at the start of its life. As its abstractions mature, more
            concrete details and releases will follow. If the direction sounds
            interesting, we would like to hear from you.
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
export class QuantsMindSdkComponent {}