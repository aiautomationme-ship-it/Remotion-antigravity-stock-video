import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface PieSegment {
  percentage: number;
  color: string;
  label: string;
}

/**
 * CORPORATE ANALYTICS & BUSINESS PERFORMANCE ENGINE
 * Renders:
 * 1. Upward-Trending Bar Graphs
 * 2. Animated Circular Pie / Donut Charts
 * 3. Wavy Area Line Graphs with Gradient Fills
 */
export const CorporateAnalyticsEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 1. Spring reveal animations
  const areaProgress = interpolate(frame, [0, 90], [0, 1], { extrapolateRight: 'clamp' });
  const pieSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 18, mass: 1.2 } });

  // 2. Bar Chart Data (Upward Growth Trend)
  const barCount = 12;
  const barHeights = useMemo(() => [
    180, 240, 220, 310, 380, 350, 460, 520, 490, 610, 720, 840
  ], []);

  // 3. Pie / Donut Chart Data
  const pieSlices: PieSegment[] = useMemo(() => [
    { percentage: 42, color: '#00E5FF', label: 'Tech' },
    { percentage: 28, color: '#38BDF8', label: 'Cloud' },
    { percentage: 18, color: '#818CF8', label: 'AI' },
    { percentage: 12, color: '#F59E0B', label: 'Other' },
  ], []);

  // Compute SVG arc strokeDasharray / strokeDashoffset for pie chart
  const radius = 180;
  const circumference = 2 * Math.PI * radius;

  // 4. Wavy Area Line Graph Path Generator
  const areaPath = useMemo(() => {
    const points: Array<{ x: number; y: number }> = [];
    const steps = 60;
    const startX = 200;
    const endX = width - 200;
    const baseY = height / 2 + 100;

    for (let i = 0; i <= steps; i++) {
      const x = startX + (i / steps) * (endX - startX);
      const wave1 = Math.sin(i * 0.2 + frame * 0.03) * 120;
      const wave2 = Math.cos(i * 0.1 - frame * 0.02) * 60;
      const trend = (i / steps) * -280; // Upward trend
      const y = baseY + wave1 + wave2 + trend;
      points.push({ x, y });
    }

    const lineCmds = points.map((p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
    const areaCmds = `${lineCmds} L ${endX} ${height - 200} L ${startX} ${height - 200} Z`;

    return { lineCmds, areaCmds, points };
  }, [width, height, frame]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#040914', overflow: 'hidden' }}>
      
      {/* GLOW BLOOM SHADERS & GRADIENTS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="corp-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur1" />
            <feGaussianBlur stdDeviation="24" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* BACKGROUND ISOMETRIC GRID MESH */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.1, pointerEvents: 'none' }}>
        <pattern id="corpGrid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#38BDF8" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#corpGrid)" />
      </svg>

      {/* 3D TILT CONTAINER */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        perspective: 1300,
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: 'rotateX(10deg) rotateY(-5deg) scale(1.05)',
          transformOrigin: 'center center',
        }}>

          {/* ----------------===================================================---------------- */}
          {/* 1. WAVY AREA LINE GRAPH (BACKGROUND / MIDGROUND LAYER)                              */}
          {/* ----------------===================================================---------------- */}
          <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
            {/* Gradient Filled Area */}
            <path
              d={areaPath.areaCmds}
              fill="url(#areaGradient)"
              opacity={areaProgress}
            />

            {/* Glowing Wavy Line */}
            <path
              d={areaPath.lineCmds}
              fill="none"
              stroke="#00E5FF"
              strokeWidth="5"
              filter="url(#corp-glow)"
              strokeDasharray="6000"
              strokeDashoffset={(1 - areaProgress) * 6000}
            />

            {/* Glowing Nodes on Wave Peaks */}
            {areaPath.points.map((p, idx) => {
              if (idx % 6 !== 0) return null;
              return (
                <circle
                  key={`wave-dot-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r="8"
                  fill="#FFFFFF"
                  stroke="#00E5FF"
                  strokeWidth="3"
                  filter="url(#corp-glow)"
                  opacity={areaProgress}
                />
              );
            })}
          </svg>

          {/* ----------------===================================================---------------- */}
          {/* 2. ANIMATED DONUT PIE CHART (LEFT SIDE)                                            */}
          {/* ----------------===================================================---------------- */}
          <div style={{
            position: 'absolute',
            left: 200,
            top: 340,
            transform: `scale(${pieSpring})`,
            pointerEvents: 'none',
          }}>
            <svg width="500" height="500" viewBox="0 0 500 500">
              <g transform="rotate(-90 250 250)">
                {(() => {
                  let accumulatedPercent = 0;
                  return pieSlices.map((slice, idx) => {
                    const strokeDashoffset = circumference - (slice.percentage / 100) * circumference * pieSpring;
                    const rotation = (accumulatedPercent / 100) * 360;
                    accumulatedPercent += slice.percentage;

                    return (
                      <circle
                        key={`pie-slice-${idx}`}
                        cx="250"
                        cy="250"
                        r={radius}
                        fill="none"
                        stroke={slice.color}
                        strokeWidth="54"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        transform={`rotate(${rotation} 250 250)`}
                        filter="url(#corp-glow)"
                        strokeLinecap="round"
                      />
                    );
                  });
                })()}
              </g>
              {/* Inner Donut Hole */}
              <circle cx="250" cy="250" r="120" fill="#040914" stroke="#1E293B" strokeWidth="4" />
            </svg>
          </div>

          {/* ----------------===================================================---------------- */}
          {/* 3. UPWARD-TRENDING BAR GRAPH COLUMNS (RIGHT SIDE)                                   */}
          {/* ----------------===================================================---------------- */}
          <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
            {barHeights.map((targetH, idx) => {
              const barSpring = spring({
                frame: Math.max(0, frame - (idx * 3)),
                fps,
                config: { damping: 16, mass: 1 },
              });
              const currentH = targetH * barSpring;
              const barX = width - 1400 + (idx * 90);
              const barY = height - 220 - currentH;

              return (
                <g key={`bar-${idx}`}>
                  {/* Bar Body */}
                  <rect
                    x={barX}
                    y={barY}
                    width="54"
                    height={currentH}
                    fill="url(#barGrad)"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    rx="6"
                    filter="url(#corp-glow)"
                  />
                  {/* Cap Accent Light */}
                  <rect
                    x={barX}
                    y={barY}
                    width="54"
                    height="8"
                    fill="#00E5FF"
                    rx="3"
                    filter="url(#corp-glow)"
                    opacity={barSpring}
                  />
                </g>
              );
            })}
          </svg>

        </div>
      </div>

      {/* FOREGROUND FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="corp-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#corp-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
