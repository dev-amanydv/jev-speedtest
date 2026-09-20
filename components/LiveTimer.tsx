'use client';

import React, { useEffect, useState, useRef } from 'react';
import { formatNumber } from '@/lib/benchmark/pricing';

interface LiveTimerProps {
  isRunning: boolean;
  finalLatencyMs?: number;
  startTime?: number;
  variant?: 'traditional' | 'jev';
}

export function LiveTimer({
  isRunning,
  finalLatencyMs,
  startTime,
  variant = 'traditional',
}: LiveTimerProps) {
  const [displayMs, setDisplayMs] = useState<number>(finalLatencyMs ?? 0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && startTime) {
      const updateClock = () => {
        const elapsed = Math.round(performance.now() - startTime);
        setDisplayMs(elapsed);
        animFrameRef.current = requestAnimationFrame(updateClock);
      };

      animFrameRef.current = requestAnimationFrame(updateClock);

      return () => {
        if (animFrameRef.current !== null) {
          cancelAnimationFrame(animFrameRef.current);
        }
      };
    } else if (!isRunning) {
      if (finalLatencyMs !== undefined) {
        setDisplayMs(finalLatencyMs);
      } else {
        setDisplayMs(0);
      }
    }
  }, [isRunning, startTime, finalLatencyMs]);

  // Accent color for Jev timer, neutral for Traditional LLM
  const colorClasses =
    variant === 'jev'
      ? 'text-blue-600'
      : 'text-neutral-900';

  return (
    <div
      className={`font-mono text-2xl md:text-3xl font-normal tracking-tight ${colorClasses} tabular-nums select-none`}
      aria-hidden="true"
    >
      {formatNumber(displayMs)} <span className="text-sm font-normal text-neutral-400">ms</span>
    </div>
  );
}
