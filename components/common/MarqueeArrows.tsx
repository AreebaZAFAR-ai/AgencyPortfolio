import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarqueeArrowsProps {
  onScroll: (direction: 1 | -1) => void;
  label: string;
  className?: string;
}

const buttonClass =
  "flex size-12 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors hover:border-text-primary hover:bg-text-primary hover:text-background";

export function MarqueeArrows({ onScroll, label, className }: MarqueeArrowsProps) {
  return (
    <div className={cn("flex justify-center gap-(--space-sm)", className)}>
      <button
        type="button"
        onClick={() => onScroll(-1)}
        aria-label={`Previous ${label}`}
        data-cursor="hover"
        className={buttonClass}
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => onScroll(1)}
        aria-label={`Next ${label}`}
        data-cursor="hover"
        className={buttonClass}
      >
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
