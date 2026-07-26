import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  tilt?: "left" | "right" | "none";
  glow?: boolean;
}

export function PhoneMockup({ src, alt, className, tilt = "none", glow = false }: PhoneMockupProps) {
  const tiltClass =
    tilt === "left"
      ? "md:-rotate-[3deg] md:hover:-rotate-[1.5deg]"
      : tilt === "right"
        ? "md:rotate-[3deg] md:hover:rotate-[1.5deg]"
        : "";
  return (
    <div className={cn("group relative mx-auto w-full max-w-[320px]", className)}>
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-8 bottom-8 -z-10 rounded-[48px] bg-primary/30 blur-[70px] transition-opacity duration-500 group-hover:opacity-100 opacity-70"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "block h-auto w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:drop-shadow-[0_35px_70px_rgba(0,0,0,0.6)]",
          tiltClass,
        )}
        loading="lazy"
      />
    </div>
  );
}
