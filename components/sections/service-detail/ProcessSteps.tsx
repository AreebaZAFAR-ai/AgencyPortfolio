
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";
import type { ProcessStep } from "@/data/types";

interface ProcessStepsProps {
  steps: ProcessStep[];
  eyebrow?: string;
  title?: string;
}

export function ProcessSteps({
  steps,
  eyebrow = "Process",
  title = "How we work.",
}: ProcessStepsProps) {
  return (
    <section className="border-t border-ah-muted/10 bg-ah-surface py-section-sm md:py-section">
      <Container>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          size="h1"
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.step}
              as="div"
              delay={index * 0.06}
              className="flex flex-col gap-3 border-t border-ah-muted/20 pt-6"
            >
              <span className="font-heading text-h2 text-ah-muted">
                {step.step}
              </span>

              <h3 className="font-heading text-project-title text-ah-ink">
                {step.title}
              </h3>

              <p className="text-body-sm text-ah-muted">
                {step.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
