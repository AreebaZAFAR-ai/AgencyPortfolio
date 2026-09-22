import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { projects } from "@/data/projects";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { WorkShowcase } from "@/components/sections/work/WorkShowcase";

const SLUGS = ["modisch", "fitlat", "solarlink", "cakespot"];

export function ProjectGallery() {
  const cards = SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (project): project is (typeof projects)[number] => Boolean(project)
  );

  return (
    <section className="bg-ah-bg py-24 md:py-32">
      <Container size="wide">
        <div className="mb-14 flex flex-col items-center gap-6 text-center md:mb-20">
          <SectionTitle eyebrow="Selected Work" title="Four sites, live in the wild" size="display" align="center" />
          <Link
            href="/work"
            data-cursor="hover"
            className="group inline-flex w-fit shrink-0 items-center gap-2 text-button text-ah-ink hover:text-ah-muted"
          >
            View all work
            <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </Container>

      <div className="mt-2 md:mt-4">
        <WorkShowcase projects={cards} autoScroll />
      </div>
    </section>
  );
}
