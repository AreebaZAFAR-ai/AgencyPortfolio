"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cultureValues } from "@/data/team";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";

// Relative timeline units -- not pixels. Scrub maps scroll
// progress onto these proportionally, so only the ratio
// between HOLD (reading time) and FLIP (transition) matters.
const HOLD = 0.6;
const FLIP = 1;

export function ValuesFlip() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null
    );

    if (!section || cards.length < 2) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * Scroll-controlled flip only runs on desktop with motion
       * allowed -- mobile gets the static stacked list below
       * instead of scroll-jacking a small viewport.
       */
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(cards, { rotateY: 90, opacity: 0 });
          gsap.set(cards[0], { rotateY: 0, opacity: 1 });

          const segments = cards.length - 1;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () =>
                `+=${window.innerHeight * (cards.length + 1)}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const index = Math.min(
                  cards.length - 1,
                  Math.round(self.progress * segments)
                );

                setActiveIndex(index);
              },
            },
          });

          cards.forEach((card, index) => {
            if (index === cards.length - 1) return;

            const next = cards[index + 1];
            const start = index * (HOLD + FLIP) + HOLD;

            timeline
              .to(
                card,
                {
                  rotateY: -90,
                  opacity: 0,
                  duration: FLIP,
                  ease: "power2.inOut",
                },
                start
              )
              .to(
                next,
                {
                  rotateY: 0,
                  opacity: 1,
                  duration: FLIP,
                  ease: "power2.inOut",
                },
                start
              );
          });

          timeline.to({}, { duration: HOLD });

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-ah-muted/10 py-section-sm md:py-section"
    >
      <Container>
        <SectionTitle
          eyebrow="Our Structure"
          title="The teams that run AH Growth."
          description="Scroll to flip through the people and departments behind every engagement -- your scroll drives the flip, not a timer."
          size="display"
          className="mb-14 md:mb-20"
        />

        {/* Desktop: pinned, scroll-scrubbed flip */}
        <div className="relative mx-auto hidden w-full max-w-2xl lg:block">
          <div
            className="relative h-[420px] w-full [perspective:1600px]"
          >
            {cultureValues.map((value, index) => (
              <div
                key={value.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute inset-0 flex flex-col justify-between rounded-[28px] border border-ah-border bg-ah-ink p-10 [backface-visibility:hidden] lg:p-12"
              >
                <span className="type-eyebrow text-ah-bg/60">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(cultureValues.length).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-heading text-h1 text-ah-bg">
                    {value.title}
                  </h3>
                  <p className="mt-4 max-w-md text-body-lg text-ah-bg/70">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll-progress indicator */}
          <div className="mt-8 flex items-center gap-2">
            {cultureValues.map((value, index) => (
              <span
                key={value.title}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-ah-ink"
                    : "w-1.5 bg-ah-muted/30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Mobile / tablet: static stack, no scroll-jacking */}
        <div className="flex flex-col gap-6 lg:hidden">
          {cultureValues.map((value, index) => (
            <ScrollReveal
              key={value.title}
              as="div"
              delay={index * 0.08}
            >
              <div className="flex flex-col gap-3 rounded-[24px] border border-ah-border bg-ah-ink p-8">
                <span className="type-eyebrow text-ah-bg/60">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(cultureValues.length).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-h2 text-ah-bg">
                  {value.title}
                </h3>
                <p className="text-body text-ah-bg/70">
                  {value.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
