import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { HOME_DESCRIPTION, HOME_TITLE } from '../app.routes';

/** Canonical origin for the deployed site. All absolute URLs derive from this. */
export const SITE_URL = 'https://www.quantsmind.com';

/** The subset of a resolved blog article that contributes to document metadata. */
interface RouteArticleMeta {
  title: string;
  summary: string;
}

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
        // A route may resolve an article; when it does, that article is the
        // authority for the title and description. Routes without one keep
        // their static metadata.
        const article = data['article'] as RouteArticleMeta | undefined;

        const title = article ? `${article.title} — QuantsMind`
                              : ((data['title'] as string) || HOME_TITLE);
        const description = article ? article.summary
                                    : ((data['description'] as string) || HOME_DESCRIPTION);
        const url = this.canonicalUrl(this.router.url);

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

  /**
   * Builds the canonical URL for the current router URL.
   *
   * The sitemap advertises every non-root page with a trailing slash, so the
   * canonical form matches that convention exactly — a canonical that disagrees
   * with the sitemap tells a crawler the two are different documents. Query
   * strings and fragments are dropped, since they identify a view of a page
   * rather than a distinct page.
   */
  canonicalUrl(url: string): string {
    const [pathOnly] = url.split(/[?#]/);
    const path = (pathOnly || '/').replace(/\/{2,}/g, '/');

    if (path === '/') {
      return `${SITE_URL}/`;
    }

    return `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;
  }

  private deepestRoute(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }
}
