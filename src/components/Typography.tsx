import React from 'react';

export const Title: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
	<div style={{ fontSize: 48, fontWeight: 'bold', color: 'white', letterSpacing: '-0.02em', ...style }}>
		{children}
	</div>
);

export const Subtitle: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
	<div style={{ fontSize: 24, fontWeight: 'normal', color: '#94a3b8', ...style }}>
		{children}
	</div>
);

export const MetricLabel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
	<div style={{ fontSize: 32, fontWeight: 500, color: '#cbd5e1', letterSpacing: '0.05em', textTransform: 'uppercase', ...style }}>
		{children}
	</div>
);
