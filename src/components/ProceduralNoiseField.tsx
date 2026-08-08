import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { createNoise3D } from 'simplex-noise';
import { getVibrantPalette } from '../utils/colorEngine';

interface NoiseFieldProps {
  /** A unique text string or ID to completely change the layout structure */
  seedString: string;
  /** Numerical seed for dynamic colorEngine HSL palette resolution */
  videoSeed?: number;
  /** Controls how tightly packed the vector mesh waves are */
  frequency?: number;
  /** Controls the speed of the ambient dimensional flow */
  flowSpeed?: number;
}

export const ProceduralNoiseField: React.FC<NoiseFieldProps> = ({
  seedString,
  videoSeed = 42,
  frequency = 0.003,
  flowSpeed = 0.015,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // 1. Dynamic Broadcast HSL Palette Integration from colorEngine.ts
  const palette = useMemo(() => getVibrantPalette(videoSeed), [videoSeed]);

  // 2. Initialize a strictly isolated math seed map based on seedString
  const noise3D = useMemo(() => {
    let seedValue = 0;
    for (let i = 0; i < seedString.length; i++) {
      seedValue = (seedValue << 5) - seedValue + seedString.charCodeAt(i);
      seedValue |= 0;
    }
    const seededRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };
    return createNoise3D(seededRandom);
  }, [seedString]);

  // 3. High-density coordinate grid map across the canvas
  const gridResolutionX = 24;
  const gridResolutionY = 14;

  const points = useMemo(() => {
    const tempPoints = [];
    for (let x = 0; x <= gridResolutionX; x++) {
      for (let y = 0; y <= gridResolutionY; y++) {
        const posX = (width / gridResolutionX) * x;
        const posY = (height / gridResolutionY) * y;
        tempPoints.push({ posX, posY });
      }
    }
    return tempPoints;
  }, [width, height]);

  // 4. Circular Easing Math synced to 600 frames (100% infinite seamless loop)
  const totalFrames = durationInFrames || 600;
  const angle = (frame / totalFrames) * Math.PI * 2;
  const timeX = Math.cos(angle) * 0.8;
  const timeY = Math.sin(angle) * 0.8;

  return (
    <svg
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'transparent',
        overflow: 'visible',
        // Inject colorEngine HSL palette tokens into CSS custom properties
        ['--accent-glow' as any]: palette.primary,
        ['--accent-highlight' as any]: palette.accent,
      }}
    >
      <defs>
        {/* Elite multi-layered neon glow projection system */}
        <filter id="vectorGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="tightBlur" />
          <feGaussianBlur stdDeviation="12" result="midBlur" />
          <feGaussianBlur stdDeviation="40" result="ambientBleed" />
          <feMerge>
            <feMergeNode in="ambientBleed" />
            <feMergeNode in="midBlur" />
            <feMergeNode in="tightBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Programmatic rendering loop for complex telemetry elements */}
      {points.map((pt, index) => {
        const noiseVal = noise3D(
          pt.posX * frequency,
          pt.posY * frequency,
          timeX + timeY
        );

        const offsetX = noiseVal * 45;
        const offsetY = Math.sin(noiseVal * Math.PI) * 45;
        
        const pointScale = Math.max(0.3, (noiseVal + 1) / 2);
        const elementOpacity = Math.max(0.08, ((noiseVal + 1) / 2) * 0.6);

        return (
          <g 
            key={index} 
            transform={`translate(${pt.posX + offsetX}, ${pt.posY + offsetY})`}
            style={{ opacity: elementOpacity, transition: 'opacity 0.1s linear' }}
          >
            {/* Elite micro-crosshair alignment marker */}
            <line x1="-6" y1="0" x2="6" y2="0" stroke="var(--accent-glow)" strokeWidth="1" filter="url(#vectorGlow)" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="var(--accent-glow)" strokeWidth="1" filter="url(#vectorGlow)" />
            
            {/* Dynamic visual indicator dot */}
            <circle 
              cx="0" 
              cy="0" 
              r={2 * pointScale} 
              fill="var(--accent-highlight)" 
            />
          </g>
        );
      })}
    </svg>
  );
};
