/**
 * Shared commercial engagement framework.
 *
 * These models describe how work can be scoped. They are not claims of
 * existing customer contracts, delivery history or commercial outcomes.
 */
export interface EngagementModel {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly customerSituation: string;
  readonly outputs: readonly string[];
  readonly bestFor: string;
}

export const ENGAGEMENT_MODELS: readonly EngagementModel[] = [
  {
    id: 'discovery-feasibility',
    title: 'Engineering discovery & feasibility',
    summary:
      'A structured assessment of the problem, constraints, evidence and realistic options.',
    customerSituation:
      'You need a clear view of whether and how the requirement can be delivered.',
    outputs: [
      'Problem and constraint assessment',
      'Technical options and trade-offs',
      'Feasibility findings and a recommended next step'
    ],
    bestFor: 'A first engagement when the approach is not yet decided.'
  },
  {
    id: 'architecture-consulting',
    title: 'Architecture & technical consulting',
    summary:
      'Architecture, interface and technology decisions documented for implementation.',
    customerSituation:
      'You need a defensible architecture or integration design before committing to build.',
    outputs: [
      'Target architecture and interfaces',
      'Technology and integration decisions',
      'Delivery risks, assumptions and open questions'
    ],
    bestFor: 'When the system shape or integration boundary needs to be decided.'
  },
  {
    id: 'poc-prototype',
    title: 'Proof of concept & prototype',
    summary:
      'A bounded working prototype that tests the critical technical risk before full delivery.',
    customerSituation:
      'You need evidence that a technical approach can work in your context.',
    outputs: [
      'Bounded working prototype',
      'Test results and evaluation notes',
      'Recommendation for production delivery'
    ],
    bestFor: 'When the main uncertainty is technical feasibility rather than requirements.'
  },
  {
    id: 'dedicated-implementation',
    title: 'Dedicated engineering & implementation',
    summary:
      'Scoped engineering delivery of software, integrations, data pipelines or AI features.',
    customerSituation:
      'The approach is agreed and the system now needs to be built and integrated.',
    outputs: [
      'Working software and integration components',
      'Tests, technical documentation and deployment artifacts',
      'Handover notes and engineering records'
    ],
    bestFor: 'When scope, interfaces and acceptance criteria are clear.'
  },
  {
    id: 'integration-validation-support',
    title: 'Integration, validation & technical support',
    summary:
      'Integration, verification, documentation and support for an existing or newly delivered system.',
    customerSituation:
      'A system needs to be integrated, validated, hardened or supported after delivery.',
    outputs: [
      'Integration and validation results',
      'Operational and support documentation',
      'Remediation or improvement plan'
    ],
    bestFor: 'When the work is to make an existing system reliable or operable.'
  }
];

export const ENGAGEMENT_MODELS_NOTE =
  'These are ways to scope work, not claims of existing customer contracts or delivery history. The right starting point depends on the problem and the evidence available.';
