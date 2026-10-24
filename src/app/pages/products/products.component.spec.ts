import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [provideRouter([{ path: '**', component: ProductsComponent }])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
  });

  it('renders DI Mini maturity and availability labels', () => {
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
});