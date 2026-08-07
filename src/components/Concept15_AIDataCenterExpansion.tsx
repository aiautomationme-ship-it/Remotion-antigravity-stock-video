import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 15: Global AI Data Center Expansion
 * (NVIDIA GTC / Google Cloud Infrastructure / McKinsey Style)
 * 
 * Creative Director Pre-Render Evaluation:
 * Pass: Feels like a GTC 2027 keynote opener. ZERO UI widgets, ZERO dashboard cards.
 * 
 * Pipeline:
 * 1. Narrative: Hyperscale compute clusters expand from isolated pods into an 800Gbps optical backbone unlocking 5.4 GW of AI power.
 * 2. Visual Metaphor: "The Optical Backbone Ring" — Interconnected high-density compute nodes with pulse waves across a matte obsidian canvas.
 * 3. Color Palette: Matte Obsidian (#060709), Crisp White (#FFFFFF), NVIDIA Green (#76B900), Slate Gray (#475569).
 * 4. Hierarchy:
 *    - L1 Hero: "5.4 GW" (96px NVIDIA Green)
 *    - L2 Heading: "Hyperscale Optical Interconnect & Power Allocation" (44px Serif)
 *    - L3 Context: "Global AI data center capacity expanded by 340% to support trillion-parameter model training."
 *    - L5 Metadata: "NVIDIA & GOOGLE CLOUD // GLOBAL INFRASTRUCTURE REPORT 2027"
 */
export const Concept15_AIDataCenterExpansion: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Palette
	const bg = '#060709'; // Matte Obsidian
	const textWhite = '#FFFFFF';
	const nvidiaGreen = '#76B900'; // AI Acceleration Accent
	const slate = '#475569'; // Structural Grid
	const muted = '#94A3B8'; // Metadata text

	// Timelines
	// 0-2s: Environment & Editorial Headline Reveal
	const envReveal = spring({ frame, fps, config: { damping: 40, mass: 2 } });
	const textSlide = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 30, mass: 1.5 } });
	const textY = interpolate(textSlide, [0, 1], [30, 0]);

	// 2-6s: The Optical Backbone Vector Ring Draws
	const ringProgress = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 50, mass: 3, stiffness: 18 } });
	const pathLength = 2200;
	const pathDashoffset = interpolate(ringProgress, [0, 1], [pathLength, 0]);

	// Optical Pulse Waves along the backbone
	const pulsePos = (frame * 6) % 900;

	// Node activations (Data Centers)
	const node1Pop = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 20 } });
	const node2Pop = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 20 } });
	const node3Pop = spring({ frame: Math.max(0, frame - 220), fps, config: { damping: 20 } });

	// 5-8s: Hero Metric Pop
	const heroPop = spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 22, mass: 1 } });
	const heroY = interpolate(heroPop, [0, 1], [30, 0]);

	// Master slow camera pan & scale
	const camScale = interpolate(frame, [0, 600], [1, 1.05]);
	const camPanX = interpolate(frame, [0, 600], [0, -15]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			color: textWhite,
			overflow: 'hidden'
		}}>
			{/* Master Camera Wrapper */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, bottom: 0,
				transform: `scale(${camScale}) translateX(${camPanX}px)`,
				transformOrigin: 'center center',
				display: 'flex',
				flexDirection: 'column',
				padding: '90px 110px',
				boxSizing: 'border-box'
			}}>

				{/* Top Header: Metadata (L5) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					opacity: envReveal,
					borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
					paddingBottom: 24,
					marginBottom: 48
				}}>
					<div style={{
						fontSize: 11, // L5
						fontWeight: 600,
						letterSpacing: '0.2em',
						color: nvidiaGreen,
						textTransform: 'uppercase'
					}}>
						NVIDIA & GOOGLE CLOUD // INFRASTRUCTURE REPORT 2027
					</div>
					<div style={{
						fontSize: 11,
						color: muted,
						letterSpacing: '0.1em'
					}}>
						VOL. 14 — HYPERSCALE CAPABILITY
					</div>
				</div>

				{/* Center Stage: Narrative Layout */}
				<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

					{/* Left Column: Editorial Narrative (40% width) */}
					<div style={{
						width: '40%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: textSlide,
						transform: `translateY(${textY}px)`,
						zIndex: 10
					}}>
						<div>
							{/* L2 Main Headline */}
							<h1 style={{
								fontFamily: 'Georgia, serif',
								fontSize: 44, // L2
								fontWeight: 400,
								lineHeight: 1.25,
								letterSpacing: '-0.02em',
								color: textWhite,
								margin: '0 0 24px 0'
							}}>
								Hyperscale Optical Interconnect & Power Allocation
							</h1>

							{/* L3 Context */}
							<div style={{
								fontSize: 18, // L3
								lineHeight: 1.6,
								color: muted,
								fontWeight: 300,
								maxWidth: 440
							}}>
								Global AI data center capacity expanded by 340% to support multi-trillion parameter model training.
							</div>
						</div>

						{/* Key Infrastructure Annotations */}
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
							opacity: node2Pop
						}}>
							<div style={{ borderLeft: `2px solid ${nvidiaGreen}`, paddingLeft: 16 }}>
								<div style={{ fontSize: 16, fontWeight: 600, color: textWhite }}>800Gbps Optical Fabric</div>
								<div style={{ fontSize: 12, color: muted, marginTop: 2 }}>Sub-millisecond intra-cluster latency</div>
							</div>
							<div style={{ borderLeft: `2px solid ${slate}`, paddingLeft: 16 }}>
								<div style={{ fontSize: 16, fontWeight: 600, color: textWhite }}>Liquid Cooling Adoption</div>
								<div style={{ fontSize: 12, color: muted, marginTop: 2 }}>94% PUE Efficiency Benchmark</div>
							</div>
						</div>
					</div>

					{/* Right Column: The Optical Backbone Ring & L1 Hero Metric */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* SVG Optical Backbone Ring */}
						<svg width="100%" height="100%" viewBox="0 0 900 600" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							<defs>
								<linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#1E293B" />
									<stop offset="50%" stopColor={nvidiaGreen} />
									<stop offset="100%" stopColor="#FFFFFF" />
								</linearGradient>
							</defs>

							{/* Ambient Grid Guidelines */}
							<g opacity={envReveal * 0.1} stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="4 4">
								<circle cx="450" cy="300" r="220" fill="none" />
								<line x1="230" y1="300" x2="670" y2="300" />
							</g>

							{/* Backbone Optical Vector Path */}
							<path 
								d="M 230,300 C 230,180 330,100 450,100 C 570,100 670,180 670,300 C 670,420 570,500 450,500 C 330,500 230,420 230,300 Z" 
								fill="none" 
								stroke="url(#ringGrad)" 
								strokeWidth="3.5" 
								strokeDasharray={pathLength}
								strokeDashoffset={pathDashoffset}
							/>

							{/* Node Spawns (Hyperscale Facilities) */}
							{/* Node 1: Northern Virginia Hub */}
							<g style={{ opacity: node1Pop, transform: `scale(${node1Pop})`, transformOrigin: '450px 100px' }}>
								<circle cx="450" cy="100" r="7" fill={bg} stroke={nvidiaGreen} strokeWidth="3" />
								<text x="450" y="75" fill={muted} fontSize="11" fontWeight="500" textAnchor="middle">VA HYPERSCALE HUB</text>
							</g>

							{/* Node 2: Oregon Clean Energy Cluster */}
							<g style={{ opacity: node2Pop, transform: `scale(${node2Pop})`, transformOrigin: '670px 300px' }}>
								<circle cx="670" cy="300" r="9" fill={nvidiaGreen} />
								<text x="740" y="304" fill={textWhite} fontSize="12" fontWeight="600" textAnchor="start">OR HYDRO POD</text>
							</g>

							{/* Node 3: Texas Enterprise Fabric */}
							<g style={{ opacity: node3Pop, transform: `scale(${node3Pop})`, transformOrigin: '450px 500px' }}>
								<circle cx="450" cy="500" r="7" fill={bg} stroke={textWhite} strokeWidth="2" />
								<text x="450" y="530" fill={muted} fontSize="11" fontWeight="500" textAnchor="middle">TX CORE FABRIC</text>
							</g>
						</svg>

						{/* L1 Hero Metric Overlay */}
						<div style={{
							position: 'relative',
							zIndex: 20,
							textAlign: 'right',
							opacity: heroPop,
							transform: `translateY(${heroY}px)`,
							marginRight: 40
						}}>
							{/* L1 Hero Metric */}
							<div style={{
								fontSize: 96, // L1
								fontWeight: 700,
								letterSpacing: '-0.04em',
								lineHeight: 1,
								color: nvidiaGreen
							}}>
								5.4 GW
							</div>
							<div style={{
								fontFamily: 'Georgia, serif',
								fontSize: 24, // Supporting context
								fontWeight: 400,
								color: textWhite,
								marginTop: 12,
								fontStyle: 'italic'
							}}>
								Dedicated AI Power Infrastructure
							</div>
						</div>

					</div>

				</div>

				{/* Bottom Row: Metadata (L5) */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: 11, // L5
					color: muted,
					letterSpacing: '0.12em',
					borderTop: '1px solid rgba(255, 255, 255, 0.1)',
					paddingTop: 20,
					marginTop: 32,
					opacity: envReveal
				}}>
					<div>CONFIDENTIAL // ENTERPRISE COMPUTE BRIEFING</div>
					<div>FRAME 01 // OVERVIEW</div>
				</div>

			</div>
		</AbsoluteFill>
	);
};
