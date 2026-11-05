import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QuantumMissionComponent } from './quantum-mission.component';
import { maturityLabel, availabilityLabel } from '../../content/products/product.model';

const EXPECTED_APPLICATIONS = [
  'QuantumStudio',
  'QubitSim',
  'QuantumForge',
  'QOptima',
  'QuantumShield',
  'HybridQ',
  'QuantumBench',
  'QuantumChem',
  'QResource',
  'QuantumVerify'
] as const;

describe('QuantumMissionComponent', () => {
  let fixture: ComponentFixture<QuantumMissionComponent>;
  let component: QuantumMissionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumMissionComponent],
      providers: [provideRouter([{ path: '**', component: QuantumMissionComponent }])]
    }).compileComponents();
    fixture = TestBed.createComponent(QuantumMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('presents exactly the ten approved applications in order', () => {
    expect(component.applications.map(app => app.name)).toEqual([...EXPECTED_APPLICATIONS]);
    expect(component.applications.length).toBe(10);
  });

  it('excludes MicroQuantum from the application count', () => {
    expect(component.applications.some(app => app.id === 'microquantum')).toBe(false);
    expect(component.microquantum?.name).toBe('MicroQuantum');
  });

  it('renders ten application cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.application-card');
    expect(cards.length).toBe(10);
    const text = fixture.nativeElement.textContent as string;
    for (const name of EXPECTED_APPLICATIONS) {
      expect(text).toContain(name);
    }
  });

  it('keeps every application at proposed maturity and not available', () => {
    for (const app of component.applications) {
      expect(app.maturity).toBe('proposed');
      expect(app.availability).toBe('not-available');
    }
  });

  it('renders card status from the product registry', () => {
    const cards = [...fixture.nativeElement.querySelectorAll('.application-card')];
    expect(cards.length).toBe(component.applications.length);
    component.applications.forEach((app, index) => {
      expect(cards[index].textContent).toContain(maturityLabel(app.maturity));
      expect(cards[index].textContent).toContain(availabilityLabel(app.availability));
    });
  });

  it('does not claim general availability, public releases or published documentation', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).not.toContain('General Availability');
    expect(text).not.toContain('v1.0.0');
    expect(text).not.toContain('GitHub releases');
    expect(text).not.toContain('official QuantsMind GitHub');
    expect(text).toContain('No public repository, release or documentation is currently available');
    expect(text).toContain('10 applications');

    const cards = [...fixture.nativeElement.querySelectorAll('.application-card')];
    for (const card of cards) {
      expect(card.textContent).not.toContain('Public Download');
      expect(card.textContent).not.toContain('Public download');
    }
  });

  it('does not invent documentation or download links for proposed applications', () => {
    const cardLinks = [...fixture.nativeElement.querySelectorAll('.application-card a')]
      .map((link: any) => link.getAttribute('href'));
    expect(cardLinks.length).toBeGreaterThan(0);
    expect(cardLinks.every(href => href === '/contact')).toBe(true);
  });

  it('presents MicroQuantum as a separate published technology', () => {
    const callout = fixture.nativeElement.querySelector('.microquantum-callout');
    expect(callout).toBeTruthy();
    expect(callout.textContent).toContain('MicroQuantum is not part of the ten');
    expect(callout.textContent).toContain('Developer Preview');
    expect(callout.textContent).toContain('v1.1.0');
    const hrefs = [...callout.querySelectorAll('a')].map((link: any) => link.getAttribute('href'));
    expect(hrefs).toContain('/microquantum');
  });

  it('states the evidence boundary without production or customer claims', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('All ten applications are proposed initiatives at proposed maturity.');
    expect(text).toContain('None is generally available');
    expect(text).not.toContain('production-ready application');
    expect(text).not.toContain('customer deployment');
  });
});
