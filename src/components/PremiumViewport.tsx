import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from 'remotion';
import { getVibrantPalette } from '../utils/colorEngine';
import { get3ActCamera } from '../MotionRhythm';

interface PremiumViewportProps {
  children: React.ReactNode;
  videoSeed?: number;
  showDebris?: boolean;
}

interface DebrisParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

/**
 * MASTER PREMIUM VIEWPORT WRAPPER
 * Automatically injects:
 * 1. Slow-moving abstract backdrop vector mesh grid (Layer 1 - Background)
 * 2. 3-Act Camera Narrative & Active Component Slot (Layer 2 - Content)
 * 3. Blurred foreground floating debris & cinematic film grain overlay (Layer 3 - Foreground)
 */
export const PremiumViewport: React.FC<PremiumViewportProps> = ({
  children,
  videoSeed = 42,
  showDebris = true,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 1. Lock Broadcast-Ready HSL Palette from Color Engine
  const palette = useMemo(() => getVibrantPalette(videoSeed), [videoSeed]);

  // 2. 3-Act Camera Narrative
  const camera = get3ActCamera(frame);

  // 3. Foreground Floating Debris Particles
  const debrisParticles: DebrisParticle[] = useMemo(() => {
    const list: DebrisParticle[] = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        x: random(`dx-${i}-${videoSeed}`) * width,
        y: random(`dy-${i}-${videoSeed}`) * height,
        size: 3 + random(`ds-${i}`) * 6,
        speed: 0.15 + random(`dsp-${i}`) * 0.35,
        opacity: 0.25 + random(`dop-${i}`) * 0.45,
      });
    }
    return list;
  }, [width, height, videoSeed]);

  return (
    <AbsoluteFill style={{ background: palette.background, overflow: 'hidden' }}>
      
      {/* GLOBAL OPTICAL SHADER & GLOW DEF */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="premium-bloom" x="-50%" y="-50%" width="200%" height="200%">
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

      {/* LAYER 1: SLOW-MOVING ABSTRACT BACKDROP VECTOR MESH GRID */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.16, pointerEvents: 'none' }}>
        <pattern id="premiumBackdropGrid" width="140" height="140" patternUnits="userSpaceOnUse">
          <path d="M 140 0 L 0 0 0 140" fill="none" stroke={palette.primary} strokeWidth="1" />
          <circle cx="0" cy="0" r="2.5" fill={palette.accent} />
          <circle cx="140" cy="140" r="2.5" fill={palette.accent} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#premiumBackdropGrid)" />
      </svg>

      {/* LAYER 2: 3-ACT CAMERA TRANSFORMATION & ACTIVE COMPONENT SLOT */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `scale(${camera.scale}) translateX(${camera.panX}px) translateY(${camera.panY}px)`,
        transformOrigin: '1920px 1080px',
      }}>
        {children}
      </div>

      {/* LAYER 3: BLURRED FOREGROUND FLOATING DEBRIS */}
      {showDebris && (
        <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none', filter: 'blur(3px)' }}>
          {debrisParticles.map((p) => {
            const moveY = (frame * p.speed * 60) % height;
            const currentY = (p.y - moveY + height) % height;

            return (
              <circle
                key={`debris-${p.id}`}
                cx={p.x}
                cy={currentY}
                r={p.size}
                fill={p.id % 2 === 0 ? palette.accent : palette.primary}
                opacity={p.opacity}
              />
            );
          })}
        </svg>
      )}

      {/* LAYER 4: CINEMATIC FILM GRAIN NOISE OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.04, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="premium-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#premium-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
