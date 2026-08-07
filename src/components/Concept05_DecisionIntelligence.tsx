import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * 2027 Enterprise AI Platform Product Film
 * Evolved design principles:
 * - Silver gradient editorial typography.
 * - Snap-aligning tactile network cards.
 * - Dynamic SVG pulse particle traversing the compute spline path.
 * - Restrained micro-panning camera matrix.
 */
export const Concept05_DecisionIntelligence: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Act 1: Structural layout reveal (0-2s / 0-120 frames)
	const gridReveal = spring({ frame, fps, config: { damping: 22, mass: 1.1 } });
	const textTranslateY = interpolate(gridReveal, [0, 1], [10, 0]);

	// Act 2: Snapping connectors & Spline pulse (2-5s / 120-300 frames)
	const pathDraw = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 18, mass: 1 } });
	const nodesReveal = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 15, mass: 0.7 } });
	
	// Particle position along the path (interpolated over timeline)
	const particleProgress = interpolate(Math.max(0, frame - 150), [0, 300], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp'
	});

	// Act 3: Secondary metric stamps resolve (5-8s / 300-480 frames)
	const statsReveal = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 20, mass: 1 } });

	// Act 4: Micro 3D camera pan & glow breathing (8-10s)
	const camX = interpolate(frame, [0, 600], [-20, 20]);
	const camY = interpolate(frame, [0, 600], [6, -6]);
	const glowPulse = 0.5 + Math.sin((frame / 90) * Math.PI) * 0.08;

	// Bezier curve calculations for spline pulse
	// M 20,100 Q 120,40 250,110 T 500,20
	// We'll approximate the coordinate position of the particle using quad bezier equations
	const getBezierPoint = (t: number) => {
		// First segment: P0=(20,100), P1=(120,40), P2=(250,110)
		// Second segment: P0=(250,110), P1=(380,180) -- computed reflection, P2=(500,20)
		if (t <= 0.5) {
			const nt = t * 2;
			const x = (1 - nt) * (1 - nt) * 20 + 2 * (1 - nt) * nt * 120 + nt * nt * 250;
			const y = (1 - nt) * (1 - nt) * 100 + 2 * (1 - nt) * nt * 40 + nt * nt * 110;
			return { x, y };
		} else {
			const nt = (t - 0.5) * 2;
			// Reflected control point: P1 = 2 * P2_prev - P1_prev = 2*(250) - 120 = 380, Y = 2*(110) - 40 = 180
			const x = (1 - nt) * (1 - nt) * 250 + 2 * (1 - nt) * nt * 380 + nt * nt * 500;
			const y = (1 - nt) * (1 - nt) * 110 + 2 * (1 - nt) * nt * 180 + nt * nt * 20;
			return { x, y };
		}
	};

	const pulseCoord = getBezierPoint(particleProgress);

	return (
		<AbsoluteFill style={{
			background: '#040608', // Vercel Midnight
			fontFamily: 'Inter, -apple-system, sans-serif',
			color: '#ffffff',
			overflow: 'hidden'
		}}>
			{/* Technical Dot Matrix Grid */}
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundImage: 'radial-gradient(rgba(255,255,255,0.015) 1.2px, transparent 1.2px)',
				backgroundSize: '24px 24px',
				pointerEvents: 'none'
			}} />

			{/* Soft Ambient Radial Glow */}
			<div style={{
				position: 'absolute',
				top: '40%',
				left: '60%',
				width: '1000px',
				height: '1000px',
				background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(0,0,0,0) 70%)',
				transform: 'translate(-50%, -50%)',
				opacity: glowPulse,
				pointerEvents: 'none'
			}} />

			{/* 3D Camera translate box */}
			<div style={{
				width: '100%',
				height: '100%',
				padding: 95,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				transform: `perspective(1800px) rotateX(${camY}deg) rotateY(${camX}deg)`,
				transformOrigin: 'center center'
			}}>

				{/* Header Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottom: '1px solid rgba(255,255,255,0.05)',
					paddingBottom: 28,
					opacity: gridReveal
				}}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 12px #8b5cf6' }} />
						<span style={{ fontSize: 13, fontWeight: 700, color: '#8b5cf6', letterSpacing: '0.12em' }}>
							COGNITIVE ROUTING MATRIX // AGENTIC SIMULATION
						</span>
					</div>
					<div style={{ fontSize: 13, color: '#06b6d4', fontWeight: 800, letterSpacing: '0.08em' }}>
						MODEL PIPELINE v4.2
					</div>
				</div>

				{/* Center Content Section */}
				<div style={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					gap: 80,
					marginTop: 48
				}}>
					
					{/* Left side: Editorial Statement (45% Width) */}
					<div style={{
						width: '45%',
						opacity: gridReveal,
						transform: `translateY(${textTranslateY}px)`
					}}>
						{/* Silver metallic-style text */}
						<h2 style={{
							fontSize: 70,
							fontWeight: 800,
							letterSpacing: '-0.04em',
							lineHeight: 1.05,
							margin: 0,
							background: 'linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent'
						}}>
							Automate reasoning at scale.
						</h2>
						<p style={{
							fontSize: 21,
							lineHeight: 1.5,
							color: '#94a3b8',
							marginTop: 24,
							fontWeight: 400,
							letterSpacing: '-0.01em'
						}}>
							Orchestrate millions of autonomous agent nodes across global pipelines with sub-millisecond response latency.
						</p>

						{/* Snapping Tactile Badge */}
						<div style={{
							display: 'inline-flex',
							background: '#0a0d14',
							padding: '8px 16px',
							borderRadius: 4,
							marginTop: 32,
							alignItems: 'center',
							gap: 10,
							border: '1px solid rgba(255,255,255,0.05)',
							boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
							opacity: nodesReveal,
							transform: `scale(${nodesReveal})`
						}}>
							<div style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 8px #06b6d4' }} />
							<span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', fontFamily: 'monospace' }}>
								COMPUTE CAPACITY: 12.8 TFLOPS
							</span>
						</div>
					</div>

					{/* Right side: Spline Connection canvas (55% Width) */}
					<div style={{
						flex: 1,
						height: '80%',
						background: '#070a13',
						border: '1px solid rgba(139,92,246,0.15)',
						borderRadius: 24,
						padding: 40,
						boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: pathDraw,
						transform: `translateY(${(1 - pathDraw) * 15}px)`
					}}>
						
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em' }}>
								DATA CONCURRENCY ROUTING GRAPH
							</span>
							<span style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6' }}>
								ACTIVE FEED
							</span>
						</div>

						{/* Spline area */}
						<div style={{ flex: 1, position: 'relative', marginTop: 32 }}>
							<svg viewBox="0 0 500 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
								<defs>
									<linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
										<stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
									</linearGradient>
								</defs>

								{/* Grid guide */}
								<line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4 4" />

								{/* Area fill */}
								<path
									d={`M 20,100 Q 120,40 250,110 T 500,20 L 500,160 L 20,160 Z`}
									fill="url(#glowGrad)"
									opacity={pathDraw}
								/>

								{/* Core Spline line */}
								<path
									d="M 20,100 Q 120,40 250,110 T 500,20"
									fill="none"
									stroke="#8b5cf6"
									strokeWidth="3.5"
									strokeLinecap="round"
									strokeDasharray="400"
									strokeDashoffset={400 - pathDraw * 400}
								/>

								{/* Snapping nodes */}
								<circle cx="20" cy="100" r="4" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2.5" opacity={nodesReveal} />
								<circle cx="120" cy="40" r="4" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2.5" opacity={nodesReveal} />
								<circle cx="250" cy="110" r="4" fill="#ffffff" stroke="#06b6d4" strokeWidth="2.5" opacity={nodesReveal} />
								<circle cx="380" cy="80" r="4" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2.5" opacity={nodesReveal} />
								<circle cx="500" cy="20" r="4" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2.5" opacity={nodesReveal} />

								{/* Traversing spline particle */}
								{particleProgress > 0 && particleProgress < 1 && (
									<circle
										cx={pulseCoord.x}
										cy={pulseCoord.y}
										r="6"
										fill="#06b6d4"
										filter="drop-shadow(0 0 8px #06b6d4)"
									/>
								)}
							</svg>
						</div>

					</div>

				</div>

				{/* Bottom Footer Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '1px solid rgba(255,255,255,0.05)',
					paddingTop: 24,
					marginTop: 32,
					fontSize: 12,
					fontWeight: 600,
					color: '#94a3b8',
					opacity: statsReveal,
					transform: `translateY(${(1 - statsReveal) * 10}px)`
				}}>
					<span>OPENAI COMPUTE DESIGN CONTEXT © 2027</span>
					<span>LATENCY STATUS: GUARANTEED</span>
				</div>

			</div>
		</AbsoluteFill>
	);
};
