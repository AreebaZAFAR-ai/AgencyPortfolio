"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  useInView,
  useReducedMotion,
} from "framer-motion";

import { ScrollReveal } from "@/components/animations";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { Button } from "@/components/common/Button";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { visualThemeIcon } from "@/components/sections/visual-theme";
import { cn } from "@/lib/utils";
import { useArrowMarquee } from "@/lib/use-arrow-marquee";
import { MarqueeArrows } from "@/components/common/MarqueeArrows";
import type { Project } from "@/data/types";

const EASE = [0.22, 1, 0.36, 1] as const;

// Full-page screenshot walkthrough duration.
const CARD_SCROLL_DURATION = 10;

// Different full-page screenshots may need slightly
// different travel distances depending on their height.
const CARD_TRAVEL: Record<string, string> = {
  modisch: "-78%",
  fitlat: "-68%",
  cakespot: "-82%",
  solarlink: "-75%",
  noctra: "-88%",
  orelle: "-88%",
  "aesthetic-clinic": "-86%",
};

// Keep screenshots at the full card width.
const CARD_WIDTH: Record<string, string> = {
  modisch: "100%",
  fitlat: "100%",
  cakespot: "100%",
  solarlink: "100%",
};

// Sites that refuse iframe embedding because of their own security headers.
const NON_EMBEDDABLE_SLUGS = new Set(["solarlink"]);

interface WorkShowcaseProps {
  projects: Project[];
  className?: string;

  /**
   * Homepage variant:
   * renders cards as a continuously auto-scrolling row.
   */
  autoScroll?: boolean;

  /**
   * Homepage variant:
   * pins one project on screen and flips to the next as the page scrolls.
   */
  flip?: boolean;
}

// Matches the sticky Header's h-20 -- the flip stage pins directly beneath it.
const HEADER_OFFSET = 80;

/**
 * Scroll-scrubbed entrance for grid cards: each card glides up,
 * un-tilts and scales into place in step with the (Lenis-smoothed)
 * scroll position. Right-column cards travel further so the two
 * columns settle at slightly different rates.
 */
function ScrollCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const offsetColumn = index % 2 === 1;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: offsetColumn ? 180 : 110,
          scale: 0.9,
          rotateX: 10,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: offsetColumn ? "top 55%" : "top 65%",
            scrub: 0.9,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={ref}
      className="origin-bottom will-change-transform transform-3d"
    >
      {children}
    </div>
  );
}

/**
 * True on devices that can't hover (phones, tablets). Defaults to
 * false so the server render matches desktop behaviour.
 */
