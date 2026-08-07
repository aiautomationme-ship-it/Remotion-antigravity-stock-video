import React from 'react';
import { LayoutProps } from './types';
import { useVideoConfig } from 'remotion';

/**
 * Layout 08: High-Density Analytics Wall
 * 3x3 dense matrix representation for NOC/SCADA and high-density screens.
 */
export const Layout08_AnalyticsWall: React.FC<LayoutProps> = ({
	header,
	mainWidget,
	secondaryWidgets = [],
	padding,
	gap
}) => {
	const { width } = useVideoConfig();
	const p = padding ?? width * 0.03;
	const g = gap ?? width * 0.015;

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
			padding: p,
			boxSizing: 'border-box',
		}}>
			{header && <div style={{ marginBottom: g }}>{header}</div>}
			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gridTemplateRows: 'repeat(2, 1fr)',
				gap: g,
				flex: 1
			}}>
				<div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>{mainWidget}</div>
				{secondaryWidgets.slice(0, 2).map((w, i) => (
					<div key={i} style={{ gridColumn: 'span 1' }}>{w}</div>
				))}
			</div>
		</div>
	);
};
