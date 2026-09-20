'use client';

import React from 'react';
import { Check, Circle } from 'lucide-react';
import { formatNumber } from '@/lib/benchmark/pricing';
import { DecisionStatus } from '@/lib/benchmark/types';

interface DecisionRowProps {
  name: string;
  status: DecisionStatus;
  formattedAnswer?: string;
  latencyMs?: number;
  showLatency?: boolean;
}

export function DecisionRow({
  name,
  status,
  formattedAnswer,
  latencyMs,
  showLatency = false,
}: DecisionRowProps) {
  return (
    <div
      className="flex items-center justify-between py-2.5 text-sm transition-colors duration-150"
      role="listitem"
    >
      {/* Left side: status indicator + name */}
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
          {status === 'completed' ? (
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" aria-hidden="true" />
          ) : status === 'running' ? (
            <span
              className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse"
              aria-hidden="true"
            />
          ) : (
            <Circle className="w-3.5 h-3.5 text-neutral-300 stroke-[1.5]" aria-hidden="true" />
          )}
        </span>
        <span
          className={`font-normal truncate ${
            status === 'completed'
              ? 'text-neutral-900'
              : status === 'running'
              ? 'text-neutral-900 font-medium'
              : 'text-neutral-400'
          }`}
        >
          {name}
        </span>
      </div>

      {/* Right side: answer & optional step latency */}
      <div className="flex items-center gap-3.5 flex-shrink-0">
        {status === 'completed' && formattedAnswer && (
          <span className="text-xs font-medium text-neutral-800 tracking-tight">
            {formattedAnswer}
          </span>
        )}

        {showLatency && status === 'completed' && latencyMs !== undefined && (
          <span className="font-mono text-xs text-neutral-400 tabular-nums">
            {formatNumber(latencyMs)} ms
          </span>
        )}
      </div>
    </div>
  );
}
