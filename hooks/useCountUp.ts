"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { parseStatValue, type ParsedStat } from "@/lib/parse-stat-value";
import { prefersReducedMotion } from "@/lib/motion-prefs";

function formatValue(parsed: ParsedStat, current: number) {
  const { prefix, decimals, useComma, suffix } = parsed;
  const numberText = useComma
    ? current.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : current.toFixed(decimals);
  return `${prefix}${numberText}${suffix}`;
}

export function useCountUp(value: string, options?: { duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed) return;

    const el = ref.current;
    if (!el) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: parsed.target,
        duration: reduced ? 0 : options?.duration ?? 1.6,
        ease: "power3.out",
        scrollTrigger: reduced
          ? undefined
          : {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
        onUpdate: () => setDisplay(formatValue(parsed, proxy.val)),
      });
    }, el);

    return () => ctx.revert();
  }, [parsed, options?.duration]);

  return { ref, display };
}
