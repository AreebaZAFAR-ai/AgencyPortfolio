"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";

import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import {
  TextReveal,
  Parallax,
  MagneticButton,
} from "@/components/animations";
import { PixelImage } from "@/components/ui/pixel-image";
import { cn } from "@/lib/utils";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroBackgroundImage {
  src: string;
  alt: string;
  objectPosition?: string;
  fit?: "cover" | "contain";
  /** Renders via the same pixelated/grayscale-reveal treatment WordHero uses,
   * instead of a plain crisp image -- for source photos with baked-in text or
   * branding that reads better as a stylized texture than a literal photo. */
  pixelated?: boolean;
}

interface PageHeroProps {
  label?: string;
  heading?: string | string[];
  description?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  visual?: ReactNode;
  variant?: "home" | "inner";
  minHeightClass?: string;
  headingSplit?: "line" | "char";
  backgroundImage?: HeroBackgroundImage;
  /** Renders just the background layer with no foreground content -- a pure
   * banner. label/heading/description/CTAs/visual are ignored when set. */
  hideContent?: boolean;
}

const heroVideos = [
  "/assets/images/hero/hero_bg_video.mp4",
  "/assets/hero/hero_2.mp4",
];

export function PageHero({
  label,
  heading,
  description,
  primaryCta,
  secondaryCta,
  visual,
  variant = "inner",
  minHeightClass = "min-h-dvh",
  headingSplit = "line",
  backgroundImage,
  hideContent = false,
}: PageHeroProps) {
  const lines = heading ? (Array.isArray(heading) ? heading : [heading]) : [];

  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    if (backgroundImage) return;

    const firstVideo = videoRefs[0].current;

    if (firstVideo) {
      firstVideo.play().catch(() => {
        // Browser may block autoplay until interaction.
      });
    }

    const timer = window.setInterval(() => {
      setActiveVideo((current) => (current === 0 ? 1 : 0));
    }, 9000);

    return () => window.clearInterval(timer);
  }, [backgroundImage]);

  useEffect(() => {
    if (backgroundImage) return;

    const nextIndex = activeVideo === 0 ? 1 : 0;
    const nextVideo = videoRefs[nextIndex].current;

    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
  }, [activeVideo, backgroundImage]);

  return (
    <section
      className={cn(
        "relative isolate flex items-center overflow-hidden border-b border-ah-muted/10 pt-28 pb-16 md:pt-32",
        minHeightClass
      )}
    >
      {/* ===================================================== */}
      {/* BACKGROUND: image (when provided) or the default video */}
      {/* ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Background media drifts slower than the page scroll for depth. */}
        <Parallax speed={0.08} direction="up" className="absolute inset-x-0 -top-[8%] -bottom-[8%]">
          {backgroundImage ? (
            backgroundImage.pixelated ? (
              <PixelImage
                src={backgroundImage.src}
                customGrid={{ rows: 6, cols: 10 }}
                grayscaleAnimation
                loop
                className="absolute inset-0 h-full w-full md:h-full md:w-full"
                imageClassName="rounded-none"
              />
            ) : (
              <Image
                src={backgroundImage.src}
                alt={backgroundImage.alt}
                fill
                priority
                sizes="100vw"
                className={backgroundImage.fit === "contain" ? "object-contain" : "object-cover"}
                style={{ objectPosition: backgroundImage.objectPosition ?? "center" }}
              />
            )
          ) : (
            <>
              {/* Video 1 */}
              <video
                ref={videoRefs[0]}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-[1800ms] ease-in-out",
                  activeVideo === 0
                    ? "scale-100 opacity-100"
                    : "scale-110 opacity-0"
                )}
                src={heroVideos[0]}
                muted
                loop
                playsInline
                preload="auto"
              />

              {/* Video 2 */}
              <video
                ref={videoRefs[1]}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-[1800ms] ease-in-out",
                  activeVideo === 1
                    ? "scale-100 opacity-100"
                    : "scale-110 opacity-0"
                )}
                src={heroVideos[1]}
                muted
                loop
                playsInline
                preload="auto"
              />
            </>
          )}
        </Parallax>

        {/* ================================================= */}
        {/* SUBTLE VIGNETTE */}
        {/* ================================================= */}

        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b",
            backgroundImage
              ? "from-ah-bg/10 via-transparent to-ah-bg/40"
              : "from-transparent via-transparent to-ah-ink/5"
          )}
        />

        {/* ================================================= */}
        {/* GRAIN */}
        {/* ================================================= */}

        <div
          className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}

      {!hideContent && (
      <div className="relative z-10 w-full">
        <Container>
          <div
            className={cn(
              "grid items-center gap-12",
              variant === "home"
                ? "lg:grid-cols-[1.1fr_0.9fr]"
                : "lg:grid-cols-[1fr_0.7fr]"
            )}
          >
            {/* ================================================= */}
            {/* TEXT */}
            {/* ================================================= */}

            <div className="flex flex-col gap-6">
              <TextReveal
                as="span"
                className="type-eyebrow text-ah-muted"
              >
                {label}
              </TextReveal>

              <h1 className="font-heading text-hero text-ah-ink">
                {lines.map((line, index) => (
                  <TextReveal
                    as="span"
                    key={index}
                    className="block"
                    splitBy={headingSplit}
                  >
                    {line}
                  </TextReveal>
                ))}
              </h1>

              <p className="max-w-lg text-body-lg text-ah-muted">
                {description}
              </p>

              {(primaryCta || secondaryCta) && (
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  {primaryCta && (
                    <MagneticButton>
                      <Button
                        href={primaryCta.href}
                        size="lg"
                        icon={
                          <ArrowUpRightIcon className="h-4 w-4" />
                        }
                      >
                        {primaryCta.label}
                      </Button>
                    </MagneticButton>
                  )}

                  {secondaryCta && (
                    <MagneticButton>
                      <Button
                        href={secondaryCta.href}
                        variant="outline"
                        size="lg"
                      >
                        {secondaryCta.label}
                      </Button>
                    </MagneticButton>
                  )}
                </div>
              )}
            </div>

            {/* ================================================= */}
            {/* RIGHT VISUAL */}
            {/* ================================================= */}

            <div className="hidden lg:block">
              <Parallax speed={0.15} direction="up">
                {visual}
              </Parallax>
            </div>
          </div>
        </Container>
      </div>
      )}
    </section>
  );
}
