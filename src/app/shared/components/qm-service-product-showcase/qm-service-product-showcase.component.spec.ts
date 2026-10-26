import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QmServiceProductShowcaseComponent } from './qm-service-product-showcase.component';

describe('QmServiceProductShowcaseComponent', () => {
  let fixture: ComponentFixture<QmServiceProductShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QmServiceProductShowcaseComponent],
      providers: [provideRouter([{ path: '**', component: QmServiceProductShowcaseComponent }])]
    }).compileComponents();
  });

  it('resolves featured products from the registry', () => {
    fixture = TestBed.createComponent(QmServiceProductShowcaseComponent);
    fixture.componentRef.setInput('featuredProductIds', ['microquantum', 'quantum-studio', 'threat-intel']);
    fixture.componentRef.setInput('productsAnchor', 'quantum-software');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('MicroQuantum');
    expect(text).toContain('QuantumStudio');
    expect(text).toContain('ThreatIntel');
    expect(text).toContain('Developer Preview');
    expect(text).toContain('Proposed');
  });

  it('does not render duplicate featured products', () => {
    fixture = TestBed.createComponent(QmServiceProductShowcaseComponent);
    fixture.componentRef.setInput('featuredProductIds', ['microquantum', 'microquantum']);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.qm-service-showcase__item').length).toBe(1);
  });

  it('links to the Products portfolio anchor', () => {
    fixture = TestBed.createComponent(QmServiceProductShowcaseComponent);
    fixture.componentRef.setInput('featuredProductIds', ['ground-link']);
    fixture.componentRef.setInput('productsAnchor', 'space-software');
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.qm-service-showcase__link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toContain('/products');
    expect(link.getAttribute('href')).toContain('space-software');
  });
});
