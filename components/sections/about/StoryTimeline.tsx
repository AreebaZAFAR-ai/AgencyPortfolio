import Image from "next/image";
import { companyTimeline } from "@/data/team";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ScrollReveal, ImageReveal } from "@/components/animations";

const storyImages = [
  "/assets/images/about/about1.jpg",
  "/assets/images/about/about2.jpg",
  "/assets/images/about/about3.jpg",
  "/assets/images/about/about4.jpg",
];

export function StoryTimeline() {
  return (
    <section className="border-t border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <SectionTitle
          eyebrow="Our Story"
          title={["How we got", "here."]}
          description="Every studio has a timeline. Ours runs from a two-person freelance build to a full-stack team shipping AI-native products."
          size="display"
          className="mb-14 md:mb-20"
        />

        <div className="flex flex-col gap-6 md:gap-8">
          {companyTimeline.map((item, index) => (
            <ScrollReveal key={item.year} as="div" delay={index * 0.08}>
              <div className="relative overflow-hidden rounded-[28px] bg-ah-ink p-6 sm:p-8 md:p-10 lg:p-12">
                {/* Mobile / tablet layout */}
                <div className="flex flex-col gap-6 md:hidden">
                  <div className="flex items-start justify-between">
                    <span className="type-eyebrow text-ah-bg/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="type-eyebrow text-ah-bg/70">
                      Studio Milestone
                    </span>
                  </div>

                  <ImageReveal className="relative aspect-4/5 w-full rounded-2xl">
                    <Image
                      src={storyImages[index % storyImages.length]}
                      alt={item.label}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </ImageReveal>

                  <div className="flex flex-col gap-3">
                    <h3 className="font-heading text-h3 text-ah-bg">{item.label}</h3>
                    <p className="max-w-sm text-body-sm text-ah-bg/70">{item.description}</p>
                  </div>

                  <span className="self-end font-heading text-h3 text-ah-bg">{item.year}</span>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:grid md:grid-cols-[1fr_minmax(240px,360px)_1fr] md:items-stretch md:gap-10 lg:gap-14">
                  <div className="flex flex-col justify-between py-2">
                    <span className="type-eyebrow text-ah-bg/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading text-h3 leading-tight text-ah-bg">{item.label}</h3>
                    <p className="max-w-[16rem] text-body-sm text-ah-bg/70">{item.description}</p>
                  </div>

                  <ImageReveal className="relative aspect-4/5 w-full rounded-2xl">
                    <Image
                      src={storyImages[index % storyImages.length]}
                      alt={item.label}
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="object-cover"
                    />
                  </ImageReveal>

                  <div className="flex flex-col items-end justify-between py-2 text-right">
                    <span className="type-eyebrow text-ah-bg/70">
                      Studio Milestone
                    </span>
                    <span className="font-heading text-h3 text-ah-bg">{item.year}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
