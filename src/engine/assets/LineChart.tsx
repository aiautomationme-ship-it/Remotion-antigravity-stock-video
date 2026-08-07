import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface LineChartProps {
	data: { label: string; value: number }[];
	delay?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, delay = 0 }) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: { damping: 18, mass: 0.9 },
	});

	const maxVal = Math.max(...data.map(d => d.value), 1);
	const points = data.map((d, i) => {
		const x = (i / (data.length - 1)) * 360;
		const y = 140 - (d.value / maxVal) * 100 * progress;
		return `${x},${y}`;
	}).join(' ');

	const areaPoints = `0,140 ${points} 360,140`;

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<svg viewBox="0 0 360 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
				<defs>
					<linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={theme.accent1} stopOpacity="0.25" />
						<stop offset="100%" stopColor={theme.accent1} stopOpacity="0.0" />
					</linearGradient>
				</defs>

				{/* Gradient Fill under Area */}
				<polygon fill="url(#lineAreaGrad)" points={areaPoints} />

				{/* Stroke Line */}
				<polyline
					fill="none"
					stroke={theme.accent1}
					strokeWidth="3.5"
					points={points}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>

				{/* Data Nodes */}
				{data.map((d, i) => {
					const x = (i / (data.length - 1)) * 360;
					const y = 140 - (d.value / maxVal) * 100 * progress;
					return (
						<g key={i}>
							<circle cx={x} cy={y} r="5" fill={theme.background} stroke={theme.accent1} strokeWidth="3" />
						</g>
					);
				})}
			</svg>
		</div>
	);
};
