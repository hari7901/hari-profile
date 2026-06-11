import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Per-word stagger in seconds. */
  stagger?: number;
}

/**
 * Reveals a string word-by-word with a soft upward motion.
 */
export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              ease: EASE_OUT,
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
