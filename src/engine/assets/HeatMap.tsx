import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface HeatMapProps {
	rows?: number;
	cols?: number;
	delay?: number;
}

export const HeatMap: React.FC<HeatMapProps> = ({ rows = 4, cols = 6, delay = 0 }) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8, width: '100%', height: '100%', padding: 10 }}>
			{Array.from({ length: rows * cols }).map((_, i) => {
				const spr = spring({ frame: frame - delay - i * 2, fps, config: { damping: 12, mass: 0.5 } });
				const opacity = ((i * 17) % 100) / 100;
				return (
					<div key={i} style={{ background: theme.accent1, opacity: opacity * spr, borderRadius: 4, transform: `scale(${spr})` }} />
				);
			})}
		</div>
	);
};
