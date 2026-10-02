import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { WordHero } from "@/components/hero/WordHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — AH Growth",
  description: "Get in touch with AH Growth to start your next project.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <WordHero
        title="Contact Us"
        image={{
          src: "/assets/images/contact/contact-hero-cottonbro.jpg",
          alt: "Empty office desks with computers and chairs",
          titleAlign: "center",
        }}
      />

      {/* Contact Form */}
      <section className="py-section">
        <Container>
          <div className="mx-auto w-full max-w-5xl">
            <ContactForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
