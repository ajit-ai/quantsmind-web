import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QmHeaderComponent } from './layout/header/header.component';
import { QmFooterComponent } from './layout/footer/footer.component';
import { RouteMetaService } from './core/route-meta.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, QmHeaderComponent, QmFooterComponent],
    template: `
    <qm-header></qm-header>
    <main id="main-content" tabindex="-1">
      <router-outlet></router-outlet>
    </main>
    <qm-footer></qm-footer>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; }
    main  { flex: 1; }
  `]
})
export class AppComponent {
  constructor() {
    inject(RouteMetaService).init();
  }
}
