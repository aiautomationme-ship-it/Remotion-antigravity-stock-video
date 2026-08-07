import React from 'react';
import { LayoutProps } from './types';
import { useVideoConfig } from 'remotion';

/**
 * Layout 05: Three Equal Columns
 * Clean 3-column layout ideal for side-by-side metric comparisons.
 */
export const Layout05_ThreeColumn: React.FC<LayoutProps> = ({
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
		}}>
			{header && <div style={{ marginBottom: g }}>{header}</div>}
			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: g,
				flex: 1,
			}}>
				{mainWidget && <div style={{ gridColumn: 'span 1' }}>{mainWidget}</div>}
				{secondaryWidgets.slice(0, 2).map((widget, i) => (
					<div key={i} style={{ gridColumn: 'span 1' }}>{widget}</div>
				))}
			</div>
		</div>
	);
};
