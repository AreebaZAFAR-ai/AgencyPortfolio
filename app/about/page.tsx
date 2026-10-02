import type { Metadata } from "next";
import { EditorialAbout } from "@/components/sections/about/EditorialAbout";

export const metadata: Metadata = {
  title: "About — AH Growth",
  description: "The people, story, and values behind AH Growth.",
};

export default function AboutPage() {
  return <EditorialAbout />;
}
