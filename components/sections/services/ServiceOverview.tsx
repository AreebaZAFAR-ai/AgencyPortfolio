import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ImageReveal, StaggerReveal, WordScrub } from "@/components/animations";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/types";
import { Eyebrow, serif } from "./detail-ui";

interface ServiceOverviewProps {
  service: Service;
  image: { src: string; alt: string };
}

// Statement paragraph that inks in word by word on scroll, with a pill-shaped photo.
export function ServiceOverview({ service, image }: ServiceOverviewProps) {
  return (
    <section className="bg-background pb-section ">
      <Container>
        <Eyebrow className="text-text-secondary">Overview</Eyebrow>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-20">
          <WordScrub
            className={cn(serif, "max-w-4xl text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.15] tracking-[-0.01em] text-text-primary")}
          >
            {service.overview}
          </WordScrub>

          <ImageReveal direction="left" className="relative aspect-16/10 w-60 rounded-full lg:w-72">
            <Image src={image.src} alt={image.alt} fill sizes="288px" className="object-cover" />
          </ImageReveal>
        </div>

        <StaggerReveal className="mt-16 flex max-w-sm flex-col gap-6 md:mt-24 md:ml-auto">
          <p className="text-small text-text-secondary">{service.solution}</p>
          <Link
            href="/contact"
            data-cursor="hover"
            className="group flex items-center justify-between border-b border-border-subtle pb-3 text-small text-text-primary transition-colors hover:border-text-primary"
          >
            Start a project
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </StaggerReveal>
      </Container>
    </section>
  );
}
