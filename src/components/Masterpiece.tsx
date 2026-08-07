import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * MASTERPIECE: Strategic Value Creation Map
 * Codename: "Genesis"
 * 
 * Design Systems Reference: McKinsey Strategy Insights & Stripe Annual Reports.
 * Colors: Deep Obsidian Satin, Champagne Gold, Warm Ivory Text.
 * Structure: Asymmetric 40/60 Storytelling Composition.
 */
export const Masterpiece: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// 1. Act 1: Structural Assembly (0-2s / 0-120 frames)
	// Staggered slide-in triggers for the three strategy segments
	const seg1Progress = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 18, mass: 1 } });
	const seg2Progress = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 18, mass: 1 } });
	const seg3Progress = spring({ frame: Math.max(0, frame - 34), fps, config: { damping: 18, mass: 1 } });

	// 2. Act 2: Primary KPI Focus (2-5s / 120-300 frames)
	// The central hero card reveals and counts up to its target
	const heroReveal = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 20, mass: 1.1 } });
	const kpiCounter = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 24, mass: 1.5 } });

	// 3. Act 3: Supporting Information Resolution (5-8s / 300-480 frames)
	const supportReveal = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 18, mass: 1 } });

	// 4. Act 4: Micro-Camera & Ambient breathing (8-10s / 480-600 frames)
	const cameraRotateY = Math.sin((frame / 600) * Math.PI) * 1.5;
	const cameraPushZ = interpolate(frame, [0, 600], [0, 80], { extrapolateRight: 'clamp' });
	const breathingGlow = 0.4 + Math.sin((frame / 90) * Math.PI) * 0.1;

	// McKinsey-grade content mapping
	const targetKPI = 84.6;
	const currentKPIVal = (kpiCounter * targetKPI).toFixed(1);

	// SVG Chart Path calculations
	const chartProgress = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 22, mass: 1.2 } });
	const chartPoints = [
		{ x: 0, y: 180 },
		{ x: 120, y: 150 },
		{ x: 240, y: 190 },
		{ x: 360, y: 80 },
		{ x: 480, y: 100 },
		{ x: 600, y: 30 }
	];

	const pointsStr = chartPoints.map((pt, i) => {
		const drawY = 220 - (220 - pt.y) * chartProgress;
		return `${pt.x},${drawY}`;
	}).join(' ');

	const fillAreaStr = `0,220 ${pointsStr} 600,220`;

	return (
		<AbsoluteFill style={{
			background: '#09090b',
			fontFamily: 'Inter, system-ui, sans-serif',
			color: '#fafafa',
			overflow: 'hidden'
		}}>
			{/* Ambient Radial Background Glow */}
			<div style={{
				position: 'absolute',
				top: '30%',
				left: '50%',
				width: '1000px',
				height: '1000px',
				background: 'radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, rgba(0,0,0,0) 70%)',
				transform: 'translate(-50%, -50%)',
				opacity: breathingGlow,
				pointerEvents: 'none'
			}} />

			{/* Camera Perspective Wrapper */}
			<div style={{
				width: '100%',
				height: '100%',
				transform: `perspective(1800px) rotateY(${cameraRotateY}deg) translateZ(${cameraPushZ}px)`,
				transformOrigin: 'center center',
				display: 'flex',
				flexDirection: 'column',
				padding: 90,
				boxSizing: 'border-box',
				justifyContent: 'space-between'
			}}>

				{/* Header Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					borderBottom: '1px solid rgba(255,255,255,0.06)',
					paddingBottom: 32,
					opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' })
				}}>
					<div>
						<div style={{
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							marginBottom: 10
						}}>
							<span style={{
								padding: '4px 10px',
								background: 'rgba(212, 175, 55, 0.15)',
								color: '#d4af37',
								borderRadius: 20,
								fontSize: 12,
								fontWeight: 700,
								letterSpacing: '0.12em',
								textTransform: 'uppercase'
							}}>
								Confidential Strategy
							</span>
							<span style={{ fontSize: 13, color: '#a1a1aa', letterSpacing: '0.08em' }}>MCKINSEY VALUE INSIGHTS</span>
						</div>
						<h1 style={{
							fontSize: 48,
							fontWeight: 900,
							margin: 0,
							letterSpacing: '-0.03em',
							color: '#fffff0'
						}}>
							Value Creation Architecture
						</h1>
					</div>
					<div style={{ textAlign: 'right', color: '#a1a1aa', fontSize: 14 }}>
						<div style={{ fontWeight: 700, letterSpacing: '0.05em' }}>FY27 TARGET MATRIX</div>
						<div style={{ opacity: 0.6, marginTop: 4 }}>CONTINUOUS SIMULATION</div>
					</div>
				</div>

				{/* Main Body Section */}
				<div style={{
					display: 'flex',
					flex: 1,
					marginTop: 48,
					gap: 64,
					alignItems: 'stretch'
				}}>
					
					{/* Left Column: Strategic Milestones (McKinsey Style) */}
					<div style={{
						width: '35%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						gap: 32,
						position: 'relative'
					}}>
						{/* Vertical Timeline axis line */}
						<div style={{
							position: 'absolute',
							left: 20,
							top: '5%',
							bottom: '5%',
							width: 2,
							background: 'linear-gradient(180deg, #d4af37 0%, rgba(255,255,255,0.06) 100%)',
							opacity: seg1Progress
						}} />

						{/* Milestone 1 */}
						<div style={{
							display: 'flex',
							gap: 24,
							opacity: seg1Progress,
							transform: `translateX(${(1 - seg1Progress) * -20}px)`
						}}>
							<div style={{
								width: 40,
								height: 40,
								borderRadius: '50%',
								background: '#09090b',
								border: '2px solid #d4af37',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 2,
								boxShadow: '0 0 15px rgba(212,175,55,0.2)'
							}}>
								<span style={{ fontSize: 12, fontWeight: 800, color: '#d4af37' }}>01</span>
							</div>
							<div style={{ flex: 1 }}>
								<div style={{ fontSize: 12, fontWeight: 700, color: '#d4af37', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PHASE ONE</div>
								<div style={{ fontSize: 20, fontWeight: 800, color: '#fafafa', marginTop: 4 }}>Synergy Alignment</div>
								<div style={{ fontSize: 14, color: '#a1a1aa', marginTop: 6, lineHeight: 1.4 }}>Unifying operating models to realize architectural cost efficiencies.</div>
							</div>
						</div>

						{/* Milestone 2 */}
						<div style={{
							display: 'flex',
							gap: 24,
							opacity: seg2Progress,
							transform: `translateX(${(1 - seg2Progress) * -20}px)`
						}}>
							<div style={{
								width: 40,
								height: 40,
								borderRadius: '50%',
								background: '#09090b',
								border: '2px solid rgba(255,255,255,0.2)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 2
							}}>
								<span style={{ fontSize: 12, fontWeight: 800, color: '#a1a1aa' }}>02</span>
							</div>
							<div style={{ flex: 1 }}>
								<div style={{ fontSize: 12, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PHASE TWO</div>
								<div style={{ fontSize: 20, fontWeight: 800, color: '#fafafa', marginTop: 4 }}>Operational Scaling</div>
								<div style={{ fontSize: 14, color: '#a1a1aa', marginTop: 6, lineHeight: 1.4 }}>Scaling transaction pipelines with deep automation matrix.</div>
							</div>
						</div>

						{/* Milestone 3 */}
						<div style={{
							display: 'flex',
							gap: 24,
							opacity: seg3Progress,
							transform: `translateX(${(1 - seg3Progress) * -20}px)`
						}}>
							<div style={{
								width: 40,
								height: 40,
								borderRadius: '50%',
								background: '#09090b',
								border: '2px solid rgba(255,255,255,0.2)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 2
							}}>
								<span style={{ fontSize: 12, fontWeight: 800, color: '#a1a1aa' }}>03</span>
							</div>
							<div style={{ flex: 1 }}>
								<div style={{ fontSize: 12, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PHASE THREE</div>
								<div style={{ fontSize: 20, fontWeight: 800, color: '#fafafa', marginTop: 4 }}>Global Optimization</div>
								<div style={{ fontSize: 14, color: '#a1a1aa', marginTop: 6, lineHeight: 1.4 }}>Realizing targeted market share returns in core logistics.</div>
							</div>
						</div>

					</div>

					{/* Right Column: Hero KPI & Curve Area Visualization */}
					<div style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						gap: 32,
						justifyContent: 'center'
					}}>
						
						{/* Hero Card */}
						<div style={{
							background: '#121215',
							border: '1px solid rgba(212,175,55,0.2)',
							borderRadius: 16,
							padding: 40,
							opacity: heroReveal,
							transform: `translateY(${(1 - heroReveal) * 30}px)`,
							boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
						}}>
							<div style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
								<div>
									<div style={{ fontSize: 14, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
										TARGET PORTFOLIO YIELD
									</div>
									<div style={{
										fontSize: 64,
										fontWeight: 900,
										color: '#fafafa',
										marginTop: 10,
										letterSpacing: '-0.03em'
									}}>
										{currentKPIVal}%
									</div>
								</div>
								
								<div style={{
									background: 'rgba(16, 185, 129, 0.1)',
									padding: '6px 12px',
									borderRadius: 20,
									border: '1px solid rgba(16, 185, 129, 0.2)',
									color: '#34d399',
									fontSize: 13,
									fontWeight: 700,
									display: 'flex',
									alignItems: 'center',
									gap: 6
								}}>
									<span>↑</span>
									<span>+18.4% YTD</span>
								</div>
							</div>
						</div>

						{/* Chart Visualization Card */}
						<div style={{
							flex: 1,
							background: '#121215',
							border: '1px solid rgba(255,255,255,0.06)',
							borderRadius: 16,
							padding: 40,
							display: 'flex',
							flexDirection: 'column',
							opacity: supportReveal,
							transform: `translateY(${(1 - supportReveal) * 20}px)`,
							boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
						}}>
							<div style={{ fontSize: 14, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.05em', marginBottom: 24 }}>
								PERFORMANCE GROWTH INDEX
							</div>

							<div style={{ flex: 1, position: 'relative' }}>
								<svg viewBox="0 0 600 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
									<defs>
										<linearGradient id="glowAreaGrad" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
											<stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
										</linearGradient>
									</defs>

									{/* Background Gridlines */}
									<line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
									<line x1="0" y1="110" x2="600" y2="110" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
									<line x1="0" y1="180" x2="600" y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />

									{/* Area Path */}
									<polygon fill="url(#glowAreaGrad)" points={fillAreaStr} />

									{/* Stroke Line */}
									<polyline
										fill="none"
										stroke="#d4af37"
										strokeWidth="3.5"
										points={pointsStr}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>

									{/* Node Circles */}
									{chartPoints.map((pt, i) => {
										const drawY = 220 - (220 - pt.y) * chartProgress;
										return (
											<circle key={i} cx={pt.x} cy={drawY} r="4" fill="#09090b" stroke="#d4af37" strokeWidth="2.5" />
										);
									})}
								</svg>
							</div>

							{/* Chart Legends */}
							<div style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: 16,
								fontSize: 12,
								color: '#a1a1aa',
								fontWeight: 600,
								letterSpacing: '0.05em'
							}}>
								<span>INITIATION</span>
								<span>OPERATIONAL ALPHA</span>
								<span>SCALE PHASE</span>
								<span>MATURITY</span>
							</div>
						</div>

					</div>

				</div>

				{/* Footer Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: 12,
					color: '#a1a1aa',
					borderTop: '1px solid rgba(255,255,255,0.06)',
					paddingTop: 24,
					marginTop: 32,
					opacity: interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp' })
				}}>
					<span>MCKINSEY VALUE INC. PARTNERS © 2026</span>
					<span>SIMULATED OUTCOME ONLY — NOT ACTUAL ADVICE</span>
				</div>

			</div>
		</AbsoluteFill>
	);
};
