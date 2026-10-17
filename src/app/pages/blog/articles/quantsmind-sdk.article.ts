import { BlogArticle } from '../blog-article.model';

export const QUANTSMIND_SDK: BlogArticle = {
  slug: 'quantsmind-sdk',
  category: 'Technology',
  title: 'QuantsMind SDK: A First-Principles Layer for Scientific Modelling',
  summary:
    'QuantsMind SDK is an open, vendor-independent Python SDK published on PyPI as version 1.1.0, organised around a single ontology of ' +
    'entities, state, interactions, observations and knowledge. This article explains the modelling core, the domain packages built on it, ' +
    'and the distinction between a working software model and a scientifically validated result.',
  maturity: 'Developer preview · v1.1.0 published',
  maturityVariant: 'experimental',
  intro:
    'Scientific software tends to accumulate isolated libraries, each solving one problem in its own terms: a numerical package, a ' +
    'chemistry package, an agent framework, a graph store. The cost is paid at the boundaries, where one library\'s notion of an entity ' +
    'has to be translated into another\'s. QuantsMind SDK takes the opposite approach: define a small vocabulary for what it means to ' +
    'model a system, then let every domain specialise that same vocabulary. The result is less about any single scientific capability ' +
    'than about the consistency of the modelling layer underneath them.',
  sections: [
    {
      heading: 'The core ontology',
      blocks: [
        {
          kind: 'p',
          text:
            'At the centre of the SDK is a first-principles model of how systems behave. An entity is a thing being represented, with ' +
            'identity, properties, behaviour, relationships and constraints. State is the condition of that entity at a point in time, and ' +
            'state is what changes. An interaction is an event or operation between entities that causes state to change. An observation ' +
            'is information captured from interactions or from state. Knowledge is structured understanding derived from observations, state ' +
            'and patterns over time.'
        },
        {
          kind: 'p',
          text:
            'The value of this arrangement is that the sequence is executable. An entity can be instantiated, given state, allowed to ' +
            'inter, be observed, and have those observations folded into knowledge — and the same five steps describe a market position, a ' +
            'chemical system or an agent\'s memory. It also constrains package design: a domain package is expected to specialise the ' +
            'foundation rather than invent a parallel model, which is what keeps the packages composable.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'Why five concepts and not a general-purpose object model',
          body:
            'A narrow vocabulary forces a domain to answer concrete questions about identity, state, change and evidence. The cost is that ' +
            'some problems need more expressive modelling; the benefit is that two packages built on the foundation describe the same ' +
            'system the same way, so combining them does not require an adapter layer.',
          points: [
            'Entity: identity, properties, behaviour, relationships, constraints',
            'State: the condition that changes',
            'Interaction: the event that causes the change',
            'Observation: captured information, the raw material of understanding',
            'Knowledge: structured understanding derived over time'
          ]
        }
      ]
    },
    {
      heading: 'Package architecture',
      blocks: [
        {
          kind: 'p',
          text:
            'The SDK is layered: a foundation ontology at the bottom, mathematics above it, then domain packages that specialise both, ' +
            'with applications and future products expected to sit above those. The dependency direction is defined rather than emergent, ' +
            'which is the usual way a codebase of this size avoids becoming difficult to change. Every package is intended to be ' +
            'developable independently without entangling the others.'
        },
        {
          kind: 'p',
          text:
            'The published distribution is named quantsmind and targets Python 3.13 or newer, using modern typing, protocols and dataclass ' +
            'conventions from the start. Eight design principles govern the work — general purpose, modular, Python-native, reusable, ' +
            'explicit architecture, extensible, developer-oriented and technology-neutral — of which the last is the most consequential in ' +
            'practice: the SDK makes no assumption about which hardware, cloud, database or runtime it executes on.'
        },
        {
          kind: 'card',
          card: 'architecture',
          title: 'Layers and what sits on them',
          body:
            'Applications and future products are expected to sit above the SDK. The SDK itself contains the ontology and the mathematics ' +
            'foundation. Domain packages specialise those for chemistry, biology, astronomy, cosmology and finance, and the AI and ' +
            'knowledge packages add agent abstractions and graph traversal. The Python ecosystem supplies the substrate underneath.',
          points: [
            'Foundation: Entity, System, State, Interaction, Observation, Knowledge',
            'Mathematics: algebra, calculus, numerical methods, statistics, optimization',
            'Domain: chemistry, biology, astronomy, cosmology, finance',
            'AI and knowledge: agent loop, messages, model-backend interface, memory, tools, graph traversal and provenance'
          ]
        },
        {
          kind: 'card',
          card: 'requirements',
          title: 'What you need to use it',
          body:
            'The SDK is a Python package rather than a service or a runtime, so the prerequisites are modest.',
          points: [
            'Python: 3.13 or newer',
            'Package: quantsmind',
            'Release: v1.1.0 published, following 1.0.1 and 1.0.0',
            'Licence: Apache 2.0'
          ]
        }
      ]
    },
    {
      heading: 'Implemented capability',
      blocks: [
        {
          kind: 'p',
          text:
            'Version 1.1.0 is not a structural sketch. It contains implemented packages across mathematics — algebra, calculus, numerical ' +
            'methods, statistics and optimization — together with domain packages for chemistry, biology, astronomy, cosmology and finance, ' +
            'where the finance package covers time-value, cash-flow and bond mathematics. Two packages extend beyond physical modelling. ' +
            'The AI packages provide messages, a model-backend interface, memory, tools and an agent loop; the knowledge package provides ' +
            'graph traversal and provenance. There is also a compiler front-end package implementing an expression lexer, parser, AST, ' +
            'constant folding and evaluation.'
        },
        {
          kind: 'p',
          text:
            'Runnable domain and cross-domain examples ship with the release and are covered by an example-execution test suite, so the ' +
            'examples are executed rather than merely written. Documentation is in-repository: an architecture overview, layering model, ' +
            'package dependency rules, a foundation specification covering class lifecycle, events, validation and serialization, ' +
            'architecture decision records, and coding, naming and versioning standards.'
        },
        {
          kind: 'card',
          card: 'example',
          title: 'The developer path the packages are organised around',
          body:
            'The flow from an empty script to a knowledge structure is the same shape for every domain: define the entities involved, give ' +
            'them state, compose the interactions that change that state, capture what was observed, and derive knowledge from the ' +
            'accumulated record.',
          points: [
            'Install the quantsmind package',
            'Build the model entities for the system under study',
            'Compose the interactions that drive state changes',
            'Capture observations as the system is exercised',
            'Derive knowledge from the accumulated observations'
          ]
        }
      ]
    },
    {
      heading: 'Maturity and limitations',
      blocks: [
        {
          kind: 'p',
          text:
            'The honest framing is a developer preview with a published release. The distribution metadata carries a "Production/Stable" ' +
            'development-status classifier, but that is a self-declared packaging label rather than an independent assessment, and this ' +
            'article does not treat it as one. The project\'s own roadmap places core abstractions and an exception hierarchy, a runtime ' +
            'executor with provider contracts and simulation, and deeper AI reasoning in the next phase rather than the current release, ' +
            'with plugins, telemetry and security hardening after that.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Published release, preview maturity',
          body:
            'A version number means a release exists. It is not a claim of production readiness, and the packaging classifier on the ' +
            'package index should not be read as one.',
          points: [
            'Release: v1.1.0 on PyPI; stage presented as developer preview',
            'Shipped: mathematics, five domain packages, AI abstractions, knowledge graphs, compiler front-end',
            'Planned: core exception hierarchy, runtime executor and provider contracts, deeper AI reasoning',
            'Not assessed: independent numerical benchmarking of the domain packages'
          ]
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'A software model is not a validated result',
          body:
            'That a package runs, is tested and returns a plausible number establishes that the software behaves as its author intended. ' +
            'It does not establish that the underlying model is physically accurate, that its parameters are fitted to real data, or that ' +
            'its results would survive comparison with an experimental measurement. Module coverage and numerical accuracy vary by domain ' +
            'and are not uniformly benchmarked, so results should be validated against the relevant primary literature before they are ' +
            'relied upon.'
        }
      ]
    }
  ],
  verification: [
    { label: 'QuantsMind SDK project page', route: '/quantsmind-sdk' }
  ],
  conclusion:
    'QuantsMind SDK provides a consistent modelling foundation across mathematics, the sciences, finance, agents and knowledge graphs, ' +
    'with real implemented packages behind the 1.1.0 release. Its contribution is structural — one vocabulary applied consistently — ' +
    'and its numerical credibility is domain-specific and largely unbenchmarked, which is the distinction to keep in mind when its ' +
    'output is used for anything consequential.'
};
