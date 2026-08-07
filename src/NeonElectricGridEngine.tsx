import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface ElectricLine {
  id: number;
  d: string;
  speed: number;
  color: string;
}

/**
 * NEON ELECTRIC GRID & ANIMATED INNER CORE ENGINE
 * Renders:
 * 1. Repeating square grid layout
 * 2. Glowing neon lines moving like electrical currents
 * 3. Animated central glowing energy core
 */
export const NeonElectricGridEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;

  // 1. Generate 16 Horizontal & Vertical Electrical Currents
  const electricLines: ElectricLine[] = useMemo(() => {
    const list: ElectricLine[] = [];
    const colors = ['#00E5FF', '#FF007F', '#00FF66', '#00E5FF'];

    // Horizontal grid current lines
    for (let i = 0; i < 10; i++) {
      const y = (i + 1) * (height / 11);
      list.push({
        id: i,
        d: `M 0 ${y} L ${width} ${y}`,
        speed: 12 + (i % 4) * 4,
        color: colors[i % colors.length],
      });
    }

    // Vertical grid current lines
    for (let j = 0; j < 14; j++) {
      const x = (j + 1) * (width / 15);
      list.push({
        id: 10 + j,
        d: `M ${x} 0 L ${x} ${height}`,
        speed: 10 + (j % 4) * 5,
        color: colors[(j + 1) % colors.length],
      });
    }

    return list;
  }, [width, height]);

  // 2. Animated Inner Core Rotation & Pulse Calculations
  const corePulse = 1 + Math.sin(frame * 0.1) * 0.05;
  const coreRot1 = frame * 0.8;
  const coreRot2 = -frame * 1.2;

  return (
    <AbsoluteFill style={{ backgroundColor: '#04040A', overflow: 'hidden' }}>
      
      {/* GLOW BLOOM SHADER */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="electric-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="24" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#FF007F" />
            <stop offset="100%" stopColor="#00FF66" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D TILT PERSPECTIVE CONTAINER */}
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
          transform: 'rotateX(12deg) rotateY(-6deg) scale(1.06)',
          transformOrigin: 'center center',
        }}>

          {/* ----------------===================================================---------------- */}
          {/* 1. REPEATING SQUARE GRID LAYOUT                                                    */}
          {/* ----------------===================================================---------------- */}
          <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.18, pointerEvents: 'none' }}>
            <pattern id="squareGridPattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect width="120" height="120" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="3" fill="#FF007F" />
              <circle cx="120" cy="0" r="3" fill="#FF007F" />
              <circle cx="0" cy="120" r="3" fill="#FF007F" />
              <circle cx="120" cy="120" r="3" fill="#FF007F" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#squareGridPattern)" />
          </svg>

          {/* ----------------===================================================---------------- */}
          {/* 2. GLOWING NEON LINES MOVING LIKE ELECTRICITY                                       */}
          {/* ----------------===================================================---------------- */}
          <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
            {electricLines.map((line) => {
              const dashOffset = -(frame * line.speed * 2) % 600;

              return (
                <g key={`elec-${line.id}`}>
                  {/* Faint Background Guide Line */}
                  <path d={line.d} stroke={line.color} strokeWidth="1.5" strokeOpacity="0.2" fill="none" />
                  
                  {/* High-Speed Neon Voltage Pulse Line */}
                  <path
                    d={line.d}
                    fill="none"
                    stroke={line.color}
                    strokeWidth="4"
                    strokeDasharray="80 520"
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    filter="url(#electric-glow)"
                  />
                </g>
              );
            })}
          </svg>

          {/* ----------------===================================================---------------- */}
          {/* 3. ANIMATED INNER ENERGY CORE                                                       */}
          {/* ----------------===================================================---------------- */}
          <div style={{
            position: 'absolute',
            left: centerX - 300,
            top: centerY - 300,
            width: 600,
            height: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${corePulse})`,
            pointerEvents: 'none',
          }}>
            <svg width="600" height="600" viewBox="0 0 600 600">
              {/* Outer Rotating Energy Ring 1 */}
              <circle
                cx="300"
                cy="300"
                r="240"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="6"
                strokeDasharray="60 40 120 40"
                transform={`rotate(${coreRot1} 300 300)`}
                filter="url(#electric-glow)"
              />

              {/* Inner Counter-Rotating Ring 2 */}
              <circle
                cx="300"
                cy="300"
                r="180"
                fill="none"
                stroke="#FF007F"
                strokeWidth="5"
                strokeDasharray="90 30 50 30"
                transform={`rotate(${coreRot2} 300 300)`}
                filter="url(#electric-glow)"
              />

              {/* Core Plasma Center Orb */}
              <circle
                cx="300"
                cy="300"
                r="110"
                fill="url(#coreGrad)"
                filter="url(#electric-glow)"
                opacity="0.85"
              />

              {/* Center White Core Light */}
              <circle
                cx="300"
                cy="300"
                r="45"
                fill="#FFFFFF"
                filter="url(#electric-glow)"
              />
            </svg>
          </div>

        </div>
      </div>

      {/* FOREGROUND FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="neon-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#neon-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
