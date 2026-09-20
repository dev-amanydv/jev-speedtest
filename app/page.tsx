'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TopNav } from '@/components/TopNav';
import { BenchmarkSidebar } from '@/components/BenchmarkSidebar';
import { ModelColumn } from '@/components/ModelColumn';
import { ResultSection } from '@/components/ResultSection';
import { BENCHMARK_DECISIONS } from '@/lib/benchmark/questions';
import {
  BenchmarkMetrics,
  DecisionId,
  DecisionResult,
  BenchmarkRunEvent,
} from '@/lib/benchmark/types';

function buildInitialResults(): Record<DecisionId, DecisionResult> {
  return BENCHMARK_DECISIONS.reduce((acc, d) => {
    acc[d.id] = { id: d.id, status: 'idle' };
    return acc;
  }, {} as Record<DecisionId, DecisionResult>);
}

export default function BenchmarkPage() {
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [accessibleStatus, setAccessibleStatus] = useState<string>('Ready to run benchmark');

  // Timers & Run metadata
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [isTraditionalRunning, setIsTraditionalRunning] = useState(false);
  const [isJevRunning, setIsJevRunning] = useState(false);
  const [traditionalLatencyMs, setTraditionalLatencyMs] = useState<number | undefined>(undefined);
  const [jevLatencyMs, setJevLatencyMs] = useState<number | undefined>(undefined);

  // Results & Metrics
  const [traditionalResults, setTraditionalResults] = useState<Record<DecisionId, DecisionResult>>(buildInitialResults);
  const [jevResults, setJevResults] = useState<Record<DecisionId, DecisionResult>>(buildInitialResults);
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
    setTraditionalResults(buildInitialResults());
    setJevResults(buildInitialResults());

    // 1. Run Jev benchmark (Single parallel request)
    const runJevPromise = (async () => {
      try {
        const res = await fetch('/api/benchmark/jev', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: jevController.signal,
        });

        if (activeRunIdRef.current !== runId) return;

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error ${res.status}`);
        }

        const data = await res.json();
        if (activeRunIdRef.current !== runId) return;

        // Jev arrives: all 6 complete simultaneously
        setIsJevRunning(false);
        setJevLatencyMs(data.totalLatencyMs);
        setJevMetrics(data.metrics);

        const newJevResults: Record<DecisionId, DecisionResult> = {} as any;
        for (const d of BENCHMARK_DECISIONS) {
          newJevResults[d.id] = {
            id: d.id,
            status: 'completed',
            rawAnswer: data.answers[d.id],
            formattedAnswer: data.formattedAnswers[d.id],
          };
        }
        setJevResults(newJevResults);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        if (activeRunIdRef.current !== runId) return;
        setIsJevRunning(false);
        setJevError(err.message || 'Jev benchmark failed');
      }
    })();

    // 2. Run Traditional LLM benchmark (Sequential SSE stream)
    const runTraditionalPromise = (async () => {
      try {
        const res = await fetch('/api/benchmark/llm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: traditionalController.signal,
        });

        if (activeRunIdRef.current !== runId) return;

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
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
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        if (activeRunIdRef.current !== runId) return;
        setIsTraditionalRunning(false);
        setTraditionalError(err.message || 'Traditional LLM failed');
      }
    })();

    // Wait for both execution flows to finish
    await Promise.allSettled([runJevPromise, runTraditionalPromise]);

    if (activeRunIdRef.current === runId) {
      setStatus('completed');
      setAccessibleStatus('Benchmark complete');
    }
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111111]">
      {/* Hidden screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {accessibleStatus}
      </div>

      {/* Minimal Top Navigation */}
      <TopNav />

      {/* Main unified layout: 1/3 Sidebar, 2/3 Benchmark Comparison */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-16 flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row border border-neutral-200 bg-white">
          {/* Left Sidebar (33%) */}
          <BenchmarkSidebar
            isRunning={status === 'running'}
            isCompleted={status === 'completed'}
            onRun={runBenchmark}
            traditionalModel="gpt-4o-mini"
            jevModel="jev-latest"
          />

          {/* Right Benchmark Comparison Area (67%) */}
          <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
            {/* Model columns container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
              {/* Traditional LLM column */}
              <ModelColumn
                title="TRADITIONAL LLM"
                subtitle="Sequential evaluation"
                variant="traditional"
                isRunning={isTraditionalRunning}
                startTime={startTime}
                totalLatencyMs={traditionalLatencyMs}
                decisions={BENCHMARK_DECISIONS}
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
                decisions={BENCHMARK_DECISIONS}
                results={jevResults}
                error={jevError}
              />
            </div>

            {/* Bottom Result section (Speed, Cost, Match, Expandable Details) */}
            <ResultSection
              status={status}
              traditionalMetrics={traditionalMetrics}
              jevMetrics={jevMetrics}
              traditionalResults={traditionalResults}
              jevResults={jevResults}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
