import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export type BackgroundType = 'grid_mesh' | 'code_matrix' | 'topo_contour' | 'particle_cloud';

interface Props {
  bgType?: BackgroundType;
  color: string;
}

/**
 * 1. 3D ISOMETRIC TECHNICAL WIREFRAME GRID
 */
export const GridMeshBackground: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const gridY = (frame * 1.5) % 80;

  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15, pointerEvents: 'none' }}>
      <defs>
        <pattern id="gridPattern" width="80" height="80" patternUnits="userSpaceOnUse" y={gridY}>
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridPattern)" />
    </svg>
  );
};

/**
 * 2. FALLING BINARY MATRIX DATA STREAM
 */
export const CodeMatrixBackground: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const columns = Array.from({ length: 24 });

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.12, pointerEvents: 'none', overflow: 'hidden' }}>
      {columns.map((_, i) => {
        const speed = 2 + (i % 5);
        const yPos = (frame * speed * 4) % 2500 - 300;
        const xPos = i * 160 + 40;
        const binaryString = ((i * 37) % 255).toString(2).padStart(8, '0') + " 0x" + (i * 13).toString(16).toUpperCase();

        return (
          <div key={`matrix-col-${i}`} style={{
            position: 'absolute',
            left: xPos,
            top: yPos,
            fontFamily: "'Roboto Mono', monospace",
            fontSize: 22,
            color: color,
            letterSpacing: 4,
            writingMode: 'vertical-rl'
          }}>
            {binaryString}
          </div>
        );
      })}
    </div>
  );
};

/**
 * 3. PARALLAX TOPOLOGICAL ELEVATION CONTOUR CURVES
 */
export const TopoContourBackground: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.02) * 40;

  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.14, pointerEvents: 'none' }}>
      <path d={`M 0 400 Q 960 ${200 + drift} 1920 600 T 3840 400`} fill="none" stroke={color} strokeWidth="2" strokeDasharray="12,12" />
      <path d={`M 0 800 Q 1440 ${1000 - drift} 2880 700 T 3840 900`} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="8,8" />
      <path d={`M 0 1400 Q 960 ${1600 + drift} 2400 1200 T 3840 1500`} fill="none" stroke={color} strokeWidth="2" strokeDasharray="16,16" />
      <path d={`M 0 1800 Q 1920 ${1600 - drift} 3840 1800`} fill="none" stroke={color} strokeWidth="1" strokeDasharray="10,10" />
    </svg>
  );
};

/**
 * 4. FLOATING OPTICAL CONSTELLATION PARTICLE CLOUD
 */
export const ParticleCloudBackground: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 18 });

  return (
    <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.18, pointerEvents: 'none' }}>
      {particles.map((_, i) => {
        const initialX = (i * 220 + 100) % 3600;
        const initialY = (i * 130 + 150) % 2000;
        const moveX = Math.sin((frame + i * 20) * 0.03) * 50;
        const moveY = Math.cos((frame + i * 15) * 0.03) * 40;
        const size = (i % 4) * 4 + 4;

        return (
          <g key={`particle-${i}`}>
            <circle cx={initialX + moveX} cy={initialY + moveY} r={size} fill={color} />
            {i > 0 && (
              <line 
                x1={initialX + moveX} 
                y1={initialY + moveY} 
                x2={((i - 1) * 220 + 100) % 3600} 
                y2={((i - 1) * 130 + 150) % 2000} 
                stroke={color} 
                strokeWidth="1" 
                strokeDasharray="4,8"
                opacity="0.4"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * MASTER BACKGROUND SWITCH RESOLVER
 */
export const RenderBackground: React.FC<Props> = ({ bgType = 'grid_mesh', color }) => {
  switch (bgType) {
    case 'code_matrix':
      return <CodeMatrixBackground color={color} />;
    case 'topo_contour':
      return <TopoContourBackground color={color} />;
    case 'particle_cloud':
      return <ParticleCloudBackground color={color} />;
    case 'grid_mesh':
    default:
      return <GridMeshBackground color={color} />;
  }
};
