import { useRef } from "react";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import type { ExperienceItem } from "@/types";

const COLORS = ["#e63322", "#1d3fb8", "#5a7a4a"];

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function ExperienceCard({
  item,
  index,
  accent,
}: {
  item: ExperienceItem;
  index: number;
  accent: string;
}) {
  const isPresent = /present/i.test(item.period);
  const monogram = item.company.charAt(0).toUpperCase();

  return (
    <motion.article
      variants={cardReveal}
      className="relative grid grid-cols-1 gap-6 pl-20 md:grid-cols-12 md:gap-8 md:pl-24"
    >
      {/* Monogram square on the rail */}
      <div className="absolute left-0 top-2">
        <div
          className="grid h-14 w-14 place-items-center border-2 border-ink font-display text-2xl shadow-[3px_3px_0_0_#15110d]"
          style={{ background: accent, color: "#f1ead9" }}
        >
          {monogram}
        </div>
        {isPresent && (
          <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center border border-ink bg-mustard text-[8px] font-bold leading-none animate-blink">
            ●
          </span>
        )}
      </div>

      {/* Header column */}
      <header className="md:col-span-4 md:border-r md:border-ink/15 md:pr-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          Chapter {String(index + 1).padStart(2, "0")} · {item.period}
        </div>
        <h3 className="display mt-2 text-3xl md:text-4xl">{item.company}</h3>
        <p
          className="mt-1 font-display text-lg italic"
          style={{ color: accent }}
        >
          {item.role}
        </p>
        <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
          <MapPin className="h-3 w-3" />
          {item.location}
        </p>
        {item.blurb && (
          <p className="mt-4 border-l-2 border-vermilion pl-3 text-sm italic leading-relaxed text-ink-soft">
            {item.blurb}
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {item.stack.map((tech) => (
            <Badge key={tech} icon>
              {tech}
            </Badge>
          ))}
        </div>
      </header>

      {/* Bullet column */}
      <div className="md:col-span-8">
        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-4"
        >
          {item.highlights.map((point, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="group/item flex gap-3 border-b border-dashed border-ink/20 pb-4 text-[15px] leading-relaxed text-ink-soft last:border-b-0"
            >
              <span
                className="grid h-6 w-6 shrink-0 place-items-center border-[1.5px] border-ink font-mono text-[10px] font-bold"
                style={{ background: accent, color: "#f1ead9" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">{point}</span>
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted opacity-0 transition-all group-hover/item:opacity-100" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.article>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        eyebrow="Department · Career Log"
        title={
          <>
            Where I've made{" "}
            <em className="display-italic text-vermilion">an impact</em>.
          </>
        }
        description="From migrating monoliths to shipping serverless pipelines — building software that moves real metrics."
        meta={
          <div className="space-y-1 text-right">
            <div>Page 07 — 10</div>
            <div className="text-ink">Reverse chronological</div>
          </div>
        }
      />

      <div ref={containerRef} className="relative mt-14 md:mt-20">
        {/* Vertical ink rail */}
        <div className="pointer-events-none absolute bottom-0 left-7 top-0 w-px md:left-7">
          <span className="absolute inset-0 bg-ink/15" />
          <motion.span
            style={{ scaleY: railScale }}
            className="absolute inset-0 origin-top bg-vermilion"
          />
        </div>

        <motion.div
          variants={stagger(0.18, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-14 md:gap-20"
        >
          {EXPERIENCE.map((item, i) => (
            <ExperienceCard
              key={item.company}
              item={item}
              index={i}
              accent={COLORS[i % COLORS.length]}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
