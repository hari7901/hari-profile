import { motion } from "framer-motion";
import { Cpu, Gauge, GraduationCap, MapPin, ServerCog } from "lucide-react";
import { EDUCATION, PROFILE } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocalClock } from "@/components/ui/LocalClock";
import { Sticker } from "@/components/ui/Sticker";
import { Stamp } from "@/components/ui/Stamp";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const PRINCIPLES = [
  {
    icon: ServerCog,
    title: "Deadlines Are Non-Negotiable",
    body: "I scope aggressively, cut scope not corners, and ship. Complex features land on time because I front-load the hard decisions.",
    color: "vermilion" as const,
  },
  {
    icon: Cpu,
    title: "Code Reviews Are Sacred",
    body: "Every PR is a design conversation. I push back on hidden state, undocumented invariants, and tests that mock away the problem.",
    color: "cobalt" as const,
  },
  {
    icon: Gauge,
    title: "Boring Infra, Exciting Product",
    body: "The pipeline should be invisible. I over-engineer reliability so the team can under-worry about ops and focus on features that matter.",
    color: "mustard" as const,
  },
];

const COLOR_MAP = {
  vermilion: "#e63322",
  cobalt: "#1d3fb8",
  mustard: "#d9a017",
};

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="Feature · About"
        title={
          <>
            Engineer obsessed with{" "}
            <em className="display-italic text-vermilion">clean, scalable</em>{" "}
            systems.
          </>
        }
        description={PROFILE.summary}
        meta={
          <div className="space-y-1 text-right">
            <div>Page 03 — 04</div>
            <div className="text-ink">By the editorial desk</div>
          </div>
        }
      />

      <motion.div
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-12"
      >
        {/* Pull quote — magazine style */}
        <motion.div variants={fadeUp} className="md:col-span-7">
          <div className="relative">
            <span className="display display-italic absolute -top-8 left-0 text-[8rem] leading-none text-vermilion">
              &ldquo;
            </span>
            <p className="display display-italic pl-12 text-[clamp(1.5rem,3.2vw,2.4rem)] leading-tight">
              I turn messy complexity into systems that are a joy to extend.
            </p>
            <div className="mt-4 flex items-center gap-3 pl-12">
              <span className="h-px w-10 bg-ink" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                The author, on engineering philosophy
              </span>
            </div>
          </div>
        </motion.div>

        {/* Three columns of principles */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-5"
        >
          <div className="paper-card relative overflow-visible p-6">
            <div className="absolute -top-3 -right-3">
              <Sticker variant="mustard" rotate={6}>
                ◆ How I work
              </Sticker>
            </div>

            <div className="space-y-5">
              {PRINCIPLES.map((p, i) => (
                <div key={p.title} className="flex gap-4 pb-5 last:pb-0 border-b last:border-b-0 border-ink/15">
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center border-2 border-ink"
                    style={{ background: COLOR_MAP[p.color], color: "#f1ead9" }}
                  >
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="num-tag text-lg">0{i + 1}</span>
                      <h4 className="font-display text-lg font-semibold text-ink">
                        {p.title}
                      </h4>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats / education / location row */}
        <motion.div variants={fadeUp} className="md:col-span-5">
          <div className="paper-card h-full p-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cobalt">
              <GraduationCap className="h-4 w-4" />
              Education on file
            </div>
            <h3 className="display mt-3 text-2xl">
              {EDUCATION.institution}
            </h3>
            <p className="mt-2 text-sm text-ink-soft">{EDUCATION.degree}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              <span>CGPA {EDUCATION.detail.replace("CGPA: ", "")}</span>
              <span>•</span>
              <span>{EDUCATION.period}</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-4">
          <div className="paper-card relative h-full overflow-hidden p-6">
            <div
              aria-hidden
              className="absolute -bottom-10 -right-10 h-40 w-40 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(230,51,34,0.7) 1px, transparent 0)",
                backgroundSize: "5px 5px",
              }}
            />
            <div className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-vermilion">
              <MapPin className="h-4 w-4" />
              Filed from
            </div>
            <h3 className="display relative mt-3 text-2xl">{PROFILE.location}</h3>
            <p className="relative mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-mustard opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-vermilion" />
              </span>
              <LocalClock className="text-ink" />
              <span className="text-ink-muted">IST</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center md:col-span-3"
        >
          <Stamp ring="Hand-built · Type-safe" label="Vol I" size={140} color="#1d3fb8" />
        </motion.div>
      </motion.div>
    </Section>
  );
}
