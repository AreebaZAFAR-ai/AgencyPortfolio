import { technologies } from "@/data/technologies";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/animations";

export function TechStrip() {
  return (
    <section className="overflow-hidden bg-surface py-(--space-3xl)">
      <Container>
        <ScrollReveal as="div" y={12} className="group w-full overflow-hidden">
          <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-(--space-3xl) group-hover:[animation-play-state:paused]">
            {[...technologies, ...technologies].map((tech, index) => (
              <span
                key={`${tech.name}-${index}`}
                className="shrink-0 font-display text-h3 text-text-muted transition-colors duration-200 hover:text-text-primary"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
