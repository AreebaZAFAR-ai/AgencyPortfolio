import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Editorial serif used for every heading on the service detail page.
export const serif = "font-display font-normal";

// Small mark + mono label that opens each section.
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("type-eyebrow inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
