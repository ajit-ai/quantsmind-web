import { BlogArticle } from '../blog-article.model';

export const GUARDMCP: BlogArticle = {
  slug: 'guardmcp',
  category: 'Technology',
  title: 'GuardMCP: Policy Control for Agent Tool Calls',
  summary:
    'GuardMCP is a Python library and control layer that evaluates policy, risk, budget and delegation before an agent calls a protected ' +
    'Model Context Protocol tool, and inspects the result afterwards. This article explains the interception model, the decision pipeline ' +
    'and its security boundaries, and states plainly which services are implemented and which are not.',
  maturity: 'Alpha · core distribution, no deployed services',
  maturityVariant: 'prototype',
  intro:
    'The Model Context Protocol gave agents a standard way to call external tools, and in doing so inherited every question that ' +
    'attaches to letting a language model cause effects in the real world. If a model can read a file, send a message or invoke a ' +
    'payment endpoint, then somewhere there must be a decision about whether this particular call, by this particular caller, with these ' +
    'particular arguments, is permitted. GuardMCP is an attempt to make that decision an explicit, inspectable component rather than a ' +
    'property of the surrounding application code.',
  sections: [
    {
      heading: 'What the Model Context Protocol changed',
      blocks: [
        {
          kind: 'p',
          text:
            'The protocol standardises how a client discovers what tools a server offers, how it describes their parameters, and how it ' +
            'invokes them and receives structured results. That standardisation is genuinely useful, and it is also what makes a ' +
            'policy layer possible at all. If every tool call looked different, a cross-cutting control could not exist; because they share ' +
            'a protocol, a single component can sit between caller and tool and apply the same reasoning to all of them.'
        },
        {
          kind: 'p',
          text:
            'The security question this raises is not hypothetical. An agent that can call tools can be induced to call the wrong ones — by ' +
            'prompt injection in retrieved content, by a compromised or confused dependency, or simply by an error in a plan. The ' +
            'governing principle in GuardMCP is stated plainly: no protected tool execution happens without a guard decision.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'A tool call is an authority request',
          body:
            'Treating a tool invocation as a request for authority rather than as a function call is the shift that makes policy possible. ' +
            'A function call is about arguments. An authority request also carries who is asking, what they have been delegated, what it ' +
            'costs, how risky it is, and whether the result should be inspected before it is trusted. Those are the inputs a guard ' +
            'decision needs, and none of them belong to the tool itself.'
        }
      ]
    },
    {
      heading: 'The decision pipeline',
      blocks: [
        {
          kind: 'p',
          text:
            'A protected call passes through a staged evaluation. Request context is constructed from the call and its environment. ' +
            'Identity is propagated and delegation validated, so that a caller acting on behalf of another principal cannot exceed what ' +
            'it was granted. Policy evaluation applies the configured rules, risk evaluation scores the request, and adaptive budgeting ' +
            'checks it against the allowance in force. A decision engine then produces an execution decision, which is what permits or ' +
            'refuses the call.'
        },
        {
          kind: 'p',
          text:
            'The same asymmetry applies afterwards. Post-execution inspection examines what the tool actually returned, and structured ' +
            'errors, audit events and observability record the decision and its outcome. A guard that only looked at requests would miss ' +
            'an oversized response or a result carrying data the caller should not see, which is why result inspection is part of the ' +
            'design rather than an optional extra.'
        },
        {
          kind: 'card',
          card: 'architecture',
          title: 'From agent to audited result',
          body:
            'The gateway evaluates a request against identity, delegation, policy, risk and budget before execution, and inspects the ' +
            'result afterwards. Dependency direction is domain inward: the domain layer depends on no web framework, database, cache, ' +
            'transport or tracing library.',
          points: [
            'Request context, identity propagation, delegation validation',
            'Policy evaluation, risk evaluation, adaptive budgeting',
            'Security intelligence, then the execution decision',
            'Model Context Protocol interception and execution',
            'Post-execution inspection, structured errors, audit events, observability'
          ]
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'One responsibility per package',
          body:
            'The concerns are separated into eleven packages so that policy evaluation, risk scoring and budgeting can evolve and be ' +
            'tested independently of the transport that carries them.',
          points: [
            'context, errors — request context and the structured error taxonomy',
            'policy, risk, budget — the three evaluation axes',
            'decision — combining evaluations into an execution decision',
            'core — the shared domain layer',
            'proxy — interception of protected tool calls',
            'security — security intelligence',
            'audit, observability — recording and tracing decisions'
          ]
        }
      ]
    },
    {
      heading: 'Security boundaries and how far they reach',
      blocks: [
        {
          kind: 'p',
          text:
            'It is worth being precise about what a guard layer is and is not. A guard decision is an application-level control: it runs ' +
            'in the same process as the caller, or alongside it, and it decides whether to proceed. It is not a sandbox. It cannot prevent ' +
            'a compromised agent process from calling a tool directly by another route, and it does not constrain what an already-approved ' +
            'process may do with the credentials it holds. Isolation has to come from somewhere else — operating-system boundaries, ' +
            'credential scoping, or not exposing the capability at all.'
        },
        {
          kind: 'p',
          text:
            'Within that boundary the design is coherent, and the dependency rule that keeps the domain free of framework dependencies is ' +
            'the right structural defence: it means the evaluation logic cannot quietly acquire a database handle or an HTTP client and ' +
            'become entangled with the systems it is supposed to be judging.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Policy control is not isolation',
          body:
            'A deny decision prevents a call from being made through the guarded path. It does not make the underlying capability safe to ' +
            'expose. Anyone evaluating GuardMCP for a real deployment should treat it as one layer in a defence that also includes scoped ' +
            'credentials and process-level separation.'
        }
      ]
    },
    {
      heading: 'Maturity and limitations',
      blocks: [
        {
          kind: 'p',
          text:
            'The project is at version 0.1.0 and is organised around a documented phased plan rather than a finished release. The ' +
            'single most important fact about the current state is one of packaging and completeness. The root distribution ' +
            'packages only the core library, yet all eleven component packages carry their own manifests and their own source, so ' +
            'each concern is separately packageable rather than merely described. What is not present is the layer above them: the ' +
            'gateway and control-plane applications that the project documentation refers to are absent from the repository, and ' +
            'there is no persistence layer — no store, database or repository implementation appears anywhere in the packages. ' +
            'Someone evaluating it today is therefore evaluating a set of libraries, not a running control plane.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Alpha: packaged libraries without deployed services',
          body:
            'The phase plan spans a sequence of responsibilities from request-context construction through to observability. A ' +
            'documented plan is not the same as delivered capability, and the gap between the libraries and a deployable control ' +
            'plane is the practical constraint today.',
          points: [
            'Root distribution: guardmcp, version 0.1.0, MIT licence, packaging the core package only',
            'Component packages: eleven, each with its own manifest and source, separately packageable',
            'Not present in the repository: the gateway and control-plane applications',
            'Not present anywhere in the packages: a persistence, store or database layer',
            'Not verified: that the component packages have been published to a package index or tested independently'
          ]
        },
        {
          kind: 'card',
          card: 'requirements',
          title: 'Prerequisites',
          body:
            'Development installation is performed from the repository rather than from a published package index.',
          points: [
            'Python: 3.11 or newer',
            'Install: editable installs of the repository packages',
            'Layout: packages, applications, examples, documentation and tests directories',
            'Licence: MIT'
          ]
        }
      ]
    }
  ],
  verification: [
    { label: 'GuardMCP on the Technology Ecosystem page', route: '/technology' }
  ],
  conclusion:
    'GuardMCP is a serious attempt at a problem that agent tooling currently handles by convention: deciding, in one inspectable place, ' +
    'whether a particular tool call should be allowed. Its evaluation pipeline and domain boundary are coherent, and its core package is ' +
    'installable today. It should be assessed as an alpha domain library with an application-level boundary — useful inside a system ' +
    'that already controls its isolation, not a substitute for one.'
};
