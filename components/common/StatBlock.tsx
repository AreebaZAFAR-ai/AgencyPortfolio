"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
  tone?: "light" | "dark";
}

export function StatBlock({ value, label, className }: StatBlockProps) {
  const { ref, display } = useCountUp(value);

  return (
    <div className={cn("flex w-full flex-col gap-(--space-sm)", className)}>
      <span ref={ref} className="font-display text-h1 tabular-nums text-text-primary">
        {display}
      </span>
      <span className="text-body text-text-secondary">{label}</span>
    </div>
  );
}
