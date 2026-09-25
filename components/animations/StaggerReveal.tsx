"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

interface StaggerRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  stagger?: number;
  delay?: number;
}

/*
 * Reveals each direct child in sequence (eyebrow -> heading ->
 * copy -> CTA) off a single ScrollTrigger on the wrapper, so a
 * text block enters as one composed gesture instead of every
 * line firing on its own trigger.
 */
export function StaggerReveal({
  children,
  as: As = "div",
  className,
  y = 50,
  stagger = 0.12,
  delay = 0,
}: StaggerRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
          // Leaving a filter on settled text keeps it on its own
          // compositing layer for no benefit.
          clearProps: "filter",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, stagger, delay]);

  return (
    <As ref={ref} className={className}>
      {children}
    </As>
  );
}
