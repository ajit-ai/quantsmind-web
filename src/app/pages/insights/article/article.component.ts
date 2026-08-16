import { Component, inject, ChangeDetectionStrategy, computed, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { QmContainerComponent } from '../../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../../shared/components/qm-badge/qm-badge.component';
import { getInsightBySlug }     from '../insights-data';

const SITE_URL = 'https://www.quantsmind.com';

@Component({
    selector: 'app-insight-article',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (insight(); as article) {
      <section class="article-hero surface-subtle">
        <qm-container>
          <a routerLink="/insights" class="article-back">&larr; All Insights</a>
          <span class="eyebrow">{{ article.category }} — INSIGHT</span>
          <h1>{{ article.title }}</h1>
          <p class="lead">{{ article.description }}</p>
          <div class="article-meta">
            <qm-badge [variant]="article.badge">{{ article.category }}</qm-badge>
            <span class="article-meta__item">{{ article.date }}</span>
            <span class="article-meta__item">{{ article.readingTime }}</span>
          </div>
          <div class="article-tags">
            @for (tag of article.tags; track tag) {
              <span class="article-tag">{{ tag }}</span>
            }
          </div>
        </qm-container>
      </section>

      <qm-section surface="white">
        <qm-container size="narrow">
          <article class="article-body">
            @for (section of article.body; track section.heading) {
              <section>
                <h2>{{ section.heading }}</h2>
                @for (paragraph of section.paragraphs; track paragraph) {
                  <p>{{ paragraph }}</p>
                }
              </section>
            }
          </article>
        </qm-container>
      </qm-section>

      <qm-section surface="subtle" size="sm">
        <qm-container size="narrow">
          <div class="article-cta">
            <h2>Working Through a Problem Like This?</h2>
            <p class="lead">
              The best way to test an idea is in conversation. Tell us what you are solving
              and we will bring you a grounded, technical perspective.
            </p>
            <div class="article-cta__actions">
              <qm-button variant="primary" [routerLinkValue]="'/contact'">
                Talk to QuantsMind →
              </qm-button>
              <qm-button variant="outline" [routerLinkValue]="'/insights'">
                More Insights
              </qm-button>
            </div>
          </div>
        </qm-container>
      </qm-section>
    } @else {
      <section class="article-hero surface-subtle">
        <qm-container>
          <span class="eyebrow">INSIGHTS</span>
          <h1>Article Not Found</h1>
          <p class="lead">The article you are looking for does not exist or may have moved.</p>
          <div class="article-cta__actions">
            <qm-button variant="primary" [routerLinkValue]="'/insights'">
              Back to All Insights
            </qm-button>
          </div>
        </qm-container>
      </section>
    }
    `,
    styles: [`
    .article-hero {
      padding: 80px 0 64px;
      border-bottom: 1px solid #E2E8F0;
    }
    @media (min-width: 768px) { .article-hero { padding: 112px 0 80px; } }

    .article-back {
      display: inline-block;
      font-size: 13px; font-weight: 500; color: #2563EB;
      text-decoration: none; margin-bottom: 24px;
    }
    .article-back:hover { text-decoration: underline; }

    .article-hero h1 { max-width: 760px; margin: 0 0 20px; }
    .article-hero .lead { max-width: 680px; margin: 0 0 28px; }

    .article-meta {
      display: flex; align-items: center; flex-wrap: wrap; gap: 12px;
      margin-bottom: 16px;
    }
    .article-meta__item {
      font-size: 13px; color: #64748B;
    }

    .article-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .article-tag {
      font-size: 12px; color: #475569;
      background: #F1F5F9; border: 1px solid #E2E8F0;
      border-radius: 9999px; padding: 4px 10px;
    }

    .article-body section + section { margin-top: 40px; }
    .article-body h2 {
      font-size: 22px; font-weight: 600; color: #111827;
      margin: 0 0 16px; line-height: 1.3;
    }
    .article-body p {
      font-size: 16px; line-height: 1.8; color: #334155;
      margin: 0 0 16px;
    }
    .article-body p:last-child { margin-bottom: 0; }

    .article-cta { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .article-cta h2 { margin: 0; }
    .article-cta .lead { margin: 0; }
    .article-cta__actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; }
  `]
})
export class InsightArticleComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  insight = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    return getInsightBySlug(slug);
  });

  private eventsSub?: Subscription;

  ngOnInit(): void {
    this.applyMeta();
    this.eventsSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.applyMeta());
  }

  ngOnDestroy(): void {
    this.eventsSub?.unsubscribe();
  }

  private applyMeta(): void {
    const article = getInsightBySlug(this.route.snapshot.paramMap.get('slug') ?? '');
    if (!article) {
      return;
    }
    const title = `${article.title} — QuantsMind Insights`;
    const description = article.description;
    const url = `${SITE_URL}/insights/${article.slug}`;
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
  }
}
