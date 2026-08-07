import { random } from 'remotion';
import { NICHE_THEMES, NicheThemeStyle } from './Theme';

/**
 * AUTOMATIC GENERATIVE COLOR ENGINE
 * Automatically calculates dynamic, harmonized HSL color palettes from a video seed:
 * - Background: Dark HSL tone (Hue, Saturation: ~40%, Lightness: ~8%)
 * - Main Glow: Vibrant matching HSL tone (Hue, Saturation: ~95%, Lightness: ~55%)
 * - Accent/Core: Complementary HSL offset (Hue + 180°, Saturation: ~90%, Lightness: ~60%)
 */
export const generateAutomaticColors = (videoSeed: number): NicheThemeStyle => {
  // 1. Pick base hue (0° - 360°) pseudo-randomly from videoSeed
  const baseHue = Math.floor(random(videoSeed) * 360);

  // 2. Generate harmonized HSL color palette
  const background = `hsl(${baseHue}, 35%, 7%)`;
  const glow = `hsl(${baseHue}, 95%, 55%)`;
  const coreLight = `hsl(${baseHue}, 15%, 96%)`;
  const textMuted = `hsl(${baseHue}, 25%, 55%)`;

  return {
    background,
    glow,
    coreLight,
    textMuted,
    bgWatermarkText: `GEN_SEED_${videoSeed.toString().padStart(3, '0')}`,
  };
};

/**
 * MASTER COLOR RESOLVER (Supports Seed-based Automatic HSL + Direct Prompt Overrides + Niche Lookups)
 */
export const resolveAutomaticTheme = (
  niche: string = 'artificial_intelligence',
  videoSeed?: number,
  customGlow?: string,
  customBg?: string,
  customCoreLight?: string
): NicheThemeStyle => {
  if (videoSeed !== undefined) {
    const seedColors = generateAutomaticColors(videoSeed);
    return {
      background: customBg || seedColors.background,
      glow: customGlow || seedColors.glow,
      coreLight: customCoreLight || seedColors.coreLight,
      textMuted: seedColors.textMuted,
      bgWatermarkText: seedColors.bgWatermarkText,
    };
  }

  const baseTheme = NICHE_THEMES[niche] || NICHE_THEMES.artificial_intelligence;
  return {
    background: customBg || baseTheme.background,
    glow: customGlow || baseTheme.glow,
    coreLight: customCoreLight || baseTheme.coreLight,
    textMuted: baseTheme.textMuted,
    bgWatermarkText: baseTheme.bgWatermarkText,
  };
};
