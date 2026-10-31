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
    expect(component.allProducts.length).toBe(40);
  });

  it('renders category navigation and anchored portfolio sections', () => {
    const navLinks = [...fixture.nativeElement.querySelectorAll('.category-nav__link')];
    expect(navLinks.length).toBe(5);
    for (const id of ['standalone-software', 'quantum-software', 'space-software', 'cybersecurity-software']) {
      expect(fixture.nativeElement.querySelector(`#${id}`)).toBeTruthy();
    }
    expect(fixture.nativeElement.querySelector('a.category-nav__link--mission')?.getAttribute('href'))
      .toBe('/quantum-mission');
  });

  it('renders a card for every product except the featured DI Mini', () => {
    const cards = fixture.nativeElement.querySelectorAll('.qm-product-card');
    expect(cards.length).toBe(39);
  });

  it('shows verified technology tags only where the registry supplies them', () => {
    const tags = [
      ...fixture.nativeElement.querySelectorAll('.qm-product-card__tag, .featured-product__tag')
    ].map((tag: any) => tag.textContent?.trim());
    expect(tags).toEqual([
      'PDF', 'DOCX', 'TXT', 'JSON', 'CSV',
      'Quantum circuits', 'Classical simulation', 'Python'
    ]);
  });

  it('links to the dedicated Quantum Mission page', () => {
    const link = fixture.nativeElement.querySelector('.mission-callout a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/quantum-mission');
  });
});
