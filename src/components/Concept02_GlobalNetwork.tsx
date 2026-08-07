import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 02: Global Business Intelligence Network
 * Bloomberg Intelligence redesigned by Apple. 
 * Colors: Deep Charcoal, Monospace Amber, Emerald Alerts, Crisp CAD Grids.
 */
export const Concept02_GlobalNetwork: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Act 1: Technical Grid & Map Outlines (0-2s)
	const lineDrawing = spring({ frame, fps, config: { damping: 20, mass: 0.9 } });

	// Act 2: Main Operational Metrics Snap (2-5s)
	const metricSnap = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 15, mass: 0.8 } });
	const counterProgress = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 22, mass: 1 } });

	// Act 3: Staggered Node Alerts (5-8s)
	const node1Progress = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 18, mass: 1 } });
	const node2Progress = spring({ frame: Math.max(0, frame - 315), fps, config: { damping: 18, mass: 1 } });
	const node3Progress = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 18, mass: 1 } });

	// Act 4: Micro Broadcast Horizontal Camera Pan
	const camX = interpolate(frame, [0, 600], [20, -20]);

	// Yield and Risk Metrics
	const currentThroughput = (counterProgress * 98.42).toFixed(2);

	return (
		<AbsoluteFill style={{
			background: '#05070a',
			fontFamily: '"IBM Plex Mono", monospace',
			color: '#ffffff',
			overflow: 'hidden'
		}}>
			{/* Technical Grid Overlay */}
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
				backgroundSize: '40px 40px',
				pointerEvents: 'none'
			}} />

			{/* Camera translation container */}
			<div style={{
				width: '100%',
				height: '100%',
				padding: 80,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				transform: `translateX(${camX}px)`,
				transformOrigin: 'center center'
			}}>

				{/* Header Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					borderBottom: '1px solid rgba(255,255,255,0.08)',
					paddingBottom: 24,
					opacity: interpolate(frame, [0, 20], [0, 1])
				}}>
					<div>
						<div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', letterSpacing: '0.12em' }}>
							LIVE METRIC FEED // GLOBAL OPERATIONS
						</div>
						<h1 style={{ fontSize: 36, fontWeight: 800, margin: '6px 0 0 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
							Global Distribution & Supply Network
						</h1>
					</div>
					<div style={{ fontSize: 14, color: '#f59e0b', fontWeight: 600 }}>
						NOC CONTROL ROOM: ACTIVE
					</div>
				</div>

				{/* Main Body */}
				<div style={{
					display: 'flex',
					flex: 1,
					marginTop: 48,
					gap: 48,
					alignItems: 'stretch'
				}}>
					
					{/* Left Section: Map Nodes Status Feed */}
					<div style={{
						width: '38%',
						display: 'flex',
						flexDirection: 'column',
						gap: 24,
						justifyContent: 'center'
					}}>
						<div style={{ fontSize: 12, fontWeight: 700, color: '#86868b', letterSpacing: '0.08em' }}>ACTIVE LOGISTICS SITES</div>

						{/* Node 1 */}
						<div style={{
							background: '#0d1117',
							border: '1px solid rgba(255,255,255,0.05)',
							padding: 24,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							opacity: node1Progress,
							transform: `translateX(${(1 - node1Progress) * -15}px)`
						}}>
							<div>
								<div style={{ fontSize: 14, fontWeight: 700 }}>US-EAST PRIMARY GATEWAY</div>
								<div style={{ fontSize: 12, color: '#86868b', marginTop: 4 }}>NY PORT AUTHORITY NODE</div>
							</div>
							<div style={{ color: '#22c55e', fontWeight: 700, fontSize: 13 }}>[ ONLINE ]</div>
						</div>

						{/* Node 2 */}
						<div style={{
							background: '#0d1117',
							border: '1px solid rgba(255,255,255,0.05)',
							padding: 24,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							opacity: node2Progress,
							transform: `translateX(${(1 - node2Progress) * -15}px)`
						}}>
							<div>
								<div style={{ fontSize: 14, fontWeight: 700 }}>EU-CENTRAL FLIGHT ROTATION</div>
								<div style={{ fontSize: 12, color: '#86868b', marginTop: 4 }}>FRANKFURT EDDF TERMINAL</div>
							</div>
							<div style={{ color: '#22c55e', fontWeight: 700, fontSize: 13 }}>[ ONLINE ]</div>
						</div>

						{/* Node 3 */}
						<div style={{
							background: '#0d1117',
							border: '1px solid rgba(255,255,255,0.05)',
							padding: 24,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							opacity: node3Progress,
							transform: `translateX(${(1 - node3Progress) * -15}px)`
						}}>
							<div>
								<div style={{ fontSize: 14, fontWeight: 700 }}>APAC ROUTING CONTAINER</div>
								<div style={{ fontSize: 12, color: '#86868b', marginTop: 4 }}>SINGAPORE PORT MATRIX</div>
							</div>
							<div style={{ color: '#f59e0b', fontWeight: 700, fontSize: 13 }}>[ DELAY WARNING ]</div>
						</div>
					</div>

					{/* Right Section: Core KPI Snap and World Map outlines */}
					<div style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						gap: 32,
						justifyContent: 'center'
					}}>
						
						{/* Performance Snap Card */}
						<div style={{
							background: '#0d1117',
							border: '1px solid rgba(34,197,94,0.2)',
							padding: 32,
							opacity: metricSnap,
							transform: `translateY(${(1 - metricSnap) * 20}px)`
						}}>
							<div style={{ fontSize: 12, color: '#86868b', letterSpacing: '0.08em' }}>TOTAL SYSTEM THROUGHPUT</div>
							<div style={{ fontSize: 44, fontWeight: 800, color: '#22c55e', marginTop: 10 }}>
								{currentThroughput}% EFFICIENCY
							</div>
						</div>

						{/* Vector connection Grid representation */}
						<div style={{
							flex: 1,
							background: '#0d1117',
							border: '1px solid rgba(255,255,255,0.05)',
							padding: 32,
							display: 'flex',
							flexDirection: 'column',
							position: 'relative'
						}}>
							<div style={{ fontSize: 12, color: '#86868b', letterSpacing: '0.05em', marginBottom: 20 }}>
								DATA CONCURRENCY ROUTING GRAPH
							</div>

							<div style={{ flex: 1, position: 'relative' }}>
								<svg viewBox="0 0 500 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
									{/* Drawing connections lines */}
									<path
										d="M 20,60 L 120,30 L 250,90 L 380,40 L 480,60"
										fill="none"
										stroke="rgba(34,197,94,0.4)"
										strokeWidth="2"
										strokeDasharray="400"
										strokeDashoffset={400 - lineDrawing * 400}
									/>
									<path
										d="M 20,60 L 250,90 M 120,30 L 380,40"
										fill="none"
										stroke="rgba(245,158,11,0.2)"
										strokeWidth="1.5"
										strokeDasharray="300"
										strokeDashoffset={300 - lineDrawing * 300}
									/>

									{/* Coordinate nodes */}
									<circle cx="20" cy="60" r="4" fill="#22c55e" />
									<circle cx="120" cy="30" r="4" fill="#22c55e" />
									<circle cx="250" cy="90" r="4" fill="#f59e0b" />
									<circle cx="380" cy="40" r="4" fill="#22c55e" />
									<circle cx="480" cy="60" r="4" fill="#22c55e" />
								</svg>
							</div>
						</div>

					</div>

				</div>

				{/* Bottom Footer Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '1px solid rgba(255,255,255,0.08)',
					paddingTop: 20,
					marginTop: 32,
					fontSize: 12,
					color: '#86868b'
				}}>
					<span>BLOOMBERG INTELLIGENCE SYSTEM NETWORK v27</span>
					<span>LATENCY STATUS: OK</span>
				</div>

			</div>
		</AbsoluteFill>
	);
};
