import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { QmProductDetailComponent } from './qm-product-detail.component';

describe('QmProductDetailComponent', () => {
  let fixture: ComponentFixture<QmProductDetailComponent>;

  const createComponent = (productId: string): void => {
    TestBed.configureTestingModule({
      imports: [QmProductDetailComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { data: { productId } } } }
      ]
    });
    fixture = TestBed.createComponent(QmProductDetailComponent);
  };

  const text = (): string => fixture.nativeElement.textContent as string;

  it('renders a registry product detail with positioning, status, capabilities and next action', () => {
    createComponent('quantum-studio');
    fixture.detectChanges();

    expect(text()).toContain('QuantumStudio');
    expect(text()).toContain('Quantum circuit development and experimentation environment');
    expect(text()).toContain('Quantum Software');
    expect(text()).toContain('Quantum circuit design workflows');
    expect(text()).toContain('Proposed');
    expect(text()).toContain('Not Available');
    expect(text()).toContain('No public repository, release or documentation is currently available');
  });

  it('renders the intended user sections from the registry product', () => {
    createComponent('quantum-studio');
    fixture.detectChanges();

    expect(text()).toContain('Target Domains');
    expect(text()).toContain('Target Clients');
    expect(text()).toContain('Quantum computing');
  });

  it('renders the access request next action for a registry product', () => {
    createComponent('quantum-studio');
    fixture.detectChanges();

    const cta = fixture.nativeElement.querySelector('a.qm-btn');
    expect(cta).toBeTruthy();
    expect(cta.getAttribute('href')).toContain('/contact');
  });

  it('renders a verified directory entry with distribution, evidence and access next action', () => {
    createComponent('quantsmind-vscode-ai-coder');
    fixture.detectChanges();

    expect(text()).toContain('QuantsMind AI Coder (VS Code Extension)');
    expect(text()).toContain('Preview');
    expect(text()).toContain('Open VSX');
    expect(text()).toContain('Microsoft Visual Studio Marketplace');
    expect(text()).toContain('Evidence');
    expect(text()).not.toContain('Capabilities');
  });

  it('renders a verified directory entry with an explore link to its technology page', () => {
    createComponent('quantsmind-llm-directory');
    fixture.detectChanges();

    expect(text()).toContain('Taksh');
    expect(text()).toContain('Research Release');
    expect(text()).toContain('v1.0.0');
    const explore = fixture.nativeElement.querySelector('a.qm-product-detail__explore');
    expect(explore).toBeTruthy();
    expect(explore.getAttribute('href')).toBe('/technology');
    expect(text()).toContain('Explore Taksh (QuantsMind-LLM) →');
    expect(text()).not.toContain('Request Taksh Access');
  });

  it('rejects an unknown product identifier', () => {
    expect(() => createComponent('not-a-product')).toThrow();
  });
});
