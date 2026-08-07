import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

/**
 * Concept 09: Master Typography Hierarchy
 * Strictly following the defined typography rules:
 * - L1: Hero Metric (56-96px) -> 96px
 * - L2: Main Heading (36-48px) -> 48px
 * - L3: Section Heading (20-28px) -> 24px
 * - L4: KPI Labels (14-18px) -> 16px
 * - L5: Metadata (10-12px) -> 11px
 *
 * Rules:
 * - One focal point (The Hero Metric).
 * - Asymmetrical layout, intentional tension.
 * - No centered everything. No equal spacing.
 * - Typography dominates graphics.
 */
export const Concept09_MasterHierarchy: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Color Palette: High Contrast Editorial
	const bg = '#F4F4F0'; // Premium warm paper
	const ink = '#0F0F0F';
	const accent = '#D42A2A'; // Red accent for tension
	const muted = '#737373';

	// Animation Timelines
	// Asymmetrical reveal: Hero metric pops first to draw the eye, then supporting context fades in.
	const heroPop = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 20, mass: 1 } });
	const heroY = interpolate(heroPop, [0, 1], [30, 0]);

	const headingReveal = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 20, mass: 1 } });
	const contextReveal = spring({ frame: Math.max(0, frame - 75), fps, config: { damping: 20, mass: 1 } });
	
	const graphicReveal = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 30, mass: 2 } });
	const graphicWidth = interpolate(graphicReveal, [0, 1], [0, 100]);

	return (
		<AbsoluteFill style={{
			backgroundColor: bg,
			fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
			color: ink,
			padding: '80px 100px', // Strict grid padding
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between', // Tension between top and bottom
			overflow: 'hidden'
		}}>
			
			{/* TOP ROW: Metadata & Main Heading (L5 & L2) */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
				opacity: headingReveal,
				borderBottom: `2px solid ${ink}`,
				paddingBottom: 24
			}}>
				{/* L5 Metadata */}
				<div style={{
					fontSize: 11, // L5
					fontWeight: 600,
					letterSpacing: '0.15em',
					color: muted,
					textTransform: 'uppercase',
					marginTop: 12 // Misalignment for tension
				}}>
					Q4 2026 AUDITED REPORT
				</div>
				
				{/* L2 Main Heading */}
				<div style={{
					fontSize: 48, // L2
					fontWeight: 500,
					letterSpacing: '-0.02em',
					lineHeight: 1.1,
					maxWidth: 600,
					textAlign: 'right'
				}}>
					Global Revenue Capture & Strategic Expansion
				</div>
			</div>

			{/* MIDDLE ROW: Primary Focus - Asymmetrical Split */}
			<div style={{
				display: 'flex',
				flex: 1,
				marginTop: 60,
				marginBottom: 60,
				gap: 120 // Premium spacing
			}}>
				{/* Left Side: Supporting Context (L3 & L4) */}
				<div style={{
					flex: '0 0 300px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end', // Pushed down to create tension with top heading
					opacity: contextReveal
				}}>
					<div style={{
						width: `${graphicWidth}%`,
						height: 4,
						backgroundColor: accent,
						marginBottom: 32
					}} />
					
					{/* L3 Section Heading */}
					<div style={{
						fontSize: 24, // L3
						fontWeight: 600,
						marginBottom: 16,
						letterSpacing: '-0.01em'
					}}>
						North American Markets
					</div>
					
					{/* L4 KPI Labels / Context */}
					<div style={{
						fontSize: 16, // L4
						lineHeight: 1.5,
						color: muted,
						fontWeight: 400
					}}>
						Consolidated operational margins drove structural efficiency, resulting in unprecedented gross margin expansion across all enterprise SaaS verticals.
					</div>
				</div>

				{/* Right Side: The Hero (L1) */}
				<div style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-end',
					justifyContent: 'center', // Centered vertically in its massive space
					opacity: heroPop,
					transform: `translateY(${heroY}px)`
				}}>
					{/* L1 Hero Metric */}
					<div style={{
						fontSize: 96, // L1 Maximum visual weight
						fontWeight: 700,
						letterSpacing: '-0.04em',
						lineHeight: 1,
						color: ink
					}}>
						$1.42B
					</div>
					<div style={{
						fontSize: 24, // L3 (Sub-hero context)
						fontWeight: 500,
						color: accent,
						marginTop: 12,
						letterSpacing: '-0.01em'
					}}>
						+24.6% Year-over-Year
					</div>
				</div>
			</div>

			{/* BOTTOM ROW: Footer Metadata (L5) */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				opacity: headingReveal,
				borderTop: `1px solid rgba(15, 15, 15, 0.1)`,
				paddingTop: 24
			}}>
				<div style={{
					fontSize: 11, // L5
					fontWeight: 500,
					color: muted,
					letterSpacing: '0.05em'
				}}>
					CONFIDENTIAL & PROPRIETARY
				</div>
				<div style={{
					fontSize: 11, // L5
					fontWeight: 500,
					color: muted,
					letterSpacing: '0.05em'
				}}>
					FRAME 01 // OVERVIEW
				</div>
			</div>

		</AbsoluteFill>
	);
};
