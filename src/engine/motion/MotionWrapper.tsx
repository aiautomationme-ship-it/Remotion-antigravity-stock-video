import React from 'react';
import { spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export type MotionType = 
	| 'Mechanical' 
	| 'MechanicalSnap' 
	| 'Magnetic' 
	| 'Editorial' 
	| 'Liquid' 
	| 'Elastic' 
	| 'CorporatePrecision' 
	| 'Minimal' 
	| 'Dynamic'
	| 'SoftFade'
	| 'None';

interface MotionWrapperProps {
	children: React.ReactNode;
	motionType?: MotionType;
	delay?: number;
	isHero?: boolean;
}

/**
 * Storytelling Motion Engine
 * Implements 4-Act Narrative Timeline:
 * Act 1 (0-2s): Structure Assembles
 * Act 2 (2-5s): Hero Focus
 * Act 3 (5-8s): Secondary Resolution
 * Act 4 (8-10s): Subtle Ambient Breathing
 */
export const MotionWrapper: React.FC<MotionWrapperProps> = ({ 
	children, 
	motionType = 'CorporatePrecision',
	delay = 0,
	isHero = false
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	if (motionType === 'None') {
		return <>{children}</>;
	}

	// Act 1: Structural Assembly Entrance (0-2s, 0-120 frames)
	const entranceOpacity = interpolate(frame - delay, [0, 24], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const entranceY = interpolate(frame - delay, [0, 36], [24, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Act 2: Hero Emphasis (2-5s, 120-300 frames)
	const heroScale = isHero 
		? spring({
				frame: Math.max(0, frame - 120 - delay),
				fps,
				config: { damping: 20, mass: 1 },
		  }) * 0.02
		: 0;

	// Act 4: Ambient Breathing (8-10s, 480-600 frames)
	const ambientScale = Math.sin((frame / 60) * Math.PI) * 0.003;

	const totalScale = 1 + heroScale + (frame > 480 ? ambientScale : 0);

	return (
		<div style={{
			opacity: entranceOpacity,
			transform: `translateY(${entranceY}px) scale(${totalScale})`,
			transformOrigin: 'center center',
			width: '100%',
			height: '100%',
			display: 'flex',
			transition: 'transform 0.3s ease-out'
		}}>
			{children}
		</div>
	);
};
