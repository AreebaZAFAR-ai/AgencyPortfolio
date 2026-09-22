export type VisualTheme =
  | "network"
  | "analytics"
  | "code"
  | "design"
  | "growth"
  | "brand"
  | "app";

export interface NavItem {
  label: string;
  href: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  index: string;
  name: string;

  // Service image used on the Services page (omit to fall back to the icon placeholder)
  image?: string;

  size?: "lg" | "md" | "sm";

  // Tagline + supporting line for the service detail page's hero specifically
  // (distinct from shortDescription, which stays concise for listings/metadata).
  heroHeading: string;
  heroDescription: string;

  shortDescription: string;
  overview: string;

  problems: string[];

  solution: string;

  features: {
    title: string;
    description: string;
  }[];

  technologies: string[];

  process: ProcessStep[];

  visualTheme: VisualTheme;

  relatedProjectSlugs: string[];
}

export interface Project {
  slug: string;
  order: number;
  client: string;
  name: string;

  // Project image used on the Work showcase (omit to fall back to the icon placeholder)
  image?: string;

  // Live, deployed URL of the actual project site (omit if none is public)
  liveUrl?: string;

  summary: string;
  clientBlurb: string;
  challenge: string;
  solution: string;
  designProcess: string[];
  technologies: string[];
  results: {
    label: string;
    value: string;
  }[];
  visualTheme: VisualTheme;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  skills: string[];
  bio?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface ClientLogo {
  name: string;
}

export interface VideoTestimonial {
  name: string;
  role: string;
  company: string;
}

export interface TrustStat {
  label: string;
  value: string;
}

export interface TechItem {
  name: string;
}

export interface GoalItem {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroVideo {
  src: string;
  poster: string;
}

export interface HeroContent {
  label: string;
  heading: string[];
  description: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
}