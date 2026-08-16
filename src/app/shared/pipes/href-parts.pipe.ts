import { Pipe, PipeTransform } from '@angular/core';

export interface HrefParts {
  path: string;
  fragment?: string;
}

@Pipe({
  name: 'hrefParts',
  standalone: true
})
export class HrefPartsPipe implements PipeTransform {
  transform(href: string): HrefParts {
    const i = href.indexOf('#');
    return i === -1 ? { path: href } : { path: href.slice(0, i), fragment: href.slice(i + 1) };
  }
}
