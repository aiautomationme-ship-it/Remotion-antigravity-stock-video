import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { cameraPresets } from './presets';

export const SceneDirector: React.FC<{
	children: React.ReactNode;
	presetId?: keyof typeof cameraPresets;
}> = ({ children, presetId = 'MicroOrbit' }) => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width, height } = useVideoConfig();
	const progress = frame / durationInFrames; // 0 to 1 over the whole video

	const preset = cameraPresets[presetId];
	const cameraStyle = preset.getStyle(progress);

	return (
		<AbsoluteFill style={{ 
			perspective: 1500, 
			backgroundColor: 'transparent',
			overflow: 'hidden'
		}}>
			<div style={{
				width: '100%',
				height: '100%',
				transformStyle: 'preserve-3d',
				transformOrigin: 'center center',
				...cameraStyle,
			}}>
				{children}
			</div>
			
			{/* Global Lens Effects could go here (e.g. Vignette) */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, bottom: 0,
				pointerEvents: 'none',
				background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.4) 150%)',
				zIndex: 9999
			}}/>
		</AbsoluteFill>
	);
};
