"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { StarIcon } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// One testimonial in the spotlight; the initials row underneath switches between them.
export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const testimonial = testimonials[active];

  return (
    <section id="testimonials" aria-label="Client testimonials" className="relative isolate overflow-hidden py-section">
      {/* Background photo, pushed almost to black so it reads as texture. */}
      <Image
        src="/assets/images/hero/main_hero.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-25 grayscale"
      />
      <div className="absolute inset-0 -z-10 bg-background/70" aria-hidden="true" />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-(--space-gutter) text-center">
        <div className="flex gap-1 text-rating" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="size-5 fill-current" strokeWidth={0} />
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
            className="mt-(--space-xl) flex flex-col items-center"
            aria-live="polite"
          >
            <blockquote className="max-w-3xl font-display text-h3 font-medium leading-tight text-text-primary">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-(--space-xl) flex flex-col items-center gap-(--space-xs)">
              <span className="text-body font-semibold text-text-primary">{testimonial.name}</span>
              <span className="text-small text-text-muted">
                {testimonial.role}, {testimonial.company}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <div role="tablist" aria-label="Choose a testimonial" className="mt-(--space-2xl) flex flex-wrap justify-center gap-(--space-sm)">
          {testimonials.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${item.name}, ${item.company}`}
                onClick={() => setActive(i)}
                data-cursor="hover"
                className={cn(
                  "flex size-12 items-center justify-center rounded-full border text-small font-semibold transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-highlight bg-highlight text-text-primary"
                    : "border-border-subtle bg-surface/40 text-text-muted hover:text-text-primary"
                )}
              >
                {initials(item.name)}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
