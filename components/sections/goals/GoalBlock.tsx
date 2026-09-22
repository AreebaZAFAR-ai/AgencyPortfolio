import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";
import type { GoalItem } from "@/data/types";
import { cn } from "@/lib/utils";

interface GoalBlockProps {
  goal: GoalItem;
  reversed?: boolean;
}

export function GoalBlock({ goal, reversed }: GoalBlockProps) {
  return (
    <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <ScrollReveal
          as="div"
          className={cn("grid items-center gap-10 lg:grid-cols-2", reversed && "lg:[&>*:first-child]:order-2")}
        >
          <SectionTitle eyebrow={goal.eyebrow} title={goal.title} size="display" />
          <p className="text-body-lg text-ah-muted">{goal.description}</p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
