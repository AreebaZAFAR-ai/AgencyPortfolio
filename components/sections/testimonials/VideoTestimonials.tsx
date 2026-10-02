import { videoTestimonials } from "@/data/testimonials";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { ScrollReveal } from "@/components/animations";

export function VideoTestimonials() {
  return (
    <section className="border-t border-border-subtle py-section">
      <Container>
        <SectionTitle eyebrow="Video" title="Hear it from our clients." size="h2" className="mb-(--space-2xl)" />
        <div className="grid grid-cols-1 gap-(--space-xl) md:grid-cols-3">
          {videoTestimonials.map((video, index) => (
            <ScrollReveal key={video.name} as="div" delay={index * 0.08} className="flex flex-col gap-(--space-md)">
              <PlaceholderMedia variant="video" aspect="portrait" label={`${video.name} — ${video.company}`} />
              <div>
                <span className="block text-body-lg text-text-primary">{video.name}</span>
                <span className="text-small text-text-secondary">
                  {video.role}, {video.company}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
