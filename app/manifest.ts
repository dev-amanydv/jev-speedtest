import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JEV Speed Test - LLM vs Structured Evaluation Benchmark',
    short_name: 'JEV Speedtest',
    description:
      'Compare real-time latency, throughput, and token cost of Jev (typesafe-ai/jev) vs traditional sequential LLM calls.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#2563EB',
    icons: [
      {
        src: '/jev-icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
