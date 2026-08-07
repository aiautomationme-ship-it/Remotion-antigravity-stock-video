import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Easing } from 'remotion';

export type FinancialGraphType = 'bullish_growth' | 'bearish_crash' | 'market_volatility';

interface FinancialGraphProps {
  type?: FinancialGraphType;
  primaryColor?: string;
  secondaryColor?: string;
  showCandles?: boolean;
  showVolumeBars?: boolean;
  showTrendArrow?: boolean;
  showGridScales?: boolean;
}

/**
 * Enterprise Financial Market & Stock Trading Graph Engine
 * Renders high-impact commercial trading visuals:
 * - Real OHLC Candlestick charts (Bullish Green / Bearish Red)
 * - Vertical Volume Histogram pillars
 * - Polyline trend graph with glowing node junction dots
 * - Dynamic 3D trend arrows (Upward Growth / Downward Crash)
 * - Numeric Y-axis price scales & grid matrix
 * - 3D Perspective tilt & Depth-of-Field blur
 */
export const FinancialGraphEngine: React.FC<FinancialGraphProps> = ({
  type = 'bullish_growth',
  primaryColor = type === 'bearish_crash' ? '#FF2E55' : '#00E5FF',
  secondaryColor = type === 'bearish_crash' ? '#FF5252' : '#FF9900',
  showCandles = true,
  showVolumeBars = true,
  showTrendArrow = true,
  showGridScales = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const isBearish = type === 'bearish_crash';
  const mainAccent = isBearish ? '#FF2E55' : primaryColor;
  const arrowColor = isBearish ? '#FF1744' : '#FF5722';

  // ----------------===================================================----------------
  // 1. GENERATE DYNAMIC FINANCIAL CANDLESTICK & VOLUME DATA
  // ----------------===================================================----------------
  const candleCount = 36;
  const candleData = useMemo(() => {
    const data = [];
    let currentPrice = isBearish ? 480 : 850;

    for (let i = 0; i < candleCount; i++) {
      const stepTrend = isBearish ? -12 : 14;
      const noise = (Math.sin(i * 1.7) * 35) + (Math.cos(i * 2.3) * 25);
      const open = currentPrice + noise;
      const close = open + (isBearish ? -(20 + Math.abs(noise * 0.8)) : (25 + Math.abs(noise * 0.8)));
      const high = Math.max(open, close) + (15 + Math.sin(i) * 15);
      const low = Math.min(open, close) - (15 + Math.cos(i) * 15);
      const isBull = close >= open;

      data.push({
        x: 180 + (i * (width - 360) / candleCount),
        open,
        close,
        high,
        low,
        isBull,
        volumeHeight: 60 + Math.abs(noise) * 4 + (i * 3),
      });

      currentPrice += stepTrend;
    }
    return data;
  }, [width, isBearish]);

  // Animated progress for stroke drawing & candle reveal
  const drawProgress = interpolate(frame, [0, 180], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });

  const arrowSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 25, mass: 1.5, stiffness: 120 },
  });

  // Polyline coordinates for the main trend line
  const polylinePoints = useMemo(() => {
    return candleData.map((c) => `${c.x},${c.close}`).join(' ');
  }, [candleData]);

  // Arrow trajectory coordinates
  const arrowStart = candleData[0];
  const arrowEnd = candleData[candleData.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      
      {/* GLOW & BLOOM SHADERS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="financial-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur1" />
            <feGaussianBlur stdDeviation="25" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="bullGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="bearGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF2E55" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF2E55" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={arrowColor} stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D PERSPECTIVE CONTAINER (Tilted Financial Terminal View) */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        perspective: 1400,
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: `rotateX(12deg) rotateY(-6deg) scale(1.08) translateY(${(1 - drawProgress) * 30}px)`,
          transformOrigin: 'center center',
        }}>

          {/* ----------------===================================================---------------- */}
          {/* GRID & NUMERIC PRICE SCALES (Y-AXIS)                                                */}
          {/* ----------------===================================================---------------- */}
          {showGridScales && (
            <g style={{ opacity: 0.3 }}>
              <svg width="100%" height="100%">
                {[200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800].map((yVal, idx) => (
                  <g key={`grid-line-${idx}`}>
                    <line x1="120" y1={yVal} x2={width - 120} y2={yVal} stroke="#334155" strokeWidth="1.5" strokeDasharray="6,6" />
                    <text x={width - 100} y={yVal + 6} fill="#94A3B8" fontSize="22" fontFamily="'Roboto Mono', monospace" textAnchor="start">
                      ${(2000 - yVal).toFixed(2)}
                    </text>
                  </g>
                ))}
              </svg>
            </g>
          )}

          {/* ----------------===================================================---------------- */}
          {/* VOLUME HISTOGRAM BARS (BOTTOM LAYER)                                               */}
          {/* ----------------===================================================---------------- */}
          {showVolumeBars && (
            <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.35 }}>
              {candleData.map((c, i) => {
                const barH = c.volumeHeight * drawProgress;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={c.x - 8}
                    y={height - 200 - barH}
                    width={16}
                    height={barH}
                    fill={c.isBull ? '#00E5FF' : '#FF2E55'}
                    rx={3}
                  />
                );
              })}
            </svg>
          )}

          {/* ----------------===================================================---------------- */}
          {/* CANDLESTICK OHLC CHART (MIDGROUND)                                                  */}
          {/* ----------------===================================================---------------- */}
          {showCandles && (
            <svg width="100%" height="100%" style={{ position: 'absolute' }}>
              {candleData.map((c, i) => {
                const candleReveal = interpolate(frame - (i * 2), [0, 20], [0, 1], { extrapolateRight: 'clamp' });
                const candleY = Math.min(c.open, c.close);
                const candleH = Math.max(8, Math.abs(c.close - c.open)) * candleReveal;

                return (
                  <g key={`candle-${i}`} style={{ opacity: candleReveal }}>
                    {/* Wick Line */}
                    <line
                      x1={c.x}
                      y1={c.high}
                      x2={c.x}
                      y2={c.low}
                      stroke={c.isBull ? '#00E5FF' : '#FF2E55'}
                      strokeWidth="3"
                    />
                    {/* Candle Body */}
                    <rect
                      x={c.x - 14}
                      y={candleY}
                      width={28}
                      height={candleH}
                      fill={c.isBull ? 'url(#bullGradient)' : 'url(#bearGradient)'}
                      stroke={c.isBull ? '#00E5FF' : '#FF2E55'}
                      strokeWidth="2"
                      rx={3}
                      filter="url(#financial-glow)"
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* ----------------===================================================---------------- */}
          {/* MAIN POLYLINE TREND GRAPH WITH NODE JUNCTIONS                                       */}
          {/* ----------------===================================================---------------- */}
          <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
            <polyline
              points={polylinePoints}
              fill="none"
              stroke={mainAccent}
              strokeWidth="6"
              filter="url(#financial-glow)"
              strokeDasharray="8000"
              strokeDashoffset={(1 - drawProgress) * 8000}
            />

            {/* Junction Node Dots & Value Annotations */}
            {candleData.map((c, i) => {
              if (i % 4 !== 0) return null;
              const nodeScale = interpolate(frame - (i * 3), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

              return (
                <g key={`node-${i}`} transform={`translate(${c.x}, ${c.close}) scale(${nodeScale})`}>
                  <circle cx="0" cy="0" r="10" fill="#04060A" stroke={mainAccent} strokeWidth="4" filter="url(#financial-glow)" />
                  <circle cx="0" cy="0" r="4" fill={mainAccent} />
                  
                  {/* Floating Price Tag */}
                  <text x="16" y="-16" fill="#FFFFFF" fontSize="20" fontFamily="'Roboto Mono', monospace" fontWeight="700">
                    +{(c.volumeHeight * 0.12).toFixed(2)}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* ----------------===================================================---------------- */}
          {/* BOLD DYNAMIC 3D TREND ARROW SYSTEM                                                   */}
          {/* ----------------===================================================---------------- */}
          {showTrendArrow && (
            <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
              <g style={{ opacity: arrowSpring }}>
                {/* Main Dynamic Arrow Line Path */}
                <path
                  d={`M ${arrowStart.x} ${arrowStart.open + 60} Q ${(arrowStart.x + arrowEnd.x) / 2} ${(arrowStart.open + arrowEnd.close) / 2 - 80} ${arrowEnd.x} ${arrowEnd.close - 40}`}
                  fill="none"
                  stroke="url(#arrowGrad)"
                  strokeWidth="32"
                  strokeLinecap="round"
                  filter="url(#financial-glow)"
                  strokeDasharray="4000"
                  strokeDashoffset={(1 - arrowSpring) * 4000}
                />

                {/* Arrow Head Triangle */}
                <g transform={`translate(${arrowEnd.x}, ${arrowEnd.close - 40}) rotate(${isBearish ? 45 : -35}) scale(${arrowSpring})`}>
                  <polygon
                    points="0,0 -40,70 40,70"
                    fill={arrowColor}
                    filter="url(#financial-glow)"
                  />
                </g>
              </g>
            </svg>
          )}

        </div>
      </div>

      {/* FOREGROUND CINEMATIC DEPTH-OF-FIELD BOKEH & FILM GRAIN */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.06, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="stock-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#stock-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
