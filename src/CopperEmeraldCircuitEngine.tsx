import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface CircuitTrace {
  id: number;
  d: string;
  speed: number;
  length: number;
}

/**
 * GOLDEN COPPER & ELECTRIC EMERALD CIRCUIT ENGINE
 * Renders golden copper tracks mixed with electric emerald green highlights 
 * over a high-saturation metallic backdrop.
 */
export const CopperEmeraldCircuitEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;

  // 1. Generate 28 Intricate Golden Copper Circuit Paths
  const traces: CircuitTrace[] = useMemo(() => {
    const list: CircuitTrace[] = [];
    
    for (let i = 0; i < 28; i++) {
      const angle = (i * 12.85) * (Math.PI / 180);
      const r1 = 280;
      const x1 = centerX + Math.cos(angle) * r1;
      const y1 = centerY + Math.sin(angle) * r1;

      const r2 = r1 + 350 + (i % 6) * 90;
      const x2 = centerX + Math.cos(angle) * r2;
      const y2 = centerY + Math.sin(angle) * r2;

      const x3 = x2 + (i % 2 === 0 ? 300 : -300);
      const y3 = y2 + (i % 3 === 0 ? 250 : -250);

      const pathStr = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`;

      list.push({
        id: i,
        d: pathStr,
        speed: 10 + (i % 5) * 3,
        length: 1400,
      });
    }
    return list;
  }, [centerX, centerY]);

  // 2. Generate Emerald Solder Pad Junction Nodes
  const solderPads = useMemo(() => {
    const list: { x: number; y: number; r: number }[] = [];
    for (let i = 0; i < 48; i++) {
      const angle = (i * 7.5) * (Math.PI / 180);
      const dist = 320 + (i % 7) * 220;
      list.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        r: (i % 3 === 0) ? 9 : 5,
      });
    }
    return list;
  }, [centerX, centerY]);

  return (
    <AbsoluteFill style={{
      background: 'radial-gradient(ellipse at 50% 50%, #151D2A 0%, #060911 100%)',
      overflow: 'hidden',
    }}>
      
      {/* EMERALD BLOOM & COPPER SPECULAR SHADERS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="emerald-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="22" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Metallic Copper Gold Gradient */}
          <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
        </defs>
      </svg>

      {/* BACKGROUND METALLIC SILICON FABRICATION MESH */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.12, pointerEvents: 'none' }}>
        <pattern id="copperMesh" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="50" cy="50" r="2" fill="#00FF66" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#copperMesh)" />
      </svg>

      {/* 3D TILT PERSPECTIVE CONTAINER */}
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
          transform: 'rotateX(10deg) rotateY(-5deg) scale(1.05)',
          transformOrigin: 'center center',
        }}>

          {/* ----------------===================================================---------------- */}
          {/* 1. GOLDEN COPPER CIRCUIT TRACKS & ELECTRIC EMERALD PULSES                          */}
          {/* ----------------===================================================---------------- */}
          <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
            {traces.map((trace) => {
              const dashOffset = -(frame * trace.speed * 1.8) % trace.length;

              return (
                <g key={`trace-${trace.id}`}>
                  {/* Heavy Golden Copper Circuit Track Base */}
                  <path
                    d={trace.d}
                    fill="none"
                    stroke="url(#copperGrad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  {/* Electric Emerald Green Pulse Highlight */}
                  <path
                    d={trace.d}
                    fill="none"
                    stroke="#00FF66"
                    strokeWidth="7"
                    strokeDasharray="70 630"
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    filter="url(#emerald-glow)"
                  />
                </g>
              );
            })}

            {/* ----------------===================================================---------------- */}
            {/* 2. ELECTRIC EMERALD SOLDER PAD JUNCTION NODES                                      */}
            {/* ----------------===================================================---------------- */}
            {solderPads.map((pad, idx) => {
              const padPulse = Math.sin(frame * 0.1 + idx) * 0.3 + 0.7;

              return (
                <g key={`pad-${idx}`}>
                  {/* Outer Copper Ring */}
                  <circle cx={pad.x} cy={pad.y} r={pad.r + 4} fill="none" stroke="#D4AF37" strokeWidth="2" />
                  {/* Glowing Emerald Center Core */}
                  <circle
                    cx={pad.x}
                    cy={pad.y}
                    r={pad.r}
                    fill="#00FF66"
                    opacity={padPulse}
                    filter="url(#emerald-glow)"
                  />
                </g>
              );
            })}
          </svg>

          {/* ----------------===================================================---------------- */}
          {/* 3. CENTRAL OCTAGONAL COPPER PROCESSOR CORE                                           */}
          {/* ----------------===================================================---------------- */}
          <div style={{
            position: 'absolute',
            left: centerX - 250,
            top: centerY - 250,
            width: 500,
            height: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="500" height="500" viewBox="0 0 500 500">
              {/* Outer Golden Copper Octagon */}
              <polygon
                points="150,20 350,20 480,150 480,350 350,480 150,480 20,350 20,150"
                fill="#0F172A"
                stroke="url(#copperGrad)"
                strokeWidth="8"
              />

              {/* Inner Glowing Emerald Power Ring */}
              <polygon
                points="160,40 340,40 460,160 460,340 340,460 160,460 40,340 40,160"
                fill="none"
                stroke="#00FF66"
                strokeWidth="4"
                strokeDasharray="40 20"
                filter="url(#emerald-glow)"
              />

              {/* Center Specular Metallic Core */}
              <circle
                cx="250"
                cy="250"
                r="90"
                fill="#00FF66"
                filter="url(#emerald-glow)"
                opacity={0.85 + Math.sin(frame * 0.08) * 0.15}
              />
              <circle cx="250" cy="250" r="35" fill="#FFFFFF" filter="url(#emerald-glow)" />
            </svg>
          </div>

        </div>
      </div>

      {/* FOREGROUND SATIN FILM GRAIN */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="copper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#copper-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
