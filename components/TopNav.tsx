import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function TopNav() {
  return (
    <header className="w-full h-14 px-4 sm:px-6 md:px-10 flex-shrink-0 flex items-center justify-between border-b border-neutral-200/70 bg-[#FAFAFA] sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="JEV Speed Test Home"
        >
          <div className="w-6 h-6 rounded bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
            J
          </div>
          <span className="text-xs font-bold tracking-wider text-neutral-900 uppercase">
            JEV SPEED TEST
          </span>
        </Link>
      </div>

      <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-xs text-neutral-600">
        <a href="#benchmark" className="hover:text-neutral-900 transition-colors">
          Live Benchmark
        </a>
        <a href="#architecture" className="hover:text-neutral-900 transition-colors">
          Architecture
        </a>
        <a href="#methodology" className="hover:text-neutral-900 transition-colors">
          Methodology
        </a>
        <a href="#faq" className="hover:text-neutral-900 transition-colors">
          FAQ
        </a>
        <a href="#about" className="hover:text-neutral-900 transition-colors">
          About
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="https://amanydv.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label="Creator Portfolio amanydv.in"
        >
          <span>amanydv.in</span>
          <ArrowUpRight className="w-3 h-3 opacity-60" aria-hidden="true" />
        </a>

        <a
          href="https://github.com/typesafe-ai/jev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded border border-neutral-200"
          aria-label="GitHub repository"
        >
          <span>GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
