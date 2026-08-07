export type ThemeType = {
	name: string;
	background: string;
	panelBackground: string;
	panelBorder: string;
	panelShadow: string;
	textPrimary: string;
	textSecondary: string;
	accent1: string;
	accent2: string;
	accent3: string;
	fontFamily: string;
	borderRadius: number;
};

export const themes: Record<string, ThemeType> = {
	// 01 - Corporate White (Ref: Microsoft / Salesforce)
	CorporateWhite: {
		name: 'Corporate White',
		background: '#f8fafc',
		panelBackground: '#ffffff',
		panelBorder: '1px solid #e2e8f0',
		panelShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
		textPrimary: '#0f172a',
		textSecondary: '#64748b',
		accent1: '#2563eb',
		accent2: '#10b981',
		accent3: '#f59e0b',
		fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		borderRadius: 12,
	},

	// 02 - Executive Dark (Ref: Figma / Vercel Enterprise)
	ExecutiveDark: {
		name: 'Executive Dark',
		background: '#0b0f19',
		panelBackground: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)',
		panelBorder: '1px solid rgba(255, 255, 255, 0.08)',
		panelShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
		textPrimary: '#f8fafc',
		textSecondary: '#94a3b8',
		accent1: '#38bdf8',
		accent2: '#34d399',
		accent3: '#818cf8',
		fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
		borderRadius: 16,
	},

	// 03 - Glass Premium (Ref: Apple / VisionOS)
	GlassPremium: {
		name: 'Glass Premium',
		background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #030712 100%)',
		panelBackground: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
		panelBorder: '1px solid rgba(255, 255, 255, 0.12)',
		panelShadow: '0 24px 48px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
		textPrimary: '#ffffff',
		textSecondary: '#a1a1aa',
		accent1: '#06b6d4',
		accent2: '#10b981',
		accent3: '#a855f7',
		fontFamily: 'Inter, system-ui, sans-serif',
		borderRadius: 24,
	},

	// 04 - Bloomberg Terminal (Ref: Bloomberg Financial Software)
	BloombergTerminal: {
		name: 'Bloomberg Terminal',
		background: '#000000',
		panelBackground: '#121212',
		panelBorder: '1px solid #262626',
		panelShadow: 'none',
		textPrimary: '#ffffff',
		textSecondary: '#a3a3a3',
		accent1: '#22c55e',
		accent2: '#f59e0b',
		accent3: '#3b82f6',
		fontFamily: '"IBM Plex Mono", "JetBrains Mono", Consolas, monospace',
		borderRadius: 0,
	},

	// 05 - Apple Minimal (Ref: Apple Product Landing Pages / Linear)
	AppleMinimal: {
		name: 'Apple Minimal',
		background: '#ffffff',
		panelBackground: '#f5f5f7',
		panelBorder: '1px solid rgba(0, 0, 0, 0.04)',
		panelShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
		textPrimary: '#1d1d1f',
		textSecondary: '#86868b',
		accent1: '#0066cc',
		accent2: '#30b0c7',
		accent3: '#ff9500',
		fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif',
		borderRadius: 20,
	},

	// 06 - Scientific Laboratory (Ref: Siemens Healthineers / Lab Systems)
	ScientificLaboratory: {
		name: 'Scientific Laboratory',
		background: '#f1f5f9',
		panelBackground: '#ffffff',
		panelBorder: '1px solid #cbd5e1',
		panelShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
		textPrimary: '#0f172a',
		textSecondary: '#64748b',
		accent1: '#0e7490',
		accent2: '#0d9488',
		accent3: '#2563eb',
		fontFamily: 'Inter, -apple-system, sans-serif',
		borderRadius: 6,
	},

	// 07 - Blueprint Engineering (Ref: Autodesk / CAD Software)
	BlueprintEngineering: {
		name: 'Blueprint Engineering',
		background: '#032b57',
		panelBackground: 'rgba(3, 43, 87, 0.6)',
		panelBorder: '1px solid rgba(0, 240, 255, 0.3)',
		panelShadow: '0 0 20px rgba(0, 240, 255, 0.05)',
		textPrimary: '#ffffff',
		textSecondary: '#7dd3fc',
		accent1: '#00f0ff',
		accent2: '#38bdf8',
		accent3: '#f97316',
		fontFamily: '"IBM Plex Mono", Consolas, monospace',
		borderRadius: 2,
	},

	// 08 - Luxury Executive (Ref: Porsche Design / Wealth Management)
	LuxuryExecutive: {
		name: 'Luxury Executive',
		background: '#09090b',
		panelBackground: 'linear-gradient(145deg, #18181b 0%, #09090b 100%)',
		panelBorder: '1px solid rgba(212, 175, 55, 0.25)',
		panelShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
		textPrimary: '#fafafa',
		textSecondary: '#a1a1aa',
		accent1: '#d4af37', // Gold
		accent2: '#e5e4e2', // Platinum
		accent3: '#c5a059',
		fontFamily: 'Inter, Georgia, serif',
		borderRadius: 16,
	},

	// 09 - Industrial Control (Ref: ABB / SCADA HMI)
	IndustrialControl: {
		name: 'Industrial Control',
		background: '#1e2530',
		panelBackground: '#2d3748',
		panelBorder: '1px solid #1a202c',
		panelShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 16px rgba(0,0,0,0.35)',
		textPrimary: '#f7fafc',
		textSecondary: '#cbd5e0',
		accent1: '#10b981', // Operational Green
		accent2: '#f59e0b', // Amber Warning
		accent3: '#ef4444', // Red Alert
		fontFamily: '"IBM Plex Sans", -apple-system, sans-serif',
		borderRadius: 4,
	},

	// 10 - Cyber Executive (Ref: Cloudflare / Datadog)
	CyberExecutive: {
		name: 'Cyber Executive',
		background: '#060913',
		panelBackground: 'linear-gradient(145deg, #0f172a 0%, #090d16 100%)',
		panelBorder: '1px solid rgba(59, 130, 246, 0.2)',
		panelShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.05)',
		textPrimary: '#f8fafc',
		textSecondary: '#94a3b8',
		accent1: '#3b82f6',
		accent2: '#8b5cf6',
		accent3: '#06b6d4',
		fontFamily: '"Space Grotesk", Inter, sans-serif',
		borderRadius: 12,
	},

	// 11 - Editorial Business (Ref: Financial Times / McKinsey Insights)
	EditorialBusiness: {
		name: 'Editorial Business',
		background: '#fbf9f5',
		panelBackground: '#ffffff',
		panelBorder: '1px solid #e7e4df',
		panelShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
		textPrimary: '#1a1a1a',
		textSecondary: '#666666',
		accent1: '#1e3a8a',
		accent2: '#7f1d1d',
		accent3: '#047857',
		fontFamily: 'Inter, "Source Serif Pro", Georgia, serif',
		borderRadius: 0,
	},

	// 12 - Neo Brutalist (Ref: Gumroad / Modern Startup Branding)
	NeoBrutalist: {
		name: 'Neo Brutalist',
		background: '#ffffff',
		panelBackground: '#ffffff',
		panelBorder: '3px solid #000000',
		panelShadow: '6px 6px 0px #000000',
		textPrimary: '#000000',
		textSecondary: '#404040',
		accent1: '#facc15',
		accent2: '#2563eb',
		accent3: '#f43f5e',
		fontFamily: '"Space Grotesk", Inter, sans-serif',
		borderRadius: 0,
	}
};
