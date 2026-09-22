import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizeClasses = {
  default: "max-w-[1400px]",
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
    <As className={cn("mx-auto w-full px-6 md:px-10 xl:px-16", sizeClasses[size], className)}>
      {children}
    </As>
  );
}
