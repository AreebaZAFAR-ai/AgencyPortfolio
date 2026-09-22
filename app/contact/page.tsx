import type { Metadata } from "next";
import { siteInfo } from "@/data/nav";
import { WordHero } from "@/components/hero/WordHero";
import { Container } from "@/components/common/Container";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ScrollReveal } from "@/components/animations";

export const metadata: Metadata = {
  title: "Contact — AH Growth",
  description: "Get in touch with AH Growth to start your next project.",
};

export default function ContactPage() {
  return (
    <>
      <WordHero title="CONTACT" />
      <section className="py-section-sm md:py-section">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <ContactForm />

            <ScrollReveal as="div" delay={0.15} className="flex flex-col gap-10">
              <div>
                <span className="type-eyebrow text-ah-muted">Email</span>
                <a
                  href={`mailto:${siteInfo.email}`}
                  data-cursor="hover"
                  className="mt-2 block text-body-lg text-ah-ink hover:text-ah-muted"
                >
                  {siteInfo.email}
                </a>
              </div>
              <div>
                <span className="type-eyebrow text-ah-muted">Social</span>
                <div className="mt-2 flex flex-col gap-1">
                  {siteInfo.social.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="text-body-lg text-ah-ink hover:text-ah-muted"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
