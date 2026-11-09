import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let component: ProductsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [provideRouter([{ path: '**', component: ProductsComponent }])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders DI Mini maturity and availability labels from the registry', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('QuantsMind Document Intelligence Mini');
    expect(text).toContain('v0.1.0');
    expect(text).toContain('Early Access');
    expect(text).toContain('Not a generally available release');
  });

  it('renders the verified processing workflow', () => {
    const text = fixture.nativeElement.textContent as string;
    for (const label of [
      'Processing workflow',
      'Input documents',
      'Text extraction',
      'Field identification',
      'Structured output',
      'PDF',
      'DOCX',
      'TXT',
      'JSON',
      'CSV'
    ]) {
      expect(text).toContain(label);
    }
  });

  it('states the deterministic processing boundary', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('no OCR');
    expect(text).toContain('machine learning');
    expect(text).toContain('embeddings');
  });

  it('builds the portfolio from registry categories', () => {
    expect(component.standaloneProducts.length).toBe(10);
    expect(component.quantumProducts.length).toBe(11);
    expect(component.spaceProducts.length).toBe(8);
    expect(component.cyberProducts.length).toBe(10);
    expect(component.allProducts.length).toBe(41);
  });

  it('renders category navigation and anchored portfolio sections', () => {
    const navLinks = [...fixture.nativeElement.querySelectorAll('.category-nav__link')];
    expect(navLinks.length).toBe(6);
    for (const id of ['standalone-software', 'quantum-software', 'space-software', 'cybersecurity-software']) {
      expect(fixture.nativeElement.querySelector(`#${id}`)).toBeTruthy();
    }
    expect(fixture.nativeElement.querySelector('a.category-nav__link--mission')?.getAttribute('href'))
      .toBe('/quantum-mission');
  });

  it('renders a card for every product except the featured DI Mini', () => {
    const cards = fixture.nativeElement.querySelectorAll('.qm-product-card');
    expect(cards.length).toBe(34);
  });

  it('links catalogue cards with a product detail destination to that detail page', () => {
    const cards: Element[] = Array.from(fixture.nativeElement.querySelectorAll('.qm-product-card'));
    let microCard: Element | null = null;
    for (const card of cards) {
      if ((card.textContent as string).includes('MicroQuantum')) {
        microCard = card;
        break;
      }
    }
    const link = microCard!.querySelector('a') as HTMLAnchorElement | null;
    expect(link).toBeTruthy();
    expect(link!.getAttribute('href')).toBe('/microquantum');
  });

  it('shows verified technology tags only where the registry supplies them', () => {
    const tags = [
      ...fixture.nativeElement.querySelectorAll('.qm-product-card__tag, .featured-product__tag')
    ].map((tag: any) => tag.textContent?.trim());
    expect(tags).toEqual([
      'PDF', 'DOCX', 'TXT', 'JSON', 'CSV',
      'Quantum circuits', 'Classical simulation', 'Python',
      'Systems language', 'Self-hosted compiler', 'C23', 'SSA IR', 'Cross-compilation'
    ]);
  });

  it('links to the dedicated Quantum Mission page', () => {
    const link = fixture.nativeElement.querySelector('.mission-callout a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/quantum-mission');
  });

  it('lists the verified language model technologies under A3', () => {
    const a3Names = component.a3Entries.map(entry => entry.name);
    expect(a3Names).toEqual(
      expect.arrayContaining(['QuantsMind-LLM', 'QuantsMind VSCode AI Coder', 'QuantsMind-Agent'])
    );
  });

  it('keeps the agent and VS Code AI Coder discoverable under A2 and A3', () => {
    const a2Names = component.a2Entries.map(entry => entry.name);
    const a3Names = component.a3Entries.map(entry => entry.name);
    expect(a2Names).toContain('QuantsMind VSCode AI Coder');
    expect(a2Names).toContain('QuantsMind-Agent');
    expect(a3Names).toContain('QuantsMind VSCode AI Coder');
    expect(a3Names).toContain('QuantsMind-Agent');
    expect(a3Names).toContain('QuantsMind-LLM');
  });

  it('renders the A3 language models and AI systems group with verified entries', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('A3 — Language Models & AI Systems');
    expect(text).toContain('QuantsMind-LLM');
    expect(text).toContain('QuantsMind-Agent');
    expect(text).toContain('QuantsMind VSCode AI Coder');
    expect(text).not.toContain('No verified entries are currently classified under A3.');
  });

  it('searches the catalogue by product name and capability', () => {
    component.searchQuery.set('MicroQuantum');
    fixture.detectChanges();
    const results = component.filteredProducts();
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('MicroQuantum');
  });

  it('returns no results for an unmatched search', () => {
    component.searchQuery.set('NoSuchProduct');
    fixture.detectChanges();
    expect(component.filteredProducts().length).toBe(0);
    expect(component.hasActiveFilters()).toBe(true);
  });

  it('applies domain and status filters together with the search query', () => {
    component.searchQuery.set('Karkain');
    component.selectedDomain.set('developer-tools');
    component.selectedStatus.set('developer-preview');
    fixture.detectChanges();
    const results = component.filteredProducts();
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Karkain');
  });

  it('clears all active filters', () => {
    component.searchQuery.set('InvoicePilot');
    component.selectedDomain.set('quantum');
    component.selectedStatus.set('proposed');
    fixture.detectChanges();
    expect(component.hasActiveFilters()).toBe(true);
    component.clearFilters();
    fixture.detectChanges();
    expect(component.hasActiveFilters()).toBe(false);
    expect(component.filteredProducts().length).toBe(component.catalogueProducts.length);
  });

  it('selects the All discovery chip and shows all catalogue products', () => {
    const chip = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')].find((c: any) => c.textContent?.trim() === 'All') as HTMLButtonElement;
    chip.click();
    fixture.detectChanges();
    expect(component.selectedDomain()).toBe('all');
    expect(chip.classList.contains('catalogue-discovery__chip--active')).toBe(true);
    expect(component.filteredProducts().length).toBe(component.catalogueProducts.length);
  });

  it('selects the Software engineering discovery chip', () => {
    const chip = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')].find((c: any) => c.textContent?.trim() === 'Software engineering') as HTMLButtonElement;
    chip.click();
    fixture.detectChanges();
    expect(component.selectedDomain()).toBe('standalone');
    expect(chip.classList.contains('catalogue-discovery__chip--active')).toBe(true);
    const standaloneCount = component.catalogueProducts.filter(p => p.portfolio === 'standalone').length;
    expect(component.filteredProducts().length).toBe(standaloneCount);
    expect(component.filteredProducts().every(p => p.portfolio === 'standalone')).toBe(true);
  });

  it('selects the Quantum & advanced discovery chip', () => {
    const chip = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')].find((c: any) => c.textContent?.trim() === 'Quantum & advanced') as HTMLButtonElement;
    chip.click();
    fixture.detectChanges();
    expect(component.selectedDomain()).toBe('quantum');
    expect(chip.classList.contains('catalogue-discovery__chip--active')).toBe(true);
    const quantumCount = component.catalogueProducts.filter(p => p.portfolio === 'quantum').length;
    expect(component.filteredProducts().length).toBe(quantumCount);
    expect(component.filteredProducts().every(p => p.portfolio === 'quantum')).toBe(true);
  });

  it('selects the Space & cybersecurity discovery chip', () => {
    const chip = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')].find((c: any) => c.textContent?.trim() === 'Space & cybersecurity') as HTMLButtonElement;
    chip.click();
    fixture.detectChanges();
    expect(component.selectedDomain()).toBe('space');
    expect(chip.classList.contains('catalogue-discovery__chip--active')).toBe(true);
    const spaceCount = component.catalogueProducts.filter(p => p.portfolio === 'space').length;
    expect(component.filteredProducts().length).toBe(spaceCount);
    expect(component.filteredProducts().every(p => p.portfolio === 'space')).toBe(true);
  });

  it('selects the Cybersecurity discovery chip', () => {
    const chip = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')].find((c: any) => c.textContent?.trim() === 'Cybersecurity') as HTMLButtonElement;
    chip.click();
    fixture.detectChanges();
    expect(component.selectedDomain()).toBe('cybersecurity');
    expect(chip.classList.contains('catalogue-discovery__chip--active')).toBe(true);
    const cyberCount = component.catalogueProducts.filter(p => p.portfolio === 'cybersecurity').length;
    expect(component.filteredProducts().length).toBe(cyberCount);
    expect(component.filteredProducts().every(p => p.portfolio === 'cybersecurity')).toBe(true);
  });

  it('selects the Developer tools discovery chip', () => {
    const chip = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')].find((c: any) => c.textContent?.trim() === 'Developer tools') as HTMLButtonElement;
    chip.click();
    fixture.detectChanges();
    expect(component.selectedDomain()).toBe('developer-tools');
    expect(chip.classList.contains('catalogue-discovery__chip--active')).toBe(true);
    const dtCount = component.catalogueProducts.filter(p => p.portfolio === 'developer-tools').length;
    expect(component.filteredProducts().length).toBe(dtCount);
    expect(component.filteredProducts().every(p => p.portfolio === 'developer-tools')).toBe(true);
  });

  it('switches discovery chips and updates selection and results', () => {
    const chips = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')] as HTMLButtonElement[];
    const quantum = chips.find(c => c.textContent?.trim() === 'Quantum & advanced')!;
    const standalone = chips.find(c => c.textContent?.trim() === 'Software engineering')!;
    quantum.click();
    fixture.detectChanges();
    expect(component.selectedDomain()).toBe('quantum');
    expect(quantum.classList.contains('catalogue-discovery__chip--active')).toBe(true);
    standalone.click();
    fixture.detectChanges();
    expect(component.selectedDomain()).toBe('standalone');
    expect(quantum.classList.contains('catalogue-discovery__chip--active')).toBe(false);
    expect(standalone.classList.contains('catalogue-discovery__chip--active')).toBe(true);
  });

  it('preserves search text when switching discovery chips', () => {
    component.searchQuery.set('MicroQuantum');
    fixture.detectChanges();
    const chips = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')] as HTMLButtonElement[];
    const quantum = chips.find(c => c.textContent?.trim() === 'Quantum & advanced')!;
    quantum.click();
    fixture.detectChanges();
    expect(component.searchQuery()).toBe('MicroQuantum');
  });

  it('combines discovery chip with search and status filters', () => {
    const chips = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')] as HTMLButtonElement[];
    const developerTools = chips.find(c => c.textContent?.trim() === 'Developer tools')!;
    developerTools.click();
    fixture.detectChanges();
    component.searchQuery.set('Karkain');
    component.selectedStatus.set('developer-preview');
    fixture.detectChanges();
    const results = component.filteredProducts();
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Karkain');
  });

  it('clearing filters restores the catalogue after chip selection', () => {
    const chips = [...fixture.nativeElement.querySelectorAll('.catalogue-discovery__chip')] as HTMLButtonElement[];
    const quantum = chips.find(c => c.textContent?.trim() === 'Quantum & advanced')!;
    quantum.click();
    fixture.detectChanges();
    component.searchQuery.set('NoSuchProduct');
    fixture.detectChanges();
    expect(component.hasActiveFilters()).toBe(true);
    component.clearFilters();
    fixture.detectChanges();
    expect(component.hasActiveFilters()).toBe(false);
    expect(component.filteredProducts().length).toBe(component.catalogueProducts.length);
  });

});
