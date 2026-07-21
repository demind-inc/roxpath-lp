import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  glow?: boolean;
  tilt?: "left" | "right" | "none";
}

export function PhoneMockup({ src, alt, className, glow = true, tilt = "none" }: PhoneMockupProps) {
  const tiltClass =
    tilt === "left"
      ? "md:-rotate-[4deg]"
      : tilt === "right"
        ? "md:rotate-[4deg]"
        : "";
  return (
    <div className={cn("relative mx-auto w-full max-w-[320px]", className)}>
      {glow && (
        <div className="pointer-events-none absolute -inset-16 -z-10 glow-indigo opacity-70 blur-2xl" />
      )}
      <div
        className={cn(
          "relative rounded-[44px] border border-white/10 bg-black p-[6px] shadow-[0_40px_120px_-30px_rgba(79,70,229,0.35)] transition-transform duration-500",
          tiltClass,
        )}
      >
        <div className="overflow-hidden rounded-[38px] bg-black">
          <img src={src} alt={alt} className="block h-auto w-full" loading="lazy" />
        </div>
        {/* notch */}
        <div className="absolute left-1/2 top-2 h-[22px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
