import { WordHero } from "@/components/hero/WordHero";
import { CtaBanner } from "@/components/common/CtaBanner";
import { ServiceProcess } from "@/components/sections/services/ServiceProcess";
import { ServiceTechnicalStrip } from "@/components/sections/services/ServiceTechnicalStrip";
import type { Service, ServiceDetail } from "@/data/types";

interface ServiceDetailPageProps {
  service: Service;
  detail: ServiceDetail;
}

// Shared layout for every /services/[slug] route -- only the data differs.
export function ServiceDetailPage({ service, detail }: ServiceDetailPageProps) {
  return (
    <>
      <WordHero
        title={service.name.toUpperCase()}
        fontSize={detail.heroFontSize ?? 6}
        maxWidthClass={detail.heroMaxWidthClass ?? "max-w-4xl"}
      />
      <ServiceProcess steps={detail.process} />
      <ServiceTechnicalStrip items={detail.stack} />
      <CtaBanner
        eyebrow="Have a project in mind?"
        title="Let's build something worth remembering."
        ctaLabel="Start a project"
        ctaHref="/contact"
      />
    </>
  );
}
