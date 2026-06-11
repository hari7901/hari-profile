import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

const THEME_KEY = "theme";
const HINT_KEY = "theme-hint-seen-v2";

/** Read the theme the inline <head> script already resolved before paint. */
function getInitial(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

interface ThemeToggleProps {
  className?: string;
}

/**
 * Light/dark toggle. Flips the `dark` class on <html> (which swaps the CSS
 * colour variables) and remembers the choice in localStorage. The icon does a
 * small rotate-and-slide swap between a sun and a moon.
 *
 * On a visitor's very first arrival it pops a one-time "sticky note" that
 * points up at the button to reveal that the page can be read light or dark.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [dark, setDark] = useState(getInitial);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      /* storage unavailable — ignore */
    }
  }, [dark]);

  // First-visit hint — appears once the intro plate has slid away.
  useEffect(() => {
    let seen = true;
    try {
      seen = localStorage.getItem(HINT_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    const showT = window.setTimeout(() => {
      setShowHint(true);
      try {
        localStorage.setItem(HINT_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 2800);
    const hideT = window.setTimeout(() => setShowHint(false), 2800 + 9000);

    return () => {
      window.clearTimeout(showT);
      window.clearTimeout(hideT);
    };
  }, []);

  const dismissHint = () => setShowHint(false);

  const toggle = () => {
    setDark((d) => !d);
    if (showHint) dismissHint();
  };

  return (
    <div className={cn("relative shrink-0", className)}>
      <button
        type="button"
        onClick={toggle}
        data-cursor={dark ? "lights on" : "lights off"}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={dark}
        className="relative grid h-10 w-10 place-items-center overflow-hidden border-2 border-ink bg-paper text-ink shadow-hard transition-transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ y: 14, opacity: 0, rotate: -50 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 50 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center"
          >
            {dark ? (
              <Moon className="h-4 w-4 text-mustard" />
            ) : (
              <Sun className="h-4 w-4 text-vermilion" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Pulsing ring drawing the eye to the switch while the hint is up */}
      <AnimatePresence>
        {showHint && (
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="amb-pulse pointer-events-none absolute -inset-1 border-2 border-vermilion"
          />
        )}
      </AnimatePresence>

      {/* First-visit sticky-note callout */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.7, rotate: 4 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, y: -8, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
            className="absolute right-0 top-[calc(100%+14px)] z-[60] origin-top-right"
          >
            <div className="amb-bob">
              {/* arrow pointing up at the switch */}
              <span
                aria-hidden
                className="absolute -top-1.5 right-3.5 h-3 w-3 rotate-45 border-l-2 border-t-2 border-ink bg-mustard"
              />
              <button
                type="button"
                onClick={dismissHint}
                aria-label="Dismiss theme tip"
                className="block w-max max-w-[70vw] border-2 border-ink bg-mustard px-3 py-2 text-left shadow-hard"
              >
                <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-vermilion">
                  P.S. <span className="text-ink">↑</span>
                </span>
                <span className="mt-0.5 block font-mono text-[11px] font-bold uppercase tracking-wide text-ink">
                  Read it in the dark too{" "}
                  <motion.span
                    aria-hidden
                    className="inline-block"
                    animate={{ rotate: [0, 18, -12, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🌙
                  </motion.span>
                </span>
                <span className="mt-1 block font-mono text-[8px] uppercase tracking-widest text-ink/60">
                  tap the switch — or tap to dismiss
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
