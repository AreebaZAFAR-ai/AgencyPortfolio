import { services } from "@/data/services";
import { ServicesStripClient } from "./ServicesStripClient";

export function ServicesStrip() {
  return (
    <ServicesStripClient
      services={services.map((service) => ({
        slug: service.slug,
        index: service.index,
        name: service.name,
        image: service.image,
        cardImage: service.cardImage,
        visualTheme: service.visualTheme,
      }))}
    />
  );
}
