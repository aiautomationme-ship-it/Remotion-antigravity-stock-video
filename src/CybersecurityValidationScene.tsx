import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, random } from 'remotion';
import { getVibrantPalette } from './utils/colorEngine';
import { PremiumViewport } from './components/PremiumViewport';
import { ProceduralNoiseField } from './components/ProceduralNoiseField';

interface HexagonNode {
  id: number;
  layer: number;
  angle: number;
  baseRadius: number;
  size: number;
  isForegroundFloater: boolean; // 10% of nodes scaled 2x with blur(8px)
  isKeyNode: boolean;
  rippleSpeed: number;
  phase: number;
}

interface Props {
  videoSeed?: number;
}

/**
 * UPGRADED CYBERSECURITY VALIDATION SCENE
 * 
 * Features:
 * 1. Multi-Color Radial Shift: Dual-tone radial bleed from deep obsidian to cyber-green edge
 * 2. Integrated ProceduralNoiseField scattering telemetry alignment markers across grid canvas
 * 3. High-Contrast Mesh Scale: 10% of hexagons scaled 2x with blur(8px) for close-up foreground depth
 * 4. Amplified Glow Bloom: Stacked drop-shadow(0 0 35px var(--accent-glow)) filter on neon highlights
 * 5. Strict 4K UHD (3840x2160) @ 60 FPS (600 frames = 10s)
 */
export const CybersecurityValidationScene: React.FC<Props> = ({ videoSeed = 888 }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // 1. Multi-Color Radial Shift Background Calculation
  const palette = useMemo(() => {
    const vibrant = getVibrantPalette(videoSeed);
    const baseHue = Math.floor(random(videoSeed) * 360);
    return {
      ...vibrant,
      dualToneBg: `radial-gradient(circle at center, hsl(${baseHue}, 95%, 6%) 0%, hsl(${(baseHue + 40) % 360}, 90%, 12%) 100%)`,
      cyberGreen: `hsl(${(baseHue + 40) % 360}, 100%, 55%)`,
      neonCyan: `hsl(${baseHue}, 100%, 62%)`,
      accentGlow: `hsl(${(baseHue + 240) % 360}, 100%, 65%)`,
    };
  }, [videoSeed]);

  const centerX = width / 2;
  const centerY = height / 2;

  // 2. Generate 100 Hexagon Nodes (10% blurred foreground floaters, 90% crisp inner nodes)
  const hexNodes: HexagonNode[] = useMemo(() => {
    const list: HexagonNode[] = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      const isForegroundFloater = i % 10 === 0; // Exactly 10% of nodes
      const layer = isForegroundFloater ? 1 : (i % 2) + 2;
      const angle = (i / count) * Math.PI * 2 * 4;
      const baseRadius = isForegroundFloater ? 300 + (i / count) * 600 : 100 + (i / count) * 750;
      const size = isForegroundFloater ? 150 : (layer === 2 ? 45 : 28); // 2x scaled up for 10%
      const isKeyNode = i % 7 === 0;

      list.push({
        id: i,
        layer,
        angle,
        baseRadius,
        size,
        isForegroundFloater,
        isKeyNode,
        rippleSpeed: 1 + Math.floor(random(`sp-${i}`) * 3),
        phase: (i / count) * Math.PI * 2,
      });
    }
    return list;
  }, [videoSeed]);

  // 3. 600-Frame Circular Easing Angle
  const totalFrames = durationInFrames || 600;
  const loopAngle = (frame / totalFrames) * Math.PI * 2;

  const activeNodes = useMemo(() => {
    return hexNodes.map((node) => {
      const waveExpansion = Math.sin(loopAngle * node.rippleSpeed - node.baseRadius * 0.004) * (40 / node.layer);
      const currentRadius = node.baseRadius + waveExpansion;

      const x = centerX + Math.cos(node.angle + loopAngle * 0.15) * currentRadius;
      const y = centerY + Math.sin(node.angle + loopAngle * 0.15) * currentRadius;
      const opacity = 0.3 + (Math.sin(loopAngle * node.rippleSpeed + node.phase) + 1) * 0.35;

      return {
        ...node,
        x,
        y,
        opacity,
      };
    });
  }, [hexNodes, loopAngle, centerX, centerY]);

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', background: palette.dualToneBg, overflow: 'hidden' }}>
      
      {/* 1. PROCEDURAL NOISE FIELD OVERLAY FOR TELEMETRY CROSSHAIRS */}
      <ProceduralNoiseField
        seedString={`cyber-validation-${videoSeed}`}
        videoSeed={videoSeed}
        frequency={0.003}
        flowSpeed={0.015}
      />

      {/* 2. MASTER VIEWPORT LAYER */}
      <PremiumViewport videoSeed={videoSeed}>
        
        {/* OPTICAL BLOOM & DROP-SHADOW GLOW DEF */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="amplifiedGlowBloom" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor={palette.neonCyan} floodOpacity="0.8" />
              <feGaussianBlur stdDeviation="8" result="blur1" />
              <feGaussianBlur stdDeviation="35" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* INTERCONNECTING DEFENSIVE DATA LINES */}
        <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
          {activeNodes.map((n1, i) => {
            if (n1.isForegroundFloater) return null;

            return activeNodes.slice(i + 1).map((n2, j) => {
              if (n2.isForegroundFloater) return null;

              const dx = n2.x - n1.x;
              const dy = n2.y - n1.y;
              const dist = Math.hypot(dx, dy);

              if (dist < 320) {
                const wireOpacity = (1 - dist / 320) * 0.40;

                return (
                  <line
                    key={`val-line-${i}-${j}`}
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke={n1.isKeyNode ? palette.cyberGreen : palette.neonCyan}
                    strokeWidth={1.2}
                    strokeOpacity={wireOpacity}
                  />
                );
              }
              return null;
            });
          })}
        </svg>

        {/* HIGH-CONTRAST HEXAGON MESH (10% 2X SCALED BLURRED FOREGROUND, 90% CRISP INNER) */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
          {activeNodes.map((node) => {
            const strokeColor = node.isKeyNode ? palette.cyberGreen : palette.neonCyan;

            return (
              <div
                key={`val-hex-${node.id}`}
                style={{
                  position: 'absolute',
                  left: `${node.x - node.size / 2}px`,
                  top: `${node.y - node.size / 2}px`,
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  opacity: node.isForegroundFloater ? 0.45 : node.opacity,
                  filter: node.isForegroundFloater
                    ? 'blur(8px)' // 10% Scaled Up 2x with Heavy Motion Blur
                    : node.isKeyNode
                    ? 'drop-shadow(0 0 35px var(--accent-glow))' // Amplified Glow Bloom
                    : 'none',
                  transform: `rotate(${frame * 0.2 + node.id}deg)`,
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <polygon
                    points="50,5 95,27 95,73 50,95 5,73 5,27"
                    fill={node.isForegroundFloater ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 255, 102, 0.08)'}
                    stroke={strokeColor}
                    strokeWidth={node.isForegroundFloater ? 4 : 2}
                  />
                  {node.isKeyNode && (
                    <circle
                      cx="50"
                      cy="50"
                      r="14"
                      fill={palette.cyberGreen}
                      style={{ filter: 'drop-shadow(0 0 35px var(--accent-glow))' }}
                    />
                  )}
                </svg>
              </div>
            );
          })}
        </div>

      </PremiumViewport>
    </div>
  );
};
