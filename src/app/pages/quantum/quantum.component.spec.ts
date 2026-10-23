import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect, beforeEach, beforeAll } from 'vitest';

import { QuantumComponent } from './quantum.component';
import { routes } from '../../app.routes';
import { SITE_URL } from '../../core/route-meta.service';
import { ServicesComponent } from '../services/services.component';
import { QmHeaderComponent } from '../../layout/header/header.component';

const quantumRoute = () => routes.find(r => r.path === 'quantum')!;
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});



describe('quantum route configuration', () => {
  it('declares a /quantum route', () => {
    expect(routes.some(r => r.path === 'quantum')).toBe(true);
  });

  it('lazy-loads the QuantumComponent', async () => {
    const route = quantumRoute();
    expect(typeof route.loadComponent).toBe('function');
    const loaded = await route.loadComponent!();
    expect(loaded).toBeTruthy();
  });

  it('carries SEO title and description', () => {
    const route = quantumRoute();
    expect(route.data?.['title']).toBe('Quantum Computing Engineering — QuantsMind');
    expect(String(route.data?.['description'])).toContain('quantum');
  });
});

describe('QuantumComponent page', () => {
  let fixture: ComponentFixture<QuantumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(QuantumComponent);
    fixture.detectChanges();
  });

  it('renders the page heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Quantum Computing Engineering');
  });

  it('renders the major sections', () => {
    const headings = Array.from(fixture.nativeElement.querySelectorAll('h2')).map(
      (h: any) => h.textContent.trim()
    );
    expect(headings).toContain('Engineering Capabilities');
    expect(headings).toContain('Engagement Approach');
    expect(headings).toContain('Technology Connections');
  });

  it('renders six capability cards', () => {
    expect(fixture.nativeElement.querySelectorAll('.q-cap-card').length).toBe(6);
  });

  it('renders five engagement steps', () => {
    expect(fixture.nativeElement.querySelectorAll('.q-step').length).toBe(5);
  });
});
describe('QuantumComponent details', () => {
  let fixture: ComponentFixture<QuantumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantumComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(QuantumComponent);
    fixture.detectChanges();
  });

  it('has a primary CTA linking to /contact', () => {
    const links = Array.from(fixture.nativeElement.querySelectorAll('a')) as any[];
    const cta = links.find(l =>
      l.textContent.trim() === 'Discuss a Quantum Project'
    );
    expect(cta).toBeTruthy();
  });

  it('links to MicroQuantum', () => {
    const links = Array.from(fixture.nativeElement.querySelectorAll('a')) as any[];
    const mq = links.find(l => l.textContent.includes('MicroQuantum') || l.getAttribute('ng-reflect-router-link') === '/microquantum');
    expect(mq).toBeTruthy();
  });

  it('links to the QuantsMind SDK', () => {
    const links = Array.from(fixture.nativeElement.querySelectorAll('a')) as any[];
    const sdk = links.find(l => l.textContent.includes('QuantsMind SDK') || l.getAttribute('ng-reflect-router-link') === '/quantsmind-sdk');
    expect(sdk).toBeTruthy();
  });

  it('labels the Bloch sphere as schematic', () => {
    const svg = fixture.nativeElement.querySelector('svg.q-bloch');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('aria-label')).toContain('Schematic');
    const caption = fixture.nativeElement.querySelector('.q-visual-caption');
    expect(caption.textContent).toContain('schematic');
  });
});

describe('quantum navigation integration', () => {
  it('services quantum detail panel links to /quantum', async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [provideRouter([{ path: '**', component: ServicesComponent }])]
    }).compileComponents();
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    await router.navigateByUrl('/services#quantum-computing');
    fixture.detectChanges();
    const link = (Array.from(fixture.nativeElement.querySelectorAll('a')) as any[]).find(a =>
      a.textContent.includes('Explore Quantum Computing Services')
    );
    expect(link).toBeTruthy();
  });

  it('header search index includes the quantum page', async () => {
    await TestBed.configureTestingModule({
      imports: [QmHeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    const fixture = TestBed.createComponent(QmHeaderComponent);
    const header = fixture.componentInstance;
    const entries = (header as any).searchIndex as any[];
    const quantumPage = entries.find(e => e.href === '/quantum');
    expect(quantumPage).toBeTruthy();
    expect(quantumPage.title).toBe('Quantum Computing');
  });

  it('header mega menu includes quantum computing under services', async () => {
    await TestBed.configureTestingModule({
      imports: [QmHeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    const fixture = TestBed.createComponent(QmHeaderComponent);
    const header = fixture.componentInstance;
    const services = ((header as any).navItems as any[]).find(n => n.label === 'Services');
    const quantum = services.children.find((c: any) => c.label === 'Quantum Computing');
    expect(quantum).toBeTruthy();
    expect(quantum.href).toBe('/quantum');
  });
});

describe('quantum sitemap entry', () => {
  const sitemap = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

  it('lists /quantum/ in the sitemap', () => {
    expect(urls).toContain(`${SITE_URL}/quantum/`);
  });
});
