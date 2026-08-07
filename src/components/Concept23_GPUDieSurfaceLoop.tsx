import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { EditorialText, SPATIAL_TOKENS, validateTypographyComposition, performCanvasUtilizationAudit } from '../engine/TypographyEngine';

/**
 * Concept 23: GPU Die Surface Processing Grid (Close-Up Loop)
 * Pipeline Category: Artificial Intelligence // AI Compute
 * 
 * 4K 60FPS Production Standards:
 * - 3840x2160 @ 60FPS (600 frames = 10s)
 * - Research & Concept Driven: Macro GPU Silicon Die Metaphor
 * - Layout: Center-Stage Macro Focal Blueprint (Zero 40/60 split)
 * - Seamless Loop: Sine wave pulse modulation over 600 frames
 */
export const Concept23_GPUDieSurfaceLoop: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Seamless Loop Cycle (0 to 1 back to 0 over 600 frames)
	const loopProgress = (frame % durationInFrames) / durationInFrames;
	const gridPulse = (Math.sin(loopProgress * Math.PI * 2 * 2) + 1) / 2; // 2 full waves

	// Pre-Render Typography Audit
	const typeValidation = validateTypographyComposition([
		{ level: 'L1_HeroMetric', text: '18,432', narrativePurpose: 'Total active Tensor processing cores on die' },
		{ level: 'L2_MainHeading', text: 'Next-Generation GPU Silicon Die & Processing Grid', narrativePurpose: 'Macro hardware title' },
		{ level: 'L3_SectionHeading', text: 'High-density chiplet array with HBM3e interconnect stack.', narrativePurpose: 'Explains die architecture' }
	]);

	if (!typeValidation.isValid) {
		console.warn('Typography Validation Warnings:', typeValidation.errors);
	}

	// Canvas Utilization Audit
	const canvasAudit = performCanvasUtilizationAudit({ q1: true, q2: true, q3: true, q4: true }, 0.85);
	if (!canvasAudit.passed) {
		console.warn('Canvas Audit Warnings:', canvasAudit.auditNotes);
	}

	// Palette: NVIDIA Obsidian & Acceleration Green
	const bg = '#08090C'; // Matte Silicon Graphite
	const textWhite = '#FFFFFF';
	const greenAccent = '#76B900'; // Acceleration Green
	const goldAccent = '#D97706'; // HBM Gold
	const muted = '#64748B'; // Slate Metadata

	// Timelines
	const envReveal = spring({ frame: Math.min(frame, 60), fps, config: { damping: 45, mass: 2.5 } });
	const textSlide = spring({ frame: Math.min(Math.max(0, frame - 15), 60), fps, config: { damping: 35, mass: 1.8 } });
	const textY = interpolate(textSlide, [0, 1], [25, 0]);

	// Continuous Macro Camera Float
	const camScale = 1.05 + (Math.sin(loopProgress * Math.PI * 2) * 0.03);

	// Generate 8x8 Die Grid Tiles
	const gridRows = 8;
	const gridCols = 8;

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
					<EditorialText level="L5_Metadata" narrativePurpose="Category classification" color={greenAccent}>
						ARTIFICIAL INTELLIGENCE // AI COMPUTE HARDWARE
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Loop indicator" color={muted}>
						GPU DIE CLOSE-UP // 4K 60FPS // SEAMLESS LOOP
					</EditorialText>
				</div>

				{/* Main Stage: Center-Stage Macro Silicon Blueprint */}
				<div style={{
					flex: 1,
					display: 'flex',
					position: 'relative',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>

					{/* Left Editorial Narrative Overlay */}
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
								narrativePurpose="States GPU die architecture title"
								color={textWhite}
								style={{ marginBottom: `${SPATIAL_TOKENS.headlineToParagraphGap}px`, maxWidth: 460 }}
							>
								Next-Generation GPU Silicon Die & Processing Grid
							</EditorialText>

							<EditorialText 
								level="L3_SectionHeading" 
								narrativePurpose="Explains chiplet die architecture"
								color="#94A3B8"
								style={{ maxWidth: 400 }}
							>
								High-density 4nm chiplet die surface featuring integrated Tensor Core execution tiles and 3.2 TB/s HBM3e memory buses.
							</EditorialText>
						</div>

						{/* L4 Die Specifications */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
							<div style={{ borderLeft: `2px solid ${greenAccent}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="Tensor core count" color={textWhite}>
									512 Tensor Execution Engines
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="FP8 precision note" color={muted} style={{ marginTop: 2 }}>
									FP8 & Transformer Engine Accelerated
								</EditorialText>
							</div>
							<div style={{ borderLeft: `2px solid ${goldAccent}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="HBM3e bandwidth" color={textWhite}>
									3.2 TB/s Memory Bandwidth
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Memory stack note" color={muted} style={{ marginTop: 2 }}>
									CoWoS Advanced Packaging Interconnect
								</EditorialText>
							</div>
						</div>
					</div>

					{/* Center-Right Stage: Macro GPU Silicon Die Surface Grid (SVG) */}
					<div style={{
						width: '60%',
						height: '100%',
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<svg width="100%" height="100%" viewBox="0 0 1000 700" style={{ overflow: 'visible' }}>
							<defs>
								<linearGradient id="dieGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#08090C" />
									<stop offset={`${gridPulse * 100}%`} stopColor={greenAccent} />
									<stop offset="100%" stopColor={goldAccent} />
								</linearGradient>
							</defs>

							{/* Outer Silicon Substrate Package Frame */}
							<rect x="150" y="50" width="700" height="600" rx="16" fill="#0C0E14" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
							<rect x="170" y="70" width="660" height="560" rx="8" fill="#050608" stroke={greenAccent} strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />

							{/* 8x8 Tensor Processing Tile Array */}
							{Array.from({ length: gridRows }).map((_, r) =>
								Array.from({ length: gridCols }).map((_, c) => {
									const tileX = 200 + c * 75;
									const tileY = 100 + r * 65;
									const isHotTile = (r + c) % 3 === Math.floor(gridPulse * 3);
									return (
										<g key={`tile-${r}-${c}`}>
											<rect 
												x={tileX} 
												y={tileY} 
												width="64" 
												height="54" 
												rx="3" 
												fill={isHotTile ? 'rgba(118, 185, 0, 0.15)' : '#0F121C'} 
												stroke={isHotTile ? greenAccent : 'rgba(255,255,255,0.08)'} 
												strokeWidth={isHotTile ? 1.5 : 1} 
											/>
											{/* Inner Tensor Processing Core Micro-Dot */}
											<circle 
												cx={tileX + 32} 
												cy={tileY + 27} 
												r={isHotTile ? 3.5 : 2} 
												fill={isHotTile ? greenAccent : '#2A3447'} 
											/>
										</g>
									);
								})
							)}

							{/* Surrounding HBM3e High-Bandwidth Memory Buses */}
							<line x1="120" y1="150" x2="150" y2="150" stroke={goldAccent} strokeWidth="3" opacity={gridPulse * 0.8 + 0.2} />
							<line x1="120" y1="350" x2="150" y2="350" stroke={goldAccent} strokeWidth="3" opacity={gridPulse * 0.8 + 0.2} />
							<line x1="120" y1="550" x2="150" y2="550" stroke={goldAccent} strokeWidth="3" opacity={gridPulse * 0.8 + 0.2} />

							<line x1="850" y1="150" x2="880" y2="150" stroke={goldAccent} strokeWidth="3" opacity={gridPulse * 0.8 + 0.2} />
							<line x1="850" y1="350" x2="880" y2="350" stroke={goldAccent} strokeWidth="3" opacity={gridPulse * 0.8 + 0.2} />
							<line x1="850" y1="550" x2="880" y2="550" stroke={goldAccent} strokeWidth="3" opacity={gridPulse * 0.8 + 0.2} />
						</svg>

						{/* L1 Hero Metric Overlay */}
						<div style={{
							position: 'absolute',
							bottom: 20,
							right: 20,
							zIndex: 20,
							textAlign: 'right'
						}}>
							<EditorialText level="L1_HeroMetric" narrativePurpose="Active CUDA/Tensor cores count" color={greenAccent}>
								18,432
							</EditorialText>
							<EditorialText level="L3_SectionHeading" narrativePurpose="Subtitles CUDA cores count" color={textWhite} style={{ marginTop: 12, fontStyle: 'italic' }}>
								Active Tensor Cores On Die
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
						RESEARCH & CONCEPT ENGINE // CANVAS AUDITED
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Classification" color={muted}>
						NVIDIA B200 / ADVANCED PACKAGING SPECS
					</EditorialText>
				</div>

			</div>

			{/* Subtle Film Grain Overlay */}
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
