"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

interface ScrollRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  x?: number;
  y?: number;
  threshold?: number;
  once?: boolean;
  delay?: number;
}

export function ScrollReveal({
  children,
  as: As = "div",
  className,
  x = 0,
  y = 32,
  threshold = 0.2,
  once = true,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: `top ${100 - threshold * 100}%`,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [x, y, threshold, once, delay]);

  return (
    <As ref={ref} className={className}>
      {children}
    </As>
  );
}
