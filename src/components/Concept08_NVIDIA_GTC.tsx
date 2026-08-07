import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 08: NVIDIA GTC 2027 Keynote Style
 * - Deep matte black, graphite gray, NVIDIA Green (#76B900), White typography.
 * - Cinematic camera, engineered motion, no glassmorphism or gaming HUDs.
 * - Scene 1: Green energy line.
 * - Scene 2: Network of GPU nodes.
 * - Scene 3: Performance visualization.
 * - Scene 4: Hero metric convergence.
 */
export const Concept08_NVIDIA_GTC: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const nvidiaGreen = '#76B900';
	const graphite = '#1A1A1A';
	const darkGraphite = '#0D0D0D';
	const textWhite = '#FFFFFF';
	const textGray = '#888888';

	// --- CAMERA MOVES ---
	// Starts close on the line, pulls back to see the network, pulls further for the data, then centers for hero.
	const camZ1 = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 40, mass: 3 } }); // Pull back for network
	const camZ2 = spring({ frame: Math.max(0, frame - 280), fps, config: { damping: 50, mass: 4 } }); // Pull back for data
	const camZ3 = spring({ frame: Math.max(0, frame - 420), fps, config: { damping: 40, mass: 3 } }); // Settle for hero

	const scale = interpolate(camZ1, [0, 1], [2.5, 1]) * interpolate(camZ2, [0, 1], [1, 0.7]) * interpolate(camZ3, [0, 1], [1, 1.1]);
	const translateY = interpolate(camZ2, [0, 1], [0, 150]) * interpolate(camZ3, [0, 1], [1, 0]);

	// --- SCENE 1: Energy Line (0 - 2s) ---
	const lineDraw = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 30, mass: 1.5 } });
	const lineLength = 2000;
	const lineDashoffset = interpolate(lineDraw, [0, 1], [lineLength, 0]);
	const lineOpacity = interpolate(frame, [180, 240], [1, 0.3], { extrapolateRight: 'clamp' }); // Dims later

	// --- SCENE 2: GPU Network (2 - 4s) ---
	const networkReveal = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 25, mass: 2 } });
	const pathDraw = interpolate(networkReveal, [0, 1], [1000, 0]);
	const nodePop = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 14 } });

	// --- SCENE 3: Performance Visualization (4 - 7s) ---
	const dataReveal = spring({ frame: Math.max(0, frame - 260), fps, config: { damping: 20, mass: 1.5 } });
	const dataOpacity = interpolate(frame, [400, 440], [1, 0.1], { extrapolateRight: 'clamp' }); // Dims for hero
	const bar1Width = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 20 } });
	const bar2Width = spring({ frame: Math.max(0, frame - 320), fps, config: { damping: 20 } });
	const bar3Width = spring({ frame: Math.max(0, frame - 340), fps, config: { damping: 20 } });

	// --- SCENE 4: Hero Metric (7 - 10s) ---
	const heroReveal = spring({ frame: Math.max(0, frame - 440), fps, config: { damping: 25, mass: 1.5 } });
	const heroY = interpolate(heroReveal, [0, 1], [40, 0]);

	return (
		<AbsoluteFill style={{
			backgroundColor: '#050505', // Deep matte black
			fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
			color: textWhite,
			overflow: 'hidden',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		}}>
			
			{/* Master Camera Wrapper */}
			<div style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				transform: `scale(${scale}) translateY(${translateY}px)`,
				transformOrigin: 'center center',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}>
				
				{/* SCENE 1 & 2: The Network */}
				<div style={{ position: 'absolute', width: 1200, height: 600 }}>
					<svg width="100%" height="100%" viewBox="0 0 1200 600" style={{ overflow: 'visible' }}>
						
						{/* Main Energy Line (Scene 1) */}
						<line 
							x1="-400" y1="300" x2="1600" y2="300" 
							stroke={nvidiaGreen} 
							strokeWidth="1.5" 
							strokeDasharray={lineLength}
							strokeDashoffset={lineDashoffset}
							opacity={lineOpacity}
						/>

						{/* Network Paths (Scene 2) */}
						<g stroke={nvidiaGreen} strokeWidth="1" fill="none" opacity={networkReveal * lineOpacity} strokeDasharray={1000} strokeDashoffset={pathDraw}>
							<path d="M 600,300 L 400,150 L 200,150" />
							<path d="M 600,300 L 800,150 L 1000,150" />
							<path d="M 600,300 L 400,450 L 200,450" />
							<path d="M 600,300 L 800,450 L 1000,450" />
							
							<path d="M 400,150 L 300,50" />
							<path d="M 800,150 L 900,50" />
							<path d="M 400,450 L 300,550" />
							<path d="M 800,450 L 900,550" />
						</g>

						{/* GPU Nodes (Scene 2) */}
						<g opacity={lineOpacity}>
							{[
								[600,300, 16], [400,150, 12], [800,150, 12], [400,450, 12], [800,450, 12],
								[200,150, 8], [1000,150, 8], [200,450, 8], [1000,450, 8],
								[300,50, 8], [900,50, 8], [300,550, 8], [900,550, 8]
							].map((pos, i) => (
								<g key={i} transform={`scale(${nodePop})`} style={{ transformOrigin: `${pos[0]}px ${pos[1]}px` }}>
									<circle cx={pos[0]} cy={pos[1]} r={pos[2]} fill={darkGraphite} stroke={nvidiaGreen} strokeWidth={pos[2] === 16 ? 3 : 1.5} />
								</g>
							))}
						</g>
					</svg>
				</div>

				{/* SCENE 3: Performance Visualization */}
				<div style={{
					position: 'absolute',
					top: -200,
					width: 1400,
					display: 'flex',
					justifyContent: 'space-between',
					opacity: dataReveal * dataOpacity
				}}>
					{/* Left Data Column */}
					<div style={{ width: 400 }}>
						<div style={{ fontSize: 12, color: textGray, letterSpacing: '0.2em', marginBottom: 20 }}>TENSOR THROUGHPUT</div>
						
						{/* Bar 1 */}
						<div style={{ marginBottom: 20 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
								<span>FP16 INFERENCE</span>
								<span>{(interpolate(bar1Width, [0, 1], [0, 84])).toFixed(1)}K</span>
							</div>
							<div style={{ width: '100%', height: 2, background: graphite }}>
								<div style={{ width: `${bar1Width * 84}%`, height: '100%', background: nvidiaGreen }} />
							</div>
						</div>

						{/* Bar 2 */}
						<div style={{ marginBottom: 20 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
								<span>FP8 TRAINING</span>
								<span>{(interpolate(bar2Width, [0, 1], [0, 96])).toFixed(1)}K</span>
							</div>
							<div style={{ width: '100%', height: 2, background: graphite }}>
								<div style={{ width: `${bar2Width * 96}%`, height: '100%', background: nvidiaGreen }} />
							</div>
						</div>

						{/* Bar 3 */}
						<div>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
								<span>INT8 EFFICIENCY</span>
								<span>{(interpolate(bar3Width, [0, 1], [0, 99.7])).toFixed(1)}%</span>
							</div>
							<div style={{ width: '100%', height: 2, background: graphite }}>
								<div style={{ width: `${bar3Width * 99.7}%`, height: '100%', background: textWhite }} />
							</div>
						</div>
					</div>

					{/* Right Data Column */}
					<div style={{ width: 350, textAlign: 'right' }}>
						<div style={{ fontSize: 12, color: textGray, letterSpacing: '0.2em', marginBottom: 20 }}>CLUSTER LATENCY</div>
						<div style={{ fontSize: 48, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 10 }}>
							{(interpolate(dataReveal, [0, 1], [150, 1.2])).toFixed(2)} <span style={{ fontSize: 20, color: textGray }}>μs</span>
						</div>
						<div style={{ width: '100%', height: 1, background: graphite, marginBottom: 20 }} />
						<div style={{ fontSize: 14, color: textWhite }}>INTER-NODE FABRIC SYNC</div>
						<div style={{ fontSize: 14, color: textGray, marginTop: 4 }}>99.999% RELIABILITY</div>
					</div>
				</div>

			</div>

			{/* SCENE 4: Hero Metric (Static center, overrides camera) */}
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				opacity: heroReveal,
				transform: `translateY(${heroY}px)`
			}}>
				<h1 style={{
					fontSize: 160,
					fontWeight: 500,
					margin: 0,
					letterSpacing: '-0.04em',
					color: textWhite,
					textShadow: `0 0 80px rgba(255,255,255,0.1)`
				}}>
					42.8 PFLOPS
				</h1>
				<div style={{
					marginTop: 30,
					fontSize: 24,
					color: nvidiaGreen,
					letterSpacing: '0.2em',
					fontWeight: 600,
					textTransform: 'uppercase'
				}}>
					12,480 AI Accelerators / 98.7% GPU Utilization
				</div>
			</div>

			{/* Footer overlay */}
			<div style={{
				position: 'absolute',
				bottom: 50,
				width: '100%',
				padding: '0 80px',
				display: 'flex',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
				fontSize: 12,
				color: '#444444',
				fontFamily: 'monospace',
				letterSpacing: '0.1em'
			}}>
				<div>NVIDIA COMPUTE ARCHITECTURE 2027</div>
				<div>HPC_CLUSTER_01 // SECURE ENCLAVE</div>
			</div>

		</AbsoluteFill>
	);
};
