import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROFILE } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Magazine front-cover intro — a printed broadside that slides off as the
 * page loads. No glowing rings, no aurora — just type, rules, and a vermilion
 * stamp.
 */
export function Intro() {
  const reduced = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setLeaving(true), 1600);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-paper text-ink"
          initial={{ y: 0 }}
          animate={{ y: leaving ? "-100%" : 0 }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            if (leaving) {
              document.body.style.overflow = "";
              setDone(true);
            }
          }}
        >
          {/* Top masthead rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="absolute inset-x-10 top-10 h-2 origin-left border-y border-ink bg-paper"
          />
          {/* Bottom rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            className="absolute inset-x-10 bottom-10 h-2 origin-right border-y border-ink bg-paper"
          />

          {/* Side captions */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute left-10 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[11px] uppercase tracking-widest text-ink-muted md:block"
          >
            Volume I — Issue No. 01
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute right-10 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[11px] uppercase tracking-widest text-ink-muted md:block"
          >
            est. mmxxv — gurugram in
          </motion.span>

          <motion.div
            className="relative z-10 flex w-[min(86vw,40rem)] flex-col items-center text-center"
            animate={{ opacity: leaving ? 0 : 1, y: leaving ? -10 : 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="font-mono text-[11px] uppercase tracking-widest text-ink-muted"
            >
              ⟶ The Daily Engineer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.18 }}
              className="display mt-4 text-[clamp(3.5rem,11vw,7rem)] leading-[0.85]"
            >
              Hari Dass{" "}
              <em className="display-italic text-vermilion">Sachdeva</em>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
              className="mt-6 h-px w-48 origin-left bg-ink"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-5 font-mono text-[11px] uppercase tracking-widest text-ink-muted"
            >
              {PROFILE.roles[0]} · {PROFILE.location}
            </motion.p>

            {/* Progress bar — printed ribbon */}
            <div className="mt-10 h-1.5 w-64 overflow-hidden border border-ink bg-paper-card">
              <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: leaving ? "100%" : "0%" }}
                transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.55 }}
                className="block h-full w-full bg-vermilion"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
