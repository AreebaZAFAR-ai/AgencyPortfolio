import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { navItems, siteInfo } from "@/data/nav";
import { services } from "@/data/services";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { ScrollReveal } from "@/components/animations";

const footerGroups = [
  {
    title: "Pages",
    items: navItems.map((item) => ({ label: item.label, href: item.href })),
  },
  {
    title: "Services",
    items: services.slice(0, 6).map((service) => ({ label: service.name, href: `/services/${service.slug}` })),
  },
  {
    title: "Connect",
    items: [
      { label: siteInfo.email, href: `mailto:${siteInfo.email}` },
      ...siteInfo.social.map((social) => ({ label: social.label, href: social.href })),
    ],
  },
] as const;

export function Footer() {
  return (
    <footer id="site-footer" className="px-3 pb-3 md:px-6 md:pb-6">
      {/* <section className="relative overflow-hidden py-24 text-center md:py-36">
        <Container size="narrow">
          <ScrollReveal as="div" y={24}>
            <h2 className="font-heading text-hero font-semibold text-balance text-ah-ink">
              Let&apos;s build something that performs.
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-balance text-base text-ah-muted">
              Bring us the idea, the challenge, or the digital product that needs to work better.{" "}
              {siteInfo.name} will help shape it, build it, and prepare it to grow.
            </p>
            <Button href="/services" size="lg" className="mt-8" icon={<ArrowUpRightIcon className="h-4 w-4" />}>
              View Services
            </Button>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ah-muted/70">
              Websites · Applications · Automation · Growth
            </p>
          </ScrollReveal>
        </Container>
      </section> */}

      <div className="mx-auto max-w-[1440px] rounded-3xl color-ah-bg px-6 py-12 md:px-12 md:py-16">
        <div className="grid gap-12 border-b border-ah-border pb-12 lg:grid-cols-[1.1fr_1.9fr]">
          <div>
            <span className="font-heading text-h2 text-ah-ink">
              {siteInfo.name}
            </span>
            <p className="mt-7 max-w-sm text-body-sm text-ah-muted">{siteInfo.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="type-eyebrow text-ah-muted">{group.title}</p>
                <ul className="mt-5 space-y-3 text-body-sm text-ah-ink/72">
                  {group.items.map((item) =>
                    item.href.startsWith("/") ? (
                      <li key={item.label}>
                        <Link href={item.href} className="transition-colors hover:text-ah-ink">
                          {item.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          {...(item.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="transition-colors hover:text-ah-ink"
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-caption text-ah-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </span>
          <span>Software & digital agency</span>
        </div>
      </div>
    </footer>
  );
}
