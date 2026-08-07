export interface SupportingDataItem {
	label: string;
	value: string;
}

export interface BusinessNarrative {
	topic: string;
	narrativeStatement: string;
	heroInsight: string;
	supportingData: SupportingDataItem[];
	viewerTakeaway: string;
	recommendedLayout: 'FullCanvasEditorialLine' | 'KineticTextDocumentary' | 'IsometricSculpture' | 'MinimalistHeroMetric';
}

/**
 * Module 1: Business Narrative Engine
 * Transforms raw business topics or prompts into structured, story-driven narrative models.
 */
export function generateBusinessNarrative(topicInput: string): BusinessNarrative {
	const normalized = topicInput.toLowerCase();

	if (normalized.includes('renewable') || normalized.includes('sustainability') || normalized.includes('green')) {
		return {
			topic: 'Renewable Energy',
			narrativeStatement: 'Carbon emissions reduced by 64% through aggressive renewable infrastructure re-allocation.',
			heroInsight: '-64%',
			supportingData: [
				{ label: 'Green Bond Issuance', value: '$4.2B' },
				{ label: 'Solar Capacity Installed', value: '1.2 GW' },
				{ label: 'Transition Horizon', value: '2025–2027' }
			],
			viewerTakeaway: 'The company successfully accelerated its sustainability transition ahead of target.',
			recommendedLayout: 'FullCanvasEditorialLine'
		};
	}

	if (normalized.includes('compute') || normalized.includes('ai') || normalized.includes('nvidia') || normalized.includes('gpu')) {
		return {
			topic: 'AI Infrastructure Scale',
			narrativeStatement: 'Cluster throughput multiplied by 4.2x following deployment of next-gen tensor accelerators.',
			heroInsight: '42.8 PFLOPS',
			supportingData: [
				{ label: 'AI Accelerators', value: '12,480 Nodes' },
				{ label: 'Cluster Latency', value: '1.2 μs' },
				{ label: 'GPU Utilization Rate', value: '98.7%' }
			],
			viewerTakeaway: 'Enterprise AI capabilities scaled exponentially with sub-millisecond cluster latency.',
			recommendedLayout: 'MinimalistHeroMetric'
		};
	}

	// Default Fallback Narrative (Corporate M&A / Value Creation)
	return {
		topic: topicInput || 'Executive Strategy',
		narrativeStatement: 'Operational realignment across core international units unlocked $1.1B in retained capital.',
		heroInsight: '$1.1B',
		supportingData: [
			{ label: 'Operating Synergies', value: '$340M' },
			{ label: 'Margin Expansion', value: '+142 bps' },
			{ label: 'Execution Window', value: '18 Months' }
		],
		viewerTakeaway: 'The strategic realignment delivered immediate balance sheet resilience.',
		recommendedLayout: 'KineticTextDocumentary'
	};
}
