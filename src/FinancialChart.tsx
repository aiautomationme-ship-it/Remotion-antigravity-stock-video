import React, { useMemo } from "react";
import { random, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const FinancialChart: React.FC<{ videoSeed?: number }> = ({ videoSeed = 99 }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const colors = useMemo(() => {
    const baseHue = Math.floor(random(videoSeed) * 360);
    return {
      bg: `linear-gradient(180deg, hsl(${baseHue}, 80%, 15%) 0%, hsl(${(baseHue + 30) % 360}, 90%, 7%) 100%)`,
      bullish: `hsl(130, 95%, 50%)`,
      bearish: `hsl(10, 95%, 50%)`,
      grid: `hsla(${baseHue}, 50%, 50%, 0.1)`,
    };
  }, [videoSeed]);

  return (
    <div style={{ width: "100%", height: "100%", background: colors.bg, position: "relative", boxSizing: "border-box", padding: "100px" }}>
      {/* Background Matrix Grid */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      {/* Moving Candlesticks Layout with Spring Physics */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px", height: "100%", width: "100%", position: "relative", zIndex: 5 }}>
        {[...Array(20)].map((_, i) => {
          const isUp = random(`dir-${i}-${videoSeed}`) > 0.4;
          const candleHeight = 150 + random(`h-${i}`) * 350;
          
          // Remotion Ultra-Smooth Spring Entrance Physics
          const springProgress = spring({
            frame: Math.max(0, frame - i * 2),
            fps,
            config: {
              damping: 12,    // Controls bouncing elasticity
              mass: 0.5,      // Controls weight of the object
              stiffness: 90,  // Controls speed of snap
            },
          });
          
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "35px",
                height: `${candleHeight * springProgress}px`,
                backgroundColor: isUp ? colors.bullish : colors.bearish,
                borderRadius: "4px",
                boxShadow: `0 0 20px ${isUp ? colors.bullish : colors.bearish}`,
                transform: `scaleY(${springProgress})`,
                transformOrigin: 'bottom center',
              }}
            >
              <div style={{ width: "4px", height: "40px", backgroundColor: isUp ? colors.bullish : colors.bearish, transform: "translateY(-40px)" }} />
              <div style={{ width: "4px", height: "40px", backgroundColor: isUp ? colors.bullish : colors.bearish, transform: "translateY(100%)" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
