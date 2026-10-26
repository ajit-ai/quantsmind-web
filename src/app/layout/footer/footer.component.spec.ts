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

  it('renders verified social and repository links', () => {
    const host = render();
    const socialLinks = [...host.querySelectorAll('.qm-footer__social-link')]
      .map(link => link.getAttribute('href'));

    expect(socialLinks).toContain('mailto:ajitkumar&#64;quantsmind.com');
    expect(socialLinks).toContain('https://www.linkedin.com/company/quantsmind');
    expect(socialLinks).toContain('https://github.com/quantsmind');
    expect(socialLinks).not.toContain('https://x.com/quantsmind');
    expect(socialLinks.length).toBe(3);
  });

  it('preserves other verified footer technology links', () => {
    const host = render();
    const text = host.textContent ?? '';

    expect(text).toContain('MicroQuantum');
    expect(text).toContain('Karkain');
    expect(text).toContain('QuantsMind SDK');
    expect(text).toContain('QuantsMind Relational DB');
    expect(text).toContain('GuardMCP');
  });
});