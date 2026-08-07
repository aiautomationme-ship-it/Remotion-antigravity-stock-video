import React from 'react';
import { useTheme } from '../../styles/ThemeContext';

interface WidgetContainerProps {
	children: React.ReactNode;
	style?: React.CSSProperties;
	noPadding?: boolean;
}

/**
 * Handles the material application (Theme, Borders, Shadows, Backgrounds).
 * This component DOES NOT ANIMATE. It relies on MotionWrapper for animation.
 */
export const WidgetContainer: React.FC<WidgetContainerProps> = ({ 
	children, 
	style,
	noPadding = false 
}) => {
	const theme = useTheme();

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				background: theme.panelBackground,
				border: theme.panelBorder,
				borderRadius: theme.borderRadius,
				padding: noPadding ? 0 : 40,
				display: 'flex',
				flexDirection: 'column',
				boxShadow: theme.panelShadow,
				overflow: 'hidden',
				position: 'relative',
				...style,
			}}
		>
			{children}
		</div>
	);
};
