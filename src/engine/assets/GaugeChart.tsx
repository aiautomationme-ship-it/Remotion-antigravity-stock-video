import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface GaugeChartProps {
	value?: number;
	label?: string;
	delay?: number;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ value = 82, label = 'Efficiency', delay = 0 }) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: { damping: 15, mass: 1 },
	});

	const rotation = -90 + (value / 100) * 180 * progress;

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
			<div style={{ position: 'relative', width: 150, height: 80, overflow: 'hidden' }}>
				<div style={{ width: 150, height: 150, borderRadius: '50%', border: `16px solid ${theme.accent1}44`, borderBottomColor: theme.accent1, borderRightColor: theme.accent1, transform: `rotate(${rotation}deg)` }} />
			</div>
			<div style={{ fontSize: 32, fontWeight: 'bold', color: theme.textPrimary, marginTop: 8 }}>{Math.round(value * progress)}%</div>
			<div style={{ fontSize: 14, color: theme.textSecondary }}>{label}</div>
		</div>
	);
};
