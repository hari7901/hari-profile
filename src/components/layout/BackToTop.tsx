import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Editorial back-to-top — a hard-edged ink square with a vermilion progress
 * bar on the left edge. No glow, no circle, no gradient.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          data-cursor="top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3, x: -2 }}
          whileTap={{ scale: 0.94 }}
          className="group fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center border-2 border-ink bg-paper-card text-ink shadow-hard-md transition-shadow hover:shadow-hard-sm"
        >
          {/* Vermilion progress strip on the left */}
          <motion.span
            style={{ scaleY: progress }}
            className="absolute inset-y-0 left-0 w-1 origin-bottom bg-vermilion"
            aria-hidden
          />
          <ArrowUp className="relative h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
