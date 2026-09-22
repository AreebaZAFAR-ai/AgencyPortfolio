import {
  BarChart3Icon,
  BracesIcon,
  NetworkIcon,
  PaletteIcon,
  SmartphoneIcon,
  SwatchBookIcon,
  TrendingUpIcon,
} from "lucide-react";
import type { VisualTheme } from "@/data/types";

export const visualThemeIcon: Record<VisualTheme, typeof BracesIcon> = {
  code: BracesIcon,
  app: SmartphoneIcon,
  design: PaletteIcon,
  network: NetworkIcon,
  analytics: BarChart3Icon,
  growth: TrendingUpIcon,
  brand: SwatchBookIcon,
};

export const visualThemeLabel: Record<VisualTheme, string> = {
  code: "Engineering",
  app: "Product",
  design: "Design",
  network: "Network",
  analytics: "Analytics",
  growth: "Growth",
  brand: "Brand",
};
