"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { visualThemeIcon } from "@/components/sections/visual-theme";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, isFinePointer } from "@/lib/motion-prefs";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/types";

type MaskDirection = "up" | "left" | "right";

const MASK_CLOSED: Record<MaskDirection, string> = {
  up: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};
const MASK_OPEN = "inset(0% 0% 0% 0%)";

interface ServiceRowProps {
  service: Service;
  index: number;
}

export function ServiceRow({ service, index }: ServiceRowProps) {
  const reversed = index % 2 === 1;
  const Icon = visualThemeIcon[service.visualTheme];

  const rowRef = useRef<HTMLDivElement>(null);
  const textOuterRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const imageOuterRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const imageScaleRef = useRef<HTMLDivElement>(null);
  const imageParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const textOuter = textOuterRef.current;
    const imageOuter = imageOuterRef.current;
    const imageMask = imageMaskRef.current;
    const imageScale = imageScaleRef.current;
    const imageParallax = imageParallaxRef.current;
    if (!row || !textOuter || !imageOuter || !imageMask || !imageScale || !imageParallax) return;

    if (prefersReducedMotion()) return;

    const textSign = reversed ? 1 : -1;
    const imageSign = reversed ? -1 : 1;
    const displacement = 90 + (index % 3) * 10;
    const scrubValue = 1.6 + (index % 3) * 0.2;
    const imageScaleFrom = index % 2 === 0 ? 1.05 : 1.07;
    const maskDirection: MaskDirection = reversed ? "left" : "right";

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({ isDesktop: "(min-width: 1024px)" }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        // Fixed, height-independent entrance window (anchored to the row's top
        // edge only) so a tall row still spends most of its on-screen time fully
        // settled and readable, instead of the entrance eating the whole row.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: row,
            start: "top 95%",
            end: "top 25%",
            scrub: scrubValue,
          },
        });

        tl.fromTo(
          textOuter,
          {
            x: isDesktop ? textSign * displacement : 0,
            y: isDesktop ? 0 : 36,
            opacity: 0,
            filter: "blur(3px)",
            scale: 0.97,
          },
          { x: 0, y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.6 },
          0
        );

        [numberRef.current, nameRef.current, descRef.current].forEach((el, i) => {
          if (!el) return;
          tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1 }, i * 0.14);
        });

        const pillEls = pillsRef.current ? Array.from(pillsRef.current.children) : [];
        if (pillEls.length) {
          tl.fromTo(pillEls, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.05 }, 0.4);
        }
        if (linkRef.current) {
          tl.fromTo(linkRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, 0.56);
        }

        tl.fromTo(
          imageOuter,
          {
            x: isDesktop ? imageSign * displacement : 0,
            y: isDesktop ? 0 : 36,
            opacity: 0,
            filter: "blur(3px)",
            scale: 0.97,
          },
          { x: 0, y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.6 },
          0
        );

        tl.fromTo(
          imageMask,
          { clipPath: MASK_CLOSED[isDesktop ? maskDirection : "up"] },
          { clipPath: MASK_OPEN, duration: 1.6 },
          0
        );

        tl.fromTo(imageScale, { scale: imageScaleFrom }, { scale: 1, duration: 1.6 }, 0);

        if (isDesktop && isFinePointer()) {
          const quickX = gsap.quickTo(imageParallax, "x", { duration: 0.6, ease: "power3.out" });
          const quickY = gsap.quickTo(imageParallax, "y", { duration: 0.6, ease: "power3.out" });

          const handleMouseMove = (event: MouseEvent) => {
            const rect = row.getBoundingClientRect();
            const relX = (event.clientX - rect.left) / rect.width - 0.5;
            const relY = (event.clientY - rect.top) / rect.height - 0.5;
            quickX(relX * 14);
            quickY(relY * 14);
          };

          const handleEnter = () => {
            gsap.to(imageScale, { scale: 1.03, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            gsap.to(nameRef.current, { x: 4, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          };

          const handleLeave = () => {
            gsap.to(imageScale, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            gsap.to(nameRef.current, { x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            quickX(0);
            quickY(0);
          };

          row.addEventListener("mousemove", handleMouseMove);
          row.addEventListener("mouseenter", handleEnter);
          row.addEventListener("mouseleave", handleLeave);

          return () => {
            row.removeEventListener("mousemove", handleMouseMove);
            row.removeEventListener("mouseenter", handleEnter);
            row.removeEventListener("mouseleave", handleLeave);
          };
        }

        return undefined;
      });
    }, row);

    return () => ctx.revert();
  }, [index, reversed]);

  return (
    <div
      ref={rowRef}
      className={cn(
        "group/row grid items-center gap-14 rounded-2xl transition-colors duration-500 hover:bg-ah-ink/2 lg:grid-cols-2 lg:gap-20",
        reversed && "lg:[&>*:first-child]:order-2"
      )}
    >
      <div ref={textOuterRef} className="flex flex-col gap-6">
        <span ref={numberRef} className="type-eyebrow text-ah-muted">
          {service.index}
        </span>
        <h3
          ref={nameRef}
          className="font-heading text-section-md text-ah-ink"
        >
          {service.name}
        </h3>
        <p ref={descRef} className="max-w-xl text-body-lg text-ah-muted">
          {service.shortDescription}
        </p>
        <div ref={pillsRef} className="flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-ah-muted/20 px-4 py-1.5 text-body-sm text-ah-muted transition-colors duration-300 group-hover/row:border-ah-ink/30 group-hover/row:bg-ah-ink/3"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          ref={linkRef}
          href={`/services/${service.slug}`}
          data-cursor="hover"
          className="group inline-flex w-fit items-center gap-2 text-button text-ah-ink hover:text-ah-muted"
        >
          View service
          <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>

      <div ref={imageOuterRef}>
        <div ref={imageMaskRef} className="overflow-hidden rounded-xl">
          <div ref={imageScaleRef}>
            <div ref={imageParallaxRef}>
              {service.image ? (
                <div className="relative h-[50vh] w-full overflow-hidden rounded-xl border border-ah-muted/15 lg:h-[70vh]">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderMedia
                  aspect="video"
                  label={service.name}
                  icon={Icon}
                  reveal={false}
                  className="aspect-auto h-[50vh] lg:h-[70vh]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

