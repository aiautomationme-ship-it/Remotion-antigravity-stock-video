import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface TreemapProps {
	delay?: number;
}

export const Treemap: React.FC<TreemapProps> = ({ delay = 0 }) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const spr = spring({ frame: frame - delay, fps, config: { damping: 14, mass: 0.9 } });

	return (
		<div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8, width: '100%', height: '100%', opacity: spr }}>
			<div style={{ gridRow: 'span 2', background: `${theme.accent1}44`, border: `1px solid ${theme.accent1}`, padding: 12, color: theme.textPrimary, borderRadius: 6 }}>Segment Alpha</div>
			<div style={{ background: `${theme.accent2}44`, border: `1px solid ${theme.accent2}`, padding: 12, color: theme.textPrimary, borderRadius: 6 }}>Segment Beta</div>
			<div style={{ background: `${theme.accent3}44`, border: `1px solid ${theme.accent3}`, padding: 12, color: theme.textPrimary, borderRadius: 6 }}>Segment Gamma</div>
		</div>
	);
};
