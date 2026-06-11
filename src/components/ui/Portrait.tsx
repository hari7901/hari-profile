import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface PortraitProps {
  src: string;
  alt: string;
  className?: string;
}

const POKE_MESSAGES = [
  "Hey there!",
  "Oh — hi again.",
  "You're persistent…",
  "Stop poking me!",
  "Okay, okay…",
  "Seriously?",
  "I have work to do!",
  "You really won't stop?",
  "Almost there…",
  "FINE. You earned it. 🎉",
];

const POKE_GOAL = 10;
const BURST_EMOJIS = ["🎉", "🚀", "⭐", "💥", "🔥", "☕", "✦", "🏆", "💾", "🎊"];

/**
 * Editorial portrait — duotone print frame with hard ink border, halftone
 * backplate, tape strips, gentle 3D tilt on hover, and a "poke" easter egg.
 * Clicking the portrait makes it nudge + show a different speech bubble.
 */
export function Portrait({ src, alt, className }: PortraitProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();
  const [pokes, setPokes] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [achievement, setAchievement] = useState(false);
  const controls = useAnimationControls();

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  const tilt = useMotionTemplate`perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduced || achievement) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 6);
    rotateX.set(-(py - 0.5) * 6);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const goCrazy = () => {
    setAchievement(true);
    // A wild 720° barrel-flip with a squash-and-stretch bounce.
    controls.start({
      rotate: [0, 360, 720],
      scale: [1, 1.15, 0.9, 1.05, 1],
      transition: { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] },
    });
    window.setTimeout(() => {
      setAchievement(false);
      setPokes(0);
    }, 4000);
  };

  const poke = () => {
    setPokes((prev) => {
      const next = prev + 1;
      if (next >= POKE_GOAL && !achievement) {
        goCrazy();
      } else {
        // Small wobble on each ordinary poke.
        controls.start({
          rotate: [0, -3, 3, -2, 2, 0],
          transition: { duration: 0.4 },
        });
      }
      return next;
    });
    setBubbleVisible(true);
    window.setTimeout(() => setBubbleVisible(false), 2200);
  };

  const message =
    POKE_MESSAGES[Math.min(pokes, POKE_MESSAGES.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE_OUT, delay: 0.25 }}
      className={cn("group relative", className)}
    >
      {/* Halftone background block */}
      <div
        aria-hidden
        className="absolute -bottom-6 -right-6 h-[88%] w-[88%] bg-mustard"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(var(--ink) / 0.4) 1px, transparent 0)",
          backgroundSize: "6px 6px",
        }}
      />

      {/* Vermilion solid block offset behind */}
      <div
        className="absolute -left-3 -top-3 h-full w-full bg-vermilion"
        aria-hidden
      />

      {/* Speech bubble — pops on click (hidden during the achievement) */}
      <AnimatePresence>
        {bubbleVisible && !achievement && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.8, rotate: -6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -4 }}
            exit={{ opacity: 0, y: 6, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap border-[2.5px] border-ink bg-paper-card px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink shadow-hard"
          >
            {message}
            <span
              aria-hidden
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-ink"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji burst on the 10-poke achievement */}
      <AnimatePresence>
        {achievement && (
          <div className="pointer-events-none absolute inset-0 z-30">
            {BURST_EMOJIS.map((emoji, i) => {
              const angle = (i / BURST_EMOJIS.length) * Math.PI * 2;
              return (
                <motion.span
                  key={emoji}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * 160,
                    y: Math.sin(angle) * 160,
                    scale: [0, 1.4, 1],
                    opacity: [0, 1, 0],
                    rotate: (i % 2 ? 1 : -1) * 360,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                >
                  {emoji}
                </motion.span>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Achievement banner */}
      <AnimatePresence>
        {achievement && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -4 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="absolute -top-14 left-1/2 z-40 w-max -translate-x-1/2 border-[3px] border-ink bg-mustard px-4 py-2 text-center shadow-hard-md"
          >
            <div className="font-mono text-[9px] uppercase tracking-widest text-vermilion">
              🏆 Achievement Unlocked
            </div>
            <div className="display display-italic text-xl leading-none text-ink">
              Certified Pest!
            </div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-ink">
              10 pokes · go hire this guy
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        onClick={poke}
        aria-label="Poke the portrait"
        data-cursor={achievement ? "🎉" : "poke me"}
        whileTap={{ scale: 0.96 }}
        animate={controls}
        style={{ transform: tilt, transformStyle: "preserve-3d" }}
        className="relative block w-full touch-manipulation border-[3px] border-ink bg-paper-card text-left"
      >
        <motion.img
          src={src}
          alt={alt}
          loading="eager"
          initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.1 }}
          animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.45 }}
          className="portrait-duotone block aspect-[4/5] w-full object-cover object-top"
        />

        {/* Tape strips at corners — catch a faint breeze */}
        <span
          aria-hidden
          className="amb-sway absolute -top-3 -left-4 bg-mustard/80 px-6 py-1.5 shadow-[1px_1px_0_0_rgb(var(--ink) / 0.3)]"
          style={{ ["--sway-base" as string]: "-18deg" }}
        />
        <span
          aria-hidden
          className="amb-sway absolute -bottom-3 -right-4 bg-mustard/80 px-6 py-1.5 shadow-[1px_1px_0_0_rgb(var(--ink) / 0.3)]"
          style={{ ["--sway-base" as string]: "10deg", animationDelay: "2.5s" }}
        />

        {/* Caption strip below image (newspaper photo style) */}
        <div className="flex items-center justify-between gap-2 border-t-[3px] border-ink bg-paper-card px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ink">
          <span>Fig. 01 — The author at work</span>
          {pokes > 0 && (
            <span className="shrink-0 text-vermilion">
              {achievement
                ? "🏆 maxed"
                : `${pokes}/${POKE_GOAL} pokes`}
            </span>
          )}
        </div>
      </motion.button>
    </motion.div>
  );
}
