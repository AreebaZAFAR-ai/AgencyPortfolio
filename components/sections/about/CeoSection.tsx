import Image from "next/image";
import { leadership } from "@/data/team";
import { Container } from "@/components/common/Container";
import { ImageReveal, Parallax, StaggerReveal } from "@/components/animations";

export function CeoSection() {
  const ceo = leadership[0];

  return (
    <section className="py-section">
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
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-[28px] border border-border-subtle bg-surface">
                <span className="font-display text-[clamp(4rem,10vw,8rem)] leading-none text-text-primary">
                  {ceo.initials}
                </span>
                <span className="type-eyebrow text-text-muted">Portrait coming soon</span>
              </div>
            )}
          </ImageReveal>

          <StaggerReveal className="flex flex-col gap-8 md:gap-10">
            <span className="type-eyebrow text-text-muted">From the CEO</span>

            {ceo.quote && (
              <blockquote className="font-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.25] tracking-[-0.015em] text-text-primary">
                &ldquo;{ceo.quote}&rdquo;
              </blockquote>
            )}

            <div className="flex flex-col gap-1 border-t border-border-subtle pt-6">
              <span className="font-display text-h3 text-text-primary">{ceo.name}</span>
              <span className="type-eyebrow text-text-muted">{ceo.role}</span>
            </div>
          </StaggerReveal>
        </div>
      </Container>
    </section>
  );
}
