"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { Project } from "@/data/types";
import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CaseStudyBlockProps {
  project: Project;
  reversed?: boolean;
}

export function CaseStudyBlock({
  project,
  reversed,
}: CaseStudyBlockProps) {
  const reduceMotion = useReducedMotion();

  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [scrollDistance, setScrollDistance] = useState(0);

  /*
   * Calculate the exact distance required to move
   * the full screenshot from top to bottom.
   */
  useEffect(() => {
    const calculateDistance = () => {
      const viewport = viewportRef.current;
      const image = imageRef.current;

      if (!viewport || !image) return;

      const viewportHeight = viewport.clientHeight;
      const imageHeight = image.getBoundingClientRect().height;

      const distance = Math.max(
        imageHeight - viewportHeight,
        0
      );

      setScrollDistance(distance);
    };

    calculateDistance();

    const resizeObserver = new ResizeObserver(
      calculateDistance
    );

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    if (imageRef.current) {
      resizeObserver.observe(imageRef.current);
    }

    window.addEventListener(
      "resize",
      calculateDistance
    );

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        calculateDistance
      );
    };
  }, [project.image]);

  return (
    <section className="border-b border-ah-muted/10 py-section-sm md:py-section">
      <Container>
        <div
          className={cn(
            "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
            reversed && "lg:[&>*:first-child]:order-2"
          )}
        >
          {/* Screenshot walkthrough */}
          <div
            ref={viewportRef}
            className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ah-ink/5"
          >
            {project.image && (
              <>
                {/* Background blur */}
                <img
                  src={project.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-110 object-cover object-top opacity-20 blur-xl"
                />

                {/* Actual full-page screenshot */}
                <motion.div
                  initial={{ y: 0 }}
                  whileInView={
                    reduceMotion || scrollDistance === 0
                      ? { y: 0 }
                      : {
                          y: [
                            0,
                            -scrollDistance,
                            0,
                          ],
                          transition: {
                            duration: 24,
                            times: [0, 0.72, 1],
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 2,
                          },
                        }
                  }
                  viewport={{
                    amount: 0.35,
                    once: false,
                  }}
                  className="absolute left-0 top-0 w-full"
                >
                  <img
                    ref={imageRef}
                    src={project.image}
                    alt={`${project.name} full website`}
                    loading="lazy"
                    className="block h-auto w-full"
                    onLoad={() => {
                      const viewport =
                        viewportRef.current;

                      const image =
                        imageRef.current;

                      if (!viewport || !image)
                        return;

                      const distance = Math.max(
                        image.getBoundingClientRect()
                          .height -
                          viewport.clientHeight,
                        0
                      );

                      setScrollDistance(distance);
                    }}
                  />
                </motion.div>
              </>
            )}
          </div>

          {/* Case study content */}
          <ScrollReveal
            as="div"
            className="flex flex-col gap-6"
          >
            <span className="type-eyebrow text-ah-muted">
              {project.client}
            </span>

            <h3 className="font-heading text-h1 text-ah-ink">
              {project.name}
            </h3>

            <p className="max-w-lg text-body text-ah-muted">
              {project.summary}
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <span className="type-eyebrow text-ah-muted">
                  Challenge
                </span>

                <p className="mt-1 text-body-sm text-ah-ink/85">
                  {project.challenge}
                </p>
              </div>

              <div>
                <span className="type-eyebrow text-ah-muted">
                  Solution
                </span>

                <p className="mt-1 text-body-sm text-ah-ink/85">
                  {project.solution}
                </p>
              </div>

              <div>
                <span className="type-eyebrow text-ah-muted">
                  Result
                </span>

                <p className="mt-1 text-body-sm text-ah-ink/85">
                  {project.results[0]?.label}:{" "}
                  {project.results[0]?.value}
                </p>
              </div>
            </div>

            <Link
              href={`/work/${project.slug}`}
              data-cursor="hover"
              className="inline-flex w-fit items-center gap-2 text-button text-ah-ink transition-colors hover:text-ah-muted"
            >
              View case study

              <ArrowUpRightIcon
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}