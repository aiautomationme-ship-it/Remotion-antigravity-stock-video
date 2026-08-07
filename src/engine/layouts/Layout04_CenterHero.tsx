import React from 'react';
import { LayoutProps } from './types';

/**
 * Layout 04: Center Hero Focal Point
 * Massive hero visualization flanked by balanced secondary metrics.
 */
export const Layout04_CenterHero: React.FC<LayoutProps> = ({
	header,
	mainWidget,
	secondaryWidgets = [],
	padding = 50,
	gap = 28
}) => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
			height: '100%',
			padding,
			boxSizing: 'border-box',
		}}>
			{header && (
				<div style={{ marginBottom: gap, width: '100%', textAlign: 'center' }}>
					{header}
				</div>
			)}

			<div style={{
				display: 'flex',
				flex: 1,
				width: '100%',
				gap,
				alignItems: 'stretch'
			}}>
				<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap }}>
					{secondaryWidgets.slice(0, 2).map((widget, i) => (
						<div key={`left-${i}`} style={{ flex: 1, display: 'flex' }}>{widget}</div>
					))}
				</div>

				<div style={{ flex: 2.2, display: 'flex' }}>
					{mainWidget}
				</div>

				<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap }}>
					{secondaryWidgets.slice(2, 4).map((widget, i) => (
						<div key={`right-${i}`} style={{ flex: 1, display: 'flex' }}>{widget}</div>
					))}
				</div>
			</div>
		</div>
	);
};
