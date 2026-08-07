import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 14: Global Semiconductor Manufacturing Expansion
 * (TSMC / NVIDIA Keynote / McKinsey Manufacturing Report Style)
 * 
 * Pipeline Analysis:
 * 1. Narrative: Localized silicon foundries expand into a resilient multi-continent fab matrix.
 * 2. Visual Metaphor: "The Silicon Matrix" — An engineered grid of connected fabrication nodes scaling capacity across regions.
 * 3. Palette: Deep Silicon Charcoal (#0A0C0E), Pure White (#FFFFFF), Fab Gold (#C8A951), Wafer Cyan (#00E5FF).
 * 4. Hierarchy:
 *    - L1 Hero: "3.8M Wafers / Yr" (96px Fab Gold)
 *    - L2 Heading: "Geographic Diversification of Sub-2nm Fab Capacity" (42px Serif)
 *    - L3 Context: "$140B capital deployment secures multi-continental silicon supply resilience."
 *    - L5 Metadata: "GLOBAL SEMICONDUCTOR REPORT // TSMC & MCKINSEY BRIEFING 2027"
 */
export const Concept14_SemiconductorExpansion: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Palette
	const bg = '#0A0C0E'; // Deep Silicon Charcoal
	const textWhite = '#FFFFFF';
	const fabGold = '#C8A951'; // High-value Fab Accent
	const waferCyan = '#00E5FF'; // Precision Tech Accent
	const muted = '#64748B'; // Slate Metadata

	// Timelines
	// 0-2s: Environment & Editorial Headline Reveal
	const envReveal = spring({ frame, fps, config: { damping: 40, mass: 2 } });
	const textSlide = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 30, mass: 1.5 } });
	const textY = interpolate(textSlide, [0, 1], [30, 0]);

	// 2-6s: The Fab Matrix Vector Path Draws (Global Expansion)
	const matrixProgress = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 50, mass: 3, stiffness: 20 } });
	const pathLength = 2000;
	const pathDashoffset = interpolate(matrixProgress, [0, 1], [pathLength, 0]);

	// Node activations (Fabs)
	const node1Pop = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 20 } });
	const node2Pop = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 20 } });
	const node3Pop = spring({ frame: Math.max(0, frame - 220), fps, config: { damping: 20 } });

	// 5-8s: Hero Metric Pop
	const heroPop = spring({ frame: Math.max(0, frame - 260), fps, config: { damping: 22, mass: 1 } });
	const heroY = interpolate(heroPop, [0, 1], [30, 0]);

	// Master slow camera float
	const camScale = interpolate(frame, [0, 600], [1, 1.04]);
	const camPanY = interpolate(frame, [0, 600], [0, -15]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			color: textWhite,
			overflow: 'hidden'
		}}>
			{/* Master Camera Wrapper */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, bottom: 0,
				transform: `scale(${camScale}) translateY(${camPanY}px)`,
				transformOrigin: 'center center',
				display: 'flex',
				flexDirection: 'column',
				padding: '90px 110px',
				boxSizing: 'border-box'
			}}>

				{/* Top Row: Metadata (L5) */}
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
						fontSize: 11, // L5
						fontWeight: 600,
						letterSpacing: '0.2em',
						color: fabGold,
						textTransform: 'uppercase'
					}}>
						GLOBAL SEMICONDUCTOR REPORT // BRIEFING 2027
					</div>
					<div style={{
						fontSize: 11,
						color: muted,
						letterSpacing: '0.1em'
					}}>
						SUB-2NM FABRIC INITIATIVE
					</div>
				</div>

				{/* Center Stage: Narrative Layout */}
				<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

					{/* Left Column: Editorial Story (40% width) */}
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
							<h1 style={{
								fontFamily: 'Georgia, serif',
								fontSize: 44, // L2
								fontWeight: 400,
								lineHeight: 1.25,
								letterSpacing: '-0.02em',
								color: textWhite,
								margin: '0 0 24px 0'
							}}>
								Geographic Diversification of Advanced Fab Capacity
							</h1>

							{/* L3 Context */}
							<div style={{
								fontSize: 18, // L3
								lineHeight: 1.6,
								color: '#94A3B8',
								fontWeight: 300,
								maxWidth: 440
							}}>
								$140B in global capital deployment secures multi-continental silicon supply chains across North America, Europe, and Asia.
							</div>
						</div>

						{/* Fab Milestone Annotations */}
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
							opacity: node2Pop
						}}>
							<div style={{ borderLeft: `2px solid ${fabGold}`, paddingLeft: 16 }}>
								<div style={{ fontSize: 16, fontWeight: 600, color: textWhite }}>N2 Process Node</div>
								<div style={{ fontSize: 12, color: muted, marginTop: 2 }}>Volume Risk Production Realized</div>
							</div>
							<div style={{ borderLeft: `2px solid ${waferCyan}`, paddingLeft: 16 }}>
								<div style={{ fontSize: 16, fontWeight: 600, color: textWhite }}>4 Mega-Fabs Online</div>
								<div style={{ fontSize: 12, color: muted, marginTop: 2 }}>Phoenix, Dresden, Kumamoto, Hsinchu</div>
							</div>
						</div>
					</div>

					{/* Right Column: The Silicon Matrix Visualization & Hero Metric */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* SVG Fab Network Grid */}
						<svg width="100%" height="100%" viewBox="0 0 900 600" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							<defs>
								<linearGradient id="fabGrad" x1="0%" y1="100%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="#1E293B" />
									<stop offset="50%" stopColor={fabGold} />
									<stop offset="100%" stopColor={waferCyan} />
								</linearGradient>
							</defs>

							{/* Engineered Silicon Grid background lines */}
							<g opacity={envReveal * 0.12} stroke="#FFFFFF" strokeWidth="0.5">
								<line x1="100" y1="100" x2="800" y2="100" />
								<line x1="100" y1="300" x2="800" y2="300" />
								<line x1="100" y1="500" x2="800" y2="500" />
								<line x1="250" y1="50" x2="250" y2="550" />
								<line x1="550" y1="50" x2="550" y2="550" />
							</g>

							{/* Global Fab Vector Interconnect */}
							<path 
								d="M 150,480 L 250,300 L 550,150 L 750,300 L 850,220" 
								fill="none" 
								stroke="url(#fabGrad)" 
								strokeWidth="3" 
								strokeDasharray={pathLength}
								strokeDashoffset={pathDashoffset}
							/>

							{/* Fab Hub Nodes */}
							{/* Node 1: Hsinchu */}
							<g style={{ opacity: node1Pop, transform: `scale(${node1Pop})`, transformOrigin: '250px 300px' }}>
								<rect x="240" y="290" width="20" height="20" fill={bg} stroke={fabGold} strokeWidth="2" />
								<text x="250" y="330" fill={muted} fontSize="11" fontWeight="500" textAnchor="middle">HSINCHU (HQ)</text>
							</g>

							{/* Node 2: Phoenix */}
							<g style={{ opacity: node2Pop, transform: `scale(${node2Pop})`, transformOrigin: '550px 150px' }}>
								<circle cx="550" cy="150" r="8" fill={waferCyan} />
								<text x="550" y="125" fill={textWhite} fontSize="12" fontWeight="600" textAnchor="middle">ARIZONA FAB 21</text>
							</g>

							{/* Node 3: Dresden */}
							<g style={{ opacity: node3Pop, transform: `scale(${node3Pop})`, transformOrigin: '750px 300px' }}>
								<rect x="742" y="292" width="16" height="16" fill={bg} stroke={fabGold} strokeWidth="2" />
								<text x="750" y="330" fill={muted} fontSize="11" fontWeight="500" textAnchor="middle">DRESDEN (ESMC)</text>
							</g>
						</svg>

						{/* L1 Hero Metric Overlay */}
						<div style={{
							position: 'relative',
							zIndex: 20,
							textAlign: 'right',
							opacity: heroPop,
							transform: `translateY(${heroY}px)`,
							marginRight: 40
						}}>
							{/* L1 Hero Metric */}
							<div style={{
								fontSize: 96, // L1
								fontWeight: 700,
								letterSpacing: '-0.04em',
								lineHeight: 1,
								color: fabGold
							}}>
								3.8M
							</div>
							<div style={{
								fontFamily: 'Georgia, serif',
								fontSize: 24, // Supporting context
								fontWeight: 400,
								color: textWhite,
								marginTop: 12,
								fontStyle: 'italic'
							}}>
								Monthly Wafer Output Capacity
							</div>
						</div>

					</div>

				</div>

				{/* Bottom Row: Metadata (L5) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: 11, // L5
					color: muted,
					letterSpacing: '0.12em',
					borderTop: '1px solid rgba(255, 255, 255, 0.1)',
					paddingTop: 20,
					marginTop: 32,
					opacity: envReveal
				}}>
					<div>CONFIDENTIAL // SEMICONDUCTOR BRIEFING</div>
					<div>FRAME 01 // OVERVIEW</div>
				</div>

			</div>
		</AbsoluteFill>
	);
};
