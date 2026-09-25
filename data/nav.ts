import type { NavItem } from "./types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/work" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const siteInfo = {
  name: "AH Growth",
  tagline: "A creative technology agency for ambitious software products.",
  email: "ahgrowth@ahgrowth.com",
  social: [] as { label: string; href: string }[],
};
