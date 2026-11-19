/**
 * Verified research-item registry for Labs & Research.
 *
 * Each entry is an honest account of an experimental effort: objective,
 * problem, status, methodology, evidence and limitations. Nothing here claims
 * a validated outcome, a deployment or a released product unless it is true.
 */
export interface ResearchItem {
  readonly slug: string;
  readonly name: string;
  readonly theme: string;
  /** Short status label, e.g. Experimental, Feasibility Study, Research Release. */
  readonly status: string;
  readonly objective: string;
  /** The hypothesis or problem being investigated. */
  readonly problem: string;
  readonly methodology: string;
  /** What the evidence actually shows, stated conservatively. */
  readonly evidence: string;
  readonly limitations: readonly string[];
  readonly nextMilestone: string;
  readonly maturity: 'proposed' | 'in-development' | 'research-prototype' | 'experimental';
  readonly repoUrl?: string;
  /** Registry product id this effort produced, if any. */
  readonly relatedProductId?: string;
  /** External evidence pointers (article, release notes). */
  readonly links: readonly { label: string; url: string }[];
}

export const RESEARCH_ITEMS: readonly ResearchItem[] = [
  {
    slug: 'vsector',
    name: 'Vsector',
    theme: 'Data Intelligence',
    status: 'Experimental',
    objective: 'Explore approximate nearest-neighbour search in pure Python without external dependencies.',
    problem:
      'Can a dependency-free pure-Python vector store deliver useful recall and throughput for ' +
      'small-to-medium collections, and what does a distributed design actually require?',
    methodology:
      'Implement ANN indexes, write-ahead logging, sharding and replication scaffolding; measure ' +
      'recall and latency on committed benchmark data; compare against published reference numbers.',
    evidence:
      'Roughly 7,400 lines across 66 modules with a substantial test suite. Published benchmark ' +
      'figures were measured on a 2,000-vector, 32-dimensional toy dataset — they are a ' +
      'correctness check, not a scalability result. Tagged versions run ahead of the package ' +
      'manifest; no release has been published.',
    limitations: [
      'Single-process only: no cross-node transport, consensus, leader election, failover or shard migration',
      'The distributed architecture in the README is a roadmap, not a capability',
      'Benchmark numbers are toy-scale and not evidence of production behaviour',
      'Tagged versions do not match the package manifest'
    ],
    nextMilestone: 'Honest evaluation of the single-node index against standard ANN datasets before any distributed work.',
    maturity: 'research-prototype',
    repoUrl: 'https://github.com/ajit-ai/Vsector',
    relatedProductId: 'vsector',
    links: [
      { label: 'Vsector article', url: 'https://www.quantsmind.com/insights/vsector/' }
    ]
  },
  {
    slug: 'osint-intelligence-platform',
    name: 'QuantsMind OSINT Intelligence Platform',
    theme: 'Data Intelligence',
    status: 'Experimental · Under Development',
    objective: 'Investigate open-source-intelligence collection and analysis workflows with auditable boundaries.',
    problem:
      'Can a single platform collect, normalise and analyse public-source intelligence while ' +
      'preserving role-based access, audit logging and source attribution?',
    methodology:
      'Python backend, Vue frontend, role-based access control, audit middleware that redacts ' +
      'sensitive payload keys, container and Kubernetes manifests. Investigated under feasibility evaluation only.',
    evidence:
      'The repository exists and is public. The backend test suite has not passed; there is no ' +
      'licence file and no release. The platform is not offered as a production-ready product.',
    limitations: [
      'Backend test suite has not passed',
      'No licence file and no releases',
      'Under feasibility evaluation; not a product and not production-ready',
      'Collection sources and legal boundaries are deliberately unspecified until feasibility concludes'
    ],
    nextMilestone: 'Decide, based on the feasibility evaluation, whether to continue, narrow, or stop the effort.',
    maturity: 'research-prototype',
    repoUrl: 'https://github.com/ajit-ai/Quantsmind-OSINT-Intelligence-Platform',
    links: [
      { label: 'OSINT article', url: 'https://www.quantsmind.com/insights/quantsmind-osint-intelligence-platform/' }
    ]
  },
  {
    slug: 'fake-news-detection',
    name: 'QuantsMind AI Fake News Detection System',
    theme: 'Machine Learning',
    status: 'Feasibility Study',
    objective: 'Study the boundary between a plausible-sounding classifier and an honest one.',
    problem:
      'Can a small model trained on a committed corpus detect fabricated news reliably enough to ' +
      'be useful — and can that claim be substantiated?',
    methodology:
      'Cleaning pipeline, training script, evaluation harness, small HTTP prediction service, ' +
      'Dockerfile and Python packaging. Evaluation reported on a synthetic dataset generated ' +
      'from a handful of title/body templates.',
    evidence:
      'The committed evaluation report shows a perfect score, but that score was measured on a ' +
      'synthetic template corpus any classifier separates perfectly. It does not measure ' +
      'real-world fake-news detection. No trained model checkpoint is included; absent one, the ' +
      'service loads an untuned base model with an untrained classification head.',
    limitations: [
      'Reported accuracy is not independently validated and must not be relied on',
      'Perfect score is an artefact of a synthetic template corpus',
      'No trained model checkpoint is included',
      'No licence file and no release'
    ],
    nextMilestone: 'Either source a defensible real-world corpus with a pre-registered evaluation protocol, or stop the study.',
    maturity: 'research-prototype',
    repoUrl: 'https://github.com/ajit-ai/Quantsmind-AI-Fake-News-Detection-System',
    links: [
      { label: 'Fake News article', url: 'https://www.quantsmind.com/insights/quantsmind-fake-news-detection/' }
    ]
  },
  {
    slug: 'taksh',
    name: 'Taksh (QuantsMind-LLM)',
    theme: 'Artificial Intelligence',
    status: 'Research Release · v1.0.0',
    objective: 'Train a code-oriented language model from scratch and measure what it can and cannot do.',
    problem:
      'What does the full path — corpus, tokenizer, Transformer, training, evaluation, serving — ' +
      'look like when implemented honestly and end to end, and what does it actually achieve?',
    methodology:
      'Own Transformer implementation (RMSNorm, rotary embeddings, grouped-query attention, ' +
      'SwiGLU), own BPE tokenizer, training and fine-tuning loops, local inference plus FastAPI ' +
      'serving, experiment records committed alongside the code.',
    evidence:
      'Taksh v1.0.0 (2026-10-21) publishes the source tree and experiment records as an honest ' +
      'negative result: 0/40 locked syntax-valid generations, 0/8 functional tasks, evidence ' +
      'level 0. It is not a model-weights release and does not distribute training or ' +
      'evaluation data.',
    limitations: [
      'Honest negative result: the model does not generate usable code reliably',
      'No model weights are distributed',
      'Training corpus is smaller than the shipped training configuration requests',
      'Committed tokenizer vocabulary does not match the declared size',
      'Code evaluation uses a small hand-written problem set, not HumanEval or MBPP',
      'No independent model-quality assessment has been carried out'
    ],
    nextMilestone: 'Not a release task. Either a defensible training corpus at the declared scale, or the effort stops here.',
    maturity: 'research-prototype',
    relatedProductId: 'taksh',
    links: [
      { label: 'Taksh v1.0.0 release notes', url: 'https://github.com/ajit-ai/QuantsMind-LLM/releases/tag/v1.0.0' },
      { label: 'Taksh article', url: 'https://www.quantsmind.com/insights/quantsmind-llm/' }
    ]
  }
];

export const RESEARCH_THEMES: readonly string[] = [
  'Artificial Intelligence',
  'Machine Learning',
  'Quantum Computing',
  'Programming Languages',
  'Scientific Computing',
  'Data Intelligence',
  'Developer Technologies'
];

export function getResearchItemBySlug(slug: string): ResearchItem | undefined {
  return RESEARCH_ITEMS.find(item => item.slug === slug);
}

export function getResearchItemsByTheme(theme: string): ResearchItem[] {
  return RESEARCH_ITEMS.filter(item => item.theme === theme);
}
