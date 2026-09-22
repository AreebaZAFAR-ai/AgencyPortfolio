import type { ClientLogo, Testimonial, VideoTestimonial } from "./types";

export const testimonials: Testimonial[] = [
  { quote: "AH Growth rebuilt our storefront in eight weeks and conversion jumped almost 40%. They understood the brand immediately.", name: "Lena Cross", role: "Founder", company: "Modisch" },
  { quote: "The team shipped an offline-first app that actually holds up in the field. Our coaches noticed the difference in week one.", name: "Marcus Webb", role: "Head of Product", company: "Fitlat" },
  { quote: "We went from drowning in false alerts to a system our technicians actually trust. That's a real operational win.", name: "Priya Anand", role: "VP Operations", company: "Solarlink" },
  { quote: "Our organic traffic nearly tripled without touching paid spend. The SEO rebuild paid for itself in two months.", name: "Diego Ramos", role: "Marketing Director", company: "Cakespot" },
  { quote: "Every deliverable came in on schedule, and the communication never went quiet between milestones.", name: "Ayesha Noor", role: "COO", company: "Northline Retail" },
  { quote: "They design and build under one roof, which meant zero handoff loss between the mockups and the real product.", name: "Tom Hendricks", role: "CEO", company: "Vantage Health" },
];

export const clientLogos: ClientLogo[] = [
  { name: "Modisch" },
  { name: "Fitlat" },
  { name: "Solarlink" },
  { name: "Cakespot" },
  { name: "Northline" },
  { name: "Vantage" },
];

export const videoTestimonials: VideoTestimonial[] = [
  { name: "Lena Cross", role: "Founder", company: "Modisch" },
  { name: "Marcus Webb", role: "Head of Product", company: "Fitlat" },
  { name: "Priya Anand", role: "VP Operations", company: "Solarlink" },
];
