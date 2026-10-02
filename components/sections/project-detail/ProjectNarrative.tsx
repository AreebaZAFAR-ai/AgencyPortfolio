"use client";

import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";
import { useCountUp } from "@/hooks/useCountUp";
import type { Project } from "@/data/types";

interface ProjectNarrativeProps {
  project: Project;
}

function ResultValue({ value }: { value: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <span ref={ref} className="font-display text-h3 text-text-primary">
      {display}
    </span>
  );
}

const narrativeBlocks = [
  { key: "challenge", eyebrow: "Challenge", title: "Where we started." },
  { key: "solution", eyebrow: "Solution", title: "What we built." },
  { key: "designProcess", eyebrow: "Design Process", title: "How we got there." },
] as const;

export function ProjectNarrative({ project }: ProjectNarrativeProps) {
  return (
    <section className="py-section">
      <Container>
        <div className="grid grid-cols-1 gap-(--space-2xl) lg:grid-cols-[0.7fr_1.3fr]">
          <ScrollReveal as="div" className="flex flex-col gap-(--space-lg)">
            <span className="type-eyebrow text-text-muted">Client</span>
            <p className="text-body text-text-primary">{project.clientBlurb}</p>

            <div className="mt-(--space-lg) flex flex-col gap-(--space-xs)">
              <span className="type-eyebrow text-text-muted">Results</span>
              <div className="flex flex-col gap-(--space-sm)">
                {project.results.map((result) => (
                  <div key={result.label} className="flex items-baseline justify-between border-b border-border-subtle pb-(--space-xs)">
                    <span className="text-small text-text-secondary">{result.label}</span>
                    <ResultValue value={result.value} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-(--space-2xl)">
            {narrativeBlocks.map((block, index) => (
              <ScrollReveal key={block.key} as="div" delay={index * 0.1}>
                <SectionTitle eyebrow={block.eyebrow} title={block.title} size="h3" />
                {block.key === "designProcess" ? (
                  <ul className="mt-(--space-md) flex max-w-2xl flex-col gap-(--space-xs)">
                    {project.designProcess.map((step) => (
                      <li key={step} className="flex gap-(--space-sm) text-small text-text-primary">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted" />
                        {step}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-(--space-md) max-w-2xl text-body text-text-secondary">{project[block.key]}</p>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
