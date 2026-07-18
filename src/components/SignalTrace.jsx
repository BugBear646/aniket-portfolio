import { motion } from "framer-motion";

// Generates a jagged waveform path, like a call-trace / oscilloscope line.
function buildPath(width, height, segments, seed = 1) {
  const mid = height / 2;
  let d = `M 0 ${mid}`;
  const step = width / segments;
  let x = 0;
  for (let i = 0; i < segments; i++) {
    x += step;
    const rand = Math.sin(i * seed * 12.9898) * 43758.5453;
    const frac = rand - Math.floor(rand);
    const amp = (frac - 0.5) * height * 0.9;
    d += ` L ${x.toFixed(1)} ${(mid + amp).toFixed(1)}`;
  }
  return d;
}

export default function SignalTrace({
  className = "",
  height = 80,
  segments = 48,
  seed = 3,
  color = "#E8A33D",
  animated = true,
  strokeWidth = 1.5,
}) {
  const width = 1200;
  const path = buildPath(width, height, segments, seed);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        whileInView={animated ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
    </svg>
  );
}
