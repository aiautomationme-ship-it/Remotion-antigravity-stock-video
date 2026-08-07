import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export const AmbientParticles: React.FC = () => {
	const frame = useCurrentFrame();
	const { width, height } = useVideoConfig();

	// Reduced to 15 particles for performance
	const particles = React.useMemo(() => {
		return Array.from({ length: 15 }).map((_, i) => ({
			id: i,
			x: Math.random() * width,
			y: Math.random() * height,
			size: Math.random() * 3 + 1,
			speedY: Math.random() * 0.4 + 0.1,
			opacity: Math.random() * 0.2 + 0.05,
		}));
	}, [width, height]);

	return (
		<div style={{ position: 'absolute', top: 0, left: 0, width, height, pointerEvents: 'none' }}>
			{particles.map((p) => {
				const currentY = (p.y - frame * p.speedY) % height;
				const displayY = currentY < 0 ? height + currentY : currentY;
				
				return (
					<div
						key={p.id}
						style={{
							position: 'absolute',
							left: p.x,
							top: displayY,
							width: p.size,
							height: p.size,
							borderRadius: '50%',
							background: 'white',
							opacity: p.opacity,
						}}
					/>
				);
			})}
		</div>
	);
};
