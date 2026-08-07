import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';
import { resolveAutomaticTheme } from './AutomaticColors';
import { MOTION_RHYTHM, get3ActCamera } from './MotionRhythm';
import { generateProceduralPath, GeometryType } from './GenerativeMath';
import { RenderBackground, BackgroundType } from './BackgroundEngines';
import { ThreeCanvasEngine, ThreeMeshType } from './ThreeCanvasEngine';

interface Props {
  niche?: string;
  videoSeed?: number;               // Dynamic Seed for Automatic HSL Color Generation
  geometryType?: GeometryType;
  bgType?: BackgroundType;
  threeMeshType?: ThreeMeshType;
  customGlow?: string;
  customBg?: string;
  customCoreLight?: string;
}

/**
 * PURE VISUAL MOTION GRAPHIC ENGINE (NO TEXT / NO TYPOGRAPHY)
 * Strictly enforced rule: Zero text rendering across all compositions for maximum stock versatility.
 * Features Automatic HSL Color Generation via videoSeed!
 */
export const MasterEditorialComposition: React.FC<Props> = ({ 
  niche = 'artificial_intelligence',
  videoSeed,
  geometryType = 'trig_wave',
  bgType = 'grid_mesh',
  threeMeshType = 'particle_swarm',
  customGlow,
  customBg,
  customCoreLight
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  // Resolve Theme Colors (Supports Automatic Seed HSL or Niche lookups or Custom Overrides)
  const currentTheme = resolveAutomaticTheme(niche, videoSeed, customGlow, customBg, customCoreLight);

  const camera = get3ActCamera(frame);
  const pathDrawProgress = interpolate(frame, [20, 90], [1, 0], {
    easing: MOTION_RHYTHM.hyperSnap,
    extrapolateRight: 'clamp',
  });

  // Procedural geometry path calculation
  const primaryVectorPath = generateProceduralPath(geometryType, frame, width, height / 2 + 100);
  const secondaryVectorPath = generateProceduralPath(geometryType, frame + 45, width, height / 2 - 100);

  return (
    <AbsoluteFill style={{ backgroundColor: currentTheme.background, overflow: 'hidden' }}>
      
      {/* DYNAMIC HIGH-END GLOW SHADER */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="dynamic-bloom-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur1" />
            <feGaussianBlur stdDeviation="30" result="blur2" />
            <feMerge result="combinedBlur">
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
            </feMerge>
            <feFlood floodColor={currentTheme.glow} floodOpacity="0.7" result="floodColor" />
            <feComposite in="floodColor" in2="coloredGlow" operator="in" result="coloredGlow" />
            <feMerge>
              <feMergeNode in="coloredGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* LAYER 1: DYNAMIC BACKGROUND TEXTURE ENGINE */}
      <RenderBackground bgType={bgType} color={currentTheme.glow} />

      {/* THREE.JS REAL 3D WEBGL ENGINE LAYER */}
      {threeMeshType && (
        <ThreeCanvasEngine meshType={threeMeshType} color={currentTheme.glow} />
      )}

      {/* MASTER CINEMATIC CAMERA SYSTEM WRAPPER */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', transform: `scale(${camera.scale}) translateX(${camera.panX}px) translateY(${camera.panY}px)`, transformOrigin: '1920px 1080px' }}>
        
        {/* LAYER 2: PROCEDURAL COMPUTE VECTOR GEOMETRY REALS */}
        <svg width="100%" height="100%" style={{ position: 'absolute', pointerEvents: 'none' }}>
          <path 
            d={primaryVectorPath} 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.4)" 
            strokeWidth="5" 
            filter="url(#dynamic-bloom-glow)" 
            strokeDasharray="5000"
            strokeDashoffset={pathDrawProgress * 5000}
          />
          <path 
            d={secondaryVectorPath} 
            fill="none" 
            stroke={currentTheme.glow} 
            strokeWidth="3" 
            filter="url(#dynamic-bloom-glow)"
            strokeDasharray="5000"
            strokeDashoffset={pathDrawProgress * 5000}
          />
        </svg>

      </div>

      {/* POST-PROCESSING TEXTURE LAYER: FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="cinematic-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
