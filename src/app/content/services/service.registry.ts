/**
 * Verified service-domain registry.
 *
 * Single source for the six QuantsMind engineering domains. Descriptions state
 * the customer situation, what can be delivered and the stated outcome; nothing
 * here claims a completed customer engagement or a production deployment.
 */
import { BadgeVariant } from '../../shared/components/qm-badge/qm-badge.component';

export interface TechnologyAssociation {
  name: string;
  status: string;
  badge: BadgeVariant;
  href: string;
}

export interface ServiceArea {
  id: string;
  icon: string;
  title: string;
  short: string;
  /** The customer situation this service is intended to address. */
  problem: string;
  /** What QuantsMind can design, develop, integrate or deliver. */
  provides: string[];
  /** Concrete deliverables or engagement outputs. */
  deliverables: string[];
  /** Context statement — what is and is not claimed. */
  context: string;
  /** Stated engineering outcome with limits explicitly. */
  outcome: string;
  technologies: TechnologyAssociation[];
  /** Optional product showcase wiring. */
  showcaseIds?: readonly string[];
  showcaseHeading?: string;
  showcaseDescription?: string;
  productsAnchor?: string;
  productsLinkLabel?: string;
  /** Extra destination shown beneath the product showcase. */
  extraLink?: { label: string; route: string };
  /** Optional link to a dedicated service detail page. */
  detailLink?: { label: string; route: string };
}

