'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronUp } from 'lucide-react';
import {
  BenchmarkPreset,
  BENCHMARK_PRESETS,
  PresetId,
} from '@/lib/benchmark/questions';
import { DecisionDefinition } from '@/lib/benchmark/types';

interface BenchmarkSidebarProps {
  isRunning: boolean;
  isCompleted: boolean;
  onRun: () => void;
  traditionalModel?: string;
  jevModel?: string;
  inputText: string;
  onInputChange: (text: string) => void;
  activePresetId: PresetId | null;
  activePreset: BenchmarkPreset | null;
  onSelectPreset: (presetId: PresetId) => void;
  decisions: DecisionDefinition[];
  isCustom: boolean;
}

export function BenchmarkSidebar({
  isRunning,
  isCompleted,
  onRun,
  traditionalModel = 'gemini-3.5-flash-lite (fallback: groq)',
  jevModel = 'jev-latest',
  inputText,
  onInputChange,
  activePresetId,
  activePreset,
  onSelectPreset,
  decisions,
  isCustom,
}: BenchmarkSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="w-full md:w-1/3 h-full min-h-0 flex flex-col border-b md:border-b-0 md:border-r border-neutral-200 bg-white overflow-hidden">
      {/* Top benchmark scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-6 md:p-8 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
              BENCHMARK
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              {activePreset ? activePreset.title : 'Custom input evaluation'}
            </p>
          </div>
          {isCustom && !isRunning && (
            <button
              type="button"
              onClick={() => onSelectPreset('billing')}
              className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer select-none underline-offset-2 hover:underline"
            >
              Reset default
            </button>
          )}
        </div>

        {/* Preset Selector - Clean 3-column pill grid with zero clutter */}
        <div className="grid grid-cols-3 gap-1.5">
          {BENCHMARK_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                disabled={isRunning}
                onClick={() => onSelectPreset(preset.id)}
                className={`py-1.5 px-1.5 sm:px-2 text-[11px] font-medium tracking-tight text-center truncate transition-all duration-150 cursor-pointer select-none border ${
                  isActive
                    ? 'border-neutral-900 bg-neutral-900 text-neutral-50 shadow-2xs'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                } ${isRunning ? 'opacity-40 cursor-not-allowed' : ''}`}
                title={preset.label}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Text Input Card - Pure, uncluttered textarea */}
        <div
          className={`border border-neutral-200 focus-within:border-neutral-900 bg-white transition-colors duration-150 p-3.5 ${
            isRunning ? 'opacity-60 pointer-events-none' : ''
          }`}
        >
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            disabled={isRunning}
            rows={3}
            placeholder="Type or paste any input to test..."
            className="w-full text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal placeholder:text-neutral-400 bg-transparent resize-none outline-none border-0 p-0 focus:ring-0"
          />
        </div>

        {/* 6 Decisions List (for Presets) OR Fallback UI (for Custom Input) */}
        {!isCustom && activePreset ? (
          <div className="space-y-2 pt-2 border-t border-neutral-200">
            <p className="text-xs font-medium text-neutral-500 mb-3">
              {activePreset.id === 'trading'
                ? '6 languages · Tech inquiry'
                : activePreset.id === 'outage'
                ? '6 root causes · Production outage'
                : `6 decisions · ${activePreset.label}`}
            </p>
            <div className="space-y-2 font-normal text-xs text-neutral-800">
              {decisions.map((d) => (
                <div key={d.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-neutral-400 select-none w-5">
                      {d.number}
                    </span>
                    <span className="text-neutral-700">{d.name}</span>
                  </div>
                  {d.type === 'percentage' && (
                    <span className="font-mono text-[10px] text-neutral-400 bg-neutral-50 border border-neutral-200/80 px-1.5 py-0.5 select-none">
                      % chance
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-2 border-t border-neutral-200">
            <div className="p-3.5 border border-dashed border-neutral-200 bg-neutral-50/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-neutral-800">
                  Custom input mode
                </span>
                <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 uppercase tracking-wider">
                  Universal Schema
                </span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Evaluating 6 universal triage decisions: Category, Action required, Urgency, Escalation, Complexity, and Next step.
              </p>
            </div>
          </div>
        )}

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
                  Displayed costs are estimated from measured token usage and configured provider pricing: Jev input tokens at $0.042/1M (output free), Traditional LLM (Gemini / Groq) at $0.075/1M input and $0.30/1M output.
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
