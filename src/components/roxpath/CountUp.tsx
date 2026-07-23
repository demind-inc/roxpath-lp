import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: (value: number) => string;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function CountUp({ value, prefix = "", suffix = "", format, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(format ? format(0) : "0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setDisplay(format ? format(v) : Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, value, format]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
