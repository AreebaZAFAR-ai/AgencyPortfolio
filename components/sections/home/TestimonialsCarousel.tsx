"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const rowCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const active = testimonials[activeIndex];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const mainCard = mainCardRef.current;
    const quote = quoteRef.current;
    const info = infoRef.current;
    const row = rowRef.current;

    if (!section || !stage || !mainCard || !quote || !info || !row) {
      return;
    }

    const cards = rowCardsRef.current.filter(
      (card): card is HTMLDivElement => card !== null
    );

    const ctx = gsap.context(() => {
      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(mainCard, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
      });

      gsap.set(quote, {
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
      });

      gsap.set(info, {
        opacity: 1,
        x: 0,
        y: 0,
      });

      gsap.set(row, {
        opacity: 0,
        y: 80,
        scale: 0.92,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 80,
        scale: 0.88,
        rotateY: 10,
        rotateZ: 0,
        transformOrigin: "center center",
      });

      /* =====================================================
         MAIN SCROLL TIMELINE

         10 VIEWPORT HEIGHTS:
         Gives every testimonial a lot of physical scroll
         distance.

         scrub: true:
         The animation follows the user's scroll directly.
         No automatic continuation.
      ===================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",

          // Long cinematic scroll duration
          end: () => `+=${window.innerHeight * 10}`,

          pin: true,

          // Direct user-controlled scrolling
          scrub: true,

          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         TESTIMONIAL TRANSITIONS

         Each card gets its own large section of the
         scroll timeline.

         Card 1
         ↓ lots of scrolling
         slow transition
         ↓ lots of scrolling
         Card 2
         ↓
         slow transition
         ↓
         Card 3
         ↓
         slow transition
         ↓
         Card 4
      ===================================================== */

      const testimonialStart = 0.08;
      const testimonialEnd = 0.58;

      testimonials.forEach((_, index) => {
        if (index === 0) return;

        const progress =
          testimonialStart +
          (index / (testimonials.length - 1)) *
            (testimonialEnd - testimonialStart);

        timeline.call(
          () => {
            setActiveIndex(index);

            /*
             * Slow flip/entrance of the new testimonial.
             */
            gsap.fromTo(
              [quote, info],
              {
                opacity: 0,
                y: 45,
                rotateX: -10,
                rotateY: 4,
              },
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 1.3,
                stagger: 0.12,
                ease: "power3.out",
                overwrite: true,
              }
            );
          },
          [],
          progress
        );
      });

      /* =====================================================
         HOLD AFTER FINAL TESTIMONIAL
      ===================================================== */

      timeline.to(
        {},
        {
          duration: 0.25,
        }
      );

      /* =====================================================
         LARGE CARD → ROW TRANSFORMATION
      ===================================================== */

      timeline.to(
        mainCard,
        {
          scale: 0.7,
          y: -70,
          opacity: 0,
          rotateX: 8,
          duration: 1.2,
          ease: "power2.inOut",
        },
        0.64
      );

      /* =====================================================
         QUOTE EXITS
      ===================================================== */

      timeline.to(
        quote,
        {
          opacity: 0,
          y: -45,
          rotateX: 10,
          duration: 0.9,
          ease: "power2.inOut",
        },
        0.64
      );

      /* =====================================================
         CLIENT INFO EXITS
      ===================================================== */

      timeline.to(
        info,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.67
      );

      /* =====================================================
         ROW APPEARS
      ===================================================== */

      timeline.to(
        row,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        0.73
      );

      /* =====================================================
         ROW CARDS ENTER ONE BY ONE
      ===================================================== */

      cards.forEach((card, index) => {
        const centerOffset =
          index - (cards.length - 1) / 2;

        timeline.to(
          card,
          {
            opacity: 1,
            y: centerOffset * -18,
            scale: 1,
            rotateY: 0,
            rotateZ: centerOffset * 1.2,
            duration: 1,
            ease: "power3.out",
          },
          0.74 + index * 0.055
        );

        /*
         * Settle each card.
         */
        timeline.to(
          card,
          {
            y: 0,
            rotateZ: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          0.90 + index * 0.02
        );
      });

      /* =====================================================
         FINAL ROW MOVEMENT
      ===================================================== */

      timeline.to(
        cards,
        {
          y: -8,
          duration: 0.5,
          stagger: {
            each: 0.06,
            from: "center",
          },
          ease: "power2.inOut",
        },
        0.96
      );

      timeline.to(
        cards,
        {
          y: 0,
          duration: 0.5,
          stagger: {
            each: 0.06,
            from: "center",
          },
          ease: "power2.out",
        },
        0.985
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =====================================================
     MANUAL ARROW CONTROLS
  ===================================================== */

  const goTo = (direction: 1 | -1) => {
    setActiveIndex((current) => {
      return (
        (current + direction + testimonials.length) %
        testimonials.length
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-ah-muted/10 bg-ah-bg"
    >
      <Container>
        <div className="w-full">

          {/* =================================================
             HEADER
          ================================================= */}

         <div className="mb-8 flex justify-center border-b border-ah-muted/10 pb-7 md:mb-10">
  <SectionTitle
    title="Words From Clients"
    size="h1"
    className="text-center"
  />
</div>

          {/* =================================================
             TESTIMONIAL STAGE
          ================================================= */}

          <div
            ref={stageRef}
            className="relative flex min-h-[54vh] items-center justify-center md:min-h-[58vh]"
            style={{
              perspective: "1400px",
            }}
          >

            {/* ===============================================
               LARGE TESTIMONIAL CARD
            =============================================== */}

            <div
              ref={mainCardRef}
              className={cn(
                "absolute inset-x-0 mx-auto min-h-[54vh] w-full max-w-[1050px] overflow-hidden rounded-[24px] md:min-h-[58vh]",
                activeIndex % 2 === 1
                  ? "bg-ah-ink text-ah-bg"
                  : "bg-ah-surface text-black"
              )}
              style={{
                transformStyle: "preserve-3d",
              }}
            >

              {/* Decorative quote */}

              <div
                className={cn(
                  "absolute left-7 top-2 font-heading text-[100px] font-semibold leading-none opacity-[0.07] md:left-12 md:text-[150px]",
                  activeIndex % 2 === 1
                    ? "text-ah-bg"
                    : "text-black"
                )}
              >
                “
              </div>

              {/* Counter */}

              <div className="absolute right-7 top-7 md:right-10 md:top-10">
                <span
                  className={cn(
                    "font-mono text-caption tracking-[0.08em]",
                    activeIndex % 2 === 1
                      ? "text-ah-bg/50"
                      : "text-black/50"
                  )}
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              {/* Card content */}

              <div className="flex min-h-[54vh] flex-col justify-between p-7 pt-28 sm:p-10 sm:pt-28 md:min-h-[58vh] md:p-14 md:pt-32 lg:p-16">

                <p
                  ref={quoteRef}
                  className="max-w-5xl font-heading text-[clamp(32px,4vw,58px)] font-semibold leading-[1.08] tracking-[-0.025em]"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  “{active.quote}”
                </p>

                <div
                  ref={infoRef}
                  className="flex flex-col gap-5 border-t border-current/15 pt-5 sm:flex-row sm:items-end sm:justify-between"
                >
                  <div>
                    <p className="text-project-title font-medium">
                      {active.name}
                    </p>

                    <p className="mt-1 text-body-sm opacity-55">
                      {active.role}
                    </p>
                  </div>

                  <p className="font-heading text-h3 font-semibold">
                    {active.company}
                  </p>
                </div>

              </div>
            </div>

            {/* ===============================================
               SMALL TESTIMONIAL ROW
            =============================================== */}

            <div
              ref={rowRef}
              className="absolute inset-x-0 flex w-full items-stretch justify-center gap-2 md:gap-3"
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  ref={(element) => {
                    rowCardsRef.current[index] = element;
                  }}
                  className={cn(
                    "flex min-h-[220px] flex-1 flex-col justify-between rounded-[18px] p-4 md:min-h-[270px] md:p-5",
                    index % 2 === 1
                      ? "bg-ah-ink text-ah-bg"
                      : "bg-ah-surface text-black"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >

                  <div>
                    <span className="font-mono text-[11px] opacity-45">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="mt-5 line-clamp-5 font-heading text-[16px] font-semibold leading-[1.2] tracking-[-0.015em] md:text-[18px]">
                      “{testimonial.quote}”
                    </p>
                  </div>

                  <div className="mt-5 border-t border-current/15 pt-4">
                    <p className="text-[14px] font-medium">
                      {testimonial.name}
                    </p>

                    <p className="mt-1 text-[12px] opacity-50">
                      {testimonial.role}
                    </p>

                    <p className="mt-1 text-[12px] opacity-50">
                      {testimonial.company}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* =================================================
             CONTROLS
          ================================================= */}

          <div className="mt-5 flex items-center justify-between">
            <p className="text-body-sm text-ah-muted">
              Scroll to explore perspectives
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(-1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ah-muted/20 transition hover:bg-ah-ink hover:text-ah-bg"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => goTo(1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ah-muted/20 transition hover:bg-ah-ink hover:text-ah-bg"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

        

        </div>
      </Container>
    </section>
  );
}