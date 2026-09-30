import { Component, ChangeDetectionStrategy } from '@angular/core';

import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';

/**
 * Publication state of an article. Phase 1 has no detail pages, so
 * every entry is unpublished and says so on the card itself.
 */
type ArticleStatus = 'coming-soon';

interface BlogArticle {
  /** Editorial index, used as a quiet technical marker. */
  index: string;
  title: string;
  excerpt: string;
  category: string;
  status: ArticleStatus;
  /** Badge variant chosen to read as "not yet published". */
  badge: BadgeVariant;
  /**
   * Only set when a real publication date exists. Phase 1 has none,
   * and reading time is omitted because it would be a guess.
   */
  date?: string;
}

@Component({
    selector: 'app-blog',
    imports: [QmContainerComponent, QmSectionComponent, QmBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- HERO                                                     -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">BLOG</span>
        <h1>Blog</h1>
        <p class="lead">
          Engineering notes and research writing from QuantsMind. We write about the
          systems we design, the technologies we build, and the reasoning behind both —
          including the parts that are still unfinished.
        </p>
      </qm-container>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- TOPICS                                                  -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="sm" ariaLabel="Topics covered">
      <qm-container>
        <h2 class="topics__heading">Topics</h2>
        <ul class="topics" role="list">
          @for (topic of topics; track topic) {
            <li class="topics__item">{{ topic }}</li>
          }
        </ul>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- ARTICLES                                                -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="canvas" ariaLabel="Latest engineering notes">
      <qm-container>
        <div class="notes-head">
          <h2 class="notes-head__title">Latest &amp; Engineering Notes</h2>
          <p class="notes-head__lead">
            Each entry below is in preparation. Nothing is published yet, and no
            article is presented as finished work.
          </p>
        </div>

        <div class="notes-grid">
          @for (article of articles; track article.index) {
            <article class="note">
              <div class="note__top">
                <span class="note__index" aria-hidden="true">{{ article.index }}</span>
                <qm-badge [variant]="article.badge">{{ statusLabel(article.status) }}</qm-badge>
              </div>

              <p class="note__category">{{ article.category }}</p>
              <h3 class="note__title">{{ article.title }}</h3>
              <p class="note__excerpt">{{ article.excerpt }}</p>

              @if (article.date) {
                <p class="note__date">
                  <time [attr.datetime]="article.date">{{ article.date }}</time>
                </p>
              }
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- CLOSING NOTE                                            -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="sm" ariaLabel="Editorial note">
      <qm-container size="narrow">
        <p class="closing">
          More engineering notes and research stories will be published as QuantsMind
          projects progress.
        </p>
      </qm-container>
    </qm-section>
    `,
    styles: [`
    /* ── HERO ──────────────────────────────────────────── */
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid var(--color-border); }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 720px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 620px; margin: 0; }

    /* ── TOPICS ────────────────────────────────────────── */
    .topics__heading {
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: var(--color-text-muted);
      margin: 0 0 16px;
    }
    .topics {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-wrap: wrap; gap: 10px;
    }
    .topics__item {
      font-size: 13px; font-weight: 500;
      color: var(--color-text-secondary);
      background: var(--card-bg-subtle);
      border: 1px solid var(--card-border);
      border-radius: 9999px;
      padding: 6px 16px;
    }

    /* ── NOTES HEAD ────────────────────────────────────── */
    .notes-head { max-width: 680px; margin: 0 0 40px; }
    .notes-head__title { margin: 0 0 12px; }
    .notes-head__lead {
      font-size: 16px; line-height: 1.7;
      color: var(--color-text-secondary); margin: 0;
    }

    /* ── ARTICLE GRID ──────────────────────────────────── */
    .notes-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 640px)  { .notes-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .notes-grid { grid-template-columns: repeat(3, 1fr); } }

    .note {
      display: flex; flex-direction: column; gap: 10px;
      padding: 28px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--card-radius);
      box-shadow: var(--card-shadow);
    }
    .note__top {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; flex-wrap: wrap;
    }
    .note__index {
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
      font-size: 13px; font-weight: 600;
      color: var(--color-text-muted);
    }
    .note__category {
      margin: 0;
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: var(--color-accent);
    }
    .note__title {
      font-size: 18px; font-weight: 600; line-height: 1.35;
      color: var(--color-text-primary);
      margin: 0;
    }
    .note__excerpt {
      margin: 0; flex: 1;
      font-size: 14px; line-height: 1.65;
      color: var(--color-text-secondary);
      text-wrap: pretty;
    }
    .note__date {
      margin: 0; padding-top: 12px;
      border-top: 1px solid var(--color-surface-subtle);
      font-size: 13px; color: var(--color-text-muted);
    }

    /* ── CLOSING NOTE ──────────────────────────────────── */
    .closing {
      margin: 0;
      font-size: 15px; line-height: 1.75;
      color: var(--color-text-muted);
      text-align: center;
      text-wrap: pretty;
    }
  `]
})
export class BlogComponent {
  /**
   * Topics are listed for orientation only. Phase 1 has no filtering,
   * so this is a plain static strip.
   */
  readonly topics: string[] = [
    'Engineering',
    'Architecture',
    'Karkain',
    'MicroQuantum',
    'AI & Intelligence',
    'Labs'
  ];

  /**
   * Phase 1 entries. None of these have a publication date, so `date`
   * is omitted rather than invented, and no reading time is shown
   * because it cannot be known before an article is written.
   */
  readonly articles: BlogArticle[] = [
    {
      index: '01',
      title: 'Engineering QuantsMind as a Product Platform',
      excerpt:
        'How the QuantsMind ecosystem is structured so that independent technologies share common engineering foundations, versioning discipline and documentation standards rather than reinventing them per project.',
      category: 'Architecture',
      status: 'coming-soon',
      badge: 'concept'
    },
    {
      index: '02',
      title: 'Building a Compiler from the Language Boundary Up',
      excerpt:
        'Notes on the Karkain compiler pipeline — from lexing and parsing through semantic analysis to a C23 boundary — and on the reasoning behind delegating final machine code to established C toolchains.',
      category: 'Karkain',
      status: 'coming-soon',
      badge: 'concept'
    },
    {
      index: '03',
      title: 'MicroQuantum: Exploring Quantum Computing in Software',
      excerpt:
        'How MicroQuantum separates the construction of a quantum program from its execution, and what that separation makes possible for testing, analysis and future backends.',
      category: 'MicroQuantum',
      status: 'coming-soon',
      badge: 'concept'
    },
    {
      index: '04',
      title: 'From Research Lab to Released Technology',
      excerpt:
        'A look at the path an idea takes through QuantsMind Labs before it becomes a released technology, and the discipline of labelling work honestly at every stage along the way.',
      category: 'Labs',
      status: 'coming-soon',
      badge: 'concept'
    },
    {
      index: '05',
      title: 'Engineering Lessons from Building Independent Developer Tools',
      excerpt:
        'What building the Karkain language tooling taught us about developer experience, language server behaviour and shipping tools that people can depend on.',
      category: 'Engineering',
      status: 'coming-soon',
      badge: 'concept'
    }
  ];

  statusLabel(status: ArticleStatus): string {
    return status === 'coming-soon' ? 'Coming Soon' : status;
  }
}
