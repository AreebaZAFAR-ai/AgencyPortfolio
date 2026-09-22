import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "modisch",
    order: 0,
    client: "Modisch",
    name: "MODISCH",
    image: "/assets/images/projects/modish.jpeg",
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
    image: "/assets/images/projects/fitlat.jpg",
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
    image: "/assets/images/projects/solarlink.png",
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
    image: "/assets/images/projects/cakespot.png",
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
