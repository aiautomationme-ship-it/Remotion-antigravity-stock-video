import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface BinaryStream {
  id: number;
  x: number;
  startY: number;
  speed: number;
  chars: string[];
}

/**
 * DIGITAL THREAT INTELLIGENCE & SHIELD SHIELD ENGINE
 * Features:
 * 1. Fading hexagonal grid background matrix
 * 2. Floating binary data lines gliding upward
 * 3. Color transition from warning-crimson (#FF0055) to safe-neon-cyan (#00E5FF) when passing through the central shield
 * 4. Pulsing central digital shield vector graphic
 */
export const CyberThreatShieldEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;
  const shieldYThreshold = centerY;

  // 1. Generate 32 Vertical Binary Data Streams
  const streams: BinaryStream[] = useMemo(() => {
    const list: BinaryStream[] = [];
    const binaryChars = ['0', '1', '0', '1', '1', '0', '1', '0'];

    for (let i = 0; i < 32; i++) {
      const x = (i + 1) * (width / 33);
      const startY = (i * 120) % height;
      const speed = 6 + (i % 5) * 3;
      const charCount = 12 + (i % 6) * 4;

      const chars: string[] = [];
      for (let c = 0; c < charCount; c++) {
        chars.push(binaryChars[(i + c) % binaryChars.length]);
      }

      list.push({ id: i, x, startY, speed, chars });
    }
    return list;
  }, [width, height]);

  // Central Shield Pulse & Rotation Math
  const shieldPulse = 1 + Math.sin(frame * 0.08) * 0.04;
  const hexGridOpacity = 0.15 + Math.sin(frame * 0.04) * 0.08;

  return (
    <AbsoluteFill style={{ backgroundColor: '#02040A', overflow: 'hidden' }}>
      
      {/* SHIELD GLOW SHADERS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="threat-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="24" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 1. FADING HEXAGONAL GRID MATRIX BACKGROUND */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: hexGridOpacity, pointerEvents: 'none' }}>
        <pattern id="hexGrid" width="84" height="145.49" patternUnits="userSpaceOnUse">
          <path
            d="M 42 0 L 84 24.25 L 84 72.75 L 42 97 L 0 72.75 L 0 24.25 Z M 42 145.49 L 84 121.24 L 84 72.75 L 42 97 L 0 72.75 L 0 121.24 Z"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.5"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>

      {/* 3D TILT PERSPECTIVE CONTAINER */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: 'rotateX(8deg) scale(1.04)',
          transformOrigin: 'center center',
        }}>

          {/* ----------------===================================================---------------- */}
          {/* 2. FLOATING BINARY DATA LINES GLIDING UPWARD (CRIMSON -> CYAN TRANSITION)          */}
          {/* ----------------===================================================---------------- */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
            {streams.map((st) => {
              // Calculate Y position (gliding upward)
              const currentY = (height + 200) - ((frame * st.speed + st.startY) % (height + 400));
              
              // Color transition math: Below shield = Warning Crimson (#FF0055), Above shield = Safe Cyan (#00E5FF)
              const isPassedShield = currentY < shieldYThreshold;
              const streamColor = isPassedShield ? '#00E5FF' : '#FF0055';

              return (
                <div
                  key={`stream-${st.id}`}
                  style={{
                    position: 'absolute',
                    left: st.x,
                    top: currentY,
                    display: 'flex',
                    flexDirection: 'column',
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: 22,
                    fontWeight: 700,
                    color: streamColor,
                    textShadow: `0 0 12px ${streamColor}`,
                    opacity: 0.85,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {st.chars.map((char, cIdx) => (
                    <span key={`c-${st.id}-${cIdx}`} style={{ opacity: 1 - cIdx * 0.06 }}>
                      {char}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>

          {/* ----------------===================================================---------------- */}
          {/* 3. PULSING CENTRAL DIGITAL SHIELD VECTOR GRAPHIC                                    */}
          {/* ----------------===================================================---------------- */}
          <div style={{
            position: 'absolute',
            left: centerX - 320,
            top: centerY - 380,
            width: 640,
            height: 760,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${shieldPulse})`,
            pointerEvents: 'none',
          }}>
            <svg width="640" height="760" viewBox="0 0 640 760">
              {/* Outer Shield Emblem Vector Contour */}
              <path
                d="M 320 40 L 580 140 C 580 480 320 700 320 700 C 320 700 60 480 60 140 Z"
                fill="rgba(2, 12, 28, 0.75)"
                stroke="#00E5FF"
                strokeWidth="8"
                filter="url(#threat-glow)"
              />

              {/* Inner Shield Safeguard Ring & Circuit Grid */}
              <path
                d="M 320 80 L 540 165 C 540 450 320 640 320 640 C 320 640 100 450 100 165 Z"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="3"
                strokeDasharray="20 10"
                opacity="0.7"
              />

              {/* Shield Core Emissive Lock Icon */}
              <path
                d="M 320 260 C 275 260 240 295 240 340 L 240 380 L 220 380 L 220 500 L 420 500 L 420 380 L 400 380 L 400 340 C 400 295 365 260 320 260 Z M 320 300 C 342 300 360 318 360 340 L 360 380 L 280 380 L 280 340 C 280 318 298 300 320 300 Z"
                fill="#00E5FF"
                filter="url(#threat-glow)"
              />
            </svg>
          </div>

        </div>
      </div>

      {/* FOREGROUND FINE FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="threat-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#threat-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
