import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

@Component({
    selector: 'app-microquantum',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="product-hero surface-subtle">
      <qm-container>
        <a routerLink="/technology" class="product-back">&larr; Technology Ecosystem</a>
        <qm-badge variant="early-access">Developer Preview · v0.4.0</qm-badge>
        <h1>MicroQuantum</h1>
        <p class="product-tagline">Open Quantum Computing SDK</p>
        <p class="lead">
          MicroQuantum is an open Python SDK for building, executing and analyzing
          quantum programs.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container size="narrow">
        <div class="product-body">
          <h2>What Is MicroQuantum?</h2>
          <p>
            MicroQuantum provides a developer-facing layer for working with quantum
            programs in Python. It is designed to support the workflow of defining a
            program, executing it, and analyzing the results — as an open software
            project being developed by QuantsMind.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="canvas">
      <qm-container size="narrow">
        <div class="product-body">
          <h2>Status</h2>
          <p>
            MicroQuantum is available as a <strong>Developer Preview</strong> at
            version 0.4.0. The API is under active refinement and may change between
            preview releases. It is not yet a stable, production release.
          </p>
        </div>
      </qm-container>
    </qm-section>

    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <span class="eyebrow">NEXT</span>
          <h2>MicroQuantum Is Evolving</h2>
          <p class="lead">
            Detailed documentation, examples and technical content will be published
            as the project matures. If you are exploring quantum computing and would
            like to collaborate, get in touch.
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
export class MicroQuantumComponent {}