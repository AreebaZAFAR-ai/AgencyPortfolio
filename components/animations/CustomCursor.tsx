"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion-prefs";

interface CustomCursorProps {
  enabled?: boolean;
}

export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled || !isFinePointer() || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-custom-active");
    setActive(true);

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const onMouseMove = (event: MouseEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const setState = (state: "default" | "hover") => {
      ring.dataset.state = state;
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("[data-cursor]") as HTMLElement | null;
      setState(interactive?.dataset.cursor === "hover" ? "hover" : "default");
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.classList.remove("cursor-custom-active");
      setActive(false);
    };
  }, [enabled]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        data-state="default"
        className="fixed top-0 left-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-ah-ink/50 transition-[width,height,margin] duration-200 data-[state=hover]:h-12 data-[state=hover]:w-12 data-[state=hover]:-ml-6 data-[state=hover]:-mt-6 data-[state=hover]:border-ah-ink"
      />
      <div ref={dotRef} className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-ah-ink" />
    </div>
  );
}
