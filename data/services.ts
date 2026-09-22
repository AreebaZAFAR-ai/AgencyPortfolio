import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "web-development",
    index: "01",
    name: "Web Development",
    image: "/assets/images/services/web.jpg",
    size: "lg",
    heroHeading: "We build websites that move your business forward.",
    heroDescription:
      "High-performance digital experiences built around your brand, your users, and your goals.",
    shortDescription:
      "Fast, scalable web platforms engineered for growth, built on modern frameworks.",

    overview:
      "We design and build production-grade web platforms — marketing sites, dashboards, and full-stack products — engineered to stay fast as your traffic and team both grow.",

    problems: [
      "Legacy stacks that slow every new feature down",
      "Sites that look premium on desktop but break on mobile",
      "No clear system for scaling the codebase past MVP",
    ],

    solution:
      "A component-driven architecture on Next.js with a typed data layer, so every new page or feature reuses the same design system instead of reinventing it.",

    features: [
      {
        title: "Component architecture",
        description: "Reusable, typed components shared across every route.",
      },
      {
        title: "Performance budget",
        description:
          "Core Web Vitals tracked from the first commit, not the last sprint.",
      },
      {
        title: "Content layer",
        description:
          "Structured data models that keep copy and code decoupled.",
      },
      {
        title: "CI-ready",
        description:
          "Type-checked, linted, and build-verified before anything ships.",
      },
    ],

    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],

    process: [
      {
        step: "01",
        title: "Discover",
        description:
          "Audit the current stack and define the target architecture.",
      },
      {
        step: "02",
        title: "Design system",
        description:
          "Establish tokens, components, and interaction language.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Ship page by page against a working, reviewable app.",
      },
      {
        step: "04",
        title: "Harden",
        description:
          "Performance, accessibility, and responsive passes before launch.",
      },
    ],

    visualTheme: "code",
    relatedProjectSlugs: ["modisch", "solarlink"],
  },

  {
    slug: "app-development",
    index: "02",
    name: "App Development",
    image: "/assets/images/services/PM.jpg",
    size: "md",
    heroHeading: "We build apps that keep people coming back.",
    heroDescription:
      "Cross-platform products engineered to feel native, launch fast, and scale with your users.",

    shortDescription:
      "Native-feeling mobile and cross-platform apps from prototype to app-store launch.",

    overview:
      "From first prototype to app-store launch, we build mobile products that feel native, load instantly, and are architected to ship new features without a rewrite.",

    problems: [
      "Prototypes that never survive contact with real users",
      "Cross-platform apps that feel like a web page in a wrapper",
      "No release pipeline, so every update is a manual scramble",
    ],

    solution:
      "A shared cross-platform codebase paired with native-feeling interaction patterns, plus a CI/CD pipeline so releases are routine, not risky.",

    features: [
      {
        title: "Cross-platform core",
        description: "One codebase, native performance on iOS and Android.",
      },
      {
        title: "Offline-first data",
        description:
          "Local caching so the app stays usable without a connection.",
      },
      {
        title: "Release pipeline",
        description:
          "Automated builds and staged rollouts to both app stores.",
      },
      {
        title: "Analytics baked in",
        description:
          "Funnel and retention tracking from day one, not bolted on later.",
      },
    ],

    technologies: ["React Native", "TypeScript", "Node.js", "AWS"],

    process: [
      {
        step: "01",
        title: "Prototype",
        description:
          "Click-through prototype validated with real users first.",
      },
      {
        step: "02",
        title: "Architecture",
        description:
          "Data, navigation, and offline strategy locked in early.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Feature-complete builds shipped to TestFlight/Play internal tracks.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "Store listing, phased rollout, and post-launch monitoring.",
      },
    ],

    visualTheme: "app",
    relatedProjectSlugs: ["fitlat"],
  },

  {
    slug: "ui-ux-design",
    index: "03",
    name: "UI/UX Design",
    image: "/assets/images/services/UI.jpg",
    size: "md",
    heroHeading: "We design interfaces that make complexity feel effortless.",
    heroDescription:
      "Research-led design systems built for clarity, consistency, and real usability.",

    shortDescription:
      "Editorial, research-led interface design that makes complex products feel effortless.",

    overview:
      "We design interfaces the way editorial teams design pages — with intent, hierarchy, and restraint — grounded in research so the product feels effortless, not just decorated.",

    problems: [
      "Interfaces that look designed but test poorly with real users",
      "Inconsistent components that multiply design debt every sprint",
      "No shared design language between product and marketing",
    ],

    solution:
      "A single design system spanning product and marketing, validated with usability testing before a single line of production code is written.",

    features: [
      {
        title: "Research-led",
        description:
          "User interviews and testing inform every major decision.",
      },
      {
        title: "Design systems",
        description:
          "Tokens and components shared across Figma and production code.",
      },
      {
        title: "Prototyping",
        description:
          "Interactive prototypes tested before build begins.",
      },
      {
        title: "Accessibility",
        description:
          "WCAG-conscious design from the first wireframe.",
      },
    ],

    technologies: ["Figma", "TypeScript", "Tailwind CSS"],

    process: [
      {
        step: "01",
        title: "Research",
        description:
          "Interviews and audits to find the real problem.",
      },
      {
        step: "02",
        title: "Wireframe",
        description:
          "Structure and flow before any visual polish.",
      },
      {
        step: "03",
        title: "Visual design",
        description:
          "Editorial layout, type, and motion applied with restraint.",
      },
      {
        step: "04",
        title: "Test & refine",
        description:
          "Usability testing feeds back into the system.",
      },
    ],

    visualTheme: "design",
    relatedProjectSlugs: ["modisch", "cakespot"],
  },

  {
    slug: "ai-automation",
    index: "04",
    name: "AI Automation",
    image: "/assets/images/services/ai.jpg",
    size: "sm",
    heroHeading: "We build automation that gives your team its time back.",
    heroDescription:
      "Practical AI systems that remove manual work from the workflows that matter most.",

    shortDescription:
      "Practical AI systems that remove manual work from real operational workflows.",

    overview:
      "We build AI systems that remove manual work from real workflows — support, operations, content — rather than adding a chatbot for its own sake.",

    problems: [
      "Manual workflows that don't scale with headcount",
      "AI pilots that never make it past a demo",
      "No visibility into what an automated system is actually doing",
    ],

    solution:
      "Production-grade automation pipelines with human-in-the-loop review points, built on models matched to the task rather than the biggest one available.",

    features: [
      {
        title: "Workflow automation",
        description:
          "End-to-end pipelines replacing manual, repetitive work.",
      },
      {
        title: "Model selection",
        description:
          "Right-sized models chosen per task for cost and latency.",
      },
      {
        title: "Human-in-the-loop",
        description:
          "Review points where judgment still matters.",
      },
      {
        title: "Observability",
        description:
          "Full visibility into what the system decided, and why.",
      },
    ],

    technologies: ["Python", "Node.js", "AI", "AWS"],

    process: [
      {
        step: "01",
        title: "Map the workflow",
        description:
          "Find the manual steps worth automating first.",
      },
      {
        step: "02",
        title: "Prototype",
        description:
          "A working pipeline against real data, fast.",
      },
      {
        step: "03",
        title: "Productionize",
        description:
          "Reliability, monitoring, and fallback paths added.",
      },
      {
        step: "04",
        title: "Iterate",
        description:
          "Tune against real usage, not synthetic benchmarks.",
      },
    ],

    visualTheme: "network",
    relatedProjectSlugs: ["solarlink"],
  },

  {
    slug: "digital-marketing",
    index: "05",
    name: "Digital Marketing",
    image: "/assets/images/services/DM.webp",
    size: "sm",
    heroHeading: "We build growth that shows up in the numbers.",
    heroDescription:
      "Full-funnel marketing measured against pipeline and revenue, not vanity metrics.",

    shortDescription:
      "Full-funnel growth marketing measured against revenue, not vanity metrics.",

    overview:
      "We run full-funnel growth marketing measured against pipeline and revenue — not impressions — so every channel earns its budget.",

    problems: [
      "Spend spread across channels with no clear attribution",
      "Campaigns optimized for clicks instead of qualified leads",
      "Marketing and product data living in separate systems",
    ],

    solution:
      "A unified measurement layer connecting ad spend to pipeline, so budget moves toward what is actually converting.",

    features: [
      {
        title: "Full-funnel strategy",
        description:
          "Paid, organic, and lifecycle working toward one goal.",
      },
      {
        title: "Attribution",
        description:
          "Spend tied to pipeline and revenue, not just clicks.",
      },
      {
        title: "Creative testing",
        description:
          "Continuous testing across channels and formats.",
      },
      {
        title: "Reporting cadence",
        description:
          "Weekly, decision-ready reporting, not vanity dashboards.",
      },
    ],

    technologies: ["AI", "AWS", "Node.js"],

    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "Current channels, spend, and attribution reviewed.",
      },
      {
        step: "02",
        title: "Strategy",
        description:
          "Channel mix and budget plan built around real goals.",
      },
      {
        step: "03",
        title: "Launch",
        description:
          "Campaigns live with tracking in place from day one.",
      },
      {
        step: "04",
        title: "Optimize",
        description:
          "Weekly iteration based on pipeline, not impressions.",
      },
    ],

    visualTheme: "analytics",
    relatedProjectSlugs: ["cakespot"],
  },

  {
    slug: "seo",
    index: "06",
    name: "SEO",
    image: "/assets/images/services/GMap.webp",
    size: "sm",
    heroHeading: "We build rankings that keep compounding.",
    heroDescription:
      "Technical and content SEO engineered for organic growth that lasts.",

    shortDescription:
      "Technical and content SEO built to compound organic growth over time.",

    overview:
      "We treat SEO as compounding infrastructure — technical foundations and content built to keep earning organic traffic long after the engagement ends.",

    problems: [
      "Technical issues silently capping organic growth",
      "Content built for keywords instead of real search intent",
      "No system for tracking what's actually moving rankings",
    ],

    solution:
      "A technical audit and content system built around search intent, with rankings and traffic tracked against clear, agreed targets.",

    features: [
      {
        title: "Technical audit",
        description:
          "Crawlability, speed, and structure fixed at the root.",
      },
      {
        title: "Content strategy",
        description:
          "Built around real search intent, not keyword stuffing.",
      },
      {
        title: "Link strategy",
        description:
          "Earned authority, not risky shortcuts.",
      },
      {
        title: "Rank tracking",
        description:
          "Clear reporting against agreed target keywords.",
      },
    ],

    technologies: ["Node.js", "AI", "AWS"],

    process: [
      {
        step: "01",
        title: "Technical audit",
        description:
          "Site health and crawlability assessed first.",
      },
      {
        step: "02",
        title: "Content plan",
        description:
          "Topics mapped to real search intent.",
      },
      {
        step: "03",
        title: "Execution",
        description:
          "Content and technical fixes shipped on a cadence.",
      },
      {
        step: "04",
        title: "Measure",
        description:
          "Rankings and organic traffic tracked monthly.",
      },
    ],

    visualTheme: "analytics",
    relatedProjectSlugs: ["cakespot", "fitlat"],
  },

  {
    slug: "branding",
    index: "07",
    name: "Branding",
    image: "/assets/images/services/branding.jpg",
    size: "sm",
    heroHeading: "We build brands that hold up everywhere they show up.",
    heroDescription:
      "Distinct identity systems — logo, voice, and design language — built to scale.",

    shortDescription:
      "Distinct brand systems — identity, voice, and design language — built to scale.",

    overview:
      "We build brand systems — identity, voice, and design language — distinct enough to be recognized and disciplined enough to scale across every surface.",

    problems: [
      "A visual identity that doesn't hold up outside one deck",
      "No consistent voice across product, marketing, and support",
      "Brand guidelines nobody on the team actually uses",
    ],

    solution:
      "A practical brand system logo, type, color, voice — documented as usable guidelines, not a static PDF nobody opens again.",

    features: [
      {
        title: "Identity design",
        description:
          "Logo, color, and type system built to last.",
      },
      {
        title: "Voice & tone",
        description:
          "A written voice guide teams can actually apply.",
      },
      {
        title: "Brand guidelines",
        description:
          "Living documentation, not a forgotten PDF.",
      },
      {
        title: "Applied system",
        description:
          "Identity extended across web, product, and social.",
      },
    ],

    technologies: ["Figma", "TypeScript"],

    process: [
      {
        step: "01",
        title: "Strategy",
        description:
          "Positioning and audience defined before any visuals.",
      },
      {
        step: "02",
        title: "Identity",
        description:
          "Logo, color, and type system explored and refined.",
      },
      {
        step: "03",
        title: "System",
        description:
          "Guidelines documented for consistent daily use.",
      },
      {
        step: "04",
        title: "Rollout",
        description:
          "Identity applied across every real-world surface.",
      },
    ],

    visualTheme: "brand",
    relatedProjectSlugs: ["modisch"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}