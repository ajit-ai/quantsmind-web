import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QmFooterComponent } from './footer.component';

describe('QmFooterComponent', () => {
  function render() {
    TestBed.configureTestingModule({
      imports: [QmFooterComponent],
      providers: [provideRouter([])]
    });
    const fixture = TestBed.createComponent(QmFooterComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the configured social links with exactly one GitHub link', () => {
    const host = render();
    const socialLinks = [...host.querySelectorAll('.qm-footer__social-link')]
      .map(link => link.getAttribute('href'));

    expect(socialLinks).toContain('https://www.linkedin.com/company/quantsmind');
    expect(socialLinks).toContain('https://github.com/quantsmind');
    expect(socialLinks).not.toContain('https://x.com/quantsmind');
    expect(socialLinks.length).toBe(2);

    const githubLinks = [...host.querySelectorAll('a')]
      .filter(link => (link.getAttribute('href') ?? '').includes('github.com'));
    expect(githubLinks.length).toBe(1);
  });

  it('does not expose individual product repository links', () => {
    const host = render();
    const hrefs = [...host.querySelectorAll('a')]
      .map(link => link.getAttribute('href') ?? '');

    expect(hrefs.some(href => href.includes('Quantsmind-Relational-DB'))).toBe(false);
    expect(hrefs.some(href => href.includes('GuardMCP'))).toBe(false);
  });

  it('renders the four-column footer with approved company details', () => {
    const host = render();
    const text = host.textContent ?? '';

    expect(text).toContain('Explore');
    expect(text).toContain('Products & Resources');
    expect(text).toContain('Connect');
    expect(text).toContain('About');
    expect(text).toContain('Services');
    expect(text).toContain('Technology');
    expect(text).toContain('Labs & Research');
    expect(text).toContain('Insights');
    expect(text).toContain('Products Store');
    expect(text).toContain('Release Information');
    expect(text).toContain('Documentation');
    expect(text).toContain('Licensing');
    expect(text).toContain('Karkain');
    expect(text).toContain('MicroQuantum');
    expect(text).toContain('QuantsMind SDK');
    expect(text).not.toContain('QuantsMind Quantum SDK');
    expect(text).toContain('ajitkumar@quantsmind.com');
    expect(text).toContain('Jodhpur, Rajasthan, India');
    expect(text).not.toContain('Shikargarh');
  });

  it('links the Products Store and Release Information to their routes', () => {
    const host = render();
    const link = (label: string) =>
      [...host.querySelectorAll('a')].find(anchor => anchor.textContent?.trim() === label);

    expect(link('Products Store')?.getAttribute('href')).toBe('/products');
    expect(link('Release Information')?.getAttribute('href')).toBe('/releases');
    expect(link('Documentation')?.getAttribute('href')).toBe('/docs');
    expect(link('Licensing')?.getAttribute('href')).toBe('/licensing');
    expect(link('Product Support')?.getAttribute('href')).toBe('/support');
  });
});
