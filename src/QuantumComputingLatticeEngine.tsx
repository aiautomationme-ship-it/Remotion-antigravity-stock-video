import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, random } from 'remotion';
import { getVibrantPalette } from './utils/colorEngine';
import { getSnappySpring } from './MotionRhythm';
import { PremiumViewport } from './components/PremiumViewport';

interface QubitNode {
  id: number;
  layer: number;
  baseX: number;
  baseY: number;
  size: number;
  rotationSpeed: number;
  pulsePhase: number;
  isGoldCore: boolean;
}

interface EntanglementLink {
  fromId: number;
  toId: number;
  frequency: number;
}

interface Props {
  videoSeed?: number;
}

/**
 * 10/10 QUANTUM COMPUTING & 3D REFRACTIVE GLASS LATTICE ENGINE
 * Wrapped inside PremiumViewport for master 3-layer parallax depth blueprint.
 */
export const QuantumComputingLatticeEngine: React.FC<Props> = ({
  videoSeed = 108,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const palette = useMemo(() => getVibrantPalette(videoSeed), [videoSeed]);

  const qubits: QubitNode[] = useMemo(() => {
    const list: QubitNode[] = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      const layer = (i % 3) + 1;
      const size = layer === 1 ? 90 : layer === 2 ? 55 : 32;
      const isGoldCore = i % 4 === 0;

      list.push({
        id: i,
        layer,
        baseX: random(`qx-${i}-${videoSeed}`) * width,
        baseY: random(`qy-${i}-${videoSeed}`) * height,
        size,
        rotationSpeed: (random(`rot-${i}-${videoSeed}`) - 0.5) * 0.8,
        pulsePhase: random(`pulse-${i}-${videoSeed}`) * Math.PI * 2,
        isGoldCore,
      });
    }
    return list;
  }, [width, height, videoSeed]);

  const links: EntanglementLink[] = useMemo(() => {
    const list: EntanglementLink[] = [];
    for (let i = 0; i < qubits.length; i++) {
      for (let j = i + 1; j < qubits.length; j++) {
        const dx = qubits[j].baseX - qubits[i].baseX;
        const dy = qubits[j].baseY - qubits[i].baseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 420 && list.length < 75) {
          list.push({
            fromId: i,
            toId: j,
            frequency: 0.03 + random(`fq-${i}-${j}`) * 0.04,
          });
        }
      }
    }
    return list;
  }, [qubits]);

  const activeQubits = useMemo(() => {
    return qubits.map((q) => {
      const floatX = Math.sin(frame * 0.02 + q.pulsePhase) * (25 / q.layer);
      const floatY = Math.cos(frame * 0.025 + q.pulsePhase) * (20 / q.layer);
      const rot = frame * q.rotationSpeed;
      return {
        ...q,
        x: q.baseX + floatX,
        y: q.baseY + floatY,
        rot,
      };
    });
  }, [qubits, frame]);

  return (
    <PremiumViewport videoSeed={videoSeed}>
      {/* QUANTUM ENTANGLEMENT PULSE WIRES */}
      <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
        {links.map((link, idx) => {
          const q1 = activeQubits[link.fromId];
          const q2 = activeQubits[link.toId];
          const dx = q2.x - q1.x;
          const dy = q2.y - q1.y;
          const dist = Math.hypot(dx, dy);
          const wireOpacity = (1 - dist / 420) * 0.65;

          const packetPos = (frame * link.frequency * 60) % 1;
          const px = q1.x + dx * packetPos;
          const py = q1.y + dy * packetPos;

          return (
            <g key={`link-${idx}`}>
              <line
                x1={q1.x}
                y1={q1.y}
                x2={q2.x}
                y2={q2.y}
                stroke={q1.isGoldCore ? palette.primary : palette.accent}
                strokeWidth={q1.layer === 1 ? 2.0 : 1.2}
                strokeOpacity={wireOpacity}
              />
              <circle
                cx={px}
                cy={py}
                r={q1.layer === 1 ? 4.5 : 3.0}
                fill={q1.isGoldCore ? palette.primary : palette.accent}
              />
            </g>
          );
        })}
      </svg>

      {/* 3D REFRACTIVE GLASS QUBIT CRYSTALS & GOLD CORES */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        {activeQubits.map((q) => {
          const springVal = getSnappySpring(frame, fps, q.id % 15);
          const isForeground = q.layer === 1;

          return (
            <div
              key={`qubit-${q.id}`}
              style={{
                position: 'absolute',
                left: `${q.x - q.size / 2}px`,
                top: `${q.y - q.size / 2}px`,
                width: `${q.size}px`,
                height: `${q.size}px`,
                transform: `scale(${springVal}) rotate(${q.rot}deg)`,
                opacity: isForeground ? 0.95 : q.layer === 2 ? 0.75 : 0.45,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <polygon
                  points="50,5 95,27 95,73 50,95 5,73 5,27"
                  fill="rgba(0, 229, 255, 0.25)"
                  stroke={q.isGoldCore ? palette.primary : palette.accent}
                  strokeWidth={isForeground ? 2.5 : 1.5}
                />
                <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <line x1="5" y1="27" x2="95" y2="73" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <line x1="5" y1="73" x2="95" y2="27" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                {q.isGoldCore && (
                  <circle
                    cx="50"
                    cy="50"
                    r="16"
                    fill={palette.primary}
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
