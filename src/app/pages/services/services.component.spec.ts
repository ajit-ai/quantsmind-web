import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

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

const DEFAULT_TAB = 'quantum-computing';
const LEGACY_SERVICE_ID = 'software-architecture';
const LEGACY_TARGET_ID = 'industrial-intelligence-digital-twin';

describe('ServicesComponent fragment routing', () => {
  let fixture: ComponentFixture<ServicesComponent>;
  let component: ServicesComponent;
  let router: Router;

  beforeAll(() => {
    // jsdom does not implement scrollIntoView, which the component calls after
    // a fragment activates a tab. Stub it so the scroll path does not throw.
    Element.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [provideRouter([{ path: '**', component: ServicesComponent }])]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('defaults to the first approved service tab with no fragment', () => {
    expect(component.activeTab).toBe(DEFAULT_TAB);
  });

  it('presents exactly the six approved services in order', () => {
    expect(component.services.map(service => service.id)).toEqual([...SERVICE_IDS]);
    expect(component.services.map(service => service.title)).toEqual([...APPROVED_SERVICE_TITLES]);
  });

  it('maps the legacy software-architecture fragment to Industrial Intelligence', async () => {
    await router.navigateByUrl(`/services#${LEGACY_SERVICE_ID}`);
    fixture.detectChanges();

    expect(component.activeTab).toBe(LEGACY_TARGET_ID);
  });

  it.each(SERVICE_IDS)('activates the %s tab from the URL fragment', async id => {
    await router.navigateByUrl(`/services#${id}`);
    fixture.detectChanges();

    expect(component.activeTab).toBe(id);
  });

  it('falls back to the default tab for an unrecognised fragment', async () => {
    await router.navigateByUrl('/services#not-a-service');
    fixture.detectChanges();

    expect(component.activeTab).toBe(DEFAULT_TAB);
  });

  it('renders the panel for the active tab only', async () => {
    await router.navigateByUrl('/services#scientific-computing');
    fixture.detectChanges();

    const panels = fixture.nativeElement.querySelectorAll('.svc-detail');
    expect(panels.length).toBe(1);

    const pressed = fixture.nativeElement.querySelectorAll('.svc-tab[aria-pressed="true"]');
    expect(pressed.length).toBe(1);
    expect(pressed[0].querySelector('.svc-tab__label').textContent.trim()).toBe('Scientific Computing & Digital Simulation');
  });

  it('keeps selectTab working after a fragment has activated a tab', async () => {
    await router.navigateByUrl('/services#ai-intelligent-systems');
    fixture.detectChanges();
    expect(component.activeTab).toBe('ai-intelligent-systems');

    component.selectTab('scientific-computing');
    fixture.detectChanges();

    expect(component.activeTab).toBe('scientific-computing');
  });

  it('writes the selected tab back into the URL', async () => {
    await router.navigateByUrl('/services');
    fixture.detectChanges();

    component.selectTab('space-systems');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/services#space-systems');
  });
});

describe('ServicesComponent illustrations', () => {
  let fixture: ComponentFixture<ServicesComponent>;
  let component: ServicesComponent;

  beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [provideRouter([{ path: '**', component: ServicesComponent }])]
    }).compileComponents();
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders an illustration in the selected service detail panel', () => {
    const ill = fixture.nativeElement.querySelector('.svc-detail__illustration');
    expect(ill).toBeTruthy();
    expect(ill.getAttribute('aria-hidden')).toBe('true');
    expect(ill.querySelector('svg.svc-illustration')).toBeTruthy();
  });

  it('renders an illustration for every service', () => {
    for (const id of SERVICE_IDS) {
      component.selectTab(id);
      fixture.detectChanges();
      const ill = fixture.nativeElement.querySelector('.svc-detail__illustration svg.svc-illustration');
      expect(ill, `missing illustration for ${id}`).toBeTruthy();
    }
  });

  it('keeps the Quantum Computing exploration link', () => {
    component.selectTab('quantum-computing');
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a.svc-detail__explore-link');
    expect(link).toBeTruthy();
    expect(link.textContent).toContain('Explore Quantum Computing Services');
  });

  it('preserves service content and headings', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('What we provide');
    expect(text).toContain('Practical deliverables');
    expect(text).toContain('Technology & capability context');
    expect(text).toContain('Outcome.');
    for (const title of APPROVED_SERVICE_TITLES) {
      expect(text).toContain(title);
    }
    expect(text).not.toContain('Software & System Architecture');
  });

  it('exposes accessible tab semantics', () => {
    const tabs = fixture.nativeElement.querySelectorAll('.svc-tab');
    expect(tabs.length).toBe(6);
    const pressed = fixture.nativeElement.querySelectorAll('.svc-tab[aria-pressed="true"]');
    expect(pressed.length).toBe(1);
  });
});
