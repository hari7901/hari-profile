import { useRef } from "react";
import { motion } from "framer-motion";
import { GripHorizontal } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";

interface StickerItem {
  label: string;
  tone: "vermilion" | "cobalt" | "mustard" | "sage" | "plum" | "ink" | "paper";
  x: number;
  y: number;
  rotate: number;
}

const TONES = {
  vermilion: "bg-vermilion text-paper",
  cobalt: "bg-cobalt text-paper",
  mustard: "bg-mustard text-ink",
  sage: "bg-sage text-paper",
  plum: "bg-plum text-paper",
  ink: "bg-ink text-paper",
  paper: "bg-paper-card text-ink",
};

const STICKERS: StickerItem[] = [
  { label: "TypeScript", tone: "cobalt", x: 6, y: 16, rotate: -8 },
  { label: "React", tone: "paper", x: 28, y: 8, rotate: 5 },
  { label: "Node.js", tone: "sage", x: 52, y: 16, rotate: -3 },
  { label: "AWS Lambda", tone: "mustard", x: 76, y: 8, rotate: 7 },
  { label: "MongoDB", tone: "vermilion", x: 10, y: 54, rotate: 6 },
  { label: "Microservices", tone: "ink", x: 34, y: 60, rotate: -5 },
  { label: "OAuth 2.0", tone: "plum", x: 60, y: 56, rotate: 8 },
  { label: "SOLID", tone: "paper", x: 80, y: 60, rotate: -10 },
  { label: "Stripe", tone: "cobalt", x: 20, y: 34, rotate: 3 },
  { label: "SQS", tone: "mustard", x: 48, y: 36, rotate: -7 },
  { label: "Zod", tone: "vermilion", x: 68, y: 38, rotate: 5 },
];

export function DraggableStickers() {
  const constraints = useRef<HTMLDivElement>(null);

  return (
    <div className="relative mt-10 border-2 border-ink bg-paper-card md:mt-14">
      <div className="flex items-center justify-between border-b-2 border-ink px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ink">
        <span className="flex items-center gap-2">
          <GripHorizontal className="h-3.5 w-3.5 text-vermilion" />
          Drag &amp; fling — the editorial scrap pile
        </span>
        <span className="hidden text-ink-muted md:inline">EXHIBIT A</span>
      </div>

      <div
        ref={constraints}
        className="relative h-80 w-full overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(var(--ink) / 0.18) 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      >
        {STICKERS.map((s) => (
          <motion.button
            key={s.label}
            type="button"
            drag
            dragConstraints={constraints}
            dragElastic={0.2}
            dragMomentum
            data-cursor="grab"
            initial={{ rotate: s.rotate, opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.08, rotate: s.rotate + 3 }}
            whileTap={{ scale: 0.96 }}
            whileDrag={{ scale: 1.15, zIndex: 30 }}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className={`absolute flex cursor-grab select-none items-center gap-1.5 border-2 border-ink px-2.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest shadow-hard active:cursor-grabbing ${TONES[s.tone]}`}
          >
            <TechIcon name={s.label} className="h-3.5 w-3.5" branded={false} />
            {s.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
