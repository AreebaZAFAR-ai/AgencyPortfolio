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
    <header className="sticky top-0 z-40 w-full border-b border-transparent bg-ah-bg">
      <Container>
        <div ref={navRef} className="flex h-20 items-center justify-between">
          <Link href="/" data-stagger data-cursor="hover" className="font-heading text-h3 text-ah-ink">
            AH Growth
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-stagger
                  data-cursor="hover"
                  className={cn(
                    "text-body-sm transition-colors hover:text-ah-ink",
                    isActive ? "text-ah-ink" : "text-ah-muted"
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ah-muted/30 text-ah-ink lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </Container>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
