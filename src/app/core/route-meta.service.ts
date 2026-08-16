import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { HOME_DESCRIPTION, HOME_TITLE } from '../app.routes';

const SITE_URL = 'https://www.quantsmind.com';

/**
 * RouteMetaService
 * Keeps the document title, meta description, and social tags in sync
 * with the currently activated route (driven by route `data`).
 */
@Injectable({ providedIn: 'root' })
export class RouteMetaService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  init(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.deepestRoute(this.activatedRoute)),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        const title = (data['title'] as string) || HOME_TITLE;
        const description = (data['description'] as string) || HOME_DESCRIPTION;
        const url = `${SITE_URL}${this.router.url}`;

        this.titleService.setTitle(title);

        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });

        const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', url);
        }
      });
  }

  private deepestRoute(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }
}
