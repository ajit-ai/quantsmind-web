import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';

import { QmProductDetailComponent } from './qm-product-detail.component';

describe('QmProductDetailComponent', () => {
  let fixture: ComponentFixture<QmProductDetailComponent>;

  const createComponent = (slug: string): void => {
    TestBed.configureTestingModule({
      imports: [QmProductDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ slug }), data: {}, queryParamMap: convertToParamMap({}) } }
        }
      ]
    });
    fixture = TestBed.createComponent(QmProductDetailComponent);
  };

  const text = (): string => fixture.nativeElement.textContent as string;

  it('renders a proposed calculator-class product with honest not-available state', () => {
    createComponent('quantum-studio');
    fixture.detectChanges();

    expect(text()).toContain('QuantumStudio');
    expect(text()).toContain('Proposed');
    expect(text()).toContain('Not Available');
    expect(text()).toContain('No public repository, release or documentation is currently available');
    expect(text()).toContain('Problems it is designed to solve');
    expect(text()).toContain('Related products');
  });

  it('renders the AI Coder with install instructions and both marketplaces', () => {
    createComponent('quantsmind-vscode-ai-coder');
    fixture.detectChanges();

    expect(text()).toContain('QuantsMind AI Coder');
    expect(text()).toContain('v3.1.x');
    expect(text()).toContain('Install or get access');
    expect(text()).toContain('ext install quantsmind.quantsmind-vscode-ai-coder');
    const links = [...fixture.nativeElement.querySelectorAll('a[href]')]
      .map((link: HTMLAnchorElement) => link.getAttribute('href'));
    expect(links).toContain('https://open-vsx.org/extension/quantsmind/quantsmind-vscode-ai-coder');
    expect(links).toContain('https://marketplace.visualstudio.com/items?itemName=quantsmind.quantsmind-vscode-ai-coder');
    expect(links).toContain('https://github.com/Quantsmind/QuantsMind-VSCode-AI-Coder');
  });

  it('renders Karkain Language Tools with both listings and a release history', () => {
    createComponent('karkain-language-tools');
    fixture.detectChanges();

    expect(text()).toContain('Karkain Language Tools');
    expect(text()).toContain('v1.0.0');
    expect(text()).toContain('Karkain.karkain-language-tools');
    expect(text()).toContain('Release history');
    expect(text()).toContain('2026-11-14');
    expect(text()).toContain('Related products');
    const links = [...fixture.nativeElement.querySelectorAll('a[href]')]
      .map((link: HTMLAnchorElement) => link.getAttribute('href'));
    expect(links).toContain('https://open-vsx.org/extension/karkain/karkain');
    expect(links).toContain('https://marketplace.visualstudio.com/items?itemName=Karkain.karkain-language-tools');
  });

  it('renders Taksh as research with no install action and a link to the research notes', () => {
    createComponent('taksh');
    fixture.detectChanges();

    expect(text()).toContain('Taksh');
    expect(text()).toContain('Research Prototype');
    expect(text()).toContain('Not Available');
    expect(text()).not.toContain('Install or get access');

    const cta = [...fixture.nativeElement.querySelectorAll('a')]
      .find((link: HTMLAnchorElement) => link.textContent?.includes('research notes')) as HTMLAnchorElement | undefined;
    expect(cta).toBeTruthy();
    expect(cta?.getAttribute('href')).toBe('/insights/quantsmind-llm');
  });

  it('renders the relational DB pre-release with its honest not-available state', () => {
    createComponent('quantsmind-relational-db');
    fixture.detectChanges();

    expect(text()).toContain('QuantsMind Relational DB');
    expect(text()).toContain('v0.1.0');
    expect(text()).toContain('Alpha');
    expect(text()).toContain('Related products');
  });

  it('renders a dedicated route redirect for karkain', () => {
    TestBed.configureTestingModule({
      imports: [QmProductDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ slug: 'karkain' }), data: {}, queryParamMap: convertToParamMap({}) } }
        }
      ]
    });
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture = TestBed.createComponent(QmProductDetailComponent);
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith('/karkain', { replaceUrl: true });
  });

  it('renders a not-found state for an unknown slug instead of throwing', () => {
    createComponent('no-such-product-xyz');
    fixture.detectChanges();

    expect(text()).toContain('PRODUCT NOT FOUND');
    expect(text()).toContain('Back to the Products Store');
  });
});
