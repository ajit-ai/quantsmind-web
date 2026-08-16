import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';

@Component({
    selector: 'app-not-found',
    imports: [RouterModule, QmContainerComponent, QmButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="not-found">
      <qm-container>
        <div class="not-found__inner">
          <div class="not-found__code" aria-hidden="true">404</div>
          <h1 class="not-found__title">Page Not Found</h1>
          <p class="not-found__desc">
            The page you are looking for does not exist or has moved.
            Let's get you back to somewhere useful.
          </p>
          <div class="not-found__actions">
            <qm-button variant="primary" [routerLinkValue]="'/'">
              Back to Home →
            </qm-button>
            <qm-button variant="secondary" [routerLinkValue]="'/contact'">
              Contact QuantsMind
            </qm-button>
          </div>
        </div>
      </qm-container>
    </section>
  `,
    styles: [`
    .not-found {
      min-height: 70vh; display: flex; align-items: center;
      padding: 96px 0; background: #F8FAFC;
    }
    .not-found__inner {
      display: flex; flex-direction: column; align-items: flex-start; gap: 20px;
      max-width: 560px;
    }
    .not-found__code {
      font-size: 80px; font-weight: 700; line-height: 1;
      color: #E2E8F0; letter-spacing: -0.04em;
      user-select: none;
    }
    .not-found__title {
      font-size: clamp(28px, 4vw, 44px); font-weight: 700;
      color: #111827; margin: 0; letter-spacing: -0.02em;
    }
    .not-found__desc {
      font-size: 17px; line-height: 1.7; color: #475569; margin: 0;
    }
    .not-found__actions { display: flex; gap: 12px; flex-wrap: wrap; }
  `]
})
export class NotFoundComponent {}
