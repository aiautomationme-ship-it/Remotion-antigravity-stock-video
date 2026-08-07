import React from 'react';
import { LayoutProps } from './types';

/**
 * Layout 01: Standard Header + KPI Grid + Charts
 * Generous whitespace, clean 60/40 visual dominance.
 */
export const Layout01_Grid: React.FC<LayoutProps> = ({
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
			width: '100%',
			height: '100%',
			padding,
			boxSizing: 'border-box',
		}}>
			{header && <div style={{ marginBottom: gap }}>{header}</div>}

			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap,
				flex: 1,
			}}>
				{/* Top Row: KPIs */}
				{secondaryWidgets.length > 0 && (
					<div style={{
						display: 'grid',
						gridTemplateColumns: `repeat(${Math.min(secondaryWidgets.length, 4)}, 1fr)`,
						gap,
						height: 180
					}}>
						{secondaryWidgets.slice(0, 4).map((widget, i) => (
							<div key={i} style={{ height: '100%' }}>{widget}</div>
						))}
					</div>
				)}

				{/* Bottom Hero Chart spanning full width */}
				{mainWidget && (
					<div style={{ flex: 1, display: 'flex' }}>
						{mainWidget}
					</div>
				)}
			</div>
		</div>
	);
};
