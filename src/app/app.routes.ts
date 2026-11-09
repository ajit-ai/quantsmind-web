import { Routes } from '@angular/router';
import { blogArticleResolver } from './pages/blog/blog-article.resolver';

export const HOME_TITLE = 'QuantsMind | Technology Engineering & Innovation';
export const HOME_DESCRIPTION =
  'QuantsMind delivers advanced engineering services, proprietary software and research-driven technology solutions for businesses and enterprises.';

export const routes: Routes = [
  {
    path: '',
    data: { title: HOME_TITLE, description: HOME_DESCRIPTION },
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'services',
    data: {
      title: 'Business Solutions — QuantsMind',
      description:
        'Business solutions across six engineering domains: quantum computing and quantum software, space systems and mission software, AI engineering, scientific computing, cybersecurity and digital trust, and industrial intelligence and digital twins.'
    },
    loadComponent: () =>
      import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'products',
    data: {
      title: 'Products & Technology — QuantsMind',
      description:
        'A registry-driven portfolio of QuantsMind software products and proposed initiatives across standalone software, quantum computing, space systems, cybersecurity, and programming languages and developer tools. Maturity and availability are stated per product.'
    },
    loadComponent: () =>
      import('./pages/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'products/quantum-studio',
    data: {
      productId: 'quantum-studio',
      title: 'QuantumStudio | Products | QuantsMind',
      description:
        'QuantumStudio is a proposed quantum circuit development and experimentation environment for quantum software engineering. It is a proposed initiative, not a released or generally available product.'
    },
    loadComponent: () =>
      import('./shared/components/qm-product-detail/qm-product-detail.component')
        .then(m => m.QmProductDetailComponent)
  },
  {
    path: 'products/ground-link',
    data: {
      productId: 'ground-link',
      title: 'GroundLink | Products | QuantsMind',
      description:
        'GroundLink is a space systems software initiative for ground-station frame reception, validation, deduplication, continuity and routing. It is a space systems software initiative, not a released or generally available product.'
    },
    loadComponent: () =>
      import('./shared/components/qm-product-detail/qm-product-detail.component')
        .then(m => m.QmProductDetailComponent)
  },
  {
    path: 'products/ai-guard',
    data: {
      productId: 'ai-guard',
      title: 'AIGuard | Products | QuantsMind',
      description:
        'AIGuard is a proposed security assessment and control tooling for AI, LLM, and agent systems. It is a proposed initiative, not a released or generally available product.'
    },
    loadComponent: () =>
      import('./shared/components/qm-product-detail/qm-product-detail.component')
        .then(m => m.QmProductDetailComponent)
  },
  {
    path: 'products/qubit-sim',
    data: {
      productId: 'qubit-sim',
      title: 'QubitSim | Products | QuantsMind',
      description:
        'QubitSim is a quantum circuit and state simulation software for reproducible experimentation. It is a proposed initiative, not a released or generally available product.'
    },
    loadComponent: () =>
      import('./shared/components/qm-product-detail/qm-product-detail.component')
        .then(m => m.QmProductDetailComponent)
  },
  {
    path: 'products/threat-intel',
    data: {
      productId: 'threat-intel',
      title: 'ThreatIntel | Products | QuantsMind',
      description:
        'ThreatIntel is a proposed threat intelligence and indicator correlation software. It is a proposed initiative, not a released or generally available product.'
    },
    loadComponent: () =>
      import('./shared/components/qm-product-detail/qm-product-detail.component')
        .then(m => m.QmProductDetailComponent)
  },
  {
    path: 'products/telemetry-hub',
    data: {
      productId: 'telemetry-hub',
      title: 'TelemetryHub | Products | QuantsMind',
      description:
        'TelemetryHub is a space telemetry software for telemetry ingestion, distribution, bounded backpressure and journaling. It is a space systems software initiative, not a released or generally available product.'
    },
    loadComponent: () =>
      import('./shared/components/qm-product-detail/qm-product-detail.component')
        .then(m => m.QmProductDetailComponent)
  },
  {
    path: 'products/quantsmind-vscode-ai-coder',
    data: {
      productId: 'quantsmind-vscode-ai-coder',
      title: 'QuantsMind VSCode AI Coder | Products | QuantsMind',
      description:
        'QuantsMind VSCode AI Coder is an AI-powered coding assistance for Visual Studio Code, currently at Alpha maturity and listed in the Microsoft Visual Studio Marketplace. It is not a validated or released product.'
    },
    loadComponent: () =>
      import('./shared/components/qm-product-detail/qm-product-detail.component')
        .then(m => m.QmProductDetailComponent)
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
      title: 'Technology Ecosystem — QuantsMind',
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
      title: 'Research & Innovation — QuantsMind',
      description:
        'Research and innovation from QuantsMind Labs: open research code including vector search, open-source intelligence tooling and news-text classification experiments. Each project states its maturity and its limitations.'
    },
    loadComponent: () =>
      import('./pages/labs/labs.component').then(m => m.LabsComponent)
  },
  {
    path: 'blog',
    data: {
      title: 'Insights — QuantsMind',
      description:
        'Insights from QuantsMind: technical articles on the technology ecosystem, Labs research projects and products, covering architecture, release maturity and known limitations.'
    },
    loadComponent: () =>
      import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    resolve: { article: blogArticleResolver },
    loadComponent: () =>
      import('./pages/blog/article.component').then(m => m.BlogArticleComponent)
  },
  {
    path: 'about',
    data: {
      title: 'About — QuantsMind',
      description:
        'QuantsMind is an independent technology engineering and innovation company delivering advanced engineering services, proprietary software products and research-driven technology solutions for businesses and enterprises.'
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
      description: 'The terms that govern your use of the QuantsMind website.'
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
      description: 'The page you are looking for does not exist or has moved.'
    },
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
