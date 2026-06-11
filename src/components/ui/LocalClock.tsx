import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface LocalClockProps {
  timeZone?: string;
  className?: string;
}

/**
 * Live clock for a given IANA timezone, updating every second.
 */
export function LocalClock({
  timeZone = "Asia/Kolkata",
  className,
}: LocalClockProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone,
  }).format(now);

  return (
    <span className={cn("font-mono tabular-nums", className)}>{time}</span>
  );
}
