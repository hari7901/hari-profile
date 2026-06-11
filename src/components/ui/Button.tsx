import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "ink" | "paper" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

// Hard ink border + offset block shadow ("brutalist" press button)
const VARIANTS: Record<Variant, string> = {
  ink: "bg-ink text-paper border-ink hover:bg-vermilion hover:border-vermilion",
  paper: "bg-paper-card text-ink border-ink hover:bg-mustard",
  ghost: "bg-transparent text-ink border-ink/40 hover:border-ink hover:bg-paper-card",
};

const SIZES: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const baseClasses =
  "group relative inline-flex items-center justify-center gap-2 border font-sans font-semibold uppercase tracking-wider transition-all duration-200 will-change-transform active:translate-x-[2px] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50";

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const { children, variant = "ink", size = "md", className } = props;
  // Offset block shadow gives the "press" feel; shadow shrinks on active.
  const classes = cn(
    baseClasses,
    VARIANTS[variant],
    SIZES[size],
    "shadow-[4px_4px_0_0_#15110d] hover:shadow-[2px_2px_0_0_#15110d] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0_0_#15110d]",
    className,
  );

  if (props.as === "a") {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props;
    void _as; void _v; void _s; void _c; void _ch;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  void _as; void _v; void _s; void _c; void _ch;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
