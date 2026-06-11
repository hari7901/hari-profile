/**
 * Editorial paper background — warm cream paper with column rulers,
 * a halftone vignette in the corner, and subtle vermilion margin marks.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base paper tone */}
      <div className="absolute inset-0 bg-paper" />

      {/* Subtle warm wash at the top */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-60"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(217,160,23,0.10), transparent 70%)",
        }}
      />

      {/* Vertical rule columns — like a notebook margin */}
      <div className="absolute inset-y-0 left-[5vw] hidden w-px bg-vermilion/40 md:block" />
      <div className="absolute inset-y-0 right-[5vw] hidden w-px bg-vermilion/40 md:block" />

      {/* Halftone corner accents */}
      <div
        className="absolute -top-10 right-0 h-[260px] w-[260px] opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(21,17,13,0.45) 1px, transparent 0)",
          backgroundSize: "6px 6px",
          maskImage: "radial-gradient(circle at 100% 0%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 100% 0%, black 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-[300px] w-[300px] opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(230,51,34,0.45) 1px, transparent 0)",
          backgroundSize: "8px 8px",
          maskImage: "radial-gradient(circle at 0% 100%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 100%, black 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
