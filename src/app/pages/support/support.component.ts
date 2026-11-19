import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent } from '../../shared/components/qm-section/qm-section.component';

@Component({
  selector: 'app-support',
  imports: [RouterModule, QmContainerComponent, QmSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Product support">
      <qm-container size="narrow">
        <span class="eyebrow">PRODUCT SUPPORT</span>
        <h1>Get help with a QuantsMind product</h1>
        <p class="lead">Support routes depend on how you access the product. There is no paid support contract unless one is agreed directly.</p>

        <section class="support__block" aria-labelledby="s-install">
          <h2 id="s-install">Installation and access</h2>
          <ul>
            <li><a routerLink="/releases">Release information</a> — versions, dates and what each release is verified to contain.</li>
            <li><a routerLink="/docs">Documentation index</a> — specification, guides and repository documentation.</li>
            <li>Product detail pages carry per-release installation instructions and marketplace links.</li>
          </ul>
        </section>

        <section class="support__block" aria-labelledby="s-oss">
          <h2 id="s-oss">Open-source components</h2>
          <p>Open-source QuantsMind components (for example Karkain, MicroQuantum and the QuantsMind SDK) are developed in the open. Bugs and questions are handled in the corresponding public GitHub repositories via the issue tracker — that is the fastest route to an answer.</p>
        </section>

        <section class="support__block" aria-labelledby="s-licensed">
          <h2 id="s-licensed">Licensed products (DI Mini)</h2>
          <p>QuantsMind Document Intelligence Mini is distributed directly, not through a marketplace. Access and licensing are arranged per customer. If you hold a licence or an evaluation agreement, use the contact below and reference your product and version.</p>
        </section>

        <section class="support__block" aria-labelledby="s-contact">
          <h2 id="s-contact">Contact</h2>
          <p>Use the <a routerLink="/contact">contact page</a> for anything that is not covered above. Include:</p>
          <ul>
            <li>the product name and version,</li>
            <li>the operating system and platform,</li>
            <li>what you tried, what happened, and any logs or screenshots.</li>
          </ul>
          <p class="note">Response times depend on engagement volume. There is no 24/7 support desk and none is implied.</p>
        </section>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    :host { display: block; }
    .eyebrow { font-size: 12px; letter-spacing: 0.08em; font-weight: 700; color: var(--color-accent); }
    h1 { margin: 8px 0 12px; font-size: clamp(30px, 4.4vw, 44px); line-height: 1.14; }
    .lead { color: var(--color-text-secondary); font-size: 17px; line-height: 1.65; }
    .support__block { margin-top: 26px; }
    .support__block h2 { font-size: 21px; margin: 0 0 8px; }
    .support__block ul { margin: 0; padding-left: 20px; color: var(--color-text-secondary); line-height: 1.65; }
    .support__block p { color: var(--color-text-secondary); line-height: 1.65; }
    .support__block a { color: var(--color-accent); }
    .note { font-size: 13px; color: var(--color-text-muted); }
  `]
})
export class SupportComponent {}
