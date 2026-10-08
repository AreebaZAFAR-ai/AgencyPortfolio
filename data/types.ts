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
  // Optional override for the home page services strip card (falls back to `image`)
  cardImage?: string;

  // "contain" shows the whole image inside the card instead of cropping it (default "cover")
  imageFit?: "cover" | "contain";

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

  // Profile photo (omit to fall back to the initials placeholder)
  image?: string;

  // Personal message shown in the About page's CEO section
  quote?: string;
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
  // Smaller 720p version served to phones.
  mobileSrc?: string;
  poster?: string;
}

export interface HeroContent {
  label: string;
  heading: string[];
  description: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
}

export interface ServiceProcessStepDetail {
  number: string;
  title: string;
  description: string;
  // Short deliverables/activities rendered as supporting metadata
  meta: string[];
  image: {
    src: string;
    alt: string;
  };
}

// Detail-page-only content for a service, keyed by the same slug as Service.
// Kept separate from Service so the /services listing data stays untouched.
export interface ServiceDetail {
  slug: string;

  // WordHero vw font size / max-width override for long service names
  heroFontSize?: number;
  heroMaxWidthClass?: string;

  // Full-bleed photo behind the detail page's hero title
  heroImage?: string;
  // CSS object-position for the hero photo, e.g. "center 30%" (default "center")
  heroImagePosition?: string;

  process: ServiceProcessStepDetail[];

  // "contain" shows each whole step image inside its card instead of cropping it (default "cover")
  imageFit?: "cover" | "contain";

  // Tools & technologies shown in the Technical Strip
  stack: string[];
}
