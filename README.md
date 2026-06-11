# Hari Dass Sachdeva — Portfolio

A fast, animated, single-page portfolio built to give recruiters a clear, memorable picture of my work as a Full Stack Developer.

Live sections: **Hero → Stats → About → Skills → Experience → Projects → Contact**.

## ✨ Highlights

- **Motion-first UI** — scroll-reveal animations, magnetic buttons, 3D tilt project cards, animated counters, a cursor-following glow and a scroll progress bar (all via Framer Motion).
- **Fully data-driven** — every word of content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). Update your resume there and the whole site updates.
- **Accessible** — respects `prefers-reduced-motion`, keyboard-focusable, semantic landmarks.
- **Responsive** — designed mobile-first with a custom overlay nav.
- **Themeable** — a small design-token layer in `tailwind.config.js` drives colors, fonts and shadows.

## 🧱 Tech Stack

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Framework      | React 18 + TypeScript           |
| Build tool     | Vite 5                          |
| Styling        | Tailwind CSS                    |
| Animation      | Framer Motion                   |
| Icons          | lucide-react                    |
| Class merging  | clsx + tailwind-merge           |

## 🚀 Getting Started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## 🗂 Project Structure

The codebase follows SOLID principles — small, single-responsibility components composed together, with content and behavior cleanly separated.

```
src/
├── App.tsx                 # Root composition (orchestrates sections only)
├── main.tsx                # Entry point
├── index.css               # Global styles + design utilities
├── data/
│   └── portfolio.ts        # ← Single source of truth for all content
├── types/
│   └── index.ts            # Shared domain types (Interface Segregation)
├── lib/
│   ├── cn.ts               # Tailwind class merge helper
│   └── motion.ts           # Shared animation variants & easings (DRY)
├── hooks/
│   ├── useScrollSpy.ts     # Active-section tracking via IntersectionObserver
│   ├── useMediaQuery.ts    # Media query + reduced-motion hooks
│   └── useCountUp.ts       # Count-up animation on scroll-into-view
└── components/
    ├── ui/                 # Reusable, presentation-only primitives
    │   ├── Section.tsx
    │   ├── SectionHeading.tsx
    │   ├── Button.tsx       # Polymorphic <a>/<button> (Open/Closed)
    │   ├── Badge.tsx
    │   ├── SpotlightCard.tsx
    │   ├── Magnetic.tsx
    │   ├── AnimatedText.tsx
    │   ├── RotatingRoles.tsx
    │   └── SocialIcon.tsx   # Decouples icon library from data
    ├── layout/             # App chrome
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── Background.tsx
    │   ├── CursorGlow.tsx
    │   └── ScrollProgress.tsx
    └── sections/           # One file per page section
        ├── Hero.tsx
        ├── Stats.tsx
        ├── About.tsx
        ├── Skills.tsx
        ├── Experience.tsx
        ├── Projects.tsx
        └── Contact.tsx
```

## ✏️ Customizing

- **Content:** edit `src/data/portfolio.ts`.
- **Colors / fonts:** edit the `theme.extend` block in `tailwind.config.js`.
- **Résumé file:** replace `public/resume.pdf`.

---

Built with React, Tailwind CSS & Framer Motion.
