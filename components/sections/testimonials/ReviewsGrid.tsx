import { QuoteIcon } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/animations";

export function ReviewsGrid() {
  return (
    <section className="py-section-sm md:py-section">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.name}
              as="div"
              delay={(index % 3) * 0.06}
              className="flex flex-col gap-6 rounded-xl border border-ah-muted/15 p-8"
            >
              <QuoteIcon className="h-6 w-6 text-ah-muted" />
              <p className="text-body text-ah-ink/90">{testimonial.quote}</p>
              <div>
                <span className="block text-project-title text-ah-ink">{testimonial.name}</span>
                <span className="text-body-sm text-ah-muted">
                  {testimonial.role}, {testimonial.company}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
