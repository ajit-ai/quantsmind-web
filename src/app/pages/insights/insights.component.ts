import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

import { RouterModule } from '@angular/router';
import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmButtonComponent }    from '../../shared/components/qm-button/qm-button.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';
import { Insight, InsightCategory, insights as allInsights } from './insights-data';

@Component({
    selector: 'app-insights',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmButtonComponent, QmBadgeComponent],
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
          @for (cat of categories; track cat) {
            <button
              class="filter-btn"
              [class.filter-btn--active]="activeCategory() === cat"
              (click)="setCategory(cat)"
              [attr.aria-pressed]="activeCategory() === cat">
              {{ cat }}
            </button>
          }
        </div>
    
        <!-- Insights grid -->
        <div class="insights-grid" role="list">
          @for (insight of filteredInsights(); track insight) {
            <article
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
                @for (tag of insight.tags; track tag) {
                  <span class="insight-tag">{{ tag }}</span>
                }
              </div>
              <div class="insight-card__footer">
                <a [routerLink]="['/insights', insight.slug]" class="insight-card__read" [attr.aria-label]="'Read: ' + insight.title">
                  Read Article â†’
                </a>
              </div>
            </article>
          }
        </div>
    
        @if (filteredInsights().length === 0) {
          <div class="insights-empty">
            <p>No insights in this category yet. Check back soon.</p>
          </div>
        }
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
            QuantsMind Insights offers grounded, technical perspective â€”
            not marketing content.
          </p>
          <qm-button variant="primary" [routerLinkValue]="'/contact'">
            Get in Touch â†’
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

  insights = allInsights;
}
