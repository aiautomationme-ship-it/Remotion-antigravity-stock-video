import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface CountdownProps {
  startMinutes?: number;
  startSeconds?: number;
  glowColor?: string;
  secondaryColor?: string;
  showMilliseconds?: boolean;
}

/**
 * ENTERPRISE COUNTDOWN TIMER ENGINE
 * Renders large, bold numerical countdowns (10:00 down to 00:00) 
 * with circular progress rings and perimeter tick marks.
 */
export const CountdownTimerEngine: React.FC<CountdownProps> = ({
  startMinutes = 10,
  startSeconds = 0,
  glowColor = '#00E5FF',
  secondaryColor = '#38BDF8',
  showMilliseconds = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 1. Calculate real-time countdown values based on video frame & fps
  const totalDurationSec = startMinutes * 60 + startSeconds;
  
  // Speed multiplier so 10-minute countdown completes smoothly over 10s video length (600 frames)
  const speedMultiplier = (totalDurationSec) / 10;
  const elapsedSec = (frame / fps) * speedMultiplier;
  const remainingSec = Math.max(0, totalDurationSec - elapsedSec);

  const mins = Math.floor(remainingSec / 60);
  const secs = Math.floor(remainingSec % 60);
  const ms = Math.floor((remainingSec % 1) * 100);

  const formattedMins = String(mins).padStart(2, '0');
  const formattedSecs = String(secs).padStart(2, '0');
  const formattedMs = String(ms).padStart(2, '0');

  // 2. Circular Progress Calculations
  const progressRatio = remainingSec / totalDurationSec;
  const radius = 340;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (1 - progressRatio) * circumference;

  // 3. Perimeter Tick Marks (60 radial tick lines)
  const ticks = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const angle = (i * 6) * (Math.PI / 180);
      const isMajor = i % 5 === 0;
      const rInner = isMajor ? radius + 22 : radius + 28;
      const rOuter = radius + 40;

      return {
        x1: 400 + Math.cos(angle) * rInner,
        y1: 400 + Math.sin(angle) * rInner,
        x2: 400 + Math.cos(angle) * rOuter,
        y2: 400 + Math.sin(angle) * rOuter,
        isMajor,
      };
    });
  }, [radius]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#020612', overflow: 'hidden' }}>
      
      {/* GLOW BLOOM SHADERS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="timer-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur1" />
            <feGaussianBlur stdDeviation="30" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
      </svg>

      {/* BACKGROUND ISOMETRIC GRID MESH */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.08, pointerEvents: 'none' }}>
        <pattern id="timerGrid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke={glowColor} strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#timerGrid)" />
      </svg>

      {/* CENTERED COUNTDOWN CONTAINER */}
      <div style={{
        position: 'absolute',
        left: width / 2 - 400,
        top: height / 2 - 400,
        width: 800,
        height: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* ----------------===================================================---------------- */}
        {/* CIRCULAR PROGRESS RING & PERIMETER TICKS                                            */}
        {/* ----------------===================================================---------------- */}
        <svg width="800" height="800" style={{ position: 'absolute', overflow: 'visible' }}>
          {/* Background Track Ring */}
          <circle
            cx="400"
            cy="400"
            r={radius}
            fill="none"
            stroke="#1E293B"
            strokeWidth="16"
            opacity="0.6"
          />

          {/* Dynamic Active Progress Ring */}
          <circle
            cx="400"
            cy="400"
            r={radius}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="20"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 400 400)"
            filter="url(#timer-glow)"
          />

          {/* Perimeter Tick Marks */}
          {ticks.map((t, idx) => (
            <line
              key={`tick-${idx}`}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.isMajor ? glowColor : '#475569'}
              strokeWidth={t.isMajor ? 3 : 1.5}
              opacity={t.isMajor ? 0.9 : 0.4}
              filter={t.isMajor ? 'url(#timer-glow)' : undefined}
            />
          ))}
        </svg>

        {/* ----------------===================================================---------------- */}
        {/* LARGE BOLD NUMERICAL COUNTDOWN (MIN : SEC : MS)                                      */}
        {/* ----------------===================================================---------------- */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
        }}>
          {/* Main Minutes : Seconds Digits */}
          <div style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: 190,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: -6,
            lineHeight: 1,
            textShadow: `0 0 40px ${glowColor}AA, 0 0 80px ${glowColor}44`,
          }}>
            {formattedMins}:{formattedSecs}
          </div>

          {/* Sub-Second Milliseconds Pulse */}
          {showMilliseconds && (
            <div style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: 54,
              fontWeight: 700,
              color: glowColor,
              letterSpacing: 4,
              marginTop: 12,
              opacity: 0.9,
              filter: 'url(#timer-glow)',
            }}>
              .{formattedMs}
            </div>
          )}
        </div>

      </div>

      {/* FOREGROUND FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id="timer-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#timer-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
