import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/hero/PageHero";
import { OverviewSection } from "@/components/sections/service-detail/OverviewSection";
import { FeatureGrid } from "@/components/sections/service-detail/FeatureGrid";
import { TechList } from "@/components/common/TechList";
import { ProcessSteps } from "@/components/sections/service-detail/ProcessSteps";
import { CaseStudyStrip } from "@/components/sections/service-detail/CaseStudyStrip";
import { CtaBanner } from "@/components/common/CtaBanner";

export function generateStaticParams() {
  // "web-development" has its own bespoke static route at app/services/web-development/page.tsx,
  // which Next.js already prefers over this dynamic one for that exact path -- excluded here to
  // avoid generating a duplicate/colliding static page for the same slug at build time.
  return services
    .filter((service) => service.slug !== "web-development")
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} — AH Growth`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = projects.filter((project) =>
    service.relatedProjectSlugs.includes(project.slug)
  );

  return (
    <>
      <PageHero
        hideContent
        backgroundImage={{
          src: "/assets/images/services/service_bg.jpeg",
          alt: "",
          pixelated: true,
        }}
        minHeightClass="min-h-[85dvh]"
      />
      <OverviewSection overview={service.overview} problems={service.problems} solution={service.solution} />
      <FeatureGrid features={service.features} />
      <TechList technologies={service.technologies} />
      <ProcessSteps steps={service.process} />
      <CaseStudyStrip projects={relatedProjects} />
      <CtaBanner />
    </>
  );
}
