import Image from "next/image";
import { leadership } from "@/data/team";
import { Container } from "@/components/common/Container";
import { ImageReveal, Parallax, StaggerReveal } from "@/components/animations";

export function CeoSection() {
  const ceo = leadership[0];

  return (
    <section className="py-section-sm md:py-section">
      <Container>
        {/* Mirrors AboutIntro (image first) so the two sections alternate */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <ImageReveal className="relative aspect-4/5 w-full rounded-[28px] md:aspect-5/4 lg:aspect-4/5">
            {ceo.image ? (
              <Parallax speed={0.06} className="absolute inset-x-0 -top-[4%] -bottom-[12%]">
                <Image
                  src={ceo.image}
                  alt={`${ceo.name}, ${ceo.role}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-[28px] border border-ah-border bg-ah-ink/[0.04]">
                <span className="font-heading text-[clamp(4rem,10vw,8rem)] leading-none text-ah-ink/80">
                  {ceo.initials}
                </span>
                <span className="type-eyebrow text-ah-muted">Portrait coming soon</span>
              </div>
            )}
          </ImageReveal>

          <StaggerReveal className="flex flex-col gap-8 md:gap-10">
            <span className="type-eyebrow text-ah-muted">From the CEO</span>

            {ceo.quote && (
              <blockquote className="font-heading text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.25] tracking-[-0.015em] text-ah-ink">
                &ldquo;{ceo.quote}&rdquo;
              </blockquote>
            )}

            <div className="flex flex-col gap-1 border-t border-ah-border pt-6">
              <span className="font-heading text-h3 text-ah-ink">{ceo.name}</span>
              <span className="type-eyebrow text-ah-muted">{ceo.role}</span>
            </div>
          </StaggerReveal>
        </div>
      </Container>
    </section>
  );
}
