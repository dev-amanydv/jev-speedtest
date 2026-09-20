export interface ProviderPricing {
  name: string;
  model: string;
  inputPerMillion: number;
  outputPerMillion: number;
  notes: string;
}

export const PRICING_CONFIG: Record<'jev' | 'traditional', ProviderPricing> = {
  jev: {
    name: 'Jev',
    model: 'typesafe-ai/jev',
    inputPerMillion: 0.042, // $0.042 per 1M input tokens
    outputPerMillion: 0.0,  // Output tokens not charged
    notes: 'Input tokens $0.042/1M, output tokens free',
  },
  traditional: {
    name: 'Traditional LLM',
    model: 'gpt-4o-mini',
    inputPerMillion: 0.15, // $0.15 per 1M input tokens
    outputPerMillion: 0.60, // $0.60 per 1M output tokens
    notes: 'Input $0.15/1M, output $0.60/1M',
  },
};

export interface CalculateCostParams {
  provider: 'jev' | 'traditional';
  inputTokens: number;
  outputTokens: number;
  runs?: number; // default 1000
}

/**
 * Calculates estimated cost for N benchmark runs (default 1,000 runs)
 */
export function calculateCost({
  provider,
  inputTokens,
  outputTokens,
  runs = 1000,
}: CalculateCostParams): number {
  const pricing = PRICING_CONFIG[provider];
  const inputCostPerRun = (inputTokens / 1_000_000) * pricing.inputPerMillion;
  const outputCostPerRun = (outputTokens / 1_000_000) * pricing.outputPerMillion;
  const totalPerRun = inputCostPerRun + outputCostPerRun;
  return totalPerRun * runs;
}

export function formatCost(cost: number): string {
  if (cost === 0) return '$0.00';
  if (cost < 0.01) return `<$0.01`;
  return `$${cost.toFixed(2)}`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(num));
}
