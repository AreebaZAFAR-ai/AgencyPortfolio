import Image from "next/image";
import { Container } from "@/components/common/Container";
import { ImageReveal, Parallax, StaggerReveal } from "@/components/animations";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/types";
import { serif } from "./detail-ui";

interface ServiceIntroProps {
  service: Service;
  image: { src: string; alt: string };
}

// Oversized title, then the tagline beside an arch-topped photograph.
export function ServiceIntro({ service, image }: ServiceIntroProps) {
  return (
    <section className="overflow-hidden bg-background pt-16 pb-section md:pt-24 ">
      <Container>
        <StaggerReveal y={30}>
          <h1
            className={cn(
              serif,
              "mx-auto max-w-6xl bg-linear-to-b from-background/40 to-surface bg-clip-text pb-[0.08em] text-center text-[clamp(3rem,9.5vw,9.5rem)] leading-[0.88] tracking-[-0.025em] text-transparent uppercase"
            )}
          >
            {service.name}
          </h1>
        </StaggerReveal>

        <div className="mt-14 grid gap-12 md:mt-24 md:grid-cols-2 md:items-end lg:gap-20">
          <StaggerReveal className="flex flex-col gap-6 md:pb-4">
            <h2 className={cn(serif, "max-w-xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.015em] text-text-primary")}>
              {service.heroHeading}
            </h2>
            <p className="max-w-sm text-small text-text-secondary">{service.heroDescription}</p>
          </StaggerReveal>

          <ImageReveal className="relative aspect-5/4 w-full rounded-t-full md:max-w-[560px] md:justify-self-end">
            <Parallax speed={0.05} className="absolute inset-x-0 -top-[6%] -bottom-[6%]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </ImageReveal>
        </div>
      </Container>
    </section>
  );
}
