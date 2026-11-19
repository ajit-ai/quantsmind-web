import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { HOME_DESCRIPTION, HOME_TITLE } from '../app.routes';
import { getProductById } from '../content/products/product.registry';
import { getResearchItemBySlug } from '../content/research/research-items';
import { getPortfolioBySlug } from '../content/technology/portfolios';
import { SERVICE_AREAS } from '../content/services/service.registry';
import { BLOG_ARTICLES } from '../pages/blog/articles';
import {
  PRODUCT_CATEGORY_LABELS,
  availabilityLabel,
  maturityLabel
} from '../content/products/product.model';

/** Canonical origin for the deployed site. All absolute URLs derive from this. */
export const SITE_URL = 'https://www.quantsmind.com';

/** The subset of a resolved blog article that contributes to document metadata. */
interface RouteArticleMeta {
  title: string;
  summary: string;
}

interface DynamicMeta {
  title: string;
  description: string;
  structuredData: readonly Record<string, unknown>[];
}

const ORG_SCHEMA: Readonly<Record<string, unknown>> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'QuantsMind',
  url: SITE_URL,
  email: 'ajitkumar@quantsmind.com',
  description: HOME_DESCRIPTION,
  sameAs: [
    'https://www.linkedin.com/company/quantsmind',
    'https://github.com/quantsmind'
  ]
};

@Injectable({ providedIn: 'root' })
export class RouteMetaService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  init(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.deepestRoute(this.activatedRoute)),
        filter(route => route.outlet === 'primary'),
        mergeMap(route =>
          route.data.pipe(
            map(data => ({ route, data, params: route.snapshot.paramMap }))
          )
        )
      )
      .subscribe(({ route, data, params }) => {
        try {
        const article = data['article'] as RouteArticleMeta | undefined;

        // Registry-resolved dynamic metadata for parameterised routes.
        const dynamic = this.dynamicMeta(this.routePath(route), params);

        const title = article ? `${article.title} — QuantsMind`
                              : dynamic?.title
                              ?? ((data['title'] as string) || HOME_TITLE);
        const description = article ? article.summary
                                    : dynamic?.description
                                    ?? ((data['description'] as string) || HOME_DESCRIPTION);
        const url = this.canonicalUrl(this.router.url);

        this.titleService.setTitle(title);

        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:type', content: article ? 'article' : 'website' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });

        const canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', url);
        }

        this.writeStructuredData(route, url, article, dynamic);
        } catch (error) {
          console.error('route-meta init failed', error);
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

  /** Path segments of the activated route, root-first, e.g. ['products', 'karkain-language-tools']. */
  private routePath(route: ActivatedRoute): string[] {
    const segments: string[] = [];
    for (const branch of route.pathFromRoot.slice(1)) {
      const path = branch.snapshot?.routeConfig?.path;
      if (!path) { continue; }
      const params = branch.snapshot?.paramMap;
      for (const segment of path.split('/')) {
        if (!segment) { continue; }
        segments.push(segment.startsWith(':') ? params?.get(segment.slice(1)) ?? segment : segment);
      }
    }
    return segments;
  }

  private dynamicMeta(path: string[], params: ParamMap): DynamicMeta | undefined {
    const section = path[0];

    if (section === 'products' && path.length === 2 && params.get('slug')) {
      const product = getProductById(params.get('slug') as string);
      if (!product) {
        return { title: 'Product Not Found — QuantsMind Products Store', description: 'This product identifier does not exist in the QuantsMind product registry.', structuredData: [] };
      }
      const title = `${product.name} | Products | QuantsMind`;
      const description = `${product.summary} ${product.version ? 'Version ' + product.version + '.' : ''} ${maturityLabel(product.maturity)} · ${availabilityLabel(product.availability)}.`;
      const structuredData: Record<string, unknown>[] = [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: product.name,
          description: product.description,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: product.platforms?.join(', ') ?? 'Any',
          ...(product.license ? { license: product.license } : {}),
          ...(product.releaseHistory?.[0] ? { softwareVersion: product.releaseHistory[0].version } : {}),
          ...(product.marketplaceUrls?.[0] || product.packageUrls?.[0] ? {
            url: product.marketplaceUrls?.[0]?.url ?? product.packageUrls?.[0]?.url
          } : {})
        }
      ];
      return { title, description, structuredData };
    }

    if (section === 'labs' && path.length === 2 && params.get('slug')) {
      const item = getResearchItemBySlug(params.get('slug') as string);
      if (!item) {
        return { title: 'Research Not Found — QuantsMind Labs & Research', description: 'This research item does not exist.', structuredData: [] };
      }
      return {
        title: `${item.name} | Labs & Research | QuantsMind`,
        description: item.objective,
        structuredData: []
      };
    }

    if (section === 'technology' && path.length === 2 && params.get('portfolio')) {
      const portfolio = getPortfolioBySlug(params.get('portfolio') as string);
      if (!portfolio) {
        return { title: 'Portfolio Not Found — QuantsMind Technology', description: 'This technology portfolio does not exist.', structuredData: [] };
      }
      return {
        title: `${portfolio.title} | Technology | QuantsMind`,
        description: portfolio.short,
        structuredData: []
      };
    }

    if (section === 'services' && path.length === 2 && params.get('service')) {
      const SLUG_TO_ID: Readonly<Record<string, string>> = {
        'quantum-computing': 'quantum-computing',
        'space-systems': 'space-systems',
        'ai-engineering': 'ai-intelligent-systems',
        'scientific-computing': 'scientific-computing',
        'cybersecurity': 'cybersecurity-digital-trust',
        'industrial-intelligence': 'industrial-intelligence-digital-twin'
      };
      const service = SERVICE_AREAS.find(area => area.id === (SLUG_TO_ID[params.get('service') as string] ?? params.get('service')));
      if (!service) {
        return { title: 'Service Not Found — QuantsMind', description: 'This service does not exist.', structuredData: [] };
      }
      return {
        title: `${service.title} | Services | QuantsMind`,
        description: service.short,
        structuredData: []
      };
    }

    if (section === 'insights' && path.length === 2 && params.get('slug')) {
      const article = BLOG_ARTICLES.find(candidate => candidate.slug === params.get('slug'));
      if (article) {
        return {
          title: `${article.title} — QuantsMind`,
          description: article.summary,
          structuredData: [
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: article.title,
              description: article.summary,
              author: { '@type': 'Organization', name: 'QuantsMind' },
              publisher: { '@type': 'Organization', name: 'QuantsMind', logo: `${SITE_URL}/icon-512.png` }
            }
          ]
        };
      }
    }

    return undefined;
  }

  private writeStructuredData(
    route: ActivatedRoute,
    url: string,
    article: RouteArticleMeta | undefined,
    dynamic: DynamicMeta | undefined
  ): void {
    // Remove any previously injected JSON-LD blocks for this session.
    for (const script of Array.from(this.document.querySelectorAll('script[type="application/ld+json"]'))) {
      script.remove();
    }

    const schemas: Record<string, unknown>[] = [ORG_SCHEMA];

    // Breadcrumbs for every deep route.
    const segments = this.routePath(route);
    if (segments.length > 0) {
      const items = segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        const label = segment
          .split('-')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
        return { '@type': 'ListItem', position: index + 1, name: label, item: this.canonicalUrl(path) };
      });
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items
      });
    }

    if (dynamic?.structuredData.length) {
      schemas.push(...dynamic.structuredData);
    }

    for (const schema of schemas) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      this.document.head.appendChild(script);
    }
  }

  private deepestRoute(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }
}
