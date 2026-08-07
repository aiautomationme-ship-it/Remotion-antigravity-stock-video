import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThemeProvider } from '../styles/ThemeContext';
import { SceneDirector } from '../components/camera/SceneDirector';
import { DepthLayer } from '../components/layers/DepthLayer';

import { IntelligentSelection } from './VariationEngine';

// Import layouts dynamically based on string name
import * as Layouts from './layouts';

interface SceneBuilderProps {
	config: IntelligentSelection;
	content: {
		header?: React.ReactNode;
		sidebar?: React.ReactNode;
		mainWidget?: React.ReactNode;
		secondaryWidgets?: React.ReactNode[];
		footer?: React.ReactNode;
	};
}

/**
 * SceneBuilder orchestrates the Theme, Layout, and Camera.
 * It is the final step before Remotion renders the frame.
 */
export const SceneBuilder: React.FC<SceneBuilderProps> = ({ config, content }) => {
	// @ts-ignore - Dynamic layout selection
	const SelectedLayout = Layouts[config.layout] || Layouts.Layout01_Grid;

	return (
		<ThemeProvider initialTheme={config.theme}>
			<div style={{ flex: 1, width: '100%', height: '100%', fontFamily: 'system-ui' }}>
				{/* Background is handled by the ThemeProvider implicitly via an AbsoluteFill if we wanted, 
				    but let's wrap it in an AbsoluteFill here for safety */}
				<AbsoluteFill style={{ 
					// We'll apply the background color dynamically in the actual component using useTheme
				}}>
					{/* Theme Background Injector */}
					<ThemeBackground />

					<SceneDirector presetId={config.camera as any}>
						<DepthLayer zOffset={0}>
							<SelectedLayout {...content} />
						</DepthLayer>
					</SceneDirector>
				</AbsoluteFill>
			</div>
		</ThemeProvider>
	);
};

// Helper component to inject the theme background since SceneBuilder is inside ThemeProvider
import { useTheme } from '../styles/ThemeContext';
const ThemeBackground: React.FC = () => {
	const theme = useTheme();
	return (
		<AbsoluteFill style={{ 
			background: theme.background, 
			fontFamily: theme.fontFamily,
			color: theme.textPrimary
		}} />
	);
};
