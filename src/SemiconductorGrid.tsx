import React, { useMemo } from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";

export const SemiconductorGrid: React.FC<{ videoSeed?: number }> = ({ videoSeed = 8 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const colors = useMemo(() => {
    const baseHue = Math.floor(random(videoSeed) * 360);
    return {
      bg: `radial-gradient(circle, hsl(${baseHue}, 95%, 15%) 0%, hsl(${(baseHue + 30) % 360}, 100%, 6%) 100%)`,
      grid: `hsla(${(baseHue + 60) % 360}, 90%, 50%, 0.15)`,
      trace: `hsl(${baseHue}, 100%, 60%)`,
      chip: `linear-gradient(135deg, hsl(${(baseHue + 120) % 360}, 100%, 55%), hsl(${(baseHue + 240) % 360}, 100%, 65%))`,
    };
  }, [videoSeed]);

  return (
    <div style={{ width: "100%", height: "100%", background: colors.bg, position: "relative", overflow: "hidden" }}>
      {/* Wafer Grid Background */}
      <div style={{ position: "absolute", width: "100%", height: "100%", backgroundImage: `linear-gradient(${colors.grid} 2px, transparent 2px), linear-gradient(90deg, ${colors.grid} 2px, transparent 2px)`, backgroundSize: "80px 80px" }} />
      
      {/* Traveling Data Traces */}
      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
        {[...Array(15)].map((_, i) => {
          const startX = random(`x-${i}-${videoSeed}`) * width;
          const progress = ((frame * 3 + random(`p-${i}`) * 300) % height);
          return <line key={i} x1={startX} y1={progress} x2={startX} y2={progress + 150} stroke={colors.trace} strokeWidth={6} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 12px ${colors.trace})` }} />;
        })}
      </svg>

      {/* Center Microchip Core */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", zIndex: 10 }}>
        <div style={{ width: "400px", height: "400px", background: colors.chip, borderRadius: "24px", boxShadow: `0 0 80px rgba(0,0,0,0.5), 0 0 40px ${colors.trace}`, transform: `rotate(${frame * 0.2}deg)` }} />
      </div>
    </div>
  );
};
