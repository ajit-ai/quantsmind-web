import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QmProductPortfolioComponent } from './qm-product-portfolio.component';
import { Product } from '../../../content/products/product.model';

describe('QmProductPortfolioComponent', () => {
  let fixture: ComponentFixture<QmProductPortfolioComponent>;

  const products: Product[] = [
    {
      id: 'one',
      name: 'Product One',
      summary: 'Summary one',
      description: 'Description one',
      maturity: 'alpha',
      availability: 'early-access',
      portfolio: 'standalone',
      verification: 'not-verified'
    },
    {
      id: 'two',
      name: 'Product Two',
      summary: 'Summary two',
      description: 'Description two',
      maturity: 'released',
      availability: 'general-availability',
      portfolio: 'standalone',
      verification: 'not-verified'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QmProductPortfolioComponent],
      providers: [provideRouter([{ path: '**', component: QmProductPortfolioComponent }])]
    }).compileComponents();
  });

  it('renders title and description', () => {
    fixture = TestBed.createComponent(QmProductPortfolioComponent);
    fixture.componentRef.setInput('title', 'Quantum Portfolio');
    fixture.componentRef.setInput('description', 'Quantum software initiatives');
    fixture.componentRef.setInput('products', products);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Quantum Portfolio');
    expect(text).toContain('Quantum software initiatives');
  });

  it('renders the product count from actual records', () => {
    fixture = TestBed.createComponent(QmProductPortfolioComponent);
    fixture.componentRef.setInput('title', 'Quantum Portfolio');
    fixture.componentRef.setInput('products', products);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('2');
    expect(fixture.nativeElement.querySelectorAll('qm-product-card').length).toBe(2);
  });

  it('renders an accessible heading', () => {
    fixture = TestBed.createComponent(QmProductPortfolioComponent);
    fixture.componentRef.setInput('title', 'Quantum Portfolio');
    fixture.componentRef.setInput('products', products);
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toContain('Quantum Portfolio');
  });

  it('handles an empty collection', () => {
    fixture = TestBed.createComponent(QmProductPortfolioComponent);
    fixture.componentRef.setInput('title', 'Empty Portfolio');
    fixture.componentRef.setInput('products', []);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No products are currently listed');
    expect(fixture.nativeElement.querySelectorAll('qm-product-card').length).toBe(0);
  });

  it('does not render duplicate products', () => {
    fixture = TestBed.createComponent(QmProductPortfolioComponent);
    fixture.componentRef.setInput('title', 'Duplicate Portfolio');
    fixture.componentRef.setInput('products', [...products, products[0]]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('qm-product-card').length).toBe(2);
  });
});
