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
});