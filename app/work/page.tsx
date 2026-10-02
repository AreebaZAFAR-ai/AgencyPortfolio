import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { WordHero } from "@/components/hero/WordHero";
import { WorkShowcase } from "@/components/sections/work/WorkShowcase";
import { TrustCounters } from "@/components/sections/home/TrustCounters";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CtaBanner } from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "Work — AH Growth",
  description: "Case studies from AH Growth's recent client engagements.",
};

export default function WorkPage() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <>
      <WordHero
        title="WORK"
        image={{
          src: "/assets/images/work/hero/work-hero.jpg",
          alt: "Minimal designer desk with a monitor, plant and yellow mug",
          titleAlign: "center",
        }}
      />

      <TrustCounters />

      <section className="py-section">
        <Container size="wide">
          <div className="mb-(--space-3xl) flex flex-col items-center gap-(--space-lg) text-center md:mb-(--space-3xl)">
            <SectionTitle
              eyebrow={`${sorted.length} Selected Projects`}
              title="Every site, live and shipped"
              description="Hover a project to watch it scroll top to bottom, right inside the card. Click through for a live, interactive preview."
              size="h2"
              align="center"
            />
          </div>

          <WorkShowcase projects={sorted} />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
