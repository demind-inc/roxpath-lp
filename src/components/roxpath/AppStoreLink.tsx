import { cn } from "@/lib/utils";
import badge from "@/assets/download-on-the-app-store-badge.png";

interface AppStoreLinkProps {
  href: string;
  className?: string;
  radius?: number;
}

export function AppStoreLink({ href, className, radius = 10 }: AppStoreLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-block h-11 shrink-0 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97]",
        className,
      )}
    >
      <img
        src={badge}
        alt="Download on the App Store"
        className="h-full w-auto transition-[filter] duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_8px_24px_rgba(79,70,229,0.45)]"
        style={{ borderRadius: `${radius}px` }}
      />
    </a>
  );
}
