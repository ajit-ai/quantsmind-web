import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QmHeaderComponent } from './header.component';

describe('QmHeaderComponent search', () => {
  let component: QmHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QmHeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(QmHeaderComponent);
    component = fixture.componentInstance;
  });

  const serviceCases: Array<[string, string]> = [
    ['Cybersecurity', '/services#cybersecurity-digital-trust'],
    ['Space Systems', '/services#space-systems'],
    ['Quantum Computing', '/services#quantum-computing'],
    ['AI Engineering', '/services#ai-intelligent-systems'],
    ['Scientific Computing', '/services#scientific-computing'],
    ['Industrial Intelligence', '/services#industrial-intelligence-digital-twin']
  ];

  for (const [query, expectedHref] of serviceCases) {
    it(`finds the ${query} service`, () => {
      component.searchQuery.set(query);
      const results = component.searchResults();
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(result => result.href === expectedHref)).toBe(true);
      expect(results.every(result => !result.href.includes('%23'))).toBe(true);
    });
  }

  const productCases = ['MicroQuantum', 'InvoicePilot', 'GroundLink', 'PrivacyCore'];

  for (const query of productCases) {
    it(`preserves product search for ${query}`, () => {
      component.searchQuery.set(query);
      const results = component.searchResults();
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(result => result.type === 'Product')).toBe(true);
    });
  }

  it('keeps six top-level destinations and a separate Contact CTA', () => {
    expect(component.navItems.map(item => item.label)).toEqual([
      'Home', 'Business Solutions', 'Products & Technologies', 'Research & Innovation', 'About QuantsMind', 'Insights'
    ]);
  });

  it('keeps Quantum Mission and the technology ecosystem in the products menu', () => {
    const products = component.navItems.find(item => item.label === 'Products & Technologies');
    expect(products?.children?.some(child => child.label === 'Quantum Mission'
      && child.href === '/quantum-mission')).toBe(true);
    expect(products?.children?.some(child => child.label === 'Technology Ecosystem'
      && child.href === '/technology')).toBe(true);
    expect(products?.children?.length).toBe(6);
  });

  it('keeps the six business solution domains under Business Solutions', () => {
    const solutions = component.navItems.find(item => item.label === 'Business Solutions');
    expect(solutions?.href).toBe('/services');
    expect(solutions?.children?.map(child => child.href)).toEqual([
      '/quantum',
      '/services#space-systems',
      '/services#ai-intelligent-systems',
      '/services#scientific-computing',
      '/services#cybersecurity-digital-trust',
      '/services#industrial-intelligence-digital-twin'
    ]);
  });

  it('indexes the approved business page names', () => {
    const titlesByHref = new Map(component.searchIndex.map(entry => [entry.href, entry.title]));
    expect(titlesByHref.get('/services')).toBe('Business Solutions');
    expect(titlesByHref.get('/products')).toBe('Products & Technologies');
    expect(titlesByHref.get('/technology')).toBe('Technology Ecosystem');
    expect(titlesByHref.get('/labs')).toBe('Research & Innovation');
    expect(titlesByHref.get('/blog')).toBe('Insights');
    expect(titlesByHref.get('/about')).toBe('About QuantsMind');
  });

  it('finds Quantum Mission at its dedicated route', () => {
    component.searchQuery.set('Quantum Mission');
    const results = component.searchResults();
    expect(results.some(result => result.href === '/quantum-mission')).toBe(true);
  });
});