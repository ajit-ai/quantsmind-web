import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { getAllProducts, PRODUCT_REGISTRY } from '../../content/products/product.registry';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent } from '../../shared/components/qm-section/qm-section.component';

@Component({
  selector: 'app-licensing',
  imports: [RouterModule, QmContainerComponent, QmSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qm-section surface="canvas" ariaLabel="Licensing">
      <qm-container>
        <span class="eyebrow">LICENSING</span>
        <h1>Licences at a glance</h1>
        <p class="lead">Open-source QuantsMind software ships under the licences below. DI Mini is licensed directly per customer and has no public download. Licence files in each repository are the legal authority.</p>

        <div class="licensing__table-wrap">
          <table class="licensing__table">
            <thead>
              <tr><th scope="col">Product</th><th scope="col">Licence</th><th scope="col">Distribution</th></tr>
            </thead>
            <tbody>
              @for (row of rows; track row.id) {
                <tr>
                  <th scope="row"><a [routerLink]="row.link">{{ row.name }}</a></th>
                  <td>{{ row.license }}</td>
                  <td>{{ row.distribution }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <footer class="licensing__foot">
          <p class="note">“No licence file” means no licence has been granted — do not assume one. Where a repository has no licence, all rights are reserved by default.</p>
          <a routerLink="/products">Browse the Products Store →</a>
        </footer>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    :host { display: block; }
    .eyebrow { font-size: 12px; letter-spacing: 0.08em; font-weight: 700; color: var(--color-accent); }
    h1 { margin: 8px 0 12px; font-size: clamp(30px, 4.4vw, 44px); line-height: 1.14; }
    .lead { color: var(--color-text-secondary); font-size: 17px; line-height: 1.65; max-width: 780px; }
    .licensing__table-wrap { overflow-x: auto; margin: 22px 0; }
    .licensing__table { width: 100%; border-collapse: collapse; min-width: 640px; }
    .licensing__table th, .licensing__table td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--color-border); }
    .licensing__table thead th { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); }
    .licensing__table a { color: var(--color-accent); text-decoration: none; }
    .licensing__foot { display: flex; flex-direction: column; gap: 10px; border-top: 1px solid var(--color-border); padding-top: 18px; }
    .note { margin: 0; font-size: 13px; color: var(--color-text-muted); line-height: 1.6; max-width: 780px; }
    .licensing__foot a { color: var(--color-accent); font-weight: 600; }
  `]
})
export class LicensingComponent {
  readonly rows = getAllProducts()
    .filter(product => product.repositoryUrl || product.packageUrls?.length || product.marketplaceUrls?.length || product.id === 'quantsmind-document-intelligence-mini')
    .map(product => ({
      id: product.id,
      name: product.name,
      license: product.license ?? 'No licence file (all rights reserved)',
      distribution: product.id === 'quantsmind-document-intelligence-mini'
        ? 'Direct licensing only'
        : (product.marketplaceUrls?.length ? 'Marketplace' : product.packageUrls?.length ? 'Package index' : product.repositoryUrl ? 'GitHub' : 'Direct'),
      link: product.dedicatedRoute ?? `/products/${product.id}`
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  readonly total = PRODUCT_REGISTRY.length;
}
