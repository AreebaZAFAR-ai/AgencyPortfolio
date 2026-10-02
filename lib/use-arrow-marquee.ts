"use client";

import { useCallback, useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion-prefs";

/**
 * Continuously drifting row of duplicated items that arrow buttons can nudge.
 * The track must render the items twice in a row (`[...items, ...items]`).
 *
 * @param count       number of unique items (half the rendered children)
 * @param loopSeconds seconds to drift one full set
 * @param drift       -1 drifts left, 1 drifts right
 */
export function useArrowMarquee(count: number, loopSeconds: number, drift: -1 | 1) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  // Pixels still to travel from arrow clicks; eased in a little each frame.
  const nudgeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;

    const cards = track.children as HTMLCollectionOf<HTMLElement>;
    // Distance between a card and its duplicate = one seamless loop.
    const loopWidth = () => cards[count].offsetLeft - cards[0].offsetLeft;
    const speed = prefersReducedMotion() ? 0 : drift;

    let x = drift === 1 ? -loopWidth() : 0;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const loop = loopWidth();
      // Hidden or not laid out (e.g. while navigating away): skip, or the wrap loops below never end.
      if (loop <= 0) {
        frame = requestAnimationFrame(tick);
        return;
      }

      if (!pausedRef.current) x += (speed * dt * loop) / loopSeconds;
      const step = nudgeRef.current * 0.12;
      x += step;
      nudgeRef.current -= step;

      while (x > 0) x -= loop;
      while (x <= -loop) x += loop;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, loopSeconds, drift]);

  /** 1 shows the next card (row moves left), -1 the previous one. */
  const scrollBy = useCallback((direction: 1 | -1) => {
    const cards = trackRef.current?.children as HTMLCollectionOf<HTMLElement> | undefined;
    if (!cards || cards.length < 2) return;
    nudgeRef.current -= direction * (cards[1].offsetLeft - cards[0].offsetLeft);
  }, []);

  const hoverHandlers = {
    onMouseEnter: () => (pausedRef.current = true),
    onMouseLeave: () => (pausedRef.current = false),
  };

  return { trackRef, scrollBy, hoverHandlers };
}
