import { Routes } from '@angular/router';
import { blogArticleResolver } from './pages/blog/blog-article.resolver';

export const HOME_TITLE = 'QuantsMind | Technology Engineering & Innovation';
export const HOME_DESCRIPTION =
  'QuantsMind delivers advanced engineering services, proprietary software and research-driven technology solutions for businesses and enterprises.';

const PRODUCT_COUNTS_NOTE = 'Maturity and availability are stated per product.';

export const routes: Routes = [
  {
    path: '',
    data: { title: HOME_TITLE, description: HOME_DESCRIPTION },
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'products',
    data: {
      title: 'Products Store — QuantsMind',
      description:
        'The QuantsMind Products Store: verified, installable QuantsMind software. Available products first, development initiatives clearly separated, with versions, maturity and distribution links verified against public package indices and marketplaces.'
    },
    loadComponent: () =>
      import('./pages/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'products/category/:category',
    data: {
      title: 'Product Categories — QuantsMind Products Store',
      description:
        `Products grouped by category, with availability stated per entry. ${PRODUCT_COUNTS_NOTE}`
    },
    loadComponent: () =>
      import('./pages/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'products/:slug',
    data: {
      title: 'Product — QuantsMind Products Store',
      description:
        'Product detail: version, maturity, availability, installation or distribution, documentation, licence and limitations. Information is registry-driven.'
    },
    loadComponent: () =>
      import('./shared/components/qm-product-detail/qm-product-detail.component')
        .then(m => m.QmProductDetailComponent)
  },
  {
    path: 'services',
    data: {
      title: 'Services — QuantsMind',
      description:
        'Six engineering service domains: quantum computing, space systems, AI engineering, scientific computing, cybersecurity and digital trust, and industrial intelligence and digital twins. Scoped per customer problem.'
    },
    loadComponent: () =>
      import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'services/quantum-computing',
    data: {
      title: 'Quantum Computing & Quantum Software Engineering | Services | QuantsMind',
      description:
        'Quantum circuit software engineering, simulation, algorithm experimentation and hybrid quantum-classical workflows — with simulation limits and honesty statements included.'
    },
    loadComponent: () =>
      import('./pages/services/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'services/space-systems',
    data: {
      title: 'Space Systems & Mission Software Engineering | Services | QuantsMind',
      description:
        'Ground-segment software, telemetry processing, mission-support workflows and satellite engineering data — feasibility and software engineering, not flight qualification.'
    },
    loadComponent: () =>
      import('./pages/services/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'services/ai-engineering',
    data: {
      title: 'AI Engineering & Autonomous Intelligent Systems | Services | QuantsMind',
      description:
        'AI-enabled applications, agent integration, permission-aware tool use and enterprise AI — engineering with explicit human oversight and scoped claims.'
    },
    loadComponent: () =>
      import('./pages/services/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'services/scientific-computing',
    data: {
      title: 'Scientific Computing & Digital Simulation | Services | QuantsMind',
      description:
        'Numerical software, computational modelling, simulation workflow engineering and reproducible experimentation.'
    },
    loadComponent: () =>
      import('./pages/services/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'services/cybersecurity',
    data: {
      title: 'Cybersecurity Engineering & Digital Trust | Services | QuantsMind',
      description:
        'Security engineering, secure architecture, application security, identity and digital trust — no certifications claimed; concrete engineering work.'
    },
    loadComponent: () =>
      import('./pages/services/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'services/industrial-intelligence',
    data: {
      title: 'Industrial Intelligence & Digital Twin Engineering | Services | QuantsMind',
      description:
        'Industrial data systems, operational intelligence, digital-twin architecture and simulation-data integration — capability engineering, deployment limits stated.'
    },
    loadComponent: () =>
      import('./pages/services/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'technology',
    data: {
      title: 'Technology — QuantsMind',
      description:
        'The engineering foundations of QuantsMind: portfolios for Financial Intelligence, Enterprise AI, Data Intelligence, Bio Intelligence, Aerospace Intelligence and Developer Tools & Programming Technology.'
    },
    loadComponent: () =>
      import('./pages/technology/technology.component').then(m => m.TechnologyComponent)
  },
  {
    path: 'technology/financial-intelligence',
    data: {
      title: 'Financial Intelligence | Technology | QuantsMind',
      description:
        'Finance domain modules in the QuantsMind SDK and the engineering behind them. No packaged financial products are claimed.'
    },
    loadComponent: () =>
      import('./pages/technology/technology-portfolio.component').then(m => m.TechnologyPortfolioComponent)
  },
  {
    path: 'technology/enterprise-ai',
    data: {
      title: 'Enterprise AI | Technology | QuantsMind',
      description:
        'Approval-first AI systems: QuantsMind AI Coder (Preview), QuantsMind-Agent (Alpha) and GuardMCP (Alpha). Human oversight by design.'
    },
    loadComponent: () =>
      import('./pages/technology/technology-portfolio.component').then(m => m.TechnologyPortfolioComponent)
  },
  {
    path: 'technology/data-intelligence',
    data: {
      title: 'Data Intelligence | Technology | QuantsMind',
      description:
        'Telemetry ingestion, archival integrity and search — in development and experimental, honestly labelled. Nothing is presented as a deployed platform.'
    },
    loadComponent: () =>
      import('./pages/technology/technology-portfolio.component').then(m => m.TechnologyPortfolioComponent)
  },
  {
    path: 'technology/bio-intelligence',
    data: {
      title: 'Bio Intelligence | Technology | QuantsMind',
      description:
        'Biology and chemistry domain modules in the QuantsMind SDK (Developer Preview). No wet-lab or clinical claims.'
    },
    loadComponent: () =>
      import('./pages/technology/technology-portfolio.component').then(m => m.TechnologyPortfolioComponent)
  },
  {
    path: 'technology/aerospace-intelligence',
    data: {
      title: 'Aerospace Intelligence | Technology | QuantsMind',
      description:
        'Ground-segment and mission-data engineering at the feasibility stage. Nothing is flight-qualified, deployed or commanded.'
    },
    loadComponent: () =>
      import('./pages/technology/technology-portfolio.component').then(m => m.TechnologyPortfolioComponent)
  },
  {
    path: 'technology/developer-tools',
    data: {
      title: 'Developer Tools & Programming Technology | Technology | QuantsMind',
      description:
        'The Karkain platform: language v1.2.0 (Stable), Karkain Language Tools (Released), and the tools around them. Honest native-target subset.'
    },
    loadComponent: () =>
      import('./pages/technology/technology-portfolio.component').then(m => m.TechnologyPortfolioComponent)
  },
  {
    path: 'labs',
    data: {
      title: 'Labs & Research — QuantsMind',
      description:
        'Experiments, investigations and prototypes that are not customer-facing products. Stated with status, evidence and limitations.'
    },
    loadComponent: () =>
      import('./pages/labs/labs.component').then(m => m.LabsComponent)
  },
  {
    path: 'labs/:slug',
    data: {
      title: 'Research — QuantsMind Labs & Research',
      description:
        'Research detail: objective, problem, methodology, evidence, limitations and next milestone. Inclusion here is not a claim of a product or a validated outcome.'
    },
    loadComponent: () =>
      import('./pages/labs/research-detail.component').then(m => m.ResearchDetailComponent)
  },
  {
    path: 'insights',
    data: {
      title: 'Insights — QuantsMind',
      description:
        'Engineering and research publications: architecture, release maturity and known limitations, plus product updates and company announcements.'
    },
    loadComponent: () =>
      import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'insights/:slug',
    data: {
      title: 'Article — QuantsMind Insights',
      description:
        'A QuantsMind publication: what the project is, what its evidence shows, and what it does not claim.'
    },
    resolve: { article: blogArticleResolver },
    loadComponent: () =>
      import('./pages/blog/article.component').then(m => m.BlogArticleComponent)
  },
  { path: 'blog', redirectTo: '/insights', pathMatch: 'full' },
  { path: 'blog/:slug', redirectTo: '/insights/:slug', pathMatch: 'full' },
  {
    path: 'quantum',
    data: {
      title: 'Quantum Computing & Quantum Software Engineering | Services | QuantsMind',
      description:
        'Quantum circuit software engineering, simulation, algorithm experimentation and hybrid quantum-classical workflows — with simulation limits and honesty statements included.'
    },
    loadComponent: () =>
      import('./pages/quantum/quantum.component').then(m => m.QuantumComponent)
  },
  {
    path: 'quantum-mission',
    data: {
      title: 'Quantum Mission | Proposed Quantum Software Applications | QuantsMind',
      description:
        'Ten proposed quantum software applications — each is a proposed initiative, not a released product. MicroQuantum is a separate published technology.'
    },
    loadComponent: () =>
      import('./pages/quantum-mission/quantum-mission.component').then(m => m.QuantumMissionComponent)
  },
  {
    path: 'microquantum',
    data: {
      title: 'MicroQuantum | Quantum Simulation SDK | QuantsMind',
      description:
        'MicroQuantum is an open, NumPy-only Python SDK for building, executing and analyzing quantum programs, published on PyPI at version 1.1.0. Execution is by simulation.'
    },
    loadComponent: () =>
      import('./pages/microquantum/microquantum.component').then(m => m.MicroQuantumComponent)
  },
  {
    path: 'karkain',
    data: {
      title: 'Karkain | Programming Language & Computing Ecosystem | QuantsMind',
      description:
        'Karkain is an independently developed, statically typed systems programming language with a self-hosted compiler, published at version 1.2.0 (Stable). It emits native ELF / PE / Mach-O executables with no C toolchain on PATH, alongside the C23 backend.'
    },
    loadComponent: () =>
      import('./pages/karkain/karkain.component').then(m => m.KarkainComponent)
  },
  {
    path: 'quantsmind-sdk',
    data: {
      title: 'QuantsMind SDK | Scientific Computing SDK | QuantsMind',
      description:
        'QuantsMind SDK is an open, vendor-independent Python SDK for scientific computing, published on PyPI at version 1.1.0. A developer preview: module coverage and numerical accuracy vary by domain.'
    },
    loadComponent: () =>
      import('./pages/quantsmind-sdk/quantsmind-sdk.component').then(m => m.QuantsMindSdkComponent)
  },
  {
    path: 'support',
    data: {
      title: 'Support | QuantsMind',
      description:
        'How to get help with QuantsMind products: installation, open-source repositories, licensed products, and contact expectations.'
    },
    loadComponent: () =>
      import('./pages/support/support.component').then(m => m.SupportComponent)
  },
  {
    path: 'releases',
    data: {
      title: 'Releases | QuantsMind',
      description:
        'Verified release history for QuantsMind software, newest first, including Karkain 1.2.0, MicroQuantum 1.1.0, QuantsMind SDK 1.1.0 and the Agent 0.9.0.'
    },
    loadComponent: () =>
      import('./pages/releases/releases.component').then(m => m.ReleasesComponent)
  },
  {
    path: 'docs',
    data: {
      title: 'Documentation | QuantsMind',
      description:
        'Documentation index: public sources of truth for Karkain, MicroQuantum, the QuantsMind SDK, the Agent and the AI Coder.'
    },
    loadComponent: () =>
      import('./pages/docs/docs.component').then(m => m.DocsComponent)
  },
  {
    path: 'licensing',
    data: {
      title: 'Licensing | QuantsMind',
      description:
        'Licences for QuantsMind software at a glance: open-source MIT and Apache-2.0 components, direct licensing for DI Mini, and what “no licence file” means.'
    },
    loadComponent: () =>
      import('./pages/licensing/licensing.component').then(m => m.LicensingComponent)
  },
  {
    path: 'about',
    data: {
      title: 'About — QuantsMind',
      description:
        'QuantsMind is an independent technology engineering and innovation company delivering engineering services, proprietary software and research-driven solutions. Products, services, technology and research are distinct.'
    },
    loadComponent: () =>
      import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    data: {
      title: 'Contact — QuantsMind',
      description:
        'Start a business enquiry with QuantsMind. Static-compatible contact workflow; no invented contact details.'
    },
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'privacy',
    data: { title: 'Privacy Policy | QuantsMind', description: 'Privacy policy for quantsmind.com.' },
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'terms',
    data: { title: 'Terms of Use | QuantsMind', description: 'Terms of use for quantsmind.com.' },
    loadComponent: () =>
      import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'cookies',
    data: { title: 'Cookie Policy | QuantsMind', description: 'Cookie policy for quantsmind.com.' },
    loadComponent: () =>
      import('./pages/cookies/cookies.component').then(m => m.CookiesComponent)
  },
  {
    path: '**',
    data: { title: 'Page Not Found — QuantsMind', description: 'The page you requested does not exist.' },
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
