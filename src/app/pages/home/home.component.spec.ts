import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent Quantum Mission spotlight', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([{ path: '**', component: HomeComponent }])]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('presents Quantum Mission as released and generally available', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('10 applications');
    expect(text).toContain('Released');
    expect(text).toContain('General Availability');
    expect(text).toContain('Each is a proposed initiative');
    expect(text).not.toContain('v1.0.0 GA');
    expect(text).not.toContain('official QuantsMind GitHub');
  });

  it('derives the spotlight status from the product registry', () => {
    expect(component.quantumMission).toHaveLength(10);
    for (const app of component.quantumMission) {
      expect(app.maturity).toBe('released');
      expect(app.availability).toBe('general-availability');
    }
    expect(component.quantumMissionMaturityLabel).toBe('Released');
    expect(component.quantumMissionAvailabilityLabel).toBe('General Availability');
  });

  it('derives the portfolio counts from the registry', () => {
    const metric = component.trustMetrics.find(item => item.label === 'portfolio initiatives');
    expect(metric?.value).toBe(41);
    expect(component.portfolioProductCount).toBe(41);

    const heroCounts = [...fixture.nativeElement.querySelectorAll('.home-hero__panel-foot strong')]
      .map((element: HTMLElement) => element.textContent?.trim());
    expect(heroCounts).toEqual(['06', '05', '03']);
  });

  it('communicates the approved business positioning', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('TECHNOLOGY ENGINEERING & INNOVATION');
    expect(text).toContain('business-critical systems');
    expect(text).toContain('independent technology engineering and innovation company');
    expect(text).toContain('advanced engineering services, proprietary software');
    expect(text).toContain('Built for technology companies, product startups, growing SMEs');
  });

  it('presents all five technology portfolios with registry counts', () => {
    expect(component.portfolioCards.map(card => card.id)).toEqual([
      'standalone', 'quantum', 'space', 'cybersecurity', 'developer-tools'
    ]);
    expect(component.portfolioCards.map(card => card.count)).toEqual([11, 11, 8, 10, 1]);

    const cards = [...fixture.nativeElement.querySelectorAll('.portfolio-card')] as HTMLElement[];
    expect(cards.length).toBe(5);

    const hrefs = cards.map(card => card.getAttribute('href') ?? '');
    expect(hrefs).toContain('/products#standalone-software');
    expect(hrefs).toContain('/products#quantum-software');
    expect(hrefs).toContain('/products#space-software');
    expect(hrefs).toContain('/products#cybersecurity-software');
    expect(hrefs).toContain('/products#developer-tools');
  });

  it('does not present the registry as commercially available', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('inclusion in a portfolio');
    expect(text).toContain('is not a claim that it is released, purchasable or commercially deployed');
    expect(text).toContain('Most registry entries are proposed, in development or research prototypes');
  });

  it('introduces no GitHub repository links on the homepage', () => {
    const hrefs = [...fixture.nativeElement.querySelectorAll('a')]
      .map((element: HTMLAnchorElement) => element.getAttribute('href') ?? '');
    expect(hrefs.some(href => href.includes('github.com'))).toBe(false);
  });

  it('uses the canonical QuantsMind SDK name', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(component.ecosystem.map(tech => tech.name)).toContain('QuantsMind SDK');
    expect(text).toContain('QuantsMind SDK');
    expect(text).not.toContain('QuantsMind Quantum SDK');
  });
});
