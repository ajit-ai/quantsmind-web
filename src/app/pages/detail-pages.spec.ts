import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';

import { routes } from '../app.routes';
import { SERVICE_AREAS } from '../content/services/service.registry';
import { TECHNOLOGY_PORTFOLIOS } from '../content/technology/portfolios';
import { ServiceDetailComponent } from './services/service-detail.component';
import { TechnologyPortfolioComponent } from './technology/technology-portfolio.component';

const SLUG_TO_SERVICE_ID: Readonly<Record<string, string>> = {
  'quantum-computing': 'quantum-computing',
  'space-systems': 'space-systems',
  'ai-engineering': 'ai-intelligent-systems',
  'scientific-computing': 'scientific-computing',
  'cybersecurity': 'cybersecurity-digital-trust',
  'industrial-intelligence': 'industrial-intelligence-digital-twin'
};

const SERVICE_DETAIL_ROUTES = routes.filter(
  route => typeof route.path === 'string' && route.path.startsWith('services/') && route.path !== 'services'
);

const PORTFOLIO_ROUTES = routes.filter(
  route => typeof route.path === 'string' && route.path.startsWith('technology/') && route.path !== 'technology'
);

describe('detail route integrity', () => {
  it('declares exactly six service detail routes with resolvable data slugs', () => {
    expect(SERVICE_DETAIL_ROUTES.length).toBe(6);
    for (const route of SERVICE_DETAIL_ROUTES) {
      const slug = (route.data as Record<string, unknown> | undefined)?.['service'] as string;
      expect(slug, `missing data.service on ${route.path}`).toBeTruthy();
      const id = SLUG_TO_SERVICE_ID[slug] ?? slug;
      expect(SERVICE_AREAS.some(area => area.id === id), `no registry entry for ${slug}`).toBe(true);
    }
  });

  it('declares exactly six technology portfolio routes with resolvable data slugs', () => {
    expect(PORTFOLIO_ROUTES.length).toBe(6);
    for (const route of PORTFOLIO_ROUTES) {
      const slug = (route.data as Record<string, unknown> | undefined)?.['portfolio'] as string;
      expect(slug, `missing data.portfolio on ${route.path}`).toBeTruthy();
      expect(TECHNOLOGY_PORTFOLIOS.some(p => p.slug === slug), `no registry entry for ${slug}`).toBe(true);
    }
  });
});

describe('service detail pages render their registry entry (no fall-through to not-found)', () => {
  for (const route of SERVICE_DETAIL_ROUTES) {
    const slug = (route.data as Record<string, unknown>)['service'] as string;
    const id = SLUG_TO_SERVICE_ID[slug] ?? slug;
    const entry = SERVICE_AREAS.find(area => area.id === id)!;

    it(`renders the ${entry.title} page`, async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceDetailComponent],
        providers: [
          provideRouter([]),
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({}),
                data: { service: slug },
                queryParamMap: convertToParamMap({})
              }
            }
          }
        ]
      }).compileComponents();

      const fixture = TestBed.createComponent(ServiceDetailComponent);
      fixture.detectChanges();
      const text = fixture.nativeElement.textContent as string;

      expect(text).toContain(entry.title);
      expect(text).not.toContain('SERVICE NOT FOUND');
      expect(text).toContain('Scope of services');
      expect(text).toContain('Expected deliverables');
      expect(text).toContain('How the work engages');
      expect(text).toContain(entry.problem.slice(0, 40));
    });
  }
});

describe('technology portfolio pages render their registry entry (no fall-through to not-found)', () => {
  for (const portfolio of TECHNOLOGY_PORTFOLIOS) {
    it(`renders the ${portfolio.title} page`, async () => {
      await TestBed.configureTestingModule({
        imports: [TechnologyPortfolioComponent],
        providers: [
          provideRouter([]),
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({}),
                data: { portfolio: portfolio.slug },
                queryParamMap: convertToParamMap({})
              }
            }
          }
        ]
      }).compileComponents();

      const fixture = TestBed.createComponent(TechnologyPortfolioComponent);
      fixture.detectChanges();
      const text = fixture.nativeElement.textContent as string;

      expect(text).toContain(portfolio.title);
      expect(text).not.toContain('PORTFOLIO NOT FOUND');
      expect(text).toContain('Technical foundations');
      expect(text).toContain('Architecture & design approach');
      expect(text).toContain('Research boundaries');
      expect(text).toContain(portfolio.purpose.slice(0, 40));
    });
  }
});
