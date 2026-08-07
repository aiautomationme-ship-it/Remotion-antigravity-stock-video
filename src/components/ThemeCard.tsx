import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { useTheme } from '../styles/ThemeContext';

export const ThemeCard: React.FC<{
	children: React.ReactNode;
	width?: number | string;
	height?: number | string;
	style?: React.CSSProperties;
	delay?: number;
}> = ({ children, width, height, style, delay = 0 }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const theme = useTheme();
	
	const scale = spring({
		frame: frame - delay,
		fps,
		config: { damping: 12, mass: 0.8 },
	});

	const translateY = interpolate(frame - delay, [0, 30], [150, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	
	const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const sweepProgress = interpolate(frame - 300 - delay, [0, 90], [-100, 200], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				width,
				height,
				background: theme.panelBackground,
				border: theme.panelBorder,
				borderRadius: theme.borderRadius,
				padding: 40,
				display: 'flex',
				flexDirection: 'column',
				boxShadow: theme.panelShadow,
				opacity,
				transform: `scale(${scale * 0.1 + 0.9}) translateY(${translateY}px)`,
				position: 'relative',
				overflow: 'hidden',
				...style,
			}}
		>
			{/* Reflection Sweep — cheap gradient overlay, no blur */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.06), transparent)',
					transform: `translateX(${sweepProgress}%)`,
					pointerEvents: 'none',
				}}
			/>
			{children}
		</div>
	);
};
