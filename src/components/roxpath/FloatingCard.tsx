import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FloatingCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "absolute rounded-2xl border border-white/10 bg-[#141416]/90 px-4 py-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
