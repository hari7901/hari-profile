import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Editorial scroll progress — a thick vermilion ink bar pinned to the top.
 * Looks like a magazine page-progress strip, not a glowing gradient.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-vermilion"
    />
  );
}
