import { Component, ChangeDetectionStrategy, computed, signal, inject } from '@angular/core';

import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardDialogService, ZardDialogOptions } from '@/shared/components/dialog';
import { PROJECTS, type Project, type ProjectType } from '@/data/projects.data';
import { ProjectDialogComponent } from './project-dialog.component';

type FilterOption = 'all' | 'public' | 'case-study';

interface FilterButton {
  readonly label: string;
  readonly value: FilterOption;
}

const FILTER_BUTTONS: readonly FilterButton[] = [
  { label: 'All', value: 'all' },
  { label: 'Public', value: 'public' },
  { label: 'Case Studies', value: 'case-study' },
] as const;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ZardBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        class="text-3xl font-bold text-center mb-12 text-[#e0e0e0]"
        style="font-family: 'Montserrat', sans-serif"
      >
        Projects
      </h2>

      <div class="flex justify-center gap-3 mb-10">
        @for (btn of filterButtons; track btn.value) {
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            [class]="activeFilter() === btn.value
              ? 'bg-[#00e5ff] text-black'
              : 'bg-[#14141f] text-[#e0e0e0] border border-[#1e1e2e] hover:border-[#00e5ff]/50'"
            [attr.aria-pressed]="activeFilter() === btn.value"
            (click)="setFilter(btn.value)"
          >
            {{ btn.label }}
          </button>
        }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (project of filteredProjects(); track project.title) {
          <div
            class="bg-[#14141f] rounded-xl border border-[#1e1e2e] p-6 transition-all duration-300"
            [class.hover:glow-cyan]="project.type === 'public'"
            [class.hover:glow-amber]="project.type === 'case-study'"
          >
            <h3
              class="text-lg font-semibold mb-2 text-[#e0e0e0]"
              style="font-family: 'Montserrat', sans-serif"
            >
              {{ project.title }}
            </h3>

            <p class="text-sm text-[#a0a0b0] mb-4 line-clamp-2">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              @for (tech of project.techStack; track tech) {
                <z-badge zType="secondary" zShape="pill">{{ tech }}</z-badge>
              }
            </div>

            <div class="flex gap-3">
              @if ($any(project).githubUrl) {
                <a
                  [href]="$any(project).githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-[#1e1e2e] text-neon-cyan border border-[#1e1e2e] hover:border-[#00e5ff]/50 transition-colors duration-200"
                >
                  View on GitHub
                </a>
              }

              @if (project.type === 'public' && project.liveUrl) {
                <a
                  [href]="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-[#1e1e2e] text-neon-magenta border border-[#1e1e2e] hover:border-[#ff2d7b]/50 transition-colors duration-200"
                >
                  Live Demo
                </a>
              }

              @if (project.type === 'case-study') {
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-[#1e1e2e] text-neon-amber border border-[#1e1e2e] hover:border-[#ffb300]/50 transition-colors duration-200"
                  (click)="openCaseStudy(project)"
                >
                  View Case Study
                </button>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  private readonly dialogService = inject(ZardDialogService);

  readonly filterButtons = FILTER_BUTTONS;
  readonly activeFilter = signal<FilterOption>('all');

  readonly filteredProjects = computed<readonly Project[]>(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return PROJECTS;
    }
    return PROJECTS.filter((p) => p.type === filter);
  });

  setFilter(value: FilterOption): void {
    this.activeFilter.set(value);
  }

  openCaseStudy(project: Project): void {
    if (project.type !== 'case-study') {
      return;
    }
    const options = new ZardDialogOptions();
    options.zTitle = project.title;
    options.zContent = ProjectDialogComponent;
    options.zData = project;
    options.zHideFooter = true;
    options.zWidth = '550px';
    options.zCustomClasses = 'bg-[#14141f] border-[#1e1e2e]';

    this.dialogService.create(options);
  }
}
