import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface TimelineViewProps {
	events?: { title: string; date: string }[];
	delay?: number;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
	events = [{ title: 'Initiation', date: 'Q1' }, { title: 'Development', date: 'Q2' }, { title: 'Deployment', date: 'Q3' }],
	delay = 0
}) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
			{events.map((ev, i) => {
				const spr = spring({ frame: frame - delay - i * 5, fps, config: { damping: 14, mass: 0.8 } });
				return (
					<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: spr, transform: `translateX(${(1 - spr) * -30}px)` }}>
						<div style={{ width: 14, height: 14, borderRadius: '50%', background: theme.accent1 }} />
						<div>
							<div style={{ fontSize: 16, fontWeight: 'bold', color: theme.textPrimary }}>{ev.title}</div>
							<div style={{ fontSize: 12, color: theme.textSecondary }}>{ev.date}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
