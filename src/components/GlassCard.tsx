import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const GlassCard: React.FC<{
	children: React.ReactNode;
	width?: number | string;
	height?: number | string;
	style?: React.CSSProperties;
	delay?: number;
}> = ({ children, width, height, style, delay = 0 }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	
	const scale = spring({
		frame: frame - delay,
		fps,
		config: { damping: 12, mass: 0.8 },
	});

	const translateY = interpolate(frame - delay, [0, 20], [100, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	
	const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const sweepProgress = interpolate(frame - delay - 30, [0, 60], [-100, 200], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				width,
				height,
				background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
				border: '1px solid rgba(255, 255, 255, 0.12)',
				borderRadius: 24,
				padding: 40,
				display: 'flex',
				flexDirection: 'column',
				boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
				opacity,
				transform: `scale(${scale * 0.1 + 0.9}) translateY(${translateY}px)`,
				position: 'relative',
				overflow: 'hidden',
				...style,
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: 0, left: 0, right: 0, bottom: 0,
					background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.06), transparent)',
					transform: `translateX(${sweepProgress}%)`,
					pointerEvents: 'none',
				}}
			/>
			{children}
		</div>
	);
};
