import type { ServiceDetail } from "./types";

// Detail-page content for every service route (/services/[slug]).
// The page layout is identical for all services -- only this data changes.
// Step images are drawn from the asset library; swap the `src` values
// here to replace them without touching any component. `stock()` photos are
// from Burst by Shopify (free for commercial use, no attribution required).

const img = (path: string) => `/assets/images/${path}`;
const stock = (name: string) => `/assets/images/services/stock/${name}.jpg`;

export const serviceDetails: ServiceDetail[] = [
  // =========================================================
  // GOOGLE BUSINESS PROFILE
  // =========================================================
  {
    slug: "google-business-profile",
    heroImage: img("services/gbp-hero.jpg"),
    heroFontSize: 5,
    heroMaxWidthClass: "max-w-5xl",
    imageFit: "contain",
    process: [
      {
        number: "01",
        title: "Local Audit",
        description:
          "Review the current profile, categories, reviews, photos, rankings and competitors to see exactly where local visibility is being lost.",
        meta: ["Profile review", "Competitor scan", "Ranking baseline"],
        image: { src: img("services/googlemap3.jpg"), alt: "Google Business Profile — local audit" },
      },
      {
        number: "02",
        title: "Profile Optimization",
        description:
          "Rebuild categories, services, descriptions, hours, attributes and media around the searches real customers make.",
        meta: ["Categories & services", "Business details", "Photo set"],
        image: { src: img("services/googlemap2.jpg"), alt: "Google Business Profile — profile optimization" },
      },
      {
        number: "03",
        title: "Reputation",
        description:
          "Set up a repeatable review workflow for requesting, monitoring and responding, so trust keeps compounding.",
        meta: ["Review requests", "Response templates", "Monitoring"],
        image: { src: img("services/googlemap4.jpg"), alt: "Google Business Profile — reputation" },
      },
      {
        number: "04",
        title: "Local Signals",
        description:
          "Align citations, location pages and on-site content with the profile so every local signal points in the same direction.",
        meta: ["Citations", "Location pages", "NAP consistency"],
        image: { src: img("services/GMB6.webp"), alt: "Google Business Profile — local signals" },
      },
      {
        number: "05",
        title: "Measure",
        description:
          "Track calls, direction requests, website visits and search visibility, then refine what drives real enquiries.",
        meta: ["Profile insights", "Call tracking", "Monthly reporting"],
        image: { src: img("services/gmb5.jpg"), alt: "Google Business Profile — measurement" },
      },
    ],
    stack: ["Google Business Profile", "Google Maps", "Google Analytics", "Search Console", "SEMrush"],
  },

  // =========================================================
  // DIGITAL MARKETING
  // =========================================================
  {
    slug: "digital-marketing",
    heroImage: img("services/dm-hero-theme.jpg"),
    heroImagePosition: "center 30%",
    heroFontSize: 6,
    heroMaxWidthClass: "max-w-5xl",
    process: [
      {
        number: "01",
        title: "Audit",
        description:
          "Review traffic sources, campaigns, content, tracking and conversion data to understand what is working and what is wasted spend.",
        meta: ["Channel review", "Tracking audit", "Funnel analysis"],
        image: { src: img("services/dm3.webp"), alt: "Digital marketing — audit" },
      },
      {
        number: "02",
        title: "Strategy",
        description:
          "Define audiences, channels, budgets, content pillars and KPIs so every campaign is tied to a measurable business goal.",
        meta: ["Audience definition", "Channel mix", "KPI framework"],
        image: { src: img("services/dm1.webp"), alt: "Digital marketing — strategy" },
      },
      {
        number: "03",
        title: "Creative & Setup",
        description:
          "Produce campaign creative, landing pages and email flows, and wire up conversion tracking before a single ad goes live.",
        meta: ["Ad creative", "Landing pages", "Conversion tracking"],
        image: { src: img("services/dm2.jpg"), alt: "Digital marketing — creative and setup" },
      },
      {
        number: "04",
        title: "Launch",
        description:
          "Launch campaigns across search, social and email in controlled stages with clear test hypotheses.",
        meta: ["Search & social ads", "Email flows", "A/B tests"],
        image: { src: img("services/dm-digital.jpg"), alt: "Digital marketing — launch" },
      },
      {
        number: "05",
        title: "Optimize",
        description:
          "Use performance data to shift budget, refine creative and lower acquisition cost month after month.",
        meta: ["Budget allocation", "Creative iteration", "Attribution reporting"],
        image: { src: img("services/dm6.webp"), alt: "Digital marketing — optimization" },
      },
    ],
    stack: ["Google Ads", "Meta Ads", "Google Analytics 4", "Tag Manager", "SEMrush", "Mailchimp"],
  },

  // =========================================================
  // WEB DEVELOPMENT
  // =========================================================
  {
    slug: "web-development",
    heroImage: img("services/web/web-hero.jpg"),
    // Step images are portrait, so show them whole in a tall frame.
    imageFit: "contain",
    heroFontSize: 6,
    heroMaxWidthClass: "max-w-5xl",
    process: [
      {
        number: "01",
        title: "Discovery",
        description: "Understand the business, users and project requirements.",
        meta: ["Stakeholder workshops", "Requirements", "Technical audit"],
        image: { src: img("services/web/web-discovery.jpg"), alt: "Web development — discovery" },
      },
      {
        number: "02",
        title: "Architecture",
        description: "Define the technical architecture, structure and roadmap.",
        meta: ["Information architecture", "Data model", "Roadmap"],
        image: { src: img("services/web/web-architecture.jpg"), alt: "Web development — architecture" },
      },
      {
        number: "03",
        title: "Design",
        description: "Create UX/UI and the visual experience.",
        meta: ["Wireframes", "UI design", "Component system"],
        image: { src: img("services/web/web-design.jpg"), alt: "Web development — design" },
      },
      {
        number: "04",
        title: "Development",
        description: "Build, integrate and test the product.",
        meta: ["Frontend & backend", "CMS & integrations", "QA"],
        image: { src: img("services/web/web-development.jpg"), alt: "Web development — development" },
      },
      {
        number: "05",
        title: "Launch",
        description: "Deploy, optimize and prepare the product for users.",
        meta: ["Deployment", "Performance tuning", "Analytics"],
        image: { src: img("services/web/web-launch.jpg"), alt: "Web development — launch" },
      },
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },

  // =========================================================
  // APP DEVELOPMENT
  // =========================================================
  {
    slug: "app-development",
    heroImage: img("services/app/app-hero-devices.jpg"),
    heroFontSize: 6,
    heroMaxWidthClass: "max-w-5xl",
    process: [
      {
        number: "01",
        title: "Product Discovery",
        description: "Understand the product, users and requirements.",
        meta: ["User journeys", "Feature scope", "MVP definition"],
        image: { src: img("services/app/app-discovery.jpg"), alt: "App development — product discovery" },
      },
      {
        number: "02",
        title: "App Architecture",
        description: "Define the application structure and technical direction.",
        meta: ["Navigation model", "API contracts", "Offline strategy"],
        image: { src: stock("office-meeting-flatlay"), alt: "App development — app architecture" },
      },
      {
        number: "03",
        title: "UX/UI",
        description: "Design the mobile experience and interaction system.",
        meta: ["Mobile flows", "Interaction design", "Prototype"],
        image: { src: img("services/app/app-ux-ui.jpg"), alt: "App development — UX/UI" },
      },
      {
        number: "04",
        title: "Development",
        description: "Build, integrate and test the application.",
        meta: ["Feature sprints", "Device testing", "Integrations"],
        image: { src: img("services/app/app-development.jpg"), alt: "App development — development" },
      },
      {
        number: "05",
        title: "Launch",
        description: "Prepare and deploy the application.",
        meta: ["Store submission", "Phased release", "Monitoring"],
        image: { src: img("services/app/app-launch.jpg"), alt: "App development — launch" },
      },
    ],
    stack: ["Flutter", "React Native", "Android", "iOS", "Firebase"],
  },

  // =========================================================
  // UI/UX DESIGN
  // =========================================================
  {
    slug: "ui-ux-design",
    heroImage: img("services/uiux/uiux-hero-design.jpg"),
    // Step images mix square and portrait shapes, so show them whole in a tall frame.
    imageFit: "contain",
    heroFontSize: 8,
    heroMaxWidthClass: "max-w-3xl",
    process: [
      {
        number: "01",
        title: "Research",
        description:
          "Understand users, business goals, competitors and existing analytics to find the problems worth solving.",
        meta: ["User interviews", "Competitor analysis", "Analytics review"],
        image: { src: img("services/uiux/uiux-research.jpg"), alt: "UI/UX design — research" },
      },
      {
        number: "02",
        title: "Structure",
        description:
          "Map information architecture, user journeys and wireframes so the product makes sense before it looks good.",
        meta: ["Information architecture", "User flows", "Wireframes"],
        image: { src: img("services/uiux/uiux-structure.jpg"), alt: "UI/UX design — structure" },
      },
      {
        number: "03",
        title: "Visual Design",
        description:
          "Build the visual language — typography, colour, layout and components — across every responsive state.",
        meta: ["Visual language", "High-fidelity screens", "Responsive layouts"],
        image: { src: img("services/uiux/uiux-visual-design.jpg"), alt: "UI/UX design — visual design" },
      },
      {
        number: "04",
        title: "Prototype & Test",
        description:
          "Validate critical flows with interactive prototypes and real usability feedback, then refine.",
        meta: ["Interactive prototype", "Usability testing", "Iteration"],
        image: { src: img("services/uiux/uiux-prototype.jpg"), alt: "UI/UX design — prototype and test" },
      },
      {
        number: "05",
        title: "Handoff",
        description:
          "Deliver a documented design system and developer-ready specs so the build matches the design.",
        meta: ["Design system", "Dev specs", "Design QA"],
        image: { src: img("services/uiux/uiux-handoff.jpg"), alt: "UI/UX design — handoff" },
      },
    ],
    stack: ["Figma", "FigJam", "Prototyping", "Design Systems", "User Research"],
  },

  // =========================================================
  // AI AUTOMATION
  // =========================================================
  {
    slug: "ai-automation",
    heroImage: img("services/ai-hero-automation.jpg"),
    heroFontSize: 6.5,
    heroMaxWidthClass: "max-w-4xl",
    process: [
      {
        number: "01",
        title: "Workflow Audit",
        description: "Identify repetitive processes and automation opportunities.",
        meta: ["Process mapping", "Time & cost baseline", "Opportunity list"],
        image: { src: img("services/ai.jpg"), alt: "AI automation — workflow audit" },
      },
      {
        number: "02",
        title: "Automation Strategy",
        description: "Define the workflow, tools and integration architecture.",
        meta: ["Workflow design", "Tool selection", "Integration map"],
        image: { src: stock("team-working-together-with-laptops"), alt: "AI automation — automation strategy" },
      },
      {
        number: "03",
        title: "AI Integration",
        description: "Connect AI models, agents and business systems.",
        meta: ["Model integration", "Agents & tools", "CRM & API wiring"],
        image: { src: stock("vintage-robot-with-lots-of-black-negative-space"), alt: "AI automation — AI integration" },
      },
      {
        number: "04",
        title: "Testing",
        description: "Validate workflows, outputs and edge cases.",
        meta: ["Output validation", "Edge cases", "Human review points"],
        image: { src: stock("science-lab-graph-test"), alt: "AI automation — testing" },
      },
      {
        number: "05",
        title: "Deployment",
        description: "Launch, monitor and optimize the automation system.",
        meta: ["Production rollout", "Monitoring & logs", "Continuous tuning"],
        image: { src: stock("busy-tech-staff-on-laptops"), alt: "AI automation — deployment" },
      },
    ],
    stack: ["OpenAI", "Gemini", "n8n", "CRM Automation", "API Integrations"],
  },

  // =========================================================
  // E-COMMERCE
  // =========================================================
  {
    slug: "e-commerce",
    heroImage: img("services/ecom/ecom-hero.jpg"),
    // Step images mix square and portrait shapes, so show them whole in a tall frame.
    imageFit: "contain",
    heroFontSize: 8,
    heroMaxWidthClass: "max-w-3xl",
    process: [
      {
        number: "01",
        title: "Discovery",
        description:
          "Understand your products, customers, fulfilment and payment requirements, and where the current store loses buyers.",
        meta: ["Catalog review", "Customer journey", "Conversion audit"],
        image: { src: img("services/ecom/ecom-discovery.jpg"), alt: "E-commerce — discovery" },
      },
      {
        number: "02",
        title: "Store Architecture",
        description:
          "Structure categories, product data, filters and integrations so the catalog scales without friction.",
        meta: ["Category structure", "Product data model", "Platform choice"],
        image: { src: img("services/ecom/ecom-store-architecture.jpg"), alt: "E-commerce — store architecture" },
      },
      {
        number: "03",
        title: "Shopping Experience",
        description:
          "Design product pages, cart and checkout around clarity and confidence, on every screen size.",
        meta: ["Product pages", "Cart & checkout", "Mobile shopping"],
        image: { src: img("services/ecom/ecom-shopping-experience.jpg"), alt: "E-commerce — shopping experience" },
      },
      {
        number: "04",
        title: "Build & Integrate",
        description:
          "Develop the storefront and connect payments, inventory, shipping, CRM and marketing tools.",
        meta: ["Storefront build", "Payments", "Inventory & shipping"],
        image: { src: img("services/ecom/ecom-build.jpg"), alt: "E-commerce — build and integrate" },
      },
      {
        number: "05",
        title: "Launch & Optimize",
        description:
          "Go live, then use funnel data to keep improving discovery, checkout completion and repeat purchases.",
        meta: ["Launch", "Funnel analytics", "Retention flows"],
        image: { src: img("services/ecom/ecom-optimize.jpg"), alt: "E-commerce — launch and optimize" },
      },
    ],
    stack: ["Shopify", "WooCommerce", "Stripe", "Klaviyo", "Google Analytics 4"],
  },
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((detail) => detail.slug === slug);
}
