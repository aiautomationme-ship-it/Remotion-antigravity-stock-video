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

/**
 * GLOBAL BROADCAST-READY HSL COLOR ENGINE
 * Locked Mathematical Constraints:
 * 1. Base Lightness capped to 8%-14% for deep rich backdrops
 * 2. Accent & Primary highlights locked to 95%-100% saturation for intense glowing laser profiles
 */
export const getVibrantPalette = (seed: number): VibrantPalette => {
  const baseHue = Math.floor(random(seed) * 360);
  
  // Cap base lightness between 8% and 14%
  const innerLightness = 8 + Math.floor(random(`l1-${seed}`) * 6); // 8% to 14%
  const outerLightness = 3 + Math.floor(random(`l2-${seed}`) * 3); // 3% to 6%
  
  return {
    background: `radial-gradient(circle, hsl(${baseHue}, 88%, ${innerLightness}%) 0%, hsl(${(baseHue + 25) % 360}, 95%, ${outerLightness}%) 100%)`,
    primary: `hsl(${baseHue}, 100%, 62%)`,
    secondary: `hsl(${(baseHue + 120) % 360}, 98%, 58%)`,
    accent: `hsl(${(baseHue + 240) % 360}, 100%, 65%)`,
    text: `hsl(${baseHue}, 20%, 98%)`,
    glowPrimary: `hsla(${baseHue}, 100%, 62%, 0.45)`,
    glowAccent: `hsla(${(baseHue + 240) % 360}, 100%, 65%, 0.50)`,
  };
};
