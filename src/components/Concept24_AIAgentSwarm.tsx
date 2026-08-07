import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { EditorialText, SPATIAL_TOKENS, validateTypographyComposition, performCanvasUtilizationAudit } from '../engine/TypographyEngine';

/**
 * Category 01 — Asset 01: Enterprise AI Agent Swarms & Orchestration
 * Production Pipeline: Category 1 (Artificial Intelligence)
 * 
 * 4K 60FPS Production Standards:
 * - 3840x2160 @ 60FPS (600 frames = 10s)
 * - Concept Engine Metaphor: "The Swarm Intelligence Node Ring"
 * - Blueprint: Concentric Orbit Topology (Zero 40/60 split left/right template)
 * - Output Destination: D:\remotion+Adobe\Output\Output 2\
 */
export const Concept24_AIAgentSwarm: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Seamless Loop Cycle (0 to 1 back to 0 over 600 frames)
	const loopProgress = (frame % durationInFrames) / durationInFrames;
	const rotationAngle = loopProgress * 360;
	const pulseWave = (Math.sin(loopProgress * Math.PI * 2 * 2) + 1) / 2;

	// Pre-Render Typography Audit
	const typeValidation = validateTypographyComposition([
		{ level: 'L1_HeroMetric', text: '100K/s', narrativePurpose: 'Continuous autonomous decision loop throughput' },
		{ level: 'L2_MainHeading', text: 'Autonomous AI Agent Swarms & Enterprise Orchestration', narrativePurpose: 'Category 1 Asset 01 Title' },
		{ level: 'L3_SectionHeading', text: 'Multi-agent autonomous swarms execute continuous operational loops with zero latency.', narrativePurpose: 'Explains agent swarm context' }
	]);

	if (!typeValidation.isValid) {
		console.warn('Typography Validation Warnings:', typeValidation.errors);
	}

	// Canvas Utilization Audit (All 4 Quadrants Active)
	const canvasAudit = performCanvasUtilizationAudit({ q1: true, q2: true, q3: true, q4: true }, 0.86);
	if (!canvasAudit.passed) {
		console.warn('Canvas Audit Warnings:', canvasAudit.auditNotes);
	}

	// Palette: Deep Obsidian & Neon Cyan
	const bg = '#05070C';
	const textWhite = '#FFFFFF';
	const cyan = '#00E5FF'; // Agent Signal
	const emerald = '#059669'; // Workflow Sync
	const muted = '#64748B'; // Metadata

	// Timelines
	const envReveal = spring({ frame: Math.min(frame, 60), fps, config: { damping: 45, mass: 2.5 } });
	const textSlide = spring({ frame: Math.min(Math.max(0, frame - 15), 60), fps, config: { damping: 35, mass: 1.8 } });
	const textY = interpolate(textSlide, [0, 1], [25, 0]);

	// Continuous Master Camera Zoom
	const camScale = 1.0 + (Math.sin(loopProgress * Math.PI * 2) * 0.03);

	// Generate 12 Orbiting Agent Nodes
	const nodeCount = 12;
	const radius1 = 220;
	const radius2 = 340;

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
					marginBottom: 36
				}}>
					<EditorialText level="L5_Metadata" narrativePurpose="Taxonomy category classification" color={cyan}>
						CATEGORY 01: ARTIFICIAL INTELLIGENCE // AI AGENT SWARMS
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Output destination classification" color={muted}>
						OUTPUT 2 // 4K 60FPS // ASSET 01
					</EditorialText>
				</div>

				{/* Main Stage: Concentric Swarm Ring Topology */}
				<div style={{
					flex: 1,
					display: 'flex',
					position: 'relative',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>

					{/* Left Editorial Text Column (35% Width) */}
					<div style={{
						width: '35%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						height: '100%',
						opacity: textSlide,
						transform: `translateY(${textY}px)`,
						zIndex: 10
					}}>
						<div>
							<EditorialText 
								level="L2_MainHeading" 
								narrativePurpose="States agent swarm title"
								color={textWhite}
								style={{ marginBottom: `${SPATIAL_TOKENS.headlineToParagraphGap}px`, maxWidth: 460 }}
							>
								Autonomous AI Agent Swarms & Orchestration
							</EditorialText>

							<EditorialText 
								level="L3_SectionHeading" 
								narrativePurpose="Explains multi-agent workflow automation context"
								color="#94A3B8"
								style={{ maxWidth: 400 }}
							>
								Self-healing multi-agent swarms orchestrate enterprise operations, executing continuous decision loops with zero human intervention.
							</EditorialText>
						</div>

						{/* L4 Swarm Performance Annotations */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
							<div style={{ borderLeft: `2px solid ${cyan}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="Latency reduction milestone" color={textWhite}>
									85% Latency Reduction
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Automated execution note" color={muted} style={{ marginTop: 2 }}>
									Autonomous Workflow Optimization
								</EditorialText>
							</div>
							<div style={{ borderLeft: `2px solid ${emerald}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="Self healing architecture" color={textWhite}>
									Self-Healing Fault Resilience
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Zero downtime note" color={muted} style={{ marginTop: 2 }}>
									Dynamic Task Re-Routing Protocols
								</EditorialText>
							</div>
						</div>
					</div>

					{/* Center-Right Stage: Concentric Agent Swarm Ring (SVG) */}
					<div style={{
						width: '60%',
						height: '100%',
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<svg width="100%" height="100%" viewBox="0 0 900 700" style={{ overflow: 'visible' }}>
							{/* Center Core Enterprise Node */}
							<g transform="translate(450, 350)">
								<circle cx="0" cy="0" r="50" fill={bg} stroke={cyan} strokeWidth="2.5" />
								<circle cx="0" cy="0" r={30 + pulseWave * 10} fill="rgba(0, 229, 255, 0.15)" stroke={cyan} strokeWidth="1" />
								<text x="0" y="5" fill={textWhite} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">CORE AGENT</text>
							</g>

							{/* Orbit Ring 1 (Inner Agent Ring) */}
							<circle cx="450" cy="350" r={radius1} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="6 6" />
							<g transform={`translate(450, 350) rotate(${rotationAngle})`}>
								{Array.from({ length: 6 }).map((_, i) => {
									const angle = (i * 60) * (Math.PI / 180);
									const x = radius1 * Math.cos(angle);
									const y = radius1 * Math.sin(angle);
									return (
										<g key={`ring1-${i}`} transform={`translate(${x}, ${y})`}>
											<circle cx="0" cy="0" r="10" fill={bg} stroke={cyan} strokeWidth="2" />
											<circle cx="0" cy="0" r="4" fill={cyan} />
										</g>
									);
								})}
							</g>

							{/* Orbit Ring 2 (Outer Agent Ring - Counter Rotate) */}
							<circle cx="450" cy="350" r={radius2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 8" />
							<g transform={`translate(450, 350) rotate(${-rotationAngle * 0.7})`}>
								{Array.from({ length: 8 }).map((_, i) => {
									const angle = (i * 45) * (Math.PI / 180);
									const x = radius2 * Math.cos(angle);
									const y = radius2 * Math.sin(angle);
									return (
										<g key={`ring2-${i}`} transform={`translate(${x}, ${y})`}>
											<rect x="-8" y="-8" width="16" height="16" fill={bg} stroke={emerald} strokeWidth="1.5" />
											<circle cx="0" cy="0" r="3" fill={emerald} />
										</g>
									);
								})}
							</g>
						</svg>

						{/* L1 Hero Metric Overlay */}
						<div style={{
							position: 'absolute',
							bottom: 20,
							right: 20,
							zIndex: 20,
							textAlign: 'right'
						}}>
							<EditorialText level="L1_HeroMetric" narrativePurpose="Continuous decision loop throughput" color={cyan}>
								100K/s
							</EditorialText>
							<EditorialText level="L3_SectionHeading" narrativePurpose="Subtitles decision loops metric" color={textWhite} style={{ marginTop: 12, fontStyle: 'italic' }}>
								Autonomous Decision Loops / Sec
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
						CATEGORY 01: ARTIFICIAL INTELLIGENCE // CONCEPT ENGINE
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Classification" color={muted}>
						OUTPUT 2 // SWARM ORCHESTRATION ARCHITECTURE
					</EditorialText>
				</div>

			</div>

			{/* Film Grain Texture */}
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
