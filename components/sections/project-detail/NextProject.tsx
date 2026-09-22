import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { Project } from "@/data/types";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/animations";

interface NextProjectProps {
  project: Project;
}

export function NextProject({ project }: NextProjectProps) {
  return (
    <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <ScrollReveal as="div" y={24}>
          <Link
            href={`/work/${project.slug}`}
            data-cursor="hover"
            className="group flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="flex flex-col gap-3">
              <span className="type-eyebrow text-ah-muted">Next Project</span>
              <span className="font-heading text-display text-ah-ink">{project.name}</span>
            </div>
            <ArrowUpRightIcon className="h-8 w-8 text-ah-ink transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
