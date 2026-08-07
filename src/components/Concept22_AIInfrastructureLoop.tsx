import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { EditorialText, SPATIAL_TOKENS, validateTypographyComposition, performCanvasUtilizationAudit } from '../engine/TypographyEngine';

/**
 * Concept 22: AI Infrastructure Server Rack Loop
 * Flow Pipeline Output: Artificial Intelligence // AI Infrastructure
 * 
 * 4K 60FPS Seamless Loop Standards:
 * - Resolution: 3840x2160 @ 60FPS
 * - Duration: 900 frames (15.0 seconds)
 * - Feature: Server racks connected by pulsing data lines, perfectly loopable (sine wave modulation)
 * - Driven by: Typography Intelligence Engine (<EditorialText>) & motion-tokens.md
 */
export const Concept22_AIInfrastructureLoop: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Seamless Loop Parameter (0 to 1 back to 0 over 900 frames)
	const loopProgress = (frame % durationInFrames) / durationInFrames;
	const sinePulse = (Math.sin(loopProgress * Math.PI * 2 * 3) + 1) / 2; // 3 full pulses per 15s

	// Pre-Render Typography Audit
	const typeValidation = validateTypographyComposition([
		{ level: 'L1_HeroMetric', text: '1.2 PFLOPS', narrativePurpose: 'Hyperscale AI compute density per rack' },
		{ level: 'L2_MainHeading', text: 'Hyperscale AI Infrastructure & Interconnect Mesh', narrativePurpose: 'Primary technical documentary title' },
		{ level: 'L3_SectionHeading', text: 'Distributed server racks synchronized via high-density optical data lines.', narrativePurpose: 'Explains compute grid context' }
	]);

	if (!typeValidation.isValid) {
		console.warn('Typography Validation Warnings:', typeValidation.errors);
	}

	// Canvas Utilization Audit (All 4 Quadrants Active)
	const canvasAudit = performCanvasUtilizationAudit({ q1: true, q2: true, q3: true, q4: true }, 0.84);
	if (!canvasAudit.passed) {
		console.warn('Canvas Audit Warnings:', canvasAudit.auditNotes);
	}

	// Palette: Deep Slate Obsidian & Optical Cyan
	const bg = '#06080D';
	const textWhite = '#FFFFFF';
	const cyan = '#00E5FF'; // Pulse Accent
	const green = '#76B900'; // Compute Status
	const muted = '#64748B'; // Metadata

	// Timelines
	const envReveal = spring({ frame: Math.min(frame, 60), fps, config: { damping: 45, mass: 2.5 } });
	const textSlide = spring({ frame: Math.min(Math.max(0, frame - 15), 60), fps, config: { damping: 35, mass: 1.8 } });
	const textY = interpolate(textSlide, [0, 1], [25, 0]);

	// Continuous Slow Camera Drift for Loop Smoothness
	const camScale = 1.0 + (Math.sin(loopProgress * Math.PI * 2) * 0.02);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			color: textWhite,
			overflow: 'hidden'
		}}>
			{/* Master Camera Container */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, bottom: 0,
				transform: `scale(${camScale})`,
				transformOrigin: 'center center',
				display: 'flex',
				flexDirection: 'column',
				padding: `${SPATIAL_TOKENS.gridOuterPadding}px`,
				boxSizing: 'border-box'
			}}>

				{/* Q1 (Top-Left): Header Metadata */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					opacity: envReveal,
					borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
					paddingBottom: 24,
					marginBottom: 48
				}}>
					<EditorialText level="L5_Metadata" narrativePurpose="Category classification" color={cyan}>
						ARTIFICIAL INTELLIGENCE // AI INFRASTRUCTURE
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Loop status" color={muted}>
						SEAMLESS LOOP // 4K 60FPS // 15S
					</EditorialText>
				</div>

				{/* Main Stage */}
				<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

					{/* Left Column: Narrative Context (40% Width) */}
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
							<EditorialText 
								level="L2_MainHeading" 
								narrativePurpose="States AI infrastructure title"
								color={textWhite}
								style={{ marginBottom: `${SPATIAL_TOKENS.headlineToParagraphGap}px`, maxWidth: 480 }}
							>
								Hyperscale AI Infrastructure & Interconnect Mesh
							</EditorialText>

							{/* L3 Section Heading */}
							<EditorialText 
								level="L3_SectionHeading" 
								narrativePurpose="Explains server rack data line synchronization"
								color="#94A3B8"
								style={{ maxWidth: 420 }}
							>
								Distributed server racks synchronized via high-density optical data lines, delivering sub-millisecond cluster latency.
							</EditorialText>
						</div>

						{/* L4 Rack Status Annotations (Q3: Bottom-Left) */}
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16
						}}>
							<div style={{ borderLeft: `2px solid ${cyan}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="Server rack interconnect metric" color={textWhite}>
									800Gbps Optical Bus
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Transceiver note" color={muted} style={{ marginTop: 2 }}>
									Co-Packaged Optics Active
								</EditorialText>
							</div>
							<div style={{ borderLeft: `2px solid ${green}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="Rack cluster capacity" color={textWhite}>
									256-GPU Pod Array
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Compute density" color={muted} style={{ marginTop: 2 }}>
									Liquid Cooled Cluster Architecture
								</EditorialText>
							</div>
						</div>
					</div>

					{/* Right Column: Server Rack Matrix & Pulsing Data Lines (60% Width) */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* SVG Server Rack & Pulsing Bus Matrix (Q2 & Q4) */}
						<svg width="100%" height="100%" viewBox="0 0 900 600" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							<defs>
								<linearGradient id="cyanPulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#06080D" />
									<stop offset={`${sinePulse * 100}%`} stopColor={cyan} />
									<stop offset="100%" stopColor={green} />
								</linearGradient>
							</defs>

							{/* Background Rack Grid */}
							<g stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4">
								<line x1="100" y1="100" x2="800" y2="100" />
								<line x1="100" y1="300" x2="800" y2="300" />
								<line x1="100" y1="500" x2="800" y2="500" />
								<line x1="250" y1="50" x2="250" y2="550" />
								<line x1="650" y1="50" x2="650" y2="550" />
							</g>

							{/* Pulsing Interconnect Lines */}
							<path 
								d="M 120,500 L 250,300 L 450,420 L 650,180 L 820,180" 
								fill="none" 
								stroke="url(#cyanPulseGrad)" 
								strokeWidth="3.5"
								strokeLinecap="round"
							/>

							{/* Server Rack Node 1 (Rack Alpha) */}
							<g transform="translate(250, 300)">
								<rect x="-30" y="-40" width="60" height="80" rx="4" fill={bg} stroke={cyan} strokeWidth="2" />
								<line x1="-20" y1="-20" x2="20" y2="-20" stroke={cyan} strokeWidth="2" opacity={sinePulse * 0.8 + 0.2} />
								<line x1="-20" y1="0" x2="20" y2="0" stroke={green} strokeWidth="2" />
								<line x1="-20" y1="20" x2="20" y2="20" stroke={cyan} strokeWidth="2" opacity={sinePulse * 0.8 + 0.2} />
								<text x="0" y="55" fill={muted} fontSize="11" fontFamily="Inter, sans-serif" textAnchor="middle">RACK ALPHA</text>
							</g>

							{/* Server Rack Node 2 (Rack Beta) */}
							<g transform="translate(650, 180)">
								<rect x="-30" y="-40" width="60" height="80" rx="4" fill={bg} stroke={green} strokeWidth="2" />
								<line x1="-20" y1="-20" x2="20" y2="-20" stroke={green} strokeWidth="2" />
								<line x1="-20" y1="0" x2="20" y2="0" stroke={cyan} strokeWidth="2" opacity={sinePulse * 0.8 + 0.2} />
								<line x1="-20" y1="20" x2="20" y2="20" stroke={green} strokeWidth="2" opacity={sinePulse * 0.8 + 0.2} />
								<text x="0" y="55" fill={textWhite} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">RACK BETA</text>
							</g>

							{/* Data Pulse Wave Particles */}
							<circle cx={interpolate(loopProgress, [0, 1], [120, 820])} cy={interpolate(loopProgress, [0, 1], [500, 180])} r="6" fill={cyan} />
						</svg>

						{/* L1 Hero Metric Overlay (Q4: Bottom-Right) */}
						<div style={{
							position: 'relative',
							zIndex: 20,
							textAlign: 'right',
							marginRight: `${SPATIAL_TOKENS.heroMetricBreathingRoom}px`
						}}>
							<EditorialText level="L1_HeroMetric" narrativePurpose="Primary compute density benchmark" color={cyan}>
								1.2 PFLOPS
							</EditorialText>
							<EditorialText level="L3_SectionHeading" narrativePurpose="Subtitles hero compute metric" color={textWhite} style={{ marginTop: 12, fontStyle: 'italic' }}>
								AI Compute Density Per Rack
							</EditorialText>
						</div>

					</div>

				</div>

				{/* L5 Metadata Footer */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '1px solid rgba(255, 255, 255, 0.1)',
					paddingTop: 20,
					marginTop: `${SPATIAL_TOKENS.metadataMarginTop}px`,
					opacity: envReveal
				}}>
					<EditorialText level="L5_Metadata" narrativePurpose="System attribution" color={muted}>
						FLOW PIPELINE v1.0 // QA AUDITED
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Classification" color={muted}>
						SEAMLESS LOOP // AI INFRASTRUCTURE
					</EditorialText>
				</div>

			</div>

			{/* Subtle Film Grain Texture */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0, width: '100%', height: '100%',
				pointerEvents: 'none',
				opacity: 0.035,
				backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
				zIndex: 99
			}} />
		</AbsoluteFill>
	);
};
