import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 10: Fortune 500 Annual Report (Sustainability Theme)
 * - Timeless, elegant, editorial art direction.
 * - Earth tones and forest green palette.
 * - Strict typography hierarchy.
 * - Generous whitespace and balanced composition.
 * - Smooth curves and slow, confident motion.
 */
export const Concept10_Fortune500_Sustainability: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Color Palette: Premium Sustainability
	const bg = '#F9F8F6'; // Warm ivory / unbleached paper
	const ink = '#1A1C19'; // Deep charcoal (almost black, but softer)
	const forestGreen = '#2A5934'; // Primary accent
	const gold = '#B89965'; // Secondary subtle accent
	const muted = '#8C8C85'; // For metadata and context

	// Animation Timelines - Slow, confident, sequential reveal
	// 1. Initial fade in of the environment and metadata (0-1s)
	const envReveal = spring({ frame, fps, config: { damping: 40, mass: 2 } });
	
	// 2. Main Heading and Context fade in and slide up slightly (1-2s)
	const headingReveal = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 30, mass: 1.5 } });
	const headingY = interpolate(headingReveal, [0, 1], [20, 0]);

	// 3. The Graphic/Chart begins to draw (2-5s)
	const splineDraw = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 50, mass: 3, stiffness: 20 } });
	const pathLength = 1500;
	const pathOffset = interpolate(splineDraw, [0, 1], [pathLength, 0]);

	// 4. The Hero Metric pops (4-5s)
	const heroReveal = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 25, mass: 1 } });
	
	// 5. Annotations and secondary stats fade in (5-7s)
	const annotationReveal = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 25, mass: 1 } });

	// Continuous very slow push-in for cinematic feel
	const cameraScale = interpolate(frame, [0, 600], [1, 1.05]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			fontFamily: '"Georgia", serif', // Using a serif for elegance and editorial feel
			color: ink,
			padding: '100px 120px', // Generous whitespace
			display: 'flex',
			flexDirection: 'column',
			overflow: 'hidden'
		}}>
			{/* Master Camera Wrapper for slow push */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, bottom: 0,
				transform: `scale(${cameraScale})`,
				transformOrigin: 'center center',
				display: 'flex',
				flexDirection: 'column',
				padding: '100px 120px',
				boxSizing: 'border-box'
			}}>
				
				{/* Top Row: Metadata (L5) and Main Heading (L2) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					opacity: envReveal,
					borderBottom: `1px solid rgba(26, 28, 25, 0.1)`,
					paddingBottom: 40,
					marginBottom: 60
				}}>
					{/* Metadata (L5) - Sans serif for technical details */}
					<div style={{
						fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
						fontSize: 12, // L5
						fontWeight: 500,
						letterSpacing: '0.15em',
						color: muted,
						textTransform: 'uppercase'
					}}>
						2027 ESG Impact Report
					</div>
					
					{/* Main Heading (L2) */}
					<div style={{
						fontSize: 48, // L2
						fontWeight: 400,
						letterSpacing: '-0.01em',
						color: ink,
						opacity: headingReveal,
						transform: `translateY(${headingY}px)`
					}}>
						Transition to Renewable Infrastructure
					</div>
				</div>

				{/* Main Content Area */}
				<div style={{
					display: 'flex',
					flex: 1,
					position: 'relative'
				}}>
					{/* Left Column: Context (L3, L4) */}
					<div style={{
						width: '35%',
						paddingRight: 80,
						opacity: headingReveal,
						transform: `translateY(${headingY}px)`,
						display: 'flex',
						flexDirection: 'column'
					}}>
						<div style={{
							fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
							fontSize: 14,
							fontWeight: 600,
							letterSpacing: '0.1em',
							color: gold,
							textTransform: 'uppercase',
							marginBottom: 20
						}}>
							Primary Objective
						</div>
						
						{/* Section Heading (L3) */}
						<div style={{
							fontSize: 28, // L3
							lineHeight: 1.4,
							fontWeight: 400,
							color: ink,
							marginBottom: 40
						}}>
							Accelerated divestment from carbon-intensive assets drove our fastest portfolio transformation to date.
						</div>
						
						<div style={{ flex: 1 }} /> {/* Spacer */}

						{/* Secondary Stats / KPI Labels (L4) */}
						<div style={{ opacity: annotationReveal }}>
							<div style={{ borderLeft: `2px solid ${forestGreen}`, paddingLeft: 20, marginBottom: 30 }}>
								<div style={{ fontSize: 24, fontWeight: 400, color: ink, marginBottom: 8 }}>$4.2B</div>
								<div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 14, color: muted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Green Bond Issuance</div>
							</div>
							<div style={{ borderLeft: `2px solid ${gold}`, paddingLeft: 20 }}>
								<div style={{ fontSize: 24, fontWeight: 400, color: ink, marginBottom: 8 }}>1.2 GW</div>
								<div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 14, color: muted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>New Solar Capacity</div>
							</div>
						</div>
					</div>

					{/* Right Column: Custom Visualization & Hero Metric */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-end'
					}}>
						
						{/* Custom Chart / Graphic Background */}
						<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: envReveal }}>
							<svg width="100%" height="100%" viewBox="0 0 800 600" style={{ overflow: 'visible' }}>
								{/* Grid lines (Subtle) */}
								<line x1="0" y1="500" x2="800" y2="500" stroke={ink} strokeOpacity="0.05" strokeWidth="1" />
								<line x1="0" y1="350" x2="800" y2="350" stroke={ink} strokeOpacity="0.05" strokeWidth="1" />
								<line x1="0" y1="200" x2="800" y2="200" stroke={ink} strokeOpacity="0.05" strokeWidth="1" />
								
								{/* The Hero Spline (Carbon Reduction Curve) */}
								<path 
									d="M -50,150 C 200,150 400,200 500,350 C 600,500 700,520 850,520" 
									fill="none" 
									stroke={forestGreen} 
									strokeWidth="4" 
									strokeLinecap="round"
									strokeDasharray={pathLength}
									strokeDashoffset={pathOffset}
								/>
								
								{/* Annotation on Spline */}
								<g style={{ opacity: annotationReveal, transform: `translate(600px, 500px)` }}>
									<circle cx="0" cy="0" r="6" fill={bg} stroke={forestGreen} strokeWidth="2" />
									<text x="0" y="30" fontFamily='"Helvetica Neue", Helvetica, Arial, sans-serif' fontSize="12" fill={muted} fontWeight="500" textAnchor="middle" letterSpacing="0.05em">TARGET ACHIEVED</text>
								</g>
							</svg>
						</div>

						{/* The Hero Metric (L1) - Unmistakable focal point */}
						<div style={{
							opacity: heroReveal,
							transform: `scale(${interpolate(heroReveal, [0, 1], [0.95, 1])})`,
							textAlign: 'right',
							zIndex: 10,
							marginTop: -100 // Positioning relative to the spline curve
						}}>
							<div style={{
								fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', // Clean sans for numbers
								fontSize: 120, // L1 (Commanding attention)
								fontWeight: 300,
								letterSpacing: '-0.04em',
								color: forestGreen,
								lineHeight: 1
							}}>
								-64%
							</div>
							<div style={{
								fontSize: 32, // Support text for hero
								fontWeight: 400,
								color: ink,
								marginTop: 16,
								fontStyle: 'italic'
							}}>
								Net Scope 1 & 2 Emissions
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Footer (L5) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					opacity: envReveal,
					marginTop: 60,
					fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
					fontSize: 11, // L5
					fontWeight: 500,
					color: muted,
					letterSpacing: '0.1em'
				}}>
					<div>GLOBAL SUSTAINABILITY INITIATIVE</div>
					<div>FRAME 01 // OVERVIEW</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
