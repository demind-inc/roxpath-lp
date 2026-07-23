import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  tilt?: "left" | "right" | "none";
}

export function PhoneMockup({ src, alt, className, tilt = "none" }: PhoneMockupProps) {
  const tiltClass =
    tilt === "left"
      ? "md:-rotate-[3deg]"
      : tilt === "right"
        ? "md:rotate-[3deg]"
        : "";
  return (
    <div className={cn("relative mx-auto w-full max-w-[320px]", className)}>
      <div
        className={cn(
          "relative rounded-[40px] border border-white/12 bg-black p-[6px] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.65)] transition-transform duration-500",
          tiltClass,
        )}
      >
        <div className="overflow-hidden rounded-[34px] bg-black">
          <img src={src} alt={alt} className="block h-auto w-full" loading="lazy" />
        </div>
        {/* notch */}
        <div className="absolute left-1/2 top-2 h-[20px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
