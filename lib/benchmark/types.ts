export type DecisionId =
  | 'department'
  | 'refund'
  | 'urgency'
  | 'escalation'
  | 'severity'
  | 'next_action';

export type DecisionType = 'choice' | 'boolean' | 'score';

export type DecisionStatus = 'idle' | 'running' | 'completed' | 'error';

export interface DecisionDefinition {
  id: DecisionId;
  number: string;
  name: string;
  type: DecisionType;
  prompt: string;
  options?: string[];
  scale?: number[];
  criteria?: Record<string, string> | string[];
  expectedAnswer?: string | number | boolean;
}

export interface DecisionResult {
  id: DecisionId;
  status: DecisionStatus;
  rawAnswer?: string | number | boolean;
  formattedAnswer?: string;
  latencyMs?: number;
}

export interface BenchmarkMetrics {
  totalLatencyMs: number;
  inputTokens: number;
  outputTokens: number;
  requestsCount: number;
  executionMode: 'sequential' | 'parallel';
  model: string;
  costPer1k: number;
}

export interface BenchmarkSystemState {
  status: 'idle' | 'running' | 'completed' | 'error';
  totalLatencyMs: number;
  currentStepId?: DecisionId;
  decisions: Record<DecisionId, DecisionResult>;
  metrics?: BenchmarkMetrics;
  error?: string;
}

export interface BenchmarkRunEvent {
  type: 'step_start' | 'step_complete' | 'all_complete' | 'error';
  stepId?: DecisionId;
  latencyMs?: number;
  answer?: string | number | boolean;
  rawAnswer?: string | number | boolean;
  formattedAnswer?: string;
  totalLatencyMs?: number;
  metrics?: BenchmarkMetrics;
  error?: string;
}
