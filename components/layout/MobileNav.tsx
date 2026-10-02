"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";
import { navItems } from "@/data/nav";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-dvh w-full flex-col overflow-hidden bg-background lg:hidden">
      {/* Top bar -- mirrors the Header so the logo and close button don't jump */}
      <div className="flex h-(--header-height) shrink-0 items-center justify-between border-b border-border-subtle px-(--space-gutter)">
        <span className="font-display text-h3 font-bold text-text-primary">AH Growth</span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-10 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors hover:border-text-primary"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-(--space-xs) px-(--space-gutter)">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "py-(--space-xs) font-display text-h2 transition-colors duration-300",
                isActive ? "text-text-primary" : "text-text-muted hover:text-text-primary"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 px-(--space-gutter) pb-(--space-2xl)">
        <Button href="/contact" size="lg" className="w-full" onClick={onClose}>
          Start a Project
        </Button>
      </div>
    </div>
  );
}
