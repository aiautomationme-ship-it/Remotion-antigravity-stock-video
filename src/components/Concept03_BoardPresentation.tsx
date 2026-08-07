import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Masterpiece Concept 03: McKinsey Strategic Advisory & FT Editorial Slide.
 * Evolved 2026-2027 design principles:
 * - Editorial composition mimicking premium business publication print layout.
 * - Monochromatic foundation with warm ivory paper, deep navy, and burgundy accents.
 * - Custom designed waterfall flow of capital allocation (restrained data viz).
 * - Progressive information reveal resembling a senior partner board presentation.
 */
export const Concept03_BoardPresentation: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Act 1: Headline & Takeaway Reveal (0-2s / 0-120 frames)
	const headlineReveal = spring({ frame, fps, config: { damping: 20, mass: 1 } });
	const textY = interpolate(headlineReveal, [0, 1], [15, 0]);

	// Act 2: Custom Shareholder Waterfall Flow (2-5s / 120-300 frames)
	// Staggered node resolves
	const node1Progress = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 16, mass: 0.9 } });
	const node2Progress = spring({ frame: Math.max(0, frame - 145), fps, config: { damping: 16, mass: 0.9 } });
	const node3Progress = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 16, mass: 0.9 } });
	
	// Connecting line animations
	const line1Progress = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 18, mass: 1 } });
	const line2Progress = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 18, mass: 1 } });

	// Act 3: Secondary metric counts resolve (5-8s / 300-480 frames)
	const footerReveal = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 20, mass: 1 } });

	// Act 4: Micro vertical camera slide
	const camY = interpolate(frame, [0, 600], [15, -15]);

	return (
		<AbsoluteFill style={{
			background: '#faf6f0', // Premium warm ivory paper base
			fontFamily: 'Inter, -apple-system, sans-serif',
			color: '#0c1b33',
			overflow: 'hidden'
		}}>
			{/* Editorial top line accent */}
			<div style={{
				height: 6,
				background: '#800020', // FT Burgundy
				width: '100%'
			}} />

			{/* Camera Slide Wrapper */}
			<div style={{
				width: '100%',
				height: '100%',
				padding: 95,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				transform: `translateY(${camY}px)`,
				transformOrigin: 'center center'
			}}>

				{/* Header Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					borderBottom: '1px solid #e5e2db',
					paddingBottom: 24,
					opacity: headlineReveal
				}}>
					<div>
						<div style={{ fontSize: 13, fontWeight: 700, color: '#800020', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
							Strategic Advisory Briefing // Board Session
						</div>
						<h1 style={{ 
							fontFamily: 'Georgia, serif',
							fontSize: 44, 
							fontWeight: 800, 
							margin: '6px 0 0 0', 
							letterSpacing: '-0.02em', 
							color: '#0c1b33' 
						}}>
							Capital Reallocation & Shareholder Outcomes
						</h1>
					</div>
					<div style={{ fontSize: 13, color: '#666', fontWeight: 600, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
						Corporate Allocation Study — Page 18
					</div>
				</div>

				{/* Content Grid */}
				<div style={{
					display: 'flex',
					flex: 1,
					marginTop: 48,
					gap: 80,
					alignItems: 'center'
				}}>
					
					{/* Left Takeaway Paragraph (42% width) */}
					<div style={{
						width: '42%',
						opacity: headlineReveal,
						transform: `translateY(${textY}px)`
					}}>
						<div style={{ 
							fontFamily: 'Georgia, serif',
							fontSize: 26, 
							lineHeight: 1.45, 
							color: '#0c1b33', 
							fontWeight: 400 
						}}>
							“Capital realignment across mature logistics segments secures targeted <strong style={{ color: '#800020', fontWeight: 800 }}>$140M operating synergies</strong>, establishing the primary balance sheet buffer for APAC deployment.”
						</div>
						<div style={{ 
							fontSize: 13, 
							color: '#666', 
							marginTop: 24, 
							fontWeight: 700,
							letterSpacing: '0.08em'
						}}>
							EXECUTIVE SUMMARY RECOMMENDATION
						</div>
					</div>

					{/* Right Custom Data Visualization: McKinsey Waterfall Flow (58% width) */}
					<div style={{
						flex: 1,
						background: '#ffffff',
						border: '1px solid #e7e4df',
						padding: 40,
						boxShadow: '0 8px 24px rgba(0,0,0,0.01)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						height: '80%',
						position: 'relative'
					}}>
						<div style={{ fontSize: 12, fontWeight: 700, color: '#666', letterSpacing: '0.08em', marginBottom: 24 }}>
							WATERFALL FLOW // VALUE ALLOCATION ($ MILLIONS)
						</div>

						{/* Connector Lines between steps */}
						<svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
							{/* Line 1 */}
							<path
								d="M 120,130 L 260,130"
								fill="none"
								stroke="rgba(12,27,51,0.15)"
								strokeWidth="1.5"
								strokeDasharray="4"
								opacity={line1Progress}
							/>
							{/* Line 2 */}
							<path
								d="M 260,130 L 400,130"
								fill="none"
								stroke="rgba(12,27,51,0.15)"
								strokeWidth="1.5"
								strokeDasharray="4"
								opacity={line2Progress}
							/>
						</svg>

						{/* 3 Step Waterfall Nodes */}
						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							flex: 1,
							padding: '0 20px'
						}}>
							
							{/* Step 1: Capital Inflow */}
							<div style={{ 
								display: 'flex', 
								flexDirection: 'column', 
								alignItems: 'center',
								opacity: node1Progress,
								transform: `scale(${node1Progress})`
							}}>
								<span style={{ fontSize: 24, fontWeight: 800, color: '#0c1b33' }}>$420M</span>
								<div style={{ 
									width: 80, 
									height: 80, 
									borderRadius: '50%', 
									border: '2px solid #0c1b33', 
									display: 'flex', 
									alignItems: 'center', 
									justifyContent: 'center',
									marginTop: 12,
									fontWeight: 700,
									fontSize: 12,
									color: '#0c1b33',
									background: '#faf6f0'
								}}>
									INFLOW
								</div>
								<span style={{ fontSize: 11, fontWeight: 700, color: '#666', marginTop: 12 }}>CAPITAL POOL</span>
							</div>

							{/* Step 2: Gap Allocation */}
							<div style={{ 
								display: 'flex', 
								flexDirection: 'column', 
								alignItems: 'center',
								opacity: node2Progress,
								transform: `scale(${node2Progress})`
							}}>
								<span style={{ fontSize: 24, fontWeight: 800, color: '#800020' }}>-$140M</span>
								<div style={{ 
									width: 80, 
									height: 80, 
									borderRadius: '50%', 
									border: '2px solid #800020', 
									display: 'flex', 
									alignItems: 'center', 
									justifyContent: 'center',
									marginTop: 12,
									fontWeight: 700,
									fontSize: 12,
									color: '#800020',
									background: '#faf6f0'
								}}>
									GAP
								</div>
								<span style={{ fontSize: 11, fontWeight: 700, color: '#666', marginTop: 12 }}>REALIGNMENT</span>
							</div>

							{/* Step 3: Output Efficiency */}
							<div style={{ 
								display: 'flex', 
								flexDirection: 'column', 
								alignItems: 'center',
								opacity: node3Progress,
								transform: `scale(${node3Progress})`
							}}>
								<span style={{ fontSize: 24, fontWeight: 800, color: '#0c1b33' }}>+$280M</span>
								<div style={{ 
									width: 80, 
									height: 80, 
									borderRadius: '50%', 
									border: '2px solid #0c1b33', 
									display: 'flex', 
									alignItems: 'center', 
									justifyContent: 'center',
									marginTop: 12,
									fontWeight: 700,
									fontSize: 12,
									background: '#0c1b33',
									color: '#ffffff'
								}}>
									OUTPUT
								</div>
								<span style={{ fontSize: 11, fontWeight: 700, color: '#666', marginTop: 12 }}>NET REALIZATION</span>
							</div>

						</div>

					</div>

				</div>

				{/* Bottom Footer Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '1px solid #e5e2db',
					paddingTop: 20,
					marginTop: 32,
					fontSize: 12,
					color: '#86868b',
					opacity: footerReveal
				}}>
					<span>MCKINSEY CAPITAL OUTCOME MODEL © 2026</span>
					<span>RESTRICTED BRIEFING MATRIX</span>
				</div>

			</div>
		</AbsoluteFill>
	);
};
