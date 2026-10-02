
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { MagneticButton } from "@/components/animations";
import type { HeroContent, HeroVideo } from "@/data/types";

const EASE = [0.22, 1, 0.36, 1] as const;

interface HomeHeroProps {
  content: HeroContent;
  video: HeroVideo;
}

export function HomeHero({ content, video }: HomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle video zoom while scrolling
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Move hero content slightly downward during scroll
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Fade hero content while leaving the video visible
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-0 min-h-screen w-full overflow-hidden"
    >
      {/* =====================================================
          FULLSCREEN HERO VIDEO
          ===================================================== */}

      <motion.video
        style={
          reduceMotion
            ? undefined
            : {
                scale: mediaScale,
              }
        }
        className="absolute inset-x-0 -top-20 h-[calc(100%+5rem)] w-full object-cover"
        autoPlay={!reduceMotion}
        muted
        playsInline
        loop
        preload="auto"
        poster={video.poster}
        aria-hidden="true"
      >
        {video.mobileSrc && (
          <source src={video.mobileSrc} type="video/mp4" media="(max-width: 767px)" />
        )}
        <source src={video.src} type="video/mp4" />
      </motion.video>

      {/* =====================================================
          VIDEO OVERLAY
          ===================================================== */}

      <div className="absolute inset-x-0 -top-20 h-[calc(100%+5rem)] bg-background/40" />

      {/* =====================================================
          HERO CONTENT
          ===================================================== */}

      <motion.div
        style={
          reduceMotion
            ? undefined
            : {
                y: copyY,
                opacity: copyOpacity,
              }
        }
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          pt-(--header-height)
          text-center
          text-text-primary
        "
      >
        <Container className="flex w-full flex-col items-center">
          {/* =================================================
              HEADING
              ================================================= */}

          <motion.div
            initial={
              reduceMotion
                ? undefined
                : {
                    clipPath: "inset(0 0 100% 0)",
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    clipPath: "inset(0 0 0% 0)",
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 1.15,
              ease: EASE,
              delay: reduceMotion ? 0 : 0.25,
            }}
          >
            <h1 className="flex flex-col items-center gap-[0.45em] font-display text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
              {content.heading.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </motion.div>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <motion.p
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.75,
            }}
            className="
              mt-(--space-xl)
              max-w-xl
              text-balance
              text-body-lg
              text-white
            "
          >
            {content.description}
          </motion.p>

          {/* =================================================
              CTA BUTTONS
              ================================================= */}

          {(content.primaryCta || content.secondaryCta) && (
            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: reduceMotion ? 0 : 0.9,
              }}
              className="
                mt-(--space-2xl)
                flex
                flex-wrap
                justify-center
                gap-(--space-sm)
              "
            >
              {/* PRIMARY CTA */}

              {content.primaryCta && (
                <MagneticButton>
                  <Button
                    href={content.primaryCta.href}
                    size="lg"
                  >
                    {content.primaryCta.label}
                  </Button>
                </MagneticButton>
              )}

              {/* SECONDARY CTA */}

              {content.secondaryCta && (
                <MagneticButton>
                  <Button
                    href={content.secondaryCta.href}
                    variant="outline"
                    size="lg"
                    className="border-text-muted"
                  >
                    {content.secondaryCta.label}
                  </Button>
                </MagneticButton>
              )}
            </motion.div>
          )}
        </Container>
      </motion.div>

      {/* =====================================================
          BOTTOM LABEL
          ===================================================== */}

      <Container className="absolute inset-x-0 bottom-(--space-xl) z-10 flex justify-end">
        <span className="type-eyebrow text-text-muted">Software &amp; digital agency</span>
      </Container>
    </section>
  );
}
