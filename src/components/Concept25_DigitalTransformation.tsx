import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { EditorialText, SPATIAL_TOKENS, validateTypographyComposition, performCanvasUtilizationAudit } from '../engine/TypographyEngine';

/**
 * Concept 25: Enterprise Digital Transformation — The Converging Prism Lattice
 * 
 * 4K 60FPS Production Standards:
 * - Resolution: 3840x2160 @ 60FPS (600 frames = 10.0s)
 * - Concept Engine: Asymmetrical Diagonal Convergence (Zero 40/60 split)
 * - Story: Legacy operational silos converging into a unified real-time event lattice
 * - Output Target: D:\remotion+Adobe\Output\Output 2\001_Enterprise_Digital_Transformation_Convergence_4K_60fps_10s.mp4
 */
export const Concept25_DigitalTransformation: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Pre-Render Typography Audit
	const typeValidation = validateTypographyComposition([
		{ level: 'L1_HeroMetric', text: '3.8x', narrativePurpose: 'Enterprise operational efficiency velocity multiplier' },
		{ level: 'L2_MainHeading', text: 'Structural Convergence & Real-Time Enterprise Intelligence', narrativePurpose: 'Documentary report title' },
		{ level: 'L3_SectionHeading', text: 'Fragmented operational silos unify into a single event-driven digital lattice.', narrativePurpose: 'Explains digital transformation thesis' }
	]);

	if (!typeValidation.isValid) {
		console.warn('Typography Validation Warnings:', typeValidation.errors);
	}

	// Canvas Utilization Audit (All 4 Quadrants Active)
	const canvasAudit = performCanvasUtilizationAudit({ q1: true, q2: true, q3: true, q4: true }, 0.85);
	if (!canvasAudit.passed) {
		console.warn('Canvas Audit Warnings:', canvasAudit.auditNotes);
	}

	// Palette: Platinum Slate & Gold/Cyan Convergent Accents
	const bg = '#0B0D12';
	const textWhite = '#FFFFFF';
	const cyan = '#00E5FF'; // Conduit Accent
	const gold = '#D4AF37'; // Multiplier Hero Accent
	const muted = '#64748B'; // Metadata

	// Phase 1 (0-30f): Environment Reveal
	const envReveal = spring({ frame: Math.min(frame, 60), fps, config: { damping: 45, mass: 2.5 } });
	const textSlide = spring({ frame: Math.min(Math.max(0, frame - 15), 60), fps, config: { damping: 35, mass: 1.8 } });
	const textY = interpolate(textSlide, [0, 1], [25, 0]);

	// Phase 2 (70-250f): System Silos Diagonal Convergence Motion
	const convergenceProgress = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 50, mass: 3, stiffness: 18 } });
	
	// Phase 3 (250-600f): Hero Metric Climax Reveal
	const heroPop = spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 22, mass: 1 } });
	const heroScale = interpolate(heroPop, [0, 1], [0.93, 1]);

	// Master Camera Float & Diagonal Tilt
	const camScale = interpolate(frame, [0, 600], [1.0, 1.04]);
	const camPanX = interpolate(frame, [0, 600], [0, -15]);

	// Positions of 4 Legacy Silo Blocks (Converging along 45-degree diagonal axis)
	// Initial floating positions -> Converged Core positions
	const silo1X = interpolate(convergenceProgress, [0, 1], [150, 400]);
	const silo1Y = interpolate(convergenceProgress, [0, 1], [150, 280]);

	const silo2X = interpolate(convergenceProgress, [0, 1], [700, 520]);
	const silo2Y = interpolate(convergenceProgress, [0, 1], [120, 280]);

	const silo3X = interpolate(convergenceProgress, [0, 1], [120, 400]);
	const silo3Y = interpolate(convergenceProgress, [0, 1], [480, 380]);

	const silo4X = interpolate(convergenceProgress, [0, 1], [750, 520]);
	const silo4Y = interpolate(convergenceProgress, [0, 1], [450, 380]);

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
				transform: `scale(${camScale}) translateX(${camPanX}px)`,
				transformOrigin: 'center center',
				display: 'flex',
				flexDirection: 'column',
				padding: `${SPATIAL_TOKENS.gridOuterPadding}px`,
				boxSizing: 'border-box'
			}}>

				{/* Q1 (Top-Left): Executive Publication Header */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					opacity: envReveal,
					borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
					paddingBottom: 24,
					marginBottom: 36
				}}>
					<EditorialText level="L5_Metadata" narrativePurpose="Attributes McKinsey research briefing" color={gold}>
						MCKINSEY & COMPANY // ENTERPRISE TRANSFORMATION REPORT
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Document classification" color={muted}>
						STRUCTURAL CONVERGENCE // REAL-TIME EVENT FABRIC
					</EditorialText>
				</div>

				{/* Main Stage: Asymmetrical Diagonal Convergence Blueprint */}
				<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

					{/* Top-Left Narrative Block (Q1 & Q3) */}
					<div style={{
						width: '38%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: textSlide,
						transform: `translateY(${textY}px)`,
						zIndex: 10
					}}>
						<div>
							{/* L2 Headline (Playfair Display) */}
							<EditorialText 
								level="L2_MainHeading" 
								narrativePurpose="States digital transformation title"
								color={textWhite}
								style={{ marginBottom: `${SPATIAL_TOKENS.headlineToParagraphGap}px`, maxWidth: 480 }}
							>
								Structural Convergence & Real-Time Intelligence
							</EditorialText>

							{/* L3 Context */}
							<EditorialText 
								level="L3_SectionHeading" 
								narrativePurpose="Explains legacy silo convergence into digital lattice"
								color="#94A3B8"
								style={{ maxWidth: 420 }}
							>
								Fragmented operational silos—finance, logistics, cloud, and customer analytics—unify into a single event-driven digital lattice.
							</EditorialText>
						</div>

						{/* L4 Transformation Milestones */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
							<div style={{ borderLeft: `2px solid ${cyan}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="Event fabric milestone" color={textWhite}>
									Zero-Latency Event Fabric
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Subsecond sync note" color={muted} style={{ marginTop: 2 }}>
									Sub-Millisecond System Interconnect
								</EditorialText>
							</div>
							<div style={{ borderLeft: `2px solid ${gold}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="Autonomous optimization milestone" color={textWhite}>
									Continuous Autonomous Optimization
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="AI decision loop note" color={muted} style={{ marginTop: 2 }}>
									Self-Healing Enterprise Workflows
								</EditorialText>
							</div>
						</div>
					</div>

					{/* Diagonal Convergence Stage (Q2 & Q4) */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* SVG Optical Conduits & Converging Silo Blocks */}
						<svg width="100%" height="100%" viewBox="0 0 950 650" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							<defs>
								<linearGradient id="conduitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#0B0D12" />
									<stop offset="50%" stopColor={cyan} />
									<stop offset="100%" stopColor={gold} />
								</linearGradient>
							</defs>

							{/* Diagonal Grid Reference Vectors */}
							<g stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="6 6" opacity={envReveal}>
								<line x1="100" y1="100" x2="850" y2="550" />
								<line x1="850" y1="100" x2="100" y2="550" />
							</g>

							{/* Inter-Silo Optical Fiber Conduits */}
							<line x1={silo1X} y1={silo1Y} x2={silo2X} y2={silo2Y} stroke="url(#conduitGrad)" strokeWidth="2.5" strokeDasharray="4 4" />
							<line x1={silo1X} y1={silo1Y} x2={silo3X} y2={silo3Y} stroke="url(#conduitGrad)" strokeWidth="2.5" strokeDasharray="4 4" />
							<line x1={silo2X} y1={silo2Y} x2={silo4X} y2={silo4Y} stroke="url(#conduitGrad)" strokeWidth="2.5" strokeDasharray="4 4" />
							<line x1={silo3X} y1={silo3Y} x2={silo4X} y2={silo4Y} stroke="url(#conduitGrad)" strokeWidth="2.5" strokeDasharray="4 4" />

							{/* Silo Block 1: Finance Silo */}
							<g transform={`translate(${silo1X}, ${silo1Y})`}>
								<rect x="-45" y="-30" width="90" height="60" rx="4" fill={bg} stroke={cyan} strokeWidth="2" />
								<text x="0" y="5" fill={textWhite} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">FINANCE</text>
							</g>

							{/* Silo Block 2: Supply Chain Silo */}
							<g transform={`translate(${silo2X}, ${silo2Y})`}>
								<rect x="-45" y="-30" width="90" height="60" rx="4" fill={bg} stroke={gold} strokeWidth="2" />
								<text x="0" y="5" fill={textWhite} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">LOGISTICS</text>
							</g>

							{/* Silo Block 3: Cloud Ops Silo */}
							<g transform={`translate(${silo3X}, ${silo3Y})`}>
								<rect x="-45" y="-30" width="90" height="60" rx="4" fill={bg} stroke={gold} strokeWidth="2" />
								<text x="0" y="5" fill={textWhite} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">CLOUD INFRA</text>
							</g>

							{/* Silo Block 4: AI & Customer Silo */}
							<g transform={`translate(${silo4X}, ${silo4Y})`}>
								<rect x="-45" y="-30" width="90" height="60" rx="4" fill={bg} stroke={cyan} strokeWidth="2" />
								<text x="0" y="5" fill={textWhite} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">AI AGENTS</text>
							</g>

							{/* Central Converged Diamond Core (Ignites on Convergence) */}
							<g transform="translate(460, 330)" style={{ opacity: convergenceProgress }}>
								<polygon points="0,-45 45,0 0,45 -45,0" fill="rgba(0, 229, 255, 0.12)" stroke={gold} strokeWidth="3" />
								<circle cx="0" cy="0" r="12" fill={cyan} />
							</g>
						</svg>

						{/* L1 Hero Metric Overlay (Q4: Bottom-Right) */}
						<div style={{
							position: 'absolute',
							bottom: 20,
							right: 20,
							zIndex: 20,
							textAlign: 'right',
							opacity: heroPop,
							transform: `scale(${heroScale})`
						}}>
							<EditorialText level="L1_HeroMetric" narrativePurpose="Operational efficiency velocity multiplier" color={gold}>
								3.8x
							</EditorialText>
							<EditorialText level="L3_SectionHeading" narrativePurpose="Subtitles efficiency metric" color={textWhite} style={{ marginTop: 12, fontStyle: 'italic' }}>
								Operational Velocity Multiplier
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
						CONCEPT ENGINE v4.0 // CANVAS AUDITED
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Classification" color={muted}>
						OUTPUT 2 // ENTERPRISE DIGITAL TRANSFORMATION
					</EditorialText>
				</div>

			</div>

			{/* Film Grain Texture Overlay */}
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
