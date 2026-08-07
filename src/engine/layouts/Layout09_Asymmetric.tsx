import React from 'react';
import { LayoutProps } from './types';
import { useVideoConfig } from 'remotion';

/**
 * Layout 09: Asymmetric Modern Composition
 * Editorial offset grid with asymmetric balance.
 */
export const Layout09_Asymmetric: React.FC<LayoutProps> = ({
	header,
	mainWidget,
	secondaryWidgets = [],
	padding,
	gap
}) => {
	const { width } = useVideoConfig();
	const p = padding ?? width * 0.05;
	const g = gap ?? width * 0.03;

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
			<div style={{ display: 'flex', flex: 1, gap: g }}>
				<div style={{ flex: 1.2 }}>{mainWidget}</div>
				<div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: g }}>
					{secondaryWidgets.slice(0, 2).map((w, i) => (
						<div key={i} style={{ flex: 1 }}>{w}</div>
					))}
				</div>
			</div>
		</div>
	);
};
