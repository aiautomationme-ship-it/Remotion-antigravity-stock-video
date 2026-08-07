import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

/**
 * 3D SMARTPHONE & APP INTERFACE SCENE
 * Renders a floating 3D smartphone frame with rounded bevels, 
 * metallic body, and an illuminated app UI screen texture.
 */
const Smartphone3DScene: React.FC<{ remotionFrame: number }> = ({ remotionFrame }) => {
  const phoneRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (phoneRef.current) {
      // Dynamic floating rotation & tilt
      phoneRef.current.rotation.y = Math.sin(remotionFrame * 0.025) * 0.35;
      phoneRef.current.rotation.x = Math.cos(remotionFrame * 0.018) * 0.15;
      phoneRef.current.position.y = Math.sin(remotionFrame * 0.03) * 0.25;
    }
  });

  return (
    <group>
      {/* STUDIO LIGHTING SETUP */}
      <ambientLight intensity={0.5} />
      <pointLight position={[8, 10, 8]} intensity={3.5} color="#00E5FF" />
      <pointLight position={[-8, -6, 5]} intensity={2.5} color="#FF9900" />
      <spotLight position={[0, 12, 10]} intensity={2} angle={0.5} color="#FFFFFF" />

      {/* FLOATING 3D SMARTPHONE MODEL */}
      <group ref={phoneRef} position={[0, 0, 0]}>
        
        {/* 1. Phone Body (Dark Metallic Bezel & Chasis) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.4, 8.8, 0.35]} />
          <meshStandardMaterial
            color="#090D16"
            metalness={0.92}
            roughness={0.12}
          />
        </mesh>

        {/* 2. Phone Screen Bezel Trim */}
        <mesh position={[0, 0, 0.18]}>
          <planeGeometry args={[4.1, 8.5]} />
          <meshBasicMaterial color="#020611" />
        </mesh>

        {/* 3. Illuminated Screen Surface (High-Tech App UI Graphics) */}
        <mesh position={[0, 0, 0.19]}>
          <planeGeometry args={[3.8, 8.2]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={0.25}
            roughness={0.2}
          />
        </mesh>

        {/* 4. Phone Camera Notch / Dynamic Island */}
        <mesh position={[0, 3.8, 0.2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* 5. Rear Camera Bump Accent (Visible during rotation) */}
        <mesh position={[-1.3, 3.3, -0.22]}>
          <boxGeometry args={[1.2, 1.4, 0.12]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.1} />
        </mesh>

      </group>
    </group>
  );
};

/**
 * MASTER 3D DEVICE SHOWCASE ENGINE
 */
export const Device3DShowcaseEngine: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#020612', overflow: 'hidden' }}>
      
      {/* BACKGROUND ISOMETRIC GRID MESH */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.1, pointerEvents: 'none' }}>
        <pattern id="deviceGrid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#00E5FF" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#deviceGrid)" />
      </svg>

      {/* 3D WEBGL CANVAS */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
          <Smartphone3DScene remotionFrame={frame} />
        </Canvas>
      </div>

      {/* FOREGROUND FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="device-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#device-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
