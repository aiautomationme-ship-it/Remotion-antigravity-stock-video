import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { generateBusinessNarrative, BusinessNarrative } from './NarrativeEngine';
import { EditorialText, SPATIAL_TOKENS, validateTypographyComposition } from './TypographyEngine';

export interface CompositionEngineProps {
	topic?: string;
	customNarrative?: BusinessNarrative;
}

/**
 * Module 2: Composition Engine
 * Defers to the Typography Intelligence Engine before layout, visualization, or animation decisions are finalized.
 * Rejects all dashboard layouts, widget grids, and card components.
 */
export const CompositionEngine: React.FC<CompositionEngineProps> = ({
	topic = 'Renewable Energy',
	customNarrative
}) => {
	// Step 1: Run Business Narrative Engine
	const narrative = customNarrative || generateBusinessNarrative(topic);

	// Step 2: Validate Typography & Narrative Structure BEFORE Rendering Layout
	const validation = validateTypographyComposition([
		{ level: 'L1_HeroMetric', text: narrative.heroInsight, narrativePurpose: 'Primary quantitative outcome' },
		{ level: 'L2_MainHeading', text: narrative.narrativeStatement, narrativePurpose: 'Core executive takeaway' },
		{ level: 'L3_SectionHeading', text: narrative.viewerTakeaway, narrativePurpose: 'Supporting strategic context' }
	]);

	if (!validation.isValid) {
		console.warn('Typography Validation Warnings:', validation.errors);
	}

	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Global Editorial Styling Rules
	const bg = '#F9F8F6'; // Warm ivory paper base
	const ink = '#1A1C19'; // Deep charcoal text
	const forestGreen = '#2A5934'; // Primary accent
	const muted = '#737373'; // Secondary metadata

	// Timelines & Motion Easing
	const envReveal = spring({ frame, fps, config: { damping: 40, mass: 2 } });
	const textReveal = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 30, mass: 1.5 } });
	const textY = interpolate(textReveal, [0, 1], [30, 0]);

	const pathProgress = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 50, mass: 3, stiffness: 20 } });
	const pathLength = 1600;
	const pathDashoffset = interpolate(pathProgress, [0, 1], [pathLength, 0]);

	const heroReveal = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 20, mass: 1 } });
	const heroScale = interpolate(heroReveal, [0, 1], [0.9, 1]);

	const footerReveal = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 25 } });

	// Continuous subtle camera movement
	const camScale = interpolate(frame, [0, 600], [1, 1.04]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			color: ink,
			overflow: 'hidden'
		}}>
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, bottom: 0,
				transform: `scale(${camScale})`,
				transformOrigin: 'center center',
				display: 'flex',
				flexDirection: 'column',
				padding: `${SPATIAL_TOKENS.gridOuterPadding}px`,
				boxSizing: 'border-box'
			}}>

				{/* Header Metadata (L5 Level) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					opacity: envReveal,
					borderBottom: `1px solid rgba(26, 28, 25, 0.12)`,
					paddingBottom: 24,
					marginBottom: 48
				}}>
					<EditorialText level="L5_Metadata" narrativePurpose="Attributes source and classification" color={muted}>
						TYPOGRAPHY INTELLIGENCE ENGINE // {narrative.topic.toUpperCase()}
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Page indicator" color={muted}>
						PAGE 01
					</EditorialText>
				</div>

				{/* Editorial Layout: Full-Canvas Single Story Line */}
				<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

					{/* Left Narrative Column */}
					<div style={{
						width: '38%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: textReveal,
						transform: `translateY(${textY}px)`
					}}>
						<div>
							{/* L2 Main Heading */}
							<EditorialText 
								level="L2_MainHeading" 
								narrativePurpose="States primary executive narrative headline"
								color={ink}
								style={{ marginBottom: `${SPATIAL_TOKENS.headlineToParagraphGap}px` }}
							>
								{narrative.narrativeStatement}
							</EditorialText>
							
							{/* L3 Context */}
							<EditorialText 
								level="L3_SectionHeading" 
								narrativePurpose="Provides supporting viewer takeaway context"
								color={muted}
								style={{ maxWidth: 440 }}
							>
								{narrative.viewerTakeaway}
							</EditorialText>
						</div>

						{/* Supporting Data Items (L4 Level) */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
							{narrative.supportingData.map((item, idx) => (
								<div key={idx} style={{
									borderLeft: `2px solid ${idx === 0 ? forestGreen : 'rgba(26,28,25,0.2)'}`,
									paddingLeft: 16
								}}>
									<EditorialText level="L4_KPILabel" narrativePurpose="Quantifies supporting evidence item" color={ink}>
										{item.value}
									</EditorialText>
									<EditorialText level="L5_Metadata" narrativePurpose="Labels supporting evidence item" color={muted} style={{ marginTop: 2 }}>
										{item.label}
									</EditorialText>
								</div>
							))}
						</div>
					</div>

					{/* Right Visualization Area: Full-Canvas Editorial Line */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* Background Full-Canvas Spline */}
						<svg width="100%" height="100%" viewBox="0 0 900 600" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							{/* Grid Guide Line */}
							<line x1="100" y1="480" x2="850" y2="480" stroke="rgba(26,28,25,0.08)" strokeWidth="1" />
							
							{/* Continuous Editorial Curve */}
							<path
								d="M 50,180 C 250,180 400,220 520,360 C 620,480 720,480 850,480"
								fill="none"
								stroke={forestGreen}
								strokeWidth="4"
								strokeLinecap="round"
								strokeDasharray={pathLength}
								strokeDashoffset={pathDashoffset}
							/>
						</svg>

						{/* L1 Hero Metric Overlay */}
						<div style={{
							position: 'relative',
							zIndex: 10,
							textAlign: 'right',
							opacity: heroReveal,
							transform: `scale(${heroScale})`,
							marginRight: `${SPATIAL_TOKENS.heroMetricBreathingRoom}px`
						}}>
							<EditorialText level="L1_HeroMetric" narrativePurpose="Primary focal hero metric" color={forestGreen}>
								{narrative.heroInsight}
							</EditorialText>
							<EditorialText level="L3_SectionHeading" narrativePurpose="Hero metric subtitle" color={ink} style={{ marginTop: 12, fontStyle: 'italic' }}>
								Emissions Reduction Impact
							</EditorialText>
						</div>
					</div>

				</div>

				{/* Footer Metadata (L5 Level) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '1px solid rgba(26,28,25,0.1)',
					paddingTop: 20,
					marginTop: `${SPATIAL_TOKENS.metadataMarginTop}px`,
					opacity: footerReveal
				}}>
					<EditorialText level="L5_Metadata" narrativePurpose="Engine version" color={muted}>
						TYPOGRAPHY INTELLIGENCE ENGINE v3.0
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Document classification" color={muted}>
						EXECUTIVE BOARD PRESENTATION
					</EditorialText>
				</div>

			</div>
		</AbsoluteFill>
	);
};
