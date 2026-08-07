import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const AnimatedNumber: React.FC<{
	target: number;
	delay?: number;
	prefix?: string;
	suffix?: string;
	style?: React.CSSProperties;
	decimals?: number;
}> = ({ target, delay = 0, prefix = '', suffix = '', style, decimals = 0 }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: { damping: 14, mass: 0.8 },
	});

	const currentValue = progress * target;
	const displayValue = currentValue.toFixed(decimals);

	return (
		<span style={style}>
			{prefix}{displayValue}{suffix}
		</span>
	);
};
