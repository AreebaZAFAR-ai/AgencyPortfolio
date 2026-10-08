import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "modisch",
    order: 0,
    client: "Modisch",
    name: "MODISCH",
    image: "/assets/images/projects/modischfull.jpg",
    liveUrl: "https://modisch-orcin.vercel.app/",
    summary: "A premium fashion e-commerce platform rebuilt for editorial storytelling.",
    clientBlurb:
      "Modisch is a direct-to-consumer fashion label expanding from a single flagship store into a full digital retail presence.",
    challenge:
      "Modisch's existing storefront looked generic and couldn't keep pace with new collection drops — page speed and checkout drop-off were both hurting revenue.",
    solution:
      "We rebuilt the storefront as an editorial-first Next.js platform, pairing an in-house design system with a streamlined checkout flow and a CMS the marketing team could run without engineering.",
    designProcess: [
      "Audited existing storefront analytics and drop-off points",
      "Designed an editorial component library for collection storytelling",
      "Rebuilt checkout as a single-page, low-friction flow",
      "Trained the marketing team on the new CMS",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    results: [
      { label: "Conversion rate", value: "+38%" },
      { label: "Page load time", value: "-61%" },
      { label: "Checkout completion", value: "+24%" },
    ],
    visualTheme: "brand",
  },
  {
    slug: "fitlat",
    order: 1,
    client: "Fitlat",
    name: "FITLAT",
    image: "/assets/images/projects/fitlabfull.jpg",
    liveUrl: "https://fitlat.vercel.app/",
    summary: "A cross-platform fitness app connecting coaches with clients in real time.",
    clientBlurb:
      "Fitlat is a fitness-coaching startup connecting independent trainers with clients through structured programs and live check-ins.",
    challenge:
      "Fitlat's original prototype worked for a demo but fell apart under real usage — offline gaps during workouts, and no reliable way for coaches to track client progress.",
    solution:
      "We rebuilt the app on a shared cross-platform core with offline-first data sync, plus a coach dashboard for tracking programs and client adherence in one place.",
    designProcess: [
      "Mapped the full coach-to-client workflow end to end",
      "Designed an offline-first data layer for uninterrupted workouts",
      "Built a coach dashboard for program and progress tracking",
      "Piloted with 12 coaches before public launch",
    ],
    technologies: ["React Native", "TypeScript", "Node.js"],
    results: [
      { label: "Weekly active coaches", value: "+210%" },
      { label: "Session completion", value: "92%" },
      { label: "Crash-free sessions", value: "99.7%" },
    ],
    visualTheme: "app",
  },
  {
    slug: "solarlink",
    order: 2,
    client: "Solarlink",
    name: "SOLARLINK",
    image: "/assets/images/projects/solarlinkfull.jpg",
    liveUrl: "https://solarlink.com.pk/",
    summary: "An AI-driven monitoring platform for distributed solar installations.",
    clientBlurb:
      "Solarlink manages remote monitoring for residential and commercial solar installations across a growing multi-state fleet.",
    challenge:
      "Solarlink's ops team was manually triaging thousands of sensor alerts a day, with no reliable way to tell a real fault from noise.",
    solution:
      "We built an AI automation pipeline that classifies incoming alerts, auto-resolves known noise patterns, and routes real faults to the right technician with full context attached.",
    designProcess: [
      "Analyzed a year of historical alert and resolution data",
      "Trained a classification pipeline on labeled fault patterns",
      "Built a human-in-the-loop review queue for edge cases",
      "Shipped a technician-facing dashboard with full alert context",
    ],
    technologies: ["Python", "AI", "AWS", "Node.js"],
    results: [
      { label: "Alert noise reduced", value: "-73%" },
      { label: "Mean time to resolution", value: "-46%" },
      { label: "Technician hours saved", value: "1,200+/mo" },
    ],
    visualTheme: "network",
  },
  {
    slug: "cakespot",
    order: 3,
    client: "Cakespot",
    name: "CAKESPOT",
    image: "/assets/images/projects/cakespotfull.jpg",
    liveUrl: "https://cakespot-redesign.vercel.app/",
    summary: "A local-first marketplace and growth engine for independent bakeries.",
    clientBlurb:
      "Cakespot is a marketplace connecting independent home bakers with local customers across a growing number of cities.",
    challenge:
      "Cakespot had strong supply but almost no organic demand — the site wasn't ranking, and paid spend was burning budget without qualified leads.",
    solution:
      "We paired a technical SEO overhaul with a full-funnel marketing engine, rebuilding the site's content architecture around real local search intent and tightening attribution across every channel.",
    designProcess: [
      "Ran a full technical SEO and content audit",
      "Rebuilt site architecture around local search intent",
      "Stood up unified attribution across paid and organic",
      "Launched a content system for recurring local demand",
    ],
    technologies: ["AI", "AWS", "Node.js"],
    results: [
      { label: "Organic traffic", value: "+186%" },
      { label: "Qualified leads", value: "+94%" },
      { label: "Cost per acquisition", value: "-52%" },
    ],
    visualTheme: "analytics",
  },
  {
    slug: "noctra",
    order: 4,
    client: "Noctra",
    name: "NOCTRA",
    image: "/assets/images/projects/noctrafull.jpg",
    liveUrl: "https://noctra-cars.vercel.app/",
    summary: "A cinematic showroom website for a curated performance and luxury car dealer.",
    clientBlurb:
      "Noctra sources, inspects and delivers performance and luxury cars — from Ferrari and Lamborghini to Porsche and BMW M — for drivers who care about the details.",
    challenge:
      "A luxury dealership has to feel as considered online as it does on the showroom floor. Generic dealer templates flattened every car into the same grid and gave buyers no reason to book a viewing.",
    solution:
      "We designed a dark, cinematic showroom experience with full-screen vehicle features, a curated inventory showcase, and clear paths to book a test drive or private viewing.",
    designProcess: [
      "Defined a dark, high-contrast visual language for the brand",
      "Designed full-bleed feature sections for each highlighted vehicle",
      "Built a curated inventory showcase with clear pricing",
      "Added test-drive booking and contact flows throughout",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    results: [
      { label: "Scope", value: "Design + Build" },
      { label: "Experience", value: "Fully responsive" },
      { label: "Status", value: "Live" },
    ],
    visualTheme: "brand",
  },
  {
    slug: "orelle",
    order: 5,
    client: "Orelle",
    name: "ORELLE",
    image: "/assets/images/projects/orellefull.jpg",
    liveUrl: "https://clothing-website-gamma-nine.vercel.app/",
    summary: "An editorial fashion storefront for a slow-made clothing and accessories label.",
    clientBlurb:
      "Orelle makes clothing and accessories cut from mill-finished cloth and finished by hand in small runs, built around the idea of quiet form and lasting presence.",
    challenge:
      "Orelle's pieces rely on texture, proportion and restraint — qualities a standard product grid hides. The store needed to sell while still feeling like an editorial lookbook.",
    solution:
      "We built an editorial-first storefront with seasonal edits for women and men, scroll-driven product rows, quick-shop interactions, testimonials and a newsletter for capsule drops.",
    designProcess: [
      "Shaped a restrained, editorial typography and layout system",
      "Designed seasonal Women's and Men's edit sections",
      "Built scroll-driven product rows with quick-shop actions",
      "Added capsule features, testimonials and a newsletter sign-up",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    results: [
      { label: "Scope", value: "Design + Build" },
      { label: "Experience", value: "Fully responsive" },
      { label: "Status", value: "Live" },
    ],
    visualTheme: "design",
  },
  {
    slug: "aesthetic-clinic",
    order: 6,
    client: "Skin Aesthetics",
    name: "SKIN AESTHETICS",
    image: "/assets/images/projects/aestheticfull.jpg",
    liveUrl: "https://aesthetic-clinic-black.vercel.app/",
    summary: "A calm, trust-first website for a doctor-led skin and aesthetics clinic.",
    clientBlurb:
      "Skin Aesthetics is a doctor-led clinic offering medical-grade facials, laser, pigmentation and acne care, anti-aging and injectable treatments.",
    challenge:
      "Aesthetic treatments are a high-trust decision. The clinic needed a site that explained a wide range of treatments clearly and made booking a consultation feel easy and reassuring.",
    solution:
      "We designed a warm, editorial site with a structured treatment directory, doctor profiles, before-and-after results, client reviews, an FAQ and consultation booking throughout.",
    designProcess: [
      "Organised eight treatment categories into a clear directory",
      "Designed doctor-led trust sections and client review blocks",
      "Built a results showcase and a frequently asked questions section",
      "Placed consultation booking at every key decision point",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Lenis"],
    results: [
      { label: "Scope", value: "Design + Build" },
      { label: "Experience", value: "Fully responsive" },
      { label: "Status", value: "Live" },
    ],
    visualTheme: "growth",
  },
  {
    slug: "pearls",
    order: 7,
    client: "Pearls",
    name: "PEARLS",
    image: "/assets/images/projects/pearlsfull.jpg",
    liveUrl: "https://pearls-jewelry-website.vercel.app/",
    summary: "A refined online boutique for a fine jewelry label built around timeless pieces.",
    clientBlurb:
      "Pearls is a fine jewelry label crafting earrings, rings, necklaces and bracelets designed to be worn every day, not saved for special occasions.",
    challenge:
      "Fine jewelry is bought on detail and feeling. The brand needed a store that let each piece breathe while still making it quick to browse a growing catalogue and add to cart.",
    solution:
      "We designed a dark, gallery-like storefront with signature collection tiles, a filterable product grid with quick add, mood-based shopping edits, client testimonials and a newsletter for new releases.",
    designProcess: [
      "Defined a dark, editorial visual language that lets each piece shine",
      "Designed signature collection tiles for earrings, rings, necklaces and bracelets",
      "Built a filterable product grid with quick add and load more",
      "Added mood-based edits, testimonials and a newsletter sign-up",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    results: [
      { label: "Scope", value: "Design + Build" },
      { label: "Experience", value: "Fully responsive" },
      { label: "Status", value: "Live" },
    ],
    visualTheme: "brand",
  },
  {
    slug: "trueline",
    order: 8,
    client: "TrueLine Plumbing",
    name: "TRUELINE",
    image: "/assets/images/projects/truelinefull.jpg",
    liveUrl: "https://true-line-plumbing-service-website.vercel.app/",
    summary: "A conversion-focused website for a local plumbing company with 24/7 emergency service.",
    clientBlurb:
      "TrueLine Plumbing is a local plumbing company handling leak repair, drain cleaning, water heaters, repiping, sewer lines and round-the-clock emergency calls.",
    challenge:
      "When a pipe bursts, customers need to trust a plumber and reach them fast. The business needed a site that built confidence quickly and turned visitors into calls and quote requests.",
    solution:
      "We built a bold, trust-first site with a clear service directory, a 24/7 emergency call-to-action, a simple four-step process, recent project work, reviews, service areas and an FAQ.",
    designProcess: [
      "Organised eight core services into a clear, scannable directory",
      "Placed click-to-call and free quote actions at every key point",
      "Designed a four-step process and transparent pricing messaging",
      "Added project gallery, reviews, service areas and an FAQ",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    results: [
      { label: "Scope", value: "Design + Build" },
      { label: "Experience", value: "Fully responsive" },
      { label: "Status", value: "Live" },
    ],
    visualTheme: "growth",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(currentSlug: string) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((project) => project.slug === currentSlug);
  const nextIndex = (currentIndex + 1) % sorted.length;
  return sorted[nextIndex];
}
