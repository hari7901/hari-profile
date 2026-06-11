import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Keyboard, X } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";

/**
 * Konami effects cycle — each time the code is entered, the next effect in this
 * list fires, then it wraps around. Keeps the easter egg rewarding on repeat.
 */
const KONAMI_EFFECTS = [
  { id: "confetti", title: "Special Edition!", sub: "Raining the whole stack" },
  { id: "barrel", title: "Do a Barrel Roll!", sub: "Hold onto your coffee ☕" },
  { id: "newsprint", title: "Stop the Press!", sub: "Newsprint mode engaged" },
  { id: "emoji", title: "Ship It!", sub: "Emoji storm incoming 🚀" },
  { id: "disco", title: "Press Party!", sub: "Everything's wiggling" },
] as const;

type KonamiFx = (typeof KONAMI_EFFECTS)[number]["id"];

// Short, easy cheat code — just type "fun".
const CHEAT = "fun".split("");
const CHEAT_LABEL = "FUN";

const HIRE = "hire".split("");

const SHORTCUTS = [
  { keys: ["?"], label: "Open this panel" },
  { keys: ["G", "H"], label: "Go to Hero (Home)" },
  { keys: ["G", "A"], label: "Go to About" },
  { keys: ["G", "S"], label: "Go to Skills" },
  { keys: ["G", "X"], label: "Go to Experience" },
  { keys: ["G", "P"], label: "Go to Projects" },
  { keys: ["G", "C"], label: "Go to Contact" },
  { keys: ["R"], label: "Download résumé" },
  { keys: ["T"], label: "Back to top" },
  { keys: ["F", "U", "N"], label: "Fun mode — new effect each time" },
];

/**
 * Global easter eggs:
 *  - Konami code → cycles through fun effects (confetti, barrel roll, newsprint
 *    mode, emoji storm, press party) — a different one each time
 *  - Typing "hire" → fires a "You're Hiring?" sticker
 *  - "?" key → keyboard shortcut overlay
 *  - "G" then a section letter → scrolls there
 *  - "R" → opens résumé · "T" → scroll to top
 *  - Floating draggable paperclip with sticky note + coffee meter
 *  - Console banner for nosy developers
 */
