# emills.net

Personal portfolio for **Ember Mills** — Senior Full-Stack Engineer.

**Live:** [www.emills.net](https://www.emills.net)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 19 (standalone components, signals, OnPush) |
| UI Library | Zard UI (@ngzard/ui) |
| Styling | TailwindCSS v4 with custom dark neon theme |
| Hosting | GitHub Pages via GitHub Actions CI/CD |

## Features

- **Protomolecule particle background** — organic tendrils with bezier-curved connections, pulsing node particles, and chaotic drift (inspired by The Expanse)
- **Crew manifest dev card** — Rocinante-themed holographic ID with scanlines, shimmer, and floating animation
- Project showcase with case study dialogs
- Experience timeline with alternating layout
- Art gallery with lightbox viewer
- Accessibility-minded — ARIA attributes, keyboard navigation, reduced-motion support
- Responsive design (mobile-first)

## Development

```bash
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200).

## Testing

```bash
ng test
```

## Deployment

Merging to `main` triggers automatic deployment to GitHub Pages via GitHub Actions.
