"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { useArrowMarquee } from "@/lib/use-arrow-marquee";
import { MarqueeArrows } from "@/components/common/MarqueeArrows";
import { services } from "@/data/services";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { visualThemeIcon } from "@/components/sections/visual-theme";

const loopedServices = [...services, ...services];

export function ServicesStrip() {
  const { trackRef, scrollBy, hoverHandlers } = useArrowMarquee(services.length, 36, 1);

  return (
    <section className="py-section">
      <Container>
        <SectionTitle title="AH GROWTH SERVICE" size="h2" align="center" className="mb-(--space-2xl)" />
      </Container>

      <div className="overflow-hidden py-(--space-xl)" {...hoverHandlers}>
        <div ref={trackRef} className="flex w-max items-center gap-(--space-lg) will-change-transform">
          {loopedServices.map((service, index) => {
            const Icon = visualThemeIcon[service.visualTheme];
            const cardImage = service.cardImage ?? service.image;
            return (
              <Link
                key={`${service.slug}-${index}`}
                href={`/services/${service.slug}`}
                data-cursor="hover"
                aria-label={`View ${service.name} service`}
                className="group/card relative z-0 w-[260px] shrink-0 overflow-hidden rounded-2xl bg-surface transition-transform duration-500 ease-out hover:z-10 hover:-translate-y-2 hover:scale-[1.04] sm:w-[300px] lg:w-[320px]"
              >
                <div className="relative aspect-[4/5] w-full">
                  {cardImage ? (
                    <Image
                      src={cardImage}
                      alt={service.name}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 260px"
                      className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-110"
                    />
                  ) : (
                    <PlaceholderMedia
                      aspect="square"
                      icon={Icon}
                      reveal={false}
                      className="absolute inset-0 h-full w-full rounded-none border-0"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-(--space-xs) p-(--space-lg)">
                    <span className="type-eyebrow text-text-muted">{service.index}</span>
                    <h3 className="font-display text-h3 text-text-primary">{service.name}</h3>
                  </div>

                  <ArrowUpRightIcon className="absolute right-(--space-lg) top-(--space-lg) size-5 -translate-y-1 text-text-primary opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <MarqueeArrows onScroll={scrollBy} label="services" className="mt-(--space-lg)" />
    </section>
  );
}
