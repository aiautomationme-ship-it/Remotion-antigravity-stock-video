import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 06: Executive Analytics (Bloomberg/Financial Times inspired)
 * - Editorial business composition
 * - Typography as the hero
 * - Custom data visualization with progressive reveal
 * - Elegant monochrome foundation with restrained accent colors
 * - No decorative effects, excessive blur, or repetitive KPI cards
 */
export const Concept06_ExecutiveAnalytics: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Timeline (Progressive Reveal)
	// 0-1s: Title and Header
	const headerReveal = spring({ frame, fps, config: { damping: 20, mass: 1 } });
	const headerY = interpolate(headerReveal, [0, 1], [20, 0]);

	// 1-2s: Primary insight text
	const insightReveal = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 20, mass: 1 } });
	const insightY = interpolate(insightReveal, [0, 1], [20, 0]);

	// 2-4s: Data visualization axes and structure
	const vizStructureReveal = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 18, mass: 1 } });

	// 3-6s: Data points / Bars revealing progressively
	const dataPoints = [
		{ label: 'Q1', value: 35, accent: false },
		{ label: 'Q2', value: 48, accent: false },
		{ label: 'Q3', value: 42, accent: false },
		{ label: 'Q4', value: 85, accent: true }, // The dominant insight
	];

	// 6-8s: Secondary info & Footer
	const footerReveal = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 20, mass: 1 } });

	return (
		<AbsoluteFill style={{
			backgroundColor: '#F7F5F0', // Premium newspaper off-white
			fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
			color: '#111111',
			padding: '80px 100px',
			display: 'flex',
			flexDirection: 'column',
		}}>
			{/* Top Border - Editorial Style */}
			<div style={{
				width: '100%',
				height: 4,
				backgroundColor: '#111111',
				marginBottom: 40,
				opacity: headerReveal,
				transform: `scaleX(${headerReveal})`,
				transformOrigin: 'left'
			}} />

			{/* Header */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'baseline',
				opacity: headerReveal,
				transform: `translateY(${headerY}px)`
			}}>
				<h1 style={{
					fontFamily: 'Georgia, serif',
					fontSize: 64,
					fontWeight: 400,
					margin: 0,
					letterSpacing: '-0.02em',
					color: '#111111'
				}}>
					Global Equities & Strategic Growth
				</h1>
				<div style={{
					fontSize: 16,
					fontWeight: 600,
					textTransform: 'uppercase',
					letterSpacing: '0.1em',
					color: '#555555'
				}}>
					Q4 2026 Executive Briefing
				</div>
			</div>

			<div style={{
				width: '100%',
				height: 1,
				backgroundColor: '#DDDDDD',
				marginTop: 40,
				marginBottom: 60,
				opacity: headerReveal
			}} />

			{/* Main Content Area */}
			<div style={{
				display: 'flex',
				flex: 1,
				gap: 100,
			}}>
				{/* Left Column: Typography & Insight */}
				<div style={{
					flex: '0 0 35%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					opacity: insightReveal,
					transform: `translateY(${insightY}px)`
				}}>
					<h2 style={{
						fontSize: 24,
						fontWeight: 600,
						color: '#111111',
						marginBottom: 30,
						textTransform: 'uppercase',
						letterSpacing: '0.05em'
					}}>
						Key Finding
					</h2>
					<p style={{
						fontFamily: 'Georgia, serif',
						fontSize: 36,
						lineHeight: 1.4,
						color: '#222222',
						margin: 0,
						fontWeight: 400
					}}>
						Structural reorganization in Q3 yielded a <strong style={{ color: '#004B87', fontWeight: 600 }}>142% margin expansion</strong> across core enterprise segments by year-end.
					</p>
					<div style={{
						marginTop: 60,
						padding: '30px 0',
						borderTop: '1px solid #DDDDDD',
						borderBottom: '1px solid #DDDDDD'
					}}>
						<div style={{ fontSize: 14, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Primary Driver</div>
						<div style={{ fontSize: 24, fontWeight: 500, color: '#111111' }}>Operational Efficiency Automation</div>
					</div>
				</div>

				{/* Right Column: Custom Data Visualization */}
				<div style={{
					flex: 1,
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					paddingBottom: 40
				}}>
					{/* Y-Axis Lines */}
					<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: vizStructureReveal }}>
						{[100, 75, 50, 25, 0].map((val, i) => (
							<div key={i} style={{ display: 'flex', alignItems: 'center', width: '100%', height: 0 }}>
								<div style={{ width: 40, fontSize: 14, color: '#888', fontFamily: 'monospace' }}>{val}</div>
								<div style={{ flex: 1, height: 1, borderTop: '1px dashed #CCCCCC' }} />
							</div>
						))}
					</div>

					{/* Bars */}
					<div style={{
						position: 'relative',
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'space-around',
						paddingLeft: 40,
						zIndex: 1
					}}>
						{dataPoints.map((pt, i) => {
							const pointReveal = spring({
								frame: Math.max(0, frame - (90 + i * 15)),
								fps,
								config: { damping: 14, mass: 0.8 }
							});
							return (
								<div key={i} style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									width: '12%'
								}}>
									<div style={{
										width: '100%',
										height: `${pt.value}%`,
										backgroundColor: pt.accent ? '#004B87' : '#D4D4D4', // Restrained accent color (Financial Times / Bloomberg blue)
										transform: `scaleY(${pointReveal})`,
										transformOrigin: 'bottom',
									}} />
									<div style={{
										marginTop: 15,
										fontSize: 16,
										fontWeight: pt.accent ? 600 : 400,
										color: pt.accent ? '#004B87' : '#555555',
										opacity: pointReveal
									}}>
										{pt.label}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Footer */}
			<div style={{
				marginTop: 'auto',
				display: 'flex',
				justifyContent: 'space-between',
				borderTop: '2px solid #111111',
				paddingTop: 20,
				opacity: footerReveal
			}}>
				<div style={{ fontSize: 14, color: '#555555', fontFamily: 'monospace' }}>
					SOURCE: INTERNAL ANALYTICS TERMINAL
				</div>
				<div style={{ fontSize: 14, color: '#555555', fontFamily: 'monospace' }}>
					CONFIDENTIAL & PROPRIETARY
				</div>
			</div>
		</AbsoluteFill>
	);
};
