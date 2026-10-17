import { Component, ChangeDetectionStrategy } from '@angular/core';

import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmBadgeComponent, BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';

/**
 * Publication state of an article. This page lists articles that are still
 * in preparation; nothing is published yet, and every card says so.
 * `date` is deliberately optional and is left unset rather than invented,
 * and reading time is omitted because it cannot be known before writing.
 */
type ArticleStatus = 'planned';

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
   * The primary source the article will be written against. This is a real,
   * verified reference, not a link added for decoration.
   */
  source: { label: string; url: string };
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
          Educational writing on software engineering and research. We read primary
          sources — papers, specifications and official documentation — and explain
          what they actually establish, including where the evidence runs out.
        </p>
      </qm-container>
    </section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- TOPICS                                                  -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="sm" ariaLabel="Editorial scope">
      <qm-container>
        <h2 class="topics__heading">Subjects covered</h2>
        <ul class="topics" role="list">
          @for (topic of topics; track topic) {
            <li class="topics__item">{{ topic }}</li>
          }
        </ul>
        <p class="topics__note">
          Articles here are educational. They cover published research and established
          engineering practice from primary sources, and they do not promote products
          or describe internal projects. Nothing on this page is an announcement.
        </p>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- ARTICLES                                                -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="canvas" ariaLabel="Planned articles">
      <qm-container>
        <div class="notes-head">
          <h2 class="notes-head__title">Planned articles</h2>
          <p class="notes-head__lead">
            Nothing here is published. Each entry below is a topic under preparation,
            listed with the primary source it will be written against so you can read
            the original material yourself. No dates are shown because none exist yet.
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

              <p class="note__source">
                <span class="note__source-label">Primary source</span>
                <a [href]="article.source.url" target="_blank" rel="noopener noreferrer"
                  [attr.aria-label]="'Read ' + article.source.label + ' (opens in a new tab)'">
                  {{ article.source.label }} ↗
                </a>
              </p>
            </article>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- PUBLISHING STANDARD                                     -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <qm-section surface="white" size="sm" ariaLabel="Publishing standards">
      <qm-container size="narrow">
        <h2 class="closing__heading">How these articles are written</h2>
        <ul class="standards">
          @for (rule of standards; track rule) {
            <li>{{ rule }}</li>
          }
        </ul>
        <p class="closing">
          Well-written text is not the same as verified research. Every factual claim is
          traced to a primary source, and results that depend on an unreproducible setup
          are labelled as such rather than presented as findings.
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

    /* ── CLOSING NOTE ──────────────────────────────────── */
    .closing {
      margin: 0; padding-top: 28px;
      font-size: 15px; line-height: 1.75;
      color: var(--color-text-muted);
      text-align: center;
      text-wrap: pretty;
    }
    .closing__heading {
      font-size: clamp(20px, 2.4vw, 26px); font-weight: 700;
      color: var(--color-text-primary);
      margin: 0 0 20px; letter-spacing: -0.01em;
    }
    .topics__note {
      margin: 20px 0 0; max-width: 640px;
      font-size: 15px; line-height: 1.7; color: var(--color-text-secondary);
    }

    /* ── PRIMARY SOURCE ──────────────────────────────────── */
    .note__source {
      margin: auto 0 0; padding-top: 18px;
      display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px;
      font-size: 13px;
    }
    .note__source-label {
      font-size: 11px; font-weight: 600; letter-spacing: 0.07em;
      text-transform: uppercase; color: var(--color-text-muted);
    }
    .note__source a { color: var(--color-accent); text-decoration: underline; text-underline-offset: 2px; }
    .note__source a:hover { text-decoration-thickness: 2px; }
    .note__source a:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 3px; }

    /* ── PUBLISHING STANDARD ─────────────────────────────── */
    .standards {
      margin: 0; padding-left: 22px;
      display: flex; flex-direction: column; gap: 12px;
      color: var(--color-text-secondary); font-size: 15px; line-height: 1.7;
      text-align: left;
    }
    .standards li { text-wrap: pretty; }
  `]
})
export class BlogComponent {
  /**
   * Subject areas, listed for orientation. There is no filtering yet, so
   * this is a plain static strip.
   */
  readonly topics: string[] = [
    'Software Architecture',
    'Distributed Systems',
    'Databases',
    'Machine Learning Research',
    'Quantum Computing',
    'Developer Tooling'
  ];

  /**
   * Planned articles. None is written yet, so `date` is not modelled at all
   * rather than filled with a placeholder. Every entry names the primary
   * source the piece will be written against; each of those links was
   * verified to resolve before being added here.
   */
  readonly articles: BlogArticle[] = [
    {
      index: '01',
      title: 'How the Transformer architecture replaced recurrence in sequence models',
      excerpt:
        'What the attention mechanism actually computes, why removing recurrence made ' +
        'training dramatically more parallelisable, and which parts of the original ' +
        'design have aged well and which have been quietly superseded.',
      category: 'Machine Learning Research',
      status: 'planned',
      badge: 'concept',
      source: {
        label: 'Vaswani et al., "Attention Is All You Need" (arXiv:1706.03762)',
        url: 'https://arxiv.org/abs/1706.03762'
      }
    },
    {
      index: '02',
      title: 'Why skip connections changed the depth of trainable networks',
      excerpt:
        'The optimisation problem that made very deep networks hard to train, how ' +
        'residual connections address it, and the honest caveat that skip connections ' +
        'do not by themselves explain why optimisation became easy.',
      category: 'Machine Learning Research',
      status: 'planned',
      badge: 'concept',
      source: {
        label: 'He et al., "Deep Residual Learning for Image Recognition" (arXiv:1512.03385)',
        url: 'https://arxiv.org/abs/1512.03385'
      }
    },
    {
      index: '03',
      title: 'Reading a few-shot language-model paper without over-reading it',
      excerpt:
        'A close reading of what the few-shot results in the GPT-3 paper do and do not ' +
        'show, including the datasets the authors themselves flag as methodologically ' +
        'contaminated and the tasks where scaling still did not help.',
      category: 'Machine Learning Research',
      status: 'planned',
      badge: 'concept',
      source: {
        label: 'Brown et al., "Language Models are Few-Shot Learners" (arXiv:2005.14165)',
        url: 'https://arxiv.org/abs/2005.14165'
      }
    },
    {
      index: '04',
      title: 'What "quantum advantage" claims did and did not demonstrate',
      excerpt:
        'The sampling task behind the 2019 supremacy experiment, why it is a ' +
        'meaningful milestone and simultaneously a very narrow one, and what a ' +
        'simulation on a classical machine can and cannot tell you.',
      category: 'Quantum Computing',
      status: 'planned',
      badge: 'concept',
      source: {
        label: 'Google AI Quantum, "Quantum supremacy using a programmable superconducting processor" (arXiv:1910.11333)',
        url: 'https://arxiv.org/abs/1910.11333'
      }
    },
    {
      index: '05',
      title: 'Consensus algorithms: reading the Raft paper closely',
      excerpt:
        'Leader election, log replication and safety in Raft, and why the paper ' +
        'reorganises consensus teaching around a small number of mechanisms instead of ' +
        'a family of subtly different protocols.',
      category: 'Distributed Systems',
      status: 'planned',
      badge: 'concept',
      source: {
        label: 'Ongaro & Ousterhout, "In Search of an Understandable Consensus Algorithm"',
        url: 'https://raft.github.io/'
      }
    },
    {
      index: '06',
      title: 'Choosing an embedded database: what SQLite is and is not for',
      excerpt:
        'The concurrency model, the limits on write throughput, and the specific classes ' +
        'of application where an embedded engine is the right answer and where it is not.',
      category: 'Databases',
      status: 'planned',
      badge: 'concept',
      source: {
        label: 'SQLite project, "Appropriate Uses For SQLite"',
        url: 'https://sqlite.org/whentouse.html'
      }
    },
    {
      index: '07',
      title: 'Reading the Bitcoin whitepaper thirty years of commentary later',
      excerpt:
        'What the original paper argues, which of its claims have held up, and how ' +
        'much of the popular description of Bitcoin is actually in the paper.',
      category: 'Software Architecture',
      status: 'planned',
      badge: 'concept',
      source: {
        label: 'Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System"',
        url: 'https://bitcoin.org/bitcoin.pdf'
      }
    },
    {
      index: '08',
      title: 'Reading a library API reference critically',
      excerpt:
        'A repeatable method for checking what a standard-library interface actually ' +
        'guarantees — and how to tell a documented promise from an observed ' +
        'implementation detail.',
      category: 'Developer Tooling',
      status: 'planned',
      badge: 'concept',
      source: {
        label: 'Python documentation, "sqlite3 — DB-API 2.0 interface for SQLite databases"',
        url: 'https://docs.python.org/3/library/sqlite3.html'
      }
    }
  ];

  /** Lightweight editorial standard applied to every article before publication. */
  readonly standards: string[] = [
    'A stated question or technical objective that the article actually answers.',
    'Primary sources — research papers, official documentation, specifications — cited directly.',
    'Reproducible code, experiments or benchmarks wherever the topic allows them.',
    'Explicit limitations, environment details and negative results included, not omitted.',
    'Measured results kept clearly separate from interpretation and from opinion.',
    'Human review before anything is published.'
  ];

  statusLabel(status: ArticleStatus): string {
    return status === 'planned' ? 'Planned' : status;
  }
}
