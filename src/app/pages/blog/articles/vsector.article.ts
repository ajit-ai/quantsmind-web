import { BlogArticle } from '../blog-article.model';

export const VSECTOR: BlogArticle = {
  slug: 'vsector',
  category: 'Labs',
  title: 'Vsector: Approximate Nearest-Neighbour Search in Pure Python',
  summary:
    'Vsector is a vector database written in Python, roughly 7,400 lines across 66 modules with a substantial test suite, exploring ' +
    'approximate nearest-neighbour search, write-ahead logging, sharding and replication. It is single-process only, and its distributed ' +
    'architecture is a roadmap rather than a delivered capability.',
  maturity: 'Experimental · single-process only',
  maturityVariant: 'experimental',
  intro:
    'Searching by meaning — finding the records most similar to a query rather than the records that match a predicate — requires ' +
    'representing each record as a vector and measuring distance between vectors. Done exactly, that comparison is linear in the size of ' +
    'the collection, which is fine for a few thousand records and useless for millions. The field\'s answer is approximate nearest-neighbour ' +
    'search: trade a small, measured loss of recall for a very large speed-up. Vsector is an exploration of that problem space, written ' +
    'in Python, and its value lies as much in what it deliberately leaves out as in what it does.',
  sections: [
    {
      heading: 'Embeddings and similarity search',
      blocks: [
        {
          kind: 'p',
          text:
            'An embedding maps a piece of text, an image or a sound to a fixed-length vector of numbers such that items close in meaning ' +
            'land close together in that space. Once records are represented this way, "similar to this" becomes a geometric question: ' +
            'which stored vectors are nearest to the query vector. The quality of any such search is bounded by the quality of the ' +
            'embedding model, which is a separate problem the database does not solve — it can only be given better vectors to organise.'
        },
        {
          kind: 'p',
          text:
            'The similarity measure is a design choice rather than a detail. Cosine similarity compares direction and ignores magnitude, ' +
            'which suits text embeddings; Euclidean distance compares absolute position. Vsector works over vector similarity rather than ' +
            'over raw string matching, which is the property that makes it useful for semantic retrieval and useless for exact lookup.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'Why approximate rather than exact',
          body:
            'An exhaustive search compares the query against every stored vector, so its cost grows linearly with the collection. An ' +
            'approximate index partitions the space — most commonly into hierarchical navigable small-world clusters — so that a query visits ' +
            'only a subset of the data, chosen because neighbouring vectors are usually in the same cluster. The result is a bounded search ' +
            'cost at the price of occasionally missing a true nearest neighbour.',
          points: [
            'Exact search: linear in collection size, perfect recall',
            'Approximate search: sub-linear, with a measurable recall loss',
            'Recall is a tunable trade-off, not a quality score',
            'Embedding quality, not the database, determines semantic accuracy'
          ]
        }
      ]
    },
    {
      heading: 'Indexing and storage',
      blocks: [
        {
          kind: 'p',
          text:
            'Vectors are held in an indexed structure that supports insertion, update and deletion alongside search, and the project ' +
            'explores the durability concerns that a vector database inherits from ordinary database design. A write-ahead log records ' +
            'operations before they are applied, so that a crash leaves enough information to replay or discard partial work — the same ' +
            'principle a conventional transactional engine uses, applied to a workload that is overwhelmingly append-heavy.'
        },
        {
          kind: 'p',
          text:
            'Sharding and replication are the other two inherited concerns. Sharding partitions the collection so total capacity and ' +
            'parallelism can grow with more machines. Replication keeps copies so that availability survives the loss of a node. Both are ' +
            'part of the project\'s design, and both are the subject of the limitation discussed below.'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'What the project is made of',
          body:
            'Roughly 7,400 lines of Python across 66 modules, accompanied by a substantial test suite. The structure and the test volume ' +
            'are the parts worth noting, because they indicate a project built to explore design space rather than to ship a product.',
          points: [
            'Language: Python',
            'Size: approximately 7,400 lines across 66 modules',
            'Testing: a substantial suite relative to the codebase',
            'Focus: approximate nearest-neighbour search, write-ahead logging, sharding, replication',
            'Licence: MIT'
          ]
        }
      ]
    },
    {
      heading: 'Query behaviour and how it should be measured',
      blocks: [
        {
          kind: 'p',
          text:
            'A query returns the nearest stored vectors to the query vector, and the interesting question is what that costs and what it ' +
            'misses. Both are properties of the index configuration rather than of the library API, which means they must be measured ' +
            'against a specific dataset — and that is precisely where the published figures need context.'
        },
        {
          kind: 'p',
          text:
            'The benchmark figures were measured on a 2,000-vector, 32-dimensional dataset. That is a legitimate smoke test of whether the ' +
            'code works, and it is far too small to say anything about how the index behaves at scale: at 2,000 vectors a linear scan is ' +
            'already fast, so the gap an approximate index is meant to close has barely begun to appear. Quoting a number from that ' +
            'dataset as a performance characteristic would be misleading.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'A benchmark on a tiny collection measures overhead',
          body:
            'When the dataset is small enough that exhaustive search is fast, a benchmark mostly measures the fixed cost of the index ' +
            'itself and the quality of its recall. It says nothing about how the approach scales, and treating those numbers as a ' +
            'performance claim about vector search would overstate what was measured.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Experimental, single-process, unreleased',
          body:
            'The distributed architecture described in the project\'s documentation is a roadmap. The code that exists today is a ' +
            'single-process system.',
          points: [
            'Stage: experimental',
            'Process model: single process only',
            'Absent: cross-node transport, consensus, leader election, failover, shard migration',
            'Benchmarks: 2,000 vectors at 32 dimensions — a smoke test, not a scale measurement',
            'Versions: tagged releases run ahead of the manifest version; no published release'
          ]
        }
      ]
    }
  ],
  verification: [
    { label: 'Vsector on the QuantsMind Labs page', route: '/labs' }
  ],
  conclusion:
    'Vsector is a well-organised Python exploration of the vector-search problem — approximate search, write-ahead durability and the ' +
    'index structures that make nearest-neighbour queries practical — with real tests behind it. Its single-process limit is the defining ' +
    'constraint, and its benchmark numbers come from a dataset too small to characterise scale, so the honest use of the project today ' +
    'is to study the design rather than to quote its figures.'
};
