import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 16: Typography as the Voice of Design
 * Topic: Autonomous Robotics Supply Chain Velocity
 * 
 * Rules Applied:
 * - 2-Typeface Limit: Georgia (Display Serif) + Inter (Precision Sans)
 * - Obvious Reading Path: Hero Metric ($2.8B) -> L2 Headline -> L3 Context -> L4 Annotations -> L5 Metadata
 * - Strict Grid Alignment: Invisible 120px margin grid
 * - Zero Filler Text
 */
export const Concept16_TypographyVoice: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Palette: Bloomberg / McKinsey Deep Editorial
	const bg = '#0B0D10'; // Deep Slate Black
	const textWhite = '#FFFFFF';
	const goldAccent = '#D4AF37'; // High-contrast hero metric color
	const muted = '#64748B'; // Grid & metadata Slate

	// Font Definitions (2-Typeface System)
	const serifHeadline = 'Georgia, serif';
	const sansBody = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

	// Animation Timelines
	const envReveal = spring({ frame, fps, config: { damping: 40, mass: 2 } });
	
	// Reading Path Step 1 & 2: Headline & Narrative (0.5 - 2s)
	const headlineSlide = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 30, mass: 1.5 } });
	const headlineY = interpolate(headlineSlide, [0, 1], [30, 0]);

	// Reading Path Step 3: Visualization Draw (2 - 5s)
	const splineProgress = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 50, mass: 3, stiffness: 18 } });
	const pathLength = 1800;
	const pathDashoffset = interpolate(splineProgress, [0, 1], [pathLength, 0]);

	// Reading Path Step 4: Hero Metric Emotional Peak (4 - 7s)
	const heroPop = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 20, mass: 1 } });
	const heroScale = interpolate(heroPop, [0, 1], [0.92, 1]);

	// Continuous Master Camera Motion
	const camScale = interpolate(frame, [0, 600], [1, 1.04]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			fontFamily: sansBody,
			color: textWhite,
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
				padding: '100px 120px', // Strict Grid Boundary
				boxSizing: 'border-box'
			}}>

				{/* L5 Metadata Header: Grid Anchor Top */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					opacity: envReveal,
					borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
					paddingBottom: 24,
					marginBottom: 48
				}}>
					<div style={{
						fontFamily: sansBody,
						fontSize: 11, // L5 Metadata
						fontWeight: 600,
						letterSpacing: '0.2em',
						color: goldAccent,
						textTransform: 'uppercase'
					}}>
						BLOOMBERG SPECIAL REPORT // AUTONOMOUS LOGISTICS 2027
					</div>
					<div style={{
						fontFamily: sansBody,
						fontSize: 11,
						color: muted,
						letterSpacing: '0.1em'
					}}>
						SECTION 04 — ROBOTIC SUPPLY VELOCITY
					</div>
				</div>

				{/* Main Stage: Strict 2-Column Grid Layout */}
				<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

					{/* Column 1: Editorial Headline & Narrative Context (40% Width) */}
					<div style={{
						width: '40%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: headlineSlide,
						transform: `translateY(${headlineY}px)`,
						zIndex: 10
					}}>
						<div>
							{/* L2 Headline (Font A: Display Serif) */}
							<h1 style={{
								fontFamily: serifHeadline,
								fontSize: 46, // L2
								fontWeight: 400,
								lineHeight: 1.2,
								letterSpacing: '-0.02em',
								color: textWhite,
								margin: '0 0 24px 0'
							}}>
								Autonomous Fleet Velocity & Capital Efficiency
							</h1>

							{/* L3 Context (Font B: Precision Sans) */}
							<div style={{
								fontFamily: sansBody,
								fontSize: 18, // L3
								lineHeight: 1.6,
								color: '#94A3B8',
								fontWeight: 300,
								maxWidth: 420
							}}>
								Integration of autonomous humanoid clusters across 40 distribution hubs accelerated inventory turnover by 310%.
							</div>
						</div>

						{/* L4 Annotations: Attached strictly to the grid bottom */}
						<div style={{
							display: 'flex',
							gap: 32,
							fontFamily: sansBody
						}}>
							<div style={{ borderLeft: `2px solid ${goldAccent}`, paddingLeft: 16 }}>
								<div style={{ fontSize: 20, fontWeight: 600, color: textWhite }}>40 Hubs</div>
								<div style={{ fontSize: 11, color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>Fully Automated</div>
							</div>
							<div style={{ borderLeft: `2px solid ${muted}`, paddingLeft: 16 }}>
								<div style={{ fontSize: 20, fontWeight: 600, color: textWhite }}>99.98%</div>
								<div style={{ fontSize: 11, color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>Dispatch Accuracy</div>
							</div>
						</div>
					</div>

					{/* Column 2: Vector Story & L1 Hero Metric (60% Width) */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* Full-Canvas Vector Path */}
						<svg width="100%" height="100%" viewBox="0 0 900 600" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							{/* Grid Baseline */}
							<line x1="50" y1="450" x2="850" y2="450" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 6" />

							{/* Curve */}
							<path
								d="M 50,450 C 200,450 350,380 500,220 C 650,60 750,120 850,100"
								fill="none"
								stroke={goldAccent}
								strokeWidth="3.5"
								strokeLinecap="round"
								strokeDasharray={pathLength}
								strokeDashoffset={pathDashoffset}
							/>

							{/* L4 Annotation attached directly to curve peak */}
							<g style={{ opacity: spring({ frame: Math.max(0, frame - 110), fps }), transform: 'translate(500px, 220px)' }}>
								<circle cx="0" cy="0" r="6" fill={bg} stroke={goldAccent} strokeWidth="2.5" />
								<text x="0" y="30" fill={muted} fontSize="11" fontFamily={sansBody} fontWeight="500" textAnchor="middle" letterSpacing="0.05em">FLEET INITIATION</text>
							</g>
						</svg>

						{/* L1 Hero Metric: The Emotional Center of the Frame */}
						<div style={{
							position: 'relative',
							zIndex: 20,
							textAlign: 'right',
							opacity: heroPop,
							transform: `scale(${heroScale})`,
							marginRight: 20
						}}>
							{/* L1 Metric (Font B: Precision Sans) */}
							<div style={{
								fontFamily: sansBody,
								fontSize: 110, // L1 Hero Metric (Commanding authority)
								fontWeight: 300,
								letterSpacing: '-0.04em',
								lineHeight: 0.95,
								color: goldAccent
							}}>
								$2.8B
							</div>

							{/* Supporting Metric Label */}
							<div style={{
								fontFamily: serifHeadline,
								fontSize: 24,
								fontWeight: 400,
								color: textWhite,
								marginTop: 12,
								fontStyle: 'italic'
							}}>
								Net Annual Supply Value Realized
							</div>
						</div>
					</div>

				</div>

				{/* L5 Metadata Footer: Grid Anchor Bottom */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontFamily: sansBody,
					fontSize: 11, // L5 Metadata
					color: muted,
					letterSpacing: '0.12em',
					borderTop: '1px solid rgba(255, 255, 255, 0.1)',
					paddingTop: 20,
					marginTop: 32,
					opacity: envReveal
				}}>
					<div>CONFIDENTIAL // EXECUTIVE BOARD BRIEFING</div>
					<div>FRAME 01 // OVERVIEW</div>
				</div>

			</div>
		</AbsoluteFill>
	);
};