export function EasterEggs() {
  // Which Konami effect overlay is currently rendered (confetti/emoji/newsprint).
  const [konamiFx, setKonamiFx] = useState<KonamiFx | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const konamiCount = useRef(0);

  const [hireMode, setHireMode] = useState(false);
  const [shortcuts, setShortcuts] = useState(false);

  useEffect(() => {
    // Console banner — friendly note for fellow developers
    const styles = [
      "color:#e63322;font:600 14px/1.2 monospace",
      "color:#15110d;font:400 12px/1.4 system-ui",
      "color:#1d3fb8;font:600 12px/1.4 monospace",
    ];
    console.log(
      "%c⟶ Hello, fellow developer 👋\n" +
        "%cYou opened DevTools — that's the energy I like.\n" +
        "If you're looking at this site's code: it's hand-built React + TS +\n" +
        "Tailwind + Framer Motion. No template. Drop me a line:\n" +
        "%c→ hariwork79@gmail.com",
      styles[0],
      styles[1],
      styles[2],
    );
    console.log(
      '%cP.S. Type "fun" anywhere — a different effect each time.',
      styles[1],
    );
  }, []);

  useEffect(() => {
    let konamiBuf: string[] = [];
    let hireBuf: string[] = [];
    let gPressed = false;
    let gTimer: number | undefined;

    const go = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    // Fire the next effect in the cycle and announce it via a toast.
    const runKonami = () => {
      const idx = konamiCount.current % KONAMI_EFFECTS.length;
      konamiCount.current += 1;
      const fx = KONAMI_EFFECTS[idx];

      setToast(`Fun ×${konamiCount.current} → ${fx.title}`);
      window.setTimeout(() => setToast(null), 3200);

      const root = document.getElementById("root");

      switch (fx.id) {
        case "confetti":
        case "emoji":
        case "newsprint": {
          setKonamiFx(fx.id);
          if (fx.id === "newsprint" && root) {
            root.style.transition = "filter 0.4s ease";
            root.style.filter = "grayscale(1) contrast(1.4)";
            window.setTimeout(() => {
              root.style.filter = "";
            }, 3600);
          }
          window.setTimeout(() => setKonamiFx(null), 5000);
          break;
        }
        case "barrel": {
          if (root) {
            root.style.transition = "transform 1s cubic-bezier(0.65,0,0.35,1)";
            root.style.transform = "rotate(360deg)";
            window.setTimeout(() => {
              root.style.transition = "";
              root.style.transform = "";
            }, 1050);
          }
          break;
        }
        case "disco": {
          document.body.classList.add("konami-disco");
          window.setTimeout(
            () => document.body.classList.remove("konami-disco"),
            4500,
          );
          break;
        }
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Don't hijack when typing in inputs
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Cheat buffer → cycle fun effects (type "fun")
      konamiBuf = [...konamiBuf, e.key.toLowerCase()].slice(-CHEAT.length);
      if (konamiBuf.join("") === CHEAT.join("")) {
        konamiBuf = [];
        runKonami();
      }

      // "hire" buffer
      hireBuf = [...hireBuf, e.key.toLowerCase()].slice(-HIRE.length);
      if (hireBuf.join("") === HIRE.join("")) {
        setHireMode(true);
        hireBuf = [];
        window.setTimeout(() => setHireMode(false), 4500);
      }

      // "?" → shortcuts
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        setShortcuts((s) => !s);
        return;
      }

      // Single-key shortcuts
      if (!gPressed) {
        if (e.key.toLowerCase() === "r") {
          window.open("/resume.pdf", "_blank");
          return;
        }
        if (e.key.toLowerCase() === "t") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }

      // "g" prefix
      if (e.key.toLowerCase() === "g") {
        gPressed = true;
        window.clearTimeout(gTimer);
        gTimer = window.setTimeout(() => (gPressed = false), 900);
        return;
      }

      if (gPressed) {
        const map: Record<string, string> = {
          h: "home",
          a: "about",
          s: "skills",
          x: "experience",
          p: "projects",
          c: "contact",
        };
        const dest = map[e.key.toLowerCase()];
        if (dest) {
          go(dest);
          gPressed = false;
        }
      }

      // Escape closes overlays
      if (e.key === "Escape") {
        setShortcuts(false);
        setKonamiFx(null);
        setHireMode(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(gTimer);
    };
  }, []);

  return (
    <>
      {/* Floating paper-clip sticky note (bottom-left) */}
      <PaperClipNote onOpenShortcuts={() => setShortcuts(true)} />

      {/* Konami toast — names the effect that just fired */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="pointer-events-none fixed left-1/2 top-24 z-[95] -translate-x-1/2 border-2 border-ink bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-paper shadow-[4px_4px_0_0_#e63322]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami visual overlays */}
      <AnimatePresence>
        {konamiFx === "confetti" && <StickerConfetti key="confetti" />}
        {konamiFx === "emoji" && <EmojiStorm key="emoji" />}
      </AnimatePresence>

      <AnimatePresence>
        {(konamiFx === "confetti" ||
          konamiFx === "emoji" ||
          konamiFx === "newsprint") && (
          <motion.div
            initial={{ scale: 3, rotate: -25, opacity: 0 }}
            animate={{ scale: 1, rotate: -6, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0, rotate: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="pointer-events-none fixed left-1/2 top-1/2 z-[85] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative border-[6px] border-vermilion bg-paper-card px-8 py-6 text-center shadow-[8px_8px_0_0_#15110d]">
              <div className="font-mono text-[11px] uppercase tracking-widest text-vermilion">
                Fun Mode · Vol. ∞
              </div>
              <div className="display display-italic mt-1 text-5xl text-ink">
                {KONAMI_EFFECTS.find((f) => f.id === konamiFx)?.title}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                {KONAMI_EFFECTS.find((f) => f.id === konamiFx)?.sub} · type “{CHEAT_LABEL}” again
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Hire" celebration overlay */}
      <AnimatePresence>
        {hireMode && (
          <motion.a
            href="mailto:hariwork79@gmail.com"
            initial={{ y: 120, rotate: -10, opacity: 0 }}
            animate={{ y: 0, rotate: -4, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="fixed bottom-6 left-6 z-[80] block border-[4px] border-ink bg-mustard p-4 shadow-[6px_6px_0_0_#15110d]"
            data-cursor="say hi"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink">
              ⟶ Detected the word "hire"
            </div>
            <div className="display display-italic mt-1 text-2xl leading-none text-ink">
              You're hiring?
            </div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-vermilion">
              Click here — let's talk →
            </div>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts overlay */}
      <AnimatePresence>
        {shortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-ink/20 backdrop-blur-sm"
            onClick={() => setShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="relative w-[min(90vw,32rem)] border-[3px] border-ink bg-paper-card p-6 shadow-[8px_8px_0_0_#15110d]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShortcuts(false)}
                aria-label="Close shortcuts"
                className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center border-2 border-ink bg-vermilion text-paper shadow-[3px_3px_0_0_#15110d]"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                <Keyboard className="h-3.5 w-3.5" />
                Keyboard Shortcuts · Press ESC to close
              </div>
              <h3 className="display mt-2 text-3xl">
                Type your way around.
              </h3>
              <ul className="mt-5 space-y-2">
                {SHORTCUTS.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-3 border-b border-dashed border-ink/20 pb-2 text-sm last:border-b-0"
                  >
                    <span className="text-ink-soft">{s.label}</span>
                    <span className="flex items-center gap-1">
                      {s.keys.map((k) => (
                        <kbd
                          key={k}
                          className="grid h-6 min-w-[1.5rem] place-items-center border border-ink bg-paper px-1.5 font-mono text-[10px] font-bold uppercase shadow-[1px_1px_0_0_#15110d]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * A draggable paper-clip + sticky note that lives in the bottom-left.
 * Click it to open shortcuts. Includes a tiny scroll-driven coffee meter.
 */
function PaperClipNote({ onOpenShortcuts }: { onOpenShortcuts: () => void }) {
  const [coffees, setCoffees] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const pct = max > 0 ? window.scrollY / max : 0;
          setCoffees(Math.floor(pct * 5));
          setVisible(window.scrollY > 200);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={onOpenShortcuts}
          initial={{ opacity: 0, y: 30, rotate: -12 }}
          animate={{ opacity: 1, y: 0, rotate: -8 }}
          exit={{ opacity: 0, y: 30 }}
          drag
          dragMomentum={false}
          dragElastic={0.2}
          whileHover={{ rotate: -4, scale: 1.04 }}
          whileDrag={{ scale: 1.08, rotate: 0, cursor: "grabbing" }}
          data-cursor="drag · press ?"
          style={{ cursor: "grab", touchAction: "none" }}
          className="group fixed bottom-6 left-6 z-40 hidden md:block"
          aria-label="Show keyboard shortcuts"
        >
          <div className="relative border-[2.5px] border-ink bg-mustard p-3 text-left shadow-[4px_4px_0_0_#15110d]">
            {/* Paper clip */}
            <span
              aria-hidden
              className="absolute -top-3 left-2 grid h-6 w-3 place-items-center"
            >
              <svg viewBox="0 0 12 24" className="h-6 w-3">
                <path
                  d="M3 22 V6 a3 3 0 0 1 6 0 v12 a2 2 0 0 1 -4 0 V8"
                  fill="none"
                  stroke="#15110d"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div className="font-mono text-[9px] uppercase tracking-widest text-ink">
              Press ? for shortcuts
            </div>
            <div className="mt-1 flex items-center gap-1 font-mono text-[10px] text-ink">
              <Coffee className="h-3 w-3" />
              <span>
                Coffees consumed:{" "}
                <span className="font-bold text-vermilion">
                  {Array.from({ length: 5 })
                    .map((_, i) => (i < coffees ? "■" : "□"))
                    .join("")}
                </span>
              </span>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const CONFETTI_TECH = [
  "TypeScript",
  "React",
  "Node.js",
  "MongoDB",
  "AWS",
  "Stripe",
  "Git",
  "Python",
  "Flutter",
  "Firebase",
  "Tailwind",
  "OAuth 2.0",
  "Zod",
  "MySQL",
  "Postman",
  "SQS",
];

const CONFETTI_TONES = [
  "bg-vermilion text-paper",
  "bg-cobalt text-paper",
  "bg-mustard text-ink",
  "bg-sage text-paper",
  "bg-plum text-paper",
  "bg-ink text-paper",
];

/**
 * Rains tech-name sticker chips from the top of the viewport. Each chip gets a
 * random column, delay, rotation, drift and tone. Fired by the Konami code.
 */
function StickerConfetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => {
        const tech = CONFETTI_TECH[i % CONFETTI_TECH.length];
        return {
          id: i,
          tech,
          tone: CONFETTI_TONES[i % CONFETTI_TONES.length],
          left: Math.random() * 100,
          delay: Math.random() * 1.2,
          duration: 2.4 + Math.random() * 2,
          drift: (Math.random() - 0.5) * 220,
          startRotate: Math.random() * 360,
          endRotate: (Math.random() - 0.5) * 720,
        };
      }),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-12vh", x: 0, rotate: p.startRotate, opacity: 1 }}
          animate={{ y: "110vh", x: p.drift, rotate: p.endRotate, opacity: 1 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          style={{ left: `${p.left}%` }}
          className={`absolute top-0 flex items-center gap-1 border-2 border-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest shadow-[2px_2px_0_0_#15110d] ${p.tone}`}
        >
          <TechIcon name={p.tech} className="h-3 w-3" branded={false} />
          {p.tech}
        </motion.div>
      ))}
    </div>
  );
}

const EMOJIS = ["🚀", "☕", "✦", "💾", "🛠️", "📦", "⚡", "🧠", "📰", "✍️", "🔥", "💡"];

/**
 * Emoji storm — bouncier, spinnier rain of big emoji. Fired by the Konami code
 * on the "Ship It!" cycle.
 */
function EmojiStorm() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 48 }).map((_, i) => ({
        id: i,
        emoji: EMOJIS[i % EMOJIS.length],
        left: Math.random() * 100,
        delay: Math.random() * 1,
        duration: 2 + Math.random() * 2.2,
        drift: (Math.random() - 0.5) * 320,
        size: 1.4 + Math.random() * 1.8,
        spin: (Math.random() - 0.5) * 1080,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "-12vh", x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: "112vh", x: p.drift, rotate: p.spin, opacity: 1 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{ left: `${p.left}%`, fontSize: `${p.size}rem` }}
          className="absolute top-0 select-none leading-none"
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}
