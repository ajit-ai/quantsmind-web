import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';

import { BlogArticle } from './blog-article.model';
import { articleBySlug } from './articles';

/**
 * Resolves the requested article for the `blog/:slug` route.
 *
 * Doing this at the route level gives three things at once:
 *
 * - the component receives an article that is known to exist, so it never has
 *   to navigate for its own data or render an empty page;
 * - an unknown slug is turned into a single, early redirect to the index
 *   instead of a post-render correction;
 * - the resolved value is merged into the route data, so `RouteMetaService`
 *   can derive the document title, description, social tags and canonical URL
 *   from the same source the page renders.
 *
 * The redirect replaces the history entry rather than pushing a new one, so an
 * invalid URL does not trap the back button between the bad URL and the index.
 */
export const blogArticleResolver: ResolveFn<BlogArticle | RedirectCommand> = route => {
  const article = articleBySlug(route.paramMap.get('slug') ?? '');

  if (article) {
    return article;
  }

  return new RedirectCommand(inject(Router).createUrlTree(['/blog']), { replaceUrl: true });
};
