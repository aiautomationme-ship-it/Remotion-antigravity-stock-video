import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();

	// Spring animation for the logo scaling up
	const logoScale = spring({
		frame,
		fps,
		config: {
			damping: 12,
			mass: 0.5,
		},
	});

	// Opacity for the subtitle, fading in slightly after the logo
	const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Y-axis translation for subtitle sliding up
	const subtitleTranslateY = interpolate(frame, [30, 60], [100, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Fade out the entire scene at the end (from frame 150 to 180)
	const sceneOpacity = interpolate(frame, [150, 180], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				opacity: sceneOpacity,
				fontFamily: 'sans-serif',
			}}
		>
			<div
				style={{
					transform: `scale(${logoScale})`,
					fontSize: width * 0.1, // 10% of 4k width
					fontWeight: 'bold',
					color: 'white',
					background: 'linear-gradient(to right, #38bdf8, #818cf8)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				Antigravity
			</div>
			<div
				style={{
					marginTop: 40,
					fontSize: width * 0.03,
					color: '#cbd5e1',
					opacity: subtitleOpacity,
					transform: `translateY(${subtitleTranslateY}px)`,
				}}
			>
				The Future of Agentic Coding
			</div>
		</AbsoluteFill>
	);
};
