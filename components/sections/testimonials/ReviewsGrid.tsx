import { QuoteIcon } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/animations";

export function ReviewsGrid() {
  return (
    <section className="py-section">
      <Container>
        <div className="grid grid-cols-1 gap-(--space-xl) md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.name}
              as="div"
              delay={(index % 3) * 0.06}
              className="flex flex-col gap-(--space-lg) rounded-xl border border-border-subtle p-(--space-xl)"
            >
              <QuoteIcon className="h-6 w-6 text-text-secondary" />
              <p className="text-body text-text-primary">{testimonial.quote}</p>
              <div>
                <span className="block text-body-lg text-text-primary">{testimonial.name}</span>
                <span className="text-small text-text-secondary">
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
