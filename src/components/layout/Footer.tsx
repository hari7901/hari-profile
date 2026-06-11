import { ArrowUp } from "lucide-react";
import { NAV_ITEMS, PROFILE } from "@/data/portfolio";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { LocalClock } from "@/components/ui/LocalClock";

/**
 * Editorial footer — like the last page of a magazine: colophon, masthead,
 * and an oversized name as printed bleed.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20 border-t-2 border-ink">
      <div className="mx-auto w-full max-w-[1280px] px-5 pt-10 md:px-10">
        {/* Top row — colophon */}
        <div className="grid grid-cols-1 gap-8 border-b-2 border-ink pb-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              The Colophon
            </div>
            <a
              href="#home"
              className="display display-italic mt-2 block text-4xl text-ink"
            >
              The Daily Engineer
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              A printed-and-bound portfolio of scalable systems, type-safe
              microservices, and cloud work. Published from Gurugram, in.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              Contents
            </div>
            <ul className="mt-3 space-y-1.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="ink-link text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              Distribution
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {PROFILE.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="ink-link inline-flex items-center gap-2"
                  >
                    <SocialIcon name={s.icon} className="h-3.5 w-3.5" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 flex md:justify-end">
            <a
              href="#home"
              className="group inline-flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-widest text-ink"
            >
              <span className="grid h-12 w-12 place-items-center border-2 border-ink bg-paper-card shadow-hard transition-all group-hover:shadow-hard-xs group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                <ArrowUp className="h-5 w-5" />
              </span>
              Back to top
            </a>
          </div>
        </div>

        {/* Bottom — meta */}
        <div className="flex flex-col items-start justify-between gap-2 py-5 font-mono text-[10px] uppercase tracking-widest text-ink-muted sm:flex-row sm:items-center">
          <p>
            © {year} {PROFILE.name} · Set in Instrument Serif &amp; Inter
            Tight · Printed on the web.
          </p>
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-vermilion" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-vermilion" />
            </span>
            Gurugram · <LocalClock className="text-ink" />
          </p>
        </div>
      </div>

      {/* Oversized name watermark — printed bleed at the bottom */}
      <div
        aria-hidden
        className="display display-italic select-none overflow-hidden text-center leading-[0.8]"
        style={{
          fontSize: "clamp(5rem, 22vw, 16rem)",
          color: "transparent",
          WebkitTextStroke: "1.5px rgb(var(--ink))",
          letterSpacing: "-0.06em",
        }}
      >
        Hari Dass Sachdeva
      </div>
    </footer>
  );
}
