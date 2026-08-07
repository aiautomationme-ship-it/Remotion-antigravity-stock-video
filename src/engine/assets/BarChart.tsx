import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface BarChartProps {
	data: { label: string; value: number }[];
	maxValue?: number;
	delay?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, maxValue, delay = 0 }) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const actualMax = maxValue ?? Math.max(...data.map(d => d.value));

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', position: 'relative' }}>
			{/* Gridlines */}
			<div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 0.15, pointerEvents: 'none' }}>
				<div style={{ borderBottom: `1px dashed ${theme.textSecondary}` }} />
				<div style={{ borderBottom: `1px dashed ${theme.textSecondary}` }} />
				<div style={{ borderBottom: `1px dashed ${theme.textSecondary}` }} />
			</div>

			<div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', gap: 20, width: '100%', paddingBottom: 10 }}>
				{data.map((item, i) => {
					const itemDelay = delay + (i * 4);
					const progress = spring({
						frame: frame - itemDelay,
						fps,
						config: { damping: 16, mass: 0.8 },
					});
					
					const heightPercent = (item.value / actualMax) * 85 * progress;
					
					return (
						<div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', zIndex: 1 }}>
							{/* Value tag above bar */}
							<div style={{ 
								fontSize: 13, 
								fontWeight: 700, 
								color: theme.textPrimary, 
								marginBottom: 6, 
								opacity: progress > 0.4 ? 1 : 0 
							}}>
								{Math.round(item.value * progress)}
							</div>

							<div style={{ 
								width: '100%', 
								height: `${heightPercent}%`, 
								background: `linear-gradient(180deg, ${theme.accent1} 0%, ${theme.accent1}33 100%)`,
								borderRadius: '6px 6px 0 0',
								borderTop: `2px solid ${theme.accent1}`,
								boxShadow: `0 4px 12px ${theme.accent1}22`
							}} />

							<div style={{ 
								marginTop: 12, 
								fontSize: 13, 
								fontWeight: 600,
								color: theme.textSecondary,
								opacity: progress > 0.3 ? 1 : 0 
							}}>
								{item.label}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
