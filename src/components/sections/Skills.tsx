import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  LayoutGrid,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DraggableStickers } from "@/components/ui/DraggableStickers";
import { TechIcon, getTechMeta } from "@/components/ui/TechIcon";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  layout: LayoutGrid,
  server: Server,
  cloud: Cloud,
  wrench: Wrench,
};

const COLORS = ["vermilion", "cobalt", "mustard", "sage", "plum"] as const;
type Color = (typeof COLORS)[number];

const BG: Record<Color, string> = {
  vermilion: "bg-vermilion text-paper",
  cobalt: "bg-cobalt text-paper",
  mustard: "bg-mustard text-ink",
  sage: "bg-sage text-paper",
  plum: "bg-plum text-paper",
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        eyebrow="Department · Toolkit"
        title={
          <>
            Technologies I build{" "}
            <em className="display-italic text-cobalt">with my hands</em>.
          </>
        }
        description="A pragmatic stack spanning type-safe backends, modern frontends and cloud infrastructure. Logos are the real deal — hover any chip."
        meta={
          <div className="space-y-1 text-right">
            <div>Page 05 — 06</div>
            <div className="text-ink">→ try dragging the chips ↓</div>
          </div>
        }
      />

      <motion.div
        variants={stagger(0.06, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILL_GROUPS.map((group, gi) => {
          const Icon = ICONS[group.icon] ?? Code2;
          const color = COLORS[gi % COLORS.length];
          return (
            <motion.div
              key={group.category}
              variants={fadeUp}
              className="paper-card group relative h-full p-5"
              style={{
                transform: `rotate(${(gi % 2 === 0 ? -0.6 : 0.5).toFixed(2)}deg)`,
              }}
            >
              {/* Pinned tape strip — sways in a faint breeze */}
              <span
                aria-hidden
                className="amb-sway absolute -top-3 left-6 h-2.5 w-16 bg-mustard/80"
                style={{
                  ["--sway-base" as string]: "-3deg",
                  animationDelay: `${gi * 0.5}s`,
                  boxShadow: "1px 1px 0 0 rgba(21,17,13,0.25)",
                }}
              />
              <div className="flex items-center gap-3 border-b border-ink/30 pb-3">
                <span
                  className={`amb-bob grid h-10 w-10 place-items-center border-2 border-ink ${BG[color]}`}
                  style={{ animationDelay: `${gi * 0.35}s` }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    Section {String(gi + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-tight text-ink">
                    {group.category}
                  </h3>
                </div>
              </div>

              {/* Logo grid — real brand icons */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {group.items.map((item) => {
                  const { color: brand } = getTechMeta(item);
                  return (
                    <div
                      key={item}
                      data-cursor={item.toLowerCase()}
                      className="group/chip relative flex flex-col items-center justify-center gap-1 border border-ink/15 bg-paper p-2 transition-all hover:-translate-y-1 hover:border-ink hover:shadow-[2px_2px_0_0_#15110d]"
                    >
                      <TechIcon
                        name={item}
                        className="h-6 w-6 transition-transform group-hover/chip:scale-110"
                      />
                      <span
                        className="block truncate text-center font-mono text-[8px] uppercase leading-none tracking-wider text-ink-muted transition-colors group-hover/chip:text-ink"
                        title={item}
                      >
                        {item}
                      </span>
                      {/* Color dot on hover */}
                      <span
                        className="absolute top-1 right-1 h-1 w-1 rounded-full opacity-0 transition-opacity group-hover/chip:opacity-100"
                        style={{ background: brand }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                <span>{group.items.length} items</span>
                <span className="amb-spin inline-block text-vermilion">✦</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <DraggableStickers />
    </Section>
  );
}
