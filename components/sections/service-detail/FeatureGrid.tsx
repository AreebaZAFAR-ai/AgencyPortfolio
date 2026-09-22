import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";

interface FeatureGridProps {
  features: { title: string; description: string }[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className="border-t border-ah-muted/10 bg-ah-surface py-section-sm md:py-section">
      <Container>
        <SectionTitle
          eyebrow="Features"
          title="What's included."
          size="h1"
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              as="div"
              delay={index * 0.06}
              className="flex flex-col gap-2 border-b border-ah-muted/10 pb-8"
            >
              <h3 className="font-heading text-project-title text-ah-ink">
                {feature.title}
              </h3>

              <p className="text-body-sm text-ah-muted">
                {feature.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
