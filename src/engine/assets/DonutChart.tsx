import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface DonutChartProps {
	percentage?: number;
	label?: string;
	delay?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({ percentage = 75, label = 'Usage', delay = 0 }) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: { damping: 14, mass: 1 },
	});

	const circumference = 2 * Math.PI * 45;
	const strokeDashoffset = circumference - (percentage / 100) * circumference * progress;

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
			<div style={{ position: 'relative', width: 140, height: 140 }}>
				<svg width="140" height="140" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="45" fill="none" stroke={theme.textSecondary} strokeWidth="10" opacity="0.2" />
					<circle
						cx="50"
						cy="50"
						r="45"
						fill="none"
						stroke={theme.accent1}
						strokeWidth="10"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
						transform="rotate(-90 50 50)"
					/>
				</svg>
				<div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 'bold', color: theme.textPrimary }}>
					{Math.round(percentage * progress)}%
				</div>
			</div>
			<div style={{ marginTop: 12, fontSize: 16, color: theme.textSecondary }}>{label}</div>
		</div>
	);
};
