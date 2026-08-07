import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, random, interpolate } from 'remotion';
import { getVibrantPalette } from './utils/colorEngine';
import { PremiumViewport } from './components/PremiumViewport';

interface CryptoHexNode {
  id: number;
  layer: number; // 1 = Foreground, 2 = Midground, 3 = Background
  angle: number;
  baseRadius: number;
  size: number;
  rippleSpeed: number;
  phaseOffset: number;
  isKeyNode: boolean;
}

interface Props {
  videoSeed?: number;
}

/**
 * CRYPTOGRAPHIC DEFENSIVE DATA WEB ENGINE
 * 
 * Visual Metaphor:
 * Multi-layered clusters of floating, semi-transparent SVG hexagons that expand 
 * and ripple outwards from the center of the canvas in continuous harmonic shockwaves.
 */
export const CryptoDefensiveWebEngine: React.FC<Props> = ({ videoSeed = 555 }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // 1. Executive Broadcast HSL Palette
  const palette = useMemo(() => {
    const vibrant = getVibrantPalette(videoSeed);
    return {
      bg: vibrant.background,
      cyberEmerald: 'hsl(155, 100%, 52%)',
      defenseCyan: 'hsl(188, 100%, 55%)',
      cryptoViolet: 'hsl(270, 100%, 65%)',
      goldKey: 'hsl(44, 100%, 60%)',
    };
  }, [videoSeed]);

  // Center Coordinates of 3840x2160 Canvas
  const centerX = width / 2;
  const centerY = height / 2;

  // 2. Generate 90 Multi-Layered Hexagon Nodes in Concentric Radial Rings
  const hexNodes: CryptoHexNode[] = useMemo(() => {
    const list: CryptoHexNode[] = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      const layer = (i % 3) + 1; // 1 = Foreground, 2 = Midground, 3 = Background
      const angle = (i / count) * Math.PI * 2 * 3; // 3 spiral turns
      const baseRadius = 120 + (i / count) * 850;
      const size = layer === 1 ? 75 : layer === 2 ? 48 : 28;
      const isKeyNode = i % 6 === 0;

      list.push({
        id: i,
        layer,
        angle,
        baseRadius,
        size,
        rippleSpeed: 1 + Math.floor(random(`rs-${i}`) * 3), // Integer multiplier for 600-frame loop
        phaseOffset: (i / count) * Math.PI * 2,
        isKeyNode,
      });
    }
    return list;
  }, [videoSeed]);

  // 3. Compute Outward Rippling Hexagon Positions & Opacities
  const activeNodes = useMemo(() => {
    const loopProgress = (frame / durationInFrames) * Math.PI * 2;

    return hexNodes.map((node) => {
      // Outward expanding ripple wave offset based on distance from center & frame velocity
      const waveExpansion = Math.sin(loopProgress * node.rippleSpeed - node.baseRadius * 0.005) * (45 / node.layer);
      const currentRadius = node.baseRadius + waveExpansion;

      const x = centerX + Math.cos(node.angle + loopProgress * 0.2) * currentRadius;
      const y = centerY + Math.sin(node.angle + loopProgress * 0.2) * currentRadius;

      // Dynamic opacity pulse
      const pulseOpacity = 0.25 + (Math.sin(loopProgress * node.rippleSpeed + node.phaseOffset) + 1) * 0.35;

      return {
        ...node,
        x,
        y,
        currentRadius,
        opacity: pulseOpacity,
      };
    });
  }, [hexNodes, frame, durationInFrames, centerX, centerY]);

  // 4. Concentric Shockwave Expanding Rings
  const shockwaves = useMemo(() => {
    const rings = 4;
    return Array.from({ length: rings }).map((_, idx) => {
      const ringProgress = ((frame / durationInFrames * 2 + idx / rings) % 1);
      const r = ringProgress * 950;
      const op = (1 - ringProgress) * 0.45;
      return { r, op };
    });
  }, [frame, durationInFrames]);

  return (
    <PremiumViewport videoSeed={videoSeed}>
      
      {/* OPTICAL CRYPTOGRAPHIC GLOW DEF */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="crypto-web-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="20" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Hexagon Metallic-Glass Gradient */}
          <linearGradient id="cryptoHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsla(188, 100%, 65%, 0.45)" />
            <stop offset="100%" stopColor="hsla(270, 100%, 45%, 0.15)" />
          </linearGradient>
        </defs>
      </svg>

      {/* LAYER 1: CENTER OUTWARD EXPANDING SHOCKWAVE RINGS */}
      <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
        {shockwaves.map((ring, idx) => (
          <circle
            key={`shockwave-${idx}`}
            cx={centerX}
            cy={centerY}
            r={ring.r}
            fill="none"
            stroke={idx % 2 === 0 ? palette.defenseCyan : palette.cyberEmerald}
            strokeWidth="1.5"
            strokeDasharray="12 8"
            opacity={ring.op}
          />
        ))}
      </svg>

      {/* LAYER 2: CRYPTOGRAPHIC INTERCONNECTING WEB LINES */}
      <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
        {activeNodes.map((n1, i) => {
          if (n1.layer === 3) return null;

          return activeNodes.slice(i + 1).map((n2, j) => {
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 360) {
              const wireOpacity = (1 - dist / 360) * 0.45 * n1.opacity;
              const lineColor = n1.isKeyNode ? palette.cyberEmerald : palette.defenseCyan;

              return (
                <line
                  key={`web-line-${i}-${j}`}
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke={lineColor}
                  strokeWidth={n1.layer === 1 ? 1.8 : 1.0}
                  strokeOpacity={wireOpacity}
                />
              );
            }
            return null;
          });
        })}
      </svg>

      {/* LAYER 3: RIPPLED SEMI-TRANSPARENT SVG HEXAGONS */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        {activeNodes.map((node) => {
          const isForeground = node.layer === 1;
          const strokeColor = node.isKeyNode ? palette.goldKey : isForeground ? palette.cyberEmerald : palette.defenseCyan;

          return (
            <div
              key={`crypto-hex-${node.id}`}
              style={{
                position: 'absolute',
                left: `${node.x - node.size / 2}px`,
                top: `${node.y - node.size / 2}px`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                opacity: node.opacity,
                transform: `rotate(${frame * 0.15 + node.id}deg)`,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                {/* 6-Point SVG Polygon Hexagon */}
                <polygon
                  points="50,5 95,27 95,73 50,95 5,73 5,27"
                  fill="url(#cryptoHexGrad)"
                  stroke={strokeColor}
                  strokeWidth={isForeground ? 2.5 : 1.5}
                />

                {/* Inner Cryptographic Key Core */}
                {node.isKeyNode && (
                  <circle
                    cx="50"
                    cy="50"
                    r="12"
                    fill={palette.goldKey}
                  />
                )}
              </svg>
            </div>
          );
        })}
      </div>

    </PremiumViewport>
  );
};
