import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface TrackPath {
  id: number;
  d: string;
  length: number;
  speed: number;
  pulseColor: string;
}

/**
 * SILICON WAFER & MICROCHIP DIE ENGINE
 * Renders a full-screen 4K macro view of a moving silicon wafer grid circuit,
 * golden geometric tracks, laser-bright data packet pulses, 
 * and a glowing square microchip die processor pulsing in the center.
 */
export const SiliconWaferDieEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;
  const chipSize = 520;

  // 1. Generate 20 Orthogonal Golden Circuit Tracks radiating from central microchip
  const tracks: TrackPath[] = useMemo(() => {
    const list: TrackPath[] = [];
    const colors = ['#00E5FF', '#00FF66', '#FFFFFF', '#FFD700'];

    // Radiating paths in 8 directions
    for (let i = 0; i < 24; i++) {
      const angleIdx = i % 8;
      const angle = (angleIdx * 45) * (Math.PI / 180);
      const startDist = chipSize / 2 + 10;
      const x1 = centerX + Math.cos(angle) * startDist;
      const y1 = centerY + Math.sin(angle) * startDist;

      // Orthogonal step routing path
      const midDist = startDist + 350 + (i % 5) * 120;
      const x2 = centerX + Math.cos(angle) * midDist;
      const y2 = centerY + Math.sin(angle) * midDist;

      const endDist = midDist + 600;
      const x3 = centerX + Math.cos(angle) * endDist + ((i % 2 === 0 ? 150 : -150));
      const y3 = centerY + Math.sin(angle) * endDist;

      const pathStr = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`;

      list.push({
        id: i,
        d: pathStr,
        length: 1200,
        speed: 8 + (i % 4) * 3,
        pulseColor: colors[i % colors.length],
      });
    }
    return list;
  }, [centerX, centerY, chipSize]);

  // Pulsating power animation for the central microchip core
  const chipPulse = 1 + Math.sin(frame * 0.08) * 0.035;
  const coreGlowOpacity = 0.65 + Math.sin(frame * 0.1) * 0.25;

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070C', overflow: 'hidden' }}>
      
      {/* BLOOM & GLOW SHADERS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="wafer-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="22" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="goldTrackGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B8860B" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* BACKGROUND SILICON WAFER GRID PATTERN */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.12, pointerEvents: 'none' }}>
        <pattern id="waferPattern" width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill="none" stroke="#FFD700" strokeWidth="1" />
          <circle cx="60" cy="60" r="4" fill="#FFD700" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#waferPattern)" />
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
          transform: 'rotateX(14deg) rotateY(-8deg) scale(1.08)',
          transformOrigin: 'center center',
        }}>

          {/* ----------------===================================================---------------- */}
          {/* 1. GOLDEN GEOMETRIC CIRCUIT TRACKS (8-WAY ORTHOGONAL ROUTING)                       */}
          {/* ----------------===================================================---------------- */}
          <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
            {tracks.map((track) => (
              <g key={`track-group-${track.id}`}>
                {/* Background Golden Track Line */}
                <path
                  d={track.d}
                  fill="none"
                  stroke="url(#goldTrackGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#wafer-glow)"
                />

                {/* Laser-Bright Data Packet Pulses Moving Along Tracks */}
                {Array.from({ length: 3 }).map((_, pIdx) => {
                  const strokeOffset = (frame * track.speed + pIdx * 350) % track.length;

                  return (
                    <path
                      key={`pulse-${track.id}-${pIdx}`}
                      d={track.d}
                      fill="none"
                      stroke={track.pulseColor}
                      strokeWidth="7"
                      strokeDasharray="60 1140"
                      strokeDashoffset={-strokeOffset}
                      strokeLinecap="round"
                      filter="url(#wafer-glow)"
                    />
                  );
                })}
              </g>
            ))}
          </svg>

          {/* ----------------===================================================---------------- */}
          {/* 2. CENTRAL GLOWING SQUARE MICROCHIP DIE PROCESSOR                                  */}
          {/* ----------------===================================================---------------- */}
          <div style={{
            position: 'absolute',
            left: centerX - chipSize / 2,
            top: centerY - chipSize / 2,
            width: chipSize,
            height: chipSize,
            backgroundColor: '#0F172A',
            border: '4px solid #FFD700',
            borderRadius: 24,
            boxShadow: `0 0 60px rgba(255, 215, 0, ${coreGlowOpacity}), inset 0 0 40px rgba(255, 215, 0, 0.4)`,
            transform: `scale(${chipPulse})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            
            {/* Inner Core Die Silicon Grid */}
            <div style={{
              width: chipSize - 60,
              height: chipSize - 60,
              backgroundColor: '#070D18',
              border: '2px solid #38BDF8',
              borderRadius: 16,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              gap: 10,
              padding: 14,
              boxShadow: 'inset 0 0 30px #00E5FF44',
            }}>
              {Array.from({ length: 16 }).map((_, tileIdx) => {
                const tilePulse = Math.sin(frame * 0.12 + tileIdx) * 0.3 + 0.7;
                return (
                  <div
                    key={`die-tile-${tileIdx}`}
                    style={{
                      backgroundColor: '#00E5FF1A',
                      border: '1.5px solid #00E5FF',
                      borderRadius: 8,
                      opacity: tilePulse,
                      boxShadow: '0 0 12px #00E5FF66',
                    }}
                  />
                );
              })}
            </div>

            {/* Peripheral Pin Grid Contacts around Microchip Edges */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '3px stroke #FFD700',
              pointerEvents: 'none',
            }}>
              {[0, 90, 180, 270].map((rotAngle, sideIdx) => (
                <div
                  key={`pin-side-${sideIdx}`}
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: 40,
                    right: 40,
                    display: 'flex',
                    justifyContent: 'space-between',
                    transform: `rotate(${rotAngle}deg)`,
                    transformOrigin: `${chipSize / 2}px ${chipSize / 2 + 12}px`,
                  }}
                >
                  {Array.from({ length: 12 }).map((_, p) => (
                    <div
                      key={`pin-${sideIdx}-${p}`}
                      style={{
                        width: 8,
                        height: 14,
                        backgroundColor: '#FFD700',
                        borderRadius: 2,
                        boxShadow: '0 0 8px #FFD700',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* FOREGROUND FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="wafer-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#wafer-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
