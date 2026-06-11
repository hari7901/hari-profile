import { cn } from "@/lib/cn";

interface DividerProps {
  className?: string;
  /** Optional label centered on the rule. */
  label?: string;
  variant?: "thin" | "double" | "dashed" | "ornament";
}

const ORNAMENT = "✦ · ✦ · ✦";

/**
 * Horizontal editorial rule — thin, double-line, dashed, or with a
 * centered ornament/label (like in a printed magazine).
 */
export function Divider({ className, label, variant = "thin" }: DividerProps) {
  if (variant === "ornament" || label) {
    const text = label ?? ORNAMENT;
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <span className="h-px flex-1 bg-ink/40" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
          {text}
        </span>
        <span className="h-px flex-1 bg-ink/40" />
      </div>
    );
  }
  if (variant === "double") {
    return (
      <div
        className={cn("h-2 border-y border-ink", className)}
        aria-hidden
      />
    );
  }
  if (variant === "dashed") {
    return (
      <div
        className={cn("h-px border-t border-dashed border-ink/50", className)}
        aria-hidden
      />
    );
  }
  return <div className={cn("h-px bg-ink/70", className)} aria-hidden />;
}
