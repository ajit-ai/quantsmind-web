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

  it('uses the exact "Technology Ecosystem" page heading', () => {
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading.textContent.trim()).toBe('Technology Ecosystem');
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

    const primaryCards = [...fixture.nativeElement.querySelectorAll('.tech-card--primary')] as HTMLElement[];
    expect(primaryCards.length).toBe(3);
    const byName = (needle: string) =>
      primaryCards.find(card => card.textContent?.includes(needle)) as HTMLElement;
    expect(byName('Karkain').textContent).toContain('Stable');
    expect(byName('Karkain').textContent).toContain('v1.2.0');
    expect(byName('MicroQuantum').textContent).toContain('Developer Preview');
    expect(byName('MicroQuantum').textContent).toContain('v1.1.0');
    expect(byName('MicroQuantum').textContent).not.toContain('v1.2.0');
    expect(byName('QuantsMind SDK').textContent).toContain('Developer Preview');
    expect(byName('QuantsMind SDK').textContent).toContain('v1.1.0');
    expect(byName('QuantsMind SDK').textContent).not.toContain('v1.2.0');

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Developer Preview');
    expect(text).toContain('Stable');
    expect(text).toContain('v1.2.0');
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
    expect(text).toContain('Research Release');
    expect(text).toContain('Experimental');
    expect(text).toContain('Feasibility Study');
  });

  it('keeps the detailed technology cards and their verified links', () => {
    const cards = fixture.nativeElement.querySelectorAll('.tech-card');
    expect(cards.length).toBe(7);
    const links = fixture.nativeElement.querySelectorAll('a.tech-card__title-link');
    expect(links.length).toBe(7);
    const hrefs = [...links].map((link: any) => link.getAttribute('href'));
    expect(hrefs).toContain('https://github.com/ajit-ai/QuantsMind-Agent');
    expect(hrefs).toContain('https://github.com/ajit-ai/QuantsMind-LLM');
    expect(fixture.nativeElement.textContent).toContain('QuantsMind-Agent');
    expect(fixture.nativeElement.textContent).toContain('Taksh');
    expect(fixture.nativeElement.querySelector('.ecosystem-grid')).toBeTruthy();
  });

  it('states that grouping is not integration', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('category membership, not technical integration');
  });

  it('describes the wider ecosystem as mixed alpha and research work', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Wider ecosystem · alpha & research');
    expect(text).not.toContain('Wider ecosystem in alpha');
  });

  it('keeps research work distinct from released developer technologies', () => {
    const cards = [...fixture.nativeElement.querySelectorAll('.tech-card')] as HTMLElement[];
    const llm = cards.find(card => card.textContent?.includes('Taksh'));

    expect(llm).toBeTruthy();
    expect(llm!.textContent).toContain('Research Release');
    expect(llm!.textContent).toContain('v1.0.0');
    expect(llm!.querySelector('a[href]')?.getAttribute('href')).toBe(
      'https://github.com/ajit-ai/QuantsMind-LLM'
    );

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Exploratory research code and prototypes; not production-ready.');
  });
});
