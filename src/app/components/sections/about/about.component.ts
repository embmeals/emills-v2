import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ABOUT_TEXT, FUN_FACTS } from '@/data/about.data';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="about-heading"
    >
      <h2
        id="about-heading"
        class="text-3xl font-bold text-neon-cyan mb-12"
        style="font-family: 'Montserrat', sans-serif"
      >
        About Me
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left column: About text -->
        <div class="flex flex-col gap-6">
          @for (paragraph of paragraphs; track $index) {
            <p class="text-foreground leading-relaxed text-base">
              {{ paragraph }}
            </p>
          }

          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg border border-neon-cyan text-neon-cyan font-medium text-sm transition-all duration-200 hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] w-fit"
          >
            View Resume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
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
        </div>

        <!-- Right column: Fun facts -->
        <div class="grid grid-cols-2 gap-4">
          @for (fact of funFacts; track fact.label) {
            <div
              class="bg-card rounded-lg p-4 border border-border flex flex-col items-center justify-center gap-2 text-center transition-colors duration-200"
              [class.hover:border-neon-cyan]="fact.color === 'cyan'"
              [class.hover:border-neon-magenta]="fact.color === 'magenta'"
              [class.hover:border-neon-amber]="fact.color === 'amber'"
            >
              <span class="text-3xl" role="img" [attr.aria-label]="fact.label">
                {{ fact.icon }}
              </span>
              <span class="text-sm text-foreground font-medium">
                {{ fact.label }}
              </span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  readonly paragraphs = ABOUT_TEXT.split('\n\n');
  readonly funFacts = FUN_FACTS;

}
