import { videoTestimonials } from "@/data/testimonials";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { ScrollReveal } from "@/components/animations";

export function VideoTestimonials() {
  return (
    <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <SectionTitle eyebrow="Video" title="Hear it from our clients." size="display" className="mb-12" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {videoTestimonials.map((video, index) => (
            <ScrollReveal key={video.name} as="div" delay={index * 0.08} className="flex flex-col gap-4">
              <PlaceholderMedia variant="video" aspect="portrait" label={`${video.name} — ${video.company}`} />
              <div>
                <span className="block text-project-title text-ah-ink">{video.name}</span>
                <span className="text-body-sm text-ah-muted">
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
