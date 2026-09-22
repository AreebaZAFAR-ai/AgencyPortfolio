
"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

interface TextRevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  splitBy?: "line" | "word" | "char";
  className?: string;
}

export function TextReveal({
  children,
  as: As = "span",
  delay = 0,
  stagger = 0.035,
  splitBy = "line",
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      const splitType =
        splitBy === "char"
          ? "chars"
          : splitBy === "word"
            ? "words"
            : "lines";

      split = new SplitText(el, {
        type: splitType,
        mask: "lines",
      });

      // Select only the targets requested by splitBy.
      const targets =
        splitBy === "char"
          ? split.chars
          : splitBy === "word"
            ? split.words
            : split.lines;

      // Prevent GSAP "target not found" errors when SplitText
      // produces no targets.
      if (!targets || targets.length === 0) {
        return;
      }

      gsap.from(targets, {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [splitBy, stagger, delay]);

  return (
    <As ref={ref} className={className}>
      {children}
    </As>
  );
}
