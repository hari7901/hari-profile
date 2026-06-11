import type { Variants } from "framer-motion";

/**
 * Shared animation variants and easings.
 * Centralizing motion config keeps animation behavior consistent and avoids
 * duplicating magic numbers across components (DRY + Single Responsibility).
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Parent container that staggers its children on reveal. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Standard viewport config for scroll-triggered reveals. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
