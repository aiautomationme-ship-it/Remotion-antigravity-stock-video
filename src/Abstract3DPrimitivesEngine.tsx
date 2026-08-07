import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

interface PrimitiveObject {
  id: number;
  type: 'sphere' | 'torus' | 'pyramid';
  basePos: [number, number, number];
  rotSpeed: [number, number, number];
  scale: number;
}

/**
 * 3D ABSTRACT GEOMETRIC PRIMITIVES MESH
 * Renders metallic spheres, glass toruses, and chrome pyramids spinning in WebGL 3D space.
 */
const AbstractPrimitivesScene: React.FC<{ remotionFrame: number }> = ({ remotionFrame }) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate 9 distinct 3D primitive objects floating in space
  const primitives: PrimitiveObject[] = useMemo(() => [
    // Metallic Spheres
    { id: 1, type: 'sphere', basePos: [-4.5, 2, -2], rotSpeed: [0.01, 0.02, 0.005], scale: 1.4 },
    { id: 2, type: 'sphere', basePos: [4.5, -2, 1], rotSpeed: [0.015, 0.01, 0.02], scale: 1.1 },
    { id: 3, type: 'sphere', basePos: [0, 3.5, -4], rotSpeed: [0.008, 0.015, 0.01], scale: 1.6 },

    // Glass Toruses
    { id: 4, type: 'torus', basePos: [0, 0, 0], rotSpeed: [0.02, 0.015, 0.01], scale: 1.8 },
    { id: 5, type: 'torus', basePos: [-3, -3, -1], rotSpeed: [0.01, 0.025, 0.015], scale: 1.3 },
    { id: 6, type: 'torus', basePos: [3.5, 3, -3], rotSpeed: [0.018, 0.01, 0.02], scale: 1.4 },

    // Chrome Pyramids
    { id: 7, type: 'pyramid', basePos: [5, 1, -2], rotSpeed: [0.025, 0.02, 0.01], scale: 1.5 },
    { id: 8, type: 'pyramid', basePos: [-5, -1, 2], rotSpeed: [0.015, 0.03, 0.018], scale: 1.2 },
    { id: 9, type: 'pyramid', basePos: [1, -3.5, -3], rotSpeed: [0.02, 0.012, 0.025], scale: 1.4 },
  ], []);

  useFrame(() => {
    if (groupRef.current) {
      // Subtle continuous camera orbit tilt
      groupRef.current.rotation.y = remotionFrame * 0.003;
      groupRef.current.rotation.x = Math.sin(remotionFrame * 0.002) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Lighting setup */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 15, 10]} intensity={3} color="#00E5FF" />
      <pointLight position={[-10, -15, -10]} intensity={2.5} color="#FF9900" />
      <directionalLight position={[0, 10, 5]} intensity={1.5} color="#FFFFFF" />

      {primitives.map((obj) => {
        const floatY = Math.sin(remotionFrame * 0.04 + obj.id) * 0.4;
        const currentRotX = remotionFrame * obj.rotSpeed[0] * 3;
        const currentRotY = remotionFrame * obj.rotSpeed[1] * 3;
        const currentRotZ = remotionFrame * obj.rotSpeed[2] * 3;

        return (
          <mesh
            key={`prim-${obj.id}`}
            position={[obj.basePos[0], obj.basePos[1] + floatY, obj.basePos[2]]}
            rotation={[currentRotX, currentRotY, currentRotZ]}
            scale={obj.scale}
          >
            {/* 1. Metallic Sphere Geometry */}
            {obj.type === 'sphere' && (
              <>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                  color="#E2E8F0"
                  metalness={0.95}
                  roughness={0.08}
                  envMapIntensity={2.5}
                />
              </>
            )}

            {/* 2. Glass Torus Geometry */}
            {obj.type === 'torus' && (
              <>
                <torusGeometry args={[1.4, 0.35, 32, 100]} />
                <meshPhysicalMaterial
                  color="#00E5FF"
                  transmission={0.85}
                  roughness={0.05}
                  ior={1.5}
                  thickness={1.2}
                  transparent
                  opacity={0.9}
                  metalness={0.2}
                />
              </>
            )}

            {/* 3. Chrome Pyramid Geometry */}
            {obj.type === 'pyramid' && (
              <>
                <coneGeometry args={[1.2, 2.2, 4]} />
                <meshStandardMaterial
                  color="#FFB703"
                  metalness={0.92}
                  roughness={0.1}
                  envMapIntensity={2}
                />
              </>
            )}
          </mesh>
        );
      })}
    </group>
  );
};

/**
 * MASTER ABSTRACT 3D PRIMITIVES ENGINE
 */
export const Abstract3DPrimitivesEngine: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#020611', overflow: 'hidden' }}>
      
      {/* 3D WEBGL CANVAS */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
          <AbstractPrimitivesScene remotionFrame={frame} />
        </Canvas>
      </div>

      {/* FOREGROUND FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="prim-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#prim-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
