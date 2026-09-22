import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { WordHero } from "@/components/hero/WordHero";
import { WorkShowcase } from "@/components/sections/work/WorkShowcase";
import { Container } from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "Work — AH Growth",
  description: "Case studies from AH Growth's recent client engagements.",
};

export default function WorkPage() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <>
      <WordHero title="WORK" />
      <section className="py-20 md:py-32">
        <Container size="wide">
          <WorkShowcase projects={sorted} />
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
