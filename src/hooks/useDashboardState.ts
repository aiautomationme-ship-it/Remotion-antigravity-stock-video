import { useCurrentFrame, useVideoConfig } from 'remotion';

export type DashboardState = 
	| 'IDLE' 
	| 'ASSEMBLY' // 0-2s (0-120 frames at 60fps)
	| 'MAIN_ANIMATION' // 2-5s (120-300 frames)
	| 'SECONDARY_MOTION' // 5-8s (300-480 frames)
	| 'AMBIENT_LOOP'; // 8-10s (480-600 frames)

export const useDashboardState = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Calculate thresholds based on FPS (assuming 60fps standard for these metrics)
	const assemblyEnd = 2 * fps;
	const mainEnd = 5 * fps;
	const secondaryEnd = 8 * fps;

	let currentState: DashboardState = 'IDLE';

	if (frame < assemblyEnd) {
		currentState = 'ASSEMBLY';
	} else if (frame < mainEnd) {
		currentState = 'MAIN_ANIMATION';
	} else if (frame < secondaryEnd) {
		currentState = 'SECONDARY_MOTION';
	} else {
		currentState = 'AMBIENT_LOOP';
	}

	return {
		frame,
		fps,
		currentState,
		// Helpers to get local progress (0 to 1) within a specific phase
		getAssemblyProgress: () => Math.min(1, Math.max(0, frame / assemblyEnd)),
		getMainProgress: () => Math.min(1, Math.max(0, (frame - assemblyEnd) / (mainEnd - assemblyEnd))),
		getSecondaryProgress: () => Math.min(1, Math.max(0, (frame - mainEnd) / (secondaryEnd - mainEnd))),
		getAmbientProgress: () => Math.min(1, Math.max(0, (frame - secondaryEnd) / (10 * fps - secondaryEnd))),
	};
};
