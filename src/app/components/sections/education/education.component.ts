import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface Credential {
  readonly name: string;
  readonly detail: string;
  readonly year: string;
}

interface CredentialGroup {
  readonly title: string;
  readonly accent: 'cyan' | 'pink';
  readonly entries: readonly Credential[];
}

@Component({
  selector: 'app-education',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .tab {
      font-family: 'Barlow Condensed', sans-serif;
      letter-spacing: 0.18em;
      border-bottom: 2px solid transparent;
      transition: color 0.25s, border-color 0.25s;
    }

    .tab:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    .tab.active.cyan {
      color: #4de8f0;
      border-bottom-color: #4de8f0;
      text-shadow: 0 0 12px rgba(77, 232, 240, 0.4);
    }

    .tab.active.pink {
      color: #ff3d7f;
      border-bottom-color: #ff3d7f;
      text-shadow: 0 0 12px rgba(255, 61, 127, 0.4);
    }

    .tab-strip {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .entry {
      border-left: 2px solid rgba(255, 255, 255, 0.1);
      transition: border-color 0.25s;
    }

    .entry.cyan:hover { border-left-color: #4de8f0; }
    .entry.pink:hover { border-left-color: #ff3d7f; }

    @keyframes panelIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .panel {
      animation: panelIn 0.35s ease-out both;
    }

    @media (prefers-reduced-motion: reduce) {
      .tab, .entry { transition: none; }
      .panel { animation: none; }
    }
  `,
  template: `
    <section
      class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="education-heading"
    >
      <h2
        id="education-heading"
        class="text-3xl font-bold text-center mb-8 text-foreground"
        style="font-family: 'Montserrat', sans-serif"
      >
        Education &amp; Certifications
      </h2>

      <div class="tab-strip flex justify-center gap-8 mb-8" role="tablist" aria-label="Credentials">
        @for (group of groups; track group.title; let i = $index) {
          <button
            type="button"
            role="tab"
            [id]="'tab-' + group.accent"
            [attr.aria-selected]="selected() === i"
            [attr.aria-controls]="'panel-' + group.accent"
            [attr.tabindex]="selected() === i ? 0 : -1"
            [class]="tabClasses(group, i)"
            (click)="select(i)"
            (keydown)="onTabKey($event)"
          >
            {{ group.title }}
          </button>
        }
      </div>

      @for (group of groups; track group.title; let i = $index) {
        @if (selected() === i) {
          <div
            class="panel"
            role="tabpanel"
            [id]="'panel-' + group.accent"
            [attr.aria-labelledby]="'tab-' + group.accent"
          >
            <ul class="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              @for (entry of group.entries; track entry.name) {
                <li [class]="'entry pl-4 ' + group.accent">
                  <p class="text-foreground font-semibold text-lg leading-snug">{{ entry.name }}</p>
                  @if (entry.detail) {
                    <p class="text-muted-foreground text-base mt-1">{{ entry.detail }}</p>
                  }
                  <p class="text-sm mt-1" style="color: #7a7a9a">{{ entry.year }}</p>
                </li>
              }
            </ul>
          </div>
        }
      }
    </section>
  `,
})
export class EducationComponent {
  readonly selected = signal(0);

  readonly groups: readonly CredentialGroup[] = [
    {
      title: 'Education',
      accent: 'cyan',
      entries: [
        {
          name: 'B.S. in Computer Science',
          detail: 'University of Missouri–St. Louis',
          year: 'Expected 2026',
        },
        {
          name: 'Associate of Applied Science',
          detail: 'St. Louis Community College',
          year: '2025',
        },
      ],
    },
    {
      title: 'Certifications',
      accent: 'pink',
      entries: [
        { name: 'Salesforce Administrator', detail: 'Essentials for Administrators', year: '2024' },
        { name: 'Full-Stack .NET Bootcamp', detail: 'Centriq Training', year: '2021–2022' },
      ],
    },
  ];

  select(index: number): void {
    this.selected.set(index);
  }

  tabClasses(group: CredentialGroup, index: number): string {
    const state = this.selected() === index ? 'active text-foreground' : 'text-muted-foreground';
    return `tab ${group.accent} ${state} text-sm font-bold uppercase pb-3 px-2 cursor-pointer`;
  }

  onTabKey(event: KeyboardEvent): void {
    const step = this.arrowStep(event.key);
    if (step === 0) {
      return;
    }

    event.preventDefault();
    const next = (this.selected() + step + this.groups.length) % this.groups.length;
    this.selected.set(next);
    this.focusTab(next);
  }

  private arrowStep(key: string): number {
    if (key === 'ArrowRight') {
      return 1;
    }
    return key === 'ArrowLeft' ? -1 : 0;
  }

  private focusTab(index: number): void {
    const id = `tab-${this.groups[index].accent}`;
    document.getElementById(id)?.focus();
  }
}
