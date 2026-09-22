import { services } from "@/data/services";
import { Container } from "@/components/common/Container";
import { ServiceRow } from "@/components/sections/services/ServiceRow";

export function ServicesEditorial() {
  return (
    <section className="relative overflow-hidden bg-black py-section-sm md:py-section">
      <Container>
        <div className="relative z-10 flex flex-col gap-28 md:gap-36">
          {services.map((service, index) => (
            <ServiceRow
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}