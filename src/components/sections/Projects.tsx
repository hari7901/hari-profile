import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import type { ProjectItem } from "@/types";

const COLORS = ["#e63322", "#1d3fb8"];

function ProjectCard({
  project,
  index,
  color,
}: {
  project: ProjectItem;
  index: string;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || flipped) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(-py * 6);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const toggle = () => setFlipped((f) => !f);

  const face =
    "absolute inset-0 flex h-full flex-col border-[2.5px] border-ink p-6 [backface-visibility:hidden] sm:p-7";

  return (
    <motion.div
      variants={fadeUp}
      className="h-full min-h-[26rem] [perspective:1400px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ transform }}
        className="relative h-full"
      >
        {/* Offset block shadow behind card */}
        <div
          className="absolute inset-0 translate-x-2 translate-y-2"
          style={{ background: color }}
          aria-hidden
        />
        <motion.div
          role="button"
          tabIndex={0}
          data-cursor={flipped ? "flip back" : "flip"}
          aria-label={`${project.name} — tap to ${flipped ? "hide" : "reveal"} impact`}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group relative h-full cursor-pointer outline-none [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          {/* FRONT */}
          <div className={`${face} bg-paper-card`}>
            {/* Top masthead */}
            <div className="flex items-start justify-between border-b-2 border-ink pb-3">
              <div>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color }}
                >
                  Project № {index} · {project.tagline}
                </span>
                <h3 className="display mt-2 text-3xl">{project.name}</h3>
              </div>
              <div
                className="grid h-10 w-10 place-items-center border-2 border-ink transition-transform group-hover:rotate-45"
                style={{ background: color, color: "#f1ead9" }}
              >
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            {/* Editorial art plate */}
            <div className="relative my-4 h-32 overflow-hidden border-2 border-ink">
              {/* Tinted background wash */}
              <div className="absolute inset-0" style={{ background: color, opacity: 0.12 }} />
              {/* Halftone texture, fading to edges */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgb(var(--ink) / 0.35) 1px, transparent 0)",
                  backgroundSize: "7px 7px",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
                }}
              />
              {/* Two thick vertical accent rules on the left */}
              <div className="absolute left-0 top-0 h-full w-1" style={{ background: color }} />
              <div className="absolute left-3 top-0 h-full w-px" style={{ background: color, opacity: 0.4 }} />
              {/* Project number — large italic serif */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <span
                  className="amb-float display display-italic inline-block leading-none"
                  style={{ color, fontSize: "4.5rem", opacity: 0.9 }}
                >
                  {index}
                </span>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color, opacity: 0.7 }}
                >
                  {project.tagline}
                </span>
              </div>
              {/* Light sheen sweeping across the plate */}
              <span
                aria-hidden
                className="amb-sheen absolute inset-y-0 -left-1/3 w-1/3"
                style={{
                  background:
                    "linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent)",
                  animationDelay: `${(parseInt(index, 10) || 0) * 0.8}s`,
                }}
              />
            </div>

            <p className="text-sm leading-relaxed text-ink-soft">
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
              {project.stack.map((tech) => (
                <Badge key={tech} icon>
                  {tech}
                </Badge>
              ))}
            </div>

            <span className="mt-4 inline-flex w-fit items-center gap-2 border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest">
              <RotateCw className="h-3 w-3 transition-transform group-hover:rotate-180" />
              Flip → see impact
            </span>
          </div>

          {/* BACK */}
          <div
            className={`${face} [transform:rotateY(180deg)]`}
            style={{ background: color, color: "#f1ead9" }}
          >
            <div className="flex items-start justify-between border-b-2 border-paper pb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest">
                Verified Impact · Project № {index}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest">
                ●●●
              </span>
            </div>
            <h3 className="display mt-3 text-3xl">{project.name}</h3>

            <ul className="mt-5 space-y-3">
              {project.highlights.map((point, i) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="grid h-6 w-6 shrink-0 place-items-center border-2 border-paper font-mono text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <span className="mt-auto inline-flex w-fit items-center gap-2 border-2 border-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest">
              <RotateCw className="h-3 w-3" />
              Flip back
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="04"
        eyebrow="Department · Field Work"
        title={
          <>
            Things I've built{" "}
            <em className="display-italic text-mustard">for the love of it</em>.
          </>
        }
        description="Side projects where I get to experiment with AI, auth and high-throughput systems. Tap any project to flip and read the impact."
        meta={
          <div className="space-y-1 text-right">
            <div>Page 11 — 12</div>
            <div className="text-ink">→ tap to flip</div>
          </div>
        }
      />

      <motion.div
        variants={stagger(0.12, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-2"
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={String(i + 1).padStart(2, "0")}
            color={COLORS[i % COLORS.length]}
          />
        ))}
      </motion.div>
    </Section>
  );
}