export const SERVICE_AREAS: ServiceArea[] = [
    {
      id: 'quantum-computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>`,
      title: 'Quantum Computing & Quantum Software Engineering',
      short: 'Quantum circuit software engineering, simulation, algorithm experimentation, and quantum-classical workflows.',
      problem: 'A quantum algorithm or workflow needs to be implemented, simulated, tested or integrated with classical software — without access to quantum hardware or an established quantum software team.',
      provides: [
        'Quantum circuit software engineering',
        'Circuit representation and simulation',
        'Quantum algorithm experimentation',
        'Quantum-classical workflow integration',
        'Quantum software testing and verification',
        'Performance and resource analysis',
        'Reproducible research tooling'
      ],
      deliverables: [
        'Implemented and tested quantum programs and algorithms',
        'Simulation results backed by reproducible experiment records',
        'Parameter sweeps and analysis of sampled results',
        'Technical assessments that separate demonstrated behaviour from roadmap intent'
      ],
      context: 'Open, NumPy-based quantum tooling with local simulation backends. No quantum hardware access or validated quantum advantage is claimed.',
      outcome: 'Quantum software that is implemented, testable, and honestly characterised, with simulation limits stated explicitly.',
      technologies: [
        { name: 'MicroQuantum', status: 'Developer Preview', badge: 'experimental', href: '/microquantum' },
        { name: 'QuantsMind SDK', status: 'Developer Preview', badge: 'experimental', href: '/quantsmind-sdk' }
      ],
      showcaseIds: ['microquantum', 'quantum-studio', 'quantum-bench', 'quantum-verify'],
      showcaseHeading: 'Related QuantsMind quantum software',
      showcaseDescription: 'Representative software initiatives from the Quantum Computing Software portfolio associated with this engineering service.',
      productsAnchor: 'quantum-software',
      productsLinkLabel: 'View quantum software initiatives on the Products page',
      detailLink: { label: 'Explore Quantum Computing Services', route: '/quantum' },
      extraLink: { label: 'Explore the ten Quantum Mission applications', route: '/quantum-mission' }
    },
    {
      id: 'space-systems',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><path d="M2 12h4M18 12h4"/></svg>`,
      title: 'Space Systems & Mission Software Engineering',
      short: 'Software for ground-segment operations, telemetry processing, mission-support workflows, and satellite engineering data.',
      problem: 'Telemetry, mission data or simulation software must be reliable and maintainable, but its qualification, deployment and operational status need to be described accurately.',
      provides: [
        'Ground-station software integration',
        'Telemetry frame processing',
        'Flight-data decoding',
        'Telemetry ingestion and distribution',
        'Satellite subsystem health monitoring',
        'Mission operations workflows',
        'Satellite contact scheduling',
        'Mission-data archival and integrity verification'
      ],
      deliverables: [
        'Ground software and data pipelines',
        'Telemetry processing and decoding components',
        'Health monitoring and mission-support workflows',
        'Archival and integrity verification procedures',
        'Feasibility and integration assessments'
      ],
      context: 'Telemetry formats, mission-data pipelines, simulation environments, and ground-system integration. Software and feasibility engineering only; no flight qualification, operational spacecraft deployment, autonomous spacecraft commanding, or mission heritage is claimed.',
      outcome: 'Clear feasibility evidence and maintainable ground software, with limitations and validation gaps stated explicitly.',
      technologies: [],
      showcaseIds: ['ground-link', 'telemetry-hub', 'sat-health', 'mission-ops'],
      showcaseHeading: 'Related QuantsMind space software',
      showcaseDescription: 'Representative software initiatives from the Space Systems Software portfolio associated with this engineering service.',
      productsAnchor: 'space-software',
      productsLinkLabel: 'View space software initiatives on the Products page'
    },
    {
      id: 'ai-intelligent-systems',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`,
      title: 'AI Engineering & Autonomous Intelligent Systems',
      short: 'Engineering AI-enabled applications, enterprise AI integrations, agentic workflow designs, and reliable intelligent systems.',
      problem: 'An AI-enabled product idea exists, but its value, reliability, permission boundaries, human oversight requirements, and integration with existing business systems are not yet clear.',
      provides: [
        'AI-enabled application engineering',
        'Enterprise AI integration and workflow automation',
        'Agentic AI architecture and workflow design',
        'Retrieval-Augmented Generation and enterprise knowledge systems',
        'AI-assisted business process automation',
        'Integration of AI systems with APIs, enterprise applications and data platforms',
        'AI evaluation, reliability, governance and security considerations',
        'Human-in-the-loop workflows and controlled automation'
      ],
      deliverables: [
        'AI application engineering designs and implementation plans',
        'Enterprise AI integration architectures',
        'Agentic workflow designs with human oversight points',
        'RAG and knowledge system prototypes',
        'AI evaluation and observability reports',
        'Controlled automation workflows with permission boundaries',
        'Feasibility proofs-of-concept for AI-enabled features',
        'AI security and governance assessments'
      ],
      context: 'Modern LLM APIs, classical ML, Python tooling, cloud AI services, enterprise application APIs, and permission-aware application architecture. AI Engineering is a customer-specific engineering service, not a proprietary agent platform. No fully autonomous, unsupervised, or production-proven AI system is claimed; human oversight remains required. AIGuard is a separate proposed product for AI security assessment, not a general-purpose AI engineering platform or complete agent orchestration system.',
      outcome: 'AI capabilities that are measurable, maintainable, and honestly scoped, with oversight, security boundaries, and engineering limits stated explicitly.',
      technologies: [
        { name: 'GuardMCP', status: 'Alpha · Under Development', badge: 'prototype', href: '/technology' },
        { name: 'QuantsMind-Agent', status: 'Alpha · Under Development', badge: 'prototype', href: '/technology' },
        { name: 'QuantsMind-LLM', status: 'Research Prototype', badge: 'research', href: '/technology' }
      ]
    },
    {
      id: 'scientific-computing',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 16l4-8 4 8"/><path d="M9 14h6"/></svg>`,
      title: 'Scientific Computing & Digital Simulation',
      short: 'Numerical software, scientific workflows, modelling systems, and computational simulations.',
      problem: 'A scientific or engineering computation needs rigorous methods, validation and reproducible results that another team can inspect.',
      provides: [
        'Numerical software development',
        'Computational modeling',
        'Scientific data processing',
        'Simulation workflow engineering',
        'Algorithm evaluation',
        'Reproducible experimentation',
        'Scientific software verification',
        'Data visualization where supported'
      ],
      deliverables: [
        'Validated numerical implementations',
        'Simulation code and experiment records',
        'Performance and accuracy reports',
        'Documentation of methods and assumptions'
      ],
      context: 'Python, NumPy/SciPy-style numerical stacks, simulation environments, and HPC-friendly workflows. No validated scientific performance result is claimed.',
      outcome: 'Computations that are correct, reproducible, and defensible, with assumptions and limits stated.',
      technologies: [
        { name: 'QuantsMind SDK', status: 'Developer Preview', badge: 'experimental', href: '/quantsmind-sdk' },
        { name: 'MicroQuantum', status: 'Developer Preview', badge: 'experimental', href: '/microquantum' }
      ]
    },
    {
      id: 'cybersecurity-digital-trust',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      title: 'Cybersecurity Engineering & Digital Trust',
      short: 'Security-focused software, security analysis workflows, integrity verification, and trustworthy digital systems.',
      problem: 'A system has unclear security, privacy or trust boundaries, and the team needs a systematic review rather than an unverified assurance claim.',
      provides: [
        'Application security engineering',
        'Secure development practices',
        'AI application security',
        'Digital evidence integrity',
        'Identity and access-security analysis',
        'Incident workflow engineering',
        'Software supply-chain security',
        'Cloud security assessment',
        'Privacy engineering',
        'Information integrity research'
      ],
      deliverables: [
        'Threat models and risk registers',
        'Security review reports',
        'Hardening and remediation plans',
        'Security test scenarios',
        'Evidence integrity and workflow designs'
      ],
      context: 'Web, backend, cloud, AI, and data systems. No certifications, penetration-testing accreditations, security guarantees, or deployed security products are claimed.',
      outcome: 'Systems with clear trust boundaries and actionable security improvements.',
      technologies: [
        { name: 'GuardMCP', status: 'Alpha · Under Development', badge: 'prototype', href: '/technology' }
      ],
      showcaseIds: ['threat-intel', 'ai-guard', 'code-sentinel', 'forensic-vault'],
      showcaseHeading: 'Related QuantsMind cybersecurity software',
      showcaseDescription: 'Representative proposed software initiatives from the Cybersecurity & Digital Trust Software portfolio associated with this engineering service.',
      productsAnchor: 'cybersecurity-software',
      productsLinkLabel: 'View cybersecurity software initiatives on the Products page'
    },
    {
      id: 'industrial-intelligence-digital-twin',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="14" r="2"/></svg>`,
      title: 'Industrial Intelligence & Digital Twin Engineering',
      short: 'Industrial data systems, operational intelligence software, digital simulation models, and digital twin integration workflows.',
      problem: 'Industrial equipment, assets or workflows hold operational data that is not yet connected to the simulation, monitoring and software systems the business needs.',
      provides: [
        'Industrial data integration',
        'Sensor and telemetry data processing',
        'Operational monitoring software',
        'Digital twin architecture',
        'Simulation-data integration',
        'Asset-state modeling',
        'Industrial analytics',
        'Engineering visualization',
        'Reliability-oriented software design'
      ],
      deliverables: [
        'Industrial data integration designs',
        'Operational monitoring and analytics components',
        'Digital twin architecture and simulation-data integration plans',
        'Asset-state models and visualization prototypes',
        'Reliability and integration documentation'
      ],
      context: 'Manufacturing, industrial automation, energy systems, engineering R&D, and industrial IoT. No industrial deployments, validated digital twins, hardware partnerships, or production integrations are claimed. Cross-domain software architecture, integration design, API design, cloud and deployment architecture, reliability engineering, verification, secure system design, and engineering consulting capabilities are preserved here.',
      outcome: 'Capability-oriented industrial intelligence engineering, with deployment and validation limits stated explicitly.',
      technologies: []
    }
];