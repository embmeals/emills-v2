# emills-v2 — Portfolio Coding Conventions

Angular 19 personal portfolio. Tailwind CSS v4, standalone components, `class-variance-authority` for variants, `lucide-angular` + `developer-icons` for icons. Tests: Karma + Jasmine.

## Components
- Standalone components (Angular 19). No NgModules. Declare imports in the `@Component` `imports` array.
- One component per file. Keep templates focused; extract sub-components when a template grows past a screen.
- Prefer signals and modern control flow (`@if`, `@for`) over `*ngIf`/`*ngFor`.

## Styling
- Tailwind v4 utility classes in templates. No separate CSS files unless unavoidable.
- Compose conditional classes with `clsx` + `tailwind-merge` (via the project's `cn()` helper if present). Do not hand-concatenate class strings.
- Component variants use `class-variance-authority` (cva), the shadcn pattern already in the codebase.

```typescript
import { cva } from 'class-variance-authority';

const badge = cva('rounded px-2 py-1 text-sm', {
  variants: { tone: { cyan: 'bg-cyan-500/10 text-cyan-300', pink: 'bg-pink-500/10 text-pink-300' } },
  defaultVariants: { tone: 'cyan' },
});
```

## Design system (established — match it)
- Dark slate base. Skill/tech badges use cyan accents. Project accents use pink.
- Icons: skill/tech icons via `developer-icons`; general UI icons via `lucide-angular`.
- Keep spacing and radii consistent with existing components; reuse, do not reinvent.

## Content voice (portfolio copy)
- Human, direct tone. No corporate fluff, no buzzword filler.
- Bullet lists: keep bullets roughly equal length and parallel in structure.
- NEVER fabricate metrics or claims (no invented "40% faster"). Only state what is real.

## Tests
- Karma + Jasmine. Spec files colocated (`*.spec.ts`).
- Test component behavior and rendered output, not implementation details.

## Commands
- Dev: `ng serve`
- Build: `ng build`
- Test: `ng test`

## Never do
- No NgModules — standalone only.
- No fabricated experience/metrics in copy.
- No hand-built class strings — use cva/clsx.
