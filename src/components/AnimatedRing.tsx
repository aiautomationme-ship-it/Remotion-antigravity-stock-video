import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const AnimatedRing: React.FC<{
	progress: number; // 0 to 1
	size: number;
	strokeWidth: number;
	color: string;
	delay?: number;
}> = ({ progress, size, strokeWidth, color, delay = 0 }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const animatedProgress = spring({
		frame: frame - delay,
		fps,
		config: { damping: 12, mass: 1 },
	});

	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const strokeDashoffset = circumference - animatedProgress * progress * circumference;

	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
			{/* Background Ring */}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke="rgba(255,255,255,0.1)"
				strokeWidth={strokeWidth}
				fill="none"
			/>
			{/* Animated Foreground Ring */}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke={color}
				strokeWidth={strokeWidth}
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={strokeDashoffset}
				strokeLinecap="round"
				style={{
					transformOrigin: '50% 50%',
					transform: 'rotate(-90deg)',
				}}
			/>
		</svg>
	);
};
