"use client";
import React, { useEffect, useRef, useState } from "react";

// --- CONFIGURABLES ---
const BARS = 54; // More bars for smoothness
const RADIUS = 140; // Disk radius
const BAR_WIDTH = 20; // Increased from 14
const MIN_BAR_HEIGHT = 100; // Increased from 46
const MAX_BAR_HEIGHT = 200; // Increased from 110
const ROTATION_SPEED = 0.22; // Degrees per frame, smooth and lively
const START_RADIUS = 200; // Starting radius for the center circle

// --- COLOR UTILITY: HSV to RGB for rainbow effect ---
function HSVtoRGB(h: number, s: number, v: number) {
  const f = (n: number, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return `rgb(${f(5) * 255},${f(3) * 255},${f(1) * 255})`;
}

// --- MAIN COMPONENT ---
export default function RotatingMusicVisualizer() {
  const [rotation, setRotation] = useState(0);
  const [heights, setHeights] = useState<number[]>(
    Array.from({ length: BARS }, () => MIN_BAR_HEIGHT)
  );
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let t = 0;

    function animate() {
      // Smoothly rotate
      setRotation((r) => (r + ROTATION_SPEED) % 360);

      // Smooth bar animation (like audio)
      t += 1;
      setHeights((prev) =>
        prev.map((old, i) => {
          // Sine wave + randomness for smooth, lively effect
          const phase = (i / BARS) * Math.PI * 2;
          const wave =
            Math.sin(t * 0.07 + phase) * 0.5 +
            Math.sin(t * 0.031 + i) * 0.2 +
            0.7;
          // Lerp to target for smoothness
          const target =
            MIN_BAR_HEIGHT +
            (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT) * wave * 0.7;
          return old + (target - old) * 0.17; // Lerp factor for smoothness
        })
      );

      frameRef.current = requestAnimationFrame(animate);
    }
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line
  }, []);

  // SVG size
  const size = (RADIUS + MAX_BAR_HEIGHT) * 2 + 24;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          zIndex: 1,
          borderRadius: "12px",
        }}
      />
      <svg
        width={size}
        height={size}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.16s cubic-bezier(.33,1,.68,1)",
          display: "block",
        }}
      >
            <circle
          cx={size / 2}
          cy={size / 2}
          r={START_RADIUS - 8} // adjust -8 for a nice margin inside the bars
          fill="#000"
          opacity="0.93"
        />

        {/* --- Optional: add a glowing blue center circle --- */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={START_RADIUS - 20}
          fill="url(#centerGlow)"
        />
        {Array.from({ length: BARS }).map((_, i) => {
          const angle = (i / BARS) * 360;
          const rad = ((angle - 90) * Math.PI) / 180;
          const barHeight = heights[i];
          const x =
            size / 2 +
            Math.cos(rad) * (RADIUS + barHeight / 2) -
            BAR_WIDTH / 2;
          const y =
            size / 2 +
            Math.sin(rad) * (RADIUS + barHeight / 2) -
            barHeight / 2;
          // Rainbow color by angle
          const color = HSVtoRGB(angle, 1, 1);

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={BAR_WIDTH}
              height={barHeight}
              fill={color}
              rx={BAR_WIDTH / 2}
              opacity={0.93}
              transform={`rotate(${angle} ${x + BAR_WIDTH / 2} ${y + barHeight / 2})`}
              style={{
                transition: "height 0.22s cubic-bezier(.33,1,.68,1)",
                filter:
                  "drop-shadow(0 0 7px " +
                  color.replace("rgb", "rgba").replace(")", ",0.45)") +
                  ")",
              }}
            />
          );
        })}
            

        <defs>
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="60%" stopColor="#1e90ff" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#0d1332" stopOpacity="0.01" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
