import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface PieChartProps {
	data?: { label: string; value: number }[];
	delay?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ 
	data = [{ label: 'A', value: 40 }, { label: 'B', value: 35 }, { label: 'C', value: 25 }],
	delay = 0 
}) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: { damping: 14, mass: 1 },
	});

	const colors = [theme.accent1, theme.accent2, theme.accent3];

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, height: '100%' }}>
			<div style={{ width: 120, height: 120, borderRadius: '50%', background: `conic-gradient(${colors[0]} 0% 40%, ${colors[1]} 40% 75%, ${colors[2]} 75% 100%)`, transform: `scale(${progress})` }} />
			<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
				{data.map((item, i) => (
					<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: theme.textPrimary }}>
						<div style={{ width: 12, height: 12, borderRadius: 2, background: colors[i % colors.length] }} />
						<span>{item.label}: {item.value}%</span>
					</div>
				))}
			</div>
		</div>
	);
};
