import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Every size shares the same gutter, so all content aligns to one grid.
const sizeClasses = {
  default: "max-w-(--container-max)",
  wide: "max-w-[1600px]",
  narrow: "max-w-[860px]",
  full: "max-w-none",
} as const;

interface ContainerProps {
  as?: ElementType;
  size?: keyof typeof sizeClasses;
  className?: string;
  children: ReactNode;
}

export function Container({ as: As = "div", size = "default", className, children }: ContainerProps) {
  return (
    <As className={cn("mx-auto w-full px-(--space-gutter)", sizeClasses[size], className)}>
      {children}
    </As>
  );
}
