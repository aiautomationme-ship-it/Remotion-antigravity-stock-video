import { random } from "remotion";

export interface VibrantPalette {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}

/**
 * GLOBAL COLOR ENGINE HELPER UTILITY
 * Encapsulates all heavy HSL mathematical color calculations from seed values
 * so main video components stay clean and focused purely on design visuals.
 */
export const getVibrantPalette = (seed: number): VibrantPalette => {
  const baseHue = Math.floor(random(seed) * 360);
  return {
    background: `radial-gradient(circle, hsl(${baseHue}, 90%, 15%) 0%, hsl(${(baseHue + 30) % 360}, 95%, 6%) 100%)`,
    primary: `hsl(${baseHue}, 100%, 65%)`,
    secondary: `hsl(${(baseHue + 120) % 360}, 100%, 60%)`,
    accent: `hsl(${(baseHue + 240) % 360}, 100%, 65%)`,
    text: `hsl(${baseHue}, 20%, 98%)`,
  };
};
