import type { TeamMember } from "./types";

export const leadership: TeamMember[] = [
  {
    name: "Syed Hassan Murtaza",
    role: "Founder & CEO",
    initials: "HM",
    skills: ["Product Strategy", "Engineering", "Growth"],
    bio: "Hassan founded AH Growth to close the gap between agencies that design well and agencies that build well, and leads product strategy and technical direction on every engagement.",
    quote: "Building meaningful digital products isn't only about technology. It's about understanding people, solving real problems, and creating work that lasts.",
  },
  {
    name: "Abdullah Ahmad",
    role: "Management",
    initials: "AA",
    skills: ["Delivery", "Client Partnership", "Operations"],
    bio: "Keeps every engagement on schedule and every client in the loop, from kickoff to launch.",
  },
  {
    name: "Nameer Naeem",
    role: "Management",
    initials: "NN",
    skills: ["Planning", "Operations", "Client Success"],
    bio: "Turns plans into momentum, coordinating teams so projects move smoothly and ship on time.",
  },
];

export const teamMembers: TeamMember[] = [
  { name: "Imran Qureshi", role: "Lead Engineer", initials: "IQ", skills: ["Next.js", "TypeScript", "Architecture"] },
  { name: "Fatima Zaidi", role: "Design Director", initials: "FZ", skills: ["UI/UX", "Design Systems", "Motion"] },
  { name: "Bilal Ahmed", role: "AI Engineer", initials: "BA", skills: ["Python", "ML Pipelines", "Automation"] },
  { name: "Hira Siddiqui", role: "Growth Lead", initials: "HS", skills: ["SEO", "Performance Marketing", "Analytics"] },
  { name: "Usman Tariq", role: "Mobile Engineer", initials: "UT", skills: ["React Native", "iOS", "Android"] },
  { name: "Nadia Farooq", role: "Brand Strategist", initials: "NF", skills: ["Positioning", "Voice", "Identity"] },
  { name: "Zain Abbas", role: "Backend Engineer", initials: "ZA", skills: ["Node.js", "AWS", "Infrastructure"] },
  { name: "Mahnoor Khalid", role: "Product Designer", initials: "MK", skills: ["Prototyping", "Research", "UX Writing"] },
];

export const cultureValues = [
  { title: "Our CEO", description: "Hassan, Founder & CEO, leads AH Growth's product strategy and technical direction — closing the gap between agencies that design well and agencies that build well." },
  { title: "HR Department", description: "Our HR team hires, supports, and grows the people behind the work — building a culture where talent is valued and every team member can do their best work." },
  { title: "Professional Team", description: "Designers, engineers, AI specialists, and growth experts working as one team — every engagement is staffed by senior people who ship, not just plan." },
  { title: "Management Department", description: "Management keeps every project on schedule and every client in the loop — from kickoff and planning through delivery and launch." },
];

export const companyTimeline = [
  { year: "2018", label: "Founded", description: "AH Growth started as a two-person studio taking on freelance builds." },
  { year: "2021", label: "Growth", description: "Grew into a full studio with dedicated design, engineering, and growth teams." },
  { year: "2024", label: "Expansion", description: "Expanded into AI automation and full-funnel marketing engagements." },
  { year: "2026", label: "Future", description: "Building the next generation of AI-native software products with our clients." },
];
