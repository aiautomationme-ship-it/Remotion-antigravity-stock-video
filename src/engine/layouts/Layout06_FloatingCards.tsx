import React from 'react';
import { LayoutProps } from './types';
import { useVideoConfig } from 'remotion';

/**
 * Layout 06: Floating Cards
 * Asymmetric overlapping depth layout with floating card nodes.
 */
export const Layout06_FloatingCards: React.FC<LayoutProps> = ({
	header,
	mainWidget,
	secondaryWidgets = [],
	padding,
	gap
}) => {
	const { width } = useVideoConfig();
	const p = padding ?? width * 0.04;
	const g = gap ?? width * 0.03;

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
			padding: p,
			boxSizing: 'border-box',
			position: 'relative'
		}}>
			{header && <div style={{ marginBottom: g }}>{header}</div>}
			<div style={{
				display: 'flex',
				flex: 1,
				gap: g,
				alignItems: 'center'
			}}>
				<div style={{ flex: 1.8 }}>{mainWidget}</div>
				<div style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					gap: g / 1.5,
					transform: 'translateY(-20px)'
				}}>
					{secondaryWidgets.slice(0, 3).map((w, i) => (
						<div key={i} style={{ marginLeft: i * 30 }}>{w}</div>
					))}
				</div>
			</div>
		</div>
	);
};
