import { trustStats } from "@/data/trust-stats";
import { Container } from "@/components/common/Container";
import { StatBlock } from "@/components/common/StatBlock";

export function TrustCounters() {
  return (
    <section className="flex min-h-[240px] items-center bg-ah-surface py-16 md:min-h-[340px] md:py-24">
      <Container>
        <div className="grid w-full grid-cols-2 place-items-center gap-10 text-center md:grid-cols-4 md:gap-12">
          {trustStats.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} tone="dark" className="items-center" />
          ))}
        </div>
      </Container>
    </section>
  );
}
