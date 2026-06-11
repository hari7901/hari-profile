import { motion } from "framer-motion";
import { STATS } from "@/data/portfolio";
import { useCountUp } from "@/hooks/useCountUp";
import { EASE_OUT, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Ticker } from "@/components/ui/Ticker";
import type { StatItem } from "@/types";

const COLORS = ["#e63322", "#1d3fb8", "#d9a017", "#5a7a4a"];

function Stat({ stat, index }: { stat: StatItem; index: number }) {
  const { ref, value } = useCountUp(stat.value);
  const accent = COLORS[index % COLORS.length];

  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col gap-2 border-r border-ink/15 px-5 py-7 last:border-r-0"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        Fig. {String(index + 1).padStart(2, "0")}
      </span>
      <span
        ref={ref}
        className="display block text-[clamp(3rem,8vw,5.5rem)] leading-none tabular-nums"
        style={{ color: accent }}
      >
        {value}
        <span className="text-ink/80">{stat.suffix}</span>
      </span>
      <p className="text-sm leading-snug text-ink-soft">{stat.label}</p>

      {/* Fill bar — with a sheen that keeps sweeping across it */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 * index }}
        className="relative mt-2 h-2 origin-left overflow-hidden"
        style={{ background: accent }}
        aria-hidden
      >
        <span
          className="amb-sheen absolute inset-y-0 -left-1/4 w-2/5"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
            animationDelay: `${index * 0.5}s`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <>
      <Ticker
        items={[
          "TypeScript First",
          "Type-safe Microservices",
          "AWS Lambda + SQS",
          "OAuth 2.0 / OIDC",
          "Domain-Driven Design",
          "Full-Stack Development",
          "Open to Opportunities",
        ]}
        variant="ink"
        speed={48}
        className="my-12 md:my-16"
      />
      <Section id="stats" className="!py-0">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 border-y-2 border-ink md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <Stat key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </Section>
    </>
  );
}
