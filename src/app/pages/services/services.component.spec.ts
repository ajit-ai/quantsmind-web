import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { ServicesComponent } from './services.component';

const SERVICE_IDS = [
  'software-architecture',
  'application-development',
  'ai-ml-engineering',
  'cloud-engineering',
  'devops-ci-cd',
  'technical-consulting'
] as const;

const DEFAULT_TAB = 'software-architecture';

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

  it('defaults to the software-architecture tab with no fragment', () => {
    expect(component.activeTab).toBe(DEFAULT_TAB);
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
    await router.navigateByUrl('/services#cloud-engineering');
    fixture.detectChanges();

    const panels = fixture.nativeElement.querySelectorAll('.svc-detail');
    expect(panels.length).toBe(1);

    const pressed = fixture.nativeElement.querySelectorAll('.svc-tab[aria-pressed="true"]');
    expect(pressed.length).toBe(1);
    expect(pressed[0].querySelector('.svc-tab__label').textContent.trim()).toBe('Cloud Engineering');
  });

  it('keeps selectTab working after a fragment has activated a tab', async () => {
    await router.navigateByUrl('/services#ai-ml-engineering');
    fixture.detectChanges();
    expect(component.activeTab).toBe('ai-ml-engineering');

    component.selectTab('devops-ci-cd');
    fixture.detectChanges();

    expect(component.activeTab).toBe('devops-ci-cd');
  });

  it('writes the selected tab back into the URL', async () => {
    await router.navigateByUrl('/services');
    fixture.detectChanges();

    component.selectTab('technical-consulting');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/services#technical-consulting');
  });
});
