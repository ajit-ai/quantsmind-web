import { Routes } from '@angular/router';

export const HOME_TITLE = 'QuantsMind | Engineering Software & Intelligent Technologies';
export const HOME_DESCRIPTION =
  'QuantsMind provides software engineering, AI/ML, cloud and technology consulting while developing an ecosystem of emerging software technologies.';

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
    path: 'services',
    data: {
      title: 'Services — QuantsMind',
      description:
        'Practical software engineering and technology consulting: software architecture, application development, AI/ML engineering, cloud engineering, DevOps & CI/CD, and technical consulting.'
    },
    loadComponent: () =>
      import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'technology',
    data: {
      title: 'Technology — QuantsMind',
      description:
        'The QuantsMind technology ecosystem: MicroQuantum, Karkain, and the QuantsMind SDK — software technologies designed, engineered and explored by QuantsMind.'
    },
    loadComponent: () =>
      import('./pages/technology/technology.component').then(m => m.TechnologyComponent)
  },
  {
    path: 'microquantum',
    data: {
      title: 'MicroQuantum | Quantum Computing SDK | QuantsMind',
      description:
        'MicroQuantum is an open Python SDK for building, executing and analyzing quantum programs. Explore the Developer Preview from QuantsMind.'
    },
    loadComponent: () =>
      import('./pages/microquantum/microquantum.component').then(m => m.MicroQuantumComponent)
  },
  {
    path: 'karkain',
    data: {
      title: 'Karkain | Programming Language & Computing Ecosystem | QuantsMind',
      description:
        'Karkain is an independently developed general-purpose programming language and computing ecosystem exploring modern compiler architecture, runtime systems and heterogeneous computing.'
    },
    loadComponent: () =>
      import('./pages/karkain/karkain.component').then(m => m.KarkainComponent)
  },
  {
    path: 'quantsmind-sdk',
    data: {
      title: 'QuantsMind SDK — General-Purpose Technology SDK | QuantsMind',
      description:
        'The QuantsMind SDK is a software foundation exploring reusable abstractions for intelligent computing, data and advanced technology applications. Development stage.'
    },
    loadComponent: () =>
      import('./pages/quantsmind-sdk/quantsmind-sdk.component').then(m => m.QuantsMindSdkComponent)
  },
  {
    path: 'labs',
    data: {
      title: 'Labs — QuantsMind',
      description:
        'QuantsMind Labs is where we explore emerging technologies, experimental architectures and new computing approaches — from AI and quantum computing to programming languages.'
    },
    loadComponent: () =>
      import('./pages/labs/labs.component').then(m => m.LabsComponent)
  },
  {
    path: 'about',
    data: {
      title: 'About — QuantsMind',
      description:
        'QuantsMind is an engineering and technology initiative focused on building practical software systems and exploring emerging technologies.'
    },
    loadComponent: () =>
      import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    data: {
      title: 'Contact — QuantsMind',
      description:
        'Have an engineering requirement, technology challenge or collaboration idea? Get in touch with QuantsMind.'
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