"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion-prefs";
import type { TeamMember } from "@/data/types";
import { TeamMemberCard } from "./TeamMemberCard";

// Seconds per member for one full pass -- keeps the speed
// (px/s) roughly constant as members are added or removed.
const SECONDS_PER_MEMBER = 4;

interface TeamMarqueeProps {
  members: TeamMember[];
}

export function TeamMarquee({ members }: TeamMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // Reduced motion: no auto-scroll; CSS turns the strip into a
    // natively scrollable row with the duplicate half hidden.
    if (prefersReducedMotion()) return;

    let inView = false;
    let dragging = false;
    let hovering = false;
    let startX = 0;
    let startProgress = 0;

    const ctx = gsap.context(() => {
      /*
       * The track holds the list twice, so moving it by exactly
       * half its width (-50%) lands on an identical frame -- the
       * repeat is invisible. Only transform animates.
       */
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: members.length * SECONDS_PER_MEMBER,
        ease: "none",
        repeat: -1,
        paused: true,
      });

      // Only spend frames while the strip is actually on screen.
      ScrollTrigger.create({
        trigger: viewport,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          inView = self.isActive;
          if (inView && !dragging) tween.play();
          else tween.pause();
        },
      });

      const wrapProgress = gsap.utils.wrap(0, 1);

      // Hover: ease the speed down to a stop rather than snapping.
      const onEnter = () => {
        hovering = true;
        gsap.to(tween, { timeScale: 0, duration: 0.4, ease: "power2.out", overwrite: true });
      };
      const onLeave = () => {
        hovering = false;
        gsap.to(tween, { timeScale: 1, duration: 0.6, ease: "power2.in", overwrite: true });
      };

      // Touch / pen: drag scrubs the loop directly. Vertical
      // gestures stay with the page (touch-action: pan-y).
      const onDown = (event: PointerEvent) => {
        if (event.pointerType === "mouse") return;
        dragging = true;
        startX = event.clientX;
        startProgress = tween.progress();
        tween.pause();
      };
      const onMove = (event: PointerEvent) => {
        if (!dragging) return;
        const halfWidth = track.scrollWidth / 2;
        if (!halfWidth) return;
        const delta = (event.clientX - startX) / halfWidth;
        tween.progress(wrapProgress(startProgress - delta));
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        if (inView) tween.play();
      };

      if (isFinePointer()) {
        viewport.addEventListener("pointerenter", onEnter);
        viewport.addEventListener("pointerleave", onLeave);
      }
      viewport.addEventListener("pointerdown", onDown);
      viewport.addEventListener("pointermove", onMove);
      viewport.addEventListener("pointerup", onUp);
      viewport.addEventListener("pointercancel", onUp);

      return () => {
        viewport.removeEventListener("pointerenter", onEnter);
        viewport.removeEventListener("pointerleave", onLeave);
        viewport.removeEventListener("pointerdown", onDown);
        viewport.removeEventListener("pointermove", onMove);
        viewport.removeEventListener("pointerup", onUp);
        viewport.removeEventListener("pointercancel", onUp);
        if (hovering) tween.timeScale(1);
      };
    }, viewport);

    return () => ctx.revert();
  }, [members.length]);

  return (
    <div
      ref={viewportRef}
      className="w-full touch-pan-y overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:touch-auto motion-reduce:overflow-x-auto motion-reduce:mask-none"
    >
      <div ref={trackRef} className="flex w-max select-none will-change-transform motion-reduce:will-change-auto">
        <ul className="flex shrink-0 gap-10 pr-10 motion-reduce:px-6 md:gap-16 md:pr-16">
          {members.map((member) => (
            <li key={member.name}>
              <TeamMemberCard member={member} />
            </li>
          ))}
        </ul>

        {/* Visual duplicate for the seamless loop -- hidden from assistive tech */}
        <ul aria-hidden="true" className="flex shrink-0 gap-10 pr-10 motion-reduce:hidden md:gap-16 md:pr-16">
          {members.map((member) => (
            <li key={member.name}>
              <TeamMemberCard member={member} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
