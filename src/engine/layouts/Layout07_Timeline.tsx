import React from 'react';
import { LayoutProps } from './types';
import { useVideoConfig } from 'remotion';

/**
 * Layout 07: Horizontal Timeline Focus
 * Focuses on sequential milestones across a central horizontal axis.
 */
export const Layout07_Timeline: React.FC<LayoutProps> = ({
	header,
	mainWidget,
	secondaryWidgets = [],
	padding,
	gap
}) => {
	const { width } = useVideoConfig();
	const p = padding ?? width * 0.04;
	const g = gap ?? width * 0.02;

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
			padding: p,
			boxSizing: 'border-box',
			justifyContent: 'space-between'
		}}>
			{header && <div style={{ marginBottom: g }}>{header}</div>}
			<div style={{ flex: 1.5, display: 'flex', marginBottom: g }}>{mainWidget}</div>
			<div style={{ display: 'flex', gap: g, flex: 1 }}>
				{secondaryWidgets.slice(0, 4).map((w, i) => (
					<div key={i} style={{ flex: 1 }}>{w}</div>
				))}
			</div>
		</div>
	);
};
