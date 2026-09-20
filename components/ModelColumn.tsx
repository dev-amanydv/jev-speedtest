'use client';

import React from 'react';
import { LiveTimer } from './LiveTimer';
import { DecisionRow } from './DecisionRow';
import { DecisionDefinition, DecisionId, DecisionResult } from '@/lib/benchmark/types';

interface ModelColumnProps {
  title: string;
  subtitle: string;
  variant: 'traditional' | 'jev';
  isRunning: boolean;
  startTime?: number;
  totalLatencyMs?: number;
  decisions: DecisionDefinition[];
  results: Record<DecisionId, DecisionResult>;
  error?: string;
}

export function ModelColumn({
  title,
  subtitle,
  variant,
  isRunning,
  startTime,
  totalLatencyMs,
  decisions,
  results,
  error,
}: ModelColumnProps) {
  return (
    <div className="flex flex-col flex-1 py-1 px-2 md:px-6">
      {/* Header section */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
          {title}
        </h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          {subtitle}
        </p>

        {/* Live Timer directly underneath */}
        <div className="mt-4">
          <LiveTimer
            isRunning={isRunning}
            finalLatencyMs={totalLatencyMs}
            startTime={startTime}
            variant={variant}
          />
        </div>
      </div>

      {/* Decision list */}
      <div
        className="flex flex-col divide-y divide-neutral-100 border-t border-b border-neutral-200"
        role="list"
      >
        {decisions.map((decision) => {
          const res = results[decision.id] || { id: decision.id, status: 'idle' };
          return (
            <DecisionRow
              key={decision.id}
              name={decision.name}
              status={res.status}
              type={decision.type}
              unit={decision.unit}
              rawAnswer={res.rawAnswer}
              formattedAnswer={res.formattedAnswer}
              latencyMs={res.latencyMs}
              showLatency={variant === 'traditional'}
              variant={variant}
            />
          );
        })}
      </div>

      {/* Error state */}
      {error && (
        <div className="mt-4 p-3 border border-red-200 bg-red-50/50 text-red-700 text-xs rounded-none">
          <p className="font-medium">{title} benchmark failed</p>
          <p className="mt-1 text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
