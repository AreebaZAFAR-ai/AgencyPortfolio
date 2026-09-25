"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { ServiceProcessStepDetail } from "@/data/types";

interface ServiceProcessProps {
  steps: ServiceProcessStepDetail[];
  eyebrow?: string;
  title?: string | string[];
}

// Matches the sticky Header's h-20 -- the panel pins directly beneath it.
const HEADER_OFFSET = 80;

// Timeline units: every step holds for HOLD, then transitions over T.
// The whole timeline is scrubbed, so these are proportions of scroll
// distance rather than seconds.
const HOLD = 1;
const T = 0.6;
const LEAD_IN = HOLD * 0.5;

const MASK_CLOSED = "inset(100% 0% 0% 0%)";
const MASK_OPEN = "inset(0% 0% 0% 0%)";

export function ServiceProcess({
  steps,
  eyebrow = "How we work",
  title = ["A clear process.", "A better outcome."],
}: ServiceProcessProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotFillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fillRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = steps.length;

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const fill = fillRef.current;
    const texts = textRefs.current.slice(0, count);
    const masks = maskRefs.current.slice(0, count);
    const images = imageRefs.current.slice(0, count);
    const dots = dotRefs.current.slice(0, count);
    const dotFills = dotFillRefs.current.slice(0, count);
    const all = [...texts, ...masks, ...images, ...dots, ...dotFills];
    if (!pin || !fill || count < 2 || all.some((el) => !el)) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pinned, scroll-driven panel from tablet up. Mobile and reduced-motion
      // users get the stacked list instead (toggled purely in CSS below).
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const labelsFor = (i: number) =>
          gsap.utils.toArray<HTMLElement>(`[data-pipeline-label="${i}"]`, pin);

        // Initial state: step 01 visible, everything else waiting.
        gsap.set(texts, { autoAlpha: 0, y: 24 });
        gsap.set(texts[0], { autoAlpha: 1, y: 0 });
        gsap.set(masks, { clipPath: MASK_CLOSED });
        gsap.set(masks[0], { clipPath: MASK_OPEN });
        gsap.set(images, { scale: 1.08 });
        gsap.set(images[0], { scale: 1 });
        gsap.set(fill, { scaleX: 0 });
        gsap.set(dots, { scale: 1 });
        gsap.set(dots[0], { scale: 1.35 });
        gsap.set(dotFills, { scale: 0 });
        gsap.set(dotFills[0], { scale: 1 });
        steps.forEach((_, i) => gsap.set(labelsFor(i), { opacity: i === 0 ? 1 : 0.35 }));

        activeRef.current = 0;
        setActiveIndex(0);

        const transitionAt = (i: number) => LEAD_IN + i * (HOLD + T);

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pin,
            start: `top ${HEADER_OFFSET}px`,
            end: () => `+=${window.innerHeight * (count - 1) * 0.9}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: () => {
              // A step becomes "active" once its transition is half complete.
              const time = timeline.time();
              let index = 0;
              for (let i = 0; i < count - 1; i++) {
                if (time >= transitionAt(i) + T / 2) index = i + 1;
              }
              if (index !== activeRef.current) {
                activeRef.current = index;
                setActiveIndex(index);
              }
            },
          },
        });

        for (let i = 0; i < count - 1; i++) {
          const at = transitionAt(i);
          const next = i + 1;

          // Text: outgoing lifts and fades, incoming rises into place.
          timeline.to(texts[i], { autoAlpha: 0, y: -24, duration: T * 0.5, ease: "power2.in" }, at);
          timeline.fromTo(
            texts[next],
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: T * 0.6, ease: "power2.out" },
            at + T * 0.4
          );

          // Image: outgoing settles back slightly while the incoming one is
          // unmasked upward inside the same frame.
          timeline.to(images[i], { scale: 1.04, duration: T, ease: "power1.inOut" }, at);
          timeline.fromTo(
            masks[next],
            { clipPath: MASK_CLOSED },
            { clipPath: MASK_OPEN, duration: T, ease: "power2.inOut" },
            at
          );
          timeline.fromTo(images[next], { scale: 1.08 }, { scale: 1, duration: T, ease: "power2.out" }, at);

          // Pipeline: line advances to the next node, which fills and becomes active.
          timeline.to(fill, { scaleX: next / (count - 1), duration: T, ease: "power1.inOut" }, at);
          timeline.to(dots[i], { scale: 1, duration: T * 0.5 }, at + T * 0.5);
          timeline.to(dots[next], { scale: 1.35, duration: T * 0.5 }, at + T * 0.5);
          timeline.to(dotFills[next], { scale: 1, duration: T * 0.4, ease: "power2.out" }, at + T * 0.6);
          timeline.to(labelsFor(i), { opacity: 0.6, duration: T * 0.5 }, at);
          timeline.to(labelsFor(next), { opacity: 1, duration: T * 0.5 }, at + T * 0.5);
        }

        // Hold on the final step before the panel unpins.
        timeline.to({}, { duration: HOLD * 0.6 });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });
    }, pin);

    return () => ctx.revert();
  }, [steps, count]);

  const trackInset: CSSProperties = {
    left: `${50 / count}%`,
    right: `${50 / count}%`,
  };
  const columns: CSSProperties = { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` };

  return (
    <section className="relative border-t border-ah-muted/10">
      <Container className="pt-section-sm pb-12 md:pt-section md:pb-14">
        <SectionTitle eyebrow={eyebrow} title={title} size="display" />
      </Container>

      {/* ===================================================== */}
      {/* PINNED PANEL (tablet + desktop, motion allowed)       */}
      {/* ===================================================== */}
      <div ref={pinRef} className="hidden md:motion-safe:block">
        <Container className="flex h-[calc(100dvh-5rem)] flex-col justify-center gap-8 py-8 lg:gap-12 lg:py-10">
          <div className="grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* Text slot: all steps stacked in one grid cell so its height
                never changes between steps. */}
            <div className="grid">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className={cn(
                    "col-start-1 row-start-1 flex flex-col gap-5 self-center lg:gap-6",
                    i > 0 && "invisible opacity-0"
                  )}
                >
                  <span className="font-heading text-display tabular-nums text-ah-muted/30">
                    {step.number}
                  </span>
                  <h3 className="font-heading text-section-md text-ah-ink">{step.title}</h3>
                  <p className="max-w-md text-body-lg text-ah-muted/75">{step.description}</p>
                  <ul className="mt-2 flex max-w-md flex-wrap gap-x-6 gap-y-2 border-t border-ah-muted/15 pt-5">
                    {step.meta.map((item) => (
                      <li key={item} className="type-eyebrow text-ah-muted/60">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Image frame: fixed dimensions, only the layers inside change. */}
            <div className="relative h-[44vh] overflow-hidden rounded-xl border border-ah-muted/15 bg-ah-ink/5 lg:h-[56vh]">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    maskRefs.current[i] = el;
                  }}
                  className="absolute inset-0"
                  style={{ clipPath: i === 0 ? MASK_OPEN : MASK_CLOSED }}
                  aria-hidden={i !== activeIndex}
                >
                  <div
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline */}
          <div className="flex flex-col gap-3">
            <div className="grid" style={columns} aria-hidden="true">
              {steps.map((step, i) => (
                <span
                  key={step.number}
                  data-pipeline-label={i}
                  className={cn("type-eyebrow text-center tabular-nums text-ah-ink", i > 0 && "opacity-35")}
                >
                  {step.number}
                </span>
              ))}
            </div>

            <div className="relative">
              <span className="absolute top-[calc(50%-0.5px)] h-px bg-ah-muted/20" style={trackInset} />
              <span
                ref={fillRef}
                className="absolute top-[calc(50%-0.5px)] h-px origin-left bg-ah-ink"
                style={{ ...trackInset, transform: "scaleX(0)" }}
              />
              <ol aria-label="Process progress" className="relative grid h-4 items-center" style={columns}>
              {steps.map((step, i) => (
                <li
                  key={step.number}
                  aria-current={i === activeIndex ? "step" : undefined}
                  className="relative flex justify-center"
                >
                  <span className="sr-only">
                    {step.number} {step.title}
                  </span>
                  <span
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="relative block h-3 w-3 rounded-full border border-ah-muted/40 bg-ah-bg"
                    style={{ transform: `scale(${i === 0 ? 1.35 : 1})` }}
                  >
                    <span
                      ref={(el) => {
                        dotFillRefs.current[i] = el;
                      }}
                      className="absolute -inset-px rounded-full bg-ah-ink"
                      style={{ transform: `scale(${i === 0 ? 1 : 0})` }}
                    />
                  </span>
                </li>
              ))}
              </ol>
            </div>

            <div className="hidden lg:grid" style={columns} aria-hidden="true">
              {steps.map((step, i) => (
                <span
                  key={step.number}
                  data-pipeline-label={i}
                  className={cn("text-center text-body-sm text-ah-ink", i > 0 && "opacity-35")}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ===================================================== */}
      {/* STACKED LIST (mobile, or reduced motion at any size)  */}
      {/* ===================================================== */}
      <Container className="pb-section-sm md:motion-safe:hidden">
        <ol className="flex flex-col gap-16">
          {steps.map((step) => (
            <ScrollReveal
              key={step.number}
              as="li"
              className="grid gap-6 border-t border-ah-muted/15 pt-8 md:grid-cols-2 md:items-center md:gap-12"
            >
              <div className="flex flex-col gap-4">
                <span className="font-heading text-h1 tabular-nums text-ah-muted/40">{step.number}</span>
                <h3 className="font-heading text-section-md text-ah-ink">{step.title}</h3>
                <p className="text-body-lg text-ah-muted/75">{step.description}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                  {step.meta.map((item) => (
                    <li key={item} className="type-eyebrow text-ah-muted/60">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ah-muted/15 bg-ah-ink/5">
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
