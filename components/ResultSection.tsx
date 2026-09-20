'use client';

import React from 'react';
import { BenchmarkMetrics, DecisionResult } from '@/lib/benchmark/types';
import { formatCost, formatNumber } from '@/lib/benchmark/pricing';
import { BenchmarkDetails } from './BenchmarkDetails';

interface ResultSectionProps {
  status: 'idle' | 'running' | 'completed' | 'error';
  traditionalMetrics?: BenchmarkMetrics;
  jevMetrics?: BenchmarkMetrics;
  traditionalResults: Record<string, DecisionResult>;
  jevResults: Record<string, DecisionResult>;
}

export function ResultSection({
  status,
  traditionalMetrics,
  jevMetrics,
  traditionalResults,
  jevResults,
}: ResultSectionProps) {
  // Empty / Idle / Running states
  if (status === 'idle' || status === 'running') {
    return (
      <section className="mt-12 pt-8 border-t border-neutral-200">
        <p className="text-xs text-neutral-400 font-normal select-none">
          {status === 'running'
            ? 'Evaluating benchmark in real time...'
            : 'Run the benchmark to compare.'}
        </p>
      </section>
    );
  }

  // If one or both failed
  if (status === 'error' || !traditionalMetrics || !jevMetrics) {
    return (
      <section className="mt-12 pt-8 border-t border-neutral-200">
        <p className="text-xs text-neutral-500 font-normal">
          Benchmark incomplete due to error. Check individual model output.
        </p>
      </section>
    );
  }

  // Calculate speed multiplier
  const traditionalMs = traditionalMetrics.totalLatencyMs;
  const jevMs = jevMetrics.totalLatencyMs;
  const isJevFaster = jevMs > 0 && traditionalMs >= jevMs;
  const multiplier =
    jevMs > 0 ? (traditionalMs / jevMs).toFixed(1) : '1.0';

  // Calculate matching decisions
  const decisionKeys = Object.keys(traditionalResults);
  let matchedCount = 0;
  for (const key of decisionKeys) {
    const tAns = traditionalResults[key]?.formattedAnswer;
    const jAns = jevResults[key]?.formattedAnswer;
    if (tAns && jAns && tAns.toLowerCase() === jAns.toLowerCase()) {
      matchedCount++;
    }
  }

  return (
    <section className="mt-12 pt-8 border-t border-neutral-200 space-y-8 animate-in fade-in duration-200">
      {/* Neutral match indicator */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 font-normal">
        <span className="font-mono text-neutral-700">
          {matchedCount} / {decisionKeys.length}
        </span>
        <span>decisions matched</span>
      </div>

      {/* Main speed result - Largest visual element */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-900">
            {multiplier}×
          </span>
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            {isJevFaster ? 'FASTER' : 'MEASURED DIFFERENCE'}
          </span>
        </div>
        <p className="font-mono text-xs text-neutral-500 pt-1">
          {formatNumber(jevMs)} ms vs {formatNumber(traditionalMs)} ms
        </p>
      </div>

      {/* Cost comparison */}
      <div className="pt-4 border-t border-neutral-100 max-w-sm">
        <p className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider mb-3">
          COST / 1,000 RUNS
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-mono text-lg text-neutral-900 font-normal">
              {formatCost(traditionalMetrics.costPer1k)}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">Traditional LLM</p>
          </div>
          <div>
            <p className="font-mono text-lg text-neutral-900 font-normal">
              {formatCost(jevMetrics.costPer1k)}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">Jev</p>
          </div>
        </div>
        <p className="text-[11px] text-neutral-400 mt-3">
          Estimated cost based on measured usage and configured provider pricing.
        </p>
      </div>

      {/* Expandable benchmark details */}
      <BenchmarkDetails
        traditionalMetrics={traditionalMetrics}
        jevMetrics={jevMetrics}
      />
    </section>
  );
}
