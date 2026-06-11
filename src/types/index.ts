/**
 * Domain types for the portfolio.
 * Keeping types isolated lets components depend on abstractions (Interface
 * Segregation) rather than concrete data shapes scattered across the app.
 */

export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export type SocialIcon = "github" | "linkedin" | "mail" | "phone" | "location";

export interface Profile {
  name: string;
  roles: string[];
  tagline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  avatarUrl: string;
  socials: SocialLink[];
}

export interface SkillGroup {
  category: string;
  icon: string;
  items: string[];
}

export interface Achievement {
  text: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  blurb?: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectItem {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  accent: string;
  href?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  /** Lucide icon key (see Stats section icon map). */
  icon?: string;
  /** Accent hex used for the icon, number and fill bar. */
  accent?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  detail: string;
  period: string;
  location: string;
}
