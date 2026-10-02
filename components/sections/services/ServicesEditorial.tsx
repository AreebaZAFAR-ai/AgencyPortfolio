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
              service={service}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}