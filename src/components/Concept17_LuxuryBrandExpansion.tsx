import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 17: Luxury Brand Global Expansion
 * Inspired by LVMH, Hermès, Kering Annual Reports & Financial Times
 * 
 * Typography & Layout Engineering:
 * - Font A: 'Playfair Display' (Major Headlines)
 * - Font B: 'Inter' (Metrics, Body, Annotations, Metadata)
 * - L1 Hero Metric: €4.8B (110px, Champagne Gold)
 * - L2 Headline: 48px Playfair Display
 * - L3 Context: 18px Inter (440px max-width)
 * - L5 Metadata: 11px Inter (Upper case, tracking 0.18em)
 * - Grid: Strict 110px Margin Alignment
 */
export const Concept17_LuxuryBrandExpansion: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Palette: Luxury Editorial
	const bg = '#FAF7F2'; // Champagne Ivory paper
	const ink = '#141414'; // Charcoal Ink
	const gold = '#C5A059'; // Champagne Gold
	const forest = '#1B3B2B'; // Deep Forest Green accent
	const muted = '#7A7670'; // Soft Bronze / Slate metadata

	// Fonts
	const serifDisplay = "'Playfair Display', Georgia, serif";
	const sansBody = "'Inter', -apple-system, sans-serif";

	// Timelines
	// 0-2s: Environment & Editorial Headline Reveal
	const envReveal = spring({ frame, fps, config: { damping: 40, mass: 2 } });
	const textSlide = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 30, mass: 1.5 } });
	const textY = interpolate(textSlide, [0, 1], [30, 0]);

	// 2-6s: The Flagship Expansion Vector Curve (Path Draw)
	const curveProgress = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 50, mass: 3, stiffness: 18 } });
	const pathLength = 1900;
	const pathDashoffset = interpolate(curveProgress, [0, 1], [pathLength, 0]);

	// Boutique City Activations (Staggered)
	const boutique1Pop = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 20 } });
	const boutique2Pop = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 20 } });
	const boutique3Pop = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 20 } });

	// 5-8s: Hero Metric Reveal
	const heroPop = spring({ frame: Math.max(0, frame - 240), fps, config: { damping: 22, mass: 1 } });
	const heroScale = interpolate(heroPop, [0, 1], [0.94, 1]);

	// Master Slow Camera Movement
	const camScale = interpolate(frame, [0, 600], [1, 1.04]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			fontFamily: sansBody,
			color: ink,
			overflow: 'hidden'
		}}>
			{/* Master Camera Wrapper */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, bottom: 0,
				transform: `scale(${camScale})`,
				transformOrigin: 'center center',
				display: 'flex',
				flexDirection: 'column',
				padding: '90px 110px',
				boxSizing: 'border-box'
			}}>

				{/* L5 Metadata Header */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					opacity: envReveal,
					borderBottom: '1px solid rgba(20, 20, 20, 0.12)',
					paddingBottom: 24,
					marginBottom: 48
				}}>
					<div style={{
						fontFamily: sansBody,
						fontSize: 11, // L5 Metadata
						fontWeight: 600,
						letterSpacing: '0.18em',
						color: gold,
						textTransform: 'uppercase'
					}}>
						LVMH STRATEGIC BRIEFING // ANNUAL REPORT 2027
					</div>
					<div style={{
						fontFamily: sansBody,
						fontSize: 11,
						color: muted,
						letterSpacing: '0.1em'
					}}>
						CHAPTER III — GLOBAL FLAGSHIP REALIGNMENT
					</div>
				</div>

				{/* Main Stage: Asymmetrical Editorial Layout */}
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
							{/* L2 Headline (Playfair Display) */}
							<h1 style={{
								fontFamily: serifDisplay,
								fontSize: 48, // L2 Headline
								fontWeight: 400,
								lineHeight: 1.25,
								letterSpacing: '-0.02em',
								color: ink,
								margin: '0 0 24px 0',
								maxWidth: 500
							}}>
								Selective Flagship Expansion & Brand Elevation
							</h1>

							{/* L3 Supporting Narrative (Inter) */}
							<div style={{
								fontFamily: sansBody,
								fontSize: 18, // L3 Context
								lineHeight: 1.6,
								color: muted,
								fontWeight: 300,
								maxWidth: 440
							}}>
								Strategic placement across 7 global fashion capitals increased direct-to-consumer revenue by 142% while preserving brand exclusivity.
							</div>
						</div>

						{/* L4 Annotations: Boutique Capitals */}
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
							opacity: boutique2Pop
						}}>
							<div style={{ borderLeft: `2px solid ${forest}`, paddingLeft: 16 }}>
								<div style={{ fontFamily: sansBody, fontSize: 16, fontWeight: 600, color: ink }}>7 Primary Flagships</div>
								<div style={{ fontFamily: sansBody, fontSize: 12, color: muted, marginTop: 2 }}>Paris • Milan • New York • Dubai • Tokyo • Seoul • Singapore</div>
							</div>
							<div style={{ borderLeft: `2px solid ${gold}`, paddingLeft: 16 }}>
								<div style={{ fontFamily: sansBody, fontSize: 16, fontWeight: 600, color: ink }}>94.2% Direct Retailing</div>
								<div style={{ fontFamily: sansBody, fontSize: 12, color: muted, marginTop: 2 }}>Full Channel Ownership Realized</div>
							</div>
						</div>
					</div>

					{/* Column 2: Vector Expansion Curve & L1 Hero Metric (60% Width) */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* SVG Expansion Vector */}
						<svg width="100%" height="100%" viewBox="0 0 900 600" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							<defs>
								<linearGradient id="goldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="#141414" />
									<stop offset="50%" stopColor={gold} />
									<stop offset="100%" stopColor={forest} />
								</linearGradient>
							</defs>

							{/* Baseline Grid Reference */}
							<line x1="50" y1="460" x2="850" y2="460" stroke="rgba(20,20,20,0.08)" strokeWidth="1" strokeDasharray="6 6" />

							{/* Flagship Expansion Curve */}
							<path 
								d="M 50,460 C 220,460 300,320 480,240 C 650,160 720,100 850,90" 
								fill="none" 
								stroke="url(#goldGrad)" 
								strokeWidth="3.5" 
								strokeLinecap="round"
								strokeDasharray={pathLength}
								strokeDashoffset={pathDashoffset}
							/>

							{/* Boutique Milestone Nodes */}
							{/* Node 1: Paris Flagships */}
							<g style={{ opacity: boutique1Pop, transform: `scale(${boutique1Pop})`, transformOrigin: '220px 460px' }}>
								<circle cx="220" cy="460" r="6" fill={bg} stroke={gold} strokeWidth="2.5" />
								<text x="220" y="490" fill={muted} fontSize="11" fontFamily={sansBody} fontWeight="500" textAnchor="middle">PARIS FLAGSHIP</text>
							</g>

							{/* Node 2: Dubai & Tokyo Expansion */}
							<g style={{ opacity: boutique2Pop, transform: `scale(${boutique2Pop})`, transformOrigin: '480px 240px' }}>
								<circle cx="480" cy="240" r="8" fill={forest} />
								<text x="480" y="215" fill={ink} fontSize="12" fontFamily={sansBody} fontWeight="600" textAnchor="middle">TOKYO & DUBAI</text>
							</g>

							{/* Node 3: New York Apex */}
							<g style={{ opacity: boutique3Pop, transform: `scale(${boutique3Pop})`, transformOrigin: '850px 90px' }}>
								<circle cx="850" cy="90" r="6" fill={bg} stroke={gold} strokeWidth="2.5" />
							</g>
						</svg>

						{/* L1 Hero Metric Overlay */}
						<div style={{
							position: 'relative',
							zIndex: 20,
							textAlign: 'right',
							opacity: heroPop,
							transform: `scale(${heroScale})`,
							marginRight: 40
						}}>
							{/* L1 Metric */}
							<div style={{
								fontFamily: sansBody,
								fontSize: 110, // L1 Hero Metric
								fontWeight: 300,
								letterSpacing: '-0.04em',
								lineHeight: 0.95,
								color: gold
							}}>
								€4.8B
							</div>

							{/* Supporting Metric Subtitle */}
							<div style={{
								fontFamily: serifDisplay,
								fontSize: 26,
								fontWeight: 400,
								color: ink,
								marginTop: 12,
								fontStyle: 'italic'
							}}>
								Recurring Operating Revenue
							</div>
						</div>

					</div>

				</div>

				{/* L5 Metadata Footer */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontFamily: sansBody,
					fontSize: 11, // L5 Metadata
					color: muted,
					letterSpacing: '0.12em',
					borderTop: '1px solid rgba(20, 20, 20, 0.12)',
					paddingTop: 20,
					marginTop: 32,
					opacity: envReveal
				}}>
					<div>GLOBAL RETAIL ARCHITECTURE STUDY</div>
					<div>FRAME 01 // OVERVIEW</div>
				</div>

			</div>
		</AbsoluteFill>
	);
};
