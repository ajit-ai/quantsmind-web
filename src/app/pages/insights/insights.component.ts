import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

type InsightCategory = 'All' | 'AI' | 'Data' | 'Software' | 'Cloud' | 'Architecture' | 'Optimisation' | 'Quantum' | 'Strategy';
type BadgeVariant = 'ai' | 'data' | 'software' | 'cloud' | 'software' | 'optimization' | 'quantum' | 'default';

interface Insight {
  title: string;
  description: string;
  category: InsightCategory;
  badge: BadgeVariant;
  date: string;
  readingTime: string;
  tags: string[];
}

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule, RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">INSIGHTS</span>
        <h1>Technical Thinking on Hard Problems.</h1>
        <p class="lead">
          Analysis, perspective, and engineering depth across AI, data, software,
          cloud, optimisation, quantum computing, and technology strategy.
        </p>
      </qm-container>
    </section>

    <qm-section surface="white">
      <qm-container>
        <!-- Category filter -->
        <div class="filter-bar" role="group" aria-label="Filter insights by category">
          <button
            *ngFor="let cat of categories"
            class="filter-btn"
            [class.filter-btn--active]="activeCategory() === cat"
            (click)="setCategory(cat)"
            [attr.aria-pressed]="activeCategory() === cat">
            {{ cat }}
          </button>
        </div>

        <!-- Insights grid -->
        <div class="insights-grid" role="list">
          <article
            *ngFor="let insight of filteredInsights()"
            class="insight-card"
            role="listitem">
            <div class="insight-card__meta">
              <qm-badge [variant]="insight.badge">{{ insight.category }}</qm-badge>
              <span class="insight-card__date">{{ insight.date }}</span>
              <span class="insight-card__time">{{ insight.readingTime }}</span>
            </div>
            <h2 class="insight-card__title">{{ insight.title }}</h2>
            <p class="insight-card__desc">{{ insight.description }}</p>
            <div class="insight-card__tags">
              <span *ngFor="let tag of insight.tags" class="insight-tag">{{ tag }}</span>
            </div>
            <div class="insight-card__footer">
              <a routerLink="/insights" class="insight-card__read" [attr.aria-label]="'Read: ' + insight.title">
                Read Article →
              </a>
            </div>
          </article>
        </div>

        <div *ngIf="filteredInsights().length === 0" class="insights-empty">
          <p>No insights in this category yet. Check back soon.</p>
        </div>
      </qm-container>
    </qm-section>

    <!-- Newsletter / updates -->
    <qm-section surface="subtle" size="sm">
      <qm-container size="narrow">
        <div class="page-cta">
          <span class="eyebrow">STAY INFORMED</span>
          <h2>Technical Depth, When It Matters.</h2>
          <p class="lead">
            If you are working through a complex technology problem,
            QuantsMind Insights offers grounded, technical perspective —
            not marketing content.
          </p>
          <qm-button variant="primary" [routerLinkValue]="'/contact'">
            Get in Touch →
          </qm-button>
        </div>
      </qm-container>
    </qm-section>
  `,
  styles: [`
    .page-hero { padding: 80px 0 64px; border-bottom: 1px solid #E2E8F0; }
    @media (min-width: 768px) { .page-hero { padding: 112px 0 80px; } }
    .page-hero h1 { max-width: 700px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 620px; margin: 0; }

    .filter-bar {
      display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 48px;
    }
    .filter-btn {
      font-family: inherit; font-size: 13px; font-weight: 500;
      color: #475569; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 9999px;
      padding: 6px 16px; cursor: pointer;
      transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
    }
    .filter-btn:hover { background: #F1F5F9; color: #111827; border-color: #CBD5E1; }
    .filter-btn--active {
      background: #EFF6FF; color: #2563EB; border-color: #BFDBFE; font-weight: 600;
    }
    .filter-btn:focus-visible {
      outline: 2px solid #2563EB; outline-offset: 2px;
    }

    .insights-grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
    }
    @media (min-width: 640px)  { .insights-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .insights-grid { grid-template-columns: repeat(3, 1fr); } }

    .insight-card {
      display: flex; flex-direction: column; gap: 12px;
      padding: 28px; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 12px;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .insight-card:hover {
      border-color: #BFDBFE;
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }

    .insight-card__meta {
      display: flex; align-items: center; flex-wrap: wrap; gap: 10px;
    }
    .insight-card__date, .insight-card__time {
      font-size: 12px; color: #94A3B8;
    }
    .insight-card__title {
      font-size: 17px; font-weight: 600; color: #111827;
      margin: 0; line-height: 1.4;
    }
    .insight-card__desc {
      font-size: 14px; color: #475569; line-height: 1.6; margin: 0; flex: 1;
    }
    .insight-card__tags {
      display: flex; flex-wrap: wrap; gap: 6px;
    }
    .insight-tag {
      font-size: 11px; color: #64748B; background: #F8FAFC;
      border: 1px solid #E2E8F0; border-radius: 9999px; padding: 2px 8px;
    }
    .insight-card__footer { margin-top: auto; padding-top: 8px; border-top: 1px solid #F1F5F9; }
    .insight-card__read {
      font-size: 13px; font-weight: 500; color: #2563EB; text-decoration: none;
    }
    .insight-card__read:hover { text-decoration: underline; }
    .insight-card__read:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; border-radius: 2px; }

    .insights-empty {
      padding: 64px; text-align: center;
      color: #64748B; font-size: 15px;
    }

    .page-cta {
      text-align: center; display: flex; flex-direction: column;
      align-items: center; gap: 16px;
    }
    .page-cta h2 { margin: 0; }

    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: #475569; margin: 0; }

    @media (prefers-reduced-motion: reduce) {
      .insight-card { transition: none; }
    }
  `]
})
export class InsightsComponent {
  categories: InsightCategory[] = [
    'All', 'Architecture', 'AI', 'Data', 'Software', 'Cloud', 'Optimisation', 'Quantum', 'Strategy'
  ];

  activeCategory = signal<InsightCategory>('All');

  setCategory(cat: InsightCategory): void {
    this.activeCategory.set(cat);
  }

  filteredInsights = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? this.insights : this.insights.filter(i => i.category === cat);
  });

  insights: Insight[] = [
    {
      title: 'Designing Systems That Can Be Reasoned About',
      description: 'The most important property of a complex system is not performance or scalability — it is understandability. How we design for cognitive clarity and what happens when we do not.',
      category: 'Architecture', badge: 'software',
      date: 'July 2025', readingTime: '8 min read',
      tags: ['System Design', 'Complexity', 'Architecture Patterns']
    },
    {
      title: 'When to Use an LLM and When Not To',
      description: 'Large language models are powerful but not universally appropriate. A practical framework for deciding where AI adds genuine value versus where it adds cost, latency, and fragility.',
      category: 'AI', badge: 'ai',
      date: 'June 2025', readingTime: '6 min read',
      tags: ['LLMs', 'AI Engineering', 'Decision Framework']
    },
    {
      title: 'Beyond Greedy: Thinking About Hard Optimisation Problems',
      description: 'When your scheduling or allocation problem grows to real-world scale, simple heuristics break down. An introduction to the landscape of optimisation methods and how to choose between them.',
      category: 'Optimisation', badge: 'optimization',
      date: 'June 2025', readingTime: '10 min read',
      tags: ['Combinatorial Optimisation', 'Metaheuristics', 'OR-Tools']
    },
    {
      title: 'The Medallion Architecture: Why Layers Matter in Data Platforms',
      description: 'Bronze, Silver, Gold — the medallion pattern is widely adopted, but rarely fully understood. Why the separation of concerns it enforces matters for data quality, lineage, and evolution.',
      category: 'Data', badge: 'data',
      date: 'May 2025', readingTime: '7 min read',
      tags: ['Data Lakehouse', 'dbt', 'Data Architecture']
    },
    {
      title: 'Domain-Driven Design in Practice: Bounded Contexts That Work',
      description: 'DDD is well-understood in theory and consistently misapplied in practice. What actually goes wrong when teams draw context boundaries, and how to draw them more carefully.',
      category: 'Software', badge: 'software',
      date: 'May 2025', readingTime: '9 min read',
      tags: ['DDD', 'Bounded Contexts', 'Microservices']
    },
    {
      title: 'Kubernetes at Scale: What Nobody Tells You About Operating It',
      description: 'Kubernetes solves real problems. It also introduces significant operational complexity that is underestimated during adoption. Honest observations from production experience.',
      category: 'Cloud', badge: 'cloud',
      date: 'April 2025', readingTime: '11 min read',
      tags: ['Kubernetes', 'Platform Engineering', 'Production Operations']
    },
    {
      title: 'RAG Architecture: Getting Retrieval Right',
      description: 'Retrieval-augmented generation is the right pattern for many enterprise AI applications. But the retrieval half of RAG is where most implementations fail. What to get right.',
      category: 'AI', badge: 'ai',
      date: 'April 2025', readingTime: '8 min read',
      tags: ['RAG', 'Vector Search', 'LLM Integration']
    },
    {
      title: 'Quantum Computing for Optimisation: Realistic Assessment in 2025',
      description: 'What quantum computing can and cannot do for combinatorial optimisation problems today. An honest assessment of NISQ-era hardware, QAOA, and when classical methods still win.',
      category: 'Quantum', badge: 'quantum',
      date: 'March 2025', readingTime: '12 min read',
      tags: ['Quantum Computing', 'QAOA', 'Optimisation']
    },
    {
      title: 'Modernising Without Rewriting: The Strangler Fig in Practice',
      description: 'The strangler fig pattern is the responsible approach to legacy system modernisation. How to apply it in practice, where it fails, and what it actually requires of your engineering team.',
      category: 'Architecture', badge: 'software',
      date: 'March 2025', readingTime: '9 min read',
      tags: ['Legacy Modernisation', 'Strangler Fig', 'Migration Strategy']
    },
    {
      title: 'Technology Strategy for Engineering Leaders: Choosing What Not to Build',
      description: 'The most consequential technology decisions are not what to build, but what not to build. How engineering leaders can develop the discipline to constrain scope and protect architectural integrity.',
      category: 'Strategy', badge: 'default',
      date: 'February 2025', readingTime: '7 min read',
      tags: ['Technology Strategy', 'Engineering Leadership', 'Architecture Governance']
    },
    {
      title: 'Observability Is Not Monitoring: What the Distinction Actually Means',
      description: 'The difference between monitoring and observability is not about tools — it is about epistemics. What makes a system truly observable, and why most production systems are not.',
      category: 'Cloud', badge: 'cloud',
      date: 'February 2025', readingTime: '6 min read',
      tags: ['OpenTelemetry', 'Observability', 'Production Systems']
    },
    {
      title: 'Data Contracts: From Syntax to Semantics',
      description: 'Data contracts as implemented today are largely syntactic — they validate structure but not meaning. What semantic data contracts would look like and why they matter for large data platforms.',
      category: 'Data', badge: 'data',
      date: 'January 2025', readingTime: '8 min read',
      tags: ['Data Contracts', 'Data Quality', 'Data Governance']
    }
  ];
}
