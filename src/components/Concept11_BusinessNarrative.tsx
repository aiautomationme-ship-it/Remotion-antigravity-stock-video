import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 11: Business Narrative (Kinetic Editorial Documentary Style)
 * - Zero dashboards, zero charts. Pure narrative storytelling.
 * - Structure: Problem -> Transformation -> Outcome
 * - High-end editorial typography with strict rhythm and pacing.
 */
export const Concept11_BusinessNarrative: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Color Palette
	const bg = '#0A0A0A';
	const textWhite = '#FFFFFF';
	const textMuted = '#666666';
	const accentGold = '#C5A059';

	// Timeline / Story Acts
	// ACT 1: The Friction / Problem (0 - 3.5s / 0 - 210f)
	const act1Opacity = interpolate(frame, [0, 30, 180, 210], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	const act1Y = interpolate(spring({ frame, fps, config: { damping: 30 } }), [0, 1], [40, 0]);

	// ACT 2: The Transformation / Pivot (3.5 - 7s / 210 - 420f)
	const act2Frame = Math.max(0, frame - 210);
	const act2Opacity = interpolate(act2Frame, [0, 30, 180, 210], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	const act2Scale = interpolate(spring({ frame: act2Frame, fps, config: { damping: 30 } }), [0, 1], [0.95, 1]);

	// ACT 3: The Outcome / Hero Benchmark (7 - 10s / 420 - 600f)
	const act3Frame = Math.max(0, frame - 420);
	const act3Opacity = interpolate(act3Frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	const act3Y = interpolate(spring({ frame: act3Frame, fps, config: { damping: 20, mass: 1 } }), [0, 1], [30, 0]);

	// Continuous subtle camera float
	const camScale = interpolate(frame, [0, 600], [1, 1.03]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
			color: textWhite,
			overflow: 'hidden'
		}}>
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, bottom: 0,
				transform: `scale(${camScale})`,
				transformOrigin: 'center center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '100px 120px',
				boxSizing: 'border-box'
			}}>
				
				{/* Top Branding / Chapter Indicator (Constant) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: 12,
					fontWeight: 600,
					letterSpacing: '0.2em',
					color: textMuted,
					textTransform: 'uppercase',
					borderBottom: '1px solid rgba(255,255,255,0.1)',
					paddingBottom: 24
				}}>
					<div>CASE STUDY // GLOBAL M&A INTEGRATION</div>
					<div>2027 STRATEGIC BRIEFING</div>
				</div>

				{/* CENTER STAGE: Dynamic Narrative Acts */}
				<div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
					
					{/* ACT 1: THE PROBLEM */}
					<div style={{
						position: 'absolute',
						width: '100%',
						opacity: act1Opacity,
						transform: `translateY(${act1Y}px)`
					}}>
						<div style={{ fontSize: 16, color: accentGold, letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 24 }}>
							01 — THE INITIAL FRICTION
						</div>
						<h1 style={{
							fontFamily: 'Georgia, serif',
							fontSize: 56,
							fontWeight: 400,
							lineHeight: 1.3,
							letterSpacing: '-0.02em',
							maxWidth: 1200,
							margin: 0
						}}>
							Fragmented logistics across 14 operating territories created a <span style={{ color: accentGold }}>$340M annual drag</span> on enterprise margin efficiency.
						</h1>
					</div>

					{/* ACT 2: THE TRANSFORMATION */}
					<div style={{
						position: 'absolute',
						width: '100%',
						opacity: act2Opacity,
						transform: `scale(${act2Scale})`
					}}>
						<div style={{ fontSize: 16, color: accentGold, letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 24 }}>
							02 — THE STRATEGIC PIVOT
						</div>
						<h1 style={{
							fontSize: 64,
							fontWeight: 500,
							lineHeight: 1.2,
							letterSpacing: '-0.03em',
							maxWidth: 1300,
							margin: 0
						}}>
							Unified all regional supply networks into a single, autonomous real-time routing engine.
						</h1>
					</div>

					{/* ACT 3: THE OUTCOME (HERO) */}
					<div style={{
						position: 'absolute',
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
						opacity: act3Opacity,
						transform: `translateY(${act3Y}px)`
					}}>
						<div style={{ maxWidth: 800 }}>
							<div style={{ fontSize: 16, color: accentGold, letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 24 }}>
								03 — THE NET OUTCOME
							</div>
							<h1 style={{
								fontFamily: 'Georgia, serif',
								fontSize: 48,
								fontWeight: 400,
								lineHeight: 1.3,
								margin: 0,
								color: '#DDDDDD'
							}}>
								Fulfillment velocity quadrupled while unlocking massive operational capital reserves.
							</h1>
						</div>

						{/* Massive Hero Metric */}
						<div style={{ textAlign: 'right' }}>
							<div style={{ fontSize: 120, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: textWhite }}>
								$1.1B
							</div>
							<div style={{ fontSize: 20, color: accentGold, fontWeight: 500, marginTop: 12, letterSpacing: '0.05em' }}>
								NET CAPITAL VALUE RETAINED
							</div>
						</div>
					</div>

				</div>

				{/* Bottom Footer Metadata (Constant) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: 12,
					color: textMuted,
					letterSpacing: '0.1em',
					borderTop: '1px solid rgba(255,255,255,0.1)',
					paddingTop: 24
				}}>
					<div>CONFIDENTIAL // BOARD PRESENTATION</div>
					<div>EXECUTIVE NARRATIVE ARCHITECTURE</div>
				</div>

			</div>
		</AbsoluteFill>
	);
};
