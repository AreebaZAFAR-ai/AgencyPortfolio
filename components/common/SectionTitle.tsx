import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string | string[];
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "display" | "section-md" | "h1" | "h2" | "h3";
  className?: string;
}

const sizeClasses = {
  display: "text-display",
  "section-md": "text-section-md",
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
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && <span className="type-eyebrow text-ah-muted">{eyebrow}</span>}
      <Heading className={cn("font-heading text-ah-ink", sizeClasses[size])}>
        {lines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </Heading>
      {description && (
        <p className={cn("max-w-2xl text-body-lg text-ah-muted", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
