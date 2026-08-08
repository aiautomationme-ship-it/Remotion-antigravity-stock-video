import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { createNoise3D } from 'ts-noise';

interface NoiseFieldProps {
  /** A unique text string or ID to completely change the layout structure */
  seedString: string;
  /** Controls how tightly packed the vector mesh waves are */
  frequency?: number;
  /** Controls the speed of the ambient dimensional flow */
  flowSpeed?: number;
}

export const ProceduralNoiseField: React.FC<NoiseFieldProps> = ({
  seedString,
  frequency = 0.003,
  flowSpeed = 0.015,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 1. Initialize a strictly isolated math seed map based on your input string
  const noise3D = useMemo(() => {
    // Generate a simple deterministic numerical seed from the provided string
    let seedValue = 0;
    for (let i = 0; i < seedString.length; i++) {
      seedValue = (seedValue << 5) - seedValue + seedString.charCodeAt(i);
      seedValue |= 0;
    }
    return createNoise3D(() => Math.abs(seedValue) / 2147483647);
  }, [seedString]);

  // 2. Establish a high-density coordinate grid map across the canvas
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

  return (
    <svg
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'transparent',
        overflow: 'visible',
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

      {/* 3. Programmatic rendering loop for complex telemetry elements */}
      {points.map((pt, index) => {
        // Calculate the fluid vector offset in 3D mathematical space
        // x and y represent screen space; the 3rd dimension (time) is driven by the frame count
        const noiseVal = noise3D(
          pt.posX * frequency,
          pt.posY * frequency,
          frame * flowSpeed
        );

        // Convert the raw noise values (-1 to 1) into smooth geometric coordinates
        const offsetX = noiseVal * 45;
        const offsetY = Math.sin(noiseVal * Math.PI) * 45;
        
        // Map the depth profile to scale element dimensions dynamically
        const pointScale = Math.max(0.3, (noiseVal + 1) / 2);
        
        // Calculate structural opacity to prevent visual cluttering
        const elementOpacity = Math.max(0.08, ((noiseVal + 1) / 2) * 0.6);

        return (
          <g 
            key={index} 
            transform={`translate(${pt.posX + offsetX}, ${pt.posY + offsetY})`}
            style={{ opacity: elementOpacity, transition: 'opacity 0.1s linear' }}
          >
            {/* Elite micro-crosshair alignment marker */}
            <line x1="-6" y1="0" x2="6" y2="0" stroke="var(--accent-glow, #00E5FF)" strokeWidth="1" filter="url(#vectorGlow)" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="var(--accent-glow, #00E5FF)" strokeWidth="1" filter="url(#vectorGlow)" />
            
            {/* Dynamic visual indicator dot */}
            <circle 
              cx="0" 
              cy="0" 
              r={2 * pointScale} 
              fill="var(--accent-highlight, #8B5CF6)" 
            />
          </g>
        );
      })}
    </svg>
  );
};
