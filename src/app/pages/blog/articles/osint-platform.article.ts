import { BlogArticle } from '../blog-article.model';

export const OSINT_PLATFORM: BlogArticle = {
  slug: 'quantsmind-osint-intelligence-platform',
  category: 'Labs',
  title: 'QuantsMind OSINT Intelligence Platform: Collection, Extraction and Mapping',
  summary:
    'An open-source-intelligence collection and analysis platform with a Python backend, a Vue frontend, role-based access control and an ' +
    'audit middleware that redacts sensitive payload keys. This article describes the collection-to-analysis workflow and the verification ' +
    'gaps that keep it from being an operational platform.',
  maturity: 'Experimental · verification incomplete',
  maturityVariant: 'development',
  intro:
    'Open-source intelligence work is mostly plumbing. Collect what is publicly available, extract the entities that appear in it, ' +
    'store the relationships between them, and give an analyst a map and a table to work from. Each step is individually unremarkable, and ' +
    'the difficulty is entirely in the seams: collection that respects the boundaries of the sources it touches, extraction that does ' +
    'not invent entities, storage that keeps track of who looked at what, and an interface that makes uncertainty visible. ' +
    'QuantsMind OSINT Intelligence Platform is a working assembly of those pieces whose current state is instructive mostly because of ' +
    'what remains unverified.',
  sections: [
    {
      heading: 'Collection and the analysis workflow',
      blocks: [
        {
          kind: 'p',
          text:
            'The platform follows the shape of an OSINT pipeline. Sources are collected from and normalised into stored records; entity ' +
            'extraction identifies the people, organisations, locations and identifiers those records mention; relationships between ' +
            'entities are accumulated; and the results are presented for analysis through a web interface, including a map view for ' +
            'geographically significant entities.'
        },
        {
          kind: 'p',
          text:
            'The map is the component most likely to be over-read. Geocoding in this implementation resolves coordinates from a small ' +
            'hard-coded table of cities. That means a location is plotted because it matched a known city, not because a coordinate was ' +
            'resolved from the source, and any place not in the table produces no position at all rather than an approximate one. A map ' +
            'built on that basis is a way of seeing which known places were mentioned, and reading it as geography would be a mistake.'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'What entity extraction depends on',
          body:
            'Entity extraction relies on a language model, and that model is not included in the project\'s install requirements. The ' +
            'practical consequence is that a clean installation does not have the capability it needs, and extraction behaviour depends on ' +
            'a component the project does not itself supply.',
          points: [
            'Extraction: depends on a language model',
            'Install requirements: do not include that model',
            'Geocoding: a small hard-coded city table, not real coordinate resolution',
            'Consequence: coverage and reproducibility both depend on unstated setup'
          ]
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Mentioned places are not located places',
          body:
            'A city table resolves a name to a point. It does not resolve a street, a building, an ambiguous city name in another ' +
            'country, or an organisation that happens to share a name with a place. Any map derived from it should be read as an index of ' +
            'recognised place names rather than as geographic analysis.'
        }
      ]
    },
    {
      heading: 'Backend, frontend and access control',
      blocks: [
        {
          kind: 'p',
          text:
            'The system is split into a Python backend and a Vue frontend, which is a conventional split for an application whose work is ' +
            'long-running collection and analysis on one side and interactive exploration on the other. Container and Kubernetes ' +
            'manifests ship with the project, which is what makes a consistent deployment topology possible across environments rather ' +
            'than relying on a developer machine.'
        },
        {
          kind: 'p',
          text:
            'Access control is implemented as role-based access control, so different users receive different capabilities rather than a ' +
            'single shared view of the collected data. That matters more here than in a typical internal tool, because OSINT records ' +
            'routinely contain information about identifiable people, and an analyst should not automatically see everything another ' +
            'analyst can see.'
        },
        {
          kind: 'card',
          card: 'architecture',
          title: 'Application structure',
          body:
            'A Python backend performs collection, extraction, storage and access control. A Vue frontend presents records, entities and ' +
            'map views. Role-based access control governs visibility, and audit middleware records activity across both.',
          points: [
            'Backend: Python — collection, extraction, storage, access control',
            'Frontend: Vue — analyst interface including map view',
            'Access control: role-based',
            'Audit: middleware recording activity across the request path',
            'Deployment: container and Kubernetes manifests included'
          ]
        }
      ]
    },
    {
      heading: 'Audit middleware and data handling',
      blocks: [
        {
          kind: 'p',
          text:
            'The audit middleware sits on the request path and records what happened, redacting keys whose names identify them as ' +
            'sensitive. Redaction by key name is a simple and effective first line of defence for known-sensitive fields, and it is worth ' +
            'understanding precisely because it is simple: it protects the fields whose names are known, and it cannot protect a sensitive ' +
            'value that arrives under an unremarkable key name.'
        },
        {
          kind: 'p',
          text:
            'That is a reasonable design for an experimental system and worth pairing with the observation that OSINT data is sensitive by ' +
            'nature. A platform that collects material about people inherits obligations about retention and access that an ordinary ' +
            'internal tool does not, and those obligations are not established by the presence of an audit log alone.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'Redaction by key name: what it does and does not do',
          body:
            'Key-name redaction removes values from fields that are known to be sensitive, which prevents them reaching the audit log. It ' +
            'is deterministic and cheap, and it fails open for anything sensitive that arrives under an ordinary field name. It is a useful ' +
            'layer, not a complete policy.'
        }
      ]
    },
    {
      heading: 'Maturity, verification gaps and what is not established',
      blocks: [
        {
          kind: 'p',
          text:
            'The platform has not been verified end to end, and the reasons are specific rather than general. Every recorded ' +
            'continuous-integration run failed, which means the backend test suite has never been observed to pass. Several pipeline steps ' +
            'are written so that they cannot fail the build, which removes the signal that a failing run would otherwise provide. There is ' +
            'no licence file and no release, so the project has neither a defined legal boundary for reuse nor a distributed form.'
        },
        {
          kind: 'p',
          text:
            'Taken together with the model dependency and the hard-coded geocoding described earlier, the honest summary is that the ' +
            'architecture is coherent and the components are present, while the correctness of the assembled system is unestablished. ' +
            'That distinction is the most important thing to carry away, because the component-level presence of authentication, ' +
            'role-based access control and audit logging is exactly what a reader would otherwise take for verified assurance.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Experimental, with an unverified test suite',
          body:
            'Component presence is not system verification. The project cannot currently be said to have been observed to work end to ' +
            'end, and the reasons are documented rather than unknown.',
          points: [
            'Stage: experimental, under development',
            'Continuous integration: every recorded run failed; the backend suite has never been observed to pass',
            'Pipeline integrity: some steps cannot fail the build, so they provide no signal',
            'Missing: licence file, tagged release',
            'Dependencies: entity extraction needs a model the requirements omit',
            'Geocoding: small hard-coded city table'
          ]
        },
        {
          kind: 'card',
          card: 'requirements',
          title: 'Running it in practice',
          body:
            'Deployment artefacts exist, but a working installation requires more than the repository provides, and the project carries ' +
            'no published release.',
          points: [
            'Deployment: container and Kubernetes manifests',
            'Additionally required: an entity-extraction model not listed in the requirements',
            'Licence: no licence file present',
            'Release: none'
          ]
        }
      ]
    }
  ],
  verification: [
    { label: 'QuantsMind OSINT Intelligence Platform on the QuantsMind Labs page', route: '/labs' }
  ],
  conclusion:
    'QuantsMind OSINT Intelligence Platform assembles the right components — collection, extraction, mapping, role-based access control ' +
    'and audit middleware with redaction — into a coherent architecture. What it cannot yet claim is verification: its test suite has ' +
    'never been observed to pass, its extraction depends on an uninstalled model, and its map is a city table rather than geocoding. ' +
    'It is an experimental platform whose design is worth studying and whose assurance is not yet established.'
};
