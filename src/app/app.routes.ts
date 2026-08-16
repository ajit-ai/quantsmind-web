import { Routes } from '@angular/router';

export const HOME_TITLE = 'QuantsMind — Technology Engineering for Complex Problems';
export const HOME_DESCRIPTION =
  'QuantsMind is a technology engineering company. Enterprise Software. Intelligent Systems. Advanced Computing.';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION
    },
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'what-we-build',
    data: {
      title: 'What We Build — QuantsMind',
      description:
        'Enterprise software, AI engineering, data platforms, cloud infrastructure, modernization, and advanced computing — engineered for complex problems.'
    },
    loadComponent: () =>
      import('./pages/what-we-build/what-we-build.component').then(m => m.WhatWeBuildComponent)
  },
  {
    path: 'engineering',
    data: {
      title: 'Engineering — QuantsMind',
      description:
        'Our engineering discipline: correctness, resilience, and delivery. The principles, architecture practices, and disciplines we apply to every build.'
    },
    loadComponent: () =>
      import('./pages/engineering/engineering.component').then(m => m.EngineeringComponent)
  },
  {
    path: 'industries',
    data: {
      title: 'Industries — QuantsMind',
      description:
        'We build technology for financial services, insurance, healthcare, manufacturing, energy, logistics, retail, and the public sector.'
    },
    loadComponent: () =>
      import('./pages/industries/industries.component').then(m => m.IndustriesComponent)
  },
  {
    path: 'technology',
    data: {
      title: 'Technology — QuantsMind',
      description:
        'AI, data, cloud, software, optimization, and quantum technology — the stack we bring to complex engineering problems.'
    },
    loadComponent: () =>
      import('./pages/technology/technology.component').then(m => m.TechnologyComponent)
  },
  {
    path: 'labs',
    data: {
      title: 'QuantsMind Labs — Research & Experimental Engineering',
      description:
        'Research and experimental engineering at QuantsMind: applied AI research, data platform research, optimization, and quantum computing.'
    },
    loadComponent: () =>
      import('./pages/labs/labs.component').then(m => m.LabsComponent)
  },
  {
    path: 'insights',
    data: {
      title: 'Insights — QuantsMind',
      description:
        'Long-form engineering thinking from QuantsMind on architecture, AI, data, cloud, optimization, and technology strategy.'
    },
    loadComponent: () =>
      import('./pages/insights/insights.component').then(m => m.InsightsComponent)
  },
  {
    path: 'insights/:slug',
    data: {
      title: 'Insights — QuantsMind',
      description:
        'Long-form engineering thinking from QuantsMind on architecture, AI, data, cloud, optimization, and technology strategy.'
    },
    loadComponent: () =>
      import('./pages/insights/article/article.component').then(m => m.InsightArticleComponent)
  },
  {
    path: 'about',
    data: {
      title: 'About — QuantsMind',
      description:
        'QuantsMind is a technology engineering company. Our mission, vision, principles, and culture.'
    },
    loadComponent: () =>
      import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    data: {
      title: 'Contact — QuantsMind',
      description:
        'Talk to QuantsMind about your next technology build. Tell us what you are solving and we will reply within two working days.'
    },
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  // Legal pages
  {
    path: 'privacy',
    data: {
      title: 'Privacy Policy — QuantsMind',
      description:
        'How QuantsMind collects, uses, and protects your information when you use our website.'
    },
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'terms',
    data: {
      title: 'Terms of Use — QuantsMind',
      description:
        'The terms that govern your use of the QuantsMind website.'
    },
    loadComponent: () =>
      import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'cookies',
    data: {
      title: 'Cookie Policy — QuantsMind',
      description:
        'How the QuantsMind website uses cookies and similar technologies.'
    },
    loadComponent: () =>
      import('./pages/cookies/cookies.component').then(m => m.CookiesComponent)
  },
  {
    path: '**',
    data: {
      title: 'Page Not Found — QuantsMind',
      description:
        'The page you are looking for does not exist or has moved.'
    },
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
