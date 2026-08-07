import React from 'react';
import { LayoutProps } from './types';
import { useVideoConfig } from 'remotion';

/**
 * Layout 10: Circular / Radial Focal Layout
 * Centralized circular focus node surrounded by key diagnostic stats.
 */
export const Layout10_CircularDashboard: React.FC<LayoutProps> = ({
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
			alignItems: 'center',
			width: '100%',
			height: '100%',
			padding: p,
			boxSizing: 'border-box',
		}}>
			{header && <div style={{ marginBottom: g, width: '100%', textAlign: 'center' }}>{header}</div>}
			<div style={{
				display: 'flex',
				flex: 1,
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				gap: g * 1.5
			}}>
				<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: g }}>
					{secondaryWidgets.slice(0, 2).map((w, i) => <div key={i}>{w}</div>)}
				</div>
				<div style={{ flex: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					{mainWidget}
				</div>
				<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: g }}>
					{secondaryWidgets.slice(2, 4).map((w, i) => <div key={i}>{w}</div>)}
				</div>
			</div>
		</div>
	);
};
