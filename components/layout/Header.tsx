"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { navItems } from "@/data/nav";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { MagneticButton } from "@/components/animations";
import { MobileNav } from "./MobileNav";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = navRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-stagger]", el);
      gsap.set(targets, { opacity: 0, y: -12 });
      gsap.to(targets, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06, delay: 0.1 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-background">
      <Container>
        <div ref={navRef} className="flex h-(--header-height) items-center justify-between gap-(--space-xl)">
          <Link href="/" data-stagger data-cursor="hover" className="font-display text-h3 font-bold text-text-primary">
            AH Growth
          </Link>

          <nav className="hidden items-center gap-(--space-xl) lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-stagger
                  data-cursor="hover"
                  className={cn(
                    "text-small font-medium transition-colors hover:text-text-primary",
                    isActive ? "text-text-primary" : "text-text-secondary"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div data-stagger className="hidden lg:block">
            <MagneticButton>
              <Button href="/contact" size="sm">
                Start a Project
              </Button>
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            data-stagger
            className="flex size-10 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors hover:border-text-primary lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </Container>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
