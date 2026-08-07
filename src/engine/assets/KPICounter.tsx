import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export interface KPICounterProps {
	label: string;
	value: number;
	prefix?: string;
	suffix?: string;
	trend?: 'up' | 'down' | 'neutral';
	trendValue?: string;
	delay?: number;
}

export const KPICounter: React.FC<KPICounterProps> = ({
	label,
	value,
	prefix = '',
	suffix = '',
	trend,
	trendValue,
	delay = 0
}) => {
	const theme = useTheme();
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: { damping: 18, mass: 1 },
	});

	const displayValue = (progress * value).toFixed(value % 1 !== 0 ? 1 : 0);
	
	const trendOpacity = interpolate(frame - delay, [15, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp'
	});

	const isPositive = trend === 'up';
	const isNegative = trend === 'down';
	const pillBg = isPositive ? 'rgba(16, 185, 129, 0.15)' : isNegative ? 'rgba(239, 68, 68, 0.15)' : 'rgba(148, 163, 184, 0.15)';
	const pillColor = isPositive ? theme.accent2 : isNegative ? '#ef4444' : theme.textSecondary;

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
			<div style={{ 
				fontSize: 14, 
				fontWeight: 600, 
				color: theme.textSecondary, 
				marginBottom: 10, 
				textTransform: 'uppercase', 
				letterSpacing: '0.08em' 
			}}>
				{label}
			</div>
			
			<div style={{ 
				fontSize: 48, 
				fontWeight: 800, 
				color: theme.textPrimary, 
				lineHeight: 1.1,
				letterSpacing: '-0.02em'
			}}>
				{prefix}{displayValue}{suffix}
			</div>
			
			{trend && trendValue && (
				<div style={{ 
					marginTop: 14,
					opacity: trendOpacity,
					display: 'inline-flex',
					alignSelf: 'flex-start'
				}}>
					<div style={{
						padding: '4px 10px',
						borderRadius: 20,
						background: pillBg,
						color: pillColor,
						fontSize: 13,
						fontWeight: 700,
						display: 'flex',
						alignItems: 'center',
						gap: 6
					}}>
						<span>{isPositive ? '↑' : isNegative ? '↓' : '•'}</span>
						<span>{trendValue}</span>
					</div>
				</div>
			)}
		</div>
	);
};
