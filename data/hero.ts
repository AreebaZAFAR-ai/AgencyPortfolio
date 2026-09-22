import type { HeroContent, HeroVideo } from "./types";

export const heroContent: HeroContent = {
  label: "AH Growth — Software Agency",
  heading: ["We build digital", "experiences that performs"],
  description:
    "AH GROWTH is a software and digital agency building high-performance websites, applications, and digital systems for ambitious brands.",
  primaryCta: { label: "Start a Project", href: "/contact" },
  secondaryCta: { label: "View Our Work", href: "/work" },
};

// Full-bleed video background for the homepage hero. Poster reuses the
// existing hero backdrop image so there's no blank frame before the video
// decodes, without adding a duplicate asset.
export const heroVideo: HeroVideo = {
  src: "/assets/videos/ahgrowthhero.mp4",
  poster: "/assets/images/hero/main_hero.jpg",
};
