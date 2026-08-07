import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 13: The Autonomous Enterprise Ecosystem (Fortune 500 Annual Report Opening)
 * 
 * Pre-Design Pipeline:
 * 1. Narrative: Autonomous intelligence restructures global enterprise operations in real-time.
 * 2. Visual Metaphor: "The Living Ecosystem" — A organic, flowing vector stream that spawns compute nodes as it evolves.
 * 3. Color Palette: Alabaster paper (#F5F4F0), Slate Charcoal (#1E2229), Emerald Teal (#0D5C4D), Muted Bronze (#A88247).
 * 4. Hierarchy:
 *    - L1 Hero: "4.8x" (96px Emerald Teal)
 *    - L2 Headline: "The Autonomous Enterprise Ecosystem" (44px Serif)
 *    - L3 Supporting: "Continuous neural adaptation across 1,200 global supply nodes."
 *    - L5 Metadata: "2027 ANNUAL REPORT // STRATEGIC TRANSFORMATION"
 */
export const Concept13_EcosystemEvolution: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Palette
	const bg = '#F5F4F0'; // Warm alabaster
	const slate = '#1E2229'; // Primary text
	const emerald = '#0D5C4D'; // Primary accent (Intelligence)
	const bronze = '#A88247'; // Secondary accent
	const muted = '#7A808A'; // Subordinate metadata

	// Timelines
	// 0-2s: Environment & Header
	const envReveal = spring({ frame, fps, config: { damping: 40, mass: 2 } });
	const textSlide = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 30, mass: 1.5 } });
	const textY = interpolate(textSlide, [0, 1], [25, 0]);

	// 2-6s: The Living Ecosystem Vector Stream (Path draw)
	const streamProgress = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 50, mass: 3, stiffness: 18 } });
	const pathLength = 1800;
	const pathDashoffset = interpolate(streamProgress, [0, 1], [pathLength, 0]);

	// Nodes reveal as stream reaches them
	const node1Pop = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 20 } });
	const node2Pop = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 20 } });
	const node3Pop = spring({ frame: Math.max(0, frame - 220), fps, config: { damping: 20 } });

	// 5-8s: Hero Metric Reveal
	const heroPop = spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 22, mass: 1 } });
	const heroScale = interpolate(heroPop, [0, 1], [0.92, 1]);

	// Master slow camera float
	const camScale = interpolate(frame, [0, 600], [1, 1.04]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			fontFamily: 'Georgia, serif',
			color: slate,
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

				{/* Top Header: Metadata (L5) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					opacity: envReveal,
					borderBottom: '1px solid rgba(30, 34, 41, 0.12)',
					paddingBottom: 24,
					marginBottom: 50
				}}>
					<div style={{
						fontFamily: 'Inter, sans-serif',
						fontSize: 12, // L5
						fontWeight: 600,
						letterSpacing: '0.18em',
						color: bronze,
						textTransform: 'uppercase'
					}}>
						2027 ANNUAL REPORT // STRATEGIC TRANSFORMATION
					</div>
					<div style={{
						fontFamily: 'Inter, sans-serif',
						fontSize: 12,
						color: muted,
						letterSpacing: '0.08em'
					}}>
						SECTION 01 — ENTERPRISE SCALE
					</div>
				</div>

				{/* Center Stage: Editorial Narrative & Living Ecosystem Visualization */}
				<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

					{/* Left Column: Narrative Typography (42% width) */}
					<div style={{
						width: '42%',
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
								fontSize: 44, // L2
								fontWeight: 400,
								lineHeight: 1.25,
								letterSpacing: '-0.02em',
								color: slate,
								margin: '0 0 24px 0'
							}}>
								The Autonomous Enterprise Ecosystem
							</h1>

							{/* L3 Supporting Statement */}
							<div style={{
								fontFamily: 'Inter, sans-serif',
								fontSize: 18, // L3
								lineHeight: 1.6,
								color: muted,
								fontWeight: 300,
								maxWidth: 460
							}}>
								Continuous neural adaptation across 1,200 global supply nodes has restructured operational decision-making.
							</div>
						</div>

						{/* Key Node Annotations */}
						<div style={{
							display: 'flex',
							gap: 40,
							fontFamily: 'Inter, sans-serif',
							opacity: node2Pop
						}}>
							<div>
								<div style={{ fontSize: 22, fontWeight: 600, color: emerald }}>1,200</div>
								<div style={{ fontSize: 11, color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>Active Nodes</div>
							</div>
							<div style={{ borderLeft: '1px solid rgba(30,34,41,0.15)', strokeDasharray: 4 }} />
							<div>
								<div style={{ fontSize: 22, fontWeight: 600, color: bronze }}>&lt; 0.4ms</div>
								<div style={{ fontSize: 11, color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>Sync Latency</div>
							</div>
						</div>
					</div>

					{/* Right Column: Living Vector Ecosystem & L1 Hero Metric */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* Organic Flowing Stream (SVG) */}
						<svg width="100%" height="100%" viewBox="0 0 900 600" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							<defs>
								<linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor={emerald} />
									<stop offset="60%" stopColor={bronze} />
									<stop offset="100%" stopColor={slate} />
								</linearGradient>
							</defs>

							{/* Ambient Grid Reference Lines */}
							<line x1="50" y1="300" x2="850" y2="300" stroke="rgba(30,34,41,0.06)" strokeWidth="1" strokeDasharray="6 6" />

							{/* Main Ecosystem Vector Path */}
							<path 
								d="M 50,450 C 200,450 250,150 450,220 C 650,290 680,480 850,200" 
								fill="none" 
								stroke="url(#streamGrad)" 
								strokeWidth="4" 
								strokeLinecap="round"
								strokeDasharray={pathLength}
								strokeDashoffset={pathDashoffset}
							/>

							{/* Node Spawns */}
							{/* Node 1 */}
							<g style={{ opacity: node1Pop, transform: `scale(${node1Pop})`, transformOrigin: '250px 240px' }}>
								<circle cx="250" cy="240" r="7" fill={bg} stroke={emerald} strokeWidth="3" />
								<circle cx="250" cy="240" r="15" fill="none" stroke={emerald} strokeWidth="1" opacity="0.3" />
							</g>

							{/* Node 2 */}
							<g style={{ opacity: node2Pop, transform: `scale(${node2Pop})`, transformOrigin: '450px 220px' }}>
								<circle cx="450" cy="220" r="9" fill={emerald} />
							</g>

							{/* Node 3 */}
							<g style={{ opacity: node3Pop, transform: `scale(${node3Pop})`, transformOrigin: '680px 420px' }}>
								<circle cx="680" cy="420" r="7" fill={bg} stroke={bronze} strokeWidth="3" />
							</g>
						</svg>

						{/* L1 Hero Metric Overlay */}
						<div style={{
							position: 'relative',
							zIndex: 20,
							textAlign: 'right',
							opacity: heroPop,
							transform: `scale(${heroScale})`,
							marginRight: 20
						}}>
							{/* L1 Hero Metric */}
							<div style={{
								fontFamily: 'Inter, sans-serif',
								fontSize: 120, // L1 (Commanding attention)
								fontWeight: 300,
								letterSpacing: '-0.04em',
								lineHeight: 0.95,
								color: emerald
							}}>
								4.8x
							</div>
							<div style={{
								fontSize: 24, // Supporting context
								fontWeight: 400,
								color: slate,
								marginTop: 12,
								fontStyle: 'italic'
							}}>
								Operational Velocity Multiplier
							</div>
						</div>

					</div>

				</div>

				{/* Bottom Footer Metadata (L5) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontFamily: 'Inter, sans-serif',
					fontSize: 11, // L5
					color: muted,
					letterSpacing: '0.12em',
					borderTop: '1px solid rgba(30, 34, 41, 0.12)',
					paddingTop: 20,
					marginTop: 32,
					opacity: envReveal
				}}>
					<div>GLOBAL ENTERPRISE ECOSYSTEM STUDY</div>
					<div>FRAME 01 // OVERVIEW</div>
				</div>

			</div>
		</AbsoluteFill>
	);
};
