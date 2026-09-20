import React from 'react';
import { ArrowUpRight, Zap, Cpu, Database, CheckCircle2, User, HelpCircle, GitFork } from 'lucide-react';

export function SeoContentSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 space-y-16 text-neutral-800">
      {/* SECTION 1: What is Jev Speed Test? */}
      <section id="overview" aria-labelledby="overview-heading" className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200">
          <Zap className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Speed &amp; Latency Benchmark</span>
        </div>
        <h2 id="overview-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          What is JEV Speed Test?
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-4xl">
          <strong>JEV Speed Test</strong> is an open-source, developer-focused performance benchmark web application designed to measure and compare how quickly modern AI systems make structured decisions from unstructured user input. Hosted on{' '}
          <a href="https://jev-speedtest.amanydv.in" className="text-blue-600 hover:underline font-medium">
            https://jev-speedtest.amanydv.in
          </a>
          , this benchmark tests identical inputs against two fundamentally different architectural paradigms: a <strong>traditional sequential LLM pipeline</strong> (such as Google Gemini or Groq) and <strong>Jev</strong> (
          <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800">typesafe-ai/jev</code>
          ).
        </p>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-4xl">
          When software engineers build customer support triage, automated underwriting, fraud detection, or content moderation workflows, they typically chain multiple LLM prompts sequentially or rely on complex function calling. JEV Speed Test provides empirical, millisecond-accurate telemetry showing the speed, latency, token consumption, and cost consequences of these architecture choices.
        </p>
      </section>

      {/* SECTION 2: Architecture Deep Dive */}
      <section id="architecture" aria-labelledby="arch-heading" className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-neutral-100 text-neutral-700 border border-neutral-200">
          <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
          <span>System Architecture</span>
        </div>
        <h2 id="arch-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          The Latency Bottleneck: Sequential Roundtrips vs. Parallel Evaluation
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-4xl">
          In production applications, evaluating 6 structured attributes (such as department routing, refund requests, priority, escalation, severity, and immediate action) using traditional LLM chains leads to cumulative network overhead:
        </p>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Card: Sequential LLM */}
          <div className="p-6 rounded-xl border border-neutral-200 bg-white shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">Traditional LLM Chain</span>
              <span className="text-xs font-mono text-neutral-400">Sequential Execution</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Cumulative Multi-Roundtrip Overhead</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Each structured decision requires an independent prompt execution. Even with streaming, each decision suffers from:
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>6 Separate HTTP Roundtrips:</strong> Every request incurs DNS, TLS, and network transit time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Repeated Time-to-First-Token (TTFT):</strong> The server re-evaluates the prompt context for each call.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Token Multiplication:</strong> Sending the same ticket text 6 times inflates input token costs.</span>
              </li>
            </ul>
          </div>

          {/* Card: JEV */}
          <div className="p-6 rounded-xl border border-blue-200 bg-blue-50/40 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Jev Evaluation Engine</span>
              <span className="text-xs font-mono text-blue-600">Parallel Single Request</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Single-Pass Unified Evaluation</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Jev (<code className="text-xs bg-white px-1.5 py-0.5 rounded border border-neutral-200">typesafe-ai/jev</code>) optimizes structured decision-making through a consolidated execution model:
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                <span><strong>1 Single HTTP Request:</strong> All 6 decision parameters are evaluated simultaneously in parallel.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                <span><strong>Sub-Second Response Times:</strong> Execution time drops from several seconds to a few hundred milliseconds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                <span><strong>Zero Redundant Tokens:</strong> The input prompt is processed once, drastically lowering inference cost.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Structured Comparison Table */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left text-sm border-collapse border border-neutral-200 bg-white">
            <thead>
              <tr className="bg-neutral-50 text-neutral-900 font-semibold border-b border-neutral-200">
                <th className="p-3.5 border-r border-neutral-200">Feature / Dimension</th>
                <th className="p-3.5 border-r border-neutral-200">Traditional LLM Workflow</th>
                <th className="p-3.5">Jev (typesafe-ai/jev)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr>
                <td className="p-3.5 font-medium border-r border-neutral-200">Execution Model</td>
                <td className="p-3.5 border-r border-neutral-200">Sequential chaining (1 decision per request)</td>
                <td className="p-3.5 font-semibold text-blue-700">Parallel evaluation (single request)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium border-r border-neutral-200">Total Requests</td>
                <td className="p-3.5 border-r border-neutral-200">N requests (6 roundtrips)</td>
                <td className="p-3.5 font-semibold text-blue-700">1 single unified request</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium border-r border-neutral-200">End-to-End Latency</td>
                <td className="p-3.5 border-r border-neutral-200">Sum of all sequential TTFT &amp; inference</td>
                <td className="p-3.5 font-semibold text-emerald-600">Single fastest-path latency</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium border-r border-neutral-200">Output Guarantees</td>
                <td className="p-3.5 border-r border-neutral-200">Prone to schema hallunication / parsing errors</td>
                <td className="p-3.5 font-semibold text-blue-700">Strict typed schema validation</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium border-r border-neutral-200">Cost Efficiency</td>
                <td className="p-3.5 border-r border-neutral-200">Multiplied prompt token consumption</td>
                <td className="p-3.5 font-semibold text-emerald-600">Optimal single-pass token usage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: Decision Presets & Methodology */}
      <section id="methodology" aria-labelledby="methodology-heading" className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-neutral-100 text-neutral-700 border border-neutral-200">
          <Database className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Testing Methodology</span>
        </div>
        <h2 id="methodology-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Benchmark Decision Presets
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-4xl">
          To ensure impartial, reproducible benchmarking, JEV Speed Test includes standardized real-world business prompts, as well as a custom prompt editor:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-lg border border-neutral-200 bg-white space-y-2">
            <h3 className="font-semibold text-neutral-900 text-base">1. Customer Billing &amp; Refunds</h3>
            <p className="text-xs text-neutral-500">
              Evaluates duplicate charges, refund urgency, department routing, and escalation flags from urgent customer inquiries.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-neutral-200 bg-white space-y-2">
            <h3 className="font-semibold text-neutral-900 text-base">2. Technical Incident Triage</h3>
            <p className="text-xs text-neutral-500">
              Tests stack trace parsing, severity score mapping (1-4), root cause classification, and immediate ops notification.
            </p>
          </div>
          <div className="p-5 rounded-lg border border-neutral-200 bg-white space-y-2">
            <h3 className="font-semibold text-neutral-900 text-base">3. Custom Prompt Testing</h3>
            <p className="text-xs text-neutral-500">
              Enter any unstructured text into the sidebar editor to live-test decision extraction latency across any business domain.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Frequently Asked Questions (FAQ) */}
      <section id="faq" aria-labelledby="faq-heading" className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-neutral-100 text-neutral-700 border border-neutral-200">
          <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Frequently Asked Questions About JEV Speed Test
        </h2>

        <div className="space-y-4 max-w-4xl">
          <details className="group border border-neutral-200 rounded-lg bg-white p-5 open:shadow-xs transition-all">
            <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex items-center justify-between">
              <span>What is JEV Speed Test?</span>
              <span className="text-neutral-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              JEV Speed Test (hosted at <a href="https://jev-speedtest.amanydv.in" className="text-blue-600 hover:underline">https://jev-speedtest.amanydv.in</a>) is an open-source benchmarking platform that compares the structured decision-making latency, token costs, and throughput between traditional sequential LLM calls and Jev (<code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">typesafe-ai/jev</code>).
            </p>
          </details>

          <details className="group border border-neutral-200 rounded-lg bg-white p-5 open:shadow-xs transition-all">
            <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex items-center justify-between">
              <span>Why is Jev so much faster than conventional LLMs?</span>
              <span className="text-neutral-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              Traditional LLMs require sequential API roundtrips where each step waits for the previous call to resolve, re-processing prompt tokens each time. Jev uses a parallelized, unified evaluation pipeline that resolves all structured decisions in a single HTTP request, yielding sub-second turnaround times.
            </p>
          </details>

          <details className="group border border-neutral-200 rounded-lg bg-white p-5 open:shadow-xs transition-all">
            <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex items-center justify-between">
              <span>How are latency and timers measured?</span>
              <span className="text-neutral-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              The benchmark uses browser-native <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">performance.now()</code> timers synchronized with Server-Sent Events (SSE) from our Next.js API endpoints. Latency metrics reflect genuine end-to-end execution without simulated artificial delays.
            </p>
          </details>

          <details className="group border border-neutral-200 rounded-lg bg-white p-5 open:shadow-xs transition-all">
            <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex items-center justify-between">
              <span>Can I run this benchmark locally or contribute?</span>
              <span className="text-neutral-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              Yes! The code is open source and can be run using Bun or Node.js. Check out the official repository at <a href="https://github.com/typesafe-ai/jev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/typesafe-ai/jev</a>. You can supply your own API keys for Gemini, Groq, or Vercel AI Gateway in <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">.env.local</code>.
            </p>
          </details>
        </div>
      </section>

      {/* SECTION 5: About Me (Creator Section) */}
      <section id="about" aria-labelledby="about-heading" className="space-y-6 pt-4 border-t border-neutral-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200">
          <User className="w-3.5 h-3.5" aria-hidden="true" />
          <span>About the Developer</span>
        </div>
        <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          About Aman Yadav
        </h2>

        <div className="p-6 sm:p-8 rounded-xl border border-neutral-200 bg-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-neutral-900">Aman Yadav</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 font-medium">
                Software Engineer &amp; AI Systems Developer
              </span>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              I am a software engineer dedicated to building high-performance developer tools, latency-critical web systems, and modern AI architectures. JEV Speed Test was created to provide the developer community with objective, live metrics on how alternative structured decision architectures outperform legacy sequential LLM chains.
            </p>
            <p className="text-sm text-neutral-500">
              Explore my portfolio, open-source projects, and technical writings at{' '}
              <a
                href="https://amanydv.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>amanydv.in</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </p>
          </div>

          <div className="flex flex-row md:flex-col gap-3 shrink-0">
            <a
              href="https://amanydv.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-xs"
            >
              <span>Visit amanydv.in</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/typesafe-ai/jev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors border border-neutral-200"
            >
              <GitFork className="w-4 h-4 text-neutral-500" aria-hidden="true" />
              <span>Jev on GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6: Semantic Footer */}
      <footer className="pt-8 border-t border-neutral-200 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-800">JEV SPEED TEST</span>
          <span>•</span>
          <span>Hosted on <a href="https://jev-speedtest.amanydv.in" className="hover:underline text-neutral-700">jev-speedtest.amanydv.in</a></span>
        </div>

        <nav aria-label="Footer Navigation" className="flex items-center gap-5">
          <a href="#benchmark" className="hover:text-neutral-900 transition-colors">Benchmark</a>
          <a href="#architecture" className="hover:text-neutral-900 transition-colors">Architecture</a>
          <a href="#faq" className="hover:text-neutral-900 transition-colors">FAQ</a>
          <a href="#about" className="hover:text-neutral-900 transition-colors">About</a>
          <a href="/sitemap.xml" className="hover:text-neutral-900 transition-colors">Sitemap</a>
        </nav>

        <div>
          © {new Date().getFullYear()} <a href="https://amanydv.in" className="hover:underline text-neutral-700 font-medium">Aman Yadav</a>. Open source under MIT.
        </div>
      </footer>
    </div>
  );
}
