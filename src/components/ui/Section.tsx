import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  children: ReactNode;
  className?: string;
  flush?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className, flush = false, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        {...rest}
        className={cn(
          "relative mx-auto w-full max-w-[1280px] px-5 md:px-10",
          !flush && "py-20 md:py-28",
          className,
        )}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = "Section";
