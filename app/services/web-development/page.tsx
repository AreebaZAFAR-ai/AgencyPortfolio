import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { PageHero } from "@/components/hero/PageHero";
import { CapabilitiesShowcase } from "@/components/sections/web-development/CapabilitiesShowcase";
import { ProcessSteps } from "@/components/sections/service-detail/ProcessSteps";
import { CtaBanner } from "@/components/common/CtaBanner";
import type { ProcessStep } from "@/data/types";

// Same underlying service entry the generic /services/[slug] template reads
// from -- used here for the page metadata so it matches the same pattern
// every other service page follows.
const service = getServiceBySlug("web-development")!;

export const metadata: Metadata = {
  title: `${service.name} — AH Growth`,
  description: service.shortDescription,
};

const capabilities = [
  {
    title: "Corporate Websites",
    description: "Editorial marketing sites that load fast and represent the brand with precision.",
  },
  {
    title: "E-commerce",
    description: "Storefronts built to convert, from product pages to checkout.",
  },
  {
    title: "Web Applications",
    description: "Complex, stateful products that stay fast as features and users grow.",
  },
  {
    title: "Landing Pages",
    description: "Focused, conversion-driven pages built and shipped in days, not sprints.",
  },
  {
    title: "CMS & Content Platforms",
    description: "Structured content systems that let teams publish without touching code.",
  },
  {
    title: "Performance & Optimization",
    description: "Core Web Vitals, load times, and rendering tuned down to the millisecond.",
  },
];

const process: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the business, users, goals and technical requirements.",
  },
  {
    step: "02",
    title: "Design",
    description: "Turn strategy into a clear, intuitive and distinctive digital experience.",
  },
  {
    step: "03",
    title: "Build",
    description: "Develop the experience with modern, scalable and maintainable technologies.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Test, optimize and launch a fast, reliable product ready to grow.",
  },
];

export default function WebDevelopmentPage() {
  return (
    <>
      <PageHero
        hideContent
        backgroundImage={{
          src: "/assets/images/services/service_bg.jpeg",
          alt: "",
          pixelated: true,
        }}
        minHeightClass="min-h-[85dvh]"
      />
      <CapabilitiesShowcase capabilities={capabilities} />
      <ProcessSteps steps={process} eyebrow="Our Approach" title="How we get it live." />
      <CtaBanner
        title="Ready to build something better?"
        description="Tell us what you're building and we'll help turn the idea into a digital experience that works."
        ctaLabel="Start a project"
        ctaHref="/contact"
      />
    </>
  );
}
