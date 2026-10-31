import { Routes } from '@angular/router';
import { blogArticleResolver } from './pages/blog/blog-article.resolver';

export const HOME_TITLE = 'QuantsMind | Engineering Software & Intelligent Technologies';
export const HOME_DESCRIPTION =
  'QuantsMind engineers software products, intelligent systems and advanced technology solutions across quantum computing, AI, space systems, scientific computing, cybersecurity and industrial intelligence.';

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
      title: 'Engineering Services — QuantsMind',
      description:
        'Six engineering service areas: quantum computing and quantum software, space systems and mission software, AI engineering, scientific computing, cybersecurity and digital trust, and industrial intelligence and digital twins.'
    },
    loadComponent: () =>
      import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'products',
    data: {
      title: 'Products & Applications — QuantsMind',
      description:
        'A registry-driven portfolio of QuantsMind software products and proposed initiatives across standalone software, quantum computing, space systems, and cybersecurity. Maturity and availability are stated per product.'
    },
    loadComponent: () =>
      import('./pages/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'quantum-mission',
    data: {
      title: 'Quantum Mission | Proposed Quantum Software Applications | QuantsMind',
      description:
        'Quantum Mission is a portfolio of ten independent proposed quantum software applications exploring circuit development, simulation, optimisation, verification and hybrid workflows. All are proposed and not available.'
    },
    loadComponent: () =>
      import('./pages/quantum-mission/quantum-mission.component').then(m => m.QuantumMissionComponent)
  },
  {
    path: 'technology',
    data: {
      title: 'Technologies We Develop — QuantsMind',
      description:
        'The technologies QuantsMind develops: Karkain, MicroQuantum and the QuantsMind SDK, each with verified capabilities, language details, version, maturity and documentation, plus the wider engineering ecosystem.'
    },
    loadComponent: () =>
      import('./pages/technology/technology.component').then(m => m.TechnologyComponent)
  },
  {
    path: 'microquantum',
    data: {
      title: 'MicroQuantum | Quantum Computing SDK | QuantsMind',
      description:
        'MicroQuantum is an open, NumPy-only Python SDK for building, executing and analyzing quantum programs, published on PyPI at version 1.1.0. A developer preview: execution is by simulation.'
    },
    loadComponent: () =>
      import('./pages/microquantum/microquantum.component').then(m => m.MicroQuantumComponent)
  },
  {
    path: 'karkain',
    data: {
      title: 'Karkain | Programming Language & Computing Ecosystem | QuantsMind',
      description:
        'Karkain is an independently developed, statically typed systems programming language with a self-hosted compiler, published at version 1.1.0. A developer preview: the language and API surface may still change.'
    },
    loadComponent: () =>
      import('./pages/karkain/karkain.component').then(m => m.KarkainComponent)
  },
  {
    path: 'quantsmind-sdk',
    data: {
      title: 'QuantsMind SDK | QuantsMind',
      description:
        'QuantsMind SDK is an open, vendor-independent Python SDK for scientific computing, published on PyPI at version 1.1.0. A developer preview: module coverage and numerical accuracy vary by domain.'
    },
    loadComponent: () =>
      import('./pages/quantsmind-sdk/quantsmind-sdk.component').then(m => m.QuantsMindSdkComponent)
  },
  {
    path: 'labs',
    data: {
      title: 'QuantsMind Labs | Open Research Projects',
      description:
        'Open research code from QuantsMind Labs, including vector search, small language-model training, quantum algorithms and OSINT tooling. Each project states its maturity and its limitations.'
    },
    loadComponent: () =>
      import('./pages/labs/labs.component').then(m => m.LabsComponent)
  },
  {
    path: 'blog',
    data: {
      title: 'Articles — QuantsMind',
      description:
        'Technical articles on the QuantsMind technology ecosystem, Labs research projects and products, covering architecture, release maturity and known limitations.'
    },
    loadComponent: () =>
      import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    // Must follow 'blog' so the index route is matched first.
    path: 'blog/:slug',
    // The resolver supplies the article (and redirects unknown slugs to the
    // index) so the page and its metadata share a single source of truth.
    resolve: { article: blogArticleResolver },
    loadComponent: () =>
      import('./pages/blog/article.component').then(m => m.BlogArticleComponent)
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
  {
    path: 'quantum',
    data: {
      title: 'Quantum Computing Engineering — QuantsMind',
      description:
        'Quantum computing engineering services from QuantsMind: quantum software, algorithms, simulation, and hybrid classical–quantum workflows. Built on classical simulation; no quantum hardware access or quantum advantage is claimed.'
    },
    loadComponent: () =>
      import('./pages/quantum/quantum.component').then(m => m.QuantumComponent)
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