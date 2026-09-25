"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
}

const CLIP_FROM: Record<RevealDirection, string> = {
  up: "inset(0% 0% 100% 0%)",
  down: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

export function ImageReveal({ children, className, direction = "up" }: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { clipPath: CLIP_FROM[direction], scale: 1.08 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, wrapper);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={wrapperRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} className="relative h-full w-full">
        {children}
      </div>
    </div>
  );
}
