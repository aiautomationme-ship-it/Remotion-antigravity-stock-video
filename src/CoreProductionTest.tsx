import React, { useMemo, useRef } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getVibrantPalette } from './utils/colorEngine';
import { getSnappySpring, get3ActCamera } from './MotionRhythm';

interface Props {
  videoSeed?: number;
}

/**
 * 3D BACKGROUND PARTICLE SWARM
 */
const BackgroundParticleSwarm: React.FC<{ color: string; remotionFrame: number }> = ({ color, remotionFrame }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;

      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }

    return { positions: pos, colors: col };
  }, [color]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = remotionFrame * 0.003;
      pointsRef.current.rotation.x = Math.sin(remotionFrame * 0.002) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.10} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

/**
 * SHARP MIDGROUND 3D METALLIC SPHERES & GLASS PRIMITIVES
 */
const Midground3DPrimitives: React.FC<{
  cyanColor: string;
  violetColor: string;
  remotionFrame: number;
  springScale: number;
}> = ({ cyanColor, violetColor, remotionFrame, springScale }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = remotionFrame * 0.012;
      groupRef.current.rotation.x = Math.sin(remotionFrame * 0.008) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={[springScale, springScale, springScale]}>
      {/* Central Metallic Chrome Core Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.95}
          roughness={0.08}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Orbiting Neon Cyan Glass Torus */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, remotionFrame * 0.02, 0]}>
        <torusGeometry args={[4.2, 0.45, 32, 100]} />
        <meshPhysicalMaterial
          color={cyanColor}
          transmission={0.85}
          roughness={0.05}
          ior={1.5}
          thickness={1.2}
          transparent
          opacity={0.9}
          metalness={0.2}
        />
      </mesh>

      {/* Orbiting Neon Violet Glass Icosahedron */}
      <mesh position={[5.5, 1.2, -2.0]} rotation={[remotionFrame * 0.015, remotionFrame * 0.01, 0]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial
          color={violetColor}
          transmission={0.80}
          roughness={0.1}
          ior={1.4}
          thickness={1.0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Orbiting Metallic Gold Sphere */}
      <mesh position={[-5.2, -1.8, 1.5]} rotation={[0, remotionFrame * 0.02, 0]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial
          color="#FFB703"
          metalness={0.92}
          roughness={0.10}
        />
      </mesh>
    </group>
  );
};

/**
 * BLURRED FOREGROUND FLOATING PRIMITIVES
 */
const ForegroundFloaters: React.FC<{ color: string; remotionFrame: number }> = ({ color, remotionFrame }) => {
  const mesh1Ref = useRef<THREE.Mesh>(null!);
  const mesh2Ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (mesh1Ref.current) {
      mesh1Ref.current.position.y = -3.5 + Math.sin(remotionFrame * 0.02) * 0.8;
      mesh1Ref.current.rotation.z = remotionFrame * 0.01;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.position.y = 4.0 + Math.cos(remotionFrame * 0.025) * 0.7;
      mesh2Ref.current.rotation.x = remotionFrame * 0.012;
    }
  });

  return (
    <>
      <mesh ref={mesh1Ref} position={[-8.5, -3.5, 5.0]}>
        <dodecahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} transparent opacity={0.65} />
      </mesh>
      <mesh ref={mesh2Ref} position={[8.5, 4.0, 4.5]}>
        <octahedronGeometry args={[2.8, 0]} />
        <meshStandardMaterial color="#8B5CF6" metalness={0.8} roughness={0.15} transparent opacity={0.6} />
      </mesh>
    </>
  );
};

/**
 * CORE PRODUCTION TEST ENGINE
 * 
 * Specifications:
 * 1. 100% Clean Stock Plate (Zero text / Zero titles)
 * 2. 3D WebGL Multi-Plane Depth (Foreground floaters, midground primitives, background particle swarm)
 * 3. Vibrant HSL Contrast (Obsidian navy background, neon cyan & violet 3D meshes)
 * 4. Snappy Motion Physics (getSnappySpring entrance)
 * 5. Locked to 3840x2160 @ 60 FPS (600 frames = 10s)
 */
export const CoreProductionTest: React.FC<Props> = ({ videoSeed = 77 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Vibrant Palette with Deep Obsidian Navy Background & Neon Highlights
  const palette = useMemo(() => {
    const vibrant = getVibrantPalette(videoSeed);
    return {
      bg: 'radial-gradient(circle, hsl(230, 90%, 8%) 0%, hsl(235, 95%, 3%) 100%)',
      neonCyan: '#00E5FF',
      neonViolet: '#8B5CF6',
      gold: '#FFB703',
      particleColor: vibrant.primary,
    };
  }, [videoSeed]);

  // 2. Remotion Snappy Spring Entrance Physics
  const springScale = getSnappySpring(frame, fps, 0);

  // 3. Cinematic 3-Act Camera System
  const camera = get3ActCamera(frame);

  return (
    <AbsoluteFill style={{ background: palette.bg, overflow: 'hidden' }}>
      
      {/* 3D WEBGL MULTI-PLANE CANVAS */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `scale(${camera.scale}) translateX(${camera.panX}px) translateY(${camera.panY}px)`,
        transformOrigin: '1920px 1080px',
      }}>
        <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
          {/* Volumetric Studio Spotlights */}
          <ambientLight intensity={0.5} />
          <pointLight position={[12, 16, 12]} intensity={4.0} color={palette.neonCyan} />
          <pointLight position={[-12, -16, -10]} intensity={3.0} color={palette.neonViolet} />
          <spotLight position={[0, 15, 10]} intensity={2.5} angle={0.45} color="#FFFFFF" />

          {/* Plane 1: Background Slow-Moving Particle Swarm */}
          <BackgroundParticleSwarm color={palette.particleColor} remotionFrame={frame} />

          {/* Plane 2: Sharp Midground 3D Primitives */}
          <Midground3DPrimitives
            cyanColor={palette.neonCyan}
            violetColor={palette.neonViolet}
            remotionFrame={frame}
            springScale={springScale}
          />

          {/* Plane 3: Blurred Foreground Floating Primitives */}
          <ForegroundFloaters color={palette.neonCyan} remotionFrame={frame} />
        </Canvas>
      </div>

      {/* FOREGROUND CINEMATIC FILM GRAIN */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.04, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="core-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#core-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
