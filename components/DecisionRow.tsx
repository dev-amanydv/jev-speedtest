'use client';

import React from 'react';
import { Check, Circle } from 'lucide-react';
import { formatNumber } from '@/lib/benchmark/pricing';
import { DecisionStatus, DecisionType } from '@/lib/benchmark/types';

interface DecisionRowProps {
  name: string;
  status: DecisionStatus;
  type?: DecisionType;
  unit?: string;
  rawAnswer?: string | number | boolean;
  formattedAnswer?: string;
  latencyMs?: number;
  showLatency?: boolean;
  variant?: 'traditional' | 'jev';
}

export function DecisionRow({
  name,
  status,
  type,
  unit,
  rawAnswer,
  formattedAnswer,
  latencyMs,
  showLatency = false,
  variant = 'traditional',
}: DecisionRowProps) {
  const isPercentage =
    type === 'percentage' ||
    unit === '%' ||
    (typeof formattedAnswer === 'string' && formattedAnswer.endsWith('%'));

  let pct = 0;
  if (typeof rawAnswer === 'number') {
    pct = Math.min(100, Math.max(0, Math.round(rawAnswer)));
  } else if (typeof formattedAnswer === 'string' && formattedAnswer.endsWith('%')) {
    pct = Math.min(100, Math.max(0, parseInt(formattedAnswer.replace('%', ''), 10) || 0));
  }

  if (isPercentage) {
    return (
      <div
        className="flex items-center justify-between py-2 text-sm transition-colors duration-150"
        role="listitem"
      >
        {/* Left side: status indicator + name */}
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
            {status === 'completed' ? (
              <Check
                className={`w-3.5 h-3.5 stroke-[2.5] ${
                  variant === 'jev' ? 'text-blue-600' : 'text-neutral-800'
                }`}
                aria-hidden="true"
              />
            ) : status === 'running' ? (
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  variant === 'jev' ? 'bg-blue-600' : 'bg-neutral-900'
                }`}
                aria-hidden="true"
              />
            ) : (
              <Circle className="w-3.5 h-3.5 text-neutral-300 stroke-[1.5]" aria-hidden="true" />
            )}
          </span>
          <span
            className={`font-normal truncate text-xs sm:text-sm ${
              status === 'completed'
                ? 'text-neutral-900'
                : status === 'running'
                ? 'text-neutral-900 font-medium'
                : 'text-neutral-400'
            }`}
            title={name}
          >
            {name}
          </span>
        </div>

        {/* Right side: Line progress bar + percentage number + optional step latency */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Line progress bar */}
          <div className="w-16 sm:w-24 md:w-28 h-1.5 bg-neutral-100 rounded-full overflow-hidden flex-shrink-0">
            {status === 'completed' ? (
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  variant === 'jev' ? 'bg-blue-600' : 'bg-neutral-800'
                }`}
                style={{ width: `${pct}%` }}
              />
            ) : status === 'running' ? (
              <div
                className={`h-full w-1/2 rounded-full animate-pulse ${
                  variant === 'jev' ? 'bg-blue-400' : 'bg-neutral-400'
                }`}
              />
            ) : null}
          </div>

          {/* Percentage value */}
          <span
            className={`font-mono text-xs tabular-nums w-8 sm:w-9 text-right ${
              status === 'completed'
                ? variant === 'jev'
                  ? 'font-semibold text-blue-700'
                  : 'font-medium text-neutral-900'
                : 'text-neutral-300'
            }`}
          >
            {status === 'completed' ? `${pct}%` : '—%'}
          </span>

          {/* Step latency for traditional LLM */}
          {showLatency && (
            <span className="font-mono text-[11px] text-neutral-400 tabular-nums w-14 sm:w-16 text-right">
              {status === 'completed' && latencyMs !== undefined ? `${formatNumber(latencyMs)} ms` : ''}
            </span>
          )}
        </div>
      </div>
    );
  }

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
          className={`font-normal truncate text-xs sm:text-sm ${
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
