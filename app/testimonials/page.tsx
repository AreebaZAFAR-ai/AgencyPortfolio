import type { Metadata } from "next";
import { WordHero } from "@/components/hero/WordHero";
import { ReviewsGrid } from "@/components/sections/testimonials/ReviewsGrid";
import { ClientLogos } from "@/components/sections/testimonials/ClientLogos";
import { VideoTestimonials } from "@/components/sections/testimonials/VideoTestimonials";
import { CtaBanner } from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "Testimonials — AH Growth",
  description: "What clients say about working with AH Growth.",
};

export default function TestimonialsPage() {
  return (
    <>
      <WordHero title="TESTIMONIALS" fontSize={6.5} maxWidthClass="max-w-4xl" />
      <ReviewsGrid />
      <ClientLogos />
      <VideoTestimonials />
      <CtaBanner />
    </>
  );
}
