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
    maturity: 'Stable',
    version: 'v1.2.0',
    route: '/karkain',
    repository: 'https://github.com/ajit-ai/Karkain',
    distribution: 'GitHub Releases',
    evidence: 'Karkain v1.2.0 Stable release (2026-11-14) with local-build caveat documented in release notes; self-hosted native targets (ELF/PE/Mach-O) with no C toolchain on PATH.',
    verified: true
  },
  {
    id: 'karkain-language-tool',
    name: 'Karkain Language Tools (VS Code Extension)',
    summary: 'VS Code extension providing editor support for the Karkain programming language.',
    category: 'a1-programming-languages',
    source: 'verified-directory',
    maturity: 'Released',
    version: 'v1.0.0',
    distribution: 'Open VSX (karkain.karkain)',
    route: '/karkain',
    repository: 'https://github.com/ajit-ai/Karkain-VSCode',
    evidence: 'Open VSX namespace karkain/extension karkain, version 1.0.0, verified, published 2026-11-14; GitHub release v1.0.0 (2026-11-14). Not on the Microsoft Visual Studio Marketplace.',
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
    name: 'Taksh (QuantsMind-LLM)',
    summary: 'Honest negative-result source release of a Transformer-based code language model research effort (M7), including tokenizer, training, evaluation and serving code.',
    category: 'a3-language-models',
    source: 'verified-directory',
    maturity: 'Research Release',
    version: 'v1.0.0',
    license: 'Apache-2.0',
    route: '/technology',
    repository: 'https://github.com/ajit-ai/QuantsMind-LLM',
    evidence: 'Source release Taksh v1.0.0 (2026-10-21); Apache-2.0; explicitly not a model weights release; honest negative result (0/40 locked syntax-valid generations, 0/8 functional tasks, evidence level 0).',
    verified: true
  },
  {
    id: 'quantsmind-vscode-ai-coder',
    name: 'QuantsMind AI Coder (VS Code Extension)',
    summary: 'Agentic, project-aware AI coding for VS Code with explicit context control and approval-first changes.',
    category: 'a2-ai-development',
    secondaryCategory: 'a3-language-models',
    source: 'verified-directory',
    maturity: 'Preview',
    version: 'v3.1.x',
    route: '/technology',
    repository: 'https://github.com/Quantsmind/QuantsMind-VSCode-AI-Coder',
    distribution: 'Open VSX (quantsmind.quantsmind-vscode-ai-coder) and Microsoft Visual Studio Marketplace (3.1.1)',
    evidence: 'Published on Open VSX (quantsmind.quantsmind-vscode-ai-coder v3.1.0, preview, 202 downloads, 2026-11-13) and Microsoft Visual Studio Marketplace (itemName quantsmind.quantsmind-vscode-ai-coder v3.1.1, preview, 2 installs); GitHub release v3.1.1 (2026-11-13).',
    verified: true
  },
  {
    id: 'quantsmind-agent-directory',
    name: 'QuantsMind-Agent',
    summary: 'A local coding agent with permission-aware tool use, now with versioned workspace snapshots and workspace-aware planning.',
    category: 'a2-ai-development',
    secondaryCategory: 'a3-language-models',
    source: 'verified-directory',
    maturity: 'Alpha',
    version: 'v0.9.0',
    route: '/technology',
    repository: 'https://github.com/ajit-ai/QuantsMind-Agent',
    evidence: 'Public source release v0.9.0 “Workspace Intelligence” (GitHub release 2026-10-20); 0.x line, not a 1.0 release; no trained model weights published as part of this project.',
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