import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { getServiceDetail } from "@/data/service-details";
import { ServiceDetailPage } from "@/components/sections/services/ServiceDetailPage";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} — AH Growth`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) {
    notFound();
  }

  return <ServiceDetailPage service={service} detail={detail} />;
}
