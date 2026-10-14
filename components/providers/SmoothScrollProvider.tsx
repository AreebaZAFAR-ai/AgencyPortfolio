"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      // Smooth touch scrolling too, so phones get the same eased,
      // inertial feel as desktop instead of plain native scroll.
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Lenis measures <html>, which is h-full and so never resizes -- after a
    // client-side navigation it kept the previous page's height and stopped
    // touch scrolling short of the end. <body> grows with the content, so
    // re-measure whenever it changes size.
    const bodyObserver = new ResizeObserver(() => lenis.resize());
    bodyObserver.observe(document.body);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      bodyObserver.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis keeps its own scroll position, which overrides Next's scroll-to-top
  // on navigation. Start every new page at the top (unless linking to an anchor).
  useEffect(() => {
    lenisRef.current?.resize();
    if (window.location.hash) return;
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
