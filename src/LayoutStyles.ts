import React from 'react';

export type LayoutStyleType = 'vertical_spine' | 'corner_badge' | 'minimalist_footer' | 'clean_giant';

export interface LayoutPositionConfig {
  metaStyle: React.CSSProperties;
  titleStyle: React.CSSProperties;
  showBorders: boolean;
}

export const EDITORIAL_LAYOUTS: Record<LayoutStyleType, LayoutPositionConfig> = {
  vertical_spine: {
    metaStyle: {
      position: 'absolute',
      left: 120,
      top: 200,
      transform: 'rotate(-90deg) translateX(-100%)',
      transformOrigin: 'left top',
      fontFamily: 'Roboto Mono, monospace',
      fontSize: 24,
      letterSpacing: 12,
    },
    titleStyle: {
      position: 'absolute',
      left: 360,
      top: 800,
    },
    showBorders: false,
  },
  corner_badge: {
    metaStyle: {
      position: 'absolute',
      right: 160,
      top: 160,
      border: '2px solid rgba(0, 255, 255, 0.4)',
      padding: '16px 32px',
      fontFamily: 'Roboto Mono, monospace',
      fontSize: 22,
      letterSpacing: 6,
    },
    titleStyle: {
      position: 'absolute',
      left: 480,
      bottom: 400,
    },
    showBorders: false,
  },
  minimalist_footer: {
    metaStyle: {
      position: 'absolute',
      left: 200,
      bottom: 120,
      fontFamily: 'Inter, sans-serif',
      fontSize: 26,
      letterSpacing: 4,
      opacity: 0.6,
    },
    titleStyle: {
      position: 'absolute',
      left: 200,
      top: 600,
    },
    showBorders: true, // Only this layout gets elegant boundary line accents
  },
  clean_giant: {
    metaStyle: {
      display: 'none', // Completely removes metadata clutter
    },
    titleStyle: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      textAlign: 'center',
    },
    showBorders: false,
  },
};
