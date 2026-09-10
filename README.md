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

A single-page portfolio with a dark cyberpunk aesthetic inspired by the Rocinante from *The Expanse*. Neon cyan and magenta accents, holographic effects, and a custom flip-card dev profile.

### Sections

| Section | Description |
|---------|-------------|
| **Hero** | Name with animated shine effect, location, and a flip-card dev profile with stats, skills, and links |
| **Experience** | Career timeline |
| **Education** | Academic background |
| **Contact** | Reach out form |

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
ng test                              # unit tests (12 specs)
ng test --watch=false --code-coverage # with coverage report
```

## Deployment

Push to `main` triggers the full pipeline: type check, unit tests, build, and deploy to GitHub Pages. Dependabot PRs auto-merge when CI passes (minor/patch only).

Branches: `development` for work, merge to `main` to ship.
