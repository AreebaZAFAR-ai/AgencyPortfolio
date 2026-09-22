import { HomeHero } from "@/components/hero/HomeHero";
import { heroContent, heroVideo } from "@/data/hero";
import { TrustCounters } from "@/components/sections/home/TrustCounters";
import { TechStrip } from "@/components/sections/home/TechStrip";
import { ServicesStrip } from "@/components/sections/home/ServicesStrip";
import { ProjectGallery } from "@/components/sections/home/ProjectGallery";
import { TestimonialsCarousel } from "@/components/sections/home/TestimonialsCarousel";
import { CtaBanner } from "@/components/common/CtaBanner";

export default function Home() {
  return (
    <>
      <HomeHero content={heroContent} video={heroVideo} />
      <TrustCounters />
      <ServicesStrip />
      <TechStrip />
      <ProjectGallery />
      <TestimonialsCarousel />
      <CtaBanner />
    </>
  );
}
