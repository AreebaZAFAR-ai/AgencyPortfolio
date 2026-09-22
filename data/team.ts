import type { TeamMember } from "./types";

export const leadership: TeamMember[] = [
  {
    name: "Ahsan Haroon",
    role: "Founder & CEO",
    initials: "AH",
    skills: ["Product Strategy", "Engineering", "Growth"],
    bio: "Ahsan founded AH Growth to close the gap between agencies that design well and agencies that build well. He leads product strategy and technical direction on every engagement.",
  },
  {
    name: "Sana Malik",
    role: "Studio Manager",
    initials: "SM",
    skills: ["Delivery", "Client Partnership", "Operations"],
    bio: "Sana runs the studio's day-to-day delivery, keeping every engagement on schedule and every client in the loop from kickoff to launch.",
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
  { title: "Innovation", description: "We build for where the industry is going, not where it's been." },
  { title: "Quality", description: "Every detail is reviewed as if it were the only thing we shipped this year." },
  { title: "Transparency", description: "Clients see the work in progress, not just the finished reveal." },
  { title: "Growth", description: "For clients and for our own team — standing still isn't an option." },
];

export const companyTimeline = [
  { year: "2018", label: "Founded", description: "AH Growth started as a two-person studio taking on freelance builds." },
  { year: "2021", label: "Growth", description: "Grew into a full studio with dedicated design, engineering, and growth teams." },
  { year: "2024", label: "Expansion", description: "Expanded into AI automation and full-funnel marketing engagements." },
  { year: "2026", label: "Future", description: "Building the next generation of AI-native software products with our clients." },
];
