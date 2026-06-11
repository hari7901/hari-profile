import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiFlutter,
  SiDart,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiOpenid,
  SiZod,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiCloudinary,
  SiGit,
  SiPostman,
  SiSelenium,
  SiEslint,
  SiNewrelic,
  SiHtml5,
  SiCss,
  SiCplusplus,
  SiStripe,
  SiAndroidstudio,
} from "react-icons/si";
import { Cloud, Code2, Database, Server, Wrench } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

interface TechMeta {
  Icon: Icon;
  /** Brand color used as accent. */
  color: string;
}

const TECH: Record<string, TechMeta> = {
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  python: { Icon: SiPython, color: "#3776AB" },
  react: { Icon: SiReact, color: "#61DAFB" },
  nextjs: { Icon: SiNextdotjs, color: "#15110d" },
  "next.js": { Icon: SiNextdotjs, color: "#15110d" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  tailwindcss: { Icon: SiTailwindcss, color: "#06B6D4" },
  shadcnui: { Icon: SiShadcnui, color: "#15110d" },
  "shadcn/ui": { Icon: SiShadcnui, color: "#15110d" },
  flutter: { Icon: SiFlutter, color: "#02569B" },
  dart: { Icon: SiDart, color: "#0175C2" },
  nodejs: { Icon: SiNodedotjs, color: "#5FA04E" },
  "node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  node: { Icon: SiNodedotjs, color: "#5FA04E" },
  express: { Icon: SiExpress, color: "#15110d" },
  "express.js": { Icon: SiExpress, color: "#15110d" },
  jwt: { Icon: SiJsonwebtokens, color: "#D63AFF" },
  rest: { Icon: Server, color: "#1d3fb8" },
  oauth: { Icon: SiOpenid, color: "#F78C40" },
  "oauth2.0": { Icon: SiOpenid, color: "#F78C40" },
  "oauth2.0/oidc": { Icon: SiOpenid, color: "#F78C40" },
  zod: { Icon: SiZod, color: "#3068B7" },
  // AWS-family icons not in this react-icons release — use cloud + ink color
  aws: { Icon: Cloud, color: "#FF9900" },
  awscloud: { Icon: Cloud, color: "#FF9900" },
  "aws cloud": { Icon: Cloud, color: "#FF9900" },
  lambda: { Icon: Cloud, color: "#FF9900" },
  "aws lambda": { Icon: Cloud, color: "#FF9900" },
  awslambda: { Icon: Cloud, color: "#FF9900" },
  sqs: { Icon: Cloud, color: "#FF4F8B" },
  cloudwatch: { Icon: Cloud, color: "#FF4F8B" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  mysql: { Icon: SiMysql, color: "#4479A1" },
  sql: { Icon: Database, color: "#1d3fb8" },
  firebase: { Icon: SiFirebase, color: "#DD2C00" },
  firestore: { Icon: SiFirebase, color: "#DD2C00" },
  cloudinary: { Icon: SiCloudinary, color: "#3448C5" },
  git: { Icon: SiGit, color: "#F05032" },
  postman: { Icon: SiPostman, color: "#FF6C37" },
  selenium: { Icon: SiSelenium, color: "#43B02A" },
  eslint: { Icon: SiEslint, color: "#4B32C3" },
  newrelic: { Icon: SiNewrelic, color: "#00AC69" },
  "new relic": { Icon: SiNewrelic, color: "#00AC69" },
  montiapm: { Icon: Wrench, color: "#1d3fb8" },
  "monti apm": { Icon: Wrench, color: "#1d3fb8" },
  androidstudio: { Icon: SiAndroidstudio, color: "#3DDC84" },
  "android studio": { Icon: SiAndroidstudio, color: "#3DDC84" },
  html5: { Icon: SiHtml5, color: "#E34F26" },
  css3: { Icon: SiCss, color: "#1572B6" },
  cplusplus: { Icon: SiCplusplus, color: "#00599C" },
  "c++": { Icon: SiCplusplus, color: "#00599C" },
  stripe: { Icon: SiStripe, color: "#635BFF" },
  microservices: { Icon: Server, color: "#e63322" },
  solid: { Icon: Code2, color: "#1d3fb8" },
  "full-stack": { Icon: Code2, color: "#e63322" },
  fullstack: { Icon: Code2, color: "#e63322" },
  pandas: { Icon: SiPython, color: "#150458" },
  regex: { Icon: Code2, color: "#15110d" },
};

const FALLBACK: TechMeta = { Icon: Code2, color: "#15110d" };

function normalize(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "").replace(/[._-]/g, "");
}

export function getTechMeta(name: string): TechMeta {
  return TECH[name.toLowerCase()] ?? TECH[normalize(name)] ?? FALLBACK;
}

interface TechIconProps {
  name: string;
  className?: string;
  /** Use the brand color (default true); otherwise inherit currentColor. */
  branded?: boolean;
}

/**
 * Renders the brand icon for a given tech name. Falls back to a generic
 * code-bracket if unknown.
 */
export function TechIcon({ name, className, branded = true }: TechIconProps) {
  const { Icon, color } = getTechMeta(name);
  return (
    <Icon
      className={cn("h-3.5 w-3.5", className)}
      style={branded ? { color } : undefined}
      aria-hidden
    />
  );
}
