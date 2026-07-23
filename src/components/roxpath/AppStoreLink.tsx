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
      className={cn("inline-block h-11 shrink-0", className)}
    >
      <img
        src={badge}
        alt="Download on the App Store"
        className="h-full w-auto"
        style={{ borderRadius: `${radius}px` }}
      />
    </a>
  );
}
