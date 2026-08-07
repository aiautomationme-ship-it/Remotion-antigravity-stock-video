import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, random } from 'remotion';
import { getVibrantPalette } from './utils/colorEngine';
import { PremiumViewport } from './components/PremiumViewport';

interface DataNode {
  id: number;
  layer: number;
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
 * DENSE MULTI-LAYER DATA MATRIX ENGINE (Wrapped in PremiumViewport)
 */
export const DenseDataMatrixEngine: React.FC<Props> = ({
  videoSeed = 42,
  nodeCount = 180,
  connectDistance = 340,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const palette = useMemo(() => getVibrantPalette(videoSeed), [videoSeed]);

  const nodes: DataNode[] = useMemo(() => {
    const list: DataNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const layer = (i % 3) + 1;
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
    <PremiumViewport videoSeed={videoSeed}>
      {/* INTERCONNECTING VECTOR WIRES */}
      <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
        {activeNodes.map((n1, i) => {
          if (n1.layer === 3) return null;

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
                />
              );
            }
            return null;
          });
        })}
      </svg>

      {/* DENSE MULTI-LAYER DATA POINTS */}
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
            />
          );
        })}
      </svg>
    </PremiumViewport>
  );
};
