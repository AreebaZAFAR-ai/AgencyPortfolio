import localFont from "next/font/local";
import { Manrope } from "next/font/google";

// Display -- hero, headings, large numbers. Self-hosted variable font (Fontshare).
export const satoshi = localFont({
  src: [
    { path: "../app/fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "../app/fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// Body -- paragraphs, navigation, buttons, forms, labels, metadata.
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
