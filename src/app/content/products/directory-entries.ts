/**
 * Verified Technology & Product Directory entries.
 *
 * These are technologies and products that QuantsMind develops and publishes,
 * backed by evidence such as routes, documentation, blog articles or external
 * distribution channels — but which do not have a product registry record.
 *
 * Registry products (the 41 entries in product.registry.ts) are NOT duplicated here.
 * Every entry is classified as `verified-directory` and sourced from evidence.
 */

export type DirectorySource = 'verified-directory';

export interface VerifiedDirectoryEntry {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly category: string;
  readonly source: DirectorySource;
  readonly maturity?: string;
  readonly version?: string;
  readonly license?: string;
  readonly route?: string;
  readonly repository?: string;
  readonly distribution?: string;
  readonly evidence: string;
  readonly verified: boolean;
  /**
   * Secondary classification applied when a verified technology spans adjacent
   * categories. For example, an agent platform can be classified both as an AI
   * development platform and as a language model. The technology stays listed
   * under its primary category and is also surfaced under the secondary one.
   */
  readonly secondaryCategory?: string;
}

export const VERIFIED_DIRECTORY_ENTRIES: readonly VerifiedDirectoryEntry[] = [
  {
    id: 'karkain-compiler-toolchain',
    name: 'Karkain Compiler & Toolchain',
    summary: 'Self-hosted compiler, CLI and toolchain for the Karkain programming language.',
    category: 'a1-programming-languages',
    source: 'verified-directory',
    maturity: 'Developer Preview',
    version: 'v1.1.0',
    route: '/karkain',
    evidence: 'Karkain language documentation and route /karkain; compiler written in Karkain itself.',
    verified: true
  },
  {
    id: 'karkain-language-tool',
    name: 'Karkain Language Tool (VS Code Extension)',
    summary: 'VS Code extension providing editor support for the Karkain programming language.',
    category: 'a1-programming-languages',
    source: 'verified-directory',
    maturity: 'Developer Preview',
    distribution: 'Microsoft Visual Studio Marketplace',
    route: '/karkain',
    evidence: 'Listed in the Microsoft Visual Studio Marketplace (itemName=Karkain.karkain).',
    verified: true
  },
  {
    id: 'quantsmind-sdk-directory',
    name: 'QuantsMind SDK',
    summary: 'Open, vendor-independent Python SDK for scientific computing.',
    category: 'a1-programming-languages',
    source: 'verified-directory',
    maturity: 'Developer Preview',
    version: 'v1.1.0',
    license: 'Apache-2.0',
    route: '/quantsmind-sdk',
    distribution: 'PyPI — quantsmind',
    evidence: 'Published on PyPI at version 1.1.0; route /quantsmind-sdk; Apache-2.0 licence.',
    verified: true
  },
  {
    id: 'quantsmind-llm-directory',
    name: 'QuantsMind-LLM',
    summary: 'Research prototype implementing a Transformer-based language model from scratch, including tokenizer, training loop, local inference and serving path.',
    category: 'a3-language-models',
    source: 'verified-directory',
    maturity: 'Research Prototype · No validated release',
    route: '/technology',
    evidence: 'Blog article quantsmind-llm and Technology page research prototype status; no validated release.',
    verified: true
  },
  {
    id: 'quantsmind-vscode-ai-coder',
    name: 'QuantsMind VSCode AI Coder',
    summary: 'AI-powered coding assistance for Visual Studio Code.',
    category: 'a2-ai-development',
    secondaryCategory: 'a3-language-models',
    source: 'verified-directory',
    maturity: 'Alpha',
    distribution: 'Microsoft Visual Studio Marketplace',
    evidence: 'Listed in the Microsoft Visual Studio Marketplace (itemName=quantsmind.quantsmind-vscode-ai-coder).',
    verified: true
  },
  {
    id: 'quantsmind-agent-directory',
    name: 'QuantsMind-Agent',
    summary: 'A local coding agent with permission-aware tool use.',
    category: 'a2-ai-development',
    secondaryCategory: 'a3-language-models',
    source: 'verified-directory',
    maturity: 'Alpha',
    version: 'v0.2.0 (in-repository, unreleased)',
    route: '/technology',
    evidence: 'Blog article quantsmind-agent; declared version 0.2.0 exists only inside the repository; no release published; no package distributed.',
    verified: true
  },
  {
    id: 'quantsmind-relational-db-directory',
    name: 'QuantsMind Relational DB',
    summary: 'Embeddable relational database engine with MVCC and write-ahead log storage.',
    category: 'a4-scientific-data-quantum',
    source: 'verified-directory',
    maturity: 'Alpha',
    version: 'v0.1.0 (pre-release)',
    route: '/technology',
    evidence: 'Blog article quantsmind-relational-db: Alpha, v0.1.0 pre-release; native desktop studio; SQL subset.',
    verified: true
  },
  {
    id: 'guardmcp-directory',
    name: 'GuardMCP',
    summary: 'Policy control for agent tool calls — MCP security and permission boundaries.',
    category: 'a2-ai-development',
    source: 'verified-directory',
    maturity: 'Alpha',
    route: '/technology',
    evidence: 'Blog article guardmcp; exists in the open at the time of writing as an alpha-stage tool.',
    verified: true
  },
  {
    id: 'vsector-directory',
    name: 'Vsector',
    summary: 'Approximate nearest-neighbor search in pure Python.',
    category: 'a4-scientific-data-quantum',
    source: 'verified-directory',
    maturity: 'Experimental',
    route: '/labs',
    evidence: 'Blog article vsector; experimental research code, not a released product.',
    verified: true
  }
];

export const VERIFIED_DIRECTORY_NOTE =
  'Verified Technology entries are independently evidenced QuantsMind technologies and products that do not have a product registry record. Registered Products are the 41 entries in the product registry. Counts are reported separately.';