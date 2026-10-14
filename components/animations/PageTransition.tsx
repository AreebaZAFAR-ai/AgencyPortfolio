"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

// Pure-CSS enter animation (see `.page-enter` in globals.css): keeps framer-motion
// out of every page's bundle and lets the fade start at first paint instead of
// waiting for hydration. Keyed by pathname so it replays on each navigation.
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
