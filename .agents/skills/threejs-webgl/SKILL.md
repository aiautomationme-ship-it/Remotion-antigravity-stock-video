---
name: threejs-webgl
description: Advanced 3D WebGL guidelines, shaders, materials, and particle engines for Remotion.
---

# THREE.JS WEBGL 3D MOTION GRAPHICS SKILL

This skill provides technical guidelines for building high-end 3D WebGL scenes, custom GLSL shaders, PBR metallic materials, and particle systems inside Remotion using `@react-three/fiber` and `three`.

---

## 1. Core Rule: Remotion Frame Synchronization
Always read `useCurrentFrame()` from Remotion inside the parent component and pass `remotionFrame` into Three.js `<Canvas>` scenes. Use `useFrame()` to rotate and move 3D meshes deterministically based on frame numbers.

```tsx
const frame = useCurrentFrame();

<Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
  <My3DScene remotionFrame={frame} />
</Canvas>
```

---

## 2. PBR Metallic & Glass Material Recipes

### High-Gloss Metallic Chrome:
```tsx
<meshStandardMaterial
  color="#E2E8F0"
  metalness={0.95}
  roughness={0.08}
  envMapIntensity={2.5}
/>
```

### Refractive Cyan Glass (Glassmorphism 3D):
```tsx
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
```

### Fab Gold / Copper Circuit Metal:
```tsx
<meshStandardMaterial
  color="#FFB703"
  metalness={0.92}
  roughness={0.10}
  envMapIntensity={2.0}
/>
```

---

## 3. Dynamic Studio Lighting Setup
Combine ambient lighting with dual multi-colored point lights and an overhead spotlight:
```tsx
<ambientLight intensity={0.5} />
<pointLight position={[10, 15, 10]} intensity={3.5} color="#00E5FF" />
<pointLight position={[-10, -15, -10]} intensity={2.5} color="#FF9900" />
<spotLight position={[0, 12, 10]} intensity={2.0} angle={0.45} color="#FFFFFF" />
```

---

## 4. 1,000+ Floating 3D Neural Particle Swarms
Use `bufferGeometry` with `pointsMaterial` for ultra-performant 3D particle fields:
```tsx
<points ref={pointsRef}>
  <bufferGeometry>
    <bufferAttribute
      attach="attributes-position"
      count={positions.length / 3}
      array={positions}
      itemSize={3}
    />
  </bufferGeometry>
  <pointsMaterial
    size={0.12}
    color="#00E5FF"
    transparent
    opacity={0.8}
    blending={THREE.AdditiveBlending}
  />
</points>
```
