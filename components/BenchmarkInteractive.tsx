'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BenchmarkSidebar } from '@/components/BenchmarkSidebar';
import { ModelColumn } from '@/components/ModelColumn';
import { ResultSection } from '@/components/ResultSection';
import {
  BENCHMARK_PRESETS,
  BENCHMARK_DEFAULT_INPUT,
  getPresetOrFallback,
  PresetId,
} from '@/lib/benchmark/questions';
import {
  BenchmarkMetrics,
  DecisionDefinition,
  DecisionId,
  DecisionResult,
  BenchmarkRunEvent,
} from '@/lib/benchmark/types';

function buildInitialResults(decisions: DecisionDefinition[]): Record<DecisionId, DecisionResult> {
  return decisions.reduce((acc, d) => {
    acc[d.id] = { id: d.id, status: 'idle' };
    return acc;
  }, {} as Record<DecisionId, DecisionResult>);
}

export function BenchmarkInteractive() {
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [accessibleStatus, setAccessibleStatus] = useState<string>('Ready to run benchmark');

  // Active preset & input text
  const [activePresetId, setActivePresetId] = useState<PresetId | null>('billing');
  const [inputText, setInputText] = useState<string>(BENCHMARK_DEFAULT_INPUT);

  const { preset: activePreset, decisions: currentDecisions, isPreset } = getPresetOrFallback(activePresetId);
  const isCustom = !isPreset || inputText.trim() !== activePreset?.text.trim();

  // Timers & Run metadata
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [isTraditionalRunning, setIsTraditionalRunning] = useState(false);
  const [isJevRunning, setIsJevRunning] = useState(false);
  const [traditionalLatencyMs, setTraditionalLatencyMs] = useState<number | undefined>(undefined);
  const [jevLatencyMs, setJevLatencyMs] = useState<number | undefined>(undefined);

  // Results & Metrics
  const [traditionalResults, setTraditionalResults] = useState<Record<DecisionId, DecisionResult>>(() =>
    buildInitialResults(currentDecisions)
  );
  const [jevResults, setJevResults] = useState<Record<DecisionId, DecisionResult>>(() =>
    buildInitialResults(currentDecisions)
  );
  const [traditionalMetrics, setTraditionalMetrics] = useState<BenchmarkMetrics | undefined>(undefined);
  const [jevMetrics, setJevMetrics] = useState<BenchmarkMetrics | undefined>(undefined);

  // Errors
  const [traditionalError, setTraditionalError] = useState<string | undefined>(undefined);
  const [jevError, setJevError] = useState<string | undefined>(undefined);

  // Run ID & AbortControllers to prevent race conditions
  const activeRunIdRef = useRef<string | null>(null);
  const abortControllersRef = useRef<{ traditional?: AbortController; jev?: AbortController }>({});

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllersRef.current.traditional) {
        abortControllersRef.current.traditional.abort();
      }
      if (abortControllersRef.current.jev) {
        abortControllersRef.current.jev.abort();
      }
    };
  }, []);

  const handleSelectPreset = useCallback(
    (presetId: PresetId) => {
      if (status === 'running') return;
      const targetPreset = BENCHMARK_PRESETS.find((p) => p.id === presetId);
      if (targetPreset) {
        setActivePresetId(presetId);
        setInputText(targetPreset.text);
        setTraditionalResults(buildInitialResults(targetPreset.decisions));
        setJevResults(buildInitialResults(targetPreset.decisions));
        setStatus('idle');
        setTraditionalLatencyMs(undefined);
        setJevLatencyMs(undefined);
        setTraditionalMetrics(undefined);
        setJevMetrics(undefined);
        setTraditionalError(undefined);
        setJevError(undefined);
      }
    },
    [status]
  );

  const handleInputChange = useCallback(
    (newText: string) => {
      setInputText(newText);
      const matchingPreset = BENCHMARK_PRESETS.find((p) => p.text.trim() === newText.trim());
      if (matchingPreset) {
        if (activePresetId !== matchingPreset.id) {
          setActivePresetId(matchingPreset.id);
          setTraditionalResults(buildInitialResults(matchingPreset.decisions));
          setJevResults(buildInitialResults(matchingPreset.decisions));
        }
      } else {
        if (activePresetId !== null) {
          setActivePresetId(null);
          const { decisions: fallbackDecisions } = getPresetOrFallback(null);
          setTraditionalResults(buildInitialResults(fallbackDecisions));
          setJevResults(buildInitialResults(fallbackDecisions));
        }
      }
    },
    [activePresetId]
  );

  const runBenchmark = useCallback(async () => {
    if (status === 'running') return;

    // Generate unique run ID
    const runId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    activeRunIdRef.current = runId;

    // Cancel any previous requests
    if (abortControllersRef.current.traditional) abortControllersRef.current.traditional.abort();
    if (abortControllersRef.current.jev) abortControllersRef.current.jev.abort();

    const traditionalController = new AbortController();
    const jevController = new AbortController();
    abortControllersRef.current = {
      traditional: traditionalController,
      jev: jevController,
    };

    // Reset states
    setStatus('running');
    setAccessibleStatus('Benchmark running');
    const now = performance.now();
    setStartTime(now);
    setIsTraditionalRunning(true);
    setIsJevRunning(true);
    setTraditionalLatencyMs(undefined);
    setJevLatencyMs(undefined);
    setTraditionalMetrics(undefined);
    setJevMetrics(undefined);
    setTraditionalError(undefined);
    setJevError(undefined);
    setTraditionalResults(buildInitialResults(currentDecisions));
    setJevResults(buildInitialResults(currentDecisions));

    const promptInput = inputText.trim() || BENCHMARK_DEFAULT_INPUT;
    const currentPresetPayload = activePresetId || 'custom';

    // 1. Run Jev benchmark (Single parallel request)
    const runJevPromise = (async () => {
      try {
        const res = await fetch('/api/benchmark/jev', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: promptInput,
            presetId: currentPresetPayload,
          }),
          signal: jevController.signal,
        });

        if (activeRunIdRef.current !== runId) return;

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error ${res.status}`);
        }

        const data = await res.json();
        if (activeRunIdRef.current !== runId) return;

        // Jev arrives: all complete simultaneously
        setIsJevRunning(false);
        setJevLatencyMs(data.totalLatencyMs);
        setJevMetrics(data.metrics);

        const newJevResults: Record<DecisionId, DecisionResult> = {} as Record<
          DecisionId,
          DecisionResult
        >;
        for (const d of currentDecisions) {
          newJevResults[d.id] = {
            id: d.id,
            status: 'completed',
            rawAnswer: data.answers[d.id],
            formattedAnswer: data.formattedAnswers[d.id],
          };
        }
        setJevResults(newJevResults);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        if (activeRunIdRef.current !== runId) return;
        setIsJevRunning(false);
        setJevError(err instanceof Error ? err.message : 'Jev benchmark failed');
      }
    })();

    // 2. Run Traditional LLM benchmark (Sequential SSE stream)
    const runTraditionalPromise = (async () => {
      try {
        const res = await fetch('/api/benchmark/llm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: promptInput,
            presetId: currentPresetPayload,
          }),
          signal: traditionalController.signal,
        });

        if (activeRunIdRef.current !== runId) return;

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error('Response body is not readable');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (activeRunIdRef.current !== runId) {
            reader.cancel();
            return;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ')) {
              try {
                const event: BenchmarkRunEvent = JSON.parse(trimmed.slice(6));

                if (event.type === 'step_start' && event.stepId) {
                  setTraditionalResults((prev) => ({
                    ...prev,
                    [event.stepId!]: {
                      ...prev[event.stepId!],
                      status: 'running',
                    },
                  }));
                } else if (event.type === 'step_complete' && event.stepId) {
                  setTraditionalResults((prev) => ({
                    ...prev,
                    [event.stepId!]: {
                      id: event.stepId!,
                      status: 'completed',
                      rawAnswer: event.rawAnswer,
                      formattedAnswer: event.formattedAnswer,
                      latencyMs: event.latencyMs,
                    },
                  }));
                } else if (event.type === 'all_complete') {
                  setIsTraditionalRunning(false);
                  setTraditionalLatencyMs(event.totalLatencyMs);
                  setTraditionalMetrics(event.metrics);
                } else if (event.type === 'error') {
                  setIsTraditionalRunning(false);
                  setTraditionalError(event.error || 'Traditional LLM failed');
                }
              } catch {
                // Ignore parse errors on partial frames
              }
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        if (activeRunIdRef.current !== runId) return;
        setIsTraditionalRunning(false);
        setTraditionalError(
          err instanceof Error ? err.message : 'Traditional LLM failed'
        );
      }
    })();

    // Wait for both execution flows to finish
    await Promise.allSettled([runJevPromise, runTraditionalPromise]);

    if (activeRunIdRef.current === runId) {
      setStatus('completed');
      setAccessibleStatus('Benchmark complete');
    }
  }, [status, inputText, activePresetId, currentDecisions]);

  return (
    <section id="benchmark" aria-label="Interactive Benchmark Suite" className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-3 md:py-4">
      {/* Hidden screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {accessibleStatus}
      </div>

      {/* Main unified benchmark card */}
      <div className="min-h-[580px] md:h-[calc(100vh-6rem)] md:max-h-[820px] flex flex-col md:flex-row border border-neutral-200 bg-white shadow-2xs rounded-lg overflow-hidden">
        {/* Left Sidebar (33%) */}
        <BenchmarkSidebar
          isRunning={status === 'running'}
          isCompleted={status === 'completed'}
          onRun={runBenchmark}
          traditionalModel="gemini-3.5-flash-lite (fallback: groq)"
          jevModel="jev-latest"
          inputText={inputText}
          onInputChange={handleInputChange}
          activePresetId={activePresetId}
          activePreset={activePreset}
          onSelectPreset={handleSelectPreset}
          decisions={currentDecisions}
          isCustom={isCustom}
        />

        {/* Right Benchmark Comparison Area (67%) */}
        <div className="w-full md:w-2/3 h-full min-h-[460px] md:min-h-0 relative flex flex-col overflow-hidden bg-white">
          {/* Steps container */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-6 md:p-8 pb-16 flex flex-col justify-between">
            {/* Model columns container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
              {/* Traditional LLM column */}
              <ModelColumn
                title="TRADITIONAL LLM"
                subtitle="Sequential (Gemini → Groq)"
                variant="traditional"
                isRunning={isTraditionalRunning}
                startTime={startTime}
                totalLatencyMs={traditionalLatencyMs}
                decisions={currentDecisions}
                results={traditionalResults}
                error={traditionalError}
              />

              {/* Jev column */}
              <ModelColumn
                title="JEV"
                subtitle="Single request"
                variant="jev"
                isRunning={isJevRunning}
                startTime={startTime}
                totalLatencyMs={jevLatencyMs}
                decisions={currentDecisions}
                results={jevResults}
                error={jevError}
              />
            </div>

            {/* Status message at bottom of steps when not completed */}
            {status !== 'completed' && (
              <div className="flex-shrink-0 pt-4 mt-6 border-t border-neutral-200">
                {status === 'running' ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <p className="text-xs text-neutral-600 font-normal select-none">
                      Evaluating benchmark in real time...
                    </p>
                  </div>
                ) : status === 'error' ? (
                  <p className="text-xs text-red-600 font-normal">
                    Benchmark incomplete due to error. Check individual model output.
                  </p>
                ) : (
                  <p className="text-xs text-neutral-400 font-normal select-none">
                    Run the benchmark to compare.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sliding Results Overlay (covers 80% when completed, with slide-down toggle) */}
          {status === 'completed' && (
            <ResultSection
              key={startTime}
              status={status}
              traditionalMetrics={traditionalMetrics}
              jevMetrics={jevMetrics}
              traditionalResults={traditionalResults}
              jevResults={jevResults}
              decisions={currentDecisions}
              activePresetId={activePresetId}
            />
          )}
        </div>
      </div>
    </section>
  );
}
