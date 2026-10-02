import { Fragment } from "react";
import { Container } from "@/components/common/Container";

interface ServiceTechnicalStripProps {
  items: string[];
  eyebrow?: string;
}

export function ServiceTechnicalStrip({ items, eyebrow = "Technology we use" }: ServiceTechnicalStripProps) {
  // Repeat short lists so one copy always spans wider than the viewport,
  // then duplicate that run for a seamless -50% marquee loop.
  const run = items.length < 6 ? [...items, ...items] : items;

  return (
    <section className="overflow-hidden bg-surface py-(--space-4xl)">
      <Container>
        <span className="type-eyebrow text-text-muted">{eyebrow}</span>
      </Container>

      {/* Static, readable list for assistive tech; the marquee is decorative. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="group mt-(--space-xl)">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] items-center group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:px-(--space-lg)">
          {[run, run].map((copy, copyIndex) => (
            <div
              key={copyIndex}
              className={copyIndex === 1 ? "flex items-center motion-reduce:hidden" : "flex flex-wrap items-center"}
            >
              {copy.map((item, index) => (
                <Fragment key={`${item}-${index}`}>
                  <span className="shrink-0 whitespace-nowrap pr-(--space-3xl) font-display text-h2 text-text-muted">
                    {item}
                  </span>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
