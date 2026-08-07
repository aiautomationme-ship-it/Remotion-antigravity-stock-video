import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

/**
 * 3D ROTATING PODIUM / PRODUCT PLATFORM SCENE
 * Features multi-tiered metallic & glass cylindrical platforms,
 * volumetric overhead spotlight cone, and orbiting accent light rings.
 */
const RotatingPodiumScene: React.FC<{ remotionFrame: number }> = ({ remotionFrame }) => {
  const podiumGroupRef = useRef<THREE.Group>(null!);
  const spotlightRef = useRef<THREE.SpotLight>(null!);

  useFrame(() => {
    if (podiumGroupRef.current) {
      // Continuous smooth platform rotation
      podiumGroupRef.current.rotation.y = remotionFrame * 0.008;
    }
    if (spotlightRef.current) {
      // Dynamic overhead spotlight sway
      spotlightRef.current.position.x = Math.sin(remotionFrame * 0.02) * 2;
    }
  });

  return (
    <group>
      {/* LIGHTING SETUP */}
      <ambientLight intensity={0.35} />
      
      {/* Overhead Intense Product Spotlight */}
      <spotLight
        ref={spotlightRef}
        position={[0, 12, 0]}
        angle={0.45}
        penumbra={0.8}
        intensity={6}
        color="#00E5FF"
        distance={25}
      />
      
      {/* Accent Rim Lights */}
      <pointLight position={[-8, 4, -5]} intensity={3} color="#FF9900" />
      <pointLight position={[8, -2, 5]} intensity={2.5} color="#00FF66" />

      {/* ROTATING PLATFORM GROUP */}
      <group ref={podiumGroupRef} position={[0, -2.5, 0]}>
        
        {/* 1. Base Tier: Heavy Dark Metallic Cylinder */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[5, 5.4, 0.6, 64]} />
          <meshStandardMaterial
            color="#0F172A"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* 2. Mid Tier: Glowing Cyan Ring Accent */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[4.2, 4.2, 0.15, 64]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* 3. Top Tier: Frosted Glass / Chrome Pedestal Surface */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[3.8, 4, 0.7, 64]} />
          <meshPhysicalMaterial
            color="#1E293B"
            metalness={0.8}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* 4. Orbiting Glowing Accent Torus Ring */}
        <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1.2}
          />
        </mesh>

      </group>
    </group>
  );
};

/**
 * MASTER 3D ROTATING PODIUM ENGINE
 */
export const RotatingPodiumEngine: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#020612', overflow: 'hidden' }}>
      
      {/* 3D WEBGL CANVAS */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 4, 12], fov: 45 }}>
          <RotatingPodiumScene remotionFrame={frame} />
        </Canvas>
      </div>

      {/* FOREGROUND FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="podium-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#podium-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
