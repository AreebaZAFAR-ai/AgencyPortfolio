"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface AboutCounterProps {
  value: string;
  label: string;
}

export function AboutCounter({ value, label }: AboutCounterProps) {
  const { ref, display } = useCountUp(value);

  return (
    <div className="flex flex-col items-center gap-(--space-sm) px-(--space-md) py-(--space-2xl) text-center md:py-(--space-md)">
      <span ref={ref} className="font-display text-h1 tabular-nums text-text-primary">
        {display}
      </span>
      <span className="type-eyebrow text-text-muted">{label}</span>
    </div>
  );
}
