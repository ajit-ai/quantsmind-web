/**
 * Technology portfolio definitions.
 *
 * These pages explain the engineering foundations, architecture and boundaries of
 * each QuantsMind technology portfolio. They deliberately link to product detail
 * pages rather than duplicating the Products Store, and they never claim
 * finished products, accuracy figures or customer outcomes that do not exist.
 */
export interface PortfolioFoundation {
  readonly name: string;
  readonly status: string;
  readonly href?: string;
}

export interface TechnologyPortfolio {
  readonly slug: string;
  readonly title: string;
  readonly short: string;
  /** One sentence: what this portfolio is for. */
  readonly purpose: string;
  /** Technical foundations this portfolio is built from. */
  readonly foundations: readonly PortfolioFoundation[];
  /** How QuantsMind designs and builds in this portfolio. */
  readonly architecture: string;
  /** Evidence of real work, stated conservatively. */
  readonly evidence: string;
  /** Honest engineering maturity of the portfolio. */
  readonly maturity: string;
  /** Boundaries: what is NOT claimed. */
  readonly boundaries: readonly string[];
  /** Direction of travel; clearly not an implemented promise. */
  readonly direction: string;
  /** Registry product ids related to this portfolio (available ones render links). */
  readonly relatedProductIds: readonly string[];
  /** Public documentation repositories, if any. */
  readonly docs: readonly { label: string; url: string }[];
}

