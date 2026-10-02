import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ImageReveal, Parallax, StaggerReveal } from "@/components/animations";
import { cn } from "@/lib/utils";
import { Eyebrow, serif } from "./detail-ui";

interface ServiceCtaProps {
  image: { src: string; alt: string };
}

// Centered closing invitation on the dark panel, resting on an arch photo
// that runs straight into the footer.
export function ServiceCta({ image }: ServiceCtaProps) {
  return (
    <section className="overflow-hidden border-t border-border-subtle bg-text-primary pt-section pb-16 text-background  md:pb-24">
      <Container size="narrow">
        <StaggerReveal className="flex flex-col items-center gap-6 text-center">
          <Eyebrow className="text-background">Get started now</Eyebrow>
          <h2 className={cn(serif, "text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] tracking-[-0.015em]")}>
            Let&rsquo;s talk about
            <br />
            your project
          </h2>
          <p className="max-w-sm text-small text-background">
            Tell us where you are, where you want to be and what&rsquo;s in the way. We&rsquo;ll follow up within one
            business day.
          </p>
          <Link
            href="/contact"
            data-cursor="hover"
            className="group mt-2 flex w-64 items-center justify-between border-b border-border-subtle pb-3 text-small transition-colors hover:border-border-subtle"
          >
            Let&rsquo;s get started
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </StaggerReveal>

        <div className="mx-auto mt-16 w-[min(70vw,320px)] md:mt-20">
          <ImageReveal className="relative aspect-3/4 rounded-t-full">
            <Parallax speed={0.06} className="absolute inset-x-0 -top-[6%] -bottom-[6%]">
              <Image src={image.src} alt={image.alt} fill sizes="320px" className="object-cover" />
            </Parallax>
          </ImageReveal>
        </div>
      </Container>
    </section>
  );
}
