import React from 'react';
import { TopNav } from '@/components/TopNav';
import { BenchmarkInteractive } from '@/components/BenchmarkInteractive';
import { SeoContentSection } from '@/components/SeoContentSection';
import { JsonLd } from '@/components/JsonLd';

export default function BenchmarkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111111]">
      {/* Schema.org Structured Data for Google Rich Snippets */}
      <JsonLd />

      {/* Semantic Top Navigation */}
      <TopNav />

      {/* Main Semantic Content Area */}
      <main className="flex-1 flex flex-col w-full">
        {/* Visual & Semantic H1 Header for SEO */}
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-2 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-neutral-200/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-neutral-500 uppercase tracking-widest mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Live Performance Benchmark
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
                JEV Speed Test : <span className="text-blue-600 font-semibold">LLM vs Jev Evaluation</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl text-left">
              Compare execution speed, latency, and cost between traditional sequential LLM calls and Jev (<code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">typesafe-ai/jev</code>) for structured decision making.
            </p>
          </div>
        </header>

        {/* Live Interactive Benchmark Suite */}
        <BenchmarkInteractive />

        {/* Deep Indexable Content: Architecture, Telemetry, Presets, FAQ, About Aman Yadav */}
        <SeoContentSection />
      </main>
    </div>
  );
}
