import type { Metadata } from "next";
import { PageHero } from "@/components/hero/PageHero";
import { StoryTimeline } from "@/components/sections/about/StoryTimeline";
import { ValuesDeck } from "@/components/sections/about/ValuesDeck";
import { CtaBanner } from "@/components/common/CtaBanner";

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
          src: "/assets/images/hero/h9.jpg",
          alt: "Overhead view of a team collaborating with laptops and charts",
        }}
        minHeightClass="min-h-[85dvh]"
      />
      <StoryTimeline />
      <ValuesDeck />
      <CtaBanner
        title="Bring us the challenge. We'll help shape the path."
        description="Whether the starting point is an idea, an existing product, or a digital experience that needs to work better, we can help define and build what comes next."
      />
    </>
  );
}
