import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { EditorialText, SPATIAL_TOKENS, validateTypographyComposition } from '../engine/TypographyEngine';

/**
 * Concept 18: Global Renewable Energy Investment Outlook 2030
 * Driven strictly by the Typography Intelligence Engine.
 * Style: World Economic Forum / BlackRock / Bloomberg Originals
 */
export const Concept18_RenewableEnergyOutlook: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Typography & Narrative Validation (Pre-Render Gate)
	const validation = validateTypographyComposition([
		{ level: 'L1_HeroMetric', text: '$2.2T', narrativePurpose: 'Primary annual capital investment benchmark' },
		{ level: 'L2_MainHeading', text: 'Global Capital Realignment & Clean Energy Acceleration', narrativePurpose: 'Primary strategic thesis' },
		{ level: 'L3_SectionHeading', text: 'Institutional capital deployment into solar and wind outpaces legacy energy by 2:1.', narrativePurpose: 'Explains investment acceleration driver' }
	]);

	if (!validation.isValid) {
		console.warn('Typography Validation Warnings:', validation.errors);
	}

	// Palette: IEA / Bloomberg Sustainability
	const bg = '#F6F8F5'; // Warm Sage Ivory
	const ink = '#111827'; // Deep Slate Ink
	const emerald = '#059669'; // Primary Capital Accent
	const gold = '#D97706'; // Secondary Milestone Accent
	const muted = '#6B7280'; // Slate Metadata

	// Timelines
	const envReveal = spring({ frame, fps, config: { damping: 40, mass: 2 } });
	const textSlide = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 30, mass: 1.5 } });
	const textY = interpolate(textSlide, [0, 1], [30, 0]);

	// Capital Allocation Vector Path Draw
	const curveProgress = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 50, mass: 3, stiffness: 18 } });
	const pathLength = 1900;
	const pathDashoffset = interpolate(curveProgress, [0, 1], [pathLength, 0]);

	// Milestone Node Activations
	const node1Pop = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 20 } });
	const node2Pop = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 20 } });

	// Hero Metric Reveal
	const heroPop = spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 22, mass: 1 } });
	const heroScale = interpolate(heroPop, [0, 1], [0.94, 1]);

	// Master Camera Float
	const camScale = interpolate(frame, [0, 600], [1, 1.04]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			color: ink,
			overflow: 'hidden'
		}}>
			{/* Master Camera Grid Wrapper */}
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

				{/* L5 Metadata Header */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					opacity: envReveal,
					borderBottom: '1px solid rgba(17, 24, 39, 0.12)',
					paddingBottom: 24,
					marginBottom: 48
				}}>
					<EditorialText level="L5_Metadata" narrativePurpose="Attributes research report source" color={emerald}>
						WORLD ECONOMIC FORUM // ENERGY TRANSITION OUTLOOK 2030
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Page section indicator" color={muted}>
						EXECUTIVE SUMMARY // CAPITAL DEPLOYMENT
					</EditorialText>
				</div>

				{/* Main Stage: Strict 2-Column Grid Layout */}
				<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

					{/* Column 1: Narrative Story (40% Width) */}
					<div style={{
						width: '40%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: textSlide,
						transform: `translateY(${textY}px)`,
						zIndex: 10
					}}>
						<div>
							{/* L2 Main Headline */}
							<EditorialText 
								level="L2_MainHeading" 
								narrativePurpose="States primary investment acceleration thesis"
								color={ink}
								style={{ marginBottom: `${SPATIAL_TOKENS.headlineToParagraphGap}px`, maxWidth: 480 }}
							>
								Global Capital Realignment & Clean Energy Acceleration
							</EditorialText>

							{/* L3 Supporting Context */}
							<EditorialText 
								level="L3_SectionHeading" 
								narrativePurpose="Explains why investment is accelerating"
								color={muted}
								style={{ maxWidth: 420 }}
							>
								Institutional capital deployment into solar and wind infrastructure outpaces legacy energy by a 2:1 margin.
							</EditorialText>
						</div>

						{/* L4 Milestone Annotations */}
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
							opacity: node1Pop
						}}>
							<div style={{ borderLeft: `2px solid ${emerald}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="States capital ratio milestone" color={ink}>
									2:1 Capital Ratio
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Details capital ratio" color={muted} style={{ marginTop: 2 }}>
									Clean Energy vs Fossil Fuel Allocation
								</EditorialText>
							</div>
							<div style={{ borderLeft: `2px solid ${gold}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="States capacity target milestone" color={ink}>
									1.8 TW Capacity Target
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Details capacity target horizon" color={muted} style={{ marginTop: 2 }}>
									Projected Grid Additions by 2030
								</EditorialText>
							</div>
						</div>
					</div>

					{/* Column 2: Capital Vector Curve & L1 Hero Metric (60% Width) */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* SVG Capital Curve */}
						<svg width="100%" height="100%" viewBox="0 0 900 600" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							<defs>
								<linearGradient id="emeraldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="#111827" />
									<stop offset="60%" stopColor={emerald} />
									<stop offset="100%" stopColor={gold} />
								</linearGradient>
							</defs>

							{/* Baseline Grid Reference */}
							<line x1="50" y1="460" x2="850" y2="460" stroke="rgba(17,24,39,0.08)" strokeWidth="1" strokeDasharray="6 6" />

							{/* Capital Allocation Curve */}
							<path 
								d="M 50,460 C 220,460 300,360 480,240 C 650,120 750,80 850,70" 
								fill="none" 
								stroke="url(#emeraldGrad)" 
								strokeWidth="3.5" 
								strokeLinecap="round"
								strokeDasharray={pathLength}
								strokeDashoffset={pathDashoffset}
							/>

							{/* Milestone Nodes */}
							<g style={{ opacity: node1Pop, transform: `scale(${node1Pop})`, transformOrigin: '480px 240px' }}>
								<circle cx="480" cy="240" r="7" fill={bg} stroke={emerald} strokeWidth="2.5" />
								<text x="480" y="270" fill={muted} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500" textAnchor="middle">2026 INFLECTION POINT</text>
							</g>

							<g style={{ opacity: node2Pop, transform: `scale(${node2Pop})`, transformOrigin: '850px 70px' }}>
								<circle cx="850" cy="70" r="8" fill={emerald} />
							</g>
						</svg>

						{/* L1 Hero Metric Overlay */}
						<div style={{
							position: 'relative',
							zIndex: 20,
							textAlign: 'right',
							opacity: heroPop,
							transform: `scale(${heroScale})`,
							marginRight: `${SPATIAL_TOKENS.heroMetricBreathingRoom}px`
						}}>
							<EditorialText level="L1_HeroMetric" narrativePurpose="Primary focal annual investment metric" color={emerald}>
								$2.2T
							</EditorialText>
							<EditorialText level="L3_SectionHeading" narrativePurpose="Hero metric subtitle" color={ink} style={{ marginTop: 12, fontStyle: 'italic' }}>
								Annual Clean Energy Capital Flow
							</EditorialText>
						</div>

					</div>

				</div>

				{/* L5 Metadata Footer */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '1px solid rgba(17, 24, 39, 0.12)',
					paddingTop: 20,
					marginTop: `${SPATIAL_TOKENS.metadataMarginTop}px`,
					opacity: envReveal
				}}>
					<EditorialText level="L5_Metadata" narrativePurpose="System attribution" color={muted}>
						TYPOGRAPHY INTELLIGENCE ENGINE v3.0
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Document classification" color={muted}>
						INTERNATIONAL ENERGY AGENCY MODEL
					</EditorialText>
				</div>

			</div>
		</AbsoluteFill>
	);
};
