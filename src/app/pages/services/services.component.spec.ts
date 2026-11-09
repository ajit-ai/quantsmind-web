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

  it('anchors the engagement model for the homepage framework link', () => {
    const anchor = fixture.nativeElement.querySelector('#engagement-models');
    expect(anchor).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.engagement-model')).toContain(anchor);
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

  it('keeps every service domain complete and actionable', () => {
    for (const service of component.services) {
      expect(service.title.trim()).not.toBe('');
      expect(service.short.trim()).not.toBe('');
      expect(service.problem.trim()).not.toBe('');
      expect(service.provides.length).toBeGreaterThan(0);
      expect(service.deliverables.length).toBeGreaterThan(0);
      expect(service.context.trim()).not.toBe('');
      expect(service.outcome.trim()).not.toBe('');
    }
  });

  it('positions agentic AI within AI Engineering service, not as a seventh domain', () => {
    const aiService = component.services.find(s => s.id === 'ai-intelligent-systems');
    expect(aiService).toBeTruthy();

    if (aiService) {
      const providesText = aiService.provides.join(' ');
      expect(providesText).toContain('Agentic AI architecture and workflow design');
      expect(providesText).toContain('Human-in-the-loop workflows and controlled automation');

      const contextText = aiService.context;
      expect(contextText).toContain('engineering service, not a proprietary agent platform');
      expect(contextText).toContain('No fully autonomous, unsupervised');
      expect(contextText).toContain('human oversight');

      const deliverablesText = aiService.deliverables.join(' ');
      expect(deliverablesText).toContain('Agentic workflow designs with human oversight points');
      expect(deliverablesText).toContain('Controlled automation workflows with permission boundaries');
    }
  });

  it('includes RAG and enterprise knowledge systems in AI service', () => {
    const aiService = component.services.find(s => s.id === 'ai-intelligent-systems');
    expect(aiService).toBeTruthy();

    if (aiService) {
      const providesText = aiService.provides.join(' ');
      expect(providesText).toContain('Retrieval-Augmented Generation');
      expect(providesText).toContain('enterprise knowledge systems');

      const deliverablesText = aiService.deliverables.join(' ');
      expect(deliverablesText).toContain('RAG and knowledge system prototypes');
    }
  });

  it('includes enterprise AI integration in AI service', () => {
    const aiService = component.services.find(s => s.id === 'ai-intelligent-systems');
    expect(aiService).toBeTruthy();

    if (aiService) {
      const providesText = aiService.provides.join(' ');
      expect(providesText).toContain('Enterprise AI integration and workflow automation');
      expect(providesText).toContain('Integration of AI systems with APIs, enterprise applications and data platforms');
    }
  });

  it('distinguishes AI Engineering service from AIGuard product', () => {
    const aiService = component.services.find(s => s.id === 'ai-intelligent-systems');
    expect(aiService).toBeTruthy();

    if (aiService) {
      const contextText = aiService.context;
      expect(contextText).toContain('AIGuard is a separate proposed product for AI security assessment');
      expect(contextText).toContain('not a general-purpose AI engineering platform');
      expect(contextText).toContain('complete agent orchestration system');
    }
  });

  it('does not promote developer tools to a seventh service domain', () => {
    expect(component.services).toHaveLength(6);
    expect(component.services.some(service =>
      /Programming Languages|Developer Tools/.test(service.title)
    )).toBe(false);
  });
});
