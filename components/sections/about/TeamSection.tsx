import { leadership, teamMembers } from "@/data/team";
import { Container } from "@/components/common/Container";
import { StaggerReveal } from "@/components/animations";
import { TeamMarquee } from "./TeamMarquee";

export function TeamSection() {
  return (
    <section className="overflow-hidden border-t border-ah-muted/10 pt-section-sm pb-section-sm md:pt-section">
      <Container>
        <StaggerReveal className="mb-16 flex flex-col items-center gap-5 text-center md:mb-24">
          <span className="type-eyebrow text-ah-muted">Our people</span>
          <h2 className="font-heading text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-ah-ink uppercase">
            Meet our team
          </h2>
          <p className="max-w-md text-body-lg text-ah-muted">
            The people behind the work.
          </p>
        </StaggerReveal>
      </Container>

      {/* Full-bleed: the strip runs edge to edge, outside the Container */}
      <TeamMarquee members={[...leadership, ...teamMembers]} />
    </section>
  );
}
