import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { SKILL_CATEGORIES, type SkillCategory } from '@/data/skills.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ZardCardComponent, ZardBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="skills-heading"
    >
      <h2
        id="skills-heading"
        class="text-3xl font-bold text-center mb-8 text-foreground"
        style="font-family: 'Montserrat', sans-serif"
      >
        Skills
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (category of categories; track category.name) {
          <z-card [zTitle]="category.name">
            <ul class="flex flex-wrap gap-2 list-none m-0 p-0" [attr.aria-label]="'Skills for ' + category.name">
              @for (skill of category.skills; track skill.name) {
                <li>
                  <z-badge zType="secondary" zShape="pill">
                    @if (skill.icon) {
                      <img [src]="skill.icon" [alt]="skill.name" loading="lazy" class="inline-block w-4 h-4 mr-1 -mt-0.5" (error)="onIconError($event)" />
                    }
                    {{ skill.name }}
                  </z-badge>
                </li>
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

  onIconError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (img) {
      img.style.display = 'none';
    }
  }
}
