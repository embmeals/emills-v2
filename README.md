# emills.net

[![CI / CD](https://github.com/embmeals/emills-v2/actions/workflows/deploy.yml/badge.svg)](https://github.com/embmeals/emills-v2/actions/workflows/deploy.yml)
[![Lighthouse Audit](https://github.com/embmeals/emills-v2/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/embmeals/emills-v2/actions/workflows/lighthouse.yml)
[![Link Check](https://github.com/embmeals/emills-v2/actions/workflows/link-check.yml/badge.svg)](https://github.com/embmeals/emills-v2/actions/workflows/link-check.yml)

![Angular](https://img.shields.io/badge/Angular-19-dd0031?logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06b6d4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222?logo=github&logoColor=white)

Personal portfolio for **Ember Mills** -- Senior Full-Stack Engineer, multi-disciplinary artist, and builder of things that glow in the dark.

**Live:** [www.emills.net](https://www.emills.net)

---

## Overview

A single-page portfolio with a dark cyberpunk aesthetic inspired by the Rocinante from *The Expanse*. Neon cyan and magenta accents, particle backgrounds, holographic effects, and a custom orbital skills visualization.

### Sections

| Section | Description |
|---------|-------------|
| **Hero** | Protomolecule particle background with bezier-curved tendrils, crew manifest dev card with holographic shimmer |
| **About** | Background, philosophy, what drives the work |
| **Skills** | Interactive orbital SVG diagram with rotating dashed rings + list toggle view |
| **Projects** | Case study showcase with detail dialogs |
| **Experience** | Timeline with alternating layout |
| **Contact** | Reach out form |
| **Studio** | Folder-based art gallery -- mixed media collages, film photography, screenprints, stained glass |

### Studio

The gallery is organized into five folders: **Ember** (collages), **Casey** (collages), **Film** (photography), **Screenprint** (apparel), and **Stained Glass**. All artwork is physical -- collages are handmade with mixed media from printed books, scanned on an Epson scanner. Photography is shot on film. Screenprints are pulled by hand.

Images are optimized to 1000px max width, JPEG 82% quality, with a centered `emills.net` watermark. A lightbox with keyboard navigation (arrow keys, escape) handles fullscreen viewing.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 19 (standalone components, signals, OnPush change detection) |
| UI Library | Zard UI (@ngzard/ui) |
| Styling | TailwindCSS v4 with custom dark neon theme |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (build, test, deploy, Lighthouse, link check) |
| Dependency mgmt | Dependabot with auto-merge for minor/patch updates |

## Accessibility

- ARIA attributes and roles throughout
- Keyboard navigation (lightbox, menus, skip link)
- `prefers-reduced-motion` support -- disables particle animation, loading effects, and scan lines
- Semantic HTML structure

## Development

```bash
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200).

## Testing

```bash
ng test                              # unit tests (100 specs)
ng test --watch=false --code-coverage # with coverage report
```

## Deployment

Push to `main` triggers the full pipeline: type check, unit tests, build, and deploy to GitHub Pages. Dependabot PRs auto-merge when CI passes (minor/patch only).

Branches: `development` for work, merge to `main` to ship.
