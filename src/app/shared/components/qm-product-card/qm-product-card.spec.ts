import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QmProductCardComponent } from './qm-product-card.component';
import { Product } from '../../../content/products/product.model';

describe('QmProductCardComponent', () => {
  let fixture: ComponentFixture<QmProductCardComponent>;

  const product: Product = {
    id: 'test-product',
    name: 'Test Product',
    shortName: 'TP',
    summary: 'A concise summary',
    description: 'A longer description',
    capabilities: ['Capability one', 'Capability two', 'Capability three', 'Capability four'],
    maturity: 'developer-preview',
    availability: 'early-access',
    portfolio: 'standalone',
    version: 'v1.2.3',
    releaseChannel: 'Preview',
    cta: { label: 'Open product', route: '/contact' },
    verification: 'not-verified'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QmProductCardComponent],
      providers: [provideRouter([{ path: '**', component: QmProductCardComponent }])]
    }).compileComponents();

    fixture = TestBed.createComponent(QmProductCardComponent);
    fixture.componentRef.setInput('product', product);
    fixture.detectChanges();
  });

  it('renders the product name', () => {
    expect(fixture.nativeElement.textContent).toContain('Test Product');
  });

  it('renders the summary', () => {
    expect(fixture.nativeElement.textContent).toContain('A concise summary');
  });

  it('renders the maturity label', () => {
    expect(fixture.nativeElement.textContent).toContain('Developer Preview');
  });

  it('renders the availability label', () => {
    expect(fixture.nativeElement.textContent).toContain('Early Access');
  });

  it('renders the optional version', () => {
    expect(fixture.nativeElement.textContent).toContain('v1.2.3');
    expect(fixture.nativeElement.textContent).toContain('Preview');
  });

  it('renders a capabilities preview limited to three items', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Capability one');
    expect(text).toContain('Capability three');
    expect(text).not.toContain('Capability four');
  });

  it('renders the internal CTA as a link', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.textContent).toContain('Open product');
    expect(link.getAttribute('href')).toBe('/contact');
  });

  it('renders a related-service link without encoding the hash', () => {
    const productWithService: Product = {
      ...product,
      relatedServiceId: 'quantum-computing'
    };
    fixture.componentRef.setInput('product', productWithService);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.qm-product-card__service-link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/services#quantum-computing');
    expect(link.getAttribute('href')).not.toContain('%23');
  });
  it('does not render a GitHub or source-code button', () => {
    const text = (fixture.nativeElement.textContent as string).toLowerCase();
    expect(text).not.toContain('github');
    expect(text).not.toContain('source code');
    expect(text).not.toContain('repository');
  });
});
