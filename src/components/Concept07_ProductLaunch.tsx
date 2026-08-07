import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from 'remotion';

/**
 * Concept 07: The Product Launch
 * - Inspired by Stripe, Linear, Vercel, Apple.
 * - Deep dark mode, subtle depth, high contrast.
 * - No dashboards. A single cinematic story about "Intelligence at Scale".
 * - Custom SVG spline animation that draws gracefully.
 * - Editorial typography with cinematic restraint.
 */
export const Concept07_ProductLaunch: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Timeline
	// 0-2s: Background and initial typography fade in
	const bgReveal = spring({ frame, fps, config: { damping: 30, mass: 2, stiffness: 40 } });
	const bgScale = interpolate(bgReveal, [0, 1], [1.1, 1]);

	const typoReveal = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 20, mass: 1 } });
	const typoY = interpolate(typoReveal, [0, 1], [30, 0]);

	// 2-6s: The Spline draws itself (The insight)
	const splineProgress = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 60, mass: 3, stiffness: 20 } });
	const splineLength = 2500; // Approx length of the path
	const dashOffset = interpolate(splineProgress, [0, 1], [splineLength, 0]);

	// 4-7s: Data nodes fade in as spline reaches them
	const node1Progress = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 14 } });
	const node2Progress = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 14 } });
	const node3Progress = spring({ frame: Math.max(0, frame - 270), fps, config: { damping: 14 } });

	// 7-10s: Final polish/glow effect and footer
	const footerReveal = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 20 } });

	// Continuous subtle background breathing
	const breathe = Math.sin(frame / 120) * 0.05;

	return (
		<AbsoluteFill style={{
			backgroundColor: '#000000',
			fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			color: '#FFFFFF',
			overflow: 'hidden'
		}}>
			{/* Subtle Depth Background (Vercel/Linear style glowing orb) */}
			<div style={{
				position: 'absolute',
				top: '50%',
				left: '60%',
				width: '120vw',
				height: '120vw',
				transform: `translate(-50%, -50%) scale(${bgScale + breathe})`,
				background: 'radial-gradient(circle, rgba(60,20,100,0.15) 0%, rgba(20,40,120,0.1) 30%, rgba(0,0,0,0) 70%)',
				opacity: bgReveal,
				filter: 'blur(100px)',
				zIndex: 0
			}} />

			{/* Main Grid Layout */}
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				padding: '120px 140px',
				boxSizing: 'border-box',
				zIndex: 1
			}}>
				{/* Left Side: Editorial Typography */}
				<div style={{
					flex: '0 0 40%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					opacity: typoReveal,
					transform: `translateY(${typoY}px)`
				}}>
					<div style={{
						display: 'inline-block',
						padding: '8px 16px',
						borderRadius: 100,
						border: '1px solid rgba(255,255,255,0.15)',
						background: 'rgba(255,255,255,0.05)',
						fontSize: 14,
						fontWeight: 500,
						letterSpacing: '0.05em',
						color: '#A0A0A0',
						marginBottom: 40,
						alignSelf: 'flex-start'
					}}>
						Enterprise Compute
					</div>
					
					<h1 style={{
						fontSize: 76,
						fontWeight: 500,
						lineHeight: 1.1,
						letterSpacing: '-0.03em',
						margin: 0,
						background: 'linear-gradient(180deg, #FFFFFF 0%, #888888 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent'
					}}>
						Intelligence<br />At Scale.
					</h1>
					
					<p style={{
						fontSize: 24,
						lineHeight: 1.5,
						color: '#888888',
						marginTop: 32,
						fontWeight: 400,
						maxWidth: 500
					}}>
						Neural throughput achieved a <span style={{ color: '#FFFFFF' }}>3.2x multiplier</span> in Q3, fundamentally reshaping the trajectory of predictive modeling.
					</p>
				</div>

				{/* Right Side: Cinematic Data Spline */}
				<div style={{
					flex: 1,
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}>
					{/* The Spline SVG */}
					<svg 
						width="100%" 
						height="100%" 
						viewBox="0 0 1000 600" 
						style={{ overflow: 'visible', filter: 'drop-shadow(0px 10px 30px rgba(80,120,255,0.2))' }}
					>
						{/* Defs for gradients */}
						<defs>
							<linearGradient id="splineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="#4A00E0" />
								<stop offset="50%" stopColor="#8E2DE2" />
								<stop offset="100%" stopColor="#00E5FF" />
							</linearGradient>
							<linearGradient id="glowGradient" x1="0%" y1="100%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="rgba(74,0,224,0.3)" />
								<stop offset="100%" stopColor="rgba(0,229,255,0.3)" />
							</linearGradient>
						</defs>

						{/* Background Track (Very faint) */}
						<path 
							d="M 50,500 C 300,500 200,100 500,300 C 800,500 700,50 950,100" 
							fill="none" 
							stroke="rgba(255,255,255,0.05)" 
							strokeWidth="4" 
						/>

						{/* The Main Spline */}
						<path 
							d="M 50,500 C 300,500 200,100 500,300 C 800,500 700,50 950,100" 
							fill="none" 
							stroke="url(#splineGradient)" 
							strokeWidth="6"
							strokeLinecap="round"
							strokeDasharray={splineLength}
							strokeDashoffset={dashOffset}
						/>
						
						{/* Glow Spline (Underneath) */}
						<path 
							d="M 50,500 C 300,500 200,100 500,300 C 800,500 700,50 950,100" 
							fill="none" 
							stroke="url(#glowGradient)" 
							strokeWidth="20"
							strokeLinecap="round"
							strokeDasharray={splineLength}
							strokeDashoffset={dashOffset}
							style={{ filter: 'blur(8px)' }}
						/>

						{/* Data Nodes */}
						{/* Node 1 */}
						<g style={{ opacity: node1Progress, transform: `scale(${node1Progress})`, transformOrigin: '280px 380px' }}>
							<circle cx="280" cy="380" r="8" fill="#000000" stroke="#8E2DE2" strokeWidth="3" />
							<text x="280" y="350" fill="#FFFFFF" fontSize="16" fontWeight="500" textAnchor="middle">1.2M</text>
							<text x="280" y="405" fill="#888888" fontSize="12" fontWeight="400" textAnchor="middle">INCEPTION</text>
						</g>

						{/* Node 2 */}
						<g style={{ opacity: node2Progress, transform: `scale(${node2Progress})`, transformOrigin: '500px 300px' }}>
							<circle cx="500" cy="300" r="10" fill="#000000" stroke="#8E2DE2" strokeWidth="3" />
							<text x="500" y="260" fill="#FFFFFF" fontSize="18" fontWeight="500" textAnchor="middle">3.4M</text>
							<text x="500" y="330" fill="#888888" fontSize="12" fontWeight="400" textAnchor="middle">ACCELERATION</text>
						</g>

						{/* Node 3 (The Insight) */}
						<g style={{ opacity: node3Progress, transform: `scale(${node3Progress})`, transformOrigin: '820px 180px' }}>
							<circle cx="820" cy="180" r="14" fill="#00E5FF" />
							<circle cx="820" cy="180" r="24" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
							<text x="820" y="140" fill="#00E5FF" fontSize="24" fontWeight="600" textAnchor="middle">10.8M</text>
							<text x="820" y="215" fill="#FFFFFF" fontSize="14" fontWeight="500" textAnchor="middle">HYPER-SCALE</text>
						</g>
					</svg>
				</div>
			</div>

			{/* Footer */}
			<div style={{
				position: 'absolute',
				bottom: 60,
				left: 140,
				right: 140,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				opacity: footerReveal,
				borderTop: '1px solid rgba(255,255,255,0.1)',
				paddingTop: 30,
				zIndex: 2
			}}>
				<div style={{ fontSize: 13, color: '#666666', letterSpacing: '0.05em' }}>
					PROPRIETARY ALGORITHM 2027
				</div>
				<div style={{ display: 'flex', gap: 20 }}>
					<div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
					<div style={{ width: 8, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }} />
					<div style={{ width: 8, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }} />
				</div>
				<div style={{ fontSize: 13, color: '#666666', letterSpacing: '0.05em' }}>
					FRAME 01 // OVERVIEW
				</div>
			</div>
		</AbsoluteFill>
	);
};
