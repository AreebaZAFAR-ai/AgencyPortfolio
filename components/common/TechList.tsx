import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";

interface TechListProps {
  technologies: string[];
  title?: string;
}

export function TechList({
  technologies,
  title = "Technology.",
}: TechListProps) {
  return (
    <section className="border-t border-border-subtle py-section">
      <Container>
        <SectionTitle
          eyebrow="Technology"
          title={title}
          size="h3"
          className="mb-(--space-2xl)"
        />

        <ScrollReveal as="div" className="flex flex-wrap gap-(--space-sm)">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border-subtle px-(--space-md) py-(--space-xs) text-small text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}