import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface StampProps {
  /** Curved text around the perimeter (loops). */
  ring: string;
  /** Centered label inside the stamp. */
  label?: string;
  className?: string;
  /** Diameter in px. */
  size?: number;
  /** Stamp color — falls back to ink. */
  color?: string;
  /** Animate spin (default: true). */
  spin?: boolean;
}

/**
 * Circular ink stamp with curved text around the rim. Click it to spin faster
 * for a few seconds — small playful easter egg.
 */
export function Stamp({
  ring,
  label,
  className,
  size = 120,
  color = "rgb(var(--ink))",
  spin = true,
}: StampProps) {
  const [boost, setBoost] = useState(0);
  const id = `stamp-${ring.replace(/\s+/g, "").slice(0, 6)}`;
  const r = size / 2 - 12;
  const c = size / 2;
  const text = `${ring} • ${ring} • `;

  const handleClick = () => {
    setBoost((b) => b + 1);
    window.setTimeout(() => setBoost((b) => Math.max(0, b - 1)), 2200);
  };

  const duration = Math.max(2.5, 22 / Math.max(1, boost * 4));

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      data-cursor="spin"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      animate={spin ? { rotate: 360 } : undefined}
      transition={
        spin
          ? { duration, repeat: Infinity, ease: "linear" }
          : undefined
      }
      className={cn(
        "relative shrink-0 cursor-pointer border-none bg-transparent p-0",
        className,
      )}
      style={{ width: size, height: size, color }}
      aria-label={`Stamp · ${ring}`}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
        <defs>
          <path
            id={id}
            d={`M ${c},${c} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <circle
          cx={c}
          cy={c}
          r={r + 8}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
        <circle
          cx={c}
          cy={c}
          r={r + 2}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <text
          fill={color}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: size / 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href={`#${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      {label && (
        <div
          className="absolute inset-0 grid place-items-center text-center font-display italic leading-none"
          style={{ color, fontSize: size / 5.5 }}
        >
          {label}
        </div>
      )}
    </motion.button>
  );
}
