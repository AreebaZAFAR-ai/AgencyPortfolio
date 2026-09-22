import type { ComponentType } from "react";
import { ImageIcon, PlayIcon, UserIcon } from "lucide-react";
import { ImageReveal } from "@/components/animations";
import { cn } from "@/lib/utils";

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/7]",
} as const;

const toneClasses = {
  bg: "bg-ah-ink/[0.04] border-ah-muted/15",
  accent: "bg-ah-accent/40 border-ah-accent",
  muted: "bg-ah-ink/[0.06] border-ah-muted/20",
} as const;

interface PlaceholderMediaProps {
  aspect?: keyof typeof aspectClasses;
  variant?: "image" | "avatar" | "logo" | "video";
  label?: string;
  initials?: string;
  icon?: ComponentType<{ className?: string }>;
  tone?: keyof typeof toneClasses;
  className?: string;
  revealDirection?: "up" | "down" | "left" | "right";
  reveal?: boolean;
}

export function PlaceholderMedia({
  aspect = "video",
  variant = "image",
  label,
  initials,
  icon: Icon,
  tone = "bg",
  className,
  revealDirection = "up",
  reveal = true,
}: PlaceholderMediaProps) {
  if (variant === "avatar") {
    const avatarClassName = cn(
      "flex aspect-square items-center justify-center rounded-full border",
      toneClasses[tone],
      className
    );
    const avatarContent = (
      <div className="flex h-full w-full items-center justify-center">
        {initials ? (
          <span className="font-heading text-h3 text-ah-ink">{initials}</span>
        ) : (
          <UserIcon className="h-6 w-6 text-ah-muted" />
        )}
      </div>
    );

    if (!reveal) {
      return <div className={avatarClassName}>{avatarContent}</div>;
    }

    return (
      <ImageReveal direction={revealDirection} className={avatarClassName}>
        {avatarContent}
      </ImageReveal>
    );
  }

  const FallbackIcon = Icon ?? (variant === "video" ? PlayIcon : ImageIcon);
  const mediaClassName = cn(
    "relative w-full rounded-xl border",
    aspectClasses[aspect],
    toneClasses[tone],
    className
  );
  const mediaContent = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <FallbackIcon className="h-7 w-7 text-ah-muted" />
      {label && (
        <span className="type-eyebrow px-4 text-center text-ah-muted">
          {label}
        </span>
      )}
    </div>
  );

  if (!reveal) {
    return <div className={mediaClassName}>{mediaContent}</div>;
  }

  return (
    <ImageReveal direction={revealDirection} className={mediaClassName}>
      {mediaContent}
    </ImageReveal>
  );
}
