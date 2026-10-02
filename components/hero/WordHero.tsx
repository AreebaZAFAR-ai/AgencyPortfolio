"use client";

import Image from "next/image";
import { PixelImage } from "@/components/ui/pixel-image";
import { VideoText } from "@/components/ui/video-text";
import { Parallax } from "@/components/animations";
import { cn } from "@/lib/utils";

interface WordHeroProps {
  title: string;
  /** Font size for the video-masked title, in vw units -- tune per word length. */
  fontSize?: number;
  /** Tailwind max-width class for the title's container -- widen for longer words. */
  maxWidthClass?: string;
  /** Photo background with a plain title, in place of the pixel image + video-masked title. */
  image?: {
    src: string;
    alt: string;
    position?: string;
    /** Looping muted background video; `src` becomes its poster frame. */
    video?: string;
    /** "center" puts the title in the middle of the photo instead of bottom-left. */
    titleAlign?: "bottom-left" | "center";
    /** "contain" shows the whole photo uncropped over a blurred copy of itself (default "cover"). */
    fit?: "cover" | "contain";
  };
}

export function WordHero({ title, fontSize = 9, maxWidthClass = "max-w-2xl", image }: WordHeroProps) {
  if (image) {
    const centered = image.titleAlign === "center";
    const contained = image.fit === "contain" && !image.video;

    return (
      <section
        className={cn(
          "relative isolate flex min-h-[90dvh] overflow-hidden",
          centered ? "items-center justify-center" : "items-end"
        )}
      >
        {/* Background drifts slower than the page scroll for depth. */}
        <Parallax speed={0.08} direction="up" className="pointer-events-none absolute inset-x-0 -top-[8%] -bottom-[8%] -z-20">
          {image.video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: image.position ?? "center" }}
              src={image.video}
              poster={image.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              className={cn("object-cover", contained && "scale-110 blur-2xl")}
              style={{ objectPosition: image.position ?? "center" }}
            />
          )}
        </Parallax>
        {/* Whole, uncropped photo on top of the blurred fill. */}
        {contained && (
          <Image
            src={image.src}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-contain"
          />
        )}
        {/* Scrim: even when the title is centred, darkest at the bottom otherwise. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10",
            centered
              ? "bg-background/45"
              : contained
                ? "bg-gradient-to-t from-background/85 via-background/15 to-transparent"
                : "bg-gradient-to-t from-background via-background/60 to-background/30"
          )}
        />

        <div
          className={cn(
            "mx-auto w-full max-w-(--container-max) px-(--space-gutter)",
            centered ? "text-center" : "pb-(--space-4xl)"
          )}
        >
          <h1 className={cn("font-display text-h1 uppercase text-text-primary", centered ? "mx-auto" : "max-w-5xl")}>
            {title}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate flex min-h-[90dvh] items-center justify-center overflow-hidden">
      {/* Background drifts slower than the page scroll for depth. */}
      <Parallax speed={0.08} direction="up" className="pointer-events-none absolute inset-x-0 -top-[8%] -bottom-[8%]">
        <PixelImage
          src="/assets/images/services/service_bg.jpeg"
          customGrid={{ rows: 6, cols: 10 }}
          grayscaleAnimation
          loop
          className="absolute inset-0 h-full w-full md:h-full md:w-full"
          imageClassName="rounded-none"
        />
      </Parallax>

      <div className="pointer-events-none absolute inset-x-0 bottom-[14%] z-10 flex justify-center px-(--space-gutter)">
        <div className={cn("h-[9vw] max-h-28 min-h-14 w-full", maxWidthClass)}>
          <VideoText src="https://cdn.magicui.design/ocean-small.webm" fontSize={fontSize} fontWeight="bold">
            {title}
          </VideoText>
        </div>
      </div>
    </section>
  );
}
