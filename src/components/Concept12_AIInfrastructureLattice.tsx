import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 12: The Rise of AI Infrastructure (McKinsey / Bloomberg Originals Editorial)
 * 
 * Pre-Design Decisions:
 * 1. Business Narrative: Compute density has decoupled enterprise value from physical land footprint.
 * 2. Viewer Takeaway: A single 100,000 GPU cluster yields more economic leverage than traditional industrial infrastructure.
 * 3. Visual Metaphor: "The Monolithic Lattice" — An expanding geometric array of computational nodes building vertically like a silicon monolith.
 * 4. Composition: Asymmetrical editorial. Left 40% negative space reserved for strict typography; Right 60% holds the continuous 2.5D lattice.
 * 5. Hierarchy:
 *    - L1 Hero: "100,000 GPUS" (96px)
 *    - L2 Heading: "Exascale Compute Density" (42px)
 *    - L3 Context: "Physical footprint reduced 90% while throughput expanded 400x." (20px)
 *    - L5 Metadata: "MCKINSEY GLOBAL INSTITUTE // RESEARCH BRIEFING 2027" (11px)
 */
export const Concept12_AIInfrastructureLattice: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Palette: Deep Obsidian, Platinum, Copper Accent
	const bg = '#050505';
	const textWhite = '#FFFFFF';
	const copper = '#D4AF37'; // High-value hardware accent
	const muted = '#666666';

	// Animation Timelines
	// 0-2s: Environment & Editorial Headline Reveal
	const envReveal = spring({ frame, fps, config: { damping: 40, mass: 2 } });
	const textSlide = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 30, mass: 1.5 } });
	const textY = interpolate(textSlide, [0, 1], [30, 0]);

	// 2-6s: The Lattice Monolith Builds (Visual Metaphor)
	const latticeGrow = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 40, mass: 2.5, stiffness: 30 } });
	
	// 5-8s: Hero Metric Pop & Annotation
	const heroPop = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 20, mass: 1 } });
	const heroY = interpolate(heroPop, [0, 1], [40, 0]);

	// Camera movement: Slow diagonal pan and scale
	const camScale = interpolate(frame, [0, 600], [1, 1.05]);
	const camPanX = interpolate(frame, [0, 600], [0, -20]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
			color: textWhite,
			overflow: 'hidden'
		}}>
			{/* Master Camera Pan & Zoom */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, bottom: 0,
				transform: `scale(${camScale}) translateX(${camPanX}px)`,
				transformOrigin: 'center center',
				display: 'flex',
				padding: '100px 120px',
				boxSizing: 'border-box'
			}}>

				{/* Left Column: Editorial Typography (40% width) */}
				<div style={{
					width: '40%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					zIndex: 10
				}}>
					{/* Header Metadata (L5) */}
					<div style={{ opacity: envReveal }}>
						<div style={{
							fontSize: 11, // L5
							fontWeight: 600,
							letterSpacing: '0.2em',
							color: copper,
							textTransform: 'uppercase',
							marginBottom: 8
						}}>
							MCKINSEY GLOBAL INSTITUTE // RESEARCH BRIEFING
						</div>
						<div style={{
							fontSize: 11,
							color: muted,
							letterSpacing: '0.1em'
						}}>
							VOL. 27 — CAPITAL DEPLOYMENT
						</div>
					</div>

					{/* Center Typography (L2 & L3) */}
					<div style={{
						opacity: textSlide,
						transform: `translateY(${textY}px)`
					}}>
						{/* L2 Main Heading */}
						<h1 style={{
							fontFamily: 'Georgia, serif',
							fontSize: 48, // L2
							fontWeight: 400,
							lineHeight: 1.2,
							letterSpacing: '-0.02em',
							margin: '0 0 24px 0',
							color: textWhite
						}}>
							The Decoupling of Compute & Geography
						</h1>

						{/* L3 Supporting Statement */}
						<div style={{
							fontSize: 20, // L3
							lineHeight: 1.6,
							color: '#A0A0A0',
							maxWidth: 460,
							fontWeight: 300
						}}>
							Modern AI clusters condense historic industrial capacity into singular, hyper-dense silicon infrastructure.
						</div>
					</div>

					{/* Footer Metadata (L5) */}
					<div style={{
						opacity: envReveal,
						borderTop: '1px solid rgba(255,255,255,0.1)',
						paddingTop: 20,
						fontSize: 11,
						color: muted,
						letterSpacing: '0.1em'
					}}>
						FIGURE 4.2 — EXASCALE DENSITY LANDSCAPE
					</div>
				</div>

				{/* Right Column: The Visual Metaphor — Computational Lattice Monolith */}
				<div style={{
					flex: 1,
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-end'
				}}>
					
					{/* SVG Monolithic Lattice */}
					<svg width="100%" height="100%" viewBox="0 0 1000 800" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
						<defs>
							<linearGradient id="latticeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="#1A1A1A" />
								<stop offset="50%" stopColor="#D4AF37" />
								<stop offset="100%" stopColor="#FFFFFF" />
							</linearGradient>
						</defs>

						{/* Background Architectural Grid Lines */}
						<g opacity={envReveal * 0.15} stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="4 4">
							<line x1="200" y1="0" x2="200" y2="800" />
							<line x1="400" y1="0" x2="400" y2="800" />
							<line x1="600" y1="0" x2="600" y2="800" />
							<line x1="800" y1="0" x2="800" y2="800" />
						</g>

						{/* 3D Isometric Lattice Structure growing upwards */}
						<g transform={`translate(500, 550) scale(${latticeGrow})`}>
							{[0, 1, 2, 3, 4, 5].map((layer) => {
								const yOffset = -layer * 70;
								const opacity = interpolate(latticeGrow, [layer * 0.15, 1], [0, 1], { extrapolateLeft: 'clamp' });
								
								return (
									<g key={layer} transform={`translate(0, ${yOffset})`} opacity={opacity}>
										{/* Isometric Diamond / Mesh */}
										<polygon 
											points="0,-40 180,30 0,100 -180,30" 
											fill="none" 
											stroke={layer === 5 ? copper : 'rgba(255,255,255,0.2)'} 
											strokeWidth={layer === 5 ? "2" : "1"}
										/>
										
										{/* Internal Matrix Nodes */}
										<circle cx="0" cy="30" r="4" fill={layer === 5 ? copper : '#FFFFFF'} />
										<circle cx="90" cy="-5" r="3" fill="rgba(255,255,255,0.4)" />
										<circle cx="-90" cy="-5" r="3" fill="rgba(255,255,255,0.4)" />
									</g>
								);
							})}

							{/* Vertical Connecting Vectors */}
							<line x1="0" y1="30" x2="0" y2="-320" stroke="url(#latticeGrad)" strokeWidth="2" strokeDasharray="6 3" />
							<line x1="180" y1="30" x2="180" y2="-320" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
							<line x1="-180" y1="30" x2="-180" y2="-320" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
						</g>
					</svg>

					{/* L1 Hero Metric Overlay */}
					<div style={{
						position: 'relative',
						zIndex: 20,
						textAlign: 'right',
						opacity: heroPop,
						transform: `translateY(${heroY}px)`,
						marginRight: 60
					}}>
						{/* L1 Hero Metric */}
						<div style={{
							fontSize: 96, // L1
							fontWeight: 700,
							letterSpacing: '-0.04em',
							lineHeight: 0.95,
							color: textWhite
						}}>
							100,000
						</div>
						<div style={{
							fontSize: 24, // L3 Context
							fontWeight: 600,
							letterSpacing: '0.15em',
							color: copper,
							textTransform: 'uppercase',
							marginTop: 16
						}}>
							INTERCONNECTED GPUS // SINGLE FACILITY
						</div>
					</div>

				</div>

			</div>
		</AbsoluteFill>
	);
};
