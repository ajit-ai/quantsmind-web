import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ServicesComponent } from './services.component';

const SERVICE_IDS = [
  'quantum-computing',
  'space-systems',
  'ai-intelligent-systems',
  'scientific-computing',
  'cybersecurity-digital-trust',
  'industrial-intelligence-digital-twin'
] as const;

const APPROVED_SERVICE_TITLES = [
  'Quantum Computing & Quantum Software Engineering',
  'Space Systems & Mission Software Engineering',
  'AI Engineering & Autonomous Intelligent Systems',
  'Scientific Computing & Digital Simulation',
  'Cybersecurity Engineering & Digital Trust',
  'Industrial Intelligence & Digital Twin Engineering'
] as const;

describe('ServicesComponent', () => {
  let fixture: ComponentFixture<ServicesComponent>;
  let component: ServicesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [provideRouter([{ path: '**', component: ServicesComponent }])]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('presents exactly the six approved services in order', () => {
    expect(component.services.map(service => service.id)).toEqual([...SERVICE_IDS]);
    expect(component.services.map(service => service.title)).toEqual([...APPROVED_SERVICE_TITLES]);
  });

  it('renders all six services as anchored sections', () => {
    const sections = fixture.nativeElement.querySelectorAll('section.service');
    expect(sections.length).toBe(6);

    for (const id of SERVICE_IDS) {
      const section = fixture.nativeElement.querySelector(`section.service#${id}`);
      expect(section, `missing anchored section for ${id}`).toBeTruthy();
    }
  });

  it('keeps the legacy software-architecture anchor', () => {
    const legacy = fixture.nativeElement.querySelector('#software-architecture');
    expect(legacy).toBeTruthy();
  });

  it('renders the capability, deliverable, context and outcome content', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('What we provide');
    expect(text).toContain('Practical deliverables');
    expect(text).toContain('Technology & capability context');
    expect(text).toContain('Outcome.');
    expect(text).toContain('Typical problem.');

    for (const title of APPROVED_SERVICE_TITLES) {
      expect(text).toContain(title);
    }
    expect(text).not.toContain('Software & System Architecture');
  });

  it('renders a category navigation entry for every service', () => {
    const links = [...fixture.nativeElement.querySelectorAll('.service-nav__link')];
    expect(links.length).toBe(6);
    for (const id of SERVICE_IDS) {
      expect(links.some(link => (link.getAttribute('href') ?? '').includes(`#${id}`))).toBe(true);
    }
  });

  it('associates products and technologies without duplicating product data', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('MicroQuantum');
    expect(text).toContain('Related QuantsMind technologies');
    expect(text).toContain('Related QuantsMind quantum software');
    expect(text).toContain('Related QuantsMind space software');
    expect(text).toContain('Related QuantsMind cybersecurity software');
  });

  it('links the quantum service to the dedicated Quantum Mission page', () => {
    const link = fixture.nativeElement.querySelector('a.service__extra-link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/quantum-mission');
    expect(link.textContent).toContain('Quantum Mission');
  });

  it('offers a clear next action for every service', () => {
    const ctas = fixture.nativeElement.querySelectorAll('.service__cta qm-button');
    expect(ctas.length).toBe(12);
  });

  it('does not use the retired tab UI', () => {
    expect(fixture.nativeElement.querySelector('.svc-tab')).toBeNull();
    expect(fixture.nativeElement.querySelector('.svc-detail')).toBeNull();
  });
});
