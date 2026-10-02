import Link from "next/link";
import Image from "next/image";
import { navItems, siteInfo } from "@/data/nav";
import { services } from "@/data/services";
import { Container } from "@/components/common/Container";

const footerGroups = [
  {
    title: "Pages",
    items: navItems.map((item) => ({
      label: item.label,
      href: item.href,
    })),
  },
  {
    title: "Services",
    items: [
      ...services.map((service) => ({
        label: service.name,
        href: `/services/${service.slug}`,
      })),
      // Not a separate page -- covered by the Digital Marketing service
      { label: "Performance Marketing", href: "/services/digital-marketing" },
      { label: "Other Services", href: "/services" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: siteInfo.email, href: `mailto:${siteInfo.email}` },
      ...siteInfo.social.map((social) => ({
        label: social.label,
        href: social.href,
      })),
    ],
  },
] as const;

const linkClass =
  "text-[14px] text-text-secondary transition-all duration-300 hover:translate-x-1 hover:text-text-primary";

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="overflow-hidden bg-surface text-text-primary"
    >
      <Container className="pt-[clamp(4rem,8vw,7rem)]">
        <div className="grid gap-[clamp(3rem,7vw,6rem)] pb-[clamp(4rem,7vw,6rem)] lg:grid-cols-[1.1fr_2fr]">
          {/* Brand */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <Link
                href="/"
                className="font-display text-2xl font-medium tracking-[-0.03em]"
              >
                {siteInfo.name}
              </Link>

              <p className="mt-5 max-w-sm text-[15px] leading-[1.6] text-text-secondary">
                {siteInfo.tagline}
              </p>
            </div>

            <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Software &amp; digital agency
            </p>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 text-center sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                  {group.title}
                </p>

                <ul className="flex flex-col items-center gap-3">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      {item.href.startsWith("/") ? (
                        <Link href={item.href} className={linkClass}>
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className={`${linkClass} break-all`}
                          {...(item.href.startsWith("http")
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Centered brand */}
        <div className="border-t border-border-subtle py-8 text-center">
          <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[21/9]">
            <Image
              src="/assets/images/footer-office.jpg"
              alt="The AH Growth office workspace"
              fill
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
            />
          </div>

          <p
            className="font-display text-[clamp(2.5rem,7vw,6rem)] font-medium uppercase leading-none tracking-[-0.06em]"
          >
            {siteInfo.name}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 border-t border-border-subtle py-6 text-center text-[11px] uppercase tracking-[0.1em] text-text-muted sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteInfo.name}
          </span>

          <span>All rights reserved</span>

          <span>Software &amp; digital agency</span>
        </div>
      </Container>
    </footer>
  );
}