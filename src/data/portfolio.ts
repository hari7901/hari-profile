/**
 * Single source of truth for all portfolio content.
 *
 * Components read from this module instead of hardcoding copy, so the UI is
 * fully data-driven. Updating the resume = editing this one file.
 */
import type {
  EducationItem,
  ExperienceItem,
  NavItem,
  Profile,
  ProjectItem,
  SkillGroup,
  StatItem,
} from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const PROFILE: Profile = {
  name: "Hari Dass Sachdeva",
  roles: [
    "Full Stack Developer",
    "TypeScript Engineer",
    "Backend Architect",
    "Cloud & SaaS Engineer",
    "Problem Solver",
  ],
  tagline:
    "Full Stack Developer with 1+ year of professional experience, thriving in high-paced environments and shipping complex solutions under hard deadlines.",
  summary:
    "I've worked in fast-moving product teams where ambiguity is the norm and late-night deploys are expected. My edge is translating tangled requirements into clean architecture — 100+ REST APIs, serverless billing pipelines, and multi-million-record query optimisations — all shipped on schedule without cutting corners on quality.",
  location: "Gurugram, India",
  email: "hariwork79@gmail.com",
  phone: "+91 70094 19095",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/hari.png",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/hari7901",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hari-dass-sachdeva-3b5991274/",
      icon: "linkedin",
    },
    {
      label: "hariwork79@gmail.com",
      href: "mailto:hariwork79@gmail.com",
      icon: "mail",
    },
    {
      label: "+91 70094 19095",
      href: "tel:+917009419095",
      icon: "phone",
    },
  ],
};

export const STATS: StatItem[] = [
  {
    value: 1,
    suffix: "+",
    label: "Year of professional experience",
    icon: "building",
    accent: "#7c5cff",
  },
  {
    value: 100,
    suffix: "+",
    label: "REST APIs architected",
    icon: "network",
    accent: "#22d3ee",
  },
  {
    value: 250,
    suffix: "+",
    label: "DSA problems solved",
    icon: "brain",
    accent: "#a3e635",
  },
  {
    value: 40,
    suffix: "%",
    label: "Cut in manual processing time",
    icon: "zap",
    accent: "#f472b6",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    icon: "code",
    items: ["C++", "Python", "JavaScript", "TypeScript", "Dart", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frameworks & Frontend",
    icon: "layout",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Flutter"],
  },
  {
    category: "Backend & APIs",
    icon: "server",
    items: ["Node.js", "Express.js", "REST", "JWT", "OAuth 2.0 / OIDC", "Zod"],
  },
  {
    category: "Cloud & Data",
    icon: "cloud",
    items: ["AWS", "Lambda", "SQS", "CloudWatch", "MongoDB", "MySQL", "Firebase", "Cloudinary"],
  },
  {
    category: "Tooling & DevEx",
    icon: "wrench",
    items: ["Git", "Postman", "Selenium", "ESLint", "New Relic", "Monti APM", "Android Studio"],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "QuickReply",
    role: "Full Stack Developer",
    period: "May 2025 — Present",
    location: "Gurugram, India",
    blurb: "B2B SaaS platform for WhatsApp marketing automation serving 300+ active companies.",
    highlights: [
      "Led migration of a core service from a Meteor.js monolith to a Node.js/TypeScript microservice with a React frontend — architecting 100+ REST APIs across 60+ modules with strict typing, standardized error handling and well-defined service boundaries.",
      "Built reusable domain-driven backend modules (entity → repository → service → controller) enabling safe partial DB updates, internal microservice proxying and Stripe payments, following SOLID principles and Result-type error handling.",
      "Engineered a provider-agnostic OAuth 2.0 / OpenID Connect SSO system with configurable provider mapping, nonce-based CSRF-safe state handling and partner-scoped login orchestration.",
      "Designed a serverless AWS billing pipeline using SQS-triggered Lambda, processing daily settlements for 1,000+ customers with idempotent execution via MongoDB deduplication and CloudWatch monitoring.",
      "Optimized broadcast campaign queries on millions of records — 3× faster responses and 50% shorter QA validation cycles.",
      "Enhanced workflow Wait Nodes with dynamic scheduling and type-safe Zod validation, cutting configuration errors by 40%.",
    ],
    stack: ["Node.js", "TypeScript", "React", "AWS Lambda", "SQS", "MongoDB", "Stripe"],
  },
  {
    company: "GetCopayHelp",
    role: "Software Engineer",
    period: "Jan 2025 — May 2025",
    location: "Bangalore, India",
    highlights: [
      "Automated copay enrollment with Selenium (undetected_chromedriver), cutting manual effort by 35% across 10+ scenarios.",
      "Scraped infusion center data with multi-selector logic, ActionChains and iframe CAPTCHA handling across 15+ pages.",
      "Engineered a Python/Pandas + regex pipeline to extract financial metrics from 200+ program descriptions, reducing manual processing time by 40%.",
    ],
    stack: ["Python", "Selenium", "Pandas", "Regex"],
  },
  {
    company: "DoodhSaathi",
    role: "Flutter App Developer",
    period: "Oct 2024 — Jan 2025",
    location: "Remote",
    highlights: [
      "Spearheaded the end-to-end build of an agri-tech app (e-commerce, cattle-health tracking, vet helpline), driving a 35% jump in sign-ups and reducing livestock mortality by 25%.",
      "Streamlined auth workflows and overhauled performance — 50% faster app speed and 40% smaller package size via Provider & Firestore.",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Firestore"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    name: "Use AI",
    tagline: "AI-powered image editor",
    description:
      "An AI-driven image editor that automates background removal and smart edits, cutting edit time by 80%.",
    highlights: [
      "Automated background removal — 80% faster edits",
      "Responsive shadcn/ui component system",
      "Secure auth middleware, 100% best-practice compliance",
    ],
    stack: ["Next.js", "React", "Tailwind", "Cloudinary"],
    accent: "#7c5cff",
  },
  {
    name: "SmartMail AI",
    tagline: "Intelligent mail automation API",
    description:
      "A high-throughput mail platform with analytics, OAuth Gmail integration and bulk mail-merge built for scale.",
    highlights: [
      "Dual-token JWT + OAuth 2.0 Gmail for 1,000+ concurrent users",
      "Gmail analytics over 10,000+ emails in under 2 seconds",
      "Mail-merge system: 25MB uploads, 15+ endpoints, 99.9% uptime",
    ],
    stack: ["Node.js", "Express", "MongoDB", "JWT", "OAuth 2.0"],
    accent: "#22d3ee",
  },
];

export const EDUCATION: EducationItem = {
  institution: "Thapar Institute of Engineering and Technology",
  degree: "B.Tech — Electronics and Computers",
  detail: "CGPA: 7.67",
  period: "Aug 2021 — Jun 2025",
  location: "Patiala, India",
};

export const NOW_BUILDING =
  "Shipping production-grade systems under real deadlines at QuickReply — currently deep in microservices & serverless infra.";
