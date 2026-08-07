export interface NicheThemeStyle {
  background: string;
  glow: string;
  coreLight: string;
  textMuted: string;
  bgWatermarkText: string;
}

export const NICHE_THEMES: Record<string, NicheThemeStyle> = {
  artificial_intelligence: {
    background: '#040408',      // Deep Obsidian
    glow: '#00ffff',            // Neon Cyan
    coreLight: '#ffffff',       // Optical Interconnect White
    textMuted: '#64748b',       // Slate Gray
    bgWatermarkText: 'NEURAL_NET'
  },
  cybersecurity: {
    background: '#020617',      // Dark Slate
    glow: '#00ff66',            // Matrix Green
    coreLight: '#e2e8f0',       // Crisp Silicon White
    textMuted: '#475569',       // Deep Gray
    bgWatermarkText: 'ZERO_TRUST'
  },
  semiconductor: {
    background: '#0b090a',      // Ultra Black
    glow: '#ffd700',            // Fab Gold
    coreLight: '#f5f5f7',       // Cleanroom Silver
    textMuted: '#a3a3a3',       // Muted Platinum
    bgWatermarkText: 'TENSOR_CORE'
  },
  cloud_computing: {
    background: '#050b14',      // Deep Sky Black
    glow: '#38bdf8',            // Cloud Sky Blue
    coreLight: '#ffffff',       // Pure Vapor White
    textMuted: '#475569',       // Storm Gray
    bgWatermarkText: 'HYPER_SCALE'
  },
  renewable_energy: {
    background: '#030f0a',      // Forest Black
    glow: '#f59e0b',            // Solar Gold
    coreLight: '#ffffff',       // Pure Clean White
    textMuted: '#64748b',       // Sage Slate
    bgWatermarkText: 'GREEN_GRID'
  },
  financial_markets: {
    background: '#0a0e17',      // Executive Obsidian
    glow: '#d4af37',            // FT Copper Gold
    coreLight: '#f8fafc',       // Cream Linen White
    textMuted: '#64748b',       // Muted Steel
    bgWatermarkText: 'CAPITAL_FLOW'
  },
  business_strategy: {
    background: '#070a14',      // Navy Obsidian
    glow: '#3b82f6',            // McKinsey Sapphire
    coreLight: '#ffffff',       // Executive White
    textMuted: '#64748b',       // Slate Gray
    bgWatermarkText: 'EXECUTIVE_AI'
  },
  supply_chain: {
    background: '#090a0f',      // Industrial Charcoal
    glow: '#f97316',            // Freight Amber
    coreLight: '#ffffff',       // Pure White
    textMuted: '#71717a',       // Muted Zinc
    bgWatermarkText: 'LOGISTICS_GRID'
  },
  healthcare_innovation: {
    background: '#030c14',      // Clinical Obsidian
    glow: '#06b6d4',            // Biotech Cyan
    coreLight: '#ffffff',       // Cleanroom White
    textMuted: '#64748b',       // Slate Gray
    bgWatermarkText: 'GENOMIC_LATTICE'
  },
  future_technology: {
    background: '#090514',      // Quantum Deep
    glow: '#a855f7',            // Quantum Violet
    coreLight: '#ffffff',       // Pure White
    textMuted: '#7e22ce',       // Muted Lavender
    bgWatermarkText: 'QUANTUM_MESH'
  }
};

/**
 * PROMPT-LEVEL DYNAMIC COLOR RESOLVER
 * Solves Problem 1: Allows every JSON asset prompt to define custom glow, background, and text colors!
 */
export const resolveTheme = (
  niche: string = 'artificial_intelligence',
  customGlow?: string,
  customBg?: string,
  customCoreLight?: string
): NicheThemeStyle => {
  const baseTheme = NICHE_THEMES[niche] || NICHE_THEMES.artificial_intelligence;

  return {
    background: customBg || baseTheme.background,
    glow: customGlow || baseTheme.glow,
    coreLight: customCoreLight || baseTheme.coreLight,
    textMuted: baseTheme.textMuted,
    bgWatermarkText: baseTheme.bgWatermarkText
  };
};

export const AI_NICHE_THEME = {
  colors: {
    background: NICHE_THEMES.artificial_intelligence.background,
    glow: NICHE_THEMES.artificial_intelligence.glow,
    coreLight: NICHE_THEMES.artificial_intelligence.coreLight,
    textMuted: NICHE_THEMES.artificial_intelligence.textMuted
  },
  dimensions: {
    width: 3840,
    height: 2160
  }
};
