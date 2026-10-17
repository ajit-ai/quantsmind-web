import { BLOG_ARTICLES, articleBySlug } from './index';
import {
  ARTICLE_CATEGORIES,
  ArticleBlock,
  ArticleCard,
  ArticleParagraph,
  BlogArticle
} from '../blog-article.model';

function blocksOf(article: BlogArticle): ArticleBlock[] {
  return article.sections.flatMap(section => section.blocks);
}

function cardsOf(article: BlogArticle): ArticleCard[] {
  return blocksOf(article).filter((block): block is ArticleCard => block.kind === 'card');
}

function paragraphsOf(article: BlogArticle): ArticleParagraph[] {
  return blocksOf(article).filter((block): block is ArticleParagraph => block.kind === 'p');
}

const SLUGS = BLOG_ARTICLES.map(article => article.slug);

describe('BLOG_ARTICLES registry', () => {
  it('contains exactly 11 articles', () => {
    expect(BLOG_ARTICLES.length).toBe(11);
  });

  it('uses unique slugs', () => {
    expect(new Set(SLUGS).size).toBe(SLUGS.length);
  });

  it.each(SLUGS)('resolves "%s" through articleBySlug', slug => {
    expect(articleBySlug(slug)?.slug).toBe(slug);
  });

  it('returns undefined for an unknown slug', () => {
    expect(articleBySlug('no-such-article')).toBeUndefined();
  });
});

describe('article slugs', () => {
  it.each(SLUGS)('"%s" is non-empty and URL-safe', slug => {
    expect(slug.length).toBeGreaterThan(0);
    expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });
});

describe('article content', () => {
  it.each(SLUGS)('"%s" has a title, summary, introduction and conclusion', slug => {
    const article = articleBySlug(slug)!;

    expect(article.title.trim().length).toBeGreaterThan(0);
    expect(article.summary.trim().length).toBeGreaterThan(0);
    expect(article.intro.trim().length).toBeGreaterThan(0);
    expect(article.conclusion.trim().length).toBeGreaterThan(0);
  });

  it.each(SLUGS)('"%s" declares a known category', slug => {
    expect(ARTICLE_CATEGORIES).toContain(articleBySlug(slug)!.category);
  });

  it.each(SLUGS)('"%s" carries a factual maturity label', slug => {
    const maturity = articleBySlug(slug)!.maturity.toLowerCase();

    expect(maturity.trim().length).toBeGreaterThan(0);
    // A production-readiness claim is never permitted on an index badge.
    expect(maturity).not.toContain('production-ready');
    expect(maturity).not.toContain('production ready');
  });

  it.each(SLUGS)('"%s" is divided into developed sections', slug => {
    const sections = articleBySlug(slug)!.sections;

    expect(sections.length).toBeGreaterThanOrEqual(3);
    for (const section of sections) {
      expect(section.heading.trim().length).toBeGreaterThan(0);
      expect(section.blocks.length).toBeGreaterThan(0);
    }
  });

  it.each(SLUGS)('"%s" leads with paragraphs rather than bullet points', slug => {
    const paragraphs = paragraphsOf(articleBySlug(slug)!);
    const proseLength = paragraphs.reduce((total, p) => total + p.text.length, 0);

    // Prose is the primary reading experience, so an article must not be
    // able to collapse into a title plus one-line bullets.
    expect(paragraphs.length).toBeGreaterThanOrEqual(5);
    expect(proseLength).toBeGreaterThanOrEqual(600);
  });

  it.each(SLUGS)('"%s" carries exactly one maturity card', slug => {
    const maturityCards = cardsOf(articleBySlug(slug)!).filter(card => card.card === 'maturity');

    expect(maturityCards.length).toBe(1);
    expect(maturityCards[0].title.trim().length).toBeGreaterThan(0);
  });

  it.each(SLUGS)('"%s" carries supporting information cards', slug => {
    const cards = cardsOf(articleBySlug(slug)!);

    // Cards supplement the prose; they must not replace it.
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      expect(card.title.trim().length).toBeGreaterThan(0);
    }
  });
});
