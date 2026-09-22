"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";
import { navItems } from "@/data/nav";
import { Button } from "@/components/common/Button";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        flex-col
        bg-ah-bg/75
        backdrop-blur-xl
        md:hidden
      "
    >
      {/* Top bar */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          px-6
          py-5
        "
      >
        <span className="font-heading text-h3 text-white">
          AH Growth
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/5
            text-white
            backdrop-blur-md
            transition-all
            hover:border-white/40
            hover:bg-white/10
          "
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                py-3
                font-heading
                text-h1
                transition-all
                duration-300
                ${
                  isActive
                    ? "translate-x-1 text-white"
                    : "text-white/55 hover:translate-x-1 hover:text-white"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="px-6 pb-10">
        <Button
          href="/contact"
          size="lg"
          className="
            w-full
            border
            border-white/10
            shadow-lg
          "
          onClick={onClose}
        >
          Start a Project
        </Button>
      </div>
    </div>
  );
}