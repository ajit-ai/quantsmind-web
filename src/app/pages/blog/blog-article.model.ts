import { BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';
import { InfoCardKind } from '../../shared/components/qm-info-card/qm-info-card.component';

/** The three collections the articles are organised into. */
export type ArticleCategory = 'Products' | 'Technology' | 'Labs';

/** An ordinary paragraph of article prose. */
export interface ArticleParagraph {
  kind: 'p';
  text: string;
}

/** A short list, used for inventories, prerequisites or limitations. */
export interface ArticleList {
  kind: 'list';
  items: string[];
  ordered?: boolean;
}

/** A code sample or command sequence, scrolled horizontally when long. */
export interface ArticleCode {
  kind: 'code';
  language: string;
  code: string;
  caption?: string;
}

/** A light-coloured supporting-information card placed between paragraphs. */
export interface ArticleCard {
  kind: 'card';
  card: InfoCardKind;
  title: string;
  body?: string;
  points?: string[];
  code?: string;
  codeLabel?: string;
}

/** A compact table, used for inventories and status comparisons. */
export interface ArticleTable {
  kind: 'table';
  caption: string;
  head: string[];
  rows: string[][];
}

export type ArticleBlock = ArticleParagraph | ArticleList | ArticleCode | ArticleCard | ArticleTable;

/** A titled division of an article's body. */
export interface ArticleSection {
  heading: string;
  blocks: ArticleBlock[];
}

/**
 * A complete article. Content is data rather than template markup so the
 * reading view renders every article through one component and articles are
 * easy to review, reorder or withhold.
 */
export interface BlogArticle {
  /** URL segment under /blog/. Unique across all categories. */
  slug: string;
  category: ArticleCategory;
  title: string;
  /** Two or three sentences shown on the index card. */
  summary: string;
  /** Factual maturity label, never a production-readiness claim. */
  maturity: string;
  /** Badge treatment matching the maturity label. */
  maturityVariant: BadgeVariant;
  /** Opening paragraph: the problem and why the subject matters. */
  intro: string;
  /** Body sections, in reading order. */
  sections: ArticleSection[];
  /**
   * Pages already on this site that describe the same project, so a reader can
   * check a claim without leaving it. Only existing routes belong here; a
   * subject with no corresponding page is simply left out.
   */
  verification?: { label: string; route: string }[];
  /** Closing paragraph: what the project can do today. */
  conclusion: string;
}

/** Index cards grouped by category, in the order they should be presented. */
export const ARTICLE_CATEGORIES: ArticleCategory[] = ['Products', 'Technology', 'Labs'];
