
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
    <section className="border-t border-border-subtle bg-surface py-section">
      <Container>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          size="h3"
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.step}
              as="div"
              delay={index * 0.06}
              className="flex flex-col gap-3 border-t border-border-subtle pt-6"
            >
              <span className="font-display text-h3 text-text-secondary">
                {step.step}
              </span>

              <h3 className="font-display text-body-lg text-text-primary">
                {step.title}
              </h3>

              <p className="text-small text-text-secondary">
                {step.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