export const TECHNOLOGY_PORTFOLIOS: readonly TechnologyPortfolio[] = [
  {
    slug: 'financial-intelligence',
    title: 'Financial Intelligence',
    short: 'Domain modules and engineering for quantitative finance.',
    purpose:
      'An engineering portfolio for quantitative finance: domain modules, modelling ' +
      'workflows and analytics built on the QuantsMind SDK. Today this is delivered as ' +
      'engineering engagements and SDK modules, not as packaged financial products.',
    foundations: [
      { name: 'QuantsMind SDK — finance modules', status: 'Developer Preview · v1.1.0', href: '/quantsmind-sdk' },
      { name: 'QuantsMind SDK — mathematics & statistics modules', status: 'Developer Preview · v1.1.0', href: '/quantsmind-sdk' },
      { name: 'Knowledge-graph provenance in the SDK', status: 'Developer Preview · v1.1.0', href: '/quantsmind-sdk' }
    ],
    architecture:
      'Domain-oriented modules built on the SDK ontology: a System is composed of Entities; ' +
      'Entities interact and evolve State; finance modules specialise that spine for pricing, ' +
      'portfolio and risk-shaped problems. Everything runs as local Python code against the ' +
      'SDK’s finance domain packages; it is not a trading system and does not connect to ' +
      'exchanges.',
    evidence:
      'The finance and mathematics modules exist and are published on PyPI as part of the ' +
      'quantsmind package (v1.1.0). QuantsMind’s financial intelligence work is currently ' +
      'delivered as engineering engagements; no standalone financial products are classified ' +
      'in the product registry.',
    maturity: 'Domain modules in developer preview; engagements today; no classified products.',
    boundaries: [
      'No trading, execution or market-access claims',
      'No validated investment performance or return figures',
      'Coverage and numerical accuracy vary by domain; no independent benchmark has been published'
    ],
    direction:
      'Mature the finance domain modules in the SDK, publish worked examples, and let ' +
      'qualified engagements produce reusable components.',
    relatedProductIds: ['quantsmind-sdk'],
    docs: [
      { label: 'QuantsMind SDK repository', url: 'https://github.com/ajit-ai/quantsmind-quantum-sdk' },
      { label: 'PyPI — quantsmind', url: 'https://pypi.org/project/quantsmind/' }
    ]
  },
  {
    slug: 'enterprise-ai',
    title: 'Enterprise AI',
    short: 'Approval-first, project-aware AI systems for real codebases.',
    purpose:
      'An engineering portfolio for AI systems businesses can actually adopt: local coding ' +
      'agents, approval-first change workflows and policy-gated tool use. The flagship ' +
      'evidence lives in the public Agent and AI Coder projects.',
    foundations: [
      { name: 'QuantsMind AI Coder (VS Code)', status: 'Preview · v3.1.x', href: '/products/quantsmind-vscode-ai-coder' },
      { name: 'QuantsMind-Agent', status: 'Alpha · v0.9.0', href: '/products/quantsmind-agent' },
      { name: 'GuardMCP — policy control for MCP tool calls', status: 'Alpha · v0.1.0', href: '/products/guardmcp' }
    ],
    architecture:
      'Approval-first design is the common spine: the model proposes, the human disposes, ' +
      'the system enforces. Context is explicit and bounded; changes are reviewable; tool ' +
      'calls are gated by policy and permission checks; evidence reports accompany changes. ' +
      'Components compose: the Agent uses controlled tools; GuardMCP evaluates policy before ' +
      'those tools execute.',
    evidence:
      'QuantsMind AI Coder is published as a public preview on Open VSX (v3.1.0) and the ' +
      'Microsoft Visual Studio Marketplace (v3.1.1). QuantsMind-Agent v0.9.0 is a public ' +
      'GitHub release. GuardMCP is alpha. Taksh (QuantsMind-LLM) is an honest negative-result ' +
      'research release, documented under Labs & Research.',
    maturity: 'Preview and alpha-grade public tooling; engagements deliver integrations.',
    boundaries: [
      'No autonomous, unsupervised production AI systems are claimed',
      'No benchmark or model-quality superiority claims; Taksh is documented as an honest negative result',
      'Human oversight is required by design, not optional'
    ],
    direction:
      'Deepen the Agent and AI Coder projects, mature GuardMCP’s policy model, and let ' +
      'engagement work drive the parts of the stack that prove themselves in real projects.',
    relatedProductIds: ['quantsmind-vscode-ai-coder', 'quantsmind-agent', 'guardmcp'],
    docs: [
      { label: 'QuantsMind-Agent repository', url: 'https://github.com/ajit-ai/QuantsMind-Agent' },
      { label: 'QuantsMind AI Coder repository', url: 'https://github.com/Quantsmind/QuantsMind-VSCode-AI-Coder' }
    ]
  },
  {
    slug: 'data-intelligence',
    title: 'Data Intelligence',
    short: 'Telemetry ingestion, archival integrity and search.',
    purpose:
      'An engineering portfolio for serious data plumbing: telemetry ingestion, archival and ' +
      'integrity verification, and search over large collections. Current implementations are ' +
      'in development or experimental, not customer-facing products.',
    foundations: [
      { name: 'TelemetryHub — telemetry ingestion and distribution', status: 'Proposed', href: '/products/telemetry-hub' },
      { name: 'MissionArchive — archival and integrity verification', status: 'In Development', href: '/products/mission-archive' },
      { name: 'SatHealth — subsystem health monitoring', status: 'In Development', href: '/products/sat-health' },
      { name: 'Vsector — approximate nearest-neighbour search', status: 'Experimental', href: '/products/vsector' }
    ],
    architecture:
      'Bounded, honest pipelines: ingestion with backpressure limits, journaled writes with ' +
      'integrity verification, and explicit retention. Search is classical and local (no ' +
      'cloud dependency). Every component states what it does not do — no observability ' +
      'claims beyond the implemented subset.',
    evidence:
      'Registry entries exist for SatHealth, MissionOps, PassOps, MissionArchive and ' +
      'TelemetryHub (in development). Vsector is public experimental research code. None of ' +
      'this is a deployed data platform; contracts are per-engagement.',
    maturity: 'In development and experimental; nothing customer-facing is classified.',
    boundaries: [
      'No production data-platform claims',
      'Vsector is single-process only; its distributed architecture is a roadmap, not a capability',
      'No customer telemetry deployments are claimed'
    ],
    direction:
      'Ship the smallest honest primitives (ingestion, integrity, search), validate them in ' +
      'bounded engagements, and promote only what works to the Products Store.',
    relatedProductIds: ['mission-archive', 'sat-health', 'vsector'],
    docs: []
  },
  {
    slug: 'bio-intelligence',
    title: 'Bio Intelligence',
    short: 'Biology and chemistry domain modules in the SDK.',
    purpose:
      'An engineering portfolio for computational biology and chemistry: domain modules in ' +
      'the quantsmind package, aligned to the SDK’s first-principles ontology. There is no ' +
      'packaged bio product; the work happens as modules and engagements.',
    foundations: [
      { name: 'QuantsMind SDK — biology modules', status: 'Developer Preview · v1.1.0', href: '/quantsmind-sdk' },
      { name: 'QuantsMind SDK — chemistry modules', status: 'Developer Preview · v1.1.0', href: '/quantsmind-sdk' }
    ],
    architecture:
      'Biology and chemistry are modelled as domain systems in the SDK ontology — entities ' +
      'with identity, properties, state, behaviour and relationships — so that simulation ' +
      'and analysis code composes with the rest of the SDK (statistics, optimisation, ' +
      'knowledge graphs) rather than living in one-off scripts.',
    evidence:
      'The biology and chemistry packages are implemented in the SDK and published on PyPI ' +
      'as part of quantsmind v1.1.0. Coverage is a fraction of the domain; numerical ' +
      'accuracy has not been independently assessed.',
    maturity: 'Domain modules in developer preview; no products; no validated claims.',
    boundaries: [
      'No validated wet-lab results, clinical outputs or drug-discovery claims',
      'Module coverage is narrow and stated per release',
      'No independent assessment of model or numerical accuracy'
    ],
    direction:
      'Expand module coverage honestly, publish worked examples, and engage on a small, ' +
      'bounded problem where simulation is demonstrably useful.',
    relatedProductIds: ['quantsmind-sdk'],
    docs: [
      { label: 'QuantsMind SDK repository', url: 'https://github.com/ajit-ai/quantsmind-quantum-sdk' }
    ]
  },
  {
    slug: 'aerospace-intelligence',
    title: 'Aerospace Intelligence',
    short: 'Ground-segment and mission-data engineering, honestly bounded.',
    purpose:
      'An engineering portfolio for space-systems software: ground-segment tooling, telemetry ' +
      'processing and mission-support workflows — at the feasibility and development stage. ' +
      'Nothing here is flight-qualified or deployed.',
    foundations: [
      { name: 'GroundLink — ground-station frame handling', status: 'In Development', href: '/products/ground-link' },
      { name: 'TelemetryHub — telemetry ingestion and distribution', status: 'Proposed', href: '/products/telemetry-hub' },
      { name: 'MissionOps — mission operations events', status: 'In Development', href: '/products/mission-ops' }
    ],
    architecture:
      'Ground-segment thinking: frame reception, dedup and routing; telemetry journaling; ' +
      'subsystem health limits and alarms; pass scheduling. All bounded feasibility ' +
      'engineering, simulation-first, with verification written down before code.',
    evidence:
      'Registry entries exist for GroundLink, TelemetryHub, SatHealth, MissionOps, PassOps ' +
      'and MissionArchive — all in development or proposed, none flight-qualified. Work to ' +
      'date is bounded feasibility engineering; no spacecraft command uplink, deployment, or ' +
      'mission heritage is claimed.',
    maturity: 'Feasibility and development stage; nothing qualified or deployed.',
    boundaries: [
      'No flight qualification, spacecraft deployment or mission heritage claims',
      'No autonomous commanding capability',
      'Simulation and ground-software engineering only'
    ],
    direction:
      'Qualify the GroundLink pipeline against a reference telemetry format, then earn ' +
      'product status through bounded, documented verification.',
    relatedProductIds: ['ground-link', 'telemetry-hub', 'mission-ops'],
    docs: []
  },
  {
    slug: 'developer-tools',
    title: 'Developer Tools & Programming Technology',
    short: 'The Karkain platform: language, toolchain, and the editor around them.',
    purpose:
      'The portfolio where QuantsMind builds its own engineering substrate: a systems ' +
      'programming language with a self-hosted compiler, and the tooling that makes it ' +
      'usable day to day.',
    foundations: [
      { name: 'Karkain — systems programming language', status: 'Stable · v1.2.0', href: '/karkain' },
      { name: 'Karkain Language Tools (VS Code)', status: 'Released · v1.0.0', href: '/products/karkain-language-tools' },
      { name: 'QuantsMind AI Coder (VS Code)', status: 'Preview · v3.1.x', href: '/products/quantsmind-vscode-ai-coder' },
      { name: 'QuantsMind Relational DB', status: 'Alpha · v0.1.0 (pre-release)', href: '/products/quantsmind-relational-db' },
      { name: 'GuardMCP — policy control for MCP tool calls', status: 'Alpha · v0.1.0', href: '/products/guardmcp' }
    ],
    architecture:
      'A self-hosted compiler written in Karkain itself: lexing, parsing, semantic analysis, ' +
      'SSA IR with constant folding and dead-code elimination, a verifier, and two exit ' +
      'paths — a qualified native backend (ELF / PE / Mach-O, no C toolchain on PATH) or the ' +
      'C23 backend for host compilers. Ownership-based memory safety, native concurrency, ' +
      'and a target-triple model covering x86_64, aarch64 and wasm32.',
    evidence:
      'Karkain v1.2.0 (Stable) was released 2026-11-14 as a locally built release (the CI ' +
      'release matrix could not run; the caveat is stated in the release notes). The ' +
      'self-hosted front-end builds Karkain programs today. Mach-O claims are structural ' +
      'only; no Mach-O binary has been executed. Karkain Language Tools v1.0.0 is verified ' +
      'on Open VSX and GitHub.',
    maturity: 'Karkain stable (with qualified-subset limits); the rest alpha/preview.',
    boundaries: [
      'Native targets implement a qualified subset; floats, for..in, map literals and string equality/slicing are refused by name',
      'Mach-O is structural only; never executed on macOS hardware',
      'GPU/NPU/quantum targets are architecture, not capability',
      'No independent performance or reliability assessment of Karkain has been carried out'
    ],
    direction:
      'Karkain v1.3.0 work: discharge the carried bootstrap and stdlib_v2 no-C conditions, ' +
      'and keep publishing the honest subset.',
    relatedProductIds: ['karkain', 'karkain-language-tools', 'quantsmind-vscode-ai-coder', 'quantsmind-relational-db'],
    docs: [
      { label: 'Karkain repository', url: 'https://github.com/ajit-ai/Karkain' },
      { label: 'Karkain release notes (v1.2.0)', url: 'https://github.com/ajit-ai/Karkain/releases/tag/v1.2.0' },
      { label: 'Karkain Language Tools repository', url: 'https://github.com/ajit-ai/Karkain-VSCode' }
    ]
  }
];

export function getPortfolioBySlug(slug: string): TechnologyPortfolio | undefined {
  return TECHNOLOGY_PORTFOLIOS.find(portfolio => portfolio.slug === slug);
}
