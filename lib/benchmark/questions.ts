import { DecisionDefinition, DecisionId } from './types';

export const BENCHMARK_STATE = {
  ticket: {
    subject: 'Duplicate subscription charge',
    message:
      "I've been charged twice for my subscription. I need one refund and this is really urgent.",
  },
};

export const BENCHMARK_INPUT_TEXT =
  "“I've been charged twice for my subscription. I need one refund and this is really urgent.”";

export const BENCHMARK_DECISIONS: DecisionDefinition[] = [
  {
    id: 'department',
    number: '01',
    name: 'Department',
    type: 'choice',
    prompt: 'Determine which team should handle the request.',
    options: ['billing', 'technical', 'sales', 'other'],
    criteria: {
      billing: 'Inquiries regarding billing, subscription charges, invoices, or duplicate payments.',
      technical: 'Technical issues, software bugs, outages, and API errors.',
      sales: 'Sales questions, enterprise upgrades, and pricing inquiries.',
      other: 'General questions not covered by other categories.',
    },
    expectedAnswer: 'billing',
  },
  {
    id: 'refund',
    number: '02',
    name: 'Refund',
    type: 'boolean',
    prompt: 'Is the customer requesting a refund?',
    criteria: {
      true: 'The customer explicitly asks for a refund or reimbursement.',
      false: 'The customer is not requesting a refund.',
    },
    expectedAnswer: true,
  },
  {
    id: 'urgency',
    number: '03',
    name: 'Urgency',
    type: 'choice',
    prompt: 'Determine the urgency of the request.',
    options: ['routine', 'normal', 'urgent', 'critical'],
    criteria: {
      routine: 'Low priority or casual informational question.',
      normal: 'Standard issue with ordinary response time.',
      urgent: 'Time-sensitive issue causing customer distress or direct financial impact.',
      critical: 'System outage or catastrophic operational failure.',
    },
    expectedAnswer: 'urgent',
  },
  {
    id: 'escalation',
    number: '04',
    name: 'Escalation',
    type: 'boolean',
    prompt: 'Should this request be escalated immediately?',
    criteria: {
      true: 'Requires immediate supervisor or human priority escalation.',
      false: 'Can be handled via normal support triage queue.',
    },
    expectedAnswer: true,
  },
  {
    id: 'severity',
    number: '05',
    name: 'Severity',
    type: 'score',
    prompt: 'Score the issue severity from 1 (low impact) to 4 (critical impact).',
    scale: [1, 2, 3, 4],
    criteria: [
      'low impact: trivial issue with no business interruption',
      'moderate impact: noticeable inconvenience with workaround',
      'high impact: direct monetary charge or serious account problem',
      'critical impact: complete blocker affecting multiple accounts',
    ],
    expectedAnswer: 3,
  },
  {
    id: 'next_action',
    number: '06',
    name: 'Next action',
    type: 'choice',
    prompt: 'Determine the recommended next action.',
    options: ['refund', 'investigate', 'respond', 'escalate'],
    criteria: {
      refund: 'Initiate a refund process for the duplicate payment.',
      investigate: 'Conduct deep forensic search into billing logs.',
      respond: 'Send a standard informational email without taking action.',
      escalate: 'Forward ticket directly to executive escalations.',
    },
    expectedAnswer: 'refund',
  },
];

export const INITIAL_DECISION_RESULTS = BENCHMARK_DECISIONS.reduce(
  (acc, d) => {
    acc[d.id] = {
      id: d.id,
      status: 'idle',
    };
    return acc;
  },
  {} as Record<DecisionId, { id: DecisionId; status: 'idle' }>
);
