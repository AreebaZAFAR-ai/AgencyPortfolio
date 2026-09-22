"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
  tone?: "light" | "dark";
}

export function StatBlock({
  value,
  label,
  className,
  tone = "light",
}: StatBlockProps) {
  const { ref, display } = useCountUp(value);

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <span
        ref={ref}
        className={cn(
          "font-heading text-[3rem] leading-none tracking-[-0.04em] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5.25rem]",
           "text-ah-ink"
        )}
      >
        {display}
      </span>

      <span
        className={cn(
          "text-body-lg",
           "text-ah-muted"
        )}
      >
        {label}
      </span>
    </div>
  );
}