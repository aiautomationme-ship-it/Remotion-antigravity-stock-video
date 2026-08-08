import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, random } from 'remotion';
import { getVibrantPalette } from './utils/colorEngine';
import { PremiumViewport } from './components/PremiumViewport';
import { ProceduralNoiseField } from './components/ProceduralNoiseField';

interface DataTrack {
  id: number;
  pathD: string;
  layer: number; // 1 = Foreground, 2 = Midground, 3 = Background
  particleCount: number;
  speedMultiplier: number;
  color: string;
  isHighEnergyTrack: boolean;
}

interface Props {
  videoSeed?: number;
}

/**
 * NEURAL SUPERCOMPUTER FLUID DATA PATHWAYS ENGINE
 * 
 * Visual Metaphor:
 * Dense, hyper-complex fluid grid of interconnected data pathways with thousands
 * of miniature glowing data packets (micro-particles) flowing along curved, 
 * twisting matrix tracks from left to right across the 4K canvas.
 */
export const NeuralSupercomputerGridEngine: React.FC<Props> = ({ videoSeed = 999 }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // 1. Multi-Color Radial Shift Background & High-Contrast HSL Palette
  const palette = useMemo(() => {
    const vibrant = getVibrantPalette(videoSeed);
    const baseHue = Math.floor(random(videoSeed) * 360);
    return {
      ...vibrant,
      dualToneBg: `radial-gradient(circle at center, hsl(${baseHue}, 95%, 5%) 0%, hsl(${(baseHue + 35) % 360}, 90%, 11%) 100%)`,
      laserCyan: `hsl(${baseHue}, 100%, 62%)`,
      neuralEmerald: `hsl(${(baseHue + 120) % 360}, 100%, 55%)`,
      hyperViolet: `hsl(${(baseHue + 240) % 360}, 100%, 65%)`,
      goldEnergy: `hsl(45, 100%, 60%)`,
    };
  }, [videoSeed]);

  // 2. Generate 35 Curved, Twisting Matrix Tracks Crossing Canvas Left-to-Right
  const tracks: DataTrack[] = useMemo(() => {
    const list: DataTrack[] = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      const layer = (i % 3) + 1; // 1, 2, 3
      const startY = (height / (count + 1)) * (i + 1) + (random(`sy-${i}`) - 0.5) * 180;
      const endY = startY + (random(`ey-${i}`) - 0.5) * 450;

      // Control points for organic cubic Bezier curves
      const cp1X = width * 0.28;
      const cp1Y = startY + (random(`cp1-${i}`) - 0.5) * 550;
      const cp2X = width * 0.72;
      const cp2Y = endY + (random(`cp2-${i}`) - 0.5) * 550;

      const pathD = `M -100 ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${width + 100} ${endY}`;
      const isHighEnergyTrack = i % 5 === 0;

      list.push({
        id: i,
        pathD,
        layer,
        particleCount: isHighEnergyTrack ? 45 : 25, // Thousands of total glowing micro-particles across 35 tracks
        speedMultiplier: 1 + Math.floor(random(`spd-${i}`) * 3), // Integer for seamless 600-frame loop
        color: isHighEnergyTrack ? palette.goldEnergy : layer === 1 ? palette.laserCyan : palette.neuralEmerald,
        isHighEnergyTrack,
      });
    }
    return list;
  }, [width, height, palette, videoSeed]);

  // 3. Seamless 600-Frame Loop Angle (Frame 0 == Frame 600 1-to-1)
  const totalFrames = durationInFrames || 600;

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', background: palette.dualToneBg, overflow: 'hidden' }}>
      
      {/* 1. PROCEDURAL NOISE FIELD OVERLAY FOR TELEMETRY CROSSHAIRS */}
      <ProceduralNoiseField
        seedString={`neural-supercomputer-${videoSeed}`}
        videoSeed={videoSeed}
        frequency={0.003}
        flowSpeed={0.015}
      />

      {/* 2. MASTER VIEWPORT LAYER */}
      <PremiumViewport videoSeed={videoSeed}>
        
        {/* OPTICAL LASER BLOOM DEF */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="neuralLaserBloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur1" />
              <feGaussianBlur stdDeviation="15" result="blur2" />
              <feGaussianBlur stdDeviation="35" result="blur3" />
              <feMerge>
                <feMergeNode in="blur3" />
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* BACKGROUND MATRIX TELEMETRY GRID LINES */}
        <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.12, pointerEvents: 'none' }}>
          <pattern id="neuralGridPattern" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke={palette.laserCyan} strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill={palette.hyperViolet} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neuralGridPattern)" />
        </svg>

        {/* LAYER 3: DENSE TWISTING MATRIX TRACKS & FLOWING GLOWING MICRO-PARTICLES */}
        <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
          
          {/* Render Curved Matrix Track Pathways */}
          {tracks.map((track) => (
            <path
              key={`track-path-${track.id}`}
              d={track.pathD}
              fill="none"
              stroke={track.color}
              strokeWidth={track.layer === 1 ? 2.2 : 1.2}
              strokeOpacity={track.layer === 1 ? 0.35 : 0.18}
              strokeDasharray={track.isHighEnergyTrack ? '12 6' : 'none'}
            />
          ))}

          {/* Render Flowing Micro-Particles along Tracks */}
          {tracks.map((track) => {
            const particles = Array.from({ length: track.particleCount }).map((_, pIdx) => {
              // 100% Seamless Loop Formula: (frame / totalFrames * trackSpeed + pIdx / particleCount) % 1
              const progress = ((frame / totalFrames) * track.speedMultiplier + (pIdx / track.particleCount)) % 1;
              const dashOffset = (1 - progress) * 3000; // Simulated path flow motion
              const pSize = track.layer === 1 ? (track.isHighEnergyTrack ? 5.5 : 3.8) : 2.5;

              return (
                <circle
                  key={`p-${track.id}-${pIdx}`}
                  r={pSize}
                  fill={track.color}
                  opacity={track.layer === 1 ? 0.95 : 0.65}
                  style={{
                    filter: track.isHighEnergyTrack ? 'drop-shadow(0 0 35px var(--accent-glow))' : 'url(#neuralLaserBloom)',
                  }}
                >
                  <animateMotion
                    path={track.pathD}
                    dur="10s"
                    repeatCount="indefinite"
                    begin={`-${progress * 10}s`}
                  />
                </circle>
              );
            });

            return <g key={`track-particles-${track.id}`}>{particles}</g>;
          })}
        </svg>

      </PremiumViewport>
    </div>
  );
};
