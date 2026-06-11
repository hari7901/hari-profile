import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * A single droplet in the ink-comet tail. Each droplet springs toward the raw
 * pointer with its own (progressively softer) stiffness, so the further down
 * the chain it is, the more it lags — producing a smooth comet trail.
 */
function TrailDot({
  x,
  y,
  index,
  total,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  index: number;
  total: number;
}) {
  const t = index / total;
  // Earlier dots are stiffer (snappier); later dots lag more.
  const stiffness = 700 - index * (520 / total);
  const sx = useSpring(x, { stiffness, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness, damping: 26, mass: 0.4 });

  const size = 12 * (1 - t) + 3;
  const opacity = 0.5 * (1 - t);

  return (
    <motion.span
      style={{
        left: sx,
        top: sy,
        width: size,
        height: size,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="absolute rounded-full bg-vermilion"
    />
  );
}

const TRAIL_COUNT = 8;

/**
 * Ink-comet cursor for the editorial design:
 *  - a vermilion comet trail of springy droplets
 *  - a crisp ink "nib" dot tracking the pointer 1:1
 *  - a thin ink ring that lags and expands over interactive targets
 *  - a tilted contextual label ("click", "drag", "poke me", …)
 *
 * Hides the native cursor (via the `cursor-none` html class). Disabled on
 * touch devices and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const isPointer = useMediaQuery("(pointer: fine)");
  const reduced = usePrefersReducedMotion();
  const enabled = isPointer && !reduced;

  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [pressed, setPressed] = useState(false);

  // Raw pointer position (drives nib + trail springs)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Ring lags slightly behind the nib
  const ringX = useSpring(x, { stiffness: 380, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 30, mass: 0.5 });

  // Label lags a touch more
  const labelX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const labelY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("cursor-none");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const target = e.target as HTMLElement | null;
      const explicit = target?.closest("[data-cursor]") as HTMLElement | null;
      if (explicit) {
        setLabel(explicit.dataset.cursor ?? "open");
        setHovering(true);
        return;
      }
      if (target?.closest("a, button, [role='button']")) {
        setLabel("click");
        setHovering(true);
        return;
      }
      if (target?.closest("input, textarea, select, label")) {
        setLabel("type");
        setHovering(true);
        return;
      }
      setLabel(null);
      setHovering(false);
    };
    const onLeave = () => setHidden(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.25s" }}
    >
      {/* Ink-comet trail */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <TrailDot key={i} x={x} y={y} index={i} total={TRAIL_COUNT} />
      ))}

      {/* Lagging ink ring — expands over interactive targets */}
      <motion.span
        style={{
          left: ringX,
          top: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 46 : 30,
          height: hovering ? 46 : 30,
          rotate: hovering ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`absolute border-[1.5px] transition-colors duration-200 ${
          hovering ? "border-vermilion" : "border-ink"
        }`}
      />

      {/* Crisp ink nib — tracks 1:1 */}
      <motion.span
        style={{ left: x, top: y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: pressed ? 0.5 : hovering ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="absolute h-2 w-2 rounded-full bg-ink"
      />

      {/* Contextual label */}
      <motion.div
        style={{ left: labelX, top: labelY, x: 18, y: 18 }}
        className="absolute"
      >
        <motion.span
          animate={{
            opacity: label ? 1 : 0,
            scale: label ? 1 : 0.7,
            rotate: pressed ? -8 : -3,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="inline-block whitespace-nowrap bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-paper shadow-[2px_2px_0_0_#e63322]"
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}
