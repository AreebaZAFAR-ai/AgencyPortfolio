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
    <span ref={ref} className="font-heading text-h3 text-ah-ink">
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
    <section className="py-section-sm md:py-section">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <ScrollReveal as="div" className="flex flex-col gap-6">
            <span className="type-eyebrow text-ah-muted">Client</span>
            <p className="text-body text-ah-ink">{project.clientBlurb}</p>

            <div className="mt-6 flex flex-col gap-2">
              <span className="type-eyebrow text-ah-muted">Results</span>
              <div className="flex flex-col gap-3">
                {project.results.map((result) => (
                  <div key={result.label} className="flex items-baseline justify-between border-b border-ah-muted/10 pb-2">
                    <span className="text-body-sm text-ah-muted">{result.label}</span>
                    <ResultValue value={result.value} />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-10">
            {narrativeBlocks.map((block, index) => (
              <ScrollReveal key={block.key} as="div" delay={index * 0.1}>
                <SectionTitle eyebrow={block.eyebrow} title={block.title} size="h2" />
                {block.key === "designProcess" ? (
                  <ul className="mt-4 flex max-w-2xl flex-col gap-2">
                    {project.designProcess.map((step) => (
                      <li key={step} className="flex gap-3 text-body-sm text-ah-ink/85">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ah-muted" />
                        {step}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 max-w-2xl text-body text-ah-muted">{project[block.key]}</p>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
