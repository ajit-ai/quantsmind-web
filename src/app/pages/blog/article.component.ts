import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';
import { QmInfoCardComponent }  from '../../shared/components/qm-info-card/qm-info-card.component';

import { BlogArticle } from './blog-article.model';
import { BLOG_ARTICLES } from './articles';

@Component({
    selector: 'app-blog-article',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmBadgeComponent, QmInfoCardComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (article(); as article) {
    <!-- HERO -->
    <section class="page-hero surface-subtle">
      <qm-container>
        <a routerLink="/blog" class="back">&larr; Back to articles</a>

        <div class="badges">
          <qm-badge variant="default">{{ article.category }}</qm-badge>
          <qm-badge [variant]="article.maturityVariant">{{ article.maturity }}</qm-badge>
        </div>

        <h1>{{ article.title }}</h1>
        <p class="standfirst">{{ article.summary }}</p>
      </qm-container>
    </section>

    <!-- BODY -->
    <qm-section surface="white" ariaLabel="Article">
      <qm-container>
        <article class="prose">
          <p class="prose__intro">{{ article.intro }}</p>

          @for (section of article.sections; track section.heading) {
            <section class="prose__section">
              <h2>{{ section.heading }}</h2>

              @for (block of section.blocks; track $index) {
                @switch (block.kind) {
                  @case ('p') {
                    <p>{{ block.text }}</p>
                  }
                  @case ('list') {
                    <ul>
                      @for (item of block.items; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  }
                  @case ('code') {
                    <div class="code">
                      @if (block.caption) {
                        <p class="code__caption">{{ block.caption }}</p>
                      }
                      <pre class="code__block"><code>{{ block.code }}</code></pre>
                    </div>
                  }
                  @case ('card') {
                    <qm-info-card [kind]="block.card" [title]="block.title" [body]="block.body"
                      [points]="block.points" [code]="block.code" [codeLabel]="block.codeLabel">
                    </qm-info-card>
                  }
                  @case ('table') {
                    <div class="qm-table-wrap">
                      <table class="qm-table">
                        <caption class="sr-only">{{ block.caption }}</caption>
                        <thead>
                          <tr>
                            @for (cell of block.head; track cell) {
                              <th scope="col">{{ cell }}</th>
                            }
                          </tr>
                        </thead>
                        <tbody>
                          @for (row of block.rows; track row[0]) {
                            <tr>
                              @for (cell of row; track $index) {
                                <td [attr.data-label]="block.head[$index]">{{ cell }}</td>
                              }
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  }
                }
              }
            </section>
          }

          <section class="prose__section">
            <h2>Conclusion</h2>
            <p>{{ article.conclusion }}</p>
          </section>

          <nav class="prose__nav" aria-label="Article navigation">
            <a routerLink="/blog" class="prose__nav-link">&larr; Back to all articles</a>
          </nav>

          @if (article.verification?.length) {
            <section class="verify" aria-label="Related pages on this site">
              <h2 class="verify__title">Also on this site</h2>
              <ul class="verify__list">
                @for (target of article.verification; track target.route) {
                  <li class="verify__item">
                    <a [routerLink]="target.route" class="verify__link">{{ target.label }}</a>
                  </li>
                }
              </ul>
            </section>
          }

          @if (related().length > 0) {
            <section class="related" aria-label="More articles in this category">
              <h2 class="related__title">More {{ article.category }} articles</h2>
              <ul class="related__list">
                @for (other of related(); track other.slug) {
                  <li class="related__item">
                    <a [routerLink]="['/blog', other.slug]" class="related__link">{{ other.title }}</a>
                    <span class="related__maturity">{{ other.maturity }}</span>
                  </li>
                }
              </ul>
            </section>
          }
        </article>
      </qm-container>
    </qm-section>
    } @else {
    <!-- Unknown slug: no article renders, and the index is shown instead. -->
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">BLOG</span>
        <h1>Article not found</h1>
        <p class="lead">
          That article does not exist. Browse the index to find the articles that are published.
        </p>
        <p class="notfound"><a routerLink="/blog" class="prose__nav-link">&larr; Back to all articles</a></p>
      </qm-container>
    </section>
    }
    `,
    styles: [`
    /* ── HERO ──────────────────────────────────────────── */
    .page-hero { padding: 56px 0 48px; border-bottom: 1px solid var(--color-border); }
    @media (min-width: 768px) { .page-hero { padding: 80px 0 64px; } }
    .back {
      display: inline-block; margin-bottom: 24px;
      font-size: 14px; font-weight: 500;
      color: var(--color-text-secondary); text-decoration: none;
    }
    .back:hover { color: var(--color-accent); text-decoration: underline; }
    .back:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: 3px; }
    .badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
    .page-hero h1 {
      max-width: 820px; margin: 0 0 20px;
      font-size: clamp(30px, 4vw, 44px); line-height: 1.15; letter-spacing: -0.02em;
    }
    .standfirst {
      max-width: 760px; margin: 0;
      font-size: 18px; line-height: 1.7; color: var(--color-text-secondary);
    }

    /* ── PROSE ─────────────────────────────────────────── */
    .prose { max-width: 860px; }

    .prose__intro {
      font-size: 18px; line-height: 1.8;
      color: var(--color-text-primary);
      margin: 0 0 48px;
      text-wrap: pretty;
    }

    .prose__section { margin-bottom: 48px; }

    .prose__section h2 {
      font-size: clamp(22px, 2.4vw, 27px); font-weight: 700;
      letter-spacing: -0.01em; line-height: 1.25;
      color: var(--color-text-primary);
      margin: 0 0 20px;
    }

    .prose__section p {
      font-size: 16.5px; line-height: 1.8;
      color: var(--color-text-secondary);
      margin: 0 0 20px;
      text-wrap: pretty;
    }
    .prose__section > qm-info-card { margin: 28px 0; }

    .prose__section ul {
      margin: 0 0 20px; padding-left: 22px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .prose__section li {
      font-size: 16px; line-height: 1.7; color: var(--color-text-secondary);
    }

    /* ── CODE ──────────────────────────────────────────── */
    .code {
      margin: 28px 0;
      background: var(--color-dark-canvas);
      border: 1px solid var(--color-dark-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    .code__caption {
      margin: 0; padding: 10px 16px;
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: var(--color-dark-text-muted);
      background: var(--color-dark-surface);
      border-bottom: 1px solid var(--color-dark-border);
    }
    .code__block {
      margin: 0; padding: 20px 22px;
      overflow-x: auto; white-space: pre;
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
      font-size: 13.5px; line-height: 1.65;
      color: var(--color-border);
    }

    /* ── NAV ───────────────────────────────────────────── */
    .prose__nav {
      margin-top: 56px; padding-top: 32px;
      border-top: 1px solid var(--color-border);
    }
    .prose__nav-link {
      font-size: 15px; font-weight: 500;
      color: var(--color-accent); text-decoration: none;
    }
    .prose__nav-link:hover { text-decoration: underline; }
    .prose__nav-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: 3px; }
    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--color-accent); margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); }
    .notfound { margin: 24px 0 0; }

    /* ── RELATED ───────────────────────────────────────── */
    .related { margin-top: 40px; }
    .related__title {
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: var(--color-text-muted);
      margin: 0 0 16px;
    }
    .related__list {
      list-style: none; margin: 0; padding: 0;
      display: grid; grid-template-columns: 1fr; gap: 10px;
    }
    @media (min-width: 640px) { .related__list { grid-template-columns: repeat(2, 1fr); } }
    .related__item {
      display: flex; flex-direction: column; gap: 4px;
      padding: 14px 18px;
      background: var(--card-bg-subtle);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-sm);
    }
    .related__link {
      font-size: 14.5px; font-weight: 500;
      color: var(--color-text-primary); text-decoration: none;
    }
    .related__link:hover { color: var(--color-accent); text-decoration: underline; }
    .related__link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 3px; }
    .related__maturity { font-size: 12px; color: var(--color-text-muted); }

    /* ── VERIFY ────────────────────────────────────────── */
    .verify { margin-top: 32px; }
    .verify__title {
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: var(--color-text-muted);
      margin: 0 0 12px;
    }
    .verify__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .verify__item {
      padding: 12px 16px;
      background: var(--color-surface-subtle);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
    }
    .verify__link {
      font-size: 14.5px; color: var(--color-text-secondary); text-decoration: none;
    }
    .verify__link:hover { color: var(--color-accent); text-decoration: underline; }
    .verify__link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 3px; }

    /* ── A11Y ──────────────────────────────────────────── */
    .sr-only {
      position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
    }
    `]
})
export class BlogArticleComponent {
  private route = inject(ActivatedRoute);

  /**
   * The article comes from the route resolver, which also redirects unknown
   * slugs to the index. Reading resolved data means the page and its metadata
   * are always driven by the same object, on direct navigation, on back and
   * forward, and when moving between two articles.
   */
  private resolved = toSignal(this.route.data, { initialValue: this.route.snapshot.data });

  article = computed<BlogArticle | undefined>(
    () => this.resolved()['article'] as BlogArticle | undefined
  );

  /** Same-category articles other than the current one, for context. */
  related = computed<BlogArticle[]>(() => {
    const current = this.article();
    if (!current) return [];
    return BLOG_ARTICLES.filter(a => a.category === current.category && a.slug !== current.slug);
  });
}

/** Re-exported for the route table. */
export { BLOG_ARTICLES };
