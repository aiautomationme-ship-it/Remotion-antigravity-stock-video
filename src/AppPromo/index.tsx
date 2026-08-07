import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { Intro } from './Intro';
import { Features } from './Features';
import { Outro } from './Outro';

export const AppPromo: React.FC = () => {
	const { durationInFrames } = useVideoConfig();

	// Total duration: 600 frames (10 seconds @ 60fps)
	// Intro: 0 to 180 (3 seconds)
	// Features: 180 to 420 (4 seconds)
	// Outro: 420 to 600 (3 seconds)

	return (
		<AbsoluteFill style={{ backgroundColor: '#0f172a', overflow: 'hidden' }}>
			<Sequence from={0} durationInFrames={180}>
				<Intro />
			</Sequence>
			<Sequence from={180} durationInFrames={240}>
				<Features />
			</Sequence>
			<Sequence from={420} durationInFrames={180}>
				<Outro />
			</Sequence>
		</AbsoluteFill>
	);
};
