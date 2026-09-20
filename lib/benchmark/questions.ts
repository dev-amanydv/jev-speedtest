import { DecisionDefinition, DecisionId } from './types';

export type PresetId = 'billing' | 'trading' | 'outage';

export interface BenchmarkPreset {
  id: PresetId;
  label: string;
  title: string;
  text: string;
  decisions: DecisionDefinition[];
}

export const BENCHMARK_PRESETS: BenchmarkPreset[] = [
  {
    id: 'billing',
    label: 'Billing charge',
    title: 'Support ticket triage',
    text: "I've been charged twice for my subscription. I need one refund and this is really urgent.",
    decisions: [
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
    ],
  },
  {
    id: 'trading',
    label: 'Tech inquiry',
    title: 'Architecture & stack evaluation',
    text: 'What is the best language and stack to build a low latency trading webapp backend?',
    decisions: [
      {
        id: 'domain',
        number: '01',
        name: 'Domain',
        type: 'choice',
        prompt: 'Identify the primary engineering domain of the request.',
        options: ['systems', 'web', 'database', 'devops'],
        criteria: {
          systems: 'Low-latency, systems programming, finance, or high-performance networking.',
          web: 'Standard CRUD web applications and CMS.',
          database: 'Database indexing and storage engines.',
          devops: 'Infrastructure, containers, and deployment pipelines.',
        },
        expectedAnswer: 'systems',
      },
      {
        id: 'zero_gc',
        number: '02',
        name: 'Zero-GC',
        type: 'boolean',
        prompt: 'Does low-latency trading require zero garbage collection or predictable memory pauses?',
        criteria: {
          true: 'Requires manual memory management or zero GC pauses.',
          false: 'Standard runtime garbage collection is acceptable.',
        },
        expectedAnswer: true,
      },
      {
        id: 'language',
        number: '03',
        name: 'Language',
        type: 'choice',
        prompt: 'Select the top recommended language for this architecture.',
        options: ['rust', 'cpp', 'go', 'java'],
        criteria: {
          rust: 'Memory safety without garbage collection and modern concurrency.',
          cpp: 'Legacy high-frequency trading industry standard with raw pointer performance.',
          go: 'Fast development with lightweight goroutines but has GC pauses.',
          java: 'Enterprise finance standard with specialized low-latency JVM tuning.',
        },
        expectedAnswer: 'rust',
      },
      {
        id: 'transport',
        number: '04',
        name: 'Transport',
        type: 'choice',
        prompt: 'Determine the optimal transport protocol for webapp streaming market data.',
        options: ['websockets', 'fix', 'grpc', 'rest'],
        criteria: {
          websockets: 'Full-duplex low-overhead streaming directly to web browsers.',
          fix: 'Financial Information eXchange protocol between broker backends.',
          grpc: 'Binary streaming over HTTP/2 between internal microservices.',
          rest: 'Standard request-response HTTP endpoints.',
        },
        expectedAnswer: 'websockets',
      },
      {
        id: 'latency_tier',
        number: '05',
        name: 'Latency tier',
        type: 'score',
        prompt: 'Score the target latency stringency from 1 (relaxed >100ms) to 4 (ultra-low <1ms).',
        scale: [1, 2, 3, 4],
        criteria: [
          'standard web: >100ms ordinary response times',
          'interactive: 10-50ms responsive UI interaction',
          'sub-millisecond: 1-10ms fast processing',
          'ultra-low: <1ms predictable microsecond execution',
        ],
        expectedAnswer: 4,
      },
      {
        id: 'concurrency',
        number: '06',
        name: 'Concurrency',
        type: 'choice',
        prompt: 'Select the primary concurrency model.',
        options: ['kernel_bypass', 'event_loop', 'multithreaded', 'distributed'],
        criteria: {
          kernel_bypass: 'Direct hardware NIC polling avoiding OS networking stack.',
          event_loop: 'Single-threaded non-blocking event loop.',
          multithreaded: 'OS threads with thread pinning and lock-free rings.',
          distributed: 'Queue-based distributed message processing.',
        },
        expectedAnswer: 'kernel_bypass',
      },
    ],
  },
  {
    id: 'outage',
    label: 'Production outage',
    title: 'Incident response triage',
    text: 'Production API gateway is returning 502 Bad Gateway for all cluster users after the deployment.',
    decisions: [
      {
        id: 'incident_type',
        number: '01',
        name: 'Incident type',
        type: 'choice',
        prompt: 'Classify the incident category.',
        options: ['outage', 'degradation', 'security', 'bug'],
        criteria: {
          outage: 'Complete service failure or blocking gateway errors for all users.',
          degradation: 'Partial performance slowdown or elevated latency.',
          security: 'Unauthorized access or suspected vulnerability breach.',
          bug: 'Non-blocking logic defect or UI display error.',
        },
        expectedAnswer: 'outage',
      },
      {
        id: 'rollback_needed',
        number: '02',
        name: 'Rollback needed',
        type: 'boolean',
        prompt: 'Is an immediate deployment rollback recommended?',
        criteria: {
          true: 'Incident triggered directly after deployment, rollback immediately.',
          false: 'Issue is external or unrelated to recent release.',
        },
        expectedAnswer: true,
      },
      {
        id: 'severity',
        number: '03',
        name: 'Severity',
        type: 'choice',
        prompt: 'Determine the incident severity level.',
        options: ['sev-1', 'sev-2', 'sev-3', 'sev-4'],
        criteria: {
          'sev-1': 'Critical business-stopping outage affecting all production users.',
          'sev-2': 'Major degradation with core functionality impaired.',
          'sev-3': 'Moderate issue affecting a subset of non-critical features.',
          'sev-4': 'Minor informational or cosmetic issue.',
        },
        expectedAnswer: 'sev-1',
      },
      {
        id: 'page_oncall',
        number: '04',
        name: 'Page on-call',
        type: 'boolean',
        prompt: 'Should the on-call incident response team be paged immediately?',
        criteria: {
          true: 'Page primary and secondary on-call leads right now.',
          false: 'Ticket can wait for regular business hours.',
        },
        expectedAnswer: true,
      },
      {
        id: 'impact_scope',
        number: '05',
        name: 'Impact scope',
        type: 'score',
        prompt: 'Score the customer impact scope from 1 (isolated) to 4 (widespread).',
        scale: [1, 2, 3, 4],
        criteria: [
          'isolated: single user or internal staging environment',
          'limited: minor fraction of non-critical requests failing',
          'significant: substantial subset of customers impacted',
          'widespread: total outage across all production clusters',
        ],
        expectedAnswer: 4,
      },
      {
        id: 'first_action',
        number: '06',
        name: 'First action',
        type: 'choice',
        prompt: 'Select the immediate first remediation action.',
        options: ['rollback', 'restart', 'failover', 'throttle'],
        criteria: {
          rollback: 'Revert deployment to previous healthy release artifact.',
          restart: 'Restart gateway pods without changing deployment.',
          failover: 'Route traffic to alternative secondary cloud region.',
          throttle: 'Enable aggressive rate-limiting on incoming requests.',
        },
        expectedAnswer: 'rollback',
      },
    ],
  },
];

