import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Stamp } from "@/components/ui/Stamp";
import { Sticker } from "@/components/ui/Sticker";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Contact() {
  return (
    <Section id="contact">
      {/* Eyebrow nav */}
      <div className="mb-3 flex items-center justify-between border-b border-ink pb-3 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
        <span>Closing — Letters to the editor</span>
        <span>§05</span>
      </div>

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative overflow-visible border-[3px] border-ink bg-paper-card px-6 py-12 sm:px-12 sm:py-16 md:py-20"
      >
        {/* Postage stamp in the top-right corner — like a stamped envelope */}
        <div className="absolute -right-3 -top-6 hidden md:block">
          <div
            className="amb-sway relative border-[3px] border-ink bg-paper p-1.5"
            style={{ ["--sway-base" as string]: "-2deg" }}
          >
            <div className="border border-ink bg-vermilion px-4 py-3 text-center font-mono text-paper">
              <div className="text-[10px] uppercase tracking-widest">Postage</div>
              <div className="display display-italic text-3xl leading-none">
                ₹25
              </div>
              <div className="text-[10px] uppercase tracking-widest">Hari · IN</div>
            </div>
          </div>
        </div>

        {/* Address lines (postcard) */}
        <motion.div
          variants={fadeUp}
          className="space-y-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted"
        >
          <div>To: A curious recruiter / collaborator</div>
          <div>Re: Full Stack &amp; Backend opportunities</div>
          <div>
            Date: Today, urgently
            <span className="amb-caret ml-0.5 inline-block bg-vermilion align-middle">
              &nbsp;
            </span>
          </div>
        </motion.div>

        {/* Hand-drawn underline rule */}
        <div className="my-6 h-px w-full bg-ink/20" />

        {/* Letter body */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <motion.h2
              variants={fadeUp}
              className="display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95]"
            >
              Got a role or a{" "}
              <em className="display-italic text-vermilion">wild idea?</em>
              <br />
              Let's print it.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
            >
              I'm currently open to full-stack and backend engineering
              opportunities. The fastest way to reach me is email — I reply to
              every message, usually within a day.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button
                  as="a"
                  href={`mailto:${PROFILE.email}`}
                  size="lg"
                  data-cursor="say hi"
                >
                  <Mail className="h-4 w-4" />
                  {PROFILE.email}
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
                  Download Résumé
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Or find me elsewhere ↗
              </span>
              <div className="flex items-center gap-1.5">
                {PROFILE.socials.map((social) => (
                  <Magnetic key={social.label} strength={0.4}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      aria-label={social.label}
                      data-cursor={social.icon}
                      className="grid h-10 w-10 place-items-center border-2 border-ink bg-paper text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      <SocialIcon name={social.icon} className="h-4 w-4" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>

            {/* Signature line */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-end gap-4"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                  Yours, in clean code,
                </div>
                <div className="display display-italic mt-2 text-4xl text-ink">
                  Hari D.S.
                </div>
                <div className="mt-1 h-px w-40 bg-ink" />
              </div>
            </motion.div>
          </div>

          {/* Right column — stamps and stickers */}
          <motion.div
            variants={fadeUp}
            className="relative flex flex-col items-center justify-center gap-8 md:col-span-4"
          >
            <Stamp
              ring="Reply Guaranteed · 24h"
              label="Inbox"
              size={170}
              color="#1d3fb8"
              className="hidden md:block"
            />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Sticker variant="mustard" rotate={-6}>
                Open to Work
              </Sticker>
              <Sticker variant="vermilion" rotate={4}>
                Remote ✦ Hybrid
              </Sticker>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
