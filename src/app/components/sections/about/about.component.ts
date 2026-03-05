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
