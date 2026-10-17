import { BlogArticle } from '../blog-article.model';

export const RELATIONAL_DB: BlogArticle = {
  slug: 'quantsmind-relational-db',
  category: 'Technology',
  title: 'QuantsMind Relational DB: An Embeddable Engine Written in Rust',
  summary:
    'An embeddable relational database engine written in Rust, shipping as a library, a Postgres-wire-compatible server, a CLI shell and ' +
    'a native desktop studio. It implements a documented SQL subset over a multi-version concurrency control and write-ahead log storage ' +
    'kernel, with recovery by redo and no physical checkpoints.',
  maturity: 'Alpha · v0.1.0 pre-release',
  maturityVariant: 'prototype',
  intro:
    'Database engines are usually discussed as products with compatibility claims: which dialect is supported, which wire protocol is ' +
    'spoken, what does a backup restore. QuantsMind Relational DB is more interesting read as a kernel. Its organising decision is to build ' +
    'a general storage kernel first — key-value storage, indexes, multi-version concurrency control and a write-ahead log — and treat the ' +
    'relational model as one layer on top. That layering explains both what it does well and where its limits are, because a general ' +
    'kernel can be extended with new models without rewriting, and can also carry complexity that a single-purpose engine would never ' +
    'take on.',
  sections: [
    {
      heading: 'The kernel-first design',
      blocks: [
        {
          kind: 'p',
          text:
            'The core is a storage kernel rather than a table engine. It provides key-value storage with indexes, multi-version ' +
            'concurrency control, and a write-ahead log. Relational, document and key-value access patterns are then model layers built on ' +
            'that substrate, which means a new data model is an additive feature rather than a rewrite. The project also targets hybrid ' +
            'transactional and analytical workloads from the outset: the row store serves online transaction processing, while a ' +
            'persistent columnar replica is intended to serve analytical reads.'
        },
        {
          kind: 'p',
          text:
            'The engine is explicit about its priorities. Correctness is stated as the governing concern — the concurrency control and ' +
            'recovery paths are fuzzed and property-tested, on the stated principle that silent corruption is the one unacceptable bug — ' +
            'and performance is treated as a contract, meaning each milestone carries numeric exit criteria enforced by benchmarks rather ' +
            'than aspirational targets. That is the right ordering for a database, and it is also why the current version can be ' +
            'described as feature-complete for its subset while still being explicitly experimental.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'What multi-version concurrency control buys you',
          body:
            'MVCC keeps multiple versions of a row rather than overwriting in place. A reader takes a snapshot and reads the version ' +
            'visible to it, while a writer creates a new version. Readers therefore never block writers and never see a partial update, ' +
            'because their snapshot is fixed. The cost is that obsolete versions must be reclaimed, and that the write-ahead log has to ' +
            'carry enough information to reconstruct the surviving versions after a crash.'
        },
        {
          kind: 'card',
          card: 'architecture',
          title: 'The engine as five crates',
          body:
            'The workspace separates the storage kernel, the SQL layer, the embeddable interface, the server and the shell, so that the ' +
            'database can be used as a library without any of the server or user-interface code being involved.',
          points: [
            'qmind-kernel: key-value and index storage, MVCC, write-ahead log',
            'qmind-sql: parser, executor and query operators',
            'qmind-embed: JSON contract for embedding and for host integration',
            'qmind-server: wire-protocol listener and session handling',
            'qmind-cli: the command-line shell'
          ]
        }
      ]
    },
    {
      heading: 'The supported SQL subset',
      blocks: [
        {
          kind: 'p',
          text:
            'The SQL layer is a handwritten parser feeding a Volcano-style iterator executor, which is the conventional design in which ' +
            'each operator is a node that produces rows on demand from the node below it. The documented surface covers table ' +
            'definition through CREATE TABLE and data manipulation through INSERT and SELECT. The operator set — sequential scan, ' +
            'filter, projection, limit, hash join and hash aggregation — is what a plan for those statements is built from.'
        },
        {
          kind: 'p',
          text:
            'Stating the subset explicitly matters more than it might appear. PostgreSQL compatibility is a property of a dialect and a ' +
            'wire protocol, not of an engine, and an engine that accepts a subset does not thereby become a PostgreSQL implementation. ' +
            'Code written for this engine should assume the documented subset and verify anything outside it.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Wire compatibility is not dialect compatibility',
          body:
            'The server speaks the PostgreSQL wire protocol version 3, which is what allows existing drivers and a psql session to ' +
            'connect. That describes how messages are framed and typed on the socket. It says nothing about which SQL constructs the engine ' +
            'accepts, how it plans them, or how it behaves under concurrency. The two must be kept separate when assessing what the ' +
            'engine can do.'
        },
        {
          kind: 'card',
          card: 'example',
          title: 'Writing inside the supported subset',
          body:
            'The example uses the three statements the SQL layer documents, in the shapes it documents: CREATE TABLE for definition, ' +
            'INSERT for rows, and SELECT with a WHERE clause for retrieval. The filter is satisfied by a filter operator above a ' +
            'sequential scan.',
          code: [
            'CREATE TABLE invoice (',
            '  id     INTEGER,',
            '  number TEXT,',
            '  total  REAL',
            ');',
            '',
            "INSERT INTO invoice VALUES (1, 'INV-4471', 1280.50);",
            '',
            'SELECT number, total FROM invoice WHERE total > 1000;'
          ].join('\n'),
          codeLabel: 'SQL (documented subset)'
        }
      ]
    },
    {
      heading: 'Storage, transactions and recovery',
      blocks: [
        {
          kind: 'p',
          text:
            'Durability rests on a write-ahead log. Before a change is applied to the storage structures, the intended change is recorded ' +
            'in the log, so that a crash leaves a log that describes work which may not have reached the data files. Recovery replays that ' +
            'log. The recovery procedure rebuilds the catalog from the data-definition records in the log, redoes committed ' +
            'transactions, and recomputes the derived state — index entries in particular — that the redo pass depends on.'
        },
        {
          kind: 'p',
          text:
            'This is redo-only recovery without physical checkpoints, and it is the single most consequential limitation in the engine ' +
            'today. Because there are no periodic snapshots that bound the amount of work a restart must perform, recovery replays the ' +
            'log from the beginning of available history. Both physical checkpoints and log rotation are recorded in the project as ' +
            'planned rather than delivered work. For long-lived databases with large logs, that is a real operational constraint, not a ' +
            'footnote.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Redo-only recovery, in plain terms',
          body:
            'The engine can guarantee that a committed transaction survives a crash, because the log always contains committed work that ' +
            'can be reapplied. What it cannot yet do is checkpoint — take a cheap physical snapshot at a known point so restart is fast. ' +
            'Restart time therefore grows with the size of the retained log, and the mechanism that would normally bound it is not built.'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'What recovery actually does',
          body:
            'Recovery is a three-step reconstruction rather than a rollback: catalog from DDL records, redo of committed transactions, ' +
            'then recomputation of derived state such as indexes. Rollback of uncommitted work is handled by the concurrency control model ' +
            'during normal operation, not by an undo pass at startup.',
          points: [
            'Catalog: rebuilt from data-definition records in the log',
            'Redo: committed transactions are replayed',
            'Recompute: derived structures are rebuilt',
            'Planned (R3): physical checkpoints and write-ahead log rotation'
          ]
        }
      ]
    },
    {
      heading: 'Embedding, server and desktop studio',
      blocks: [
        {
          kind: 'p',
          text:
            'The engine is packaged four ways because the intended uses differ. As a library it can be embedded directly, with the ' +
            'qmind-embed crate providing a JSON contract for host integration. As a server it listens for the PostgreSQL wire protocol ' +
            'over TCP and manages sessions, which is what makes ordinary drivers and the CLI usable. The CLI provides a shell for ' +
            'interactive work. And a native desktop studio gives a graphical environment for working with the same engine.'
        },
        {
          kind: 'p',
          text:
            'The desktop studio is a Tauri 2 application with a React front end, which is worth noting because it explains why the ' +
            'repository is not a pure Rust workspace: a graphical tool needs a front-end toolchain alongside it. For readers deciding how ' +
            'to deploy the engine, the practical guidance is that the server and library artefacts do not depend on any of the studio\'s ' +
            'web technology.'
        },
        {
          kind: 'card',
          card: 'requirements',
          title: 'Building and distribution',
          body:
            'The engine is built from source. It has not been published to a package registry as a consumable crate or npm package, so ' +
            'building the workspace is the route to using it.',
          points: [
            'Build: from the Rust workspace source',
            'Not published: crates.io and npm distributions',
            'Version: 0.1.0, published as a pre-release',
            'Licence: MIT',
            'Documentation: RST sources, buildable locally with Sphinx'
          ]
        }
      ]
    },
    {
      heading: 'Differences from production databases',
      blocks: [
        {
          kind: 'p',
          text:
            'The distance between this engine and a production database is not primarily a feature list; it is a set of operational ' +
            'guarantees that have not yet been built. There are no physical checkpoints, so restart cost scales with the log. There is no ' +
            'replication, no failover and no high-availability story. The analytical path through the columnar replica is batched and, on ' +
            'the project\'s own description, not yet vectorised. A SQL subset without full conformance will reject queries that a ' +
            'PostgreSQL installation accepts, and no claim of complete PostgreSQL compatibility is made or demonstrated.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Alpha, and what that reserves',
          body:
            'Version 0.1.0 is a pre-release. The README describes the engine as feature-complete for its SQL subset and not yet ' +
            'production-hardened, which is an accurate summary of a working engine without operational durability guarantees.',
          points: [
            'Stage: alpha, version 0.1.0 pre-release',
            'Present: MVCC, write-ahead log, redo-only recovery, documented SQL subset',
            'Absent: physical checkpoints, log rotation, replication, failover',
            'Not claimed: full SQL conformance or PostgreSQL compatibility'
          ]
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Where the analytical path stands',
          body:
            'The columnar replica exists to serve analytical reads so that reporting does not contend with transactional traffic on the ' +
            'row store. Its read path is batched rather than SIMD-vectorised, which means it is a genuine second path, not yet a fast one. ' +
            'Design intent and delivered performance are worth keeping distinct here.'
        }
      ]
    }
  ],
  verification: [
    { label: 'QuantsMind Relational DB on the Technology Ecosystem page', route: '/technology' }
  ],
  conclusion:
    'QuantsMind Relational DB is a real, embeddable engine with a thoughtful layering — a multi-version concurrency control and ' +
    'write-ahead log kernel underneath a relational model, wrapped for library, server, shell and desktop use. What it does today is ' +
    'executed well within a documented SQL subset. What it does not yet have is the operational durability layer a production database ' +
    'is assumed to provide, and the missing checkpoints are the most consequential of those gaps.'
};
