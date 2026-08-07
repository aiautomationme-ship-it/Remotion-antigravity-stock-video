import React from 'react';
import { AbsoluteFill } from 'remotion';

export const DepthLayer: React.FC<{
	children: React.ReactNode;
	zOffset: number; // Positive = closer to camera, Negative = further away
	style?: React.CSSProperties;
}> = ({ children, zOffset, style }) => {
	return (
		<AbsoluteFill style={{
			transformStyle: 'preserve-3d',
			transform: `translateZ(${zOffset}px)`,
			...style
		}}>
			{children}
		</AbsoluteFill>
	);
};
