import React from 'react';
import { LayoutProps } from './types';

/**
 * Layout 03: Split Screen
 * Metrics left (40%), Main Visualization right (60%).
 */
export const Layout03_SplitScreen: React.FC<LayoutProps> = ({
	header,
	mainWidget,
	secondaryWidgets = [],
	padding = 50,
	gap = 32
}) => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
			padding,
			boxSizing: 'border-box',
		}}>
			{header && <div style={{ marginBottom: gap }}>{header}</div>}

			<div style={{
				display: 'flex',
				flex: 1,
				gap
			}}>
				<div style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					gap
				}}>
					{secondaryWidgets.slice(0, 3).map((widget, i) => (
						<div key={i} style={{ flex: 1, display: 'flex' }}>
							{widget}
						</div>
					))}
				</div>

				<div style={{
					flex: 1.6,
					display: 'flex'
				}}>
					{mainWidget}
				</div>
			</div>
		</div>
	);
};
