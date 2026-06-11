import { cn } from "@/lib/cn";

interface TickerProps {
  items: string[];
  className?: string;
  /** Reverse direction. */
  reverse?: boolean;
  /** Animation duration; lower = faster. */
  speed?: number;
  /** Render style. */
  variant?: "ink" | "paper" | "vermilion";
  /** Separator between items (default ✦). */
  separator?: string;
}

/**
 * Newspaper-style horizontal headline ticker. Big serif text with a
 * separator between items, repeated and animated.
 */
export function Ticker({
  items,
  className,
  reverse = false,
  speed = 50,
  variant = "ink",
  separator = "✦",
}: TickerProps) {
  const styles = {
    ink: "bg-ink text-paper border-y border-ink",
    paper: "bg-paper-card text-ink border-y border-ink",
    vermilion: "bg-vermilion text-paper border-y border-vermilion",
  }[variant];

  const animation = reverse ? "animate-marquee-rev" : "animate-marquee";

  // Duplicate items twice so the marquee loop is seamless.
  const tape = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden", styles, className)}>
      <div
        className={cn("flex w-max items-center", animation)}
        style={{ animationDuration: `${speed}s` }}
      >
        {tape.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 px-8 py-4 display text-[clamp(2rem,5vw,3.5rem)] leading-none whitespace-nowrap"
          >
            <em className="display-italic">{item}</em>
            <span className="text-mustard text-3xl">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
