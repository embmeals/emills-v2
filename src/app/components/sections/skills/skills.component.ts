import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SKILL_CATEGORIES, type SkillCategory } from '@/data/skills.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="skills"
      class="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <h2
        class="text-3xl font-bold text-center mb-12 text-[#e0e0e0]"
        style="font-family: 'Montserrat', sans-serif"
      >
        Skills & Technologies
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (category of categories; track category.name) {
          <div
            class="bg-[#14141f] rounded-xl border border-[#1e1e2e] p-6 transition-all duration-300"
            [class.hover:glow-cyan]="category.color === 'cyan'"
            [class.hover:glow-magenta]="category.color === 'magenta'"
            [class.hover:glow-amber]="category.color === 'amber'"
          >
            <h3
              class="text-lg font-semibold mb-4"
              style="font-family: 'Montserrat', sans-serif"
              [class.text-neon-cyan]="category.color === 'cyan'"
              [class.text-neon-magenta]="category.color === 'magenta'"
              [class.text-neon-amber]="category.color === 'amber'"
            >
              {{ category.name }}
            </h3>

            <div class="flex flex-wrap gap-2">
              @for (skill of category.skills; track skill.name) {
                <span
                  class="bg-[#1e1e2e] rounded-full px-3 py-1 text-sm text-[#e0e0e0]"
                >
                  {{ skill.name }}
                </span>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly categories: readonly SkillCategory[] = SKILL_CATEGORIES;
}
