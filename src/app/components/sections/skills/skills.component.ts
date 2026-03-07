import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { SKILL_CATEGORIES, type SkillCategory } from '@/data/skills.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ZardCardComponent, ZardBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    z-card {
      background: #14141f;
      border-color: #1e1e2e;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    z-card:hover {
      border-color: rgba(0, 170, 255, 0.3);
      box-shadow: 0 0 20px rgba(0, 170, 255, 0.08);
    }
  `,
  template: `
    <section
      class="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="skills-heading"
    >
      <h2
        id="skills-heading"
        class="text-3xl font-bold text-center mb-2 text-[#e0e0e0]"
        style="font-family: 'Montserrat', sans-serif"
      >
        Skills & Technologies
      </h2>
      <p class="text-center text-[9px] tracking-[0.35em] uppercase text-[#00aaff]/30 mb-12" aria-hidden="true"
        style="font-family: 'Montserrat', sans-serif"
      >
        Ship Systems Online
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (category of categories; track category.name) {
          <z-card [zTitle]="category.name">
            <ul class="flex flex-wrap gap-2 list-none m-0 p-0" [attr.aria-label]="'Skills for ' + category.name">
              @for (skill of category.skills; track skill.name) {
                <li><z-badge zType="secondary" zShape="pill">{{ skill.name }}</z-badge></li>
              }
            </ul>
          </z-card>
        }
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly categories: readonly SkillCategory[] = SKILL_CATEGORIES;
}
