import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const FeatureCard: React.FC<{ index: number; title: string; description: string }> = ({ index, title, description }) => {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();
	
	const delay = index * 30; // stagger by 30 frames (0.5s)
	
	const scale = spring({
		frame: frame - delay,
		fps,
		config: { damping: 14, mass: 0.6 },
	});
	
	const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				transform: `scale(${scale})`,
				opacity,
				background: 'rgba(255, 255, 255, 0.05)',
				backdropFilter: 'blur(20px)',
				borderRadius: width * 0.015,
				padding: width * 0.03,
				border: '2px solid rgba(255, 255, 255, 0.1)',
				width: width * 0.25,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
			}}
		>
			<div style={{ fontSize: width * 0.03, color: 'white', fontWeight: 'bold', marginBottom: width * 0.01 }}>
				{title}
			</div>
			<div style={{ fontSize: width * 0.018, color: '#94a3b8', textAlign: 'center', lineHeight: 1.5 }}>
				{description}
			</div>
		</div>
	);
};

export const Features: React.FC = () => {
	const frame = useCurrentFrame();
	const { width } = useVideoConfig();

	// Fade out scene at the end (from frame 210 to 240)
	const sceneOpacity = interpolate(frame, [210, 240], [1, 0], {
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
			<div style={{
				fontSize: width * 0.05,
				fontWeight: 'bold',
				color: 'white',
				marginBottom: width * 0.05,
				textShadow: '0 10px 20px rgba(0,0,0,0.5)'
			}}>
				Supercharge Your Workflow
			</div>
			
			<div style={{ display: 'flex', gap: width * 0.03 }}>
				<FeatureCard index={0} title="Autonomous" description="Agents build, debug, and plan for you seamlessly." />
				<FeatureCard index={1} title="Lightning Fast" description="Save hours of manual coding and configuration." />
				<FeatureCard index={2} title="Fully Extensible" description="Customize skills to fit your exact stack perfectly." />
			</div>
		</AbsoluteFill>
	);
};
