import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { useDashboardState } from '../hooks/useDashboardState';

export const BarChart: React.FC<{
	data: number[];
	max: number;
	delay?: number;
	height?: number;
	color?: string;
}> = ({ data, max, delay = 0, height = 200, color = '#38bdf8' }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { getAmbientProgress } = useDashboardState();

	// Pulse effect during Phase 4 (Ambient Loop)
	// getAmbientProgress goes from 0 to 1 between seconds 8 and 10.
	// We use Math.sin to create a breathing pulse.
	const ambientPulse = Math.sin(getAmbientProgress() * Math.PI * 4) * 0.05; 

	return (
		<div style={{ display: 'flex', alignItems: 'flex-end', height, gap: 10, width: '100%' }}>
			{data.map((value, i) => {
				// Phase 2: Main Animation (bars growing)
				const itemDelay = delay + i * 5;
				
				const barScaleY = spring({
					frame: frame - itemDelay,
					fps,
					config: { damping: 14, mass: 0.6 },
				});

				const barHeight = (value / max) * height;

				return (
					<div
						key={i}
						style={{
							flex: 1,
							background: color,
							height: barHeight,
							borderRadius: '6px 6px 0 0',
							transformOrigin: 'bottom',
							transform: `scaleY(${Math.max(0, barScaleY + ambientPulse)})`,
							boxShadow: `0 0 15px ${color}40`,
						}}
					/>
				);
			})}
		</div>
	);
};
