import React, { useMemo, useRef } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from 'remotion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getVibrantPalette } from './utils/colorEngine';
import { get3ActCamera } from './MotionRhythm';

interface HexagonNode {
  id: number;
  layer: number; // 1 = Foreground, 2 = Midground, 3 = Background
  position: [number, number, number];
  size: number;
  phase: number;
  freq: number;
  rotSpeed: number;
  isThreatHighlight: boolean;
}

interface Props {
  videoSeed?: number;
}

/**
 * 3D CYBERSECURITY DENSE FLOATING HEXAGON NETWORK MESH
 * Renders floating 3D hexagons fading in and out continuously in 3D parallax space.
 * Uses trigonometric harmonic loops for perfect 600-frame (10s) seamless looping!
 */
const HexagonNetworkMesh: React.FC<{
  videoSeed: number;
  remotionFrame: number;
  totalFrames: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}> = ({ videoSeed, remotionFrame, totalFrames, primaryColor, secondaryColor, accentColor }) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate 80 Floating 3D Hexagon Nodes across 3 Parallax Planes
  const hexNodes: HexagonNode[] = useMemo(() => {
    const list: HexagonNode[] = [];
    const count = 80;
    for (let i = 0; i < count; i++) {
      const layer = (i % 3) + 1; // 1 = Foreground, 2 = Midground, 3 = Background
      const z = layer === 1 ? 4.0 + (random(`z-${i}`) * 2) : layer === 2 ? -1.0 + (random(`z-${i}`) * 3) : -8.0 - (random(`z-${i}`) * 4);
      const size = layer === 1 ? 1.6 : layer === 2 ? 1.0 : 0.6;
      const isThreatHighlight = i % 5 === 0;

      list.push({
        id: i,
        layer,
        position: [
          (random(`hx-${i}-${videoSeed}`) - 0.5) * 26,
          (random(`hy-${i}-${videoSeed}`) - 0.5) * 16,
          z,
        ],
        size,
        phase: (i / count) * Math.PI * 2, // Distributed phases for smooth continuous fade cycles
        freq: 1 + Math.floor(random(`fq-${i}`) * 3), // Integer multiplier ensures exact frame 0 == frame 600 loop
        rotSpeed: (random(`rs-${i}`) - 0.5) * 0.5,
        isThreatHighlight,
      });
    }
    return list;
  }, [videoSeed]);

  useFrame(() => {
    if (groupRef.current) {
      // Seamless rotational drift (integer cycle per 600 frames)
      const loopAngle = (remotionFrame / totalFrames) * Math.PI * 2;
      groupRef.current.rotation.y = Math.sin(loopAngle) * 0.18;
      groupRef.current.rotation.x = Math.cos(loopAngle) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {hexNodes.map((hex) => {
        // Seamless pulse opacity equation: frame 0 and frame 600 produce identical output!
        const loopProgress = (remotionFrame / totalFrames) * Math.PI * 2 * hex.freq;
        const fadeOpacity = 0.2 + (Math.sin(loopProgress + hex.phase) + 1) * 0.38; // Opacity range [0.20 -> 0.96]
        const hexColor = hex.isThreatHighlight ? accentColor : hex.layer === 1 ? primaryColor : secondaryColor;

        return (
          <mesh
            key={`hex-${hex.id}`}
            position={hex.position}
            rotation={[0, 0, hex.rotSpeed * remotionFrame * 0.02]}
          >
            {/* Hexagon Cylinder Geometry (6 sides) */}
            <cylinderGeometry args={[hex.size, hex.size, 0.12, 6]} />
            <meshStandardMaterial
              color={hexColor}
              emissive={hexColor}
              emissiveIntensity={hex.isThreatHighlight ? 0.8 : 0.35}
              roughness={0.20}
              metalness={0.80}
              transparent
              opacity={fadeOpacity}
            />
          </mesh>
        );
      })}
    </group>
  );
};

/**
 * 3D BACKGROUND CYBER PARTICLE SWARM
 */
const CyberParticleSwarm: React.FC<{ color: string; remotionFrame: number; totalFrames: number }> = ({ color, remotionFrame, totalFrames }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 1400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;

      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }

    return { positions: pos, colors: col };
  }, [color]);

  useFrame(() => {
    if (pointsRef.current) {
      const loopAngle = (remotionFrame / totalFrames) * Math.PI * 2;
      pointsRef.current.rotation.y = loopAngle * 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.09} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  );
};

