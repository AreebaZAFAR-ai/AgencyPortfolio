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
    <main className="w-full bg-ah-bg">
      {/* Hero */}
      <WordHero title="Contact Us" />

      {/* Contact Form */}
      <section className="px-5 pb-32 pt-16 md:px-8 md:pb-40 md:pt-24">
        <Container>
          <div className="mx-auto w-full max-w-5xl">
            <ContactForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
