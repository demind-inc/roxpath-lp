import { cn } from "@/lib/utils";
import badge from "@/assets/download-on-the-app-store-badge.png";

interface AppStoreLinkProps {
  href: string;
  className?: string;
}

export function AppStoreLink({ href, className }: AppStoreLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-block h-11 shrink-0", className)}
    >
      <img src={badge} alt="Download on the App Store" className="h-full w-auto" />
    </a>
  );
}
