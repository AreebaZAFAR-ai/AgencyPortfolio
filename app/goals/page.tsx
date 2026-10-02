import type { Metadata } from "next";
import { goalItems, roadmapMilestones } from "@/data/goals";
import { PageHero } from "@/components/hero/PageHero";
import { GoalBlock } from "@/components/sections/goals/GoalBlock";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CtaBanner } from "@/components/common/CtaBanner";
import { ScrollReveal } from "@/components/animations";

export const metadata: Metadata = {
  title: "Goals — AH Growth",
  description: "The vision, goals, and roadmap driving AH Growth forward.",
};

export default function GoalsPage() {
  return (
    <>
      <PageHero
        label="Goals"
        heading="Where we're headed."
        description="Our goals span the business, our clients, and the technology we build with — all pointed at the same outcome: work worth being proud of."
        minHeightClass="min-h-[70dvh]"
      />
      {goalItems.map((goal, index) => (
        <GoalBlock key={goal.eyebrow} goal={goal} reversed={index % 2 === 1} />
      ))}
      <section className="border-t border-border-subtle py-section">
        <Container>
          <SectionTitle eyebrow="Future Roadmap" title="What's next." size="h2" className="mb-(--space-2xl)" />
          <ol className="flex flex-col">
            {roadmapMilestones.map((milestone, index) => (
              <ScrollReveal
                key={milestone}
                as="li"
                delay={index * 0.05}
                className="flex gap-(--space-lg) border-t border-border-subtle py-(--space-lg) text-body text-text-primary"
              >
                <span className="font-display text-h3 text-text-secondary">{String(index + 1).padStart(2, "0")}</span>
                {milestone}
              </ScrollReveal>
            ))}
          </ol>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
