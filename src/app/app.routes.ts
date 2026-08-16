import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'what-we-build',
    loadComponent: () =>
      import('./pages/what-we-build/what-we-build.component').then(m => m.WhatWeBuildComponent)
  },
  {
    path: 'engineering',
    loadComponent: () =>
      import('./pages/engineering/engineering.component').then(m => m.EngineeringComponent)
  },
  {
    path: 'industries',
    loadComponent: () =>
      import('./pages/industries/industries.component').then(m => m.IndustriesComponent)
  },
  {
    path: 'technology',
    loadComponent: () =>
      import('./pages/technology/technology.component').then(m => m.TechnologyComponent)
  },
  {
    path: 'labs',
    loadComponent: () =>
      import('./pages/labs/labs.component').then(m => m.LabsComponent)
  },
  {
    path: 'insights',
    loadComponent: () =>
      import('./pages/insights/insights.component').then(m => m.InsightsComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  // Legal pages
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./pages/cookies/cookies.component').then(m => m.CookiesComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
