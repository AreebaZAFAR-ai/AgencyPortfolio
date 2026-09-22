import type { Metadata } from "next";
import { WordHero } from "@/components/hero/WordHero";
import { ServicesEditorial } from "@/components/sections/services/ServicesEditorial";
import { CtaBanner } from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "Services — AH Growth",
  description: "Web, app, design, AI automation, and growth marketing services from AH Growth.",
};

export default function ServicesPage() {
  return (
    <>
      <WordHero title="SERVICES" />
      <ServicesEditorial />
      <CtaBanner />
    </>
  );
}
