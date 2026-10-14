import { services } from "@/data/services";
import { Container } from "@/components/common/Container";
import { ServiceRow } from "@/components/sections/services/ServiceRow";

export function ServicesEditorial() {
  return (
    <section className="relative overflow-hidden py-section">
      <Container>
        <div className="relative z-10 flex flex-col gap-section">
          {services.map((service, index) => (
            <ServiceRow
              key={service.slug}
              service={{
                slug: service.slug,
                index: service.index,
                name: service.name,
                shortDescription: service.shortDescription,
                technologies: service.technologies,
                image: service.image,
                imageFit: service.imageFit,
                visualTheme: service.visualTheme,
              }}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
