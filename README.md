# JEV Speed Test

A minimal, developer-oriented benchmark web application that compares how quickly a traditional LLM workflow and **Jev** can make the same set of structured decisions from the same input.

> **Same input → same decisions → different execution time → measurable speed/cost difference.**

---

## Benchmark Overview

The benchmark evaluates a realistic customer support ticket:

> *"I've been charged twice for my subscription. I need one refund and this is really urgent."*

Both systems evaluate the **exact same 6 structured decisions**:
1. **Department** (`choice`: billing, technical, sales, other)
2. **Refund** (`boolean` / Noul: Is the customer requesting a refund?)
3. **Urgency** (`choice`: routine, normal, urgent, critical)
4. **Escalation** (`boolean` / Noul: Should this request be escalated immediately?)
5. **Severity** (`score`: 1 to 4 with impact rubric)
6. **Next action** (`choice`: refund, investigate, respond, escalate)

### Execution Model Comparison

| Metric / Dimension | Traditional LLM | Jev (`typesafe-ai/jev`) |
| :--- | :--- | :--- |
| **Input** | Same support ticket | Same support ticket |
| **Decisions** | 6 decisions | 6 decisions |
| **Requests** | 6 sequential requests | 1 single evaluation request |
| **Execution** | Sequential | Parallel |
| **Latency** | Measured end-to-end sequential time | Measured single evaluation time |
| **Streaming** | Step-by-step progress | Simultaneous completion |

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [Vercel AI SDK](https://ai-sdk.dev/) (`experimental_evaluate`, `@ai-sdk/openai`)

---

## Getting Started

### 1. Clone & Install Dependencies

```bash
bun install
# or: npm install
```

### 2. Environment Configuration (Optional)

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Configure your API keys in `.env.local`:

```env
# 1. Jev evaluation via Vercel AI Gateway (or JEV_API_KEY)
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_api_key_here

# 2. Traditional LLM: Primary Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash-lite

# 3. Traditional LLM: Fallback Groq
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
```

> **Note**: If API keys are not provided or kept as placeholders, the server automatically operates in realistic developer benchmark simulation mode, demonstrating the true timing characteristics and workflow differences without external dependencies.

### 3. Run Development Server

```bash
bun dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Design System & Principles

- **Developer Tooling Aesthetic**: Linear / Vercel style — typographic hierarchy, hairline borders (`#E5E7EB`), spacious whitespace, `#FAFAFA` monochrome background.
- **Accurate Real-Time Clocks**: High-precision `performance.now()` with `requestAnimationFrame` for live visual timers in monospace font.
- **Honest Metrics**: No fake Jev decision streaming, no hardcoded speed multipliers, and no celebratory animations. Cost is estimated via centralized pricing configuration (`lib/benchmark/pricing.ts`).
