import { motion, useAnimation } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface SectionHeadingProps {
  /** Section number — printed in large italic numeral on the left. */
  index?: string;
  /** Short topic label printed monospace above title. */
  eyebrow: string;
  /** Main editorial display title. */
  title: ReactNode;
  /** Optional kicker — italic phrase printed in vermilion at end of title. */
  kicker?: string;
  /** Optional description set in body type. */
  description?: ReactNode;
  /** Optional column of meta info on the right (date, page no., etc.). */
  meta?: ReactNode;
  className?: string;
}

/**
 * Magazine-spread section heading. The giant § numeral is clickable — it
 * spins on each click and after a few taps shows a "stop that" sticky note.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  kicker,
  description,
  meta,
  className,
}: SectionHeadingProps) {
  const controls = useAnimation();
  const [clicks, setClicks] = useState(0);

  const handleNumClick = () => {
    setClicks((c) => c + 1);
    controls.start({
      rotate: [0, -15, 12, -8, 5, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
      transition: { duration: 0.6, ease: "easeInOut" },
    });
  };

  return (
    <motion.header
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn("relative grid gap-6 md:grid-cols-12 md:gap-8", className)}
    >
      {index && (
        <motion.div variants={fadeUp} className="md:col-span-2 flex items-start">
          <motion.button
            type="button"
            animate={controls}
            onClick={handleNumClick}
            data-cursor="poke"
            aria-label={`Section ${index}`}
            className="group relative inline-block cursor-pointer select-none border-none bg-transparent p-0 text-left"
          >
            <span className="display display-italic text-[clamp(4rem,11vw,8rem)] leading-[0.85] text-ink/15 transition-colors group-hover:text-vermilion/60">
              §{index}
            </span>
            {clicks >= 4 && (
              <motion.span
                initial={{ opacity: 0, y: -6, rotate: -8 }}
                animate={{ opacity: 1, y: 0, rotate: -4 }}
                className="absolute -bottom-2 left-2 border-2 border-ink bg-mustard px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-ink shadow-[2px_2px_0_0_#15110d]"
              >
                ouch · {clicks}×
              </motion.span>
            )}
          </motion.button>
        </motion.div>
      )}

      <div
        className={cn(
          "flex flex-col gap-4",
          index ? "md:col-span-7" : "md:col-span-9",
        )}
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-ink-muted"
        >
          <span className="h-px w-10 bg-ink/40" />
          <span>{eyebrow}</span>
          <span className="text-vermilion">●</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="display text-[clamp(2.4rem,6.5vw,5.2rem)] text-ink"
        >
          {title}
          {kicker && (
            <>
              {" "}
              <em className="display-italic text-vermilion">{kicker}</em>
            </>
          )}
        </motion.h2>

        {description && (
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>

      {meta && (
        <motion.aside
          variants={fadeUp}
          className="md:col-span-3 flex md:justify-end"
        >
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            {meta}
          </div>
        </motion.aside>
      )}
    </motion.header>
  );
}
