import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TechIcon } from "@/components/ui/TechIcon";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "ink" | "vermilion" | "cobalt" | "mustard";
  /** If true, prepend the tech-brand icon for the badge text. */
  icon?: boolean;
}

const VARIANTS: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-paper text-ink border-ink/80",
  ink: "bg-ink text-paper border-ink",
  vermilion: "bg-vermilion text-paper border-vermilion",
  cobalt: "bg-cobalt text-paper border-cobalt",
  mustard: "bg-mustard text-ink border-mustard",
};

/**
 * Editorial chip — uppercase mono, hard ink border, no rounding. Optionally
 * prepend a brand tech icon when `icon` is true and children is a string.
 */
export function Badge({
  children,
  className,
  variant = "default",
  icon = false,
}: BadgeProps) {
  const showIcon = icon && typeof children === "string";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[10px] uppercase leading-none tracking-widest transition-transform duration-200 hover:-translate-y-px",
        VARIANTS[variant],
        className,
      )}
    >
      {showIcon && (
        <TechIcon name={children as string} className="h-3 w-3" />
      )}
      {children}
    </span>
  );
}
