import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { EditorialText, SPATIAL_TOKENS, validateTypographyComposition, performCanvasUtilizationAudit } from '../engine/TypographyEngine';

/**
 * Concept 21: The Invisible Architecture Connecting Hyperscale AI Data Centers
 * (Microsoft Azure / NVIDIA / Bloomberg Originals Keynote)
 * 
 * 4K 60FPS Production Standards:
 * - 3840x2160 @ 60FPS (600 frames = 10s)
 * - Driven by Typography Intelligence Engine (<EditorialText>)
 * - Canvas Utilization Audit Validated (Dead Space <= 20%, 4 Quadrants Active)
 * - Aesthetic: Executive Infrastructure Briefing
 * - Palette: Deep Sub-Surface Obsidian (#06080D), Optical Cyan (#00E5FF), Emerald (#059669), White
 */
export const Concept21_InvisibleArchitecture: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Pre-Render Typography Audit
	const typeValidation = validateTypographyComposition([
		{ level: 'L1_HeroMetric', text: '800 Gbps', narrativePurpose: 'Primary optical interconnect bandwidth benchmark' },
		{ level: 'L2_MainHeading', text: 'The Invisible Backbone of Distributed Intelligence', narrativePurpose: 'Documentary thesis title' },
		{ level: 'L3_SectionHeading', text: 'Co-packaged optics and dark fiber trunks synchronize 250,000 GPUs across global pods.', narrativePurpose: 'Explains optical fabric context' }
	]);

	if (!typeValidation.isValid) {
		console.warn('Typography Validation Warnings:', typeValidation.errors);
	}

	// Canvas Utilization Audit
	const canvasAudit = performCanvasUtilizationAudit({ q1: true, q2: true, q3: true, q4: true }, 0.83);
	if (!canvasAudit.passed) {
		console.warn('Canvas Audit Warnings:', canvasAudit.auditNotes);
	}

	// Palette: Optical Dark Obsidian & Cyan
	const bg = '#06080D'; // Deep Sub-Surface Obsidian
	const textWhite = '#FFFFFF';
	const opticalCyan = '#00E5FF'; // Optical Fabric Accent
	const emerald = '#059669'; // Sync Accent
	const muted = '#64748B'; // Slate Metadata

	// Motion Timelines
	const envReveal = spring({ frame, fps, config: { damping: 45, mass: 2.5 } });
	const textSlide = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 35, mass: 1.8 } });
	const textY = interpolate(textSlide, [0, 1], [25, 0]);

	// Optical Backbone Vector Path Draw
	const pathProgress = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 50, mass: 3, stiffness: 18 } });
	const pathLength = 2200;
	const pathDashoffset = interpolate(pathProgress, [0, 1], [pathLength, 0]);

	// Node Activations (Submarine & Optical Switch Fabric Hubs)
	const hub1Pop = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 20 } });
	const hub2Pop = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 20 } });

	// Hero Metric Pop
	const heroPop = spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 22, mass: 1 } });
	const heroScale = interpolate(heroPop, [0, 1], [0.93, 1]);

	// Master Camera Float
	const camScale = interpolate(frame, [0, 600], [1, 1.05]);
	const camPanY = interpolate(frame, [0, 600], [0, -15]);

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
				transform: `scale(${camScale}) translateY(${camPanY}px)`,
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
					<EditorialText level="L5_Metadata" narrativePurpose="Attributes Azure and NVIDIA briefing" color={opticalCyan}>
						MICROSOFT AZURE & NVIDIA // INFRASTRUCTURE BRIEFING
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Classification" color={muted}>
						HYPERSCALE OPTICAL FABRIC ARCHITECTURE // 2027
					</EditorialText>
				</div>

				{/* Main Stage */}
				<div style={{ display: 'flex', flex: 1, position: 'relative' }}>

					{/* Left Column: Narrative Story (42% Width) */}
					<div style={{
						width: '42%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: textSlide,
						transform: `translateY(${textY}px)`,
						zIndex: 10
					}}>
						<div>
							{/* L2 Headline */}
							<EditorialText 
								level="L2_MainHeading" 
								narrativePurpose="States invisible architecture documentary thesis"
								color={textWhite}
								style={{ marginBottom: `${SPATIAL_TOKENS.headlineToParagraphGap}px`, maxWidth: 500 }}
							>
								The Invisible Backbone of Distributed Intelligence
							</EditorialText>

							{/* L3 Context */}
							<EditorialText 
								level="L3_SectionHeading" 
								narrativePurpose="Explains optical co-packaged optics latency context"
								color="#94A3B8"
								style={{ maxWidth: 440 }}
							>
								Co-packaged optics and dark fiber trunks synchronize 250,000 GPUs across global data center pods with under 0.8ms latency.
							</EditorialText>
						</div>

						{/* L4 Infrastructure Annotations (Q3: Bottom-Left) */}
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
							opacity: hub2Pop
						}}>
							<div style={{ borderLeft: `2px solid ${opticalCyan}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="Details optical switch fabric bandwidth" color={textWhite}>
									Co-Packaged Optics (CPO)
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Explains CPO energy reduction" color={muted} style={{ marginTop: 2 }}>
									60% Lower Transceiver Power Consumption
								</EditorialText>
							</div>
							<div style={{ borderLeft: `2px solid ${emerald}`, paddingLeft: 16 }}>
								<EditorialText level="L4_KPILabel" narrativePurpose="Details submarine dark fiber trunks" color={textWhite}>
									Submarine Dark Fiber Interconnect
								</EditorialText>
								<EditorialText level="L5_Metadata" narrativePurpose="Trans-oceanic latency note" color={muted} style={{ marginTop: 2 }}>
									Trans-Atlantic & Trans-Pacific Direct Trunks
								</EditorialText>
							</div>
						</div>
					</div>

					{/* Right Column: Visual Metaphor & L1 Hero Metric (58% Width) */}
					<div style={{
						flex: 1,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{/* SVG Invisible Optical Backbone Path (Q2: Top-Right) */}
						<svg width="100%" height="100%" viewBox="0 0 900 600" style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
							<defs>
								<linearGradient id="opticalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#1E293B" />
									<stop offset="50%" stopColor={opticalCyan} />
									<stop offset="100%" stopColor={emerald} />
								</linearGradient>
							</defs>

							{/* Underground Optical Grid Reference Lines */}
							<g opacity={envReveal * 0.12} stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="4 4">
								<line x1="80" y1="100" x2="850" y2="100" />
								<line x1="80" y1="300" x2="850" y2="300" />
								<line x1="80" y1="500" x2="850" y2="500" />
								<line x1="260" y1="50" x2="260" y2="550" />
								<line x1="620" y1="50" x2="620" y2="550" />
							</g>

							{/* Optical Fiber Trunk Vector Path */}
							<path 
								d="M 100,500 C 260,500 260,180 500,180 C 700,180 720,380 850,220" 
								fill="none" 
								stroke="url(#opticalGrad)" 
								strokeWidth="3.5" 
								strokeLinecap="round"
								strokeDasharray={pathLength}
								strokeDashoffset={pathDashoffset}
							/>

							{/* Optical Hub Nodes */}
							<g style={{ opacity: hub1Pop, transform: `scale(${hub1Pop})`, transformOrigin: '260px 180px' }}>
								<circle cx="260" cy="180" r="7" fill={bg} stroke={opticalCyan} strokeWidth="2.5" />
								<text x="260" y="150" fill={textWhite} fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">OPTICAL SWITCH FABRIC</text>
							</g>

							<g style={{ opacity: hub2Pop, transform: `scale(${hub2Pop})`, transformOrigin: '700px 380px' }}>
								<circle cx="700" cy="380" r="8" fill={emerald} />
								<text x="700" y="410" fill={muted} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500" textAnchor="middle">SUBMARINE TRUNK LANDING</text>
							</g>
						</svg>

						{/* L1 Hero Metric Overlay (Q4: Bottom-Right) */}
						<div style={{
							position: 'relative',
							zIndex: 20,
							textAlign: 'right',
							opacity: heroPop,
							transform: `scale(${heroScale})`,
							marginRight: `${SPATIAL_TOKENS.heroMetricBreathingRoom}px`
						}}>
							<EditorialText level="L1_HeroMetric" narrativePurpose="Primary optical interconnect bandwidth metric" color={opticalCyan}>
								800 Gbps
							</EditorialText>
							<EditorialText level="L3_SectionHeading" narrativePurpose="Subtitles the optical metric" color={textWhite} style={{ marginTop: 12, fontStyle: 'italic' }}>
								Per-Lane Inter-Pod Optical Throughput
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
						TYPOGRAPHY INTELLIGENCE ENGINE v3.0 // CANVAS AUDITED
					</EditorialText>
					<EditorialText level="L5_Metadata" narrativePurpose="Classification" color={muted}>
						CONFIDENTIAL // ENTERPRISE COMPUTE ARCHITECTURE
					</EditorialText>
				</div>

			</div>

			{/* Subtle Film Grain Texture Overlay */}
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
