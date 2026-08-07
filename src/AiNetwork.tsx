import React, { useMemo } from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  videoSeed?: number; // Change this number to automatically generate a brand new color theme!
}

interface Node {
  x: number;
  y: number;
  radius: number;
  seedX: number;
  seedY: number;
}

export const AiNetwork: React.FC<Props> = ({ videoSeed = 42 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // ==========================================
  // 🎨 AUTOMATIC HSL COLOR ENGINE (High Contrast)
  // ==========================================
  const { bgGradient, nodeColor, lineColor, glowingCore } = useMemo(() => {
    // 1. Math calculates a unique starting hue (0 to 360) from your seed number
    const baseHue = Math.floor(random(videoSeed) * 360);

    // 2. Lock Saturation high (85%+) and Lightness to vibrant levels so it NEVER turns black
    return {
      bgGradient: `radial-gradient(circle, hsl(${baseHue}, 85%, 22%) 0%, hsl(${(baseHue + 40) % 360}, 90%, 10%) 100%)`,
      nodeColor: `hsl(${(baseHue + 120) % 360}, 100%, 65%)`,     // Neon Highlight 1
      lineColor: `hsla(${(baseHue + 120) % 360}, 100%, 65%, 0.35)`, // Semi-transparent wires
      glowingCore: `hsl(${(baseHue + 240) % 360}, 100%, 60%)`,   // High-contrast Center Accent
    };
  }, [videoSeed]);

  // ==========================================
  // 🧠 GENERATE AI INFRASTRUCTURE NODES
  // ==========================================
  const nodes = useMemo(() => {
    const nodeArray: Node[] = [];
    const totalNodes = 35; // Number of floating data points

    for (let i = 0; i < totalNodes; i++) {
      nodeArray.push({
        x: random(`x-${i}-${videoSeed}`) * width,
        y: random(`y-${i}-${videoSeed}`) * height,
        radius: random(`r-${i}-${videoSeed}`) * 8 + 4,
        seedX: random(`sx-${i}-${videoSeed}`) * 2 - 1,
        seedY: random(`sy-${i}-${videoSeed}`) * 2 - 1,
      });
    }
    return nodeArray;
  }, [width, height, videoSeed]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bgGradient,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Floating Grid Wires */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        {nodes.map((node1, i) => {
          // Calculate subtle floating movement using pure trigonometry math
          const moveX1 = Math.sin(frame * 0.02 + node1.seedX * 100) * 40;
          const moveY1 = Math.cos(frame * 0.02 + node1.seedY * 100) * 40;
          const finalX1 = node1.x + moveX1;
          const finalY1 = node1.y + moveY1;

          return (
            <g key={i}>
              {/* Draw connections to nearby data centers */}
              {nodes.slice(i + 1).map((node2, j) => {
                const moveX2 = Math.sin(frame * 0.02 + node2.seedX * 100) * 40;
                const moveY2 = Math.cos(frame * 0.02 + node2.seedY * 100) * 40;
                const finalX2 = node2.x + moveX2;
                const finalY2 = node2.y + moveY2;

                // Only draw a line if the nodes are close to each other
                const distance = Math.hypot(finalX2 - finalX1, finalY2 - finalY1);
                if (distance < 450) {
                  return (
                    <line
                      key={j}
                      x1={finalX1}
                      y1={finalY1}
                      x2={finalX2}
                      y2={finalY2}
                      stroke={lineColor}
                      strokeWidth={2}
                    />
                  );
                }
                return null;
              })}

              {/* Draw Neural Node Points */}
              <circle
                cx={finalX1}
                cy={finalY1}
                r={node1.radius}
                fill={node1.radius > 9 ? glowingCore : nodeColor}
                style={{
                  filter: node1.radius > 9 ? `drop-shadow(0 0 15px ${glowingCore})` : "none",
                  transition: "fill 0.5s ease",
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

