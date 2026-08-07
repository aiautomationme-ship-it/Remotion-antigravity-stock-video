import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 04: Enterprise Growth Story
 * Deep Blueprint/CAD style showing cause-and-effect branching.
 * Colors: Deep Blueprint Blue, Neon Cyan lines, White highlights.
 */
export const Concept04_GrowthStory: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Act 1: Initial Central Node (0-2s)
	const centerNode = spring({ frame, fps, config: { damping: 15, mass: 0.8 } });

	// Act 2: Branching lines & Subnodes (2-5s)
	const path1Draw = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 18, mass: 1 } });
	const path2Draw = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 18, mass: 1 } });
	const subNode1 = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 15, mass: 0.7 } });
	const subNode2 = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 15, mass: 0.7 } });

	// Act 3: Secondary endpoints & metrics resolve (5-8s)
	const endpoints = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 20, mass: 1.1 } });

	// Act 4: Perspective Camera Orbit (8-10s)
	const camX = interpolate(frame, [0, 600], [-30, 30]);
	const camY = interpolate(frame, [0, 600], [10, -10]);

	return (
		<AbsoluteFill style={{
			background: '#021830',
			fontFamily: '"IBM Plex Mono", monospace',
			color: '#ffffff',
			overflow: 'hidden'
		}}>
			{/* CAD Blueprint Grid */}
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.02) 1px, transparent 1px)',
				backgroundSize: '30px 30px',
				pointerEvents: 'none'
			}} />

			{/* Camera Perspective wrapper */}
			<div style={{
				width: '100%',
				height: '100%',
				padding: 80,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				transform: `perspective(1600px) rotateX(${camY}deg) rotateY(${camX}deg)`,
				transformOrigin: 'center center'
			}}>

				{/* Header Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
					paddingBottom: 24,
					opacity: centerNode
				}}>
					<div>
						<div style={{ fontSize: 13, fontWeight: 700, color: '#00f0ff', letterSpacing: '0.12em' }}>
							STRATEGIC OBJECTIVE // CAUSE & EFFECT PIPELINE
						</div>
						<h1 style={{ fontSize: 36, fontWeight: 800, margin: '6px 0 0 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
							Value Creation Map & Operational Growth Tree
						</h1>
					</div>
					<div style={{ fontSize: 14, color: '#86868b', fontWeight: 600 }}>
						ENGINEERING BLUEPRINT NODE v1.0
					</div>
				</div>

				{/* Horizontal Flow Chart Container */}
				<div style={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					marginTop: 48
				}}>
					
					{/* SVG Connector Lines */}
					<svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
						{/* Branch 1 Line */}
						<path
							d="M 150,150 L 350,70"
							fill="none"
							stroke="#00f0ff"
							strokeWidth="2"
							strokeDasharray="300"
							strokeDashoffset={300 - path1Draw * 300}
						/>
						{/* Branch 2 Line */}
						<path
							d="M 150,150 L 350,230"
							fill="none"
							stroke="#00f0ff"
							strokeWidth="2"
							strokeDasharray="300"
							strokeDashoffset={300 - path2Draw * 300}
						/>
						{/* Endpoint lines */}
						<path
							d="M 450,70 L 650,70 M 450,230 L 650,230"
							fill="none"
							stroke="rgba(255,255,255,0.2)"
							strokeWidth="1.5"
							strokeDasharray="200"
							strokeDashoffset={200 - endpoints * 200}
						/>
					</svg>

					{/* Step 1: Central Objective Node (left-aligned center) */}
					<div style={{
						position: 'absolute',
						left: 50,
						width: 200,
						background: '#021830',
						border: '2px solid #00f0ff',
						padding: 24,
						opacity: centerNode,
						transform: `scale(${centerNode})`,
						boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)'
					}}>
						<div style={{ fontSize: 11, color: '#00f0ff', fontWeight: 700 }}>START OBJECTIVE</div>
						<div style={{ fontSize: 16, fontWeight: 800, marginTop: 8 }}>Capital Investment</div>
					</div>

					{/* Step 2: Intermediate Branching Nodes (center-aligned) */}
					{/* Branch 1 */}
					<div style={{
						position: 'absolute',
						left: 360,
						top: 60,
						width: 220,
						background: '#021830',
						border: '1.5px solid rgba(0, 240, 255, 0.4)',
						padding: 20,
						opacity: subNode1,
						transform: `scale(${subNode1})`
					}}>
						<div style={{ fontSize: 11, color: '#86868b' }}>BRANCH ALPHA</div>
						<div style={{ fontSize: 15, fontWeight: 800, marginTop: 6 }}>Operational Scaling</div>
					</div>

					{/* Branch 2 */}
					<div style={{
						position: 'absolute',
						left: 360,
						bottom: 60,
						width: 220,
						background: '#021830',
						border: '1.5px solid rgba(0, 240, 255, 0.4)',
						padding: 20,
						opacity: subNode2,
						transform: `scale(${subNode2})`
					}}>
						<div style={{ fontSize: 11, color: '#86868b' }}>BRANCH BETA</div>
						<div style={{ fontSize: 15, fontWeight: 800, marginTop: 6 }}>Marketing Reach</div>
					</div>

					{/* Step 3: Resolving Endpoints (right-aligned) */}
					<div style={{
						position: 'absolute',
						right: 50,
						width: 240,
						display: 'flex',
						flexDirection: 'column',
						gap: 32,
						opacity: endpoints,
						transform: `translateX(${(1 - endpoints) * 20}px)`
					}}>
						<div style={{
							background: '#021830',
							border: '1.5px dashed rgba(255,255,255,0.2)',
							padding: 20
						}}>
							<div style={{ fontSize: 11, color: '#86868b' }}>END TARGET 01</div>
							<div style={{ fontSize: 18, fontWeight: 800, color: '#00f0ff', marginTop: 4 }}>+42.5% Profit</div>
						</div>
						<div style={{
							background: '#021830',
							border: '1.5px dashed rgba(255,255,255,0.2)',
							padding: 20
						}}>
							<div style={{ fontSize: 11, color: '#86868b' }}>END TARGET 02</div>
							<div style={{ fontSize: 18, fontWeight: 800, color: '#00f0ff', marginTop: 4 }}>18.2M Users</div>
						</div>
					</div>

				</div>

				{/* Bottom Footer Section */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '1px solid rgba(0, 240, 255, 0.2)',
					paddingTop: 20,
					marginTop: 32,
					fontSize: 12,
					color: '#86868b'
				}}>
					<span>AUTODESK CAD PROCESS ENGINE MATRIX v9.4</span>
					<span>CALCULATION CONFIRMED</span>
				</div>

			</div>
		</AbsoluteFill>
	);
};
