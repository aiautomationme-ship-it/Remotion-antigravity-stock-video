import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface ColumnData {
  id: number;
  x: number;
  speed: number;
  charCount: number;
  chars: string[];
  fontSize: number;
  opacity: number;
}

interface MatrixCodeRainProps {
  glowColor?: string;
  columnCount?: number;
}

/**
 * ENTERPRISE MATRIX CODE RAIN ENGINE
 * Renders falling columns of green binary numbers, terminal characters, 
 * and script lines with glowing head nodes & CRT scanlines.
 */
export const MatrixCodeRainEngine: React.FC<MatrixCodeRainProps> = ({
  glowColor = '#00FF66',
  columnCount = 32,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Character set: Binary, Hexadecimal, and Terminal Script tokens
  const charPool = useMemo(() => [
    '0', '1', '0', '1', '1', '0', '0', '1',
    '0x4A', '0x8F', '0x3E', '0xFF', '0x12', '0xB9',
    'SYS_RUN', 'NET_ACK', 'DATA_STREAM', 'MEM_01', 'AUTH_OK',
    '0101', '1100', '0011', '1111', '0000', '1010'
  ], []);

  // Generate static parameters for columns
  const columns: ColumnData[] = useMemo(() => {
    const colWidth = width / columnCount;
    return Array.from({ length: columnCount }).map((_, i) => {
      const charCount = 14 + (i % 8);
      const chars = Array.from({ length: charCount }).map(
        (_, j) => charPool[(i * 7 + j * 13) % charPool.length]
      );
      return {
        id: i,
        x: i * colWidth + colWidth * 0.2,
        speed: 4 + (i % 6) * 1.5,
        charCount,
        chars,
        fontSize: 22 + (i % 3) * 4,
        opacity: 0.7 + (i % 4) * 0.08,
      };
    });
  }, [columnCount, width, charPool]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#020B06', overflow: 'hidden' }}>
      
      {/* MATRIX GLOW & SCANLINE FILTER */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="matrix-code-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="18" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* BACKGROUND SCANLINE & TERMINAL CRT MESH */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
        backgroundSize: '100% 6px',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.6,
      }} />

      {/* ----------------===================================================---------------- */}
      {/* FALLING COLUMNS OF GREEN BINARY & TERMINAL SCRIPT LINES                             */}
      {/* ----------------===================================================---------------- */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        {columns.map((col) => {
          // Calculate loop Y motion for continuous falling rain
          const totalColHeight = col.charCount * 36;
          const yOffset = ((frame * col.speed * 4) % (height + totalColHeight)) - totalColHeight;

          return (
            <div
              key={`col-${col.id}`}
              style={{
                position: 'absolute',
                left: col.x,
                top: yOffset,
                fontFamily: "'Roboto Mono', monospace",
                fontSize: col.fontSize,
                fontWeight: 700,
                color: glowColor,
                lineHeight: '34px',
                whiteSpace: 'nowrap',
                opacity: col.opacity,
              }}
            >
              {col.chars.map((char, charIdx) => {
                const isHead = charIdx === col.chars.length - 1;
                const charOpacity = interpolate(charIdx, [0, col.chars.length - 1], [0.15, 1]);

                return (
                  <div
                    key={`char-${col.id}-${charIdx}`}
                    style={{
                      color: isHead ? '#FFFFFF' : glowColor,
                      textShadow: isHead
                        ? `0 0 15px #FFFFFF, 0 0 30px ${glowColor}`
                        : `0 0 10px ${glowColor}`,
                      opacity: charOpacity,
                      transform: isHead ? 'scale(1.15)' : 'scale(1)',
                    }}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* FOREGROUND FILM GRAIN OVERLAY */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay', zIndex: 10 }}>
        <svg width="100%" height="100%">
          <filter id="matrix-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#matrix-grain)" />
        </svg>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
