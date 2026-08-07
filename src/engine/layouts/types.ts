import React from 'react';

/**
 * Standardizes how data is passed to the Layout Engine.
 * A layout must accept these slots and determine how to arrange them spatially.
 */
export interface LayoutProps {
	header?: React.ReactNode;
	sidebar?: React.ReactNode;
	mainWidget?: React.ReactNode; // e.g., the primary chart or central KPI
	secondaryWidgets?: React.ReactNode[]; // e.g., surrounding KPI cards
	footer?: React.ReactNode;
	
	// Configuration
	padding?: number;
	gap?: number;
}
