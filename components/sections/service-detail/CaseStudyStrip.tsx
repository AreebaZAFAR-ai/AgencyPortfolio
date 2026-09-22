import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { Project } from "@/data/types";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { ScrollReveal } from "@/components/animations";
import { visualThemeIcon } from "@/components/sections/visual-theme";

interface CaseStudyStripProps {
  projects: Project[];
}

export function CaseStudyStrip({ projects }: CaseStudyStripProps) {
  if (projects.length === 0) return null;

  return (
    <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <SectionTitle eyebrow="Case Studies" title="Related work." size="h1" className="mb-12" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ScrollReveal key={project.slug} as="div" delay={index * 0.08}>
              <Link href={`/work/${project.slug}`} data-cursor="hover" className="group flex flex-col gap-4">
                <PlaceholderMedia aspect="video" label={project.name} icon={visualThemeIcon[project.visualTheme]} />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-project-title text-ah-ink">{project.name}</h3>
                    <p className="text-body-sm text-ah-muted">{project.summary}</p>
                  </div>
                  <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-ah-ink transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
