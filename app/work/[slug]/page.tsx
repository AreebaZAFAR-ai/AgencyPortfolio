import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAdjacentProject } from "@/data/projects";
import { PageHero } from "@/components/hero/PageHero";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { TechList } from "@/components/common/TechList";
import { ProjectNarrative } from "@/components/sections/project-detail/ProjectNarrative";
import { NextProject } from "@/components/sections/project-detail/NextProject";
import { visualThemeIcon } from "@/components/sections/visual-theme";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} — AH Growth`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getAdjacentProject(project.slug);

  return (
    <>
      <PageHero
        label={project.client}
        heading={project.name}
        description={project.summary}
        visual={<PlaceholderMedia aspect="square" label={project.name} icon={visualThemeIcon[project.visualTheme]} tone="accent" />}
        minHeightClass="min-h-[85dvh]"
      />
      <ProjectNarrative project={project} />
      <TechList technologies={project.technologies} title="Technology used." />
      <NextProject project={nextProject} />
    </>
  );
}
