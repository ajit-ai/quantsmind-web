import { BlogArticle } from '../blog-article.model';

import { DI_MINI } from './di-mini.article';
import { MICROQUANTUM } from './microquantum.article';
import { KARKAIN } from './karkain.article';
import { QUANTSMIND_SDK } from './quantsmind-sdk.article';
import { RELATIONAL_DB } from './relational-db.article';
import { GUARDMCP } from './guardmcp.article';
import { QUANTSMIND_AGENT } from './quantsmind-agent.article';
import { QUANTSMIND_LLM } from './quantsmind-llm.article';
import { VSECTOR } from './vsector.article';
import { OSINT_PLATFORM } from './osint-platform.article';
import { FAKE_NEWS_DETECTION } from './fake-news-detection.article';

/**
 * Every article, in index order: Products first, then Technology, then Labs.
 * Slugs are unique and each one resolves to a route under /blog/.
 */
export const BLOG_ARTICLES: BlogArticle[] = [
  DI_MINI,
  MICROQUANTUM,
  KARKAIN,
  QUANTSMIND_SDK,
  RELATIONAL_DB,
  GUARDMCP,
  QUANTSMIND_AGENT,
  QUANTSMIND_LLM,
  VSECTOR,
  OSINT_PLATFORM,
  FAKE_NEWS_DETECTION
];

/** Resolves a URL segment to its article, or undefined if none matches. */
export function articleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find(article => article.slug === slug);
}
