"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

interface WordScrubProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Opacity of words that have not been reached yet. */
  from?: number;
}

/*
 * Words ink in one after another as the block scrolls through the
 * viewport -- tied to scroll position, so reading pace sets the reveal.
 */
export function WordScrub({ children, as: As = "p", className, from = 0.18 }: WordScrubProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      split = new SplitText(el, { type: "words" });
      if (!split.words.length) return;

      gsap.fromTo(
        split.words,
        { opacity: from },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [from]);

  return (
    <As ref={ref} className={className}>
      {children}
    </As>
  );
}
