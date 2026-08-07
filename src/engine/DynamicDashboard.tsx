import React, { useMemo } from 'react';
import { SceneBuilder } from './SceneBuilder';
import { selectBestCombination } from './VariationEngine';
import { 
	WidgetContainer, 
	KPICounter, 
	BarChart, 
	LineChart, 
	DonutChart, 
	PieChart, 
	GaugeChart, 
	HeatMap, 
	TimelineView, 
	Treemap, 
	ProgressIndicator 
} from './assets';
import { MotionWrapper, MotionType } from './motion/MotionWrapper';
import { useTheme } from '../styles/ThemeContext';

export interface DynamicDashboardProps {
	id?: number;
	category?: string;
	prompt?: string;
	forceTheme?: string;
	forceLayout?: string;
	forceCamera?: string;
	forceMotion?: MotionType;
	forceAsset?: string;
}

export const DynamicDashboard: React.FC<DynamicDashboardProps> = ({ 
	id = 1, 
	category = 'BUSINESS INTELLIGENCE DASHBOARDS', 
	prompt = 'Executive KPI Dashboard',
	forceTheme,
	forceLayout,
	forceCamera,
	forceMotion,
	forceAsset
}) => {
	const config = useMemo(() => {
		const base = selectBestCombination(category, prompt);
		if (forceTheme) base.theme = forceTheme as any;
		if (forceLayout) base.layout = forceLayout;
		if (forceCamera) base.camera = forceCamera as any;
		if (forceMotion) base.motion = forceMotion;
		return base;
	}, [category, prompt, forceTheme, forceLayout, forceCamera, forceMotion]);

	const headerContent = (
		<HeaderMetadata category={category} prompt={prompt} themeName={config.theme} isCentered={config.layout === 'Layout04_CenterHero' || config.layout === 'Layout10_CircularDashboard'} />
	);

	const renderPrimaryAsset = () => {
		const assetType = forceAsset || 'BarChart';
		switch (assetType) {
			case 'LineChart': return <LineChart data={[{ label: 'Mon', value: 35 }, { label: 'Tue', value: 70 }, { label: 'Wed', value: 50 }, { label: 'Thu', value: 92 }, { label: 'Fri', value: 85 }]} delay={40} />;
			case 'DonutChart': return <DonutChart percentage={84} label="Operational Efficiency" delay={40} />;
			case 'PieChart': return <PieChart delay={40} />;
			case 'GaugeChart': return <GaugeChart value={94} label="System Capacity" delay={40} />;
			case 'HeatMap': return <HeatMap delay={40} />;
			case 'TimelineView': return <TimelineView delay={40} />;
			case 'Treemap': return <Treemap delay={40} />;
			case 'ProgressIndicator': return <ProgressIndicator delay={40} />;
			case 'KPICards': return <KPICounter label="Core Performance Index" value={94.8} suffix="%" trend="up" trendValue="+11.2%" delay={40} />;
			case 'BarChart':
			default:
				return <BarChart data={[{ label: 'Q1', value: 48 }, { label: 'Q2', value: 84 }, { label: 'Q3', value: 68 }, { label: 'Q4', value: 120 }]} delay={40} />;
		}
	};

	const mainChart = (
		<MotionWrapper motionType={config.motion} delay={20} isHero={true}>
			<WidgetContainer>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
					<div style={{ fontSize: 18, fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
						Primary Analytics Overview
					</div>
					<div style={{ fontSize: 13, fontWeight: 600, opacity: 0.5 }}>REAL-TIME FEED</div>
				</div>
				{renderPrimaryAsset()}
			</WidgetContainer>
		</MotionWrapper>
	);

	const secondaryWidgets = [
		(
			<MotionWrapper motionType={config.motion} delay={10} key="kpi1">
				<WidgetContainer>
					<KPICounter label="Gross Revenue" value={142.8} prefix="$" suffix="M" trend="up" trendValue="+14.2%" delay={25} />
				</WidgetContainer>
			</MotionWrapper>
		),
		(
			<MotionWrapper motionType={config.motion} delay={20} key="kpi2">
				<WidgetContainer>
					<KPICounter label="Active Enterprise Users" value={918} suffix="K" trend="up" trendValue="+6.4%" delay={35} />
				</WidgetContainer>
			</MotionWrapper>
		),
		(
			<MotionWrapper motionType={config.motion} delay={30} key="kpi3">
				<WidgetContainer>
					<KPICounter label="Global Service SLA" value={99.95} suffix="%" trend="neutral" trendValue="0.0%" delay={45} />
				</WidgetContainer>
			</MotionWrapper>
		),
		(
			<MotionWrapper motionType={config.motion} delay={40} key="kpi4">
				<WidgetContainer>
					<KPICounter label="Critical Incident Rate" value={0.8} suffix="%" trend="down" trendValue="-0.3%" delay={55} />
				</WidgetContainer>
			</MotionWrapper>
		)
	];

	const sidebarContent = (
		<MotionWrapper motionType={config.motion} delay={10}>
			<WidgetContainer>
				<div style={{ fontSize: 14, fontWeight: 700, opacity: 0.5, marginBottom: 20, letterSpacing: '0.08em' }}>NAVIGATION</div>
				<ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16, fontSize: 18, fontWeight: 600 }}>
					<li style={{ opacity: 1, color: '#38bdf8' }}>• Executive Summary</li>
					<li style={{ opacity: 0.6 }}>• Financial Operations</li>
					<li style={{ opacity: 0.6 }}>• Network Security</li>
					<li style={{ opacity: 0.6 }}>• System Architecture</li>
				</ul>
			</WidgetContainer>
		</MotionWrapper>
	);

	return (
		<SceneBuilder 
			config={config} 
			content={{
				header: headerContent,
				mainWidget: mainChart,
				secondaryWidgets,
				sidebar: sidebarContent
			}} 
		/>
	);
};

// Clean Header Component inside Theme Context
const HeaderMetadata: React.FC<{ category: string; prompt: string; themeName: string; isCentered?: boolean }> = ({
	category,
	prompt,
	themeName,
	isCentered = false
}) => {
	const theme = useTheme();

	return (
		<div style={{ textAlign: isCentered ? 'center' : 'left', display: 'flex', flexDirection: 'column', alignItems: isCentered ? 'center' : 'flex-start' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
				<div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.accent1, boxShadow: `0 0 10px ${theme.accent1}` }} />
				<span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: theme.textSecondary, textTransform: 'uppercase' }}>
					{category} • ENTERPRISE ANALYTICS SYSTEM
				</span>
			</div>
			
			<h1 style={{ fontSize: 44, fontWeight: 800, margin: 0, padding: 0, color: theme.textPrimary, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
				{prompt}
			</h1>
		</div>
	);
};
