import React from 'react';
import { LayoutProps } from './types';

/**
 * Layout 02: Sidebar + Hero Chart + KPI Cards
 * Command center layout with strong focal point.
 */
export const Layout02_Sidebar: React.FC<LayoutProps> = ({
	header,
	sidebar,
	mainWidget,
	secondaryWidgets = [],
	padding = 50,
	gap = 28
}) => {
	return (
		<div style={{
			display: 'flex',
			width: '100%',
			height: '100%',
			padding,
			gap,
			boxSizing: 'border-box',
		}}>
			{sidebar && (
				<div style={{ width: '22%', display: 'flex', flexDirection: 'column' }}>
					{sidebar}
				</div>
			)}

			<div style={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				gap
			}}>
				{header && <div>{header}</div>}

				<div style={{
					display: 'flex',
					flex: 1,
					gap
				}}>
					<div style={{ flex: 2.2, display: 'flex' }}>
						{mainWidget}
					</div>

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
				</div>
			</div>
		</div>
	);
};
