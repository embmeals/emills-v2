import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import type { CaseStudyProject } from '@/data/projects.data';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [ZardBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <div>
        <h3
          class="text-neon-cyan text-sm font-semibold uppercase tracking-wide mb-2"
          style="font-family: 'Montserrat', sans-serif"
        >
          The Problem
        </h3>
        <p class="text-[#e0e0e0] text-sm leading-relaxed">
          {{ project.caseStudy.problem }}
        </p>
      </div>

      <div>
        <h3
          class="text-neon-cyan text-sm font-semibold uppercase tracking-wide mb-2"
          style="font-family: 'Montserrat', sans-serif"
        >
          The Approach
        </h3>
        <p class="text-[#e0e0e0] text-sm leading-relaxed">
          {{ project.caseStudy.approach }}
        </p>
      </div>

      <div>
        <h3
          class="text-neon-cyan text-sm font-semibold uppercase tracking-wide mb-2"
          style="font-family: 'Montserrat', sans-serif"
        >
          The Outcome
        </h3>
        <p class="text-[#e0e0e0] text-sm leading-relaxed">
          {{ project.caseStudy.outcome }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2 pt-2">
        @for (tech of project.techStack; track tech) {
          <z-badge zType="secondary" zShape="pill">{{ tech }}</z-badge>
        }
      </div>
    </div>
  `,
})
export class ProjectDialogComponent {
  readonly project: CaseStudyProject = inject(Z_MODAL_DATA);
}
