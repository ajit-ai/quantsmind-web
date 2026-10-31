import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QuantumMissionComponent } from './quantum-mission.component';

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

  it('keeps every application at released and general-availability maturity', () => {
    for (const app of component.applications) {
      expect(app.maturity).toBe('released');
      expect(app.availability).toBe('general-availability');
    }
    const cards = [...fixture.nativeElement.querySelectorAll('.application-card')];
    for (const card of cards) {
      expect(card.textContent).toContain('Released');
      expect(card.textContent).toContain('General Availability');
    }
  });

  it('does not invent documentation or download links for proposed applications', () => {
    const cardLinks = [...fixture.nativeElement.querySelectorAll('.application-card a')]
      .map((link: any) => link.getAttribute('href'));
    expect(cardLinks.every(href => href === '/contact')).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('GitHub releases');
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

  it('presents general availability without production or customer claims', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('General Availability');
    expect(text).not.toContain('production-ready application');
    expect(text).not.toContain('customer deployment');
  });
});
