'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { BENCHMARK_DECISIONS, BENCHMARK_INPUT_TEXT } from '@/lib/benchmark/questions';

interface BenchmarkSidebarProps {
  isRunning: boolean;
  isCompleted: boolean;
  onRun: () => void;
  traditionalModel?: string;
  jevModel?: string;
}

export function BenchmarkSidebar({
  isRunning,
  isCompleted,
  onRun,
  traditionalModel = 'gpt-4o-mini',
  jevModel = 'jev-latest',
}: BenchmarkSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="w-full md:w-1/3 h-full min-h-0 flex flex-col border-b md:border-b-0 md:border-r border-neutral-200 bg-white overflow-hidden">
      {/* Top benchmark scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
            BENCHMARK
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Support ticket
          </p>
        </div>

        {/* Test input text */}
        <div className="text-sm text-neutral-800 leading-relaxed font-normal">
          {BENCHMARK_INPUT_TEXT}
        </div>

        {/* 6 decisions list */}
        <div className="space-y-2 pt-2 border-t border-neutral-200">
          <p className="text-xs font-medium text-neutral-500 mb-3">
            6 decisions
          </p>
          <div className="space-y-2 font-normal text-xs text-neutral-800">
            {BENCHMARK_DECISIONS.map((d) => (
              <div key={d.id} className="flex items-center gap-3">
                <span className="font-mono text-neutral-400 select-none w-5">
                  {d.number}
                </span>
                <span className="text-neutral-700">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Read more progressive disclosure */}
        <div className="pt-2 border-t border-neutral-200">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="group inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 transition-colors py-1 cursor-pointer select-none"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Read less' : 'Read more'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
            )}
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4 animate-in fade-in duration-200">
              <div>
                <p className="font-semibold text-neutral-900 tracking-wide uppercase text-[11px]">
                  TRADITIONAL LLM
                </p>
                <div className="mt-1.5 space-y-1">
                  <p>
                    <span className="text-neutral-400">Model:</span>{' '}
                    <span className="font-mono text-neutral-800">{traditionalModel}</span>
                  </p>
                  <p>
                    <span className="text-neutral-400">Execution:</span> Sequential
                  </p>
                  <p>
                    <span className="text-neutral-400">Requests:</span> 6
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-neutral-900 tracking-wide uppercase text-[11px]">
                  JEV
                </p>
                <div className="mt-1.5 space-y-1">
                  <p>
                    <span className="text-neutral-400">Model:</span>{' '}
                    <span className="font-mono text-neutral-800">{jevModel}</span>
                  </p>
                  <p>
                    <span className="text-neutral-400">Execution:</span> Single request
                  </p>
                  <p>
                    <span className="text-neutral-400">Questions:</span> 6
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-neutral-900 tracking-wide uppercase text-[11px]">
                  COST METHODOLOGY
                </p>
                <p className="mt-1 text-neutral-500">
                  Displayed costs are estimated from measured token usage and configured provider pricing: Jev input tokens at $0.042/1M (output free), Traditional LLM at $0.15/1M input and $0.60/1M output.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Run button anchored at bottom */}
      <div className="flex-shrink-0 p-6 md:p-8 pt-4 md:pt-4 border-t border-neutral-200 bg-white">
        <button
          type="button"
          onClick={onRun}
          disabled={isRunning}
          className={`w-full py-2.5 px-4 text-xs font-medium tracking-wide flex items-center justify-between border transition-all duration-150 select-none ${
            isRunning
              ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed'
              : 'bg-neutral-900 text-neutral-50 border-neutral-900 hover:bg-neutral-800 active:bg-neutral-950 cursor-pointer'
          }`}
          aria-label={
            isRunning
              ? 'Running benchmark'
              : isCompleted
              ? 'Run benchmark again'
              : 'Run benchmark'
          }
        >
          <span>
            {isRunning
              ? 'Running benchmark...'
              : isCompleted
              ? 'Run again'
              : 'Run benchmark'}
          </span>
          <ArrowRight
            className={`w-3.5 h-3.5 ${
              isRunning ? 'opacity-30' : 'opacity-80'
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );
}
