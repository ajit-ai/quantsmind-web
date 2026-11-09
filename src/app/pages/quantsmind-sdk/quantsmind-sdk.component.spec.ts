import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QuantsMindSdkComponent } from './quantsmind-sdk.component';

describe('QuantsMindSdkComponent', () => {
  let fixture: ComponentFixture<QuantsMindSdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantsMindSdkComponent],
      providers: [provideRouter([{ path: '**', component: QuantsMindSdkComponent }])]
    }).compileComponents();
    fixture = TestBed.createComponent(QuantsMindSdkComponent);
    fixture.detectChanges();
  });

  it('uses the canonical QuantsMind SDK name and developer-preview status', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('QuantsMind SDK');
    expect(text).toContain('Developer Preview');
    expect(text).toContain('v1.1.0');
    expect(text).not.toContain('QuantsMind Quantum SDK');
  });

  it('links to the official repository and PyPI distribution', () => {
    const hrefs = [...fixture.nativeElement.querySelectorAll('a')]
      .map((link: HTMLAnchorElement) => link.getAttribute('href'));
    expect(hrefs).toContain('https://github.com/ajit-ai/quantsmind-quantum-sdk');
    expect(hrefs).toContain('https://pypi.org/project/quantsmind/');
  });

  it('does not label the whole SDK as stable', () => {
    const highlight = fixture.nativeElement.querySelector('.sdk-card--highlight') as HTMLElement;
    expect(highlight).toBeTruthy();
    expect(highlight.textContent).toContain('Developer Preview');
    expect(highlight.textContent).not.toContain('Stable');
  });
});
