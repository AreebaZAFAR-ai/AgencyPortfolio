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
    <section className="overflow-hidden border-y border-ah-muted/10 py-12 md:py-16">
      <Container>
        <span className="type-eyebrow text-ah-muted/60">{eyebrow}</span>
      </Container>

      {/* Static, readable list for assistive tech; the marquee is decorative. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="group mt-8 md:mt-10">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] items-center group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:px-6">
          {[run, run].map((copy, copyIndex) => (
            <div
              key={copyIndex}
              className={copyIndex === 1 ? "flex items-center motion-reduce:hidden" : "flex flex-wrap items-center"}
            >
              {copy.map((item, index) => (
                <Fragment key={`${item}-${index}`}>
                  <span className="shrink-0 whitespace-nowrap font-heading text-h1 text-ah-muted/70">
                    {item}
                  </span>
                  <span className="shrink-0 px-6 text-h3 text-ah-muted/30 md:px-10">✦</span>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
