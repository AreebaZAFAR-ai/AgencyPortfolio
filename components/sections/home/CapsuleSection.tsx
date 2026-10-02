import { ArrowUpRightIcon } from "lucide-react";
import { ScrollReveal } from "@/components/animations";
import { Button } from "@/components/common/Button";
import { LazyVideo } from "@/components/common/LazyVideo";

export function CapsuleSection() {
  return (
    <section id="capsule" className="grid min-h-[90vh] bg-surface text-text-primary md:grid-cols-2">
      <div className="flex items-center justify-center px-(--space-gutter) py-section text-center">
        <ScrollReveal as="div" y={24} className="flex flex-col items-center gap-(--space-lg)">
          <p className="type-eyebrow text-text-muted">Showreel</p>
          <h2 className="font-display text-h1">Built to perform</h2>
          <p className="max-w-sm text-body text-text-secondary">
            Websites, apps and systems with the noise taken out. What is left is speed, clarity and craft.
          </p>
          <Button href="/work" variant="outline" className="mt-(--space-md)" icon={<ArrowUpRightIcon className="size-4" />}>
            View our work
          </Button>
        </ScrollReveal>
      </div>

      {/* Video kept at its native 9:16 shape and never scaled past 720×1280, so it stays sharp. */}
      <div className="flex items-center justify-center px-(--space-gutter) pb-section md:py-(--space-3xl)">
        <LazyVideo
          src="/assets/videos/service1.mp4"
          aria-hidden="true"
          className="aspect-[9/16] h-auto max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
          width={720}
          height={1280}
        />
      </div>
    </section>
  );
}
