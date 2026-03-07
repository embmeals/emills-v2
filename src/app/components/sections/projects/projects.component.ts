import { Component, ChangeDetectionStrategy, computed, signal, inject } from '@angular/core';

import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardCardComponent } from '@/shared/components/card/card.component';
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
  imports: [ZardBadgeComponent, ZardButtonComponent, ZardCardComponent],
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

    .btn-cyber {
      background: #1e1e2e !important;
      border: 1px solid #1e1e2e !important;
      transition: border-color 0.2s, box-shadow 0.2s !important;
    }

    .btn-cyber:hover {
      box-shadow: 0 0 12px var(--btn-glow) !important;
      border-color: var(--btn-glow) !important;
    }
  `,
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
            z-button
            [zType]="activeFilter() === btn.value ? 'default' : 'ghost'"
            zSize="sm"
            [class]="activeFilter() === btn.value
              ? 'bg-[#00e5ff]! text-black! cursor-pointer'
              : 'text-[#e0e0e0]! border-[#1e1e2e]! hover:bg-[#1e1e2e]! cursor-pointer'"
            [attr.aria-pressed]="activeFilter() === btn.value"
            (click)="setFilter(btn.value)"
          >
            {{ btn.label }}
          </button>
        }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (project of filteredProjects(); track project.title) {
          <z-card [zTitle]="project.title" [zDescription]="project.description">
            <div class="flex flex-wrap gap-2 mb-4">
              @for (tech of project.techStack; track tech) {
                <z-badge zType="secondary" zShape="pill">{{ tech }}</z-badge>
              }
            </div>

            <div class="flex gap-3">
              @if ($any(project).githubUrl) {
                <a
                  z-button zType="ghost" zSize="sm"
                  [href]="$any(project).githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-cyber text-[#00e5ff]!"
                  style="--btn-glow: rgba(0, 229, 255, 0.5)"
                >
                  View on GitHub
                </a>
              }

              @if (project.type === 'public' && project.liveUrl) {
                <a
                  z-button zType="ghost" zSize="sm"
                  [href]="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-cyber text-[#ff2d7b]!"
                  style="--btn-glow: rgba(255, 45, 123, 0.5)"
                >
                  Live Demo
                </a>
              }

              @if (project.type === 'case-study') {
                <button
                  z-button zType="ghost" zSize="sm"
                  class="btn-cyber text-[#ffb300]! cursor-pointer"
                  style="--btn-glow: rgba(255, 179, 0, 0.5)"
                  (click)="openCaseStudy(project)"
                >
                  View Case Study
                </button>
              }
            </div>
          </z-card>
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
