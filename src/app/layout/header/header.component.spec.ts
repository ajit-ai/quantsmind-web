import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QmHeaderComponent } from './header.component';

describe('QmHeaderComponent search', () => {
  let component: QmHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QmHeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(QmHeaderComponent);
    component = fixture.componentInstance;
  });

  const serviceCases: Array<[string, string]> = [
    ['Cybersecurity', '/services/cybersecurity'],
    ['Space Systems', '/services/space-systems'],
    ['Quantum Computing', '/services/quantum-computing'],
    ['AI Engineering', '/services/ai-engineering'],
    ['Scientific Computing', '/services/scientific-computing'],
    ['Industrial Intelligence', '/services/industrial-intelligence']
  ];

  for (const [query, expectedHref] of serviceCases) {
    it(`finds the ${query} service`, () => {
      component.searchQuery.set(query);
      const results = component.searchResults();
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(result => result.href === expectedHref)).toBe(true);
      expect(results.every(result => !result.href.includes('%23'))).toBe(true);
    });
  }

  const productCases = ['MicroQuantum', 'InvoicePilot', 'GroundLink', 'PrivacyCore'];

  for (const query of productCases) {
    it(`preserves product search for ${query}`, () => {
      component.searchQuery.set(query);
      const results = component.searchResults();
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(result => result.type === 'Product')).toBe(true);
    });
  }

  it('keeps the eight top-level destinations in the required order', () => {
    expect(component.navItems.map(item => item.label)).toEqual([
      'Home', 'Products', 'Services', 'Technology', 'Labs & Research', 'Insights', 'About', 'Contact'
    ]);
  });

  it('renders Products with the same styling as the other top-level destinations', () => {
    const products = component.navItems.find(item => item.label === 'Products') as (typeof component.navItems)[number] & { featured?: boolean };
    expect(products.featured).toBeUndefined();
    expect(component.navItems.every(item => !('featured' in item))).toBe(true);

    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();
    const links = [...fixture.nativeElement.querySelectorAll('.qm-header__nav-link')];
    expect(links.some(link => link.classList.contains('qm-header__nav-link--featured'))).toBe(false);
    for (const link of links) {
      expect(link.classList.contains('qm-header__nav-link--featured')).toBe(false);
    }
  });

  it('exposes Contact as a persistent header action', () => {
    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();
    const cta = fixture.nativeElement.querySelector('.qm-header__cta') as HTMLElement;
    expect(cta.textContent).toContain('Contact QuantsMind');
    expect(component.searchIndex.some(entry => entry.href === '/contact')).toBe(true);
  });

  it('keeps the Products menu focused on the store, releases, docs and support', () => {
    const products = component.navItems.find(item => item.label === 'Products');
    expect(products?.children?.map(child => child.href)).toEqual([
      '/products', '/products#available', '/products#in-development', '/releases', '/docs', '/support'
    ]);
    expect(products?.children?.length).toBe(6);
    expect(products?.children?.[0]?.label).toBe('Products Store');
  });

  it('groups Labs and Research as a top-level destination', () => {
    const labs = component.navItems.find(item => item.label === 'Labs & Research');
    expect(labs?.href).toBe('/labs');
    expect(labs?.children).toBeUndefined();
  });

  it('renders the desktop navigation with exactly the eight approved items', () => {
    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();
    const labels = [...fixture.nativeElement.querySelectorAll('.qm-header__nav-link')]
      .map((element: HTMLElement) => element.textContent?.replace(/\s+/g, ' ').trim() ?? '');
    expect(labels).toEqual([
      'Home', 'Products', 'Services', 'Technology', 'Labs & Research', 'Insights', 'About', 'Contact'
    ]);
    const cta = fixture.nativeElement.querySelector('.qm-header__cta a') as HTMLAnchorElement;
    expect(cta.textContent).toContain('Contact QuantsMind');
    expect(cta.getAttribute('href')).toBe('/contact');
  });

  it('opens the Technology mega menu with all six portfolios', () => {
    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();
    fixture.componentInstance.openMega('Technology');
    fixture.detectChanges();

    const links = [...fixture.nativeElement.querySelectorAll('.qm-mega__grid a')]
      .map((element: HTMLAnchorElement) => element.getAttribute('href'));
    expect(links).toEqual([
      '/technology/financial-intelligence',
      '/technology/enterprise-ai',
      '/technology/data-intelligence',
      '/technology/bio-intelligence',
      '/technology/aerospace-intelligence',
      '/technology/developer-tools'
    ]);
    expect(fixture.nativeElement.querySelector('.qm-mega__grid')?.textContent)
      .toContain('Financial Intelligence');
  });

  it('opens the Services mega menu with the six service destinations', () => {
    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();
    fixture.componentInstance.openMega('Services');
    fixture.detectChanges();

    const links = [...fixture.nativeElement.querySelectorAll('.qm-mega__grid a')]
      .map((element: HTMLAnchorElement) => element.getAttribute('href'));
    expect(links).toEqual([
      '/services/quantum-computing',
      '/services/space-systems',
      '/services/ai-engineering',
      '/services/scientific-computing',
      '/services/cybersecurity',
      '/services/industrial-intelligence'
    ]);
  });

  it('shows the eight items and submenus in the mobile drawer', () => {
    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();

    fixture.componentInstance.toggleMobile();
    fixture.detectChanges();
    const items = [...fixture.nativeElement.querySelectorAll('.qm-mobile-nav__link')]
      .map((element: HTMLElement) => element.textContent?.trim());
    expect(items).toEqual([
      'Home', 'Products', 'Services', 'Technology', 'Labs & Research', 'Insights', 'About', 'Contact'
    ]);

    fixture.componentInstance.toggleSub(new Event('click'), 'Technology');
    fixture.detectChanges();
    const openSub = fixture.nativeElement.querySelector('.qm-mobile-nav__sub--open') as HTMLElement;
    expect(openSub).toBeTruthy();
    const subLinks = [...openSub.querySelectorAll('a')].map((element: HTMLAnchorElement) => [
      element.textContent?.trim(), element.getAttribute('href')
    ]);
    expect(subLinks.length).toBe(6);
    expect(subLinks.map(pair => pair[1])).toEqual([
      '/technology/financial-intelligence',
      '/technology/enterprise-ai',
      '/technology/data-intelligence',
      '/technology/bio-intelligence',
      '/technology/aerospace-intelligence',
      '/technology/developer-tools'
    ]);

    const drawerCta = fixture.nativeElement.querySelector('.qm-mobile-nav__cta a') as HTMLAnchorElement;
    expect(drawerCta.textContent).toContain('Contact QuantsMind');
    expect(drawerCta.getAttribute('href')).toBe('/contact');

    fixture.componentInstance.closeMobile();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.qm-mobile-nav')).toBeNull();
  });

  it('keeps every navigation link internal to the site', () => {
    const hrefs = component.navItems.flatMap(item => [
      item.href,
      ...(item.children ?? []).map(child => child.href)
    ]);
    expect(hrefs.some(href => href.includes('github.com'))).toBe(false);
    expect(hrefs.some(href => href.startsWith('http://') || href.startsWith('https://'))).toBe(false);
    expect(component.searchIndex.every(entry => !entry.href.startsWith('http'))).toBe(true);
  });

  it('keeps the six service domains under Services with dedicated routes', () => {
    const services = component.navItems.find(item => item.label === 'Services');
    expect(services?.href).toBe('/services');
    expect(services?.children?.map(child => child.href)).toEqual([
      '/services/quantum-computing',
      '/services/space-systems',
      '/services/ai-engineering',
      '/services/scientific-computing',
      '/services/cybersecurity',
      '/services/industrial-intelligence'
    ]);
  });

  it('indexes the approved page names', () => {
    const titlesByHref = new Map(component.searchIndex.map(entry => [entry.href, entry.title]));
    expect(titlesByHref.get('/services')).toBe('Services');
    expect(titlesByHref.get('/products')).toBe('Products Store');
    expect(titlesByHref.get('/technology')).toBe('Technology');
    expect(titlesByHref.get('/labs')).toBe('Labs & Research');
    expect(titlesByHref.get('/insights')).toBe('Insights');
    expect(titlesByHref.get('/about')).toBe('About');
    expect(titlesByHref.get('/releases')).toBe('Release Information');
    expect(titlesByHref.get('/docs')).toBe('Documentation');
    expect(titlesByHref.get('/support')).toBe('Product Support');
    expect(titlesByHref.get('/licensing')).toBe('Licensing');
  });

  it('finds Quantum Mission at its dedicated route', () => {
    component.searchQuery.set('Quantum Mission');
    const results = component.searchResults();
    expect(results.some(result => result.href === '/quantum-mission')).toBe(true);
  });
});