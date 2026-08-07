import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random, interpolate } from 'remotion';
import { getVibrantPalette } from './utils/colorEngine';
import { get3ActCamera } from './MotionRhythm';

interface DataNode {
  id: number;
  layer: number; // 1 = Foreground, 2 = Midground, 3 = Background
  baseX: number;
  baseY: number;
  radius: number;
  speedX: number;
  speedY: number;
  phase: number;
}

interface Props {
  videoSeed?: number;
  nodeCount?: number;
  connectDistance?: number;
}

/**
 * DENSE MULTI-LAYER DATA MATRIX ENGINE
 * Renders:
 * 1. 100% Clean background plate (Zero text / Zero labels)
 * 2. Dense, multi-layered matrix of interconnecting floating data points
 * 3. Thin SVG grid line system background with corner crosshairs
 */
export const DenseDataMatrixEngine: React.FC<Props> = ({
  videoSeed = 42,
  nodeCount = 180,
  connectDistance = 340,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 1. Get Seed-based Harmonized HSL Palette
  const palette = useMemo(() => getVibrantPalette(videoSeed), [videoSeed]);

  // 2. Cinematic 3-Act Camera System
  const camera = get3ActCamera(frame);

  // 3. Generate 180+ Multi-Layered Data Points
  const nodes: DataNode[] = useMemo(() => {
    const list: DataNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const layer = (i % 3) + 1; // 1, 2, or 3
      const radius = layer === 1 ? 7 : layer === 2 ? 4.5 : 2.5;

      list.push({
        id: i,
        layer,
        baseX: random(`nx-${i}-${videoSeed}`) * width,
        baseY: random(`ny-${i}-${videoSeed}`) * height,
        radius,
        speedX: (random(`sx-${i}-${videoSeed}`) - 0.5) * 0.03,
        speedY: (random(`sy-${i}-${videoSeed}`) - 0.5) * 0.03,
        phase: random(`ph-${i}-${videoSeed}`) * Math.PI * 2,
      });
    }
    return list;
  }, [nodeCount, width, height, videoSeed]);

  // 4. Compute Real-Time Floating Positions & Interconnect Vector Wires
  const activeNodes = useMemo(() => {
    return nodes.map((node) => {
      const moveX = Math.sin(frame * node.speedX * 60 + node.phase) * (40 / node.layer);
      const moveY = Math.cos(frame * node.speedY * 60 + node.phase) * (30 / node.layer);
      return {
        ...node,
        x: node.baseX + moveX,
        y: node.baseY + moveY,
      };
    });
  }, [nodes, frame]);

  return (
    <AbsoluteFill style={{ background: palette.background, overflow: 'hidden' }}>
      
      {/* OPTICAL BLOOM SHADER */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="matrix-bloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="18" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* LAYER 1: THIN SVG GRID LINE SYSTEM BACKGROUND WITH CROSSHAIRS */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.18, pointerEvents: 'none' }}>
        <pattern id="thinMatrixGrid" width="120" height="120" patternUnits="userSpaceOnUse">
          {/* Main Grid Lines */}
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke={palette.primary} strokeWidth="1" />
          
          {/* Corner Crosshairs */}
          <path d="M 0 10 L 0 -10 M -10 0 L 10 0" stroke={palette.accent} strokeWidth="1.5" />
          <path d="M 120 130 L 120 110 M 110 120 L 130 120" stroke={palette.accent} strokeWidth="1.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#thinMatrixGrid)" />
      </svg>

      {/* CAMERA TRANSFORMATION WRAPPER */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `scale(${camera.scale}) translateX(${camera.panX}px) translateY(${camera.panY}px)`,
        transformOrigin: '1920px 1080px',
      }}>

        {/* LAYER 2: DENSE INTERCONNECTING VECTOR WIRES */}
        <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
          {activeNodes.map((n1, i) => {
            if (n1.layer === 3) return null; // Background nodes skip heavy wire calculations for performance

            return activeNodes.slice(i + 1).map((n2, j) => {
              const dx = n2.x - n1.x;
              const dy = n2.y - n1.y;
              const dist = Math.hypot(dx, dy);

              if (dist < connectDistance) {
                const wireOpacity = (1 - dist / connectDistance) * (0.55 / n1.layer);

                return (
                  <line
                    key={`wire-${i}-${j}`}
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke={n1.layer === 1 ? palette.primary : palette.secondary}
                    strokeWidth={n1.layer === 1 ? 1.8 : 1.0}
                    strokeOpacity={wireOpacity}
                    filter={n1.layer === 1 ? 'url(#matrix-bloom)' : undefined}
                  />
                );
              }
              return null;
            });
          })}
        </svg>

        {/* LAYER 3: DENSE MULTI-LAYER DATA POINTS */}
        <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
          {activeNodes.map((node) => {
            const isForeground = node.layer === 1;
            const nodeColor = isForeground ? palette.primary : node.layer === 2 ? palette.secondary : palette.accent;
            const pulseOpacity = 0.5 + Math.sin(frame * 0.08 + node.id) * 0.4;

            return (
              <circle
                key={`node-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill={nodeColor}
                opacity={isForeground ? pulseOpacity : pulseOpacity * 0.6}
                filter={isForeground ? 'url(#matrix-bloom)' : undefined}
              />
            );
          })}
        </svg>

      </div>

      {/* LAYER 4: FOREGROUND FINE FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="matrix-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#matrix-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