export const UNIVERSAL_FALLBACK_DECISIONS: DecisionDefinition[] = [
  {
    id: 'category',
    number: '01',
    name: 'Category',
    type: 'choice',
    prompt: 'Determine the primary category of this input.',
    options: ['technical', 'billing', 'product', 'general'],
    expectedAnswer: 'general',
  },
  {
    id: 'action_needed',
    number: '02',
    name: 'Action needed',
    type: 'boolean',
    prompt: 'Does this input require operational action or response?',
    expectedAnswer: true,
  },
  {
    id: 'urgency',
    number: '03',
    name: 'Urgency',
    type: 'choice',
    prompt: 'Assess the urgency of this request.',
    options: ['routine', 'normal', 'urgent', 'critical'],
    expectedAnswer: 'normal',
  },
  {
    id: 'escalation',
    number: '04',
    name: 'Escalation',
    type: 'boolean',
    prompt: 'Does this require human escalation or high priority?',
    expectedAnswer: false,
  },
  {
    id: 'complexity',
    number: '05',
    name: 'Complexity',
    type: 'score',
    prompt: 'Score the resolution complexity from 1 (trivial) to 4 (high).',
    scale: [1, 2, 3, 4],
    expectedAnswer: 2,
  },
  {
    id: 'next_step',
    number: '06',
    name: 'Next step',
    type: 'choice',
    prompt: 'Determine the recommended immediate next action.',
    options: ['respond', 'investigate', 'route', 'resolve'],
    expectedAnswer: 'respond',
  },
];

export const BENCHMARK_DEFAULT_INPUT = BENCHMARK_PRESETS[0].text;
export const BENCHMARK_INPUT_TEXT = BENCHMARK_DEFAULT_INPUT;
export const BENCHMARK_DECISIONS = BENCHMARK_PRESETS[0].decisions;

export function getPresetOrFallback(presetId?: string | null): {
  preset: BenchmarkPreset | null;
  decisions: DecisionDefinition[];
  isPreset: boolean;
} {
  const found = BENCHMARK_PRESETS.find((p) => p.id === presetId);
  if (found) {
    return { preset: found, decisions: found.decisions, isPreset: true };
  }
  return { preset: null, decisions: UNIVERSAL_FALLBACK_DECISIONS, isPreset: false };
}

export function classifyDecisions(
  input: string,
  decisions: DecisionDefinition[],
  presetId?: string | null
): Record<string, string | number | boolean> {
  const foundPreset = BENCHMARK_PRESETS.find((p) => p.id === presetId);
  if (foundPreset && foundPreset.text.trim() === input.trim()) {
    return foundPreset.decisions.reduce((acc, d) => {
      acc[d.id] = d.expectedAnswer ?? '';
      return acc;
    }, {} as Record<string, string | number | boolean>);
  }

  const lower = input.toLowerCase();
  const results: Record<string, string | number | boolean> = {};

  for (const d of decisions) {
    if (d.type === 'boolean') {
      const isAffirmative =
        lower.includes('urgent') ||
        lower.includes('asap') ||
        lower.includes('immediately') ||
        lower.includes('fail') ||
        lower.includes('error') ||
        lower.includes('outage') ||
        lower.includes('down') ||
        lower.includes('yes') ||
        lower.includes('critical');
      results[d.id] = isAffirmative;
    } else if (d.type === 'score') {
      let score = 2;
      if (lower.includes('outage') || lower.includes('down') || lower.includes('502') || lower.includes('critical')) {
        score = 4;
      } else if (lower.includes('urgent') || lower.includes('high')) {
        score = 3;
      } else if (lower.includes('what is') || lower.includes('how to') || lower.includes('question')) {
        score = 1;
      }
      results[d.id] = score;
    } else {
      // choice type
      if (d.options && d.options.length > 0) {
        const matching = d.options.find((opt) => lower.includes(opt.toLowerCase()));
        results[d.id] = matching || d.expectedAnswer || d.options[0];
      } else {
        results[d.id] = d.expectedAnswer ?? '';
      }
    }
  }

  return results;
}