function useNoHover() {
  const [noHover, setNoHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none)");
    const update = () => setNoHover(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return noHover;
}

interface ProjectCardProps {
  item: Project;
  index: number;
  itemKey: string;
  layout: "grid" | "marquee" | "flip";
  /** Flip layout: whether this card is the one currently facing the viewer. */
  active?: boolean;
  reduceMotion: boolean | null;
  onOpen: (index: number) => void;
}

function ProjectCard({
  item,
  index,
  itemKey,
  layout,
  active,
  reduceMotion,
  onOpen,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = visualThemeIcon[item.visualTheme];

  // Touch devices never fire hover, so play the walkthrough
  // while the card is mostly on screen instead.
  const cardRef = useRef<HTMLButtonElement>(null);
  const noHover = useNoHover();
  const inView = useInView(cardRef, { amount: 0.6 });
  // In the flip stack every card overlaps the viewport, so only the
  // card facing the viewer counts as "in view".
  const isPlaying = isHovered || (noHover && (active ?? inView));

  const card = (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={`Open the ${item.name} project walkthrough`}
      aria-haspopup="dialog"
      aria-hidden={active === false || undefined}
      tabIndex={active === false ? -1 : undefined}
      data-cursor="hover"
      className={cn(
        "group block overflow-hidden rounded-xl border border-surface bg-surface p-(--space-xs) text-left transition-transform duration-500 hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        "md:p-2.5",
        layout === "marquee"
          ? "w-[80vw] shrink-0 sm:w-[400px] lg:w-[520px]"
          : "w-full"
      )}
    >
      {/* Project image / full-page walkthrough */}
      <span className={cn("relative block w-full overflow-hidden rounded-lg bg-surface", layout === "flip" ? "aspect-video" : "aspect-16/11")}>
        {item.image ? (
          reduceMotion ? (
            /*
             * Reduced motion:
             * static image, no scrolling walkthrough.
             */
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

              {/*
               * Full-page screenshot walkthrough.
               *
               * The walkthrough plays while the card is hovered/focused
               * (or in view on touch devices), and the viewport (card) never
               * changes size -- the screenshot pans inside it.
               */}
              <motion.div
                initial={{ y: "0%" }}
                animate={
                  isPlaying
                    ? {
                        y: [
                          "0%",
                          CARD_TRAVEL[item.slug] ?? "-70%",
                          "0%",
                        ],
                        transition: {
                          duration: CARD_SCROLL_DURATION,
                          times: [0, 0.72, 1],
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 1.5,
                        },
                      }
                    : {
                        y: "0%",
                        transition: {
                          duration: 0.6,
                          ease: EASE,
                        },
                      }
                }
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
                  alt={`${item.name} full website walkthrough`}
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
      <span className="flex items-end justify-between gap-(--space-sm) px-1.5 pb-(--space-xs) pt-3.5 md:px-(--space-xs) md:pb-2.5 md:pt-(--space-md)">
        <span>
          <span className="block font-display text-body-lg text-text-primary">
            {item.name}
          </span>

          <span className="mt-0.5 block text-small text-text-secondary">
            {item.client}
          </span>
        </span>

        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors duration-300 group-hover:border-text-primary group-hover:bg-text-primary group-hover:text-background">
          <ArrowUpRightIcon
            className="size-3.5"
            aria-hidden="true"
          />
        </span>
      </span>
    </button>
  );

  if (layout === "marquee") {
    return <div key={itemKey}>{card}</div>;
  }

  if (layout === "flip") {
    return card;
  }

  return (
    <ScrollCard key={item.slug} index={index}>
      {card}
    </ScrollCard>
  );
}

export function WorkShowcase({
  projects,
  className,
  autoScroll = false,
  flip = false,
}: WorkShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [facingIndex, setFacingIndex] = useState(0);
  const flipRef = useRef<HTMLDivElement>(null);
  const [walkthroughKey, setWalkthroughKey] = useState(0);

  const reduceMotion = useReducedMotion();
  const {
    trackRef: marqueeTrackRef,
    scrollBy: scrollMarquee,
    hoverHandlers: marqueeHoverHandlers,
  } = useArrowMarquee(autoScroll ? projects.length : 0, 38, -1);

  const project =
    activeIndex === null ? null : projects[activeIndex];

  /*
   * Lock page scrolling while the project modal is open.
   */
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

  /*
   * Flip layout: the tall wrapper supplies the scroll distance while the
   * stage sticks under the header. Each step flips the current card away
   * on its horizontal axis and the next one in from below, then holds.
   */
  const useFlip = flip && !reduceMotion;

  useEffect(() => {
    const root = flipRef.current;
    if (!useFlip || !root) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-flip-card]", root);
      if (els.length < 2) return;

      gsap.set(els.slice(1), { rotateX: 90, autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { duration: 0.5 },
        scrollTrigger: {
          trigger: root,
          start: `top ${HEADER_OFFSET}px`,
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const next = Math.min(els.length - 1, Math.floor(self.progress * (els.length - 1) + 0.5));
            setFacingIndex((current) => (current === next ? current : next));
          },
        },
      });

      els.slice(0, -1).forEach((el, i) => {
        tl.to({}, { duration: 0.35 })
          .to(el, { rotateX: -90, autoAlpha: 0, scale: 0.92, ease: "power2.in" })
          .fromTo(
            els[i + 1],
            { rotateX: 90, autoAlpha: 0, scale: 0.92 },
            { rotateX: 0, autoAlpha: 1, scale: 1, ease: "power2.out" }
          )
          .to({}, { duration: 0.35 });
      });
    }, root);

    return () => ctx.revert();
  }, [useFlip, projects.length]);

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

  /*
   * Homepage marquee duplicates the projects.
   */
  const displayItems = autoScroll
    ? [...projects, ...projects]
    : projects;

  const layout = autoScroll ? "marquee" : useFlip ? "flip" : "grid";

  const cards = displayItems.map((item, i) => {
    const index = autoScroll
      ? i % projects.length
      : i;

    return (
      <ProjectCard
        key={autoScroll ? `${item.slug}-${i}` : item.slug}
        item={item}
        index={index}
        itemKey={`${item.slug}-${i}`}
        layout={layout}
        active={layout === "flip" ? i === facingIndex : undefined}
        reduceMotion={reduceMotion}
        onOpen={openProject}
      />
    );
  });

  return (
    <>
      {/* Work cards */}
      {useFlip ? (
        <div
          ref={flipRef}
          className={cn("relative", className)}
          style={{ height: `${projects.length * 100}vh` }}
        >
          <div className="sticky top-(--header-height) flex h-[calc(100dvh-var(--header-height))] flex-col items-center justify-center gap-(--space-lg) px-(--space-gutter) perspective-[1600px]">
            {/* Width follows the viewport height so the whole card always fits on screen. */}
            <div
              className="relative transform-3d"
              style={{ width: "min(100%, 1280px, calc((100dvh - var(--header-height) - 9rem) * 16 / 9))" }}
            >
              {cards.map((card, i) => (
                <div
                  key={projects[i].slug}
                  data-flip-card
                  className={cn(
                    "will-change-transform backface-hidden",
                    i === 0 ? "relative" : "absolute inset-x-0 top-0",
                    i !== facingIndex && "pointer-events-none"
                  )}
                >
                  {card}
                </div>
              ))}
            </div>

            <p className="type-eyebrow tabular-nums text-text-muted" aria-live="polite">
              <span className="text-text-primary">{String(facingIndex + 1).padStart(2, "0")}</span>
              {" / "}
              {String(projects.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      ) : autoScroll ? (
        <ScrollReveal
          as="div"
          y={16}
          className={cn(
            "group overflow-hidden",
            className
          )}
        >
          <div
            ref={marqueeTrackRef}
            {...marqueeHoverHandlers}
            className="flex w-max items-center gap-(--space-md) will-change-transform md:gap-(--space-lg)">
            {cards}
          </div>
          <MarqueeArrows onScroll={scrollMarquee} label="projects" className="mt-(--space-xl)" />
        </ScrollReveal>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 gap-(--space-md) perspective-[1400px] sm:grid-cols-2 lg:grid-cols-2 md:gap-(--space-lg)",
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
            // Keep Lenis from scrolling the page behind the modal.
            data-lenis-prevent
            className="fixed inset-0 z-100 flex items-center justify-center bg-background/80 p-(--space-md) sm:p-(--space-xl)"
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
              className="flex h-[82vh] max-h-[720px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface text-text-primary shadow-2xl"
            >
              {/* Modal header */}
              <div className="flex shrink-0 items-center justify-between gap-(--space-md) border-b border-border-subtle px-(--space-md) py-(--space-sm) md:px-(--space-lg) md:py-(--space-md)">
                <div className="min-w-0">
                  <p className="type-eyebrow text-text-muted">
                    Project preview
                  </p>

                  <div className="mt-1 flex items-baseline gap-(--space-sm)">
                    <h3 className="truncate font-display text-body-lg text-text-primary">
                      {project.name}
                    </h3>

                    <p className="hidden text-small text-text-secondary sm:block">
                      {project.client}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close project walkthrough"
                  data-cursor="hover"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors hover:border-text-primary hover:bg-text-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary"
                >
                  <XIcon
                    className="size-5"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Browser bar */}
              <div className="flex h-9 shrink-0 items-center gap-(--space-xs) border-b border-border-subtle px-(--space-md) md:h-10 md:px-(--space-lg)">
                <span className="size-2.5 rounded-full bg-text-muted" />
                <span className="size-2.5 rounded-full bg-text-muted" />
                <span className="size-2.5 rounded-full bg-surface" />

                <span className="ml-(--space-sm) truncate rounded-full bg-surface px-(--space-md) py-1.5 text-small text-text-secondary">
                  {project.liveUrl
                    ? project.liveUrl.replace(
                        /^https?:\/\/+/,
                        ""
                      )
                    : `ahgrowth.com/work/${project.slug}`}
                </span>
              </div>

              {/* Live preview */}
              <div className="relative min-h-0 flex-1 overflow-hidden bg-surface">
                {project.liveUrl &&
                !NON_EMBEDDABLE_SLUGS.has(
                  project.slug
                ) ? (
                  <iframe
                    key={`${project.slug}-${walkthroughKey}`}
                    src={project.liveUrl}
                    title={`${project.name} live preview`}
                    className="absolute inset-0 h-full w-full border-0 bg-surface"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    referrerPolicy="no-referrer"
                  />
                ) : project.liveUrl ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-(--space-md) p-(--space-xl) text-center">
                    <p className="max-w-sm text-small text-text-secondary">
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
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-(--space-sm) border-t border-border-subtle px-(--space-md) py-(--space-sm) md:px-(--space-lg) md:py-(--space-md)">
                <div className="flex items-center gap-(--space-xs)">
                  <button
                    type="button"
                    onClick={() => moveProject(-1)}
                    aria-label="Show previous project"
                    data-cursor="hover"
                    className="flex size-9 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors hover:border-text-primary hover:bg-text-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary"
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
                    className="flex size-9 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors hover:border-text-primary hover:bg-text-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary"
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
                    className="flex size-9 items-center justify-center rounded-full border border-border-subtle text-text-primary transition-colors hover:border-text-primary hover:bg-text-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-secondary"
                  >
                    <RotateCcwIcon
                      className="size-4"
                      aria-hidden="true"
                    />
                  </button>

                  <span className="ml-1 text-small text-text-secondary">
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

                <div className="flex items-center gap-(--space-sm)">
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