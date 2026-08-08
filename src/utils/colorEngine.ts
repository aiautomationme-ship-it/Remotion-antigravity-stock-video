import { random } from "remotion";

export interface VibrantPalette {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  glowPrimary: string;
  glowAccent: string;
}

export interface StructuralDNA {
  palette: VibrantPalette;
  baseHue: number;
  waveFrequency: number;
  particleDensity: number;
  rotationSpeed: number;
  camScaleMultiplier: number;
  geometrySeed: number;
}

/**
 * GLOBAL BROADCAST-READY HSL COLOR ENGINE & STRUCTURAL DNA GENERATOR
 * 
 * Rules:
 * 1. Base Lightness capped to 8%-14% for deep obsidian/sapphire backdrops
 * 2. Accent & Primary highlights locked to 95%-100% saturation for intense glowing laser profiles
 * 3. Seed-varied Structural DNA: Changing videoSeed alters geometric layout, wave speed, particle density, and motion paths!
 */
export const getVibrantPalette = (seed: number): VibrantPalette => {
  const baseHue = Math.floor(random(seed) * 360);
  
  const innerLightness = 8 + Math.floor(random(`l1-${seed}`) * 6); // 8% to 14%
  const outerLightness = 3 + Math.floor(random(`l2-${seed}`) * 3); // 3% to 6%
  
  return {
    background: `radial-gradient(circle at center, hsl(${baseHue}, 88%, ${innerLightness}%) 0%, hsl(${(baseHue + 35) % 360}, 95%, ${outerLightness}%) 100%)`,
    primary: `hsl(${baseHue}, 100%, 62%)`,
    secondary: `hsl(${(baseHue + 120) % 360}, 98%, 58%)`,
    accent: `hsl(${(baseHue + 240) % 360}, 100%, 65%)`,
    text: `hsl(${baseHue}, 20%, 98%)`,
    glowPrimary: `hsla(${baseHue}, 100%, 62%, 0.45)`,
    glowAccent: `hsla(${(baseHue + 240) % 360}, 100%, 65%, 0.50)`,
  };
};

/**
 * STRUCTURAL DNA RESOLVER
 * Generates unique layout, particle, and motion parameters from videoSeed
 */
export const getStructuralDNA = (seed: number): StructuralDNA => {
  const palette = getVibrantPalette(seed);
  const baseHue = Math.floor(random(seed) * 360);
  
  return {
    palette,
    baseHue,
    waveFrequency: 0.002 + random(`wf-${seed}`) * 0.004,
    particleDensity: 0.8 + random(`pd-${seed}`) * 0.5,
    rotationSpeed: 0.5 + random(`rs-${seed}`) * 1.0,
    camScaleMultiplier: 0.95 + random(`cs-${seed}`) * 0.1,
    geometrySeed: Math.floor(random(`gs-${seed}`) * 100000),
  };
};
