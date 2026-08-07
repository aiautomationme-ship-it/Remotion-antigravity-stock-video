import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface ProgressIndicatorProps {
	items?: { label: string; progress: number }[];
	delay?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
	items = [{ label: 'System Check', progress: 90 }, { label: 'Data Sync', progress: 65 }, { label: 'Security Scan', progress: 40 }],
	delay = 0
}) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
			{items.map((item, i) => {
				const spr = spring({ frame: frame - delay - i * 4, fps, config: { damping: 15, mass: 0.8 } });
				return (
					<div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: theme.textPrimary }}>
							<span>{item.label}</span>
							<span>{Math.round(item.progress * spr)}%</span>
						</div>
						<div style={{ width: '100%', height: 8, borderRadius: 4, background: `${theme.textSecondary}33`, overflow: 'hidden' }}>
							<div style={{ width: `${item.progress * spr}%`, height: '100%', background: theme.accent1 }} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
