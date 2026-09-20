'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BenchmarkMetrics } from '@/lib/benchmark/types';
import { formatCost, formatNumber } from '@/lib/benchmark/pricing';

interface BenchmarkDetailsProps {
  traditionalMetrics?: BenchmarkMetrics;
  jevMetrics?: BenchmarkMetrics;
}

export function BenchmarkDetails({
  traditionalMetrics,
  jevMetrics,
}: BenchmarkDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full pt-6 border-t border-neutral-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors select-none py-1 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{isOpen ? 'Hide benchmark details' : 'View benchmark details'}</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 opacity-60" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-neutral-100 animate-in fade-in duration-150">
          <p className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider mb-3">
            BENCHMARK DETAILS
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 font-normal">
                  <th className="py-2 pr-4 font-normal">Metric</th>
                  <th className="py-2 px-4 font-normal text-right">Traditional LLM</th>
                  <th className="py-2 pl-4 font-normal text-right">Jev</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                <tr>
                  <td className="py-2 pr-4 text-neutral-500">Input</td>
                  <td className="py-2 px-4 text-right font-mono">same</td>
                  <td className="py-2 pl-4 text-right font-mono">same</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-500">Decisions</td>
                  <td className="py-2 px-4 text-right font-mono">6</td>
                  <td className="py-2 pl-4 text-right font-mono">6</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-500">Requests</td>
                  <td className="py-2 px-4 text-right font-mono">6</td>
                  <td className="py-2 pl-4 text-right font-mono">1</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-500">Execution</td>
                  <td className="py-2 px-4 text-right font-mono">sequential</td>
                  <td className="py-2 pl-4 text-right font-mono">parallel</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-500">End-to-end latency</td>
                  <td className="py-2 px-4 text-right font-mono">
                    {traditionalMetrics
                      ? `${formatNumber(traditionalMetrics.totalLatencyMs)} ms`
                      : '—'}
                  </td>
                  <td className="py-2 pl-4 text-right font-mono">
                    {jevMetrics
                      ? `${formatNumber(jevMetrics.totalLatencyMs)} ms`
                      : '—'}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-500">Input tokens</td>
                  <td className="py-2 px-4 text-right font-mono">
                    {traditionalMetrics
                      ? formatNumber(traditionalMetrics.inputTokens)
                      : '—'}
                  </td>
                  <td className="py-2 pl-4 text-right font-mono">
                    {jevMetrics ? formatNumber(jevMetrics.inputTokens) : '—'}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-500">Output tokens</td>
                  <td className="py-2 px-4 text-right font-mono">
                    {traditionalMetrics
                      ? formatNumber(traditionalMetrics.outputTokens)
                      : '—'}
                  </td>
                  <td className="py-2 pl-4 text-right font-mono">
                    {jevMetrics ? formatNumber(jevMetrics.outputTokens) : '—'}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-500">Estimated cost / 1k</td>
                  <td className="py-2 px-4 text-right font-mono font-medium text-neutral-900">
                    {traditionalMetrics
                      ? formatCost(traditionalMetrics.costPer1k)
                      : '—'}
                  </td>
                  <td className="py-2 pl-4 text-right font-mono font-medium text-neutral-900">
                    {jevMetrics ? formatCost(jevMetrics.costPer1k) : '—'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
