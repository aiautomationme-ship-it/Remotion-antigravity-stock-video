import React from 'react';

export type TypographyStyle = 'editorial_hero' | 'technical_mono' | 'minimalist_swiss';

interface TypographyProps {
  typeStyle?: TypographyStyle;
  title: string;
  subtitle: string;
  glowColor: string;
  coreLight: string;
  style?: React.CSSProperties;
  textOpacity: number;
}

/**
 * 1. EXECUTIVE KEYNOTE HERO (Heavy stacked headlines + Pill Tags + Underlines)
 */
export const EditorialHeroTypography: React.FC<TypographyProps> = ({ title, subtitle, glowColor, coreLight, style, textOpacity }) => {
  return (
    <div style={{ ...style, opacity: textOpacity, zIndex: 5 }}>
      {/* Pill Badge Tag */}
      <div style={{
        display: 'inline-block',
        backgroundColor: `${glowColor}22`,
        border: `2px solid ${glowColor}`,
        borderRadius: 40,
        padding: '10px 24px',
        marginBottom: 24
      }}>
        <span style={{ color: glowColor, textTransform: 'uppercase', fontSize: 20, letterSpacing: 6, fontWeight: 800, fontFamily: "'Roboto Mono', monospace" }}>
          ● {subtitle}
        </span>
      </div>

      <h2 style={{ color: coreLight, fontSize: 130, fontWeight: 900, margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: -3, lineHeight: 1.05, maxWidth: 2200 }}>
        {title}
      </h2>

      {/* Accent Underline */}
      <div style={{ width: 280, height: 6, backgroundColor: glowColor, marginTop: 32, borderRadius: 3 }} />
    </div>
  );
};

/**
 * 2. TECHNICAL HUD MONOSPACE (Brackets [ SYS_ACT ], Parameter readouts, Coordinate Stamps)
 */
export const TechnicalMonoTypography: React.FC<TypographyProps> = ({ title, subtitle, glowColor, coreLight, style, textOpacity }) => {
  return (
    <div style={{ ...style, opacity: textOpacity, zIndex: 5 }}>
      <div style={{ color: glowColor, textTransform: 'uppercase', fontSize: 24, letterSpacing: 8, fontWeight: 700, fontFamily: "'Roboto Mono', monospace", marginBottom: 16 }}>
        [ LOC_PARAM // {subtitle} ]
      </div>

      <h2 style={{ 
        color: coreLight, 
        fontSize: 104, 
        fontWeight: 800, 
        margin: 0, 
        fontFamily: "'Roboto Mono', monospace", 
        letterSpacing: -1, 
        lineHeight: 1.1,
        borderLeft: `6px solid ${glowColor}`,
        paddingLeft: 32
      }}>
        {title}
      </h2>

      <div style={{ marginTop: 24, color: '#64748B', fontFamily: "'Roboto Mono', monospace", fontSize: 20, letterSpacing: 4 }}>
        STATUS: ONLINE // THRESHOLD: 99.98% // BUFFER: ACTIVE
      </div>
    </div>
  );
};

/**
 * 3. SWISS MINIMALIST (Asymmetric High-Contrast Typography, Ultra-Clean)
 */
export const MinimalistSwissTypography: React.FC<TypographyProps> = ({ title, subtitle, glowColor, coreLight, style, textOpacity }) => {
  return (
    <div style={{ ...style, opacity: textOpacity, zIndex: 5 }}>
      <span style={{ color: glowColor, textTransform: 'uppercase', fontSize: 28, letterSpacing: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", display: 'block', marginBottom: 20 }}>
        — {subtitle}
      </span>

      <h2 style={{ color: coreLight, fontSize: 160, fontWeight: 900, margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: -4, lineHeight: 0.98, maxWidth: 2400 }}>
        {title}
      </h2>
    </div>
  );
};

/**
 * MASTER TYPOGRAPHY SWITCH RESOLVER
 */
export const RenderTypography: React.FC<TypographyProps> = (props) => {
  switch (props.typeStyle) {
    case 'technical_mono':
      return <TechnicalMonoTypography {...props} />;
    case 'minimalist_swiss':
      return <MinimalistSwissTypography {...props} />;
    case 'editorial_hero':
    default:
      return <EditorialHeroTypography {...props} />;
  }
};
