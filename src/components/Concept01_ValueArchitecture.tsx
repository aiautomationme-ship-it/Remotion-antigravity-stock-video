import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Masterpiece: Apple Keynote & Stripe Launch style.
 * Evolved 2026-2027 design principles:
 * - Editorial typography as dominant focal element.
 * - Intentional negative space (45%).
 * - Snapping tactile interface toggles.
 * - Restrained, near-invisible motion.
 */
export const Concept01_ValueArchitecture: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Act 1: Text fade-in (SF Pro typography) - Frames 0 to 120
	const textFade = spring({ frame, fps, config: { damping: 22, mass: 1 } });
	const textTranslateY = interpolate(textFade, [0, 1], [15, 0]);

	// Act 2: Snapping toggle state & SVG line drawing - Frames 120 to 300
	const toggleSnap = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 15, mass: 0.7 } });
	const pathDrawing = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 20, mass: 1.1 } });

	// Act 3: Secondary metric cards resolve - Frames 300 to 480
	const secondaryReveal = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 18, mass: 1 } });

	// Act 4: Micro camera push-in (8-10s)
	const camZ = interpolate(frame, [0, 600], [0, 60]);

	return (
		<AbsoluteFill style={{
			background: '#fbfbfb',
			fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif',
			color: '#1d1d1f',
			overflow: 'hidden'
		}}>
			{/* Editorial layout container */}
			<div style={{
				width: '100%',
				height: '100%',
				padding: 100,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				transform: `perspective(1500px) translateZ(${camZ}px)`,
				transformOrigin: 'center center'
			}}>

				{/* Top Branding Header */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottom: '1px solid rgba(0,0,0,0.05)',
					paddingBottom: 28,
					opacity: textFade
				}}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0066cc' }} />
						<span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', color: '#86868b', textTransform: 'uppercase' }}>
							System Architecture // Release v4.2
						</span>
					</div>
					<div style={{ fontSize: 13, fontWeight: 600, color: '#86868b', letterSpacing: '0.08em' }}>
						STRIPE INTEGRATION
					</div>
				</div>

				{/* Core Asymmetric Layout */}
				<div style={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					gap: 80,
					marginTop: 48
				}}>
					
					{/* Left Column: Typographic Focus (45% Width) */}
					<div style={{
						width: '45%',
						opacity: textFade,
						transform: `translateY(${textTranslateY}px)`
					}}>
						<h2 style={{
							fontSize: 72,
							fontWeight: 800,
							letterSpacing: '-0.04em',
							lineHeight: 1.05,
							margin: 0,
							color: '#1d1d1f'
						}}>
							Scale without friction.
						</h2>
						<p style={{
							fontSize: 22,
							lineHeight: 1.5,
							color: '#515154',
							marginTop: 24,
							fontWeight: 400,
							letterSpacing: '-0.01em'
						}}>
							An elegant infrastructure built to orchestrate and automate global transaction flows with absolute consistency.
						</p>

						{/* Snapping Tactile Interface Indicator */}
						<div style={{
							display: 'inline-flex',
							background: '#f4f4f7',
							padding: '6px 14px',
							borderRadius: 30,
							marginTop: 32,
							alignItems: 'center',
							gap: 8,
							border: '1px solid rgba(0,0,0,0.04)',
							opacity: toggleSnap,
							transform: `scale(${toggleSnap})`
						}}>
							<div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
							<span style={{ fontSize: 12, fontWeight: 700, color: '#515154', letterSpacing: '0.04em' }}>
								API LATENCY STATUS: 12MS
							</span>
						</div>
					</div>

					{/* Right Column: Premium SVG Illustration (55% Width) */}
					<div style={{
						flex: 1,
						height: '80%',
						background: '#ffffff',
						border: '1px solid rgba(0,0,0,0.05)',
						borderRadius: 24,
						padding: 48,
						boxShadow: '0 20px 48px rgba(0,0,0,0.02)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: pathDrawing,
						transform: `translateY(${(1 - pathDrawing) * 20}px)`
					}}>
						
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ fontSize: 12, fontWeight: 700, color: '#86868b', letterSpacing: '0.08em' }}>
								CONCURRENT TRANSACTION INDEX
							</span>
							<span style={{ fontSize: 13, fontWeight: 700, color: '#0066cc' }}>
								PROJECTED GROWTH
							</span>
						</div>

						{/* Pure SVG Minimal Curve */}
						<div style={{ flex: 1, position: 'relative', marginTop: 32 }}>
							<svg viewBox="0 0 500 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
								<defs>
									<linearGradient id="appleLineGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#0066cc" stopOpacity="0.12" />
										<stop offset="100%" stopColor="#0066cc" stopOpacity="0.0" />
									</linearGradient>
								</defs>

								{/* Horizontal grid guide */}
								<line x1="0" y1="80" x2="500" y2="80" stroke="rgba(0,0,0,0.02)" strokeWidth="1" strokeDasharray="4 4" />

								{/* Area path */}
								<path
									d={`M 0,130 Q 125,120 250,70 T 500,20 L 500,160 L 0,160 Z`}
									fill="url(#appleLineGrad)"
									opacity={pathDrawing}
								/>

								{/* Core Curve */}
								<path
									d={`M 0,130 Q 125,120 250,70 T 500,20`}
									fill="none"
									stroke="#0066cc"
									strokeWidth="3"
									strokeLinecap="round"
									strokeDasharray="400"
									strokeDashoffset={400 - pathDrawing * 400}
								/>

								{/* Target Snap Dot */}
								<circle cx="500" cy="20" r="5" fill="#ffffff" stroke="#0066cc" strokeWidth="2.5" opacity={pathDrawing} />
							</svg>
						</div>

					</div>

				</div>

				{/* Bottom Footer Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '1px solid rgba(0,0,0,0.05)',
					paddingTop: 24,
					marginTop: 32,
					fontSize: 12,
					fontWeight: 600,
					color: '#86868b',
					opacity: secondaryReveal,
					transform: `translateY(${(1 - secondaryReveal) * 10}px)`
				}}>
					<span>APPLE DEVELOPER DESIGN CONTEXT © 2026</span>
					<span>INTEGRITY METRICS SECURED</span>
				</div>

			</div>
		</AbsoluteFill>
	);
};
