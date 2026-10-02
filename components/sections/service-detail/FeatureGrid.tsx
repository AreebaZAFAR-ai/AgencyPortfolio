import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal } from "@/components/animations";

interface FeatureGridProps {
  features: { title: string; description: string }[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className="border-t border-border-subtle bg-surface py-section">
      <Container>
        <SectionTitle
          eyebrow="Features"
          title="What's included."
          size="h3"
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              as="div"
              delay={index * 0.06}
              className="flex flex-col gap-2 border-b border-border-subtle pb-8"
            >
              <h3 className="font-display text-body-lg text-text-primary">
                {feature.title}
              </h3>

              <p className="text-small text-text-secondary">
                {feature.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
