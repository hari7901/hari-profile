import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface StickerProps {
  children: ReactNode;
  className?: string;
  /** Initial rotation in degrees. */
  rotate?: number;
  /** Color variant for the sticker chip. */
  variant?: "vermilion" | "cobalt" | "mustard" | "sage" | "plum" | "ink" | "paper";
  /** Make the sticker draggable. */
  draggable?: boolean;
}

const VARIANTS = {
  vermilion: "bg-vermilion text-paper",
  cobalt: "bg-cobalt text-paper",
  mustard: "bg-mustard text-ink",
  sage: "bg-sage text-paper",
  plum: "bg-plum text-paper",
  ink: "bg-ink text-paper",
  paper: "bg-paper-card text-ink",
};

/**
 * Adhesive sticker — a tilted block with hard ink border and offset shadow.
 * Optionally draggable. Used as floating annotations in the design.
 */
export function Sticker({
  children,
  className,
  rotate = -4,
  variant = "mustard",
  draggable = true,
}: StickerProps) {
  if (!draggable) {
    return (
      <div
        style={{ transform: `rotate(${rotate}deg)` }}
        className={cn(
          "inline-flex select-none items-center justify-center border-2 border-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest shadow-[3px_3px_0_0_#15110d]",
          VARIANTS[variant],
          className,
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.4}
      initial={{ rotate }}
      whileHover={{ scale: 1.06, rotate: rotate + 2 }}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      whileTap={{ scale: 0.97 }}
      style={{ cursor: "grab", touchAction: "none" }}
      className={cn(
        "inline-flex select-none items-center justify-center border-2 border-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest shadow-[3px_3px_0_0_#15110d]",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
