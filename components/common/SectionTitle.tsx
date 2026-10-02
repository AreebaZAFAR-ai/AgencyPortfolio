import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string | string[];
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "h3";
  className?: string;
}

const sizeClasses = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  size = "h2",
  className,
}: SectionTitleProps) {
  const Heading = as as ElementType;
  const lines = Array.isArray(title) ? title : [title];

  return (
    <div className={cn("flex flex-col gap-(--space-lg)", align === "center" && "items-center text-center", className)}>
      {eyebrow && <span className="type-eyebrow text-text-muted">{eyebrow}</span>}
      <Heading className={cn("font-display text-text-primary", sizeClasses[size])}>
        {lines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </Heading>
      {description && (
        <p className={cn("max-w-2xl text-body-lg text-text-secondary", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
