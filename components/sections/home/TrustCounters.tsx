import { trustStats } from "@/data/trust-stats";
import { Container } from "@/components/common/Container";
import { StatBlock } from "@/components/common/StatBlock";

export function TrustCounters() {
  return (
    <section className="bg-surface py-(--space-4xl)">
      <Container>
        <div className="grid w-full grid-cols-2 place-items-center gap-(--space-2xl) text-center md:grid-cols-4">
          {trustStats.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} className="items-center" />
          ))}
        </div>
      </Container>
    </section>
  );
}
