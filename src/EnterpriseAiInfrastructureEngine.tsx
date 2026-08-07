import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random, interpolate } from 'remotion';
import { getVibrantPalette } from './utils/colorEngine';
import { get3ActCamera, getSnappySpring } from './MotionRhythm';

interface Pillar {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  delay: number;
  layer: number; // 1 = Foreground, 2 = Midground, 3 = Background
}

interface Conduit {
  fromId: number;
  toId: number;
  speed: number;
}

interface Props {
  videoSeed?: number;
}

/**
 * ENTERPRISE AI INFRASTRUCTURE ENGINE
 * A Bloomberg / FT-style premium editorial business motion graphic visualizing:
 * "The Foundation of the Intelligent Enterprise"
 * 
 * Visual Metaphor: Monolithic GPU compute pillars interconnecting via 
 * accelerated fiber-optic channels into a soaring 3D intelligence ecosystem.
 */
export const EnterpriseAiInfrastructureEngine: React.FC<Props> = ({
  videoSeed = 88,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 1. Executive Color Palette (Solar Gold, Platinum, Deep Obsidian, Emerald Highlights)
  const palette = useMemo(() => {
    return {
      bg: 'radial-gradient(circle, hsl(220, 80%, 10%) 0%, hsl(225, 95%, 4%) 100%)',
      gold: 'hsl(42, 100%, 62%)',
      goldGlow: 'hsla(42, 100%, 55%, 0.4)',
      platinum: 'hsl(215, 30%, 92%)',
      emerald: 'hsl(155, 100%, 52%)',
      emeraldGlow: 'hsla(155, 100%, 52%, 0.45)',
      obsidianGrid: 'hsla(215, 40%, 40%, 0.12)',
    };
  }, []);

  // 2. Cinematic 3-Act Camera System
  const camera = get3ActCamera(frame);

  // 3. Generate 30 Hyperscale GPU Compute Pillars across 3 Depth Layers
  const pillars: Pillar[] = useMemo(() => {
    const list: Pillar[] = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const layer = (i % 3) + 1; // 1 = Foreground, 2 = Midground, 3 = Background
      const pillarWidth = layer === 1 ? 160 : layer === 2 ? 110 : 70;
      const pillarMaxHeight = layer === 1 ? 750 : layer === 2 ? 550 : 380;
      
      list.push({
        id: i,
        x: 300 + (i % 6) * 580 + (random(`px-${i}-${videoSeed}`) - 0.5) * 160,
        y: 400 + Math.floor(i / 6) * 360 + (random(`py-${i}-${videoSeed}`) - 0.5) * 100,
        width: pillarWidth,
        height: pillarMaxHeight,
        depth: layer,
        delay: Math.floor(random(`del-${i}-${videoSeed}`) * 40),
      });
    }
    return list;
  }, [videoSeed]);

  // 4. Generate High-Speed Fiber Interconnect Conduits
  const conduits: Conduit[] = useMemo(() => {
    const list: Conduit[] = [];
    for (let i = 0; i < pillars.length; i++) {
      for (let j = i + 1; j < pillars.length; j++) {
        const dx = pillars[j].x - pillars[i].x;
        const dy = pillars[j].y - pillars[i].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 650 && list.length < 45) {
          list.push({
            fromId: i,
            toId: j,
            speed: 0.02 + random(`spd-${i}-${j}`) * 0.03,
          });
        }
      }
    }
    return list;
  }, [pillars]);

  return (
    <AbsoluteFill style={{ background: palette.bg, overflow: 'hidden' }}>
      
      {/* OPTICAL SHADER DEF */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="enterprise-glow" x="-50%" y="-50%" width="200%" height="200%">
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

      {/* BACKGROUND ARCHITECTURAL GRID */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.25 }}>
        <pattern id="execGrid" width="160" height="160" patternUnits="userSpaceOnUse">
          <path d="M 160 0 L 0 0 0 160" fill="none" stroke={palette.platinum} strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill={palette.gold} />
          <circle cx="160" cy="160" r="3" fill={palette.gold} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#execGrid)" />
      </svg>

      {/* CAMERA WORLD CONTAINER */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `scale(${camera.scale}) translateX(${camera.panX}px) translateY(${camera.panY}px)`,
        transformOrigin: '1920px 1080px',
      }}>

        {/* ACT II: HIGH-SPEED FIBER INTERCONNECT CONDUITS */}
        <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none', zIndex: 2 }}>
          {conduits.map((conduit, idx) => {
            const p1 = pillars[conduit.fromId];
            const p2 = pillars[conduit.toId];
            
            // Progressive conduit activation (Act II: frames 150-450)
            const activationProgress = interpolate(frame, [150 + idx * 4, 300 + idx * 4], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            if (activationProgress <= 0) return null;

            // Traveling energy data packet along conduit
            const packetPos = (frame * conduit.speed * 60) % 1;
            const currentX = p1.x + (p2.x - p1.x) * packetPos;
            const currentY = p1.y + (p2.y - p1.y) * packetPos;

            return (
              <g key={`conduit-${idx}`}>
                {/* Fiber Wire */}
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p1.x + (p2.x - p1.x) * activationProgress}
                  y2={p1.y + (p2.y - p1.y) * activationProgress}
                  stroke={palette.emerald}
                  strokeWidth="2"
                  strokeOpacity={0.45 * activationProgress}
                  strokeDasharray="8 6"
                />

                {/* Accelerated Data Packet */}
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="5"
                  fill={palette.emerald}
                  filter="url(#enterprise-glow)"
                />
              </g>
            );
          })}
        </svg>

        {/* ACT I & III: HYPERSCALE GPU COMPUTE PILLARS */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 5 }}>
          {pillars.map((pillar) => {
            // Remotion Spring Physics for pillar emergence
            const springProgress = getSnappySpring(frame, fps, pillar.delay);
            const currentHeight = pillar.height * springProgress;
            const isForeground = pillar.depth === 1;

            return (
              <div
                key={`pillar-${pillar.id}`}
                style={{
                  position: 'absolute',
                  left: `${pillar.x - pillar.width / 2}px`,
                  top: `${pillar.y - currentHeight / 2}px`,
                  width: `${pillar.width}px`,
                  height: `${currentHeight}px`,
                  background: isForeground
                    ? `linear-gradient(180deg, ${palette.gold} 0%, hsl(38, 90%, 40%) 100%)`
                    : `linear-gradient(180deg, ${palette.platinum} 0%, hsl(215, 25%, 55%) 100%)`,
                  borderRadius: '6px',
                  boxShadow: isForeground
                    ? `0 0 35px ${palette.goldGlow}, inset 0 0 15px rgba(255,255,255,0.4)`
                    : `0 0 15px rgba(0,0,0,0.5)`,
                  opacity: isForeground ? 0.95 : pillar.depth === 2 ? 0.75 : 0.45,
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  padding: '12px',
                  boxSizing: 'border-box',
                  transform: `scaleY(${springProgress})`,
                  transformOrigin: 'bottom center',
                }}
              >
                {/* Top Illuminated GPU Die Core */}
                <div style={{
                  width: '100%',
                  height: '16px',
                  backgroundColor: isForeground ? palette.gold : palette.emerald,
                  borderRadius: '3px',
                  boxShadow: `0 0 15px ${isForeground ? palette.goldGlow : palette.emeraldGlow}`,
                }} />

                {/* Vertical High-Speed Interconnect Bus Traces */}
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  justifyContent: 'center',
                  margin: 'auto 0',
                }}>
                  {[...Array(3)].map((_, busIdx) => (
                    <div
                      key={`bus-${busIdx}`}
                      style={{
                        width: '3px',
                        height: `${currentHeight * 0.5}px`,
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        borderRadius: '2px',
                      }}
                    />
                  ))}
                </div>

                {/* Base Anchor */}
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: palette.platinum,
                  borderRadius: '2px',
                  opacity: 0.6,
                }} />
              </div>
            );
          })}
        </div>

      </div>

      {/* FOREGROUND CINEMATIC FILM GRAIN */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.04, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="exec-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#exec-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
