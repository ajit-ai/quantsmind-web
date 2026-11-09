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
    ['Cybersecurity', '/services#cybersecurity-digital-trust'],
    ['Space Systems', '/services#space-systems'],
    ['Quantum Computing', '/services#quantum-computing'],
    ['AI Engineering', '/services#ai-intelligent-systems'],
    ['Scientific Computing', '/services#scientific-computing'],
    ['Industrial Intelligence', '/services#industrial-intelligence-digital-twin']
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

  it('keeps six top-level destinations and a separate Contact CTA', () => {
    expect(component.navItems.map(item => item.label)).toEqual([
      'Home', 'Business Solutions', 'Products & Technology', 'Research & Innovation', 'About', 'Insights'
    ]);
  });

  it('exposes Contact as a persistent header action', () => {
    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();
    const cta = fixture.nativeElement.querySelector('.qm-header__cta') as HTMLElement;
    expect(cta.textContent).toContain('Contact QuantsMind');
    expect(component.searchIndex.some(entry => entry.href === '/contact')).toBe(true);
  });

  it('keeps Quantum Mission and the technology ecosystem in the products menu', () => {
    const products = component.navItems.find(item => item.label === 'Products & Technology');
    expect(products?.children?.some(child => child.label === 'Quantum Mission'
      && child.href === '/quantum-mission')).toBe(true);
    expect(products?.children?.some(child => child.label === 'Quantum Software'
      && child.href === '/products#quantum-software')).toBe(false);
    expect(products?.children?.some(child => child.label === 'Technology Ecosystem'
      && child.href === '/technology')).toBe(true);
    expect(products?.children?.length).toBe(5);
  });

  it('groups Labs and the technology ecosystem under Research & Innovation', () => {
    const research = component.navItems.find(item => item.label === 'Research & Innovation');
    expect(research?.href).toBe('/labs');
    expect(research?.children?.map(child => child.href)).toEqual(['/labs', '/technology']);
  });

  it('renders the desktop navigation without a seventh top-level item', () => {
    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();
    const labels = [...fixture.nativeElement.querySelectorAll('.qm-header__nav-link')]
      .map((element: HTMLElement) => element.textContent?.replace(/\s+/g, ' ').trim() ?? '');
    expect(labels).toEqual([
      'Home', 'Business Solutions', 'Products & Technology', 'Research & Innovation',
      'About', 'Insights'
    ]);
    const cta = fixture.nativeElement.querySelector('.qm-header__cta a') as HTMLAnchorElement;
    expect(cta.textContent).toContain('Contact QuantsMind');
    expect(cta.getAttribute('href')).toBe('/contact');
  });

  it('opens the Research & Innovation mega menu with both destinations', () => {
    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();
    fixture.componentInstance.openMega('Research & Innovation');
    fixture.detectChanges();

    const links = [...fixture.nativeElement.querySelectorAll('.qm-mega__grid a')]
      .map((element: HTMLAnchorElement) => element.getAttribute('href'));
    expect(links).toEqual(['/labs', '/technology']);
    expect(fixture.nativeElement.querySelector('.qm-mega__grid')?.textContent)
      .toContain('QuantsMind Labs');
  });

  it('shows the submenu and Contact action in the open mobile drawer', () => {
    const fixture = TestBed.createComponent(QmHeaderComponent);
    fixture.detectChanges();

    fixture.componentInstance.toggleMobile();
    fixture.detectChanges();
    const items = [...fixture.nativeElement.querySelectorAll('.qm-mobile-nav__link')]
      .map((element: HTMLElement) => element.textContent?.trim());
    expect(items).toEqual([
      'Home', 'Business Solutions', 'Products & Technology', 'Research & Innovation',
      'About', 'Insights'
    ]);

    fixture.componentInstance.toggleSub(new Event('click'), 'Research & Innovation');
    fixture.detectChanges();
    const openSub = fixture.nativeElement.querySelector('.qm-mobile-nav__sub--open') as HTMLElement;
    expect(openSub).toBeTruthy();
    const subLinks = [...openSub.querySelectorAll('a')].map((element: HTMLAnchorElement) => [
      element.textContent?.trim(), element.getAttribute('href')
    ]);
    expect(subLinks).toEqual([['QuantsMind Labs', '/labs'], ['Technology Ecosystem', '/technology']]);

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

  it('keeps the six business solution domains under Business Solutions', () => {
    const solutions = component.navItems.find(item => item.label === 'Business Solutions');
    expect(solutions?.href).toBe('/services');
    expect(solutions?.children?.map(child => child.href)).toEqual([
      '/quantum',
      '/services#space-systems',
      '/services#ai-intelligent-systems',
      '/services#scientific-computing',
      '/services#cybersecurity-digital-trust',
      '/services#industrial-intelligence-digital-twin'
    ]);
  });

  it('indexes the approved business page names', () => {
    const titlesByHref = new Map(component.searchIndex.map(entry => [entry.href, entry.title]));
    expect(titlesByHref.get('/services')).toBe('Business Solutions');
    expect(titlesByHref.get('/products')).toBe('Products & Technology');
    expect(titlesByHref.get('/technology')).toBe('Technology Ecosystem');
    expect(titlesByHref.get('/labs')).toBe('Research & Innovation');
    expect(titlesByHref.get('/blog')).toBe('Insights');
    expect(titlesByHref.get('/about')).toBe('About');
  });

  it('finds Quantum Mission at its dedicated route', () => {
    component.searchQuery.set('Quantum Mission');
    const results = component.searchResults();
    expect(results.some(result => result.href === '/quantum-mission')).toBe(true);
  });
});