"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { ScrollReveal } from "@/components/animations";
import { Button } from "@/components/common/Button";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { visualThemeIcon } from "@/components/sections/visual-theme";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const CARD_SCROLL_DURATION = 15;

// Sites that refuse iframe embedding because of their own security headers.
const NON_EMBEDDABLE_SLUGS = new Set(["solarlink"]);

// Screenshot sizing for project walkthrough cards.
const CARD_WIDTH: Record<string, string> = {
  modisch: "106%",
  fitlat: "100%",
  cakespot: "165%",
  solarlink: "190%",
};

const CARD_TRAVEL: Record<string, string> = {
  modisch: "-11%",
  fitlat: "-22%",
  cakespot: "-11%",
  solarlink: "-11%",
};

interface WorkShowcaseProps {
  projects: Project[];
  className?: string;

  /**
   * Homepage variant:
   * renders cards as a continuously auto-scrolling row.
   */
  autoScroll?: boolean;
}

export function WorkShowcase({
  projects,
  className,
  autoScroll = false,
}: WorkShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [walkthroughKey, setWalkthroughKey] = useState(0);

  const reduceMotion = useReducedMotion();

  const project =
    activeIndex === null ? null : projects[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current + 1) % projects.length
        );

        setWalkthroughKey((current) => current + 1);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current - 1 + projects.length) %
              projects.length
        );

        setWalkthroughKey((current) => current + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, projects.length]);

  const openProject = (index: number) => {
    setActiveIndex(index);
    setWalkthroughKey((current) => current + 1);
  };

  const moveProject = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      if (current === null) return 0;

      return (
        (current + direction + projects.length) %
        projects.length
      );
    });

    setWalkthroughKey((current) => current + 1);
  };

  const displayItems = autoScroll
    ? [...projects, ...projects]
    : projects;

  const cards = displayItems.map((item, i) => {
    const index = autoScroll
      ? i % projects.length
      : i;

    const Icon = visualThemeIcon[item.visualTheme];

    const card = (
      <button
        type="button"
        onClick={() => openProject(index)}
        aria-label={`Open the ${item.name} project walkthrough`}
        aria-haspopup="dialog"
        data-cursor="hover"
        className={cn(
          "group block overflow-hidden rounded-xl border border-ah-border bg-ah-surface p-2 text-left transition-transform duration-500 hover:-translate-y-1",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ah-accent/60 focus-visible:ring-offset-4 focus-visible:ring-offset-ah-bg",
          "md:p-2.5",

          autoScroll
            ? "w-[460px] shrink-0 sm:w-[400px] lg:w-[520px]"
            : "w-full"
        )}
      >
        {/* Project image */}
        <span className="relative block aspect-16/11 w-full overflow-hidden rounded-lg bg-ah-ink/4">
          {item.image ? (
            autoScroll ? (
              <img
                src={item.image}
                alt={`${item.name} website project`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : (
              <>
                {/* Background blur */}
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-110 object-cover object-top opacity-30 blur-lg"
                />

                {/* Main screenshot */}
                <motion.div
                  initial="rest"
                  whileInView={
                    reduceMotion ? "rest" : "scroll"
                  }
                  viewport={{ amount: 0.35 }}
                  variants={{
                    rest: {
                      y: "0%",
                    },

                    scroll: {
                      y: [
                        "0%",
                        CARD_TRAVEL[item.slug] ?? "-11%",
                        "0%",
                      ],

                      transition: {
                        duration: CARD_SCROLL_DURATION,
                        times: [0, 0.68, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: index * 0.12,
                      },
                    },
                  }}
                  className="absolute top-0"
                  style={{
                    left: "50%",
                    x: "-50%",
                    width:
                      CARD_WIDTH[item.slug] ?? "100%",
                  }}
                >
                  <img
                    src={item.image}
                    alt={`${item.name} website project`}
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                </motion.div>
              </>
            )
          ) : (
            <PlaceholderMedia
              aspect="video"
              label={item.name}
              icon={Icon}
              reveal={false}
              className="absolute inset-0 h-full w-full"
            />
          )}
        </span>

        {/* Card information */}
        <span className="flex items-end justify-between gap-3 px-1.5 pb-2 pt-3.5 md:px-2 md:pb-2.5 md:pt-4">
          <span>
            <span className="block font-heading text-project-title text-ah-ink">
              {item.name}
            </span>

            <span className="mt-0.5 block text-caption text-ah-muted">
              {item.client}
            </span>
          </span>

          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ah-muted/30 text-ah-ink transition-colors duration-300 group-hover:border-ah-accent group-hover:bg-ah-accent group-hover:text-ah-bg">
            <ArrowUpRightIcon
              className="size-3.5"
              aria-hidden="true"
            />
          </span>
        </span>
      </button>
    );

    if (autoScroll) {
      return (
        <div key={`${item.slug}-${i}`}>
          {card}
        </div>
      );
    }

    return (
      <ScrollReveal
        key={item.slug}
        delay={index * 0.06}
      >
        {card}
      </ScrollReveal>
    );
  });

  return (
    <>
      {/* Work cards */}
      {autoScroll ? (
        <ScrollReveal
          as="div"
          y={16}
          className={cn(
            "group overflow-hidden",
            className
          )}
        >
          <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-4 motion-reduce:animate-none group-hover:[animation-play-state:paused] md:gap-5">
            {cards}
          </div>
        </ScrollReveal>
      ) : (
        <div
          className={cn(
            /*
             * Changed from 3 columns to 2 columns.
             * This increases card width without changing
             * the existing aspect ratio / height.
             */
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 md:gap-5",
            className
          )}
        >
          {cards}
        </div>
      )}

      {/* Project walkthrough modal */}
      <AnimatePresence>
        {project && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
            }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${project.name} project walkthrough`}
              onClick={(event) =>
                event.stopPropagation()
              }
              initial={{
                y: reduceMotion ? 0 : 24,
                scale: reduceMotion ? 1 : 0.96,
                opacity: 0,
              }}
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                y: reduceMotion ? 0 : 16,
                scale: reduceMotion ? 1 : 0.96,
                opacity: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                ease: EASE,
              }}
              className="flex h-[82vh] max-h-[720px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-ah-border bg-ah-surface text-ah-ink shadow-2xl"
            >
              {/* Modal header */}
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ah-border px-4 py-3 md:px-6 md:py-4">
                <div className="min-w-0">
                  <p className="type-eyebrow text-ah-muted">
                    Project preview
                  </p>

                  <div className="mt-1 flex items-baseline gap-3">
                    <h3 className="truncate font-heading text-project-title text-ah-ink">
                      {project.name}
                    </h3>

                    <p className="hidden text-caption text-ah-muted sm:block">
                      {project.client}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close project walkthrough"
                  data-cursor="hover"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ah-muted/30 text-ah-ink transition-colors hover:border-ah-ink hover:bg-ah-ink hover:text-ah-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ah-accent"
                >
                  <XIcon
                    className="size-5"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Browser bar */}
              <div className="flex h-9 shrink-0 items-center gap-2 border-b border-ah-border px-4 md:h-10 md:px-5">
                <span className="size-2.5 rounded-full bg-ah-muted/40" />
                <span className="size-2.5 rounded-full bg-ah-violet" />
                <span className="size-2.5 rounded-full bg-ah-accent" />

                <span className="ml-3 truncate rounded-full bg-ah-ink/6 px-4 py-1.5 text-caption text-ah-muted">
                  {project.liveUrl
                    ? project.liveUrl.replace(
                        /^https?:\/\/+/,
                        ""
                      )
                    : `ahgrowth.com/work/${project.slug}`}
                </span>
              </div>

              {/* Live preview */}
              <div className="relative min-h-0 flex-1 overflow-hidden bg-ah-ink/4">
                {project.liveUrl &&
                !NON_EMBEDDABLE_SLUGS.has(
                  project.slug
                ) ? (
                  <iframe
                    key={`${project.slug}-${walkthroughKey}`}
                    src={project.liveUrl}
                    title={`${project.name} live preview`}
                    className="absolute inset-0 h-full w-full border-0 bg-white"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    referrerPolicy="no-referrer"
                  />
                ) : project.liveUrl ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
                    <p className="max-w-sm text-body-sm text-ah-muted">
                      {project.name} blocks in-page
                      embedding for security reasons. Open it
                      in a new tab to explore the live site.
                    </p>

                    <Button
                      href={project.liveUrl}
                      external
                      size="sm"
                      icon={
                        <ArrowUpRightIcon
                          className="size-4"
                          aria-hidden="true"
                        />
                      }
                    >
                      Open live site
                    </Button>
                  </div>
                ) : (
                  <PlaceholderMedia
                    aspect="video"
                    label={project.name}
                    icon={
                      visualThemeIcon[
                        project.visualTheme
                      ]
                    }
                    reveal={false}
                    className="absolute inset-0 h-full w-full"
                  />
                )}
              </div>

              {/* Modal footer */}
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-ah-border px-4 py-3 md:px-6 md:py-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveProject(-1)}
                    aria-label="Show previous project"
                    data-cursor="hover"
                    className="flex size-9 items-center justify-center rounded-full border border-ah-muted/30 text-ah-ink transition-colors hover:border-ah-ink hover:bg-ah-ink hover:text-ah-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ah-accent"
                  >
                    <ArrowLeftIcon
                      className="size-4"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveProject(1)}
                    aria-label="Show next project"
                    data-cursor="hover"
                    className="flex size-9 items-center justify-center rounded-full border border-ah-muted/30 text-ah-ink transition-colors hover:border-ah-ink hover:bg-ah-ink hover:text-ah-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ah-accent"
                  >
                    <ArrowRightIcon
                      className="size-4"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setWalkthroughKey(
                        (current) => current + 1
                      )
                    }
                    aria-label="Reload preview"
                    data-cursor="hover"
                    className="flex size-9 items-center justify-center rounded-full border border-ah-muted/30 text-ah-ink transition-colors hover:border-ah-ink hover:bg-ah-ink hover:text-ah-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ah-accent"
                  >
                    <RotateCcwIcon
                      className="size-4"
                      aria-hidden="true"
                    />
                  </button>

                  <span className="ml-1 text-caption text-ah-muted">
                    {String(activeIndex + 1).padStart(
                      2,
                      "0"
                    )}{" "}
                    /{" "}
                    {String(projects.length).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    href={`/work/${project.slug}`}
                    variant="outline"
                    size="sm"
                  >
                    Case study
                  </Button>

                  {project.liveUrl && (
                    <Button
                      href={project.liveUrl}
                      external
                      size="sm"
                      icon={
                        <ArrowUpRightIcon
                          className="size-4"
                          aria-hidden="true"
                        />
                      }
                    >
                      Open live site
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}