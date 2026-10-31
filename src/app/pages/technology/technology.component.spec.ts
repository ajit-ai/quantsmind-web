import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TechnologyComponent } from './technology.component';

describe('TechnologyComponent', () => {
  let fixture: ComponentFixture<TechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyComponent],
      providers: [provideRouter([{ path: '**', component: TechnologyComponent }])]
    }).compileComponents();
    fixture = TestBed.createComponent(TechnologyComponent);
    fixture.detectChanges();
  });

  it('uses the exact "Technologies We Develop" page heading', () => {
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading.textContent.trim()).toBe('Technologies We Develop');
  });

  it('renders the three primary technologies distinctly', () => {
    const primary = fixture.nativeElement.querySelectorAll('.tech-card--primary');
    expect(primary.length).toBe(3);

    const text = fixture.nativeElement.textContent as string;
    for (const name of ['Karkain', 'MicroQuantum', 'QuantsMind SDK']) {
      expect(text).toContain(name);
    }
    for (const label of ['Verified capabilities', 'Language', 'Verified version', 'Maturity']) {
      expect(text).toContain(label);
    }
  });

  it('states verified versions and documentation links for the primary technologies', () => {
    const docs = [...fixture.nativeElement.querySelectorAll('.tech-card__doc-link')]
      .map((link: any) => link.getAttribute('href'));
    expect(docs).toContain('https://github.com/ajit-ai/Karkain#readme');
    expect(docs).toContain('https://ajit-ai.github.io/microquantum/');
    expect(docs).toContain('https://github.com/ajit-ai/quantsmind-quantum-sdk#readme');

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Developer Preview');
    expect(text).toContain('v1.1.0');
    expect(text).toContain('Python 3.13+');
  });

  it('renders all ecosystem categories', () => {
    const groups = fixture.nativeElement.querySelectorAll('.ecosystem-group');
    expect(groups.length).toBe(4);
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Engineering Services');
    expect(text).toContain('Products & Portfolios');
    expect(text).toContain('Developer Technologies');
    expect(text).toContain('Labs and Experimental Work');
  });

  it('renders representative catalog entries', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('MicroQuantum');
    expect(text).toContain('Karkain');
    expect(text).toContain('QuantsMind SDK');
    expect(text).toContain('QuantsMind Document Intelligence Mini');
    expect(text).toContain('Quantum Mission');
    expect(text).toContain('QuantsMind-LLM');
    expect(text).toContain('Vsector');
    expect(text).toContain('QuantsMind OSINT Intelligence Platform');
  });

  it('preserves maturity wording', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Developer Preview');
    expect(text).toContain('Early Access');
    expect(text).toContain('Alpha · Under Development');
    expect(text).toContain('Research Prototype');
    expect(text).toContain('Experimental');
    expect(text).toContain('Feasibility Study');
  });

  it('keeps the detailed technology cards and their verified links', () => {
    const cards = fixture.nativeElement.querySelectorAll('.tech-card');
    expect(cards.length).toBe(7);
    const links = fixture.nativeElement.querySelectorAll('a.tech-card__title-link');
    // Two projects no longer expose an unverified public repository URL.
    expect(links.length).toBe(5);
    const hrefs = [...links].map((link: any) => link.getAttribute('href'));
    expect(hrefs).not.toContain('https://github.com/ajit-ai/QuantsMind-Agent');
    expect(hrefs).not.toContain('https://github.com/ajit-ai/Quantsmind-LLM');
    expect(fixture.nativeElement.textContent).toContain('QuantsMind-Agent');
    expect(fixture.nativeElement.textContent).toContain('QuantsMind-LLM');
    expect(fixture.nativeElement.querySelector('.ecosystem-grid')).toBeTruthy();
  });

  it('states that grouping is not integration', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('category membership, not technical integration');
  });
});
