import React, { useMemo } from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";

export const CyberSecurity: React.FC<{ videoSeed?: number }> = ({ videoSeed = 12 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const colors = useMemo(() => {
    const baseHue = Math.floor(random(videoSeed) * 360);
    return {
      bg: `radial-gradient(circle, hsl(${baseHue}, 85%, 12%) 0%, hsl(${(baseHue + 20) % 360}, 90%, 5%) 100%)`,
      text: `hsl(${(baseHue + 120) % 360}, 100%, 65%)`,
      shield: `hsl(${baseHue}, 100%, 55%)`,
    };
  }, [videoSeed]);

  return (
    <div style={{ width: "100%", height: "100%", background: colors.bg, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", fontFamily: "monospace" }}>
      {/* Cascading Binary Streams */}
      <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "space-between", padding: "0 50px", opacity: 0.35, fontSize: "28px", color: colors.text }}>
        {[...Array(12)].map((_, col) => (
          <div key={col} style={{ transform: `translateY(${((frame * 4 + col * 200) % height) - 200}px)` }}>
            {[...Array(10)].map((_, row) => <div key={row}>{Math.round(random(`b-${col}-${row}`)) ? "1" : "0"}</div>)}
          </div>
        ))}
      </div>

      {/* Pulsing Central Target Matrix */}
      <div style={{ border: `8px solid ${colors.shield}`, width: "450px", height: "450px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", transform: `scale(${1 + Math.sin(frame * 0.05) * 0.04})`, filter: `drop-shadow(0 0 30px ${colors.shield})` }}>
        <h1 style={{ color: "#ffffff", fontSize: "45px", fontWeight: "bold", letterSpacing: "4px" }}>ZERO TRUST</h1>
      </div>
    </div>
  );
};
