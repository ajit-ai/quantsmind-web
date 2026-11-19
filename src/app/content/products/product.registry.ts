import { Product, ProductCategory, isAvailableProduct } from './product.model';

export { isAvailableProduct } from './product.model';

export const PRODUCT_REGISTRY: readonly Product[] = [
  {
    id: 'quantsmind-document-intelligence-mini',
    name: 'QuantsMind Document Intelligence Mini',
    shortName: 'DI Mini',
    summary: 'Lightweight document intelligence software',
    description:
      'A compact document-processing application developed by QuantsMind. It reads ' +
      'PDF, DOCX and TXT documents, extracts their text, and derives structured ' +
      'fields deterministically by parsing labels the document itself states. It is ' +
      'not a machine-learning system: it performs no OCR, classification, named-entity ' +
      'recognition, embedding or semantic search.',
    capabilities: [
      'PDF, DOCX and TXT text extraction',
      'Deterministic structured-field derivation from labels stated in the document',
      'JSON and CSV export',
      'Missing-field reporting'
    ],
    useCases: [
      'Organising and working with document collections locally',
      'Extracting labelled fields — dates, amounts, identifiers — from documents',
      'Exporting extracted data to JSON or CSV',
      'Evaluating the product before committing to licensed use'
    ],
    maturity: 'alpha',
    availability: 'early-access',
    portfolio: 'standalone',
    category: 'business-applications',
    version: 'v0.1.0',
    releaseChannel: 'Early Access',
    platforms: ['Cross-platform (local web UI)'],
    deployment:
      'Runs on your own machine as a single local process serving its own web interface. No cloud account is required.',
    availabilityDetail:
      'Not a generally available release. There is no published download, package ' +
      'index entry or open repository. Access is arranged directly with QuantsMind.',
    featured: true,
    limitations: [
      'No OCR',
      'No machine learning classification',
      'No named-entity recognition',
      'No embeddings',
      'No semantic search'
    ],
    technologyTags: ['PDF', 'DOCX', 'TXT', 'JSON', 'CSV'],
    route: '/products',
    cta: {
      label: 'Request Product Access',
      route: '/contact'
    },
    verification: 'verified-documentation',
    lastVerified: '2026-11-19'
  },

  {
    id: 'invoice-pilot',
    name: 'InvoicePilot',
    summary: 'Invoicing and billing workflow software',
    description: 'InvoicePilot is a QuantsMind software initiative for invoicing and billing workflows. It is intended to support customer records, invoice creation and management, invoice status tracking, billing workflows, and financial document organisation. It is in development and is not a released or commercially available product.',
    capabilities: ['Customer records', 'Invoice creation and management', 'Invoice status tracking', 'Billing workflows', 'Financial document organisation'],
    useCases: ['Issuing and tracking invoices', 'Organising billing workflows', 'Managing customer billing records', 'Evaluating invoicing workflows before adoption'],
    targetDomains: ['Professional services', 'Small and medium businesses', 'Finance operations'],
    targetClients: ['Business owners', 'Finance teams', 'Service providers'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'form-flow',
    name: 'FormFlow',
    summary: 'Digital forms and submission workflow software',
    description: 'FormFlow is a QuantsMind software initiative for digital forms and submission workflows. It is intended to support form creation, submission collection, structured data capture, form management, and workflow organisation. It is in development and is not a released or commercially available product.',
    capabilities: ['Form creation', 'Submission collection', 'Structured data capture', 'Form management', 'Workflow organisation'],
    useCases: ['Collecting structured submissions', 'Managing digital forms', 'Organising form-based workflows', 'Evaluating form workflows before adoption'],
    targetDomains: ['Business operations', 'Administration', 'Data collection'],
    targetClients: ['Operations teams', 'Service organisations', 'Internal business teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'client-desk',
    name: 'ClientDesk',
    summary: 'Customer relationship management software',
    description: 'ClientDesk is a QuantsMind software initiative for customer relationship management. It is intended to support customer records, contact management, relationship tracking, and customer interaction organisation. It is in development and is not a released or commercially available product.',
    capabilities: ['Customer records', 'Contact management', 'Relationship tracking', 'Customer interaction organisation'],
    useCases: ['Managing customer records', 'Tracking customer relationships', 'Organising contact information', 'Evaluating CRM workflows before adoption'],
    targetDomains: ['Sales operations', 'Customer management', 'Business administration'],
    targetClients: ['Sales teams', 'Customer-facing organisations', 'Service businesses'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'book-wise',
    name: 'BookWise',
    summary: 'Appointment and service booking software',
    description: 'BookWise is a QuantsMind software initiative for appointment and service booking. It is intended to support service management, booking creation, appointment records, booking status tracking, and scheduling workflows. It is in development and is not a released or commercially available product.',
    capabilities: ['Service management', 'Booking creation', 'Appointment records', 'Booking status tracking', 'Scheduling workflows'],
    useCases: ['Managing appointments', 'Tracking booking status', 'Organising service schedules', 'Evaluating booking workflows before adoption'],
    targetDomains: ['Service businesses', 'Appointment-based operations', 'Professional services'],
    targetClients: ['Service providers', 'Scheduling teams', 'Small businesses'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'proposal-pro',
    name: 'ProposalPro',
    summary: 'Proposal and quotation workflow software',
    description: 'ProposalPro is a QuantsMind software initiative for proposal and quotation workflows. It is intended to support proposal preparation, quote organisation, customer proposals, proposal status tracking, and commercial document workflows. It is in development and is not a released or commercially available product.',
    capabilities: ['Proposal preparation', 'Quote organisation', 'Customer proposals', 'Proposal status tracking', 'Commercial document workflows'],
    useCases: ['Preparing customer proposals', 'Tracking proposal status', 'Organising quotations', 'Evaluating proposal workflows before adoption'],
    targetDomains: ['Professional services', 'Sales operations', 'Business development'],
    targetClients: ['Consulting firms', 'Sales teams', 'Service businesses'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'stock-pilot',
    name: 'StockPilot',
    summary: 'Inventory and stock management software',
    description: 'StockPilot is a QuantsMind software initiative for inventory and stock management. It is intended to support inventory records, stock visibility, item management, and inventory workflow organisation. It is in development and is not a released or commercially available product.',
    capabilities: ['Inventory records', 'Stock visibility', 'Item management', 'Inventory workflow organisation'],
    useCases: ['Tracking inventory records', 'Improving stock visibility', 'Managing stock workflows', 'Evaluating inventory workflows before adoption'],
    targetDomains: ['Retail operations', 'Inventory management', 'Business operations'],
    targetClients: ['Inventory teams', 'Retail businesses', 'Operations managers'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'support-nest',
    name: 'SupportNest',
    summary: 'Customer support and ticket management software',
    description: 'SupportNest is a QuantsMind software initiative for customer support and ticket management. It is intended to support support tickets, ticket status tracking, customer requests, and support workflow organisation. It is in development and is not a released or commercially available product.',
    capabilities: ['Support tickets', 'Ticket status tracking', 'Customer requests', 'Support workflow organisation'],
    useCases: ['Managing support tickets', 'Tracking ticket status', 'Organising customer requests', 'Evaluating support workflows before adoption'],
    targetDomains: ['Customer support', 'Service operations', 'Internal help desks'],
    targetClients: ['Support teams', 'Service organisations', 'Business operations teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'report-hub',
    name: 'ReportHub',
    summary: 'Business reporting and analytics workflow software',
    description: 'ReportHub is a QuantsMind software initiative for business reporting and analytics workflows. It is intended to support reporting workflows, data summaries, report organisation, and business performance visibility. It is in development and is not a released or commercially available product.',
    capabilities: ['Reporting workflows', 'Data summaries', 'Report organisation', 'Business performance visibility'],
    useCases: ['Organising business reports', 'Summarising operational data', 'Supporting management reporting', 'Evaluating reporting workflows before adoption'],
    targetDomains: ['Business intelligence', 'Operations reporting', 'Management information'],
    targetClients: ['Business managers', 'Operations teams', 'Reporting teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'team-track',
    name: 'TeamTrack',
    summary: 'Team coordination and work tracking software',
    description: 'TeamTrack is a QuantsMind software initiative for team coordination and work tracking. It is intended to support task organisation, work tracking, team coordination, and progress visibility. It is in development and is not a released or commercially available product.',
    capabilities: ['Task organisation', 'Work tracking', 'Team coordination', 'Progress visibility'],
    useCases: ['Tracking team work', 'Coordinating tasks', 'Improving progress visibility', 'Evaluating work-tracking workflows before adoption'],
    targetDomains: ['Project coordination', 'Team operations', 'Work management'],
    targetClients: ['Project teams', 'Operations managers', 'Small businesses'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'contract-flow',
    name: 'ContractFlow',
    summary: 'Contract and agreement workflow software',
    description: 'ContractFlow is a QuantsMind software initiative for contract and agreement workflows. It is intended to support contract records, agreement organisation, contract lifecycle tracking, and document workflow management. It is in development and is not a released or commercially available product.',
    capabilities: ['Contract records', 'Agreement organisation', 'Contract lifecycle tracking', 'Document workflow management'],
    useCases: ['Organising contracts', 'Tracking agreement status', 'Managing contract workflows', 'Evaluating contract workflows before adoption'],
    targetDomains: ['Business administration', 'Contract operations', 'Professional services'],
    targetClients: ['Operations teams', 'Commercial teams', 'Contract administrators'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'standalone',
    category: 'business-applications',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap'
  },
  {
    id: 'microquantum',
    name: 'MicroQuantum',
    summary: 'Classical quantum circuit simulation SDK',
    description: 'MicroQuantum is a QuantsMind quantum computing software initiative providing classical quantum circuit simulation. Version 1.1.0 is a developer-preview SDK for classical quantum circuit simulation. It supports quantum circuit simulation on classical hardware and is documented through its dedicated route.',
    capabilities: ['Classical quantum circuit simulation', 'Circuit construction and execution workflows', 'Developer-facing SDK'],
    useCases: ['Simulating quantum circuits on classical hardware', 'Learning and experimenting with quantum circuits', 'Validating circuit behaviour before hardware execution'],
    targetDomains: ['Quantum computing', 'Quantum software engineering', 'Education and research'],
    targetClients: ['Quantum researchers', 'Software engineers', 'Students and educators'],
    maturity: 'released',
    availability: 'general-availability',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    version: 'v1.1.0',
    releaseChannel: 'Developer Preview',
    technologyTags: ['Quantum circuits', 'Classical simulation', 'Python'],
    route: '/microquantum',
    cta: { label: 'View MicroQuantum', route: '/microquantum' },
    verification: 'verified-source',
    limitations: ['Classical simulation only; no quantum hardware access', 'No quantum hardware access is provided or implied'],
    license: 'MIT',
    repositoryUrl: 'https://github.com/ajit-ai/microquantum',
    documentationUrl: 'https://ajit-ai.github.io/microquantum/',
    packageUrls: [
      { label: 'PyPI (microquantum)', url: 'https://pypi.org/project/microquantum/' }
    ],
    installInstructions: 'pip install microquantum\nRequires Python 3.11 or newer.',
    releaseHistory: [
      { version: 'v1.1.0', date: '2026-09-23', notes: 'Current public release on PyPI and GitHub.' },
      { version: 'v1.0.0', date: '2026-09-18', notes: 'First public release on PyPI.' }
    ],
    dedicatedRoute: '/microquantum',
    featured: true,
    lastVerified: '2026-11-19'
  },
  {
    id: 'karkain',
    name: 'Karkain',
    shortName: 'Karkain',
    summary: 'Statically typed systems programming language with a self-hosted compiler',
    description: 'Karkain is a statically typed systems programming language for heterogeneous computing (CPU, GPU, NPU and quantum) with a self-hosted compiler written in the language itself. As of v1.2.0 Stable, the self-hosted engine can emit native Linux ELF, Windows PE and macOS Mach-O PIE images with no C compiler and no Go toolchain on PATH, alongside the C23 back end via GCC/Clang. It ships a real CLI: build, run, test, format, debug, profile, package and cross-compile. Version 1.2.0 is the current stable release; its native target does not yet support the full language surface, which is stated explicitly in its release notes.',
    capabilities: ['Statically typed systems programming language', 'Self-hosted compiler (kcc) with byte-identical bootstrap', 'Native whole-program compiler targets (ELF/PE/Mach-O) with no C compiler', 'C23 backend via GCC/Clang', 'CLI: build, run, test, format, debug, profile, package, cross-compile', 'Ownership-based memory safety with borrow checking', 'Native concurrency with channels and actors', 'SIMD/vector types for x86 and ARM', 'Cross-compilation with explicit target triples'],
    useCases: ['Systems programming with memory safety', 'Heterogeneous computing (CPU, GPU, NPU, quantum)', 'Cross-compilation for multiple targets', 'Compiler and language research'],
    targetDomains: ['Programming languages', 'Systems programming', 'Developer tools', 'Compiler engineering'],
    targetClients: ['Software engineers', 'Systems programmers', 'Compiler researchers', 'Developer tooling teams'],
    maturity: 'released',
    availability: 'public-download',
    portfolio: 'developer-tools',
    category: 'programming-languages',
    version: 'v1.2.0',
    releaseChannel: 'Stable',
    technologyTags: ['Systems language', 'Self-hosted compiler', 'Native targets', 'C23', 'SSA IR'],
    route: '/karkain',
    cta: { label: 'Explore Karkain', route: '/karkain' },
    verification: 'verified-documentation',
    license: 'MIT',
    repositoryUrl: 'https://github.com/ajit-ai/Karkain',
    documentationUrl: 'https://github.com/ajit-ai/Karkain#readme',
    installInstructions:
      'Download the release archives and checksums.txt from the GitHub Releases page. ' +
      'Releases are built from the tagged commit; checksums are published alongside the archives. ' +
      'See /karkain for the honest status report, including that v1.2.0 was built locally because the CI release matrix could not run.',
    marketplaceUrls: [
      { label: 'GitHub Releases (v1.2.0)', url: 'https://github.com/ajit-ai/Karkain/releases/tag/v1.2.0' }
    ],
    releaseHistory: [
      { version: 'v1.2.0', date: '2026-11-14', notes: 'Current stable release. Native ELF / PE / Mach-O PIE images from the self-hosted compiler (locally built; CI matrix could not run). See release notes for the honest native-target subset.' }
    ],
    dedicatedRoute: '/karkain',
    featured: true,
    lastVerified: '2026-11-19',
    limitations: ['Karkain 1.2.0 native targets are a qualified subset: floats, for..in, map literals and string equality/slicing are refused by name in the native driver', 'The self-hosted bootstrap closure conditions 5/6 and stdlib_v2/std.net no-C conditions remain carried to v1.3.0 as unmet', 'No Mach-O image has been executed (no macOS runner); Mach-O claims are structural only', 'Networking, databases, web, AI/ML modules are planned, not yet supported']
  },
  {
    id: 'quantum-studio',
    detailRoute: '/products/quantum-studio',
    name: 'QuantumStudio',
    summary: 'Quantum circuit development and experimentation environment',
    description: 'QuantumStudio is a proposed QuantsMind initiative for a quantum circuit development and experimentation environment. It is intended to support circuit design, experimentation workflows, and reproducible quantum software development. No public repository, release or documentation is currently available.',
    capabilities: ['Quantum circuit design workflows', 'Experimentation environment', 'Reproducible development workflows'],
    useCases: ['Exploring quantum circuit designs', 'Prototyping quantum algorithms', 'Supporting quantum software experiments'],
    targetDomains: ['Quantum computing', 'Quantum software engineering', 'Research and development'],
    targetClients: ['Quantum researchers', 'Software engineers', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No quantum hardware access is provided or implied']
  },
  {
    id: 'qubit-sim',
    detailRoute: '/products/qubit-sim',
    name: 'QubitSim',
    summary: 'Quantum circuit and state simulation software',
    description: 'QubitSim represents quantum-specific simulation, not general scientific computing. It is a proposed initiative for quantum circuit and state simulation software. No public repository, release or documentation is currently available.',
    capabilities: ['Quantum circuit simulation', 'State analysis', 'Reproducible experimentation'],
    useCases: ['Simulating quantum states', 'Analysing circuit behaviour', 'Supporting quantum research'],
    targetDomains: ['Quantum computing', 'Quantum software engineering', 'Research and development'],
    targetClients: ['Quantum researchers', 'Software engineers', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No quantum hardware access is provided or implied', 'QubitSim represents quantum-specific simulation, not general scientific computing.']
  },
  {
    id: 'quantum-forge',
    name: 'QuantumForge',
    summary: 'Quantum algorithm and workflow engineering toolkit',
    description: 'QuantumForge is a proposed QuantsMind initiative for a quantum algorithm and workflow engineering toolkit. It is intended to support algorithm development, workflow composition, and reproducible quantum engineering. No public repository, release or documentation is currently available.',
    capabilities: ['Quantum algorithm development', 'Workflow composition', 'Reproducible quantum engineering'],
    useCases: ['Developing quantum algorithms', 'Composing quantum workflows', 'Supporting algorithm research'],
    targetDomains: ['Quantum computing', 'Quantum software engineering', 'Research and development'],
    targetClients: ['Quantum researchers', 'Software engineers', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No quantum hardware access is provided or implied']
  },
  {
    id: 'q-optima',
    name: 'QOptima',
    summary: 'Quantum and hybrid optimisation experimentation software',
    description: 'QOptima is a proposed QuantsMind initiative for quantum and hybrid optimisation experimentation software. It is intended to support optimisation experiments, hybrid workflows, and performance evaluation. No public repository, release or documentation is currently available.',
    capabilities: ['Optimisation experiments', 'Hybrid quantum-classical workflows', 'Performance evaluation'],
    useCases: ['Exploring optimisation problems', 'Evaluating hybrid workflows', 'Supporting optimisation research'],
    targetDomains: ['Quantum computing', 'Optimisation', 'Research and development'],
    targetClients: ['Quantum researchers', 'Optimisation practitioners', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No quantum hardware access is provided or implied']
  },
  {
    id: 'quantum-shield',
    name: 'QuantumShield',
    summary: 'Quantum-security research and software analysis initiative',
    description: 'QuantumShield is a proposed QuantsMind initiative for quantum-security research and software analysis. It is intended to support analysis of quantum-security considerations. It is a proposed initiative and does not provide certified cryptographic protection or post-quantum security compliance. No public repository, release or documentation is currently available.',
    capabilities: ['Quantum-security research analysis', 'Security consideration review', 'Documentation and guidance'],
    useCases: ['Reviewing quantum-security considerations', 'Supporting security research', 'Evaluating quantum-security tooling'],
    targetDomains: ['Quantum computing', 'Cybersecurity', 'Research and development'],
    targetClients: ['Security researchers', 'Quantum researchers', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No certified cryptographic protection is claimed', 'No post-quantum security compliance is claimed']
  },
  {
    id: 'hybrid-q',
    name: 'HybridQ',
    summary: 'Quantum-classical workflow integration software',
    description: 'HybridQ is a proposed QuantsMind initiative for quantum-classical workflow integration software. It is intended to support integration between quantum and classical workflows. No public repository, release or documentation is currently available.',
    capabilities: ['Quantum-classical workflow integration', 'Workflow orchestration', 'Experimentation support'],
    useCases: ['Integrating quantum and classical workflows', 'Supporting hybrid experiments', 'Evaluating hybrid workflow tooling'],
    targetDomains: ['Quantum computing', 'Quantum software engineering', 'Research and development'],
    targetClients: ['Quantum researchers', 'Software engineers', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No quantum hardware access is provided or implied']
  },
  {
    id: 'quantum-bench',
    name: 'QuantumBench',
    summary: 'Proposed benchmarking and performance evaluation tooling',
    description: 'QuantumBench is a proposed QuantsMind initiative for benchmarking and performance evaluation tooling. It is intended to support performance evaluation and comparison workflows. No public repository, release or documentation is currently available.',
    capabilities: ['Benchmarking workflows', 'Performance evaluation', 'Comparison reporting'],
    useCases: ['Evaluating quantum software performance', 'Comparing implementations', 'Supporting benchmarking research'],
    targetDomains: ['Quantum computing', 'Performance evaluation', 'Research and development'],
    targetClients: ['Quantum researchers', 'Software engineers', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No benchmark results are claimed']
  },
  {
    id: 'quantum-chem',
    name: 'QuantumChem',
    summary: 'Quantum chemistry and molecular computation research software',
    description: 'QuantumChem is a proposed QuantsMind initiative for quantum chemistry and molecular computation research software. It is intended to support molecular computation research workflows. It is a proposed initiative and does not claim scientifically validated molecular predictions. No public repository, release or documentation is currently available.',
    capabilities: ['Molecular computation research workflows', 'Quantum chemistry experimentation', 'Research support'],
    useCases: ['Exploring molecular computation', 'Supporting quantum chemistry research', 'Evaluating research workflows'],
    targetDomains: ['Quantum computing', 'Quantum chemistry', 'Research and development'],
    targetClients: ['Quantum researchers', 'Chemistry researchers', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No scientifically validated molecular predictions are claimed']
  },
  {
    id: 'q-resource',
    name: 'QResource',
    summary: 'Quantum circuit resource estimation and analysis software',
    description: 'QResource is a proposed QuantsMind initiative for quantum circuit resource estimation and analysis software. It is intended to support resource estimation and analysis workflows. No public repository, release or documentation is currently available.',
    capabilities: ['Resource estimation workflows', 'Circuit analysis', 'Reporting and review'],
    useCases: ['Estimating circuit resources', 'Analysing circuit requirements', 'Supporting resource planning'],
    targetDomains: ['Quantum computing', 'Quantum software engineering', 'Research and development'],
    targetClients: ['Quantum researchers', 'Software engineers', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No quantum hardware access is provided or implied']
  },
  {
    id: 'quantum-verify',
    name: 'QuantumVerify',
    summary: 'Quantum circuit verification and testing software',
    description: 'QuantumVerify is a proposed QuantsMind initiative for quantum circuit verification and testing software. It is intended to support verification and testing workflows. No public repository, release or documentation is currently available.',
    capabilities: ['Circuit verification workflows', 'Testing support', 'Result review'],
    useCases: ['Verifying circuit behaviour', 'Supporting testing workflows', 'Evaluating verification tooling'],
    targetDomains: ['Quantum computing', 'Quantum software engineering', 'Quality assurance'],
    targetClients: ['Quantum researchers', 'Software engineers', 'Quality teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'quantum',
    category: 'scientific-quantum',
    relatedServiceId: 'quantum-computing',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; no public repository, release or documentation is currently available', 'No quantum hardware access is provided or implied']
  },
  {
    id: 'space-intel',
    name: 'SpaceIntel',
    summary: 'Space-data intelligence and telemetry analysis initiative',
    description: 'SpaceIntel is a QuantsMind initiative for space-data intelligence and telemetry analysis. Its maturity is based on available evidence; where evidence is limited it is treated conservatively. It is not claimed to be flight-qualified, deployed on spacecraft, or production-ready.',
    capabilities: ['Space-data intelligence workflows', 'Telemetry analysis', 'Operational insight'],
    useCases: ['Analysing space and telemetry data', 'Supporting mission data review', 'Evaluating space-data tooling'],
    targetDomains: ['Space systems', 'Telemetry analysis', 'Mission operations'],
    targetClients: ['Space engineering teams', 'Mission operations teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'space',
    category: 'enterprise-software',
    relatedServiceId: 'space-systems',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Maturity based on available evidence; treated conservatively', 'No flight qualification or spacecraft deployment is claimed']
  },
  {
    id: 'ground-link',
    detailRoute: '/products/ground-link',
    name: 'GroundLink',
    summary: 'Ground-station frame reception, validation, deduplication, continuity, and routing software',
    description: 'GroundLink is a QuantsMind space systems software initiative covering ground-station frame reception, validation, deduplication, continuity, and routing. It has active engineering history but is not claimed to be flight-qualified, deployed, or production-ready.',
    capabilities: ['Frame reception', 'Frame validation', 'Deduplication', 'Continuity handling', 'Routing'],
    useCases: ['Receiving ground-station frames', 'Validating and deduplicating telemetry frames', 'Maintaining continuity and routing'],
    targetDomains: ['Space systems', 'Ground segment', 'Mission software'],
    targetClients: ['Space engineering teams', 'Mission operations teams', 'Ground segment teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'space',
    category: 'enterprise-software',
    relatedServiceId: 'space-systems',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Active engineering history does not establish flight or production readiness', 'No spacecraft operational control is claimed']
  },
  {
    id: 'flightdata-gateway',
    name: 'FlightData Gateway',
    summary: 'Frame parsing, CRC verification, telemetry dictionary decoding, and normalisation software',
    description: 'FlightData Gateway is a QuantsMind space systems software initiative for frame parsing, CRC verification, telemetry dictionary decoding, and normalisation. It has active engineering history but is not claimed to be flight-qualified, deployed, or production-ready.',
    capabilities: ['Frame parsing', 'CRC verification', 'Telemetry dictionary decoding', 'Normalisation'],
    useCases: ['Parsing mission frames', 'Verifying frame integrity', 'Decoding telemetry dictionaries', 'Normalising telemetry data'],
    targetDomains: ['Space systems', 'Telemetry processing', 'Mission software'],
    targetClients: ['Space engineering teams', 'Mission operations teams', 'Telemetry teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'space',
    category: 'enterprise-software',
    relatedServiceId: 'space-systems',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Active engineering history does not establish flight or production readiness', 'No spacecraft operational control is claimed']
  },
  {
    id: 'telemetry-hub',
    detailRoute: '/products/telemetry-hub',
    name: 'TelemetryHub',
    summary: 'TelemetryHub represents space telemetry, not a complete industrial intelligence or digital twin platform. It is a QuantsMind space systems software initiative for telemetry ingestion and distribution, bounded backpressure, and journaling. It has active engineering history but is not claimed to be flight-qualified, deployed, or production-ready.',
    description: 'TelemetryHub is a QuantsMind space systems software initiative for telemetry ingestion, distribution, bounded backpressure, and journaling. It has active engineering history but is not claimed to be flight-qualified, deployed, or production-ready.',
    capabilities: ['Telemetry ingestion', 'Telemetry distribution', 'Bounded backpressure', 'Journaling'],
    useCases: ['Ingesting telemetry streams', 'Distributing telemetry data', 'Managing backpressure and journaling'],
    targetDomains: ['Space systems', 'Telemetry ingestion', 'Mission software'],
    targetClients: ['Space engineering teams', 'Mission operations teams', 'Telemetry teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'space',
    category: 'enterprise-software',
    relatedServiceId: 'industrial-intelligence-digital-twin',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Active engineering history does not establish flight or production readiness', 'No spacecraft operational control is claimed', 'TelemetryHub represents space telemetry, not a complete industrial intelligence or digital twin platform.']
  },
  {
    id: 'sat-health',
    name: 'SatHealth',
    summary: 'Satellite subsystem health monitoring, limits, alarms, hysteresis, and acknowledgements software',
    description: 'SatHealth is a QuantsMind space systems software initiative for satellite subsystem health monitoring, limits, alarms, hysteresis, and acknowledgements. It has active engineering history but is not claimed to be flight-qualified, deployed, or production-ready.',
    capabilities: ['Subsystem health monitoring', 'Limits and alarms', 'Hysteresis', 'Acknowledgements'],
    useCases: ['Monitoring satellite subsystem health', 'Managing limits and alarms', 'Supporting health-status review'],
    targetDomains: ['Space systems', 'Satellite health', 'Mission software'],
    targetClients: ['Space engineering teams', 'Mission operations teams', 'Satellite operations teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'space',
    category: 'enterprise-software',
    relatedServiceId: 'space-systems',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Active engineering history does not establish flight or production readiness', 'No satellite hardware validation is claimed']
  },
  {
    id: 'mission-ops',
    name: 'MissionOps',
    summary: 'Mission operations events, handovers, audit trails, and durability-oriented workflow software',
    description: 'MissionOps is a QuantsMind space systems software initiative for mission operations events, handovers, audit trails, and durability-oriented workflows. It has active engineering history but is not claimed to be flight-qualified, deployed, or production-ready.',
    capabilities: ['Mission operations events', 'Handovers', 'Audit trails', 'Durability-oriented workflows'],
    useCases: ['Recording mission operations events', 'Managing handovers', 'Maintaining audit trails'],
    targetDomains: ['Space systems', 'Mission operations', 'Mission software'],
    targetClients: ['Space engineering teams', 'Mission operations teams', 'Operations teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'space',
    category: 'enterprise-software',
    relatedServiceId: 'space-systems',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Active engineering history does not establish flight or production readiness', 'No mission heritage is claimed']
  },
  {
    id: 'pass-ops',
    name: 'PassOps',
    summary: 'Contact and pass scheduling, resource allocation, and conflict detection software',
    description: 'PassOps is a QuantsMind space systems software initiative for contact and pass scheduling, resource allocation, and conflict detection. It has active engineering history but is not claimed to be flight-qualified, deployed, or production-ready.',
    capabilities: ['Contact and pass scheduling', 'Resource allocation', 'Conflict detection'],
    useCases: ['Scheduling satellite passes', 'Allocating resources', 'Detecting scheduling conflicts'],
    targetDomains: ['Space systems', 'Pass scheduling', 'Mission software'],
    targetClients: ['Space engineering teams', 'Mission operations teams', 'Scheduling teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'space',
    category: 'enterprise-software',
    relatedServiceId: 'space-systems',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Active engineering history does not establish flight or production readiness', 'No agency certification is claimed']
  },
  {
    id: 'mission-archive',
    name: 'MissionArchive',
    summary: 'Telemetry and evidence archival, integrity verification, indexing, and retrieval software',
    description: 'MissionArchive is a QuantsMind space systems software initiative for telemetry and evidence archival, integrity verification, indexing, and retrieval. It has active engineering history but is not claimed to be flight-qualified, deployed, or production-ready.',
    capabilities: ['Telemetry archival', 'Evidence archival', 'Integrity verification', 'Indexing and retrieval'],
    useCases: ['Archiving telemetry and evidence', 'Verifying archive integrity', 'Indexing and retrieving mission data'],
    targetDomains: ['Space systems', 'Mission data', 'Mission software'],
    targetClients: ['Space engineering teams', 'Mission operations teams', 'Data teams'],
    maturity: 'in-development',
    availability: 'not-available',
    portfolio: 'space',
    category: 'enterprise-software',
    relatedServiceId: 'space-systems',
    route: '/products',
    cta: { label: 'Request Information', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Active engineering history does not establish flight or production readiness', 'No mission heritage is claimed']
  },
  {
    id: 'threat-intel',
    detailRoute: '/products/threat-intel',
    name: 'ThreatIntel',
    summary: 'Proposed threat intelligence and indicator correlation software',
    description: 'ThreatIntel is a proposed QuantsMind initiative for threat intelligence and indicator correlation software. It is a proposed initiative, not a completed or certified security product.',
    capabilities: ['Threat intelligence workflows', 'Indicator correlation', 'Reporting and review'],
    useCases: ['Correlating threat indicators', 'Supporting threat analysis', 'Evaluating threat intelligence tooling'],
    targetDomains: ['Cybersecurity', 'Threat intelligence', 'Digital trust'],
    targetClients: ['Security teams', 'Security researchers', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'cybersecurity-digital-trust',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No certified security protection is claimed']
  },
  {
    id: 'ai-guard',
    detailRoute: '/products/ai-guard',
    name: 'AIGuard',
    summary: 'Proposed security assessment and control tooling for AI, LLM, and agent systems',
    description: 'AIGuard represents AI security, not a complete general-purpose AI engineering platform. It is a proposed initiative, not a completed or certified security product.',
    capabilities: ['AI security assessment workflows', 'Control review', 'Risk reporting'],
    useCases: ['Assessing AI system security', 'Reviewing controls for LLM and agent systems', 'Evaluating AI security tooling'],
    targetDomains: ['Cybersecurity', 'AI security', 'Digital trust'],
    targetClients: ['Security teams', 'AI engineering teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'ai-intelligent-systems',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No certified security protection is claimed']
  },
  {
    id: 'code-sentinel',
    name: 'CodeSentinel',
    summary: 'Proposed secure-code, vulnerability, dependency, and secret-analysis software',
    description: 'CodeSentinel is a proposed QuantsMind initiative for secure-code, vulnerability, dependency, and secret-analysis software. It is a proposed initiative, not a completed or certified security product.',
    capabilities: ['Secure-code analysis workflows', 'Vulnerability review', 'Dependency and secret analysis'],
    useCases: ['Reviewing code security', 'Identifying dependency risks', 'Evaluating secure-code tooling'],
    targetDomains: ['Cybersecurity', 'Application security', 'Digital trust'],
    targetClients: ['Development teams', 'Security teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'cybersecurity-digital-trust',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No guaranteed vulnerability detection is claimed']
  },
  {
    id: 'forensic-vault',
    name: 'ForensicVault',
    summary: 'Proposed digital evidence integrity and chain-of-custody tooling',
    description: 'ForensicVault is a proposed QuantsMind initiative for digital evidence integrity and chain-of-custody tooling. It is a proposed initiative, not a completed or certified security product.',
    capabilities: ['Digital evidence integrity workflows', 'Chain-of-custody tracking', 'Audit support'],
    useCases: ['Managing digital evidence integrity', 'Tracking chain of custody', 'Evaluating forensic tooling'],
    targetDomains: ['Cybersecurity', 'Digital forensics', 'Digital trust'],
    targetClients: ['Security teams', 'Forensic teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'cybersecurity-digital-trust',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No certification or compliance is claimed']
  },
  {
    id: 'identity-shield',
    name: 'IdentityShield',
    summary: 'Proposed identity, access, and excessive-privilege analysis software',
    description: 'IdentityShield is a proposed QuantsMind initiative for identity, access, and excessive-privilege analysis software. It is a proposed initiative, not a completed or certified security product.',
    capabilities: ['Identity analysis workflows', 'Access review', 'Excessive-privilege analysis'],
    useCases: ['Reviewing identity and access', 'Identifying excessive privileges', 'Evaluating identity security tooling'],
    targetDomains: ['Cybersecurity', 'Identity and access', 'Digital trust'],
    targetClients: ['Security teams', 'Identity teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'cybersecurity-digital-trust',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No certified security protection is claimed']
  },
  {
    id: 'incident-flow',
    name: 'IncidentFlow',
    summary: 'Proposed security incident response workflow software',
    description: 'IncidentFlow is a proposed QuantsMind initiative for security incident response workflow software. It is a proposed initiative, not a completed or certified security product.',
    capabilities: ['Incident response workflows', 'Case tracking', 'Coordination support'],
    useCases: ['Managing security incidents', 'Coordinating response workflows', 'Evaluating incident response tooling'],
    targetDomains: ['Cybersecurity', 'Incident response', 'Digital trust'],
    targetClients: ['Security teams', 'Operations teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'cybersecurity-digital-trust',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No certified security protection is claimed']
  },
  {
    id: 'truth-lens',
    name: 'TruthLens',
    summary: 'Proposed information integrity and source-verification research tooling',
    description: 'TruthLens is a proposed QuantsMind initiative for information integrity and source-verification research tooling. It is a proposed initiative and does not claim infallible misinformation or truth detection.',
    capabilities: ['Information integrity workflows', 'Source verification support', 'Research analysis'],
    useCases: ['Reviewing information integrity', 'Supporting source verification', 'Evaluating verification tooling'],
    targetDomains: ['Cybersecurity', 'Information integrity', 'Digital trust'],
    targetClients: ['Research teams', 'Security teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'cybersecurity-digital-trust',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No infallible misinformation or truth detection is claimed']
  },
  {
    id: 'cloud-fort',
    name: 'CloudFort',
    summary: 'Proposed cloud security posture and configuration analysis software',
    description: 'CloudFort is a proposed QuantsMind initiative for cloud security posture and configuration analysis software. It is a proposed initiative, not a completed or certified security product.',
    capabilities: ['Cloud security posture workflows', 'Configuration analysis', 'Risk reporting'],
    useCases: ['Reviewing cloud security posture', 'Analysing configurations', 'Evaluating cloud security tooling'],
    targetDomains: ['Cybersecurity', 'Cloud security', 'Digital trust'],
    targetClients: ['Security teams', 'Cloud teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'cybersecurity-digital-trust',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No certified security protection is claimed']
  },
  {
    id: 'supply-guard',
    name: 'SupplyGuard',
    summary: 'Proposed software supply-chain, SBOM, and dependency-risk tooling',
    description: 'SupplyGuard is a proposed QuantsMind initiative for software supply-chain, SBOM, and dependency-risk tooling. It is a proposed initiative, not a completed or certified security product.',
    capabilities: ['Supply-chain analysis workflows', 'SBOM support', 'Dependency-risk review'],
    useCases: ['Reviewing software supply-chain risks', 'Supporting SBOM workflows', 'Evaluating dependency risks'],
    targetDomains: ['Cybersecurity', 'Software supply chain', 'Digital trust'],
    targetClients: ['Development teams', 'Security teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'cybersecurity-digital-trust',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No certified security protection is claimed']
  },
  {
    id: 'privacy-core',
    name: 'PrivacyCore',
    summary: 'Proposed sensitive-data classification and privacy-risk analysis software',
    description: 'PrivacyCore is a proposed QuantsMind initiative for sensitive-data classification and privacy-risk analysis software. It is a proposed initiative, not a completed or certified security product.',
    capabilities: ['Sensitive-data classification workflows', 'Privacy-risk analysis', 'Reporting and review'],
    useCases: ['Classifying sensitive data', 'Assessing privacy risks', 'Evaluating privacy tooling'],
    targetDomains: ['Cybersecurity', 'Privacy', 'Digital trust'],
    targetClients: ['Privacy teams', 'Security teams', 'Technical teams'],
    maturity: 'proposed',
    availability: 'not-available',
    portfolio: 'cybersecurity',
    category: 'enterprise-software',
    relatedServiceId: 'cybersecurity-digital-trust',
    route: '/products',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'owner-approved-roadmap',
    limitations: ['Proposed initiative; not implemented or available', 'No regulatory compliance is claimed']
  },
  {
    id: 'quantsmind-sdk',
    name: 'QuantsMind SDK',
    shortName: 'QuantsMind SDK',
    summary: 'Open, vendor-independent Python SDK for scientific computing',
    description: 'An open, vendor-independent Python SDK for scientific computing, published on PyPI as the package "quantsmind". It provides modules across mathematics, physics, chemistry, biology, astronomy, finance, agent abstractions and knowledge graphs. It requires Python 3.13 or newer.',
    capabilities: ['Mathematics, physics, chemistry, biology and astronomy modules', 'Finance modules', 'Agent abstractions and knowledge graphs', 'Python 3.13+ package published on PyPI', 'Typed public API contracts across domains'],
    useCases: ['Scientific computing in Python', 'Numerical and statistical workflows', 'Finance and biology domain modelling', 'Exploring the QuantsMind ecosystem'],
    targetDomains: ['Scientific computing', 'Data science', 'Finance', 'Research and education'],
    targetClients: ['Python engineers', 'Data scientists', 'Research teams'],
    maturity: 'developer-preview',
    availability: 'public-download',
    portfolio: 'developer-tools',
    category: 'scientific-quantum',
    version: 'v1.1.0',
    releaseChannel: 'Developer Preview',
    license: 'Apache-2.0',
    platforms: ['Python 3.13+'],
    repositoryUrl: 'https://github.com/ajit-ai/quantsmind-quantum-sdk',
    documentationUrl: 'https://github.com/ajit-ai/quantsmind-quantum-sdk#readme',
    packageUrls: [
      { label: 'PyPI (quantsmind)', url: 'https://pypi.org/project/quantsmind/' },
      { label: 'piwheels (quantsmind)', url: 'https://www.piwheels.org/project/quantsmind/' }
    ],
    installInstructions: 'pip install quantsmind\nRequires Python 3.13 or newer.',
    releaseHistory: [
      { version: 'v1.1.0', date: '2026-09-24', notes: 'Current public release on PyPI and piwheels.' },
      { version: 'v1.0.0', date: '2026-09-13', notes: 'First public release on PyPI.' }
    ],
    dedicatedRoute: '/quantsmind-sdk',
    technologyTags: ['Python 3.13+', 'Scientific computing', 'Mathematics', 'Finance', 'Biology'],
    route: '/quantsmind-sdk',
    cta: { label: 'View QuantsMind SDK', route: '/quantsmind-sdk' },
    verification: 'verified-source',
    limitations: ['Developer preview: module coverage and numerical accuracy vary by domain', 'Not described as production-ready anywhere on this site', 'No independent performance or reliability assessment has been carried out'],
    featured: true,
    lastVerified: '2026-11-19'
  },
  {
    id: 'karkain-language-tools',
    name: 'Karkain Language Tools',
    shortName: 'Karkain (VS Code)',
    summary: 'VS Code extension providing editor support for the Karkain language',
    description: 'Karkain Language Tools is the official Visual Studio Code extension for the Karkain programming language (.kark): syntax highlighting, Karkain CLI integration (check, build, run, format, test) and Karkain Language Server intelligence, including interactive test discovery and GDB-based debugging. Requires the Karkain toolchain; a working C compiler is required for build/run.',
    capabilities: ['Syntax highlighting for .kark', 'Karkain CLI integration (check, build, run, format, test)', 'Karkain Language Server intelligence (hover, go-to-definition)', 'Interactive test discovery for *_test.kark files', 'Debugging via GDB with the Microsoft C/C++ extension', 'Structured check diagnostics (karkain --format=json, 1.1.0+)'],
    useCases: ['Writing and debugging Karkain programs', 'Running Karkain test suites from the editor', 'Integrating the Karkain toolchain into VS Code workflows'],
    targetDomains: ['Programming languages', 'Developer tooling', 'Compiler engineering'],
    targetClients: ['Karkain developers', 'Systems programmers'],
    maturity: 'released',
    availability: 'public-download',
    portfolio: 'developer-tools',
    category: 'developer-tools',
    version: 'v1.0.0',
    releaseChannel: 'Stable',
    license: 'MIT',
    platforms: ['VS Code ^1.75.0 (desktop)', 'Windows, Linux, macOS'],
    systemRequirements: 'Karkain toolchain 1.1.0 or newer on PATH or karkain.compilerPath (verified against Karkain 1.2.0); desktop VS Code',
    repositoryUrl: 'https://github.com/ajit-ai/Karkain-VSCode',
    documentationUrl: 'https://github.com/ajit-ai/Karkain-VSCode#readme',
    installInstructions: 'In VS Code, open Quick Open (Ctrl+P) and run:\n    ext install Karkain.karkain-language-tools\nOr install Karkain Language Tools from Open VSX in the Extensions view.',
    marketplaceUrls: [
      { label: 'Open VSX — Karkain Language Tools (v1.0.0)', url: 'https://open-vsx.org/extension/karkain/karkain' },
      { label: 'Microsoft Marketplace — Karkain Programming Language Support (v0.9.0)', url: 'https://marketplace.visualstudio.com/items?itemName=Karkain.karkain-language-tools' }
    ],
    releaseHistory: [
      { version: 'v1.0.0', date: '2026-11-14', notes: 'Open VSX verified listing and GitHub release v1.0.0; requires Karkain 1.1.0+ (verified against 1.2.0).' },
      { version: 'v0.9.0', notes: 'Microsoft Visual Studio Marketplace listing (Karkain Programming Language Support); requires the Karkain 1.1.0 toolchain.' }
    ],
    technologyTags: ['VS Code', 'LSP', 'Karkain'],
    route: '/products/karkain-language-tools',
    cta: { label: 'View installation', route: '/products/karkain-language-tools' },
    verification: 'verified-source',
    limitations: ['Desktop VS Code only; vscode.dev is unsupported', 'Semantic features follow the language server; rename, references, code actions and workspace symbols are not faked', 'The Microsoft Marketplace listing shows v0.9.0 while Open VSX publishes v1.0.0; the Open VSX listing is the newer one', 'Requires the Karkain toolchain and a C compiler for build/run'],
    featured: true,
    lastVerified: '2026-11-19'
  },
  {
    id: 'quantsmind-vscode-ai-coder',
    name: 'QuantsMind AI Coder',
    shortName: 'AI Coder',
    summary: 'Agentic, project-aware AI coding for VS Code',
    description: 'QuantsMind AI Coder is an agentic, project-aware AI coding assistant for Visual Studio Code with explicit context control, approval-first changes, allowlisted validation and evidence-based reports. It is published as a Preview release on Open VSX and the Microsoft Visual Studio Marketplace.',
    capabilities: ['Agentic, project-aware code assistance', 'Explicit context control per request', 'Approval-first changes with allowlisted validation', 'Evidence-based reports before and after changes'],
    useCases: ['AI-assisted implementation with review gates', 'Scoped code changes across a repository', 'Validated edits with evidence reports'],
    targetDomains: ['AI engineering', 'Developer tooling', 'Software delivery'],
    targetClients: ['Developers', 'Engineering teams'],
    maturity: 'developer-preview',
    availability: 'public-download',
    portfolio: 'developer-tools',
    category: 'developer-tools',
    version: 'v3.1.x',
    releaseChannel: 'Preview',
    license: 'MIT',
    platforms: ['VS Code ^1.95.0 (desktop)'],
    repositoryUrl: 'https://github.com/Quantsmind/QuantsMind-VSCode-AI-Coder',
    documentationUrl: 'https://github.com/Quantsmind/QuantsMind-VSCode-AI-Coder#readme',
    installInstructions: 'In VS Code, open Quick Open (Ctrl+P) and run:\n    ext install quantsmind.quantsmind-vscode-ai-coder',
    marketplaceUrls: [
      { label: 'Open VSX — QuantsMind AI Coder (v3.1.0)', url: 'https://open-vsx.org/extension/quantsmind/quantsmind-vscode-ai-coder' },
      { label: 'Microsoft Marketplace — QuantsMind AI Coder (v3.1.1)', url: 'https://marketplace.visualstudio.com/items?itemName=quantsmind.quantsmind-vscode-ai-coder' }
    ],
    releaseHistory: [
      { version: 'v3.1.1', date: '2026-11-13', notes: 'GitHub release and Microsoft Marketplace; Open VSX carries v3.1.0.' }
    ],
    technologyTags: ['VS Code', 'AI coding', 'Agentic AI'],
    route: '/products/quantsmind-vscode-ai-coder',
    cta: { label: 'View installation', route: '/products/quantsmind-vscode-ai-coder' },
    verification: 'verified-source',
    limitations: ['Preview release; not production-grade and not described as such', 'Requires a compatible OpenAI-style language model endpoint and API key', 'Approval-first design does not remove the need for human review'],
    featured: true,
    lastVerified: '2026-11-19'
  },
  {
    id: 'quantsmind-agent',
    name: 'QuantsMind-Agent',
    shortName: 'Agent',
    summary: 'A local AI coding agent with permission-aware tool use',
    description: 'QuantsMind-Agent is a cross-platform desktop application (Windows and Linux; macOS planned) that connects a compatible OpenAI-compatible language model to a local project folder. The agent inspects files through controlled tools and shows every tool call it makes. Version 0.9.0 ("Workspace Intelligence") adds bounded, versioned workspace snapshots with explicit entry, file, size and prompt budgets, multi-language project detection (including polyglot projects) and a Task-panel view of the workspace evidence.',
    capabilities: ['Permission-aware tool use with human approval gates', 'Local project inspection through controlled tools', 'Workspace snapshots with entry, file, size and prompt budgets (v0.9.0)', 'Multi-language project detection (polyglot aware, v0.9.0)', 'Task-panel view of workspace evidence (v0.9.0)'],
    useCases: ['Local AI-assisted coding with an audit trail of tool calls', 'Permission-gated agent workflows'],
    targetDomains: ['AI engineering', 'Developer tooling'],
    targetClients: ['Developers', 'Engineering teams'],
    maturity: 'alpha',
    availability: 'public-download',
    portfolio: 'developer-tools',
    category: 'ai-intelligent-systems',
    version: 'v0.9.0',
    releaseChannel: 'Alpha (Workspace Intelligence)',
    license: 'MIT',
    platforms: ['Windows 10/11 (GUI verified)', 'Linux x64 (headless, CI)', 'macOS planned', 'BSD unsupported'],
    repositoryUrl: 'https://github.com/ajit-ai/QuantsMind-Agent',
    documentationUrl: 'https://github.com/ajit-ai/QuantsMind-Agent#readme',
    installInstructions: 'Clone the repository and build from source as documented in the README. Packaged executables are attached to the GitHub release for v0.9.0.',
    marketplaceUrls: [
      { label: 'GitHub Releases (v0.9.0)', url: 'https://github.com/ajit-ai/QuantsMind-Agent/releases/tag/v0.9.0' }
    ],
    releaseHistory: [
      { version: 'v0.9.0', date: '2026-10-20', notes: 'Workspace Intelligence: bounded workspace snapshots and multi-language project detection. 0.x line; not a 1.0 release.' }
    ],
    technologyTags: ['AI agent', 'Permission-aware', 'Desktop application'],
    route: '/products/quantsmind-agent',
    cta: { label: 'View installation', route: '/products/quantsmind-agent' },
    verification: 'verified-source',
    limitations: ['Alpha software; not production-ready', 'Requires a compatible OpenAI-compatible language model endpoint', 'Permission model is application-level, not an operating-system sandbox', 'No model weights ship in this project', 'Git mutations (commit, push, checkout, reset) are deliberately blocked'],
    featured: true,
    lastVerified: '2026-11-19'
  },
  {
    id: 'taksh',
    name: 'Taksh (QuantsMind-LLM)',
    shortName: 'Taksh',
    summary: 'Research source release of a code language model effort (M7)',
    description: 'Taksh (formerly QuantsMind-LLM) is a research project into training a code-oriented language model from scratch: its own Transformer implementation, BPE tokenizer, training and fine-tuning loops, and local inference plus FastAPI serving. Taksh v1.0.0 publishes the source tree and experiment records as an honest negative result (0/40 locked syntax-valid generations, 0/8 functional tasks, evidence level 0). It is not a model-weights release.',
    capabilities: ['From-scratch Transformer implementation (RMSNorm, rotary embeddings, GQA, SwiGLU)', 'Byte-pair-encoding tokenizer', 'Training and fine-tuning loops', 'Local inference and FastAPI serving'],
    useCases: ['Research into training code language models', 'Studying the full training path from tokens to serving'],
    targetDomains: ['AI research', 'Language models', 'Developer education'],
    targetClients: ['Researchers', 'Language-model engineers'],
    maturity: 'research-prototype',
    availability: 'not-available',
    portfolio: 'developer-tools',
    category: 'research',
    version: 'v1.0.0',
    releaseChannel: 'Research Release (source only)',
    license: 'Apache-2.0',
    repositoryUrl: 'https://github.com/ajit-ai/QuantsMind-LLM',
    documentationUrl: 'https://github.com/ajit-ai/QuantsMind-LLM#readme',
    releaseHistory: [
      { version: 'v1.0.0', date: '2026-10-21', notes: 'Honest negative result: 0/40 locked syntax-valid generations, 0/8 functional tasks, evidence level 0. Not a model-weights release.' }
    ],
    technologyTags: ['Language model', 'Transformer', 'Research'],
    route: '/insights/quantsmind-llm',
    cta: { label: 'Read the research notes', route: '/insights/quantsmind-llm' },
    verification: 'verified-source',
    limitations: ['Honest negative result; not a validated or capable model', 'No model weights are distributed', 'Training corpus is smaller than the shipped training configuration requests', 'Committed tokenizer vocabulary does not match the declared size', 'Code evaluation is a small hand-written suite, not HumanEval/MBPP', 'No independent model-quality assessment has been carried out'],
    lastVerified: '2026-11-19'
  },
  {
    id: 'quantsmind-relational-db',
    name: 'QuantsMind Relational DB',
    shortName: 'Relational DB',
    summary: 'Embeddable relational database engine (pre-release)',
    description: 'A relational database engine written in Rust, shipped as a library, a Postgres-wire-compatible server, a CLI shell and a desktop GUI. Version 0.1.0 is published as a pre-release tag only: not published to crates.io or npm; build from source. It supports a subset of SQL rather than full conformance, and recovery is redo-only without physical checkpoints.',
    capabilities: ['Embeddable library, Postgres-wire server, CLI shell and desktop GUI', 'MVCC with write-ahead log storage', 'Subset of SQL'],
    useCases: ['Evaluating an embedded database engine', 'Rust database-engine research and development'],
    targetDomains: ['Databases', 'Developer tooling'],
    targetClients: ['Rust developers', 'Database engineers'],
    maturity: 'alpha',
    availability: 'not-available',
    portfolio: 'developer-tools',
    category: 'data-database',
    version: 'v0.1.0',
    releaseChannel: 'Pre-release (tag v0.1.0; no releases published)',
    license: 'MIT',
    platforms: ['Build from source (Rust)'],
    repositoryUrl: 'https://github.com/ajit-ai/Quantsmind-Relational-DB',
    documentationUrl: 'https://github.com/ajit-ai/Quantsmind-Relational-DB#readme',
    technologyTags: ['Rust', 'SQL', 'MVCC', 'WAL'],
    route: '/products/quantsmind-relational-db',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'verified-source',
    limitations: ['Pre-release; not published to crates.io or npm', 'Subset of SQL, not full conformance', 'Redo-only recovery; no physical checkpoints', 'No releases published; build from source'],
    lastVerified: '2026-11-19'
  },
  {
    id: 'guardmcp',
    name: 'GuardMCP',
    shortName: 'GuardMCP',
    summary: 'Policy and security control layer for MCP tool calls',
    description: 'An open Python library that evaluates policy, risk, budget and delegation rules before an agent or client calls a protected Model Context Protocol tool, and inspects the result afterwards. Development is partway through a documented phase plan: the root distribution packages the core package, while the eleven component packages each carry their own manifest and source. The gateway and control-plane applications described in its documentation are not present in the repository, and no persistence layer is implemented.',
    capabilities: ['Policy, risk, budget and delegation rules for MCP tool calls', 'Pre-call evaluation and post-call inspection', 'Component library (root distribution packages the core)'],
    useCases: ['Policy-gated MCP tool invocation', 'Agent security boundaries'],
    targetDomains: ['AI engineering', 'Security', 'Developer tooling'],
    targetClients: ['Agent developers', 'Security engineers'],
    maturity: 'alpha',
    availability: 'not-available',
    portfolio: 'developer-tools',
    category: 'developer-tools',
    version: 'v0.1.0',
    releaseChannel: 'Alpha (in development; no tags or releases)',
    license: 'MIT',
    platforms: ['Python'],
    repositoryUrl: 'https://github.com/ajit-ai/GuardMCP',
    documentationUrl: 'https://github.com/ajit-ai/GuardMCP#readme',
    technologyTags: ['MCP', 'Policy', 'Agent security'],
    route: '/products/guardmcp',
    cta: { label: 'Express Interest', route: '/contact' },
    verification: 'verified-source',
    limitations: ['In development; no tags or releases', 'Gateway and control-plane applications described in docs are not in the repository', 'No persistence layer is implemented', 'Root distribution packages the core only'],
    lastVerified: '2026-11-19'
  },
  {
    id: 'vsector',
    name: 'Vsector',
    shortName: 'Vsector',
    summary: 'Approximate nearest-neighbor search in pure Python',
    description: 'An experimental pure-Python vector database exploring approximate nearest-neighbour search, write-ahead logging, sharding and replication. It is single-process only; its distributed architecture is a roadmap, not a delivered capability. Public repository with tags up to v0.8.0; no releases published.',
    capabilities: ['Approximate nearest-neighbour search', 'Write-ahead logging', 'Sharding and replication (explore)'],
    useCases: ['Vector search experiments', 'Studying vector database internals'],
    targetDomains: ['Data intelligence', 'Developer tooling'],
    targetClients: ['Researchers', 'Python developers'],
    maturity: 'research-prototype',
    availability: 'not-available',
    portfolio: 'developer-tools',
    category: 'data-database',
    version: 'v0.8.0',
    releaseChannel: 'Experimental (tags only; no releases)',
    license: 'MIT',
    platforms: ['Python'],
    repositoryUrl: 'https://github.com/ajit-ai/Vsector',
    documentationUrl: 'https://github.com/ajit-ai/Vsector#readme',
    technologyTags: ['Vector search', 'ANN', 'Python'],
    route: '/labs',
    cta: { label: 'Explore Labs', route: '/labs' },
    verification: 'verified-source',
    limitations: ['Experimental; single-process only', 'Distributed architecture is a roadmap, not delivered', 'No releases published'],
    lastVerified: '2026-11-19'
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCT_REGISTRY.find(product => product.id === id);
}

export function getProductsByPortfolio(portfolio: Product['portfolio']): Product[] {
  return PRODUCT_REGISTRY.filter(product => product.portfolio === portfolio);
}

export function getStandaloneProducts(): Product[] {
  return getProductsByPortfolio('standalone');
}

export function getAllProducts(): Product[] {
  return [...PRODUCT_REGISTRY];
}

/** Products in the "Available Products" section: genuinely obtainable today. */
export function getAvailableProducts(): Product[] {
  return PRODUCT_REGISTRY.filter(isAvailableProduct);
}

/** Everything else: under development, pre-release, or proposed. Research-only entries belong to Labs & Research. */
export function getInDevelopmentProducts(): Product[] {
  return PRODUCT_REGISTRY.filter(product => !isAvailableProduct(product) && product.category !== 'research');
}

export function getFeaturedProducts(): Product[] {
  return PRODUCT_REGISTRY.filter(product => product.featured && isAvailableProduct(product));
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCT_REGISTRY.filter(product => product.category === category);
}

export function getAvailableProductsByCategory(category: ProductCategory): Product[] {
  return getAvailableProducts().filter(product => product.category === category);
}

/** Categories that have at least one product tracked in the store. */
export function getStoreCategories(): ProductCategory[] {
  const counts = getCategoryCounts();
  return (Object.keys(counts) as ProductCategory[])
    .filter(category => category !== 'research' && counts[category].total > 0);
}

export function getCategoryCounts(): Record<ProductCategory, { available: number; total: number }> {
  const counts = {} as Record<ProductCategory, { available: number; total: number }>;
  for (const category of ['programming-languages', 'developer-tools', 'ai-intelligent-systems', 'scientific-quantum', 'data-database', 'business-applications', 'enterprise-software', 'research'] as ProductCategory[]) {
    counts[category] = { available: 0, total: 0 };
  }
  for (const product of PRODUCT_REGISTRY) {
    if (!product.category) continue;
    counts[product.category].total += 1;
    if (isAvailableProduct(product)) {
      counts[product.category].available += 1;
    }
  }
  return counts;
}

export interface ReleaseRecord {
  readonly product: Product;
  readonly version: string;
  readonly date?: string;
  readonly notes: string;
}

/** Flat, date-sorted record of verified public releases. */
export function getReleaseHistory(): ReleaseRecord[] {
  const records: ReleaseRecord[] = [];
  for (const product of PRODUCT_REGISTRY) {
    for (const entry of product.releaseHistory ?? []) {
      records.push({ product, version: entry.version, date: entry.date, notes: entry.notes });
    }
  }
  return records.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
}

/** External release/repository link for a product, preferring marketplaces. */
export function getProductReleaseLink(product: Product): string | undefined {
  return product.marketplaceUrls?.[0]?.url
    ?? product.packageUrls?.[0]?.url
    ?? product.repositoryUrl
    ?? product.documentationUrl;
}