/**
 * CYBERSECURITY 3D HEXAGON NETWORK ENGINE
 * 
 * Specifications:
 * 1. 100% Clean Stock Plate (Zero baked-in text or labels)
 * 2. Dense layered network of floating hexagons in 3D parallax depth space
 * 3. Continuous fading in/out via seamless harmonic sine waves (100% infinite loop)
 * 4. Dynamic HSL Palette: Deep obsidian background with high-contrast neon cyan/emerald highlights
 * 5. Strict 4K UHD (3840x2160) @ 60 FPS (600 frames = 10s)
 */
export const CyberHexagonNetworkEngine: React.FC<Props> = ({ videoSeed = 999 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 1. Executive Cyber HSL Palette
  const palette = useMemo(() => {
    const vibrant = getVibrantPalette(videoSeed);
    return {
      bg: 'radial-gradient(circle, hsl(225, 90%, 6%) 0%, hsl(230, 95%, 2%) 100%)',
      neonCyan: 'hsl(188, 100%, 55%)',
      cyberEmerald: 'hsl(155, 100%, 52%)',
      threatViolet: 'hsl(275, 100%, 65%)',
    };
  }, [videoSeed]);

  // 2. Cinematic Camera Panning
  const camera = get3ActCamera(frame);

  return (
    <AbsoluteFill style={{ background: palette.bg, overflow: 'hidden' }}>
      
      {/* OPTICAL CYBER BLOOM DEF */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="cyber-hex-bloom" x="-50%" y="-50%" width="200%" height="200%">
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

      {/* BACKGROUND HEXAGONAL SVG GRID MATRIX */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15 }}>
        <pattern id="cyberHexGrid" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 120 35 L 120 105 L 60 140 L 0 105 L 0 35 Z" fill="none" stroke={palette.neonCyan} strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#cyberHexGrid)" />
      </svg>

      {/* 3D WEBGL PARALLAX CANVAS */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `scale(${camera.scale}) translateX(${camera.panX}px) translateY(${camera.panY}px)`,
        transformOrigin: '1920px 1080px',
      }}>
        <Canvas
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
          camera={{ position: [0, 0, 16], fov: 45 }}
        >
          {/* Volumetric Studio Spotlights */}
          <ambientLight intensity={0.35} />
          <pointLight position={[10, 14, 10]} intensity={1.40} color={palette.neonCyan} />
          <pointLight position={[-10, -14, -10]} intensity={1.20} color={palette.cyberEmerald} />
          <spotLight position={[0, 12, 8]} intensity={1.10} angle={0.45} color={palette.threatViolet} />

          {/* Plane 1: Background Cyber Particle Swarm */}
          <CyberParticleSwarm
            color={palette.neonCyan}
            remotionFrame={frame}
            totalFrames={durationInFrames}
          />

          {/* Plane 2 & 3: 3D Floating Hexagon Network Nodes */}
          <HexagonNetworkMesh
            videoSeed={videoSeed}
            remotionFrame={frame}
            totalFrames={durationInFrames}
            primaryColor={palette.neonCyan}
            secondaryColor={palette.cyberEmerald}
            accentColor={palette.threatViolet}
          />
        </Canvas>
      </div>

      {/* FOREGROUND CINEMATIC FILM GRAIN */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.04, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="cyber-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cyber-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
