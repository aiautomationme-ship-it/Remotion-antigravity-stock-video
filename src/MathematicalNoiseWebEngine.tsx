import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { MOTION_RHYTHM, get3ActCamera } from './MotionRhythm';

interface NodePoint {
  id: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  freqX: number;
  freqY: number;
  phase: number;
  radius: number;
}

interface NoiseWebProps {
  glowColor?: string;
  nodeCount?: number;
  connectThreshold?: number;
  speed?: number;
}

/**
 * MATHEMATICAL NOISE WEB ENGINE
 * Renders floating dots connected by thin web-like lines 
 * that react dynamically to trigonometric & 3D noise formulas.
 */
export const MathematicalNoiseWebEngine: React.FC<NoiseWebProps> = ({
  glowColor = '#00F0FF',
  nodeCount = 140,
  connectThreshold = 320,
  speed = 0.025,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const camera = get3ActCamera(frame);

  // 1. Generate base static node distribution
  const baseNodes: NodePoint[] = useMemo(() => {
    const nodes: NodePoint[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        baseX: (Math.sin(i * 99) * 0.5 + 0.5) * (width + 400) - 200,
        baseY: (Math.cos(i * 33) * 0.5 + 0.5) * (height + 400) - 200,
        baseZ: (Math.sin(i * 17) * 0.5 + 0.5) * 500 - 250,
        freqX: 0.8 + Math.sin(i) * 0.5,
        freqY: 0.8 + Math.cos(i) * 0.5,
        phase: i * 0.45,
        radius: 3 + (i % 4) * 2,
      });
    }
    return nodes;
  }, [nodeCount, width, height]);

  // 2. Compute dynamic animated node coordinates using mathematical noise formulas
  const dynamicNodes = useMemo(() => {
    return baseNodes.map((node) => {
      // 3D Mathematical noise wave interference formula
      const noiseX = Math.sin(frame * speed * node.freqX + node.phase) * 80 +
                     Math.cos(frame * speed * 0.5 + node.baseY * 0.002) * 40;

      const noiseY = Math.cos(frame * speed * node.freqY + node.phase) * 70 +
                     Math.sin(frame * speed * 0.7 + node.baseX * 0.002) * 45;

      const noiseZ = Math.sin(frame * speed * 1.2 + node.phase) * 60;

      return {
        ...node,
        x: node.baseX + noiseX,
        y: node.baseY + noiseY,
        z: node.baseZ + noiseZ,
      };
    });
  }, [baseNodes, frame, speed]);

  // 3. Compute web-like interconnecting lines between close dots
  const webConnections = useMemo(() => {
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number; dist: number }> = [];

    for (let i = 0; i < dynamicNodes.length; i++) {
      for (let j = i + 1; j < dynamicNodes.length; j++) {
        const n1 = dynamicNodes[i];
        const n2 = dynamicNodes[j];

        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dz = n1.z - n2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectThreshold) {
          const opacity = Math.pow(1 - dist / connectThreshold, 1.8) * 0.85;
          lines.push({
            x1: n1.x,
            y1: n1.y,
            x2: n2.x,
            y2: n2.y,
            opacity,
            dist,
          });
        }
      }
    }
    return lines;
  }, [dynamicNodes, connectThreshold]);

  const drawProgress = interpolate(frame, [0, 60], [0, 1], {
    easing: MOTION_RHYTHM.hyperSnap,
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#02060E', overflow: 'hidden' }}>
      
      {/* GLOW BLOOM SHADER */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="web-node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="20" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* BACKGROUND ISOMETRIC GRID MESH */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.1, pointerEvents: 'none' }}>
        <pattern id="webGrid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke={glowColor} strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#webGrid)" />
      </svg>

      {/* MASTER CINEMATIC CAMERA SYSTEM WRAPPER */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `scale(${camera.scale}) translateX(${camera.panX}px) translateY(${camera.panY}px)`,
        transformOrigin: '1920px 1080px',
      }}>

        {/* ----------------===================================================---------------- */}
        {/* WEB-LIKE INTERCONNECT LINES CONNECTING FLOATING DOTS                                */}
        {/* ----------------===================================================---------------- */}
        <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
          {webConnections.map((line, idx) => (
            <line
              key={`web-line-${idx}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={glowColor}
              strokeWidth={line.dist < 120 ? 2 : 1}
              strokeOpacity={line.opacity * drawProgress}
              filter="url(#web-node-glow)"
            />
          ))}
        </svg>

        {/* ----------------===================================================---------------- */}
        {/* FLOATING DOT NODES REACTING TO MATHEMATICAL NOISE FORMULAS                          */}
        {/* ----------------===================================================---------------- */}
        <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
          {dynamicNodes.map((node) => {
            const pulse = 1 + Math.sin(frame * 0.08 + node.phase) * 0.3;
            return (
              <g key={`node-dot-${node.id}`} transform={`translate(${node.x}, ${node.y})`}>
                {/* Outer Glow Halo */}
                <circle
                  cx="0"
                  cy="0"
                  r={node.radius * 2.5 * pulse}
                  fill={glowColor}
                  fillOpacity="0.25"
                  filter="url(#web-node-glow)"
                />
                {/* Solid Core Dot */}
                <circle
                  cx="0"
                  cy="0"
                  r={node.radius * pulse}
                  fill="#FFFFFF"
                  stroke={glowColor}
                  strokeWidth="2"
                  filter="url(#web-node-glow)"
                />
              </g>
            );
          })}
        </svg>

      </div>

      {/* POST-PROCESSING TEXTURE LAYER: FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="web-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#web-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
