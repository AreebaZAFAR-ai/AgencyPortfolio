"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { cn } from "@/lib/utils";
import type { ServiceProcessStepDetail } from "@/data/types";
import { Eyebrow, serif } from "./detail-ui";

interface ServiceStepsProps {
  serviceName: string;
  steps: ServiceProcessStepDetail[];
  stack: string[];
}

// Dark panel: a sticky photograph crossfades as each numbered step
// passes the middle of the viewport, with a progress rule alongside.
export function ServiceSteps({ serviceName, steps, stack }: ServiceStepsProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    const progress = progressRef.current;
    const items = itemRefs.current.slice(0, steps.length);
    if (!list || !progress || items.some((item) => !item)) return;

    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(index),
        });
      });

      if (!prefersReducedMotion()) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 55%", end: "bottom 55%", scrub: true },
          }
        );
      }
    }, list);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section className="bg-background">
      {/* Notched top edge: two pill ends meeting at a point */}
      <div aria-hidden="true" className="flex h-14 md:h-20">
        <div className="w-[22%] rounded-r-full bg-text-primary" />
        <div className="flex-1 rounded-l-full bg-text-primary" />
      </div>

      <div className="bg-text-primary pb-section text-background ">
        <Container>
          <div className="grid items-baseline gap-4 border-b border-border-subtle pt-10 pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:pt-16">
            <Eyebrow className="text-background">AH Growth</Eyebrow>
            <h2 className={cn(serif, "text-h2 md:pl-16 lg:pl-24")}>Our {serviceName} process</h2>
          </div>

          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
            {/* Sticky photograph (tablet up) */}
            <div className="relative hidden border-r border-border-subtle pr-8 md:block">
              <div className="sticky top-28 mt-12 aspect-4/5 overflow-hidden rounded-tr-[45%] bg-background">
                {steps.map((step, index) => (
                  <Image
                    key={step.number}
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="25vw"
                    aria-hidden={index !== active}
                    className={cn(
                      "object-cover transition-[opacity,scale] duration-700 ease-out",
                      index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                    )}
                  />
                ))}
              </div>
              <span
                ref={progressRef}
                aria-hidden="true"
                className="absolute top-0 -right-px h-full w-px origin-top bg-surface"
              />
            </div>

            <ol ref={listRef} className="md:pl-16 lg:pl-24">
              {steps.map((step, index) => (
                <li
                  key={step.number}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={cn(
                    "grid gap-5 border-b border-border-subtle py-12 transition-opacity duration-500 md:py-24 lg:grid-cols-[3rem_minmax(0,1fr)_auto] lg:gap-8",
                    index !== active && "md:opacity-35"
                  )}
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-tr-[3rem] md:hidden">
                    <Image src={step.image.src} alt={step.image.alt} fill sizes="100vw" className="object-cover" />
                  </div>

                  <span className="pt-3 text-small tabular-nums text-background">{step.number}</span>

                  <div>
                    <h3 className={cn(serif, "text-[clamp(2rem,3.5vw,3rem)] leading-[1.02]")}>{step.title}</h3>
                    <p className="mt-4 max-w-md text-small text-background">{step.description}</p>
                  </div>

                  <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-end lg:pt-3">
                    {step.meta.map((item) => (
                      <li
                        key={item}
                        className="w-fit rounded-full border border-border-subtle px-3 py-1 text-small text-background"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 flex flex-col gap-5 md:mt-24 md:flex-row md:items-baseline md:gap-12">
            <Eyebrow className="shrink-0 text-background">Tools we use</Eyebrow>
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {stack.map((tool, index) => (
                <li key={tool} className={cn(serif, "text-h3 text-background")}>
                  {tool}
                  {index < stack.length - 1 && <span className="pl-3 text-background">/</span>}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
