import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe } from 'lucide-react';

function GithubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function XIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function TopNav() {
  return (
    <header className="w-full h-14 px-4 sm:px-6 md:px-10 flex-shrink-0 flex items-center justify-between border-b border-neutral-200/70 bg-[#FAFAFA] select-none">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-xs font-semibold tracking-wider text-neutral-900 uppercase hover:text-neutral-600 transition-colors"
        >
          JEV SPEED TEST
        </Link>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <a
          href="https://amanydv.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50    transition-colors"
          aria-label="Aman Yadav Portfolio"
        >
          <Globe className="w-3.5 h-3.5 text-neutral-500 shrink-0" aria-hidden="true" />
          <span>Portfolio</span>
          <ArrowUpRight className="w-3 h-3 text-neutral-400 shrink-0 hidden sm:inline-block" aria-hidden="true" />
        </a>

        <a
          href="https://x.com/aman100xdev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50  transition-colors "
          aria-label="Aman Yadav on X"
        >
          <XIcon className="w-3 h-3 text-neutral-700 shrink-0" />
          <span>@aman100xdev</span>
          <ArrowUpRight className="w-3 h-3 text-neutral-400 shrink-0 hidden sm:inline-block" aria-hidden="true" />
        </a>

        <a
          href="https://github.com/dev-amanydv/jev-speedtest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-900 hover:text-neutral-950  transition-colors"
          aria-label="GitHub repository"
        >
          <GithubIcon className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
          <span>GitHub</span>
          <ArrowUpRight className="w-3 h-3 text-neutral-400 shrink-0 hidden sm:inline-block" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
