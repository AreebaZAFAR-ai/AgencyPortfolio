import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { visualThemeIcon } from "@/components/sections/visual-theme";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/types";

// Only the fields the row renders.
export type ServiceRowData = Pick<
  Service,
  "slug" | "index" | "name" | "shortDescription" | "technologies" | "image" | "imageFit" | "visualTheme"
>;

interface ServiceRowProps {
  service: ServiceRowData;
  index: number;
}

export function ServiceRow({ service, index }: ServiceRowProps) {
  const reversed = index % 2 === 1;
  const Icon = visualThemeIcon[service.visualTheme];

  return (
    <div
      className={cn(
        "group/row grid items-center gap-(--space-2xl) lg:grid-cols-2 lg:gap-(--space-4xl)",
        reversed && "lg:[&>*:first-child]:order-2"
      )}
    >
      <div className="flex flex-col gap-(--space-lg)">
        <span className="type-eyebrow text-text-muted">{service.index}</span>
        <h3 className="font-display text-h2 text-text-primary">{service.name}</h3>
        <p className="max-w-xl text-body-lg text-text-secondary">
          {service.shortDescription}
        </p>
        <div className="flex flex-wrap gap-(--space-xs)">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-surface px-(--space-md) py-1.5 text-small text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/services/${service.slug}`}
          data-cursor="hover"
          className="mt-(--space-xs) inline-flex w-fit items-center gap-(--space-xs) text-small font-medium text-text-primary hover:text-text-secondary"
        >
          View service
          <ArrowUpRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl">
        {service.image ? (
          <div className="relative h-[50vh] w-full overflow-hidden rounded-xl bg-surface lg:h-[70vh]">
            {service.imageFit === "contain" ? (
              // Whole image visible, so no oversized drift layer; a blurred
              // copy fills the card behind it so there are no empty bars.
              <>
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="scale-110 object-cover blur-2xl"
                />
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                />
              </>
            ) : (
              /* Oversized layer kept so the image framing matches the original drift-centred crop. */
              <div className="absolute inset-x-0 -inset-y-[8%]">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
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
  );
}

