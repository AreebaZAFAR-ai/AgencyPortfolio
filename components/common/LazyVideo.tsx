"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

type LazyVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "preload"> & {
  src: string;
};

/**
 * Muted looping video that only downloads once it nears the viewport,
 * and pauses while off-screen so below-the-fold videos don't slow the page.
 */
export function LazyVideo({ src, ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={ref} muted loop playsInline preload="none" {...props} />;
}
