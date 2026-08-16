import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * SafeHtmlPipe
 * Renders trusted inline SVG strings (icons) via [innerHTML].
 * Angular's default HTML sanitizer strips <svg> elements, so the
 * SVG strings must be marked as trusted. Only use with static,
 * application-defined markup.
 */
@Pipe({ name: 'qmSafeHtml', standalone: true })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
