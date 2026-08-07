import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();

	const opacity = interpolate(frame, [0, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Button pop-in
	const buttonScale = spring({
		frame: frame - 45,
		fps,
		config: { damping: 10, mass: 0.8 },
	});

	// Subtle pulse effect on the button
	const pulse = Math.sin((frame - 90) * 0.1) * 0.05 + 1;
	const finalScale = frame > 90 ? buttonScale * pulse : buttonScale;

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
				fontFamily: 'sans-serif',
				background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
			}}
		>
			<div
				style={{
					fontSize: width * 0.06,
					fontWeight: 'bold',
					color: 'white',
					marginBottom: width * 0.03,
				}}
			>
				Ready to create?
			</div>
			<div
				style={{
					transform: `scale(${finalScale})`,
					background: 'white',
					color: 'black',
					padding: `${width * 0.015}px ${width * 0.04}px`,
					borderRadius: width * 0.04,
					fontSize: width * 0.025,
					fontWeight: 'bold',
					boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
				}}
			>
				Download Now
			</div>
			<div
				style={{
					marginTop: width * 0.03,
					fontSize: width * 0.018,
					color: '#94a3b8',
				}}
			>
				www.antigravity.dev
			</div>
		</AbsoluteFill>
	);
};
