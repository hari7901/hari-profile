import { motion } from "framer-motion";
import { ArrowDownRight, FileText, MoveRight } from "lucide-react";
import { NOW_BUILDING, PROFILE } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Portrait } from "@/components/ui/Portrait";
import { Stamp } from "@/components/ui/Stamp";
import { Sticker } from "@/components/ui/Sticker";
import { LocalClock } from "@/components/ui/LocalClock";
import { EASE_OUT, fadeUp, stagger } from "@/lib/motion";

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  day: "2-digit",
  month: "short",
  year: "numeric",
}).toUpperCase();

export function Hero() {
  return (
    <Section
      id="home"
      flush
      className="relative w-full max-w-none overflow-x-clip px-0 pt-20"
    >
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-10">
        {/* MASTHEAD — newspaper banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="relative flex flex-wrap items-end justify-between gap-2 border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-widest text-ink-muted"
        >
          <span>The Daily Engineer · Vol. I · No. 01</span>
          <span className="hidden md:inline">{TODAY}</span>
          <span>
            <LocalClock /> IST · ₹ <em className="text-vermilion not-italic">●</em> Live
          </span>
        </motion.div>

        {/* Thick double rule */}
        <div className="mt-1.5 h-2 border-y border-ink" aria-hidden />

        {/* HEADLINE BLOCK */}
        <motion.div
          variants={stagger(0.08, 0.2)}
          initial="hidden"
          animate="show"
          className="relative grid grid-cols-1 gap-8 pt-8 md:grid-cols-12 md:gap-10 md:pt-12"
        >
          {/* Left col — Headline */}
          <div className="md:col-span-8">
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="chip chip-ink">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-mustard animate-blink" />
                Open to work
              </span>
              <span className="chip">Full Stack · {PROFILE.location}</span>
            </motion.div>

            <h1 className="display mt-6 text-[clamp(3rem,9.5vw,8rem)] leading-[0.86]">
              <motion.span variants={fadeUp} className="block">
                <AnimatedText text="I engineer" />
              </motion.span>
              <motion.span variants={fadeUp} className="block">
                <em className="display-italic text-vermilion">scalable</em>{" "}
                <AnimatedText text="systems" delay={0.2} />
              </motion.span>
              <motion.span variants={fadeUp} className="block text-ink-muted">
                <AnimatedText text="that ship." delay={0.4} />
                <em className="display-italic ml-3 text-cobalt">Loudly.</em>
              </motion.span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl border-l-[3px] border-vermilion pl-4 text-[15px] leading-relaxed text-ink-soft md:text-lg"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-vermilion">
                Lede ¶
              </span>
              <br />
              {PROFILE.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button as="a" href="#experience" size="lg" data-cursor="view work">
                  Read the work
                  <ArrowDownRight className="h-4 w-4" />
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button
                  as="a"
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                  size="lg"
                  data-cursor="download"
                >
                  <FileText className="h-4 w-4" />
                  Resume.pdf
                </Button>
              </Magnetic>
            </motion.div>

            {/* Author line */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Authored by →
              </span>
              <span className="display display-italic text-2xl">
                {PROFILE.name}
              </span>
              <span className="hidden h-4 w-px bg-ink/40 sm:block" />
              <div className="flex items-center gap-1.5">
                {PROFILE.socials.map((social, i) => (
                  <Magnetic key={social.label} strength={0.4}>
                    <motion.a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      aria-label={social.label}
                      data-cursor={social.icon === "mail" ? "say hi" : social.icon}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.06, ease: EASE_OUT }}
                      whileHover={{ y: -3 }}
                      className="grid h-9 w-9 place-items-center border border-ink bg-paper-card text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      <SocialIcon name={social.icon} className="h-4 w-4" />
                    </motion.a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right col — Portrait + meta */}
          <div className="relative md:col-span-4">
            <Portrait
              src={PROFILE.avatarUrl}
              alt={PROFILE.name}
              className="mx-auto w-[clamp(14rem,42vw,18rem)]"
            />

            {/* Floating stamp top-right of portrait */}
            <div className="pointer-events-auto absolute -right-2 -top-4 md:-right-6">
              <Stamp ring="Approved · Ships Code" label="Hari" size={104} color="#e63322" />
            </div>

            {/* Sticker bottom-left of portrait */}
            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6">
              <Sticker variant="cobalt" rotate={-7}>
                Microservices ✦ AWS ✦ TS
              </Sticker>
            </div>
          </div>
        </motion.div>

        {/* SECONDARY BLOCK — pull quote + sidebar */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          {/* Now Building — pull quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="md:col-span-7"
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              ⟶ Currently
            </div>
            <p className="display display-italic mt-3 text-[clamp(1.5rem,3.5vw,2.4rem)] leading-tight">
              &ldquo;{NOW_BUILDING}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-12 bg-ink" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                — Filed from {PROFILE.location}
              </span>
            </div>
          </motion.div>

          {/* Sidebar — In this issue */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
            className="md:col-span-5"
          >
            <div className="paper-card p-5">
              <div className="flex items-center justify-between border-b border-ink/40 pb-2 font-mono text-[10px] uppercase tracking-widest">
                <span>In this issue</span>
                <span className="text-vermilion">↓</span>
              </div>
              <ol className="mt-3 space-y-2 text-sm">
                {[
                  { n: "01", t: "About — System thinking & SOLID design", h: "#about" },
                  { n: "02", t: "Skills — Languages, cloud, tooling", h: "#skills" },
                  { n: "03", t: "Experience — QuickReply, GetCopayHelp", h: "#experience" },
                  { n: "04", t: "Projects — Use AI, SmartMail AI", h: "#projects" },
                  { n: "05", t: "Contact — Get in touch", h: "#contact" },
                ].map((row) => (
                  <li
                    key={row.n}
                    className="group flex items-baseline justify-between gap-3 border-b border-dashed border-ink/20 pb-1.5"
                  >
                    <a
                      href={row.h}
                      data-cursor="read"
                      className="flex items-baseline gap-3 transition-colors group-hover:text-vermilion"
                    >
                      <span className="font-mono text-xs text-ink-muted">{row.n}</span>
                      <span className="font-medium">{row.t}</span>
                    </a>
                    <MoveRight className="h-3.5 w-3.5 -translate-x-2 text-ink-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-vermilion group-hover:opacity-100" />
                  </li>
                ))}
              </ol>
            </div>
          </motion.aside>
        </div>
      </div>
    </Section>
  );
}
