"use client";

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
}

export function WordHero({ title, fontSize = 9, maxWidthClass = "max-w-2xl" }: WordHeroProps) {
  return (
    <section className="relative isolate flex min-h-[90dvh] items-center justify-center overflow-hidden border-b border-ah-muted/10">
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

      <div className="pointer-events-none absolute inset-x-0 bottom-[14%] z-10 flex justify-center px-6">
        <div className={cn("h-[9vw] max-h-28 min-h-14 w-full", maxWidthClass)}>
          <VideoText src="https://cdn.magicui.design/ocean-small.webm" fontSize={fontSize} fontWeight="bold">
            {title}
          </VideoText>
        </div>
      </div>
    </section>
  );
}
