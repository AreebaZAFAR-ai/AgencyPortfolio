import Image from "next/image";
import { leadership } from "@/data/team";
import { trustStats } from "@/data/trust-stats";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { ImageReveal, Parallax, StaggerReveal } from "@/components/animations";
import { cn } from "@/lib/utils";
import { AboutCounter } from "./AboutCounter";

export function EditorialAbout() {
  return (
    <div>
      {/* ---------- Hero: black panel, portrait straddles the seam ---------- */}
      <section className="relative bg-background pt-section text-text-primary">
        <Container>
          <StaggerReveal className="flex flex-col items-center gap-(--space-lg) text-center">
            <h1 className="font-display text-hero uppercase">About Us</h1>
            <p className="text-body-lg text-text-secondary">Meet the team behind AH Growth</p>
          </StaggerReveal>
        </Container>

        {/* Spacer pushes the portrait so half of it hangs over the surface section */}
        <div className="h-(--space-3xl)" />
        <div className="relative z-10 mx-auto -mb-40 w-[min(78vw,380px)] md:-mb-56">
          <ImageReveal className="relative aspect-4/5 w-full overflow-hidden rounded-xl">
            <Parallax speed={0.05} className="absolute inset-x-0 -top-[4%] -bottom-[10%]">
              <Image
                src="/assets/images/about/about1.jpg"
                alt="The AH Growth studio"
                fill
                priority
                sizes="380px"
                className="object-cover grayscale-[35%]"
              />
            </Parallax>
          </ImageReveal>
        </div>
      </section>

      {/* ---------- Story: surface panel ---------- */}
      <section className="bg-surface pt-72 pb-section text-text-primary md:pt-96">
        <Container size="narrow">
          <StaggerReveal className="flex flex-col items-center gap-(--space-xl) text-center">
            <span className="type-eyebrow text-text-muted">Digital growth shouldn&rsquo;t feel like guesswork</span>
            <h2 className="max-w-2xl font-display text-h2">
              We help ambitious brands spend less time <em>guessing</em> and more time doing what they{" "}
              <em>truly</em> love.
            </h2>
          </StaggerReveal>

          <StaggerReveal className="mx-auto mt-(--space-3xl) grid max-w-2xl grid-cols-1 gap-(--space-lg) text-body text-text-secondary md:grid-cols-2 md:gap-(--space-2xl)">
            <p>
              AH Growth began as a two-person studio with a simple belief: the agencies that design well and the
              agencies that build well shouldn&rsquo;t be two different companies.
            </p>
            <p>
              Today our designers, engineers and growth specialists work as one team &mdash; turning clear strategy
              into products that feel considered, perform, and last.
            </p>
          </StaggerReveal>
        </Container>

        {/* Counter strip */}
        <Container className="mt-section">
          <div className="grid grid-cols-2 border-y border-border-subtle md:grid-cols-4 md:py-(--space-2xl)">
            {trustStats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "border-border-subtle",
                  index % 2 === 1 && "border-l",
                  index < 2 && "border-b md:border-b-0",
                  index === 2 && "md:border-l"
                )}
              >
                <AboutCounter value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Team: black panel ---------- */}
      <section className="bg-background py-section text-text-primary">
        <Container>
          <div className="grid grid-cols-1 gap-(--space-3xl) lg:grid-cols-[1fr_2fr] lg:items-start">
            <StaggerReveal className="flex flex-col items-start gap-(--space-lg) lg:sticky lg:top-32">
              <h2 className="font-display text-h2">
                ABOUT US
                <br />
               
              </h2>
              <p className="max-w-xs text-body text-text-secondary">
                Senior people who plan, design and ship &mdash; and stay with you long after launch.
              </p>
              <Button href="/contact" variant="outline" className="mt-(--space-xs)">
                Work with us
              </Button>
            </StaggerReveal>

            {/* Typographic roster -- names carry the section, no portraits needed */}
            <StaggerReveal as="ul" stagger={0.15} className="border-t border-border-subtle">
              {leadership.map((member, index) => (
                <li
                  key={member.name}
                  className="group grid grid-cols-[auto_1fr] gap-x-(--space-lg) gap-y-(--space-sm) border-b border-border-subtle py-(--space-xl) md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-x-(--space-2xl) md:py-(--space-2xl)"
                >
                  <span className="font-display text-body-lg tabular-nums text-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-(--space-sm)">
                    <span className="font-display text-h2 transition-transform duration-500 group-hover:translate-x-2">
                      {member.name}
                    </span>
                    {member.bio && <p className="max-w-md text-body text-text-secondary">{member.bio}</p>}
                  </div>

                  <span className="col-start-2 w-fit rounded-full bg-surface px-(--space-sm) py-1 text-small text-text-secondary md:col-start-auto">
                    {member.role}
                  </span>
                </li>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
