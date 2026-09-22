import { PlaceholderMedia } from "@/components/common/PlaceholderMedia";
import { visualThemeIcon } from "@/components/sections/visual-theme";
import type { VisualTheme } from "@/data/types";

interface ServiceVisualProps {
  theme: VisualTheme;
  label: string;
}

const toneByTheme: Record<VisualTheme, "bg" | "accent" | "muted"> = {
  network: "accent",
  analytics: "muted",
  code: "bg",
  design: "muted",
  growth: "accent",
  brand: "bg",
  app: "muted",
};

export function ServiceVisual({ theme, label }: ServiceVisualProps) {
  const Icon = visualThemeIcon[theme];
  return <PlaceholderMedia aspect="square" icon={Icon} label={label} tone={toneByTheme[theme]} />;
}
