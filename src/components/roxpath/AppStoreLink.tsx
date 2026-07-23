import type { ReactNode } from "react";
import { Apple } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppStoreLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function AppStoreLink({ href, className, children }: AppStoreLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <Apple className="h-4 w-4 shrink-0 fill-current" />
      {children}
    </a>
  );
}
