import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  tilt?: "left" | "right" | "none";
  glow?: boolean;
  video?: boolean;
  poster?: string;
}

export function PhoneMockup({
  src,
  alt,
  className,
  tilt = "none",
  glow = false,
  video = false,
  poster,
}: PhoneMockupProps) {
  const tiltClass =
    tilt === "left"
      ? "md:-rotate-[3deg] md:hover:-rotate-[1.5deg]"
      : tilt === "right"
        ? "md:rotate-[3deg] md:hover:rotate-[1.5deg]"
        : "";
  const motionClass =
    "transition-transform duration-500 ease-out group-hover:-translate-y-2";
  return (
    <div className={cn("group relative mx-auto w-full max-w-[320px]", className)}>
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-8 bottom-8 -z-10 rounded-[48px] bg-primary/30 opacity-70 blur-[70px] transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {video ? (
        <div
          className={cn(
            motionClass,
            "drop-shadow-[0_18px_40px_rgba(0,0,0,0.18)] group-hover:drop-shadow-[0_24px_50px_rgba(0,0,0,0.24)]",
          )}
        >
          <div className="overflow-hidden rounded-[2.75rem]">
            <PhoneVideo src={src} poster={poster} alt={alt} className="block h-auto w-full" />
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn(
            "block h-auto w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_35px_70px_rgba(0,0,0,0.6)]",
            motionClass,
            tiltClass,
          )}
          loading="lazy"
        />
      )}
    </div>
  );
}

function PhoneVideo({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tryPlay = () => {
      if (!reduceMotion.matches) void el.play().catch(() => {});
    };

    if (reduceMotion.matches) {
      el.pause();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else el.pause();
      },
      { threshold: 0.08, rootMargin: "120px 0px" },
    );
    io.observe(el);
    tryPlay();
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-label={alt}
    />
  );
}
