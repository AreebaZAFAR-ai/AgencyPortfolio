import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { Project } from "@/data/types";
import { Container } from "@/components/common/Container";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { Parallax, ScrollReveal } from "@/components/animations";
import { visualThemeIcon } from "@/components/sections/visual-theme";
import { cn } from "@/lib/utils";

interface CaseStudyBlockProps {
  project: Project;
  reversed?: boolean;
}

export function CaseStudyBlock({ project, reversed }: CaseStudyBlockProps) {
  const Icon = visualThemeIcon[project.visualTheme];

  return (
    <section className="border-b border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <div
          className={cn(
            "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
            reversed && "lg:[&>*:first-child]:order-2"
          )}
        >
          <Parallax speed={0.1} direction="up">
            <PlaceholderMedia aspect="video" label={project.name} icon={Icon} />
          </Parallax>

          <ScrollReveal as="div" className="flex flex-col gap-6">
            <span className="type-eyebrow text-ah-muted">
              {project.client}
            </span>
            <h3 className="font-heading text-h1 text-ah-ink">{project.name}</h3>
            <p className="max-w-lg text-body text-ah-muted">{project.summary}</p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <span className="type-eyebrow text-ah-muted">Challenge</span>
                <p className="mt-1 text-body-sm text-ah-ink/85">{project.challenge}</p>
              </div>
              <div>
                <span className="type-eyebrow text-ah-muted">Solution</span>
                <p className="mt-1 text-body-sm text-ah-ink/85">{project.solution}</p>
              </div>
              <div>
                <span className="type-eyebrow text-ah-muted">Result</span>
                <p className="mt-1 text-body-sm text-ah-ink/85">{project.results[0]?.label}: {project.results[0]?.value}</p>
              </div>
            </div>

            <Link
              href={`/work/${project.slug}`}
              data-cursor="hover"
              className="inline-flex w-fit items-center gap-2 text-button text-ah-ink hover:text-ah-muted"
            >
              View case study
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
