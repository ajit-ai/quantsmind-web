import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductsComponent } from './products.component';
import {
  getAvailableProducts,
  getInDevelopmentProducts,
  getFeaturedProducts,
  getProductById
} from '../../content/products/product.registry';

describe('ProductsStoreComponent', () => {
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

  const text = (): string => fixture.nativeElement.textContent as string;

  const linkFor = (label: string): string | undefined => {
    const anchor = [...fixture.nativeElement.querySelectorAll('a')]
      .find((a: HTMLAnchorElement) => a.textContent?.includes(label)) as HTMLAnchorElement | undefined;
    return anchor?.getAttribute('href') ?? undefined;
  };

  it('renders the Products Store hero and trust line', () => {
    expect(text()).toContain('THE QUANTSMIND PRODUCTS STORE');
    expect(text()).toContain('Software you can use today');
    expect(text()).toContain(`${getAvailableProducts().length} available`);
    expect(text()).toContain(`${getInDevelopmentProducts().length} in development`);
  });

  it('classifies the verified distributable products as available', () => {
    const ids = getAvailableProducts().map(p => p.id);
    expect(ids).toContain('karkain');
    expect(ids).toContain('microquantum');
    expect(ids).toContain('quantsmind-sdk');
    expect(ids).toContain('karkain-language-tools');
    expect(ids).toContain('quantsmind-vscode-ai-coder');
    expect(ids).toContain('quantsmind-agent');
    expect(ids).toContain('quantsmind-document-intelligence-mini');
  });

  it('does not present proposed or research-only products as available', () => {
    const ids = getAvailableProducts().map(p => p.id);
    for (const proposed of ['quantum-studio', 'quantum-verify', 'ai-guard', 'threat-intel', 'ground-link']) {
      expect(ids).not.toContain(proposed);
    }
    expect(ids).not.toContain('taksh');
    expect(ids).not.toContain('vsector');
  });

  it('shows DI Mini in Available Products as Early Access with honest availability detail', () => {
    const diMini = getProductById('quantsmind-document-intelligence-mini');
    expect(diMini?.availability).toBe('early-access');
    expect(text()).toContain('Document Intelligence Mini');
    expect(text()).toContain('Early Access');
  });

  it('shows proposed initiatives only in In Development, never with an install action', () => {
    const inDevIds = getInDevelopmentProducts().map(p => p.id);
    expect(inDevIds).toContain('quantum-studio');
    expect(inDevIds).not.toContain('taksh'); // research-only, never listed in the store

    const inDevSection = fixture.nativeElement.querySelector('#in-development') as HTMLElement;
    expect(inDevSection.textContent).toContain('QuantumStudio');
    expect(inDevSection.textContent).not.toContain('Install');
  });

  it('renders marketplace evidence for the VS Code extensions', () => {
    const tools = getProductById('karkain-language-tools');
    expect(tools?.marketplaceUrls?.length).toBe(2);
    expect(tools?.marketplaceUrls?.[0].url).toBe('https://open-vsx.org/extension/karkain/karkain');
    expect(tools?.marketplaceUrls?.[1].url).toBe('https://marketplace.visualstudio.com/items?itemName=Karkain.karkain-language-tools');

    const coder = getProductById('quantsmind-vscode-ai-coder');
    expect(coder?.version).toBe('v3.1.x');
    expect(coder?.marketplaceUrls?.some(l => l.url.includes('quantsmind.quantsmind-vscode-ai-coder'))).toBe(true);
  });

  it('detects duplicates and orphaned references in the registry', () => {
    const ids = getAvailableProducts().concat(getInDevelopmentProducts()).map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('filters available products by search query', () => {
    component.searchQuery.set('karkain');
    component.section.set('available');
    fixture.detectChanges();
    const results = component.filteredAvailable();
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(p => p.id === 'karkain')).toBe(true);
    expect(results.every(p => /karkain/i.test(p.name + (p.capabilities ?? []).join(' ') + (p.technologyTags ?? []).join(' ')))).toBe(true);
  });

  it('shows the empty state and clears filters', () => {
    component.searchQuery.set('zzz-no-such-product-xyz');
    fixture.detectChanges();
    expect(text()).toContain('No available products match');
    component.clearFilters();
    fixture.detectChanges();
    expect(component.filteredAvailable().length).toBe(getAvailableProducts().length);
  });

  it('filters by category scientific-quantum only', () => {
    component.selectedCategory.set('scientific-quantum');
    fixture.detectChanges();
    const names = component.filteredAvailable().map(p => p.name);
    expect(names).toContain('MicroQuantum');
    expect(names).toContain('QuantsMind SDK');
    expect(names).not.toContain('Karkain');
  });

  it('hides In Development when the available tab is selected and vice versa', () => {
    component.section.set('available');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#available')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#in-development')).toBeNull();

    component.section.set('in-development');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#available')).toBeNull();
    expect(fixture.nativeElement.querySelector('#in-development')).toBeTruthy();
  });

  it('hides the featured strip when filters are active', () => {
    expect(fixture.nativeElement.querySelector('#featured')).toBeTruthy();
    component.searchQuery.set('microquantum');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#featured')).toBeNull();
  });

  it('links every available card to a real destination', () => {
    for (const product of getAvailableProducts()) {
      const href = component.detailLinkFor(product);
      expect(href).toMatch(/^\/(karkain|microquantum|quantsmind-sdk|products\/)/);
    }
    expect(component.detailLinkFor(getProductById('karkain')!)).toBe('/karkain');
    expect(component.detailLinkFor(getProductById('quantsmind-vscode-ai-coder')!))
      .toBe('/products/quantsmind-vscode-ai-coder');
  });

  it('keeps featured products genuinely available', () => {
    for (const product of getFeaturedProducts()) {
      expect(getAvailableProducts().map(p => p.id)).toContain(product.id);
    }
  });

  it('exposes the product-support destination links', () => {
    expect(linkFor('Product support')).toBe('/support');
    expect(linkFor('Release information')).toBe('/releases');
    expect(linkFor('Documentation index')).toBe('/docs');
    expect(linkFor('Licensing')).toBe('/licensing');
  });
});
