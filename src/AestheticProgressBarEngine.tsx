import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface ProgressBarProps {
  glowColor?: string;
  gradientEndColor?: string;
  barWidth?: number;
  barHeight?: number;
  showPercent?: boolean;
}

/**
 * MINIMALIST AESTHETIC PROGRESS BAR ENGINE (FOR STUDY & FOCUS VIDEOS)
 * Renders an ultra-clean, aesthetic progress bar with glassmorphism container,
 * smooth gradient fill, leading edge glow, and floating ambient bokeh particles.
 */
export const AestheticProgressBarEngine: React.FC<ProgressBarProps> = ({
  glowColor = '#F59E0B',          // Warm Sunset Amber (Calming Focus Aesthetic)
  gradientEndColor = '#EC4899',   // Soft Rose Pink
  barWidth = 2200,
  barHeight = 44,
  showPercent = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 1. Smooth linear progress interpolation (0% -> 100% over 600 frames)
  const progressRatio = interpolate(frame, [0, 580], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const currentPercent = Math.floor(progressRatio * 100);

  // 2. Ambient Floating Bokeh Dots for Study/Focus Atmosphere
  const bokehCount = 28;
  const bokehs = useMemo(() => {
    return Array.from({ length: bokehCount }).map((_, i) => ({
      id: i,
      x: (Math.sin(i * 47) * 0.5 + 0.5) * width,
      y: (Math.cos(i * 29) * 0.5 + 0.5) * height,
      size: 40 + (i % 5) * 35,
      speed: 0.01 + (i % 3) * 0.008,
      phase: i * 1.5,
      opacity: 0.08 + (i % 4) * 0.04,
    }));
  }, [bokehCount, width, height]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#090B10', overflow: 'hidden' }}>
      
      {/* GLOW BLOOM SHADER */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="study-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur1" />
            <feGaussianBlur stdDeviation="24" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="aestheticGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor={gradientEndColor} />
          </linearGradient>
        </defs>
      </svg>

      {/* AMBIENT SOFT BOKEH LIGHT PARTICLES (FOCUS ATMOSPHERE) */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        {bokehs.map((b) => {
          const moveY = Math.sin(frame * b.speed + b.phase) * 30;
          const moveX = Math.cos(frame * b.speed * 0.8 + b.phase) * 20;

          return (
            <div
              key={`bokeh-${b.id}`}
              style={{
                position: 'absolute',
                left: b.x + moveX,
                top: b.y + moveY,
                width: b.size,
                height: b.size,
                borderRadius: '50%',
                backgroundColor: glowColor,
                opacity: b.opacity,
                filter: 'blur(30px)',
              }}
            />
          );
        })}
      </div>

      {/* CENTERED AESTHETIC PROGRESS BAR CONTAINER */}
      <div style={{
        position: 'absolute',
        left: (width - barWidth) / 2,
        top: height / 2 - barHeight / 2,
        width: barWidth,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {/* Outer Glassmorphism Track Bar */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: barHeight,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1.5px solid rgba(255, 255, 255, 0.12)',
          borderRadius: barHeight / 2,
          padding: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
        }}>
          
          {/* Inner Smooth Gradient Progress Fill */}
          <div style={{
            height: '100%',
            width: `${progressRatio * 100}%`,
            background: 'url(#aestheticGrad)',
            backgroundColor: glowColor, // Fallback
            backgroundImage: `linear-gradient(90deg, ${glowColor}, ${gradientEndColor})`,
            borderRadius: barHeight / 2,
            boxShadow: `0 0 20px ${glowColor}AA, 0 0 40px ${glowColor}44`,
            transition: 'width 0.1s linear',
            position: 'relative',
          }}>
            
            {/* Leading Edge Glowing Light Cap */}
            <div style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 24,
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              boxShadow: `0 0 15px #FFFFFF, 0 0 30px ${gradientEndColor}`,
              opacity: progressRatio > 0.01 ? 0.95 : 0,
            }} />
          </div>
        </div>

        {/* ----------------===================================================---------------- */}
        {/* OPTIONAL MINIMALIST PERCENTAGE & TIMER INDICATOR                                    */}
        {/* ----------------===================================================---------------- */}
        {showPercent && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 24,
            fontFamily: "'Roboto Mono', monospace",
            fontSize: 28,
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.75)',
            letterSpacing: 2,
          }}>
            <span>FOCUS SESSION</span>
            <span style={{ color: glowColor, textShadow: `0 0 12px ${glowColor}88` }}>
              {currentPercent}%
            </span>
          </div>
        )}

      </div>

      {/* FOREGROUND FINE FILM GRAIN */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.04, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="study-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#study-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
