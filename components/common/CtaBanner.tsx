import { ArrowUpRightIcon } from "lucide-react";
import { Container } from "./Container";
import { SectionTitle } from "./SectionTitle";
import { Button } from "./Button";
import { ScrollReveal, MagneticButton } from "@/components/animations";

interface CtaBannerProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CtaBanner({
  eyebrow,
  title = "Let's build something worth talking about.",
  description = "Tell us about your product, timeline, and goals we'll follow up within one business day",
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
}: CtaBannerProps) {
  return (
    <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <ScrollReveal as="div" className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle eyebrow={eyebrow} title={title} description={description} size="display" />
          <MagneticButton className="shrink-0">
            <Button href={ctaHref} size="lg" icon={<ArrowUpRightIcon className="h-4 w-4" />}>
              {ctaLabel}
            </Button>
          </MagneticButton>
        </ScrollReveal>
      </Container>
    </section>
  );
}
