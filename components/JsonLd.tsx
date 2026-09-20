import React from 'react';

export function JsonLd() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'JEV Speed Test',
      alternateName: ['Jev Speedtest', 'Jev Benchmark', 'JEV LLM Speed Test'],
      url: 'https://jev-speedtest.amanydv.in',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires modern browser.',
      description:
        'Interactive real-time developer benchmark comparing Jev (typesafe-ai/jev) parallel evaluation vs traditional sequential LLM decision latency and cost.',
      image: 'https://jev-speedtest.amanydv.in/og-banner.png',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: {
        '@type': 'Person',
        name: 'Aman Yadav',
        url: 'https://amanydv.in',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'JEV Speed Test',
      url: 'https://jev-speedtest.amanydv.in',
      description:
        'Benchmark how quickly a traditional LLM workflow and Jev make structured decisions from identical inputs.',
      publisher: {
        '@type': 'Person',
        name: 'Aman Yadav',
        url: 'https://amanydv.in',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is JEV Speed Test?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'JEV Speed Test is an interactive developer benchmark hosted on https://jev-speedtest.amanydv.in that evaluates how quickly a traditional sequential Large Language Model (LLM) pipeline and Jev (typesafe-ai/jev) make the exact same structured decisions from the same input.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is Jev faster than traditional sequential LLMs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traditional LLM architectures trigger multiple roundtrips sequentially, accumulating latency for every prompt and response token. Jev evaluates multiple structured decisions in a single, parallelized evaluation pass, slashing total end-to-end response times by 5x to 10x while maintaining strict type safety.',
          },
        },
        {
          '@type': 'Question',
          name: 'What decisions are evaluated in the benchmark?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The standard benchmark evaluates six structured business decisions for customer support triage: Department (billing, technical, sales, other), Refund status (boolean), Urgency (routine, normal, urgent, critical), Escalation requirement (boolean), Severity score (1-4), and Next recommended action.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does JEV Speed Test calculate latency and cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Latency is measured using high-precision performance.now() timers with Server-Sent Events (SSE) streaming for real-time roundtrip measurement. Cost is estimated using transparent token consumption formulas based on live provider rates for Gemini, Groq, and Jev.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who built JEV Speed Test?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'JEV Speed Test was created by Aman Yadav (https://amanydv.in), a software engineer focused on high-performance web systems and AI developer tooling.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Aman Yadav',
      url: 'https://amanydv.in',
      jobTitle: 'Software Engineer & AI Systems Developer',
      description:
        'Creator of JEV Speed Test, building high-speed developer benchmarks, distributed web systems, and AI tooling.',
      sameAs: [
        'https://amanydv.in',
        'https://github.com/dev-amanydv',
        'https://x.com/aman100xdev',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://jev-speedtest.amanydv.in',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'JEV Speed Test Benchmark',
          item: 'https://jev-speedtest.amanydv.in/#benchmark',
        },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
