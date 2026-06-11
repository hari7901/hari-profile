import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { NAV_ITEMS, PROFILE } from "@/data/portfolio";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

/**
 * Newspaper masthead nav — a single horizontal strip with type, an "issue
 * number" brand mark on the left, the section index in the middle, and a
 * Resume CTA on the right. Sticky and slim.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-paper/95 backdrop-blur-md border-b-2 border-ink"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 py-3 md:px-10">
          {/* Brand — Issue lockup */}
          <a
            href="#home"
            onClick={close}
            data-cursor="home"
            className="group flex shrink-0 items-baseline gap-2 outline-none"
          >
            <span className="display display-italic text-2xl text-ink transition-colors group-hover:text-vermilion md:text-3xl">
              Hari.
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink-muted md:inline">
              · Vol. I — No. 01
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item, i) => {
              const active = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-cursor={item.label.toLowerCase()}
                  className={cn(
                    "group relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
                    active ? "text-vermilion" : "text-ink hover:text-vermilion",
                  )}
                >
                  <span className="mr-1.5 text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-3 right-3 h-0.5 bg-vermilion"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right-side controls */}
          <div className="flex shrink-0 items-center gap-2.5">
            <ThemeToggle />

            {/* CTA */}
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="download"
              className="hidden shrink-0 items-center gap-2 border-2 border-ink bg-ink px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest text-paper shadow-[3px_3px_0_0_#e63322] transition-all hover:shadow-[1px_1px_0_0_#e63322] hover:translate-x-[2px] hover:translate-y-[2px] md:inline-flex"
            >
              <FileText className="h-3.5 w-3.5" />
              Résumé
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center border-2 border-ink bg-paper text-ink shadow-hard lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "menu"}
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <div className="flex min-h-full flex-col px-6 pb-10 pt-24">
              <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                ⟶ Contents
              </div>
              <ol className="mt-6 space-y-3">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i }}
                    className="border-b-2 border-ink pb-3"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={close}
                      className={cn(
                        "flex items-baseline gap-4 outline-none",
                        activeId === item.id ? "text-vermilion" : "text-ink",
                      )}
                    >
                      <span className="num-tag text-2xl">
                        0{i + 1}
                      </span>
                      <span className="display text-4xl">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ol>

              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={close}
                className="mt-10 inline-flex items-center justify-center gap-2 border-2 border-ink bg-ink px-6 py-3 font-mono text-sm uppercase tracking-widest text-paper shadow-[4px_4px_0_0_#e63322]"
              >
                <FileText className="h-4 w-4" />
                Download Résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
