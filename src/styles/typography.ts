/**
 * Typography System - Single Source of Truth
 * Strictly enforces the 5-tier typography doctrine across the entire application.
 */

export interface TypographyToken {
	fontSize: number;
	lineHeight: number;
	fontWeight: number | string;
	letterSpacing: string;
	textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
	fontRole: 'display' | 'body' | 'mono';
}

export type TypographyHierarchyLevel = 'L1_HeroMetric' | 'L2_MainHeading' | 'L3_SectionHeading' | 'L4_KPILabel' | 'L5_Metadata';

export const TYPOGRAPHY_TOKENS: Record<TypographyHierarchyLevel, TypographyToken> = {
	// LEVEL 1 — Hero Metric (56–96+ px). Maximum visual weight. Only one per scene.
	L1_HeroMetric: {
		fontSize: 110,
		lineHeight: 0.95,
		fontWeight: 300,
		letterSpacing: '-0.04em',
		fontRole: 'body'
	},

	// LEVEL 2 — Main Heading (36–48 px). Only one main heading per scene.
	L2_MainHeading: {
		fontSize: 48,
		lineHeight: 1.2,
		fontWeight: 400,
		letterSpacing: '-0.02em',
		fontRole: 'display'
	},

	// LEVEL 3 — Section Heading / Supporting Statement (20–28 px).
	L3_SectionHeading: {
		fontSize: 22,
		lineHeight: 1.5,
		fontWeight: 400,
		letterSpacing: '-0.01em',
		fontRole: 'body'
	},

	// LEVEL 4 — KPI Labels / Annotations (14–18 px).
	L4_KPILabel: {
		fontSize: 16,
		lineHeight: 1.4,
		fontWeight: 600,
		letterSpacing: '0.04em',
		fontRole: 'body'
	},

	// LEVEL 5 — Metadata / Footer (10–12 px).
	L5_Metadata: {
		fontSize: 11,
		lineHeight: 1.2,
		fontWeight: 600,
		letterSpacing: '0.18em',
		textTransform: 'uppercase',
		fontRole: 'mono'
	}
};

export const FONT_FAMILIES = {
	serifDisplay: "'Playfair Display', Georgia, serif",
	sansBody: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
	monoTech: "'Roboto Mono', 'IBM Plex Mono', monospace"
} as const;
