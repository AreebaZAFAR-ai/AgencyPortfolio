
import type { Service } from "./types";

export const services: Service[] = [
  // =========================================================
  // 01 — GOOGLE BUSINESS PROFILE
  // =========================================================
  {
    slug: "google-business-profile",
    index: "01",
    name: "Google Business Profile",
    image: "/assets/images/services/GMap.webp",
    size: "sm",

    heroHeading:
      "We help your business get found where local customers search.",

    heroDescription:
      "Google Business Profile optimization designed to improve local visibility, customer trust, and Google Maps presence.",

    shortDescription:
      "Optimize your Google Business Profile and improve visibility across Google Search and Maps.",

    overview:
      "We optimize Google Business Profiles for businesses that depend on local discovery. From profile setup and category selection to services, photos, reviews, business information, and local search signals, we create a consistent local presence that makes it easier for customers to find, evaluate, and contact your business.",

    problems: [
      "Incomplete, outdated, or poorly optimized Google Business Profiles",
      "Low visibility for relevant local searches and Google Maps queries",
      "Incorrect business information across directories and online listings",
      "Weak review activity or inconsistent responses to customer reviews",
      "Poor local landing pages that do not support the Google Business Profile",
    ],

    solution:
      "A structured local search system combining Google Business Profile optimization, accurate business information, review workflows, location-focused content, supporting website pages, and performance tracking.",

    features: [
      {
        title: "Profile optimization",
        description:
          "Optimize business categories, services, descriptions, hours, attributes, contact information, photos, and other profile details around real customer search intent.",
      },
      {
        title: "Google Maps visibility",
        description:
          "Improve the profile structure and supporting local signals that help customers discover the business through Google Search and Maps.",
      },
      {
        title: "Review management",
        description:
          "Create a repeatable process for requesting, monitoring, responding to, and learning from customer reviews.",
      },
      {
        title: "Local SEO",
        description:
          "Align the Google Business Profile, location pages, business information, citations, and on-site content around relevant local searches.",
      },
      {
        title: "Local content",
        description:
          "Develop location-relevant content, service information, updates, and visual assets that keep the profile useful and current.",
      },
      {
        title: "Performance tracking",
        description:
          "Monitor profile interactions such as calls, website visits, direction requests, searches, and customer actions where available.",
      },
    ],

    // Only 5 major skills
    technologies: [
      "Google Business Profile",
      "Google Maps",
      "Local SEO",
      "Google Search",
      "Reviews & Reputation",
    ],

    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "Review the existing profile, categories, business information, reviews, photos, rankings, website, and local search presence.",
      },
      {
        step: "02",
        title: "Optimize",
        description:
          "Improve profile information, categories, services, descriptions, media, attributes, and location signals.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Strengthen reviews, local content, citations, location pages, and supporting website signals.",
      },
      {
        step: "04",
        title: "Measure",
        description:
          "Track profile interactions, search visibility, calls, website visits, direction requests, and other available local signals.",
      },
    ],

    visualTheme: "analytics",
    relatedProjectSlugs: ["cakespot", "fitlat"],
  },

  // =========================================================
  // 02 — DIGITAL MARKETING
  // =========================================================
  {
    slug: "digital-marketing",
    index: "02",
    name: "Digital Marketing",
    image: "/assets/images/services/DM.webp",
    size: "sm",

    heroHeading:
      "We build digital marketing systems that turn attention into growth.",

    heroDescription:
      "Full-funnel digital marketing across search, social, content, email, and paid campaigns, built around measurable business goals.",

    shortDescription:
      "Full-funnel digital marketing across SEO, paid media, social, content, email, and analytics.",

    overview:
      "We connect marketing channels into a measurable system instead of treating SEO, paid advertising, social media, content, and email as separate activities. Campaigns are planned around audience intent, acquisition cost, conversion behavior, and business objectives.",

    problems: [
      "Marketing activity spread across disconnected platforms",
      "Paid campaigns generating traffic without enough qualified enquiries",
      "Content being produced without a defined search or conversion purpose",
      "Social media activity that creates engagement but little measurable business value",
      "No reliable attribution between campaigns, traffic, leads, and conversions",
      "Marketing reports focused on vanity metrics rather than business outcomes",
    ],

    solution:
      "A connected digital marketing system combining strategy, SEO, paid acquisition, social media, content, email, conversion tracking, and reporting around measurable acquisition and retention goals.",

    features: [
      {
        title: "Marketing strategy",
        description:
          "Define audiences, positioning, acquisition channels, campaign objectives, content themes, and measurable KPIs before execution.",
      },
      {
        title: "Search marketing",
        description:
          "Combine technical SEO, content, keyword targeting, local search, and paid search around high-intent customer journeys.",
      },
      {
        title: "Paid advertising",
        description:
          "Plan, launch, test, and optimize campaigns across Google Ads, Meta Ads, and other relevant advertising platforms.",
      },
      {
        title: "Social media",
        description:
          "Create platform-specific content systems designed around awareness, engagement, trust, and conversion.",
      },
      {
        title: "Content marketing",
        description:
          "Develop search-friendly landing pages, articles, social content, lead magnets, and campaign assets.",
      },
      {
        title: "Email automation",
        description:
          "Build newsletters, lead nurturing, abandoned-cart flows, onboarding sequences, and customer re-engagement campaigns.",
      },
      {
        title: "Analytics & attribution",
        description:
          "Connect traffic sources, campaigns, events, leads, and conversions so marketing decisions are based on measurable behavior.",
      },
    ],

    technologies: [
      "SEO & Local SEO",
      "Google Ads",
      "Meta Ads",
      "Social Media Marketing",
      "Email Marketing",
    ],

    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "Review current traffic sources, campaigns, content, audience behavior, conversion tracking, and existing marketing performance.",
      },
      {
        step: "02",
        title: "Strategy",
        description:
          "Define target audiences, channels, campaigns, content pillars, funnels, budgets, and measurable KPIs.",
      },
      {
        step: "03",
        title: "Launch",
        description:
          "Create campaigns, landing pages, content, tracking systems, email flows, and channel-specific initiatives.",
      },
      {
        step: "04",
        title: "Optimize",
        description:
          "Use campaign data, conversion behavior, and testing to continuously improve acquisition efficiency.",
      },
    ],

    visualTheme: "analytics",
    relatedProjectSlugs: ["cakespot"],
  },

  // =========================================================
  // 03 — WEB DEVELOPMENT
  // =========================================================
  {
    slug: "web-development",
    index: "03",
    name: "Web Development",
    image: "/assets/images/services/web.jpg",
    size: "lg",

    heroHeading:
      "We build websites that move your business forward.",

    heroDescription:
      "High-performance digital experiences built around your brand, your users, and your goals.",

    shortDescription:
      "Fast, scalable websites and web platforms engineered for performance, accessibility, and growth.",

    overview:
      "We design and engineer production-ready websites, dashboards, portals, and full-stack web applications. Our approach combines responsive UI engineering, reusable components, structured content, APIs, analytics, security, and performance optimization.",

    problems: [
      "Legacy websites that are difficult and expensive to maintain",
      "Slow pages and poor Core Web Vitals",
      "Desktop-first interfaces that break on smaller screens",
      "Inconsistent components and duplicated frontend code",
      "Websites that are difficult for internal teams to update",
      "No clear architecture for adding new features after launch",
    ],

    solution:
      "A modern component-driven web architecture using typed frontend and backend systems, responsive design, structured content, performance budgets, analytics, and deployment workflows designed for long-term maintainability.",

    features: [
      {
        title: "Marketing websites",
        description:
          "Premium responsive websites designed for brand positioning, lead generation, content publishing, and conversion.",
      },
      {
        title: "Web applications",
        description:
          "Authenticated dashboards, portals, SaaS interfaces, internal tools, and data-driven applications.",
      },
      {
        title: "Frontend engineering",
        description:
          "Reusable components, responsive layouts, accessible interactions, animations, and maintainable UI systems.",
      },
      {
        title: "Backend development",
        description:
          "APIs, authentication, databases, business logic, integrations, and server-side functionality.",
      },
      {
        title: "Performance",
        description:
          "Image optimization, code splitting, caching, lazy loading, rendering strategy, and Core Web Vitals optimization.",
      },
      {
        title: "CMS & content",
        description:
          "Structured content systems that allow marketing teams to update pages without changing application code.",
      },
      {
        title: "Analytics & conversion",
        description:
          "Event tracking, form analytics, conversion funnels, and user behavior measurement integrated into the product.",
      },
      {
        title: "Deployment & maintenance",
        description:
          "Production builds, environment management, CI/CD, monitoring, backups, and ongoing technical improvements.",
      },
    ],

    technologies: [
      "Frontend Development",
      "Backend Development",
      "Full-Stack Development",
      "CMS Development",
      "Web Applications",
    ],

    process: [
      {
        step: "01",
        title: "Discover",
        description:
          "Understand the business, users, existing technology, content requirements, integrations, and technical constraints.",
      },
      {
        step: "02",
        title: "Architecture",
        description:
          "Define the information architecture, component system, data model, integrations, and technical foundation.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Develop the interface, backend services, integrations, CMS, analytics, and responsive experiences in reviewable stages.",
      },
      {
        step: "04",
        title: "Harden",
        description:
          "Test performance, accessibility, responsiveness, security, SEO, browser compatibility, and production deployment.",
      },
    ],

    visualTheme: "code",
    relatedProjectSlugs: ["modisch", "solarlink"],
  },

  // =========================================================
  // 04 — APP DEVELOPMENT
  // =========================================================
  {
    slug: "app-development",
    index: "04",
    name: "App Development",
    image: "/assets/images/services/PM.jpg",
    size: "md",

    heroHeading:
      "We build apps that keep people coming back.",

    heroDescription:
      "Cross-platform mobile products engineered to feel native, perform reliably, and scale with your users.",

    shortDescription:
      "Mobile and cross-platform applications from product prototype through app-store launch.",

    overview:
      "We build mobile applications for iOS and Android, from early prototypes and MVPs to production products. The focus is on reliable architecture, intuitive navigation, responsive interfaces, analytics, notifications, secure APIs, and release workflows that support continuous development.",

    problems: [
      "Mobile prototypes that are difficult to turn into production products",
      "Cross-platform applications that feel inconsistent or slow",
      "Poor offline and network handling",
      "Manual release processes that make updates risky",
      "Limited product analytics and retention visibility",
      "Backend architecture that cannot support growing usage",
    ],

    solution:
      "A scalable mobile architecture combining cross-platform development, reliable APIs, local data handling, analytics, authentication, notifications, automated builds, and staged releases.",

    features: [
      {
        title: "Cross-platform development",
        description:
          "Build iOS and Android experiences from a shared codebase while preserving platform-appropriate interaction patterns.",
      },
      {
        title: "Product architecture",
        description:
          "Structure navigation, state management, APIs, authentication, data persistence, and feature modules for long-term growth.",
      },
      {
        title: "Offline & sync",
        description:
          "Use local storage, caching, retry logic, and synchronization strategies for unreliable network conditions.",
      },
      {
        title: "Push notifications",
        description:
          "Design transactional and engagement notifications with permission flows and measurable delivery events.",
      },
      {
        title: "Analytics",
        description:
          "Track onboarding, activation, feature usage, retention, conversions, and important product events.",
      },
      {
        title: "App-store launch",
        description:
          "Prepare production builds, app metadata, testing tracks, release workflows, and post-launch monitoring.",
      },
    ],

    technologies: [
      "Flutter",
      "React Native",
      "Android",
      "iOS",
      "Cross-Platform Apps",
    ],

    process: [
      {
        step: "01",
        title: "Prototype",
        description:
          "Define the core user journey and validate the product concept with an interactive prototype before building the full application.",
      },
      {
        step: "02",
        title: "Architecture",
        description:
          "Define navigation, data models, API contracts, authentication, offline strategy, analytics, and deployment workflow.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Develop the application in feature stages with regular builds available for testing on real devices.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "Complete release testing, store preparation, phased deployment, monitoring, and post-launch optimization.",
      },
    ],

    visualTheme: "app",
    relatedProjectSlugs: ["fitlat"],
  },

  // =========================================================
  // 05 — UI/UX DESIGN
  // =========================================================
  {
    slug: "ui-ux-design",
    index: "05",
    name: "UI/UX Design",
    image: "/assets/images/services/UI.jpg",
    size: "md",

    heroHeading:
      "We design interfaces that make complexity feel effortless.",

    heroDescription:
      "Research-led product and interface design built for clarity, consistency, accessibility, and real usability.",

    shortDescription:
      "Research-led product design, design systems, prototypes, and interfaces built for real users.",

    overview:
      "We design digital products from information architecture and user flows through high-fidelity interfaces and production-ready design systems. The goal is to make complex products easier to understand, navigate, and use while maintaining a distinctive visual identity.",

    problems: [
      "Interfaces that look polished but create usability problems",
      "Inconsistent components across products and marketing websites",
      "Unclear user journeys and complicated navigation",
      "Design decisions made without user validation",
      "Large design files without a reusable component system",
      "Accessibility considered too late in the design process",
    ],

    solution:
      "A structured design process combining research, information architecture, wireframes, interactive prototypes, visual design, reusable components, accessibility considerations, and usability testing.",

    features: [
      {
        title: "UX research",
        description:
          "User interviews, competitor analysis, journey mapping, usability reviews, and behavioral insights used to define product decisions.",
      },
      {
        title: "Information architecture",
        description:
          "Clear content structures, navigation systems, user flows, and page hierarchies designed around user intent.",
      },
      {
        title: "UI design",
        description:
          "High-fidelity interfaces combining typography, layout, color, imagery, components, and interaction states.",
      },
      {
        title: "Design systems",
        description:
          "Reusable components, tokens, spacing systems, typography scales, states, and usage guidelines for consistent products.",
      },
      {
        title: "Prototyping",
        description:
          "Interactive prototypes used to validate complex flows and interactions before development begins.",
      },
      {
        title: "Accessibility",
        description:
          "Contrast, hierarchy, keyboard considerations, touch targets, readable typography, and accessible interaction patterns considered from the beginning.",
      },
    ],

    technologies: [
      "UI Design",
      "UX Design",
      "Figma",
      "Design Systems",
      "Prototyping",
    ],

    process: [
      {
        step: "01",
        title: "Research",
        description:
          "Understand users, business objectives, competitors, existing analytics, and the problems the product needs to solve.",
      },
      {
        step: "02",
        title: "Structure",
        description:
          "Define information architecture, user journeys, wireframes, navigation, and content hierarchy.",
      },
      {
        step: "03",
        title: "Design",
        description:
          "Create the visual language, components, responsive layouts, interactions, and high-fidelity screens.",
      },
      {
        step: "04",
        title: "Test & refine",
        description:
          "Validate important flows through prototypes and usability feedback before handing designs to development.",
      },
    ],

    visualTheme: "design",
    relatedProjectSlugs: ["modisch", "cakespot"],
  },

  // =========================================================
  // 06 — AI AUTOMATION
  // =========================================================
  {
    slug: "ai-automation",
    index: "06",
    name: "AI Automation",
    image: "/assets/images/services/ai.jpg",
    size: "sm",

    heroHeading:
      "We build automation that gives your team its time back.",

    heroDescription:
      "Practical AI and workflow automation systems that reduce repetitive work and connect the tools your team already uses.",

    shortDescription:
      "AI-powered workflows and business automation designed around real operational processes.",

    overview:
      "We identify repetitive operational tasks and turn them into reliable automated workflows. Depending on the use case, systems can combine AI models, APIs, databases, business applications, human review, notifications, and analytics rather than relying on a single AI model.",

    problems: [
      "Teams spending hours on repetitive manual tasks",
      "Data being copied between multiple systems",
      "AI experiments that never become reliable production workflows",
      "Manual document, email, reporting, or customer-support processes",
      "No clear audit trail for automated decisions",
      "Automation workflows that fail silently without monitoring",
    ],

    solution:
      "Production-oriented automation pipelines with API integrations, AI models, validation, human approval points, error handling, logging, monitoring, and measurable workflow outcomes.",

    features: [
      {
        title: "AI Chatbots",
        description:
          "Build AI-powered conversational assistants for websites, customer support, lead qualification, FAQs, and internal knowledge.",
      },
      {
        title: "CRM Automation",
        description:
          "Automate lead capture, qualification, follow-ups, pipeline updates, notifications, and customer data synchronization.",
      },
      {
        title: "Workflow Automation",
        description:
          "Connect forms, CRMs, databases, email, documents, notifications, and business applications into repeatable workflows.",
      },
      {
        title: "AI Agents",
        description:
          "Create task-oriented AI systems that can use tools, retrieve information, process data, and execute defined business workflows.",
      },
      {
        title: "API Integrations",
        description:
          "Connect existing business software through APIs, webhooks, databases, and third-party services.",
      },
      {
        title: "Document automation",
        description:
          "Extract, classify, summarize, validate, and route information from business documents and uploaded files.",
      },
    ],

    technologies: [
      "AI Chatbots",
      "CRM Automation",
      "Workflow Automation",
      "AI Agents",
      "API Integrations",
    ],

    process: [
      {
        step: "01",
        title: "Map the workflow",
        description:
          "Identify repetitive tasks, decision points, data sources, manual handoffs, and the measurable cost of the existing process.",
      },
      {
        step: "02",
        title: "Prototype",
        description:
          "Build a focused proof of concept against realistic data and test whether automation produces useful results.",
      },
      {
        step: "03",
        title: "Productionize",
        description:
          "Add authentication, validation, retries, logging, monitoring, human review, error handling, and security controls.",
      },
      {
        step: "04",
        title: "Optimize",
        description:
          "Measure time saved, accuracy, failure rates, processing cost, and workflow adoption, then improve the system continuously.",
      },
    ],

    visualTheme: "network",
    relatedProjectSlugs: ["solarlink"],
  },

  // =========================================================
  // 07 — E-COMMERCE
  // =========================================================
  {
    slug: "e-commerce",
    index: "07",
    name: "E-Commerce",
    image: "/assets/images/services/ecommerce.jpg",
    size: "sm",

    heroHeading:
      "We build e-commerce experiences designed to turn browsing into buying.",

    heroDescription:
      "Conversion-focused online stores built around your products, customers, operations, and growth goals.",

    shortDescription:
      "High-performance e-commerce stores with optimized product discovery, checkout, analytics, and integrations.",

    overview:
      "We design and develop e-commerce experiences across Shopify, WooCommerce, and custom commerce stacks. From catalog architecture and product discovery to checkout, payments, inventory, analytics, marketing automation, and post-purchase journeys, we build the complete customer experience around how your business actually operates.",

    problems: [
      "Online stores that make products difficult to discover or compare",
      "Slow product pages and poor mobile shopping experiences",
      "High traffic but low product engagement or checkout completion",
      "Complicated product catalogs and filtering systems",
      "Manual inventory, order, customer, and marketing workflows",
      "Poor integration between the storefront and business systems",
      "Limited visibility into product, cart, checkout, and customer behavior",
    ],

    solution:
      "A complete commerce system combining storefront design, product information architecture, search and filtering, checkout optimization, payments, analytics, inventory integrations, CRM, marketing automation, and performance engineering.",

    features: [
      {
        title: "E-commerce development",
        description:
          "Build and customize Shopify, WooCommerce, headless, and custom commerce experiences around your catalog and operational requirements.",
      },
      {
        title: "Product experience",
        description:
          "Create clear product pages with strong imagery, specifications, variants, reviews, recommendations, search, and filtering.",
      },
      {
        title: "Cart & checkout",
        description:
          "Reduce unnecessary friction across cart, checkout, payment, delivery, account creation, and order confirmation.",
      },
      {
        title: "Payments",
        description:
          "Integrate payment providers and regional payment methods appropriate to the target market and business model.",
      },
      {
        title: "Inventory & operations",
        description:
          "Connect storefronts with inventory, order management, fulfillment, shipping, ERP, CRM, and other operational systems.",
      },
      {
        title: "Conversion optimization",
        description:
          "Use analytics, heatmaps, funnel analysis, A/B testing, and customer behavior to identify and reduce conversion friction.",
      },
      {
        title: "Retention & automation",
        description:
          "Build abandoned-cart, post-purchase, replenishment, review-request, loyalty, and customer re-engagement workflows.",
      },
      {
        title: "Commerce analytics",
        description:
          "Track product views, add-to-cart events, checkout steps, purchases, revenue, customer acquisition, and repeat behavior.",
      },
    ],

    technologies: [
      "Shopify",
      "WooCommerce",
      "Custom E-Commerce",
      "Payment Integration",
      "E-Commerce Automation",
    ],

    process: [
      {
        step: "01",
        title: "Discover",
        description:
          "Understand your products, customers, catalog structure, fulfillment process, payment requirements, existing technology, and current conversion journey.",
      },
      {
        step: "02",
        title: "Design",
        description:
          "Define information architecture, product discovery, category pages, product templates, cart, checkout, account flows, and responsive shopping experiences.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Develop the storefront, product system, integrations, payments, analytics, marketing connections, and operational workflows.",
      },
      {
        step: "04",
        title: "Optimize",
        description:
          "Measure shopping behavior and continuously improve product discovery, page performance, checkout completion, acquisition, and retention.",
      },
    ],

    visualTheme: "brand",
    relatedProjectSlugs: ["modisch"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
