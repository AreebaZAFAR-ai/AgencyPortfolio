import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { projects } from "@/data/projects";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { WorkShowcase } from "@/components/sections/work/WorkShowcase";

const SLUGS = ["modisch", "fitlat", "solarlink", "cakespot", "noctra", "orelle", "aesthetic-clinic"];

export function ProjectGallery() {
  const cards = SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (project): project is (typeof projects)[number] => Boolean(project)
  );

  return (
    <section className="py-section">
      <Container size="wide">
        <div className="mb-(--space-2xl) flex flex-col items-center gap-(--space-lg) text-center">
          <SectionTitle eyebrow="Selected Work" title="Seven sites, live in the wild" size="h2" align="center" />
          <Link
            href="/work"
            data-cursor="hover"
            className="group inline-flex w-fit shrink-0 items-center gap-(--space-xs) text-small font-medium text-text-primary transition-colors hover:text-text-secondary"
          >
            View all work
            <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </Container>

      <WorkShowcase projects={cards} flip />
    </section>
  );
}
