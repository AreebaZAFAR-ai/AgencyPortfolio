import { technologies } from "@/data/technologies";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/animations";

export function TechStrip() {
  return (
    <section className="flex min-h-[140px] items-center overflow-hidden bg-ah-surface py-8 md:min-h-[180px] md:py-10">
      <Container>
        <ScrollReveal as="div" y={12} className="group w-full overflow-hidden">
          <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-10 group-hover:[animation-play-state:paused] md:gap-12">
            {[...technologies, ...technologies].map((tech, index) => (
              <span
                key={`${tech.name}-${index}`}
                className="shrink-0 text-project-title text-ah-muted transition-transform duration-200 hover:scale-110"
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