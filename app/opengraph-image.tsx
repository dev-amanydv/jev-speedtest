import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'JEV Speed Test | Live Benchmark: Jev vs Traditional LLMs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0F172A',
          padding: '60px 70px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#F8FAFC',
          position: 'relative',
        }}
      >
        {/* Subtle background grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Top bar: Brand & Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '18px',
                color: '#FFFFFF',
              }}
            >
              J
            </div>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: '#E2E8F0',
                textTransform: 'uppercase',
              }}
            >
              JEV SPEED TEST
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(37, 99, 235, 0.15)',
              border: '1px solid rgba(37, 99, 235, 0.4)',
              borderRadius: '9999px',
              padding: '8px 18px',
              color: '#60A5FA',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            LIVE BENCHMARK SUITE
          </div>
        </div>

        {/* Middle hero content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxWidth: '1000px',
          }}
        >
          <h1
            style={{
              fontSize: '54px',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: 0,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            How Fast is <span style={{ color: '#38BDF8' }}>Jev</span> vs Sequential LLM Chains?
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#94A3B8',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Compare real-time structured decision latency, parallel evaluation, and API cost differences with live interactive telemetry.
          </p>
        </div>

        {/* Bottom comparison cards & metadata */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '28px',
          }}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '10px 18px',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                }}
              />
              <span style={{ fontSize: '16px', color: '#CBD5E1', fontWeight: 500 }}>
                Traditional LLM: 6 Sequential Calls
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
                padding: '10px 18px',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                }}
              />
              <span style={{ fontSize: '16px', color: '#93C5FD', fontWeight: 600 }}>
                Jev: 1 Parallel Evaluation
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: '18px',
              color: '#64748B',
              fontWeight: 500,
            }}
          >
            https://jev-speedtest.amanydv.in
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
