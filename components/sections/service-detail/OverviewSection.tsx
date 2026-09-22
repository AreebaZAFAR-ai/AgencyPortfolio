import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";

interface OverviewSectionProps {
  overview: string;
  problems: string[];
  solution: string;
}

export function OverviewSection({ overview, problems, solution }: OverviewSectionProps) {
  return (
    <section className="py-section-sm md:py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ScrollReveal as="div" className="flex flex-col gap-6">
            <SectionTitle eyebrow="Overview" title="What this service solves." size="h1" />
            <p className="max-w-lg text-body text-ah-muted">{overview}</p>
            <div className="mt-4 flex flex-col gap-3">
              <span className="type-eyebrow text-ah-muted">The problem</span>
              <ul className="flex flex-col gap-2">
                {problems.map((problem) => (
                  <li key={problem} className="flex gap-3 text-body-sm text-ah-ink/85">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ah-muted" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal
            as="div"
            delay={0.15}
            className="flex flex-col gap-4 border-l border-ah-muted/10 pl-8"
          >
            <span className="type-eyebrow text-ah-muted">Our solution</span>
            <p className="text-body-lg text-ah-ink">{solution}</p>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
