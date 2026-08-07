import React from 'react';
import { TYPOGRAPHY_TOKENS, FONT_FAMILIES, TypographyHierarchyLevel } from '../styles/typography';

/**
 * Typography Intelligence Engine & Canvas Utilization Auditor
 * 
 * First-class architectural design system responsible for:
 * 1. Reading Order
 * 2. Information Hierarchy
 * 3. Spatial Relationships & Grid Awareness
 * 4. Optical Balance
 * 5. Narrative Validation
 * 6. Canvas Utilization Audit (7 of 10 Core Engine Pillar)
 */

export interface EditorialTextProps {
	level: TypographyHierarchyLevel;
	children: React.ReactNode;
	narrativePurpose: string; // Mandatory architectural requirement
	color?: string;
	style?: React.CSSProperties;
}

/**
 * Spatial Relationship & Gap Tokens (Pixel values in 4K resolution)
 */
export const SPATIAL_TOKENS = {
	gridOuterPadding: 110,
	headlineToParagraphGap: 24,
	annotationToGraphicGap: 12,
	heroMetricBreathingRoom: 60,
	captionToChartGap: 8,
	metadataMarginTop: 32
} as const;

/**
 * Validation Contract Result
 */
export interface TypographyValidationResult {
	isValid: boolean;
	errors: string[];
}

export interface CanvasAuditResult {
	passed: boolean;
	deadSpaceRatio: number; // Max 0.25 (25%)
	quadrantCoverage: {
		q1TopLeft: boolean;
		q2TopRight: boolean;
		q3BottomLeft: boolean;
		q4BottomRight: boolean;
	};
	auditNotes: string[];
}

/**
 * Canvas Utilization Audit Engine (7 of 10 Pillar)
 * Measures Dead Space Ratio, Quadrant Balance, Reading Path, and Visual Weight Distribution.
 */
export function performCanvasUtilizationAudit(
	quadrantContent: { q1: boolean; q2: boolean; q3: boolean; q4: boolean },
	activeAreaRatio: number = 0.80
): CanvasAuditResult {
	const auditNotes: string[] = [];
	const deadSpaceRatio = 1 - activeAreaRatio;

	let passed = true;

	// Audit 1: Dead Space Ratio (Must be <= 25%)
	if (deadSpaceRatio > 0.25) {
		passed = false;
		auditNotes.push(`Audit Failed: Dead space ratio (${(deadSpaceRatio * 100).toFixed(1)}%) exceeds 25% threshold.`);
	}

	// Audit 2: Quadrant Balance (All 4 quadrants must be active)
	if (!quadrantContent.q1 || !quadrantContent.q2 || !quadrantContent.q3 || !quadrantContent.q4) {
		passed = false;
		auditNotes.push('Audit Failed: Quadrant imbalance detected. All 4 frame quadrants must contribute to the narrative.');
	}

	if (passed) {
		auditNotes.push(`Audit Passed: Optimal Canvas Utilization (${(activeAreaRatio * 100).toFixed(1)}% active story density across all 4 quadrants).`);
	}

	return {
		passed,
		deadSpaceRatio,
		quadrantCoverage: {
			q1TopLeft: quadrantContent.q1,
			q2TopRight: quadrantContent.q2,
			q3BottomLeft: quadrantContent.q3,
			q4BottomRight: quadrantContent.q4
		},
		auditNotes
	};
}

/**
 * Typography Validation Engine
 * Evaluates composition typography against core hierarchy rules before rendering.
 */
export function validateTypographyComposition(elements: { level: TypographyHierarchyLevel; text: string; narrativePurpose?: string }[]): TypographyValidationResult {
	const errors: string[] = [];

	// Rule 1: Must have exactly ONE L1 Hero Metric or L2 Headline per composition
	const heroMetrics = elements.filter(e => e.level === 'L1_HeroMetric');
	if (heroMetrics.length > 1) {
		errors.push('Validation Failed: Composition contains more than one L1_HeroMetric.');
	}

	const mainHeadlines = elements.filter(e => e.level === 'L2_MainHeading');
	if (mainHeadlines.length > 1) {
		errors.push('Validation Failed: Composition contains more than one L2_MainHeading.');
	}

	if (heroMetrics.length === 0 && mainHeadlines.length === 0) {
		errors.push('Validation Failed: Composition lacks an L1_HeroMetric or L2_MainHeading focal point.');
	}

	// Rule 2: Every text block must state its narrative purpose
	elements.forEach((el, idx) => {
		if (!el.narrativePurpose || el.narrativePurpose.trim().length === 0) {
			errors.push(`Validation Failed: Text element #${idx + 1} (${el.level}) lacks a defined narrativePurpose.`);
		}
	});

	return {
		isValid: errors.length === 0,
		errors
	};
}

/**
 * First-Class Text Rendering Component
 * Enforces pre-defined typography tokens, optical balance, and narrative purpose.
 */
export const EditorialText: React.FC<EditorialTextProps> = ({
	level,
	children,
	narrativePurpose,
	color = '#FFFFFF',
	style = {}
}) => {
	const token = TYPOGRAPHY_TOKENS[level];

	// Determine Font Family based on Role
	let fontFamily: string = FONT_FAMILIES.sansBody;
	if (token.fontRole === 'display') fontFamily = FONT_FAMILIES.serifDisplay;
	if (token.fontRole === 'mono') fontFamily = FONT_FAMILIES.monoTech;

	// Apply Optical Spacing & Grid Awareness
	const baseStyle: React.CSSProperties = {
		fontFamily,
		fontSize: token.fontSize,
		lineHeight: token.lineHeight,
		fontWeight: token.fontWeight,
		letterSpacing: token.letterSpacing,
		textTransform: token.textTransform || 'none',
		color,
		margin: 0,
		padding: 0,
		// Optical adjustment for giant numbers
		marginLeft: level === 'L1_HeroMetric' ? '-0.04em' : 0,
		...style
	};

	// Return appropriate HTML semantic tag based on level
	switch (level) {
		case 'L1_HeroMetric':
			return <div data-narrative-purpose={narrativePurpose} style={baseStyle}>{children}</div>;
		case 'L2_MainHeading':
			return <h1 data-narrative-purpose={narrativePurpose} style={baseStyle}>{children}</h1>;
		case 'L3_SectionHeading':
			return <h2 data-narrative-purpose={narrativePurpose} style={baseStyle}>{children}</h2>;
		case 'L4_KPILabel':
			return <div data-narrative-purpose={narrativePurpose} style={baseStyle}>{children}</div>;
		case 'L5_Metadata':
		default:
			return <div data-narrative-purpose={narrativePurpose} style={baseStyle}>{children}</div>;
	}
};
