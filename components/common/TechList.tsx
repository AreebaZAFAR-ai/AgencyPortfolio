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
    <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <SectionTitle
          eyebrow="Technology"
          title={title}
          size="h1"
          className="mb-10"
        />

        <ScrollReveal as="div" className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-ah-muted/25 px-4 py-2 text-sm text-ah-muted"
            >
              {tech}
            </span>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}