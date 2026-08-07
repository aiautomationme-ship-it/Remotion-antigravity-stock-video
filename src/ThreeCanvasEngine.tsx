import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCurrentFrame } from 'remotion';

export type ThreeMeshType = 'particle_swarm' | 'silicon_die' | 'orbital_rings';

interface Props {
  meshType?: ThreeMeshType;
  color: string;
}

/**
 * 1. 3D POINT-CLOUD NEURAL SWARM (1,500 3D Particles with dynamic rotation & point lights)
 */
const ParticleSwarmMesh: React.FC<{ color: string; remotionFrame: number }> = ({ color, remotionFrame }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }

    return { positions: pos, colors: col };
  }, [color]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = remotionFrame * 0.005;
      pointsRef.current.rotation.x = Math.sin(remotionFrame * 0.003) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

/**
 * 2. 3D SILICON DIE SURFACE (64 3D Chip Tiles with Specular Lighting)
 */
const SiliconDieMesh: React.FC<{ color: string; remotionFrame: number }> = ({ color, remotionFrame }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const gridCount = 8;
  const spacing = 1.2;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.6 + Math.sin(remotionFrame * 0.005) * 0.1;
      groupRef.current.rotation.y = remotionFrame * 0.004;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 10, 5]} intensity={2.5} color={color} />
      <directionalLight position={[-5, 5, 2]} intensity={1.2} />

      {Array.from({ length: gridCount }).map((_, row) =>
        Array.from({ length: gridCount }).map((_, col) => {
          const x = (col - gridCount / 2 + 0.5) * spacing;
          const z = (row - gridCount / 2 + 0.5) * spacing;
          const heightOffset = Math.sin(remotionFrame * 0.05 + row + col) * 0.15;

          return (
            <mesh key={`tile-${row}-${col}`} position={[x, heightOffset, z]}>
              <boxGeometry args={[1, 0.4, 1]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
            </mesh>
          );
        })
      )}
    </group>
  );
};

/**
 * 3. 3D CONCENTRIC ORBITAL RINGS
 */
const OrbitalRingsMesh: React.FC<{ color: string; remotionFrame: number }> = ({ color, remotionFrame }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = remotionFrame * 0.008;
      groupRef.current.rotation.z = Math.sin(remotionFrame * 0.004) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={3} color={color} />

      {[3, 5, 7].map((radius, i) => (
        <mesh key={`ring-${i}`} rotation={[Math.PI / 4 * (i + 1), 0, 0]}>
          <torusGeometry args={[radius, 0.08, 16, 100]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * MASTER THREE.JS CANVAS ENGINE INTEGRATION
 */
export const ThreeCanvasEngine: React.FC<Props> = ({ meshType = 'particle_swarm', color }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        {meshType === 'particle_swarm' && <ParticleSwarmMesh color={color} remotionFrame={frame} />}
        {meshType === 'silicon_die' && <SiliconDieMesh color={color} remotionFrame={frame} />}
        {meshType === 'orbital_rings' && <OrbitalRingsMesh color={color} remotionFrame={frame} />}
      </Canvas>
    </div>
  );
};
