"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cultureValues } from "@/data/team";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";

const VISIBLE_DEPTH = cultureValues.length - 1;
const STACK_OFFSET = 16;
const STACK_SCALE_STEP = 0.045;

export function ValuesDeck() {
  const [order, setOrder] = useState(() => cultureValues.map((_, index) => index));
  const [flips, setFlips] = useState<Record<number, number>>({});
  const reduceMotion = useReducedMotion();

  function flipFront() {
    const front = order[0];
    setOrder((current) => [...current.slice(1), current[0]]);
    setFlips((current) => ({ ...current, [front]: (current[front] ?? 0) + 1 }));
  }

  return (
    <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <SectionTitle
          eyebrow="Culture"
          title="What we hold ourselves to."
          description="Click the front card to flip through what drives the way we work."
          size="display"
          className="mb-14"
        />

        <ScrollReveal as="div" className="flex justify-center">
          <div className="relative h-[320px] w-full max-w-md [perspective:1400px] sm:h-[280px]">
            {order.map((valueIndex, stackPos) => {
              const value = cultureValues[valueIndex];
              const isFront = stackPos === 0;
              const depth = Math.min(stackPos, VISIBLE_DEPTH);
              const flipCount = flips[valueIndex] ?? 0;

              return (
                <motion.div
                  key={valueIndex}
                  role={isFront ? "button" : undefined}
                  tabIndex={isFront ? 0 : -1}
                  aria-label={isFront ? `${value.title} — click to see the next value` : undefined}
                  onClick={isFront ? flipFront : undefined}
                  onKeyDown={
                    isFront
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            flipFront();
                          }
                        }
                      : undefined
                  }
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between rounded-[28px] border border-ah-border bg-ah-ink p-8 outline-none [backface-visibility:hidden] focus-visible:ring-2 focus-visible:ring-ah-accent/60",
                    isFront ? "cursor-pointer" : "pointer-events-none"
                  )}
                  style={{ zIndex: cultureValues.length - stackPos }}
                  animate={{
                    y: depth * STACK_OFFSET,
                    scale: 1 - depth * STACK_SCALE_STEP,
                    opacity: stackPos <= VISIBLE_DEPTH ? 1 : 0,
                    rotateY: reduceMotion ? 0 : flipCount * 180,
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 260, damping: 26 }
                  }
                >
                  <span className="type-eyebrow text-ah-bg/60">
                    {String(stackPos + 1).padStart(2, "0")} / {String(cultureValues.length).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-h3 text-ah-bg">{value.title}</h3>
                    <p className="mt-3 max-w-sm text-body text-ah-bg/70">{value.description}</p>
                  </div>
                  {isFront && (
                    <span className="type-eyebrow text-ah-bg/50">Tap to flip</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
