import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { visualThemeIcon } from "@/components/sections/visual-theme";

const loopedServices = [...services, ...services];

export function ServicesStrip() {
  return (
    <section className="py-section-sm md:py-section">
      <Container>
        <SectionTitle title="AH GROWTH SERVICE" size="display" align="center" className="mb-16" />
      </Container>

      <div className="group/row overflow-hidden py-10">
        <div
          className="flex w-max animate-[marquee_36s_linear_infinite_reverse] items-center gap-6 motion-reduce:animate-none group-hover/row:[animation-play-state:paused] md:gap-8"
        >
          {loopedServices.map((service, index) => {
            const Icon = visualThemeIcon[service.visualTheme];
            return (
              <Link
                key={`${service.slug}-${index}`}
                href={`/services/${service.slug}`}
                data-cursor="hover"
                aria-label={`View ${service.name} service`}
                className="group/card relative z-0 w-[260px] shrink-0 overflow-hidden rounded-2xl border border-ah-muted/15 transition-transform duration-500 ease-out hover:z-10 hover:-translate-y-2 hover:scale-[1.08] sm:w-[300px] lg:w-[320px]"
              >
                <div className="relative aspect-[4/5] w-full">
                  {service.image ? (
                    <Image
                      src={service.image}
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                    <span className="type-eyebrow text-white/70">{service.index}</span>
                    <h3 className="font-heading text-project-title text-white">{service.name}</h3>
                  </div>

                  <ArrowUpRightIcon className="absolute right-4 top-4 h-5 w-5 -translate-y-1 text-white opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
