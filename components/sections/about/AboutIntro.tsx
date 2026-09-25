import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { ImageReveal, Parallax, StaggerReveal } from "@/components/animations";

export function AboutIntro() {
  return (
    <section className="py-section-sm md:py-section">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <StaggerReveal className="flex flex-col items-start gap-6 md:gap-8">
            <span className="type-eyebrow text-ah-muted">Who we are</span>

            <h2 className="max-w-xl font-heading text-display text-ah-ink">
              AH GROWTH
            </h2>

            <p className="max-w-lg text-body-lg text-ah-muted">
              AH Growth is a digital product and technology partner. We work
              with businesses that have something worth building, and help
              them turn it into products that are useful, scalable, and
              genuinely good to use from the first sketch to launch and
              beyond.
            </p>

            <Button
              href="/work"
              variant="outline"
              icon={<ArrowUpRightIcon className="h-4 w-4" />}
            >
              See our work
            </Button>
          </StaggerReveal>

          <ImageReveal className="relative aspect-4/5 w-full rounded-[28px] md:aspect-5/4 lg:aspect-4/5">
            {/* Oversized layer gives the parallax room to travel without exposing an edge */}
            <Parallax speed={0.06} className="absolute inset-x-0 -top-[4%] -bottom-[12%]">
              <Image
                src="/assets/images/about/about1.jpg"
                alt="The AH Growth team at work in the studio"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </ImageReveal>
        </div>
      </Container>
    </section>
  );
}
