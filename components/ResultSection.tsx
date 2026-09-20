'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BenchmarkMetrics, DecisionDefinition, DecisionResult } from '@/lib/benchmark/types';
import { formatCost, formatNumber } from '@/lib/benchmark/pricing';
import { PresetId } from '@/lib/benchmark/questions';
import { BenchmarkDetails } from './BenchmarkDetails';

interface ResultSectionProps {
  status: 'idle' | 'running' | 'completed' | 'error';
  traditionalMetrics?: BenchmarkMetrics;
  jevMetrics?: BenchmarkMetrics;
  traditionalResults: Record<string, DecisionResult>;
  jevResults: Record<string, DecisionResult>;
  decisions?: DecisionDefinition[];
  activePresetId?: PresetId | null;
}

export function ResultSection({
  status,
  traditionalMetrics,
  jevMetrics,
  traditionalResults,
  jevResults,
  decisions = [],
  activePresetId,
}: ResultSectionProps) {
  const [isCovered, setIsCovered] = useState(true);

  // Empty / Idle / Running states
  if (status === 'idle' || status === 'running') {
    return (
      <div className="flex-shrink-0 pt-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-400 font-normal select-none">
          {status === 'running'
            ? 'Evaluating benchmark in real time...'
            : 'Run the benchmark to compare.'}
        </p>
      </div>
    );
  }

  // If error occurred or metrics unavailable
  if (status === 'error' || !traditionalMetrics || !jevMetrics) {
    return (
      <div className="flex-shrink-0 pt-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-500 font-normal">
          Benchmark incomplete due to error. Check individual model output.
        </p>
      </div>
    );
  }

  // Calculate speed multiplier
  const traditionalMs = traditionalMetrics.totalLatencyMs;
  const jevMs = jevMetrics.totalLatencyMs;
  const isJevFaster = jevMs > 0 && traditionalMs >= jevMs;
  const multiplier = jevMs > 0 ? (traditionalMs / jevMs).toFixed(1) : '1.0';

  const hasPercentageDecisions = decisions.some((d) => d.type === 'percentage');

  // Calculate matching / aligned decisions
  const decisionKeys = Object.keys(traditionalResults);
  let matchedCount = 0;

  if (hasPercentageDecisions && decisions.length > 0) {
    for (const d of decisions) {
      const tAns = traditionalResults[d.id];
      const jAns = jevResults[d.id];
      const tVal =
        typeof tAns?.rawAnswer === 'number'
          ? tAns.rawAnswer
          : parseInt(String(tAns?.formattedAnswer || '0').replace('%', ''), 10) || 0;
      const jVal =
        typeof jAns?.rawAnswer === 'number'
          ? jAns.rawAnswer
          : parseInt(String(jAns?.formattedAnswer || '0').replace('%', ''), 10) || 0;
      // Consider aligned if within ±12%
      if (Math.abs(tVal - jVal) <= 12) {
        matchedCount++;
      }
    }
  } else {
    for (const key of decisionKeys) {
      const tAns = traditionalResults[key]?.formattedAnswer;
      const jAns = jevResults[key]?.formattedAnswer;
      if (tAns && jAns && tAns.toLowerCase() === jAns.toLowerCase()) {
        matchedCount++;
      }
    }
  }

  return (
    <div
      className={`absolute bottom-0 inset-x-0 bg-white border-t border-neutral-200 shadow-xl z-20 flex flex-col transition-all duration-300 ease-in-out ${
        isCovered ? 'h-[80%]' : 'h-12'
      } overflow-hidden`}
    >
      {isCovered ? (
        <>
          {/* Drawer Top Bar with Slide Down Button */}
          <div className="flex-shrink-0 h-11 px-6 md:px-8 border-b border-neutral-200/80 flex items-center justify-between bg-neutral-50/90 select-none">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold text-neutral-900 tracking-wide uppercase">
                RESULTS
              </span>
              <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase">
                {multiplier}× FASTER
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCovered(false)}
              className="group inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-white border border-neutral-200 transition-colors cursor-pointer select-none"
              aria-label="Slide down to show steps"
            >
              <span>Slide down</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>

          {/* Scrollable Results Content Box with hidden scrollbar */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-6 md:p-8 space-y-6">
            {/* Match / Alignment indicator */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-normal">
              <span className="font-mono text-neutral-700">
                {matchedCount} / {decisions.length || decisionKeys.length}
              </span>
              <span>
                {hasPercentageDecisions ? 'recommendations aligned (within ±12%)' : 'decisions matched'}
              </span>
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

            {/* Personalized Recommendation / Probability Breakdown Section */}
            {hasPercentageDecisions && decisions.length > 0 && (
              <div className="pt-4 border-t border-neutral-100 max-w-lg space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider">
                    {activePresetId === 'trading'
                      ? 'LANGUAGE RECOMMENDATION BREAKDOWN'
                      : activePresetId === 'outage'
                      ? 'ROOT CAUSE PROBABILITY BREAKDOWN'
                      : 'EVALUATION SCORE BREAKDOWN'}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500 select-none">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-neutral-800" /> Traditional LLM
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" /> Jev
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-neutral-100 border border-neutral-200 bg-neutral-50/50 p-3">
                  {decisions.map((d) => {
                    const tAns = traditionalResults[d.id];
                    const jAns = jevResults[d.id];
                    const tVal =
                      typeof tAns?.rawAnswer === 'number'
                        ? tAns.rawAnswer
                        : parseInt(String(tAns?.formattedAnswer || '0').replace('%', ''), 10) || 0;
                    const jVal =
                      typeof jAns?.rawAnswer === 'number'
                        ? jAns.rawAnswer
                        : parseInt(String(jAns?.formattedAnswer || '0').replace('%', ''), 10) || 0;

                    return (
                      <div key={d.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-neutral-400 select-none text-[11px] w-4">
                              {d.number}
                            </span>
                            <span className="font-medium text-neutral-900">{d.name}</span>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-xs tabular-nums">
                            <span className="text-neutral-700 font-medium">
                              <span className="text-[10px] text-neutral-400 mr-1">LLM</span>
                              {tVal}%
                            </span>
                            <span className="text-blue-600 font-semibold">
                              <span className="text-[10px] text-blue-400 mr-1">JEV</span>
                              {jVal}%
                            </span>
                          </div>
                        </div>

                        {/* Comparison Bars */}
                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <div className="h-1.5 bg-neutral-200/80 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neutral-800 rounded-full transition-all duration-700"
                              style={{ width: `${tVal}%` }}
                            />
                          </div>
                          <div className="h-1.5 bg-neutral-200/80 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-700"
                              style={{ width: `${jVal}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
          </div>
        </>
      ) : (
        /* Minimized bottom dock when slid down */
        <div className="h-12 px-6 md:px-8 flex items-center justify-between bg-neutral-50/95 select-none">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase">
              {multiplier}× FASTER
            </span>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              {formatNumber(jevMs)} ms vs {formatNumber(traditionalMs)} ms
            </span>
            <span className="text-xs text-neutral-400">
              • {matchedCount}/{decisionKeys.length} matched
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCovered(true)}
            className="group inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-white border border-neutral-300 transition-colors cursor-pointer select-none"
            aria-label="Slide up to show results"
          >
            <span>Show results</span>
            <ChevronUp className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-900 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
