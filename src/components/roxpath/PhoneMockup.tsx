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
      <img
        src={src}
        alt={alt}
        className={cn(
          "block h-auto w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-500",
          tiltClass,
        )}
        loading="lazy"
      />
    </div>
  );
}
