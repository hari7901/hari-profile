import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { SocialIcon as SocialIconName } from "@/types";

const ICON_MAP: Record<SocialIconName, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
  location: MapPin,
};

interface SocialIconProps {
  name: SocialIconName;
  className?: string;
}

/**
 * Maps a semantic icon name to its Lucide component. Decouples data (string
 * names) from the icon library so swapping libraries touches one file.
 */
export function SocialIcon({ name, className }: SocialIconProps) {
  const Icon = ICON_MAP[name];
  return <Icon className={className} aria-hidden />;
}
