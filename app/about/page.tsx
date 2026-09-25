import type { Metadata } from "next";
import { PageHero } from "@/components/hero/PageHero";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { CeoSection } from "@/components/sections/about/CeoSection";
import { TeamSection } from "@/components/sections/about/TeamSection";

export const metadata: Metadata = {
  title: "About — AH Growth",
  description: "The people, story, and values behind AH Growth.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About AH Growth"
        heading={["Designers, developers,", "and digital thinkers", "working as one team."]}
        description="AH Growth is a software and digital agency that connects design, technology, automation, and strategy to build useful digital experiences."
        primaryCta={{ label: "Start a Project", href: "/contact" }}
        secondaryCta={{ label: "View Our Work", href: "/work" }}
        backgroundImage={{
          src: "/assets/images/about/about-us.png",
          alt: "Overhead view of a team collaborating with laptops and charts",
        }}
        minHeightClass="min-h-[85dvh]"
      />
      <AboutIntro />
      <CeoSection />
      <TeamSection />
    </>
  );
}
