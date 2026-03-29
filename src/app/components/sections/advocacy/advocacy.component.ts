import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ADVOCACY_INTRO,
  ADVOCACY_POINTS,
  ADVOCACY_CLOSING,
  ADVOCACY_LINKS,
  FALSE_VICTORIES,
} from '@/data/advocacy.data';

@Component({
  selector: 'app-advocacy',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.7s ease-out both;
    }

    .point-card {
      background: rgba(20, 20, 31, 0.8);
      border: 1px solid #1e1e2e;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    .point-card:hover {
      border-color: var(--hover-color);
      box-shadow: 0 0 20px var(--hover-glow);
    }

    .resource-link {
      background: rgba(20, 20, 31, 0.6);
      border: 1px solid #1e1e2e;
      border-radius: 0.5rem;
      padding: 1rem 1.25rem;
      transition: border-color 0.3s, box-shadow 0.3s;
      text-decoration: none;
      display: block;
    }

    .resource-link:hover {
      border-color: rgba(0, 229, 255, 0.3);
      box-shadow: 0 0 15px rgba(0, 229, 255, 0.08);
    }

    .blockquote-bar {
      border-left: 3px solid #ff2d7b;
      padding-left: 1.25rem;
    }

    .false-victory {
      background: rgba(20, 20, 31, 0.6);
      border: 1px solid #1e1e2e;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: border-color 0.3s;
    }

    .false-victory:hover {
      border-color: rgba(255, 179, 0, 0.3);
    }

    .surface-label {
      display: inline-block;
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-fade-in-up { animation: none; }
    }
  `,
  template: `
    <section
      class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="advocacy-heading"
    >
      <h2
        id="advocacy-heading"
        class="text-3xl font-bold text-neon-cyan mb-4"
        style="font-family: 'Montserrat', sans-serif"
      >
        Advocacy
      </h2>

      <p class="text-sm tracking-widest uppercase text-neon-magenta mb-10" style="font-family: 'Montserrat', sans-serif">
        Defending Section 230 &amp; the Open Internet
      </p>

      <!-- Personal intro -->
      <div class="max-w-3xl mb-12">
        @for (paragraph of introParagraphs; track $index) {
          <p class="text-foreground leading-relaxed text-base mb-4 last:mb-0">
            {{ paragraph }}
          </p>
        }
      </div>

      <!-- Key points -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        @for (point of points; track point.heading) {
          <div
            class="point-card animate-fade-in-up"
            [style.--hover-color]="colorMap[point.color].border"
            [style.--hover-glow]="colorMap[point.color].glow"
          >
            <h3
              class="text-lg font-semibold mb-3"
              [class.text-neon-cyan]="point.color === 'cyan'"
              [class.text-neon-magenta]="point.color === 'magenta'"
              [class.text-neon-amber]="point.color === 'amber'"
              style="font-family: 'Montserrat', sans-serif"
            >
              {{ point.heading }}
            </h3>
            <p class="text-sm text-foreground/80 leading-relaxed">
              {{ point.body }}
            </p>
            @if (point.sources.length) {
              <div class="mt-3 flex flex-col gap-1">
                @for (source of point.sources; track source.url) {
                  <a
                    [href]="source.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs text-foreground/40 hover:text-neon-cyan transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    <svg class="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {{ source.label }}
                  </a>
                }
              </div>
            }
          </div>
        }
      </div>

      <!-- False victories -->
      <div class="mb-12">
        <h3
          class="text-sm font-semibold tracking-widest uppercase text-neon-amber mb-6"
        >
          False Victories
        </h3>
        <p class="text-foreground/60 text-sm mb-6 max-w-3xl">
          Not every headline that looks like progress is progress. Some of the most celebrated "wins" against Big Tech and police violence were co-opted before they started.
        </p>
        <div class="grid grid-cols-1 gap-6">
          @for (victory of falseVictories; track victory.heading) {
            <div class="false-victory animate-fade-in-up">
              <h4
                class="text-base font-semibold text-neon-amber mb-4"
                style="font-family: 'Montserrat', sans-serif"
              >
                {{ victory.heading }}
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span class="surface-label bg-emerald-900/40 text-emerald-400">The surface</span>
                  <p class="text-sm text-foreground/70 leading-relaxed">
                    {{ victory.surface }}
                  </p>
                  @if (victory.sources.length) {
                    <div class="mt-3 flex flex-col gap-1">
                      @for (source of victory.sources; track source.url) {
                        <a
                          [href]="source.url"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-xs text-foreground/40 hover:text-neon-cyan transition-colors duration-200 inline-flex items-center gap-1"
                        >
                          <svg class="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {{ source.label }}
                        </a>
                      }
                    </div>
                  }
                </div>
                <div>
                  <span class="surface-label bg-red-900/40 text-red-400">The reality</span>
                  <p class="text-sm text-foreground/70 leading-relaxed">
                    {{ victory.reality }}
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Closing statement -->
      <div class="max-w-3xl mb-12">
        <div class="blockquote-bar">
          @for (paragraph of closingParagraphs; track $index) {
            <p class="text-foreground leading-relaxed text-base mb-4 last:mb-0 italic">
              {{ paragraph }}
            </p>
          }
        </div>
      </div>

      <!-- Resources -->
      <div>
        <h3
          class="text-sm font-semibold tracking-widest uppercase text-neon-cyan mb-6"
        >
          Read More
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          @for (link of links; track link.label) {
            <a
              [href]="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="resource-link group"
            >
              <span class="text-sm font-medium text-foreground group-hover:text-neon-cyan transition-colors duration-200">
                {{ link.label }}
              </span>
              <span class="block text-xs text-foreground/50 mt-1">
                {{ link.description }}
              </span>
              <svg
                class="inline-block w-3.5 h-3.5 text-foreground/30 group-hover:text-neon-cyan mt-2 transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class AdvocacyComponent {
  readonly introParagraphs = ADVOCACY_INTRO.split('\n\n');
  readonly closingParagraphs = ADVOCACY_CLOSING.split('\n\n');
  readonly points = ADVOCACY_POINTS;
  readonly links = ADVOCACY_LINKS;
  readonly falseVictories = FALSE_VICTORIES;

  readonly colorMap = {
    cyan: { border: 'rgba(0, 229, 255, 0.4)', glow: 'rgba(0, 229, 255, 0.1)' },
    magenta: { border: 'rgba(255, 45, 123, 0.4)', glow: 'rgba(255, 45, 123, 0.1)' },
    amber: { border: 'rgba(255, 179, 0, 0.4)', glow: 'rgba(255, 179, 0, 0.1)' },
  } as const;
}
