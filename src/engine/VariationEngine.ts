import { themes } from '../styles/themes';
import { MotionType } from './motion/MotionWrapper';

export interface IntelligentSelection {
	theme: keyof typeof themes;
	layout: string;
	motion: MotionType;
	camera: string;
}

/**
 * Intelligent Selection Engine
 * Evaluates the business context of the prompt to choose the best combination
 * of Theme, Layout, Motion, and Camera with HIGH COLOR DIVERSITY (Gold, Green, Amber, Ivory, Black, Yellow, Burgundy).
 */
export const selectBestCombination = (category: string, promptText: string): IntelligentSelection => {
	const promptLower = promptText.toLowerCase();
	
	// Theme pool designed to rotate away from dominant blue/cyan palette
	const diverseThemes: (keyof typeof themes)[] = [
		'BloombergTerminal',   // Black + Green/Amber
		'LuxuryExecutive',    // Obsidian + Champagne Gold
		'EditorialBusiness',  // Warm Ivory Paper + Burgundy/Navy
		'NeoBrutalist',       // White + Bright Yellow/Coral
		'IndustrialControl',  // Dark Graphite + SCADA Green/Amber
		'AppleMinimal',       // Crisp White + Minimal Black/Orange
		'CorporateWhite',     // Soft Slate + Emerald/Indigo
		'ExecutiveDark',      // Charcoal + Emerald
		'ScientificLaboratory'// Clinical Slate + Teal
	];

	// Hash prompt string to deterministically select a distinct theme if no specific keyword matches
	let charSum = 0;
	for (let i = 0; i < promptText.length; i++) {
		charSum += promptText.charCodeAt(i);
	}

	let theme: keyof typeof themes = diverseThemes[charSum % diverseThemes.length];

	// Specific keyword matching for specialized themes
	if (promptLower.includes('finance') || promptLower.includes('trading') || promptLower.includes('stock') || promptLower.includes('bloomberg')) {
		theme = 'BloombergTerminal';
	} else if (promptLower.includes('luxury') || promptLower.includes('wealth') || promptLower.includes('gold') || promptLower.includes('premium') || promptLower.includes('portfolio')) {
		theme = 'LuxuryExecutive';
	} else if (promptLower.includes('factory') || promptLower.includes('industrial') || promptLower.includes('scada') || promptLower.includes('operation') || promptLower.includes('supply')) {
		theme = 'IndustrialControl';
	} else if (promptLower.includes('medical') || promptLower.includes('health') || promptLower.includes('laboratory') || promptLower.includes('diagnostic')) {
		theme = 'ScientificLaboratory';
	} else if (promptLower.includes('editorial') || promptLower.includes('report') || promptLower.includes('magazine') || promptLower.includes('thought')) {
		theme = 'EditorialBusiness';
	} else if (promptLower.includes('startup') || promptLower.includes('bold') || promptLower.includes('creative') || promptLower.includes('growth')) {
		theme = 'NeoBrutalist';
	} else if (promptLower.includes('minimal') || promptLower.includes('simple') || promptLower.includes('apple')) {
		theme = 'AppleMinimal';
	}

	// 2. Select Layout with variety
	const layouts = [
		'Layout01_Grid', 'Layout02_Sidebar', 'Layout03_SplitScreen', 'Layout04_CenterHero',
		'Layout05_ThreeColumn', 'Layout06_FloatingCards', 'Layout07_Timeline',
		'Layout08_AnalyticsWall', 'Layout09_Asymmetric', 'Layout10_CircularDashboard'
	];
	let layout = layouts[charSum % layouts.length];

	if (promptLower.includes('split') || promptLower.includes('compare')) {
		layout = 'Layout03_SplitScreen';
	} else if (promptLower.includes('sidebar') || promptLower.includes('menu')) {
		layout = 'Layout02_Sidebar';
	} else if (promptLower.includes('hero') || promptLower.includes('central')) {
		layout = 'Layout04_CenterHero';
	} else if (promptLower.includes('timeline')) {
		layout = 'Layout07_Timeline';
	}

	// 3. Select Motion
	let motion: MotionType = 'CorporatePrecision';
	if (theme === 'AppleMinimal' || theme === 'EditorialBusiness' || theme === 'LuxuryExecutive') {
		motion = 'Editorial';
	} else if (theme === 'BloombergTerminal' || theme === 'NeoBrutalist') {
		motion = 'None';
	} else if (theme === 'IndustrialControl') {
		motion = 'Mechanical';
	}

	// 4. Select Camera
	let camera = 'SlowPushIn';
	if (theme === 'BloombergTerminal' || theme === 'ScientificLaboratory' || theme === 'NeoBrutalist') {
		camera = 'Static';
	} else if (theme === 'LuxuryExecutive') {
		camera = 'MicroOrbit';
	}

	return { theme, layout, motion, camera };
};
