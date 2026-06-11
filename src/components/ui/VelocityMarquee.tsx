import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface MarqueeRowProps {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}

/**
 * Scroll-reactive marquee row. Used in pairs (counter-rotating) for the big
 * editorial banner between sections.
 */
function MarqueeRow({ children, baseVelocity = 4, className }: MarqueeRowProps) {
  const reduced = usePrefersReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden">
      <motion.div
        className={cn("flex flex-nowrap whitespace-nowrap", className)}
        style={reduced ? undefined : { x }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex shrink-0">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface VelocityMarqueeProps {
  items: string[];
  className?: string;
}

/**
 * Two opposing scroll-reactive rows of oversized italic serif type — the
 * editorial banner. Rendered as a "Breaking News" interstitial.
 */
export function VelocityMarquee({ items, className }: VelocityMarqueeProps) {
  const renderRow = (filled: boolean) =>
    items.map((item, i) => (
      <span key={`${item}-${i}`} className="flex items-baseline">
        <span
          className={cn(
            "display display-italic px-6 text-[clamp(3rem,8vw,6rem)] leading-none",
            filled ? "text-ink" : "text-transparent",
          )}
          style={
            filled
              ? undefined
              : {
                  WebkitTextStroke: "1.5px #15110d",
                }
          }
        >
          {item}
        </span>
        <span className="text-3xl text-vermilion">✦</span>
      </span>
    ));

  return (
    <div
      className={cn(
        "relative isolate w-full select-none overflow-hidden border-y-2 border-ink bg-paper-card py-6 md:py-10",
        className,
      )}
      aria-hidden
    >
      {/* "Breaking" label corner */}
      <div className="pointer-events-none absolute left-4 top-2 z-10 hidden items-center gap-2 bg-vermilion px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper md:flex">
        <span className="h-1.5 w-1.5 animate-blink rounded-full bg-paper" />
        Breaking
      </div>

      <MarqueeRow baseVelocity={1.0}>{renderRow(true)}</MarqueeRow>
      <MarqueeRow baseVelocity={-1.0} className="mt-1">
        {renderRow(false)}
      </MarqueeRow>
    </div>
  );
}
