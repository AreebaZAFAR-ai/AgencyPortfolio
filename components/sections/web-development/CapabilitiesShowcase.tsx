"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface Capability {
  title: string;
  description: string;
}

interface CapabilitiesShowcaseProps {
  capabilities: Capability[];
}

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface PanelState {
  opacity: number;
  y: number;
  scale: number;
}

// Every panel's visual state is a function of its distance from the active
// panel -- one rule drives all six transitions instead of six hand-tuned ones.
function getPanelState(distance: number): PanelState {
  if (distance === 0) return { opacity: 1, y: 0, scale: 1 };
  if (distance === -1) return { opacity: 0.15, y: -56, scale: 0.92 };
  if (distance === 1) return { opacity: 0.25, y: 56, scale: 0.94 };
  return { opacity: 0, y: distance < 0 ? -90 : 90, scale: 0.88 };
}

// Small holds at both ends so the pin doesn't feel rushed on entry/exit.
const START = 0.06;
const END = 0.94;

export function CapabilitiesShowcase({ capabilities }: CapabilitiesShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    const panels = panelRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!section || panels.length !== capabilities.length) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pin/scrub only kicks in from tablet up; mobile renders the plain
      // stacked list below instead (see JSX) -- no ScrollTrigger at all there.
      mm.add({ isPinnable: "(min-width: 768px)" }, (context) => {
        const { isPinnable } = context.conditions as { isPinnable: boolean };
        if (!isPinnable) return undefined;

        panels.forEach((panel, index) => {
          const state = getPanelState(index);
          gsap.set(panel, state);
        });
        setActiveIndex(0);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * capabilities.length}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        capabilities.forEach((_, index) => {
          if (index === 0) return;

          const progress = START + (index / (capabilities.length - 1)) * (END - START);

          timeline.call(
            () => {
              setActiveIndex(index);

              [index - 1, index, index + 1].forEach((i) => {
                if (i < 0 || i >= panels.length) return;
                const state = getPanelState(i - index);
                gsap.to(panels[i], {
                  ...state,
                  duration: 0.6,
                  ease: i === index ? "power3.out" : "power2.inOut",
                  overwrite: true,
                });
              });
            },
            [],
            progress
          );
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion, capabilities]);

  return (
    <section ref={sectionRef} className="relative border-t border-ah-muted/10">
      <Container className="py-section-sm md:py-section">
        <SectionTitle eyebrow="What We Build" title="Built for the way your business works." size="display" />
      </Container>

      {reduceMotion ? (
        <Container className="pb-section-sm md:pb-section">
          <CapabilityList capabilities={capabilities} />
        </Container>
      ) : (
        <>
          {/* Desktop/tablet: pinned, scroll-scrubbed stage */}
          <div className="hidden md:block">
            <div className="relative h-screen overflow-hidden">
              <Container className="relative flex h-full flex-col justify-center">
                {capabilities.map((capability, index) => (
                  <div
                    key={capability.title}
                    ref={(el) => {
                      panelRefs.current[index] = el;
                    }}
                    className={cn("absolute inset-x-0", index === 0 ? "opacity-100" : "opacity-0")}
                  >
                    <span className="font-heading text-hero text-ah-muted/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 max-w-3xl font-heading text-display text-ah-ink">{capability.title}</h3>
                    <p className="mt-6 max-w-lg text-body-lg text-ah-muted">{capability.description}</p>
                  </div>
                ))}
              </Container>

              <div className="type-eyebrow absolute bottom-10 right-6 text-ah-muted md:right-10 xl:right-16">
                {String(activeIndex + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* Mobile: no pin, plain scroll */}
          <Container className="pb-section-sm md:hidden">
            <CapabilityList capabilities={capabilities} />
          </Container>
        </>
      )}
    </section>
  );
}

function CapabilityList({ capabilities }: { capabilities: Capability[] }) {
  return (
    <div className="flex flex-col">
      {capabilities.map((capability, index) => (
        <ScrollReveal
          key={capability.title}
          as="div"
          delay={index * 0.06}
          className="flex flex-col gap-2 border-t border-ah-muted/10 py-8 md:flex-row md:items-baseline md:gap-10"
        >
          <span className="font-heading text-h2 text-ah-muted md:w-20">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-heading text-section-md text-ah-ink">{capability.title}</h3>
            <p className="mt-2 max-w-lg text-body-lg text-ah-muted">{capability.description}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
