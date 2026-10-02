"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GaugeIcon,
  LayersIcon,
  LineChartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

// Generic icons for the feature row, used in order.
const FEATURE_ICONS = [TargetIcon, LineChartIcon, GaugeIcon, LayersIcon, SparklesIcon, ShieldCheckIcon];

// Share of the panel row taken by the active panel and by each upcoming strip.
const ACTIVE_WIDTH = 70;
const STRIP_WIDTH = 10;
const VISIBLE_STRIPS = 3;
// How long each service holds before the row advances on its own.
const AUTOPLAY_MS = 3500;

export function ServicesHero() {
  const [active, setActive] = useState(0);
  const count = services.length;
  const go = (step: number) => setActive((current) => (current + step + count) % count);
  const service = services[active];

  return (
    <section className="group/hero relative flex min-h-[calc(100svh-var(--header-height))] flex-col bg-background text-text-primary">
      {/* Panel row: active service wide, the next few as narrow strips */}
      <div className="relative flex h-[52svh] min-h-[320px] overflow-hidden">
        {services.map((s, i) => {
          // Position relative to the active panel; the previous one keeps sliding out to the left.
          const rel = (i - active + count) % count;
          const isActive = rel === 0;
          const isPrevious = rel === count - 1;
          const width = isActive ? ACTIVE_WIDTH : rel <= VISIBLE_STRIPS ? STRIP_WIDTH : 0;

          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => setActive(i)}
              tabIndex={width && !isActive ? 0 : -1}
              aria-label={isActive ? s.name : `Show ${s.name}`}
              aria-current={isActive || undefined}
              className="relative h-full shrink-0 overflow-hidden text-left transition-[width] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ width: `${width}%`, order: isPrevious ? -1 : rel }}
            >
              {/* Fixed-width layer so photo and title slide rather than squash as the panel resizes.
                  It rides the panel's left edge on the way in and its right edge on the way out,
                  so the outgoing panel exits off the left with its title clipped. */}
              <span
                className={cn("absolute inset-y-0", isPrevious ? "right-0" : "left-0")}
                style={{ width: `${ACTIVE_WIDTH}vw` }}
              >
                {s.image && (
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="70vw"
                    priority={i === 0}
                    className={cn(
                      "object-cover transition-[filter] duration-700",
                      isActive ? "brightness-[0.7]" : "brightness-[0.4] grayscale-[40%]"
                    )}
                  />
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

                {/* Full name appears where the strip was and travels left with the panel */}
                <span
                  className={cn(
                    "absolute bottom-(--space-xl) left-(--space-gutter) max-w-[calc(70vw-3rem)] font-display text-h3 font-bold uppercase whitespace-nowrap transition-opacity duration-300",
                    isActive || isPrevious ? "opacity-100" : "opacity-0"
                  )}
                >
                  {s.name}
                </span>
              </span>
              <span
                className={cn(
                  "absolute inset-x-0 bottom-(--space-xl) text-center font-display text-h3 font-bold uppercase transition-opacity",
                  isActive || isPrevious ? "opacity-0 duration-150" : "opacity-100 duration-500"
                )}
              >
                {s.name.charAt(0)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Features of the active service */}
      <Container className="relative flex flex-1 flex-col justify-between pb-(--space-xl) pt-(--space-2xl)">
        <ul key={service.slug} className="grid grid-cols-2 gap-x-(--space-lg) gap-y-(--space-xl) sm:grid-cols-3 lg:grid-cols-6">
          {service.features.slice(0, 6).map((feature, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <li
                key={feature.title}
                className="animate-[fade-up_0.6s_ease-out_both]"
                style={{ animationDelay: `${250 + i * 60}ms` }}
              >
                <Icon className="size-5 text-text-muted" strokeWidth={1.5} />
                <p className="mt-(--space-md) max-w-[180px] text-small font-medium text-text-secondary">{feature.title}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-(--space-2xl) flex items-center justify-between gap-(--space-lg)">
          <Link
            href={`/services/${service.slug}`}
            data-cursor="hover"
            className="type-eyebrow text-text-muted transition-colors hover:text-text-primary"
          >
            Explore {service.name} →
          </Link>
          <div className="flex items-center gap-(--space-md) text-small font-medium">
            <button type="button" onClick={() => go(-1)} data-cursor="hover" className="transition-colors hover:text-text-secondary">
              Prev
            </button>
            {/* Timer line: fills while the current service holds, then advances the row.
                Hover or focus pauses it; reduced motion turns autoplay off entirely. */}
            <span className="relative block h-px w-10 bg-border-subtle" aria-hidden="true">
              <span
                key={active}
                onAnimationEnd={() => go(1)}
                className="absolute inset-0 origin-left animate-[hero-progress_var(--hold)_linear_both] bg-text-primary group-focus-within/hero:[animation-play-state:paused] group-hover/hero:[animation-play-state:paused] motion-reduce:animate-none"
                style={{ "--hold": `${AUTOPLAY_MS}ms` } as CSSProperties}
              />
            </span>
            <button type="button" onClick={() => go(1)} data-cursor="hover" className="transition-colors hover:text-text-secondary">
              Next
            </button>
          </div>
        </div>

        <Link
          href="/contact"
          data-cursor="hover"
          className="type-eyebrow mt-(--space-lg) self-end text-text-muted transition-colors hover:text-text-primary"
        >
          Request a call
        </Link>
      </Container>
    </section>
  );
}
