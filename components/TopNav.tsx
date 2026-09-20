import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function TopNav() {
  return (
    <header className="w-full px-8 py-6 md:px-12 flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
          JEV SPEED TEST
        </span>
      </div>
      <div className="flex items-center">
        <a
          href="https://github.com/typesafe-ai/jev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label="GitHub repository"
        >
          <span>GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
