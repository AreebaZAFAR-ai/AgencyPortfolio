import { clientLogos } from "@/data/testimonials";
import { Container } from "@/components/common/Container";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { ScrollReveal } from "@/components/animations";

export function ClientLogos() {
  return (
    <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {clientLogos.map((logo, index) => (
            <ScrollReveal key={logo.name} as="div" delay={index * 0.05}>
              <PlaceholderMedia variant="logo" aspect="video" label={logo.name} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
