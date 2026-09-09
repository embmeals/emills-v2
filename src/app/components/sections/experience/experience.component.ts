import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EXPERIENCES, type Experience } from '@/data/experience.data';

interface Role extends Experience {
  readonly color: string;
  readonly glow: string;
}

const ROLE_COLORS = [
  { color: '#0e7490', glow: 'rgba(14, 116, 144, 0.5)' },
  { color: '#ff3d7f', glow: 'rgba(255, 61, 127, 0.5)' },
  { color: '#ffb300', glow: 'rgba(255, 179, 0, 0.5)' },
];

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    /* Connecting route line */
    .route {
      position: relative;
    }

    .route::before {
      content: '';
      position: absolute;
      top: 1.5rem;
      left: calc(100% / 6);
      right: calc(100% / 6);
      height: 2px;
      background: repeating-linear-gradient(
        90deg,
        rgba(14, 116, 144, 0.5) 0px,
        rgba(14, 116, 144, 0.5) 8px,
        transparent 8px,
        transparent 16px
      );
    }

    @keyframes routeScan {
      0% { background-position: 0 0; }
      100% { background-position: 32px 0; }
    }

    .route::after {
      content: '';
      position: absolute;
      top: 1.5rem;
      left: calc(100% / 6);
      right: calc(100% / 6);
      height: 2px;
      background: repeating-linear-gradient(
        90deg,
        rgba(14, 116, 144, 0.8) 0px,
        transparent 4px,
        transparent 32px
      );
      animation: routeScan 2s linear infinite;
    }

    /* Glowing node */
    @keyframes nodePulse {
      0%, 100% { opacity: 0.9; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    .node {
      animation: nodePulse 3s ease-in-out infinite;
    }

    .exp-card {
      background: linear-gradient(160deg, #eaf7ff, #d6ecf9);
      border: 1px solid rgba(13, 18, 32, 0.12);
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    }

    .exp-card:hover {
      border-color: rgba(14, 116, 144, 0.4);
      box-shadow: 0 0 20px rgba(77, 232, 240, 0.15);
      transform: translateY(-2px);
    }

    @media (prefers-reduced-motion: reduce) {
      .node { animation: none; }
      .route::after { animation: none; }
      .exp-card { transition: none; }
      .exp-card:hover { transform: none; }
    }

    /* Mobile: vertical route */
    @media (max-width: 767px) {
      .route::before,
      .route::after {
        top: 0;
        bottom: 0;
        left: calc(1.25rem - 1px);
        right: auto;
        width: 2px;
        height: auto;
        background: repeating-linear-gradient(
          180deg,
          rgba(14, 116, 144, 0.5) 0px,
          rgba(14, 116, 144, 0.5) 8px,
          transparent 8px,
          transparent 16px
        );
      }

      .route::after {
        background: repeating-linear-gradient(
          180deg,
          rgba(14, 116, 144, 0.8) 0px,
          transparent 4px,
          transparent 32px
        );
        animation-name: routeScanVertical;
      }

      @keyframes routeScanVertical {
        0% { background-position: 0 0; }
        100% { background-position: 0 32px; }
      }
    }
  `,
  template: `
    <section
      class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        class="text-3xl font-bold text-center mb-10 text-foreground"
        style="font-family: 'Montserrat', sans-serif"
      >
        Experience
      </h2>

      <!-- Desktop: horizontal timeline -->
      <div class="route hidden md:grid grid-cols-3 gap-6">
        @for (role of roles; track role.company) {
          <div class="flex flex-col items-center">
            <div class="relative flex flex-col items-center mb-6">
              <div
                class="node w-4 h-4 rounded-full mt-3"
                [style.background]="role.color"
                [style.box-shadow]="'0 0 10px ' + role.glow + ', 0 0 25px ' + role.glow"
              ></div>
            </div>

            <article class="exp-card rounded-2xl p-5 w-full flex-1">
              <div class="mb-4">
                <span
                  class="text-[10px] tracking-wider uppercase block mb-1"
                  style="font-family: 'Montserrat', sans-serif; color: rgba(13, 18, 32, 0.6)"
                >
                  {{ role.startDate }} &ndash; {{ role.endDate }}
                </span>
                <h3
                  class="text-lg font-black italic uppercase leading-tight"
                  style="font-family: 'Barlow Condensed', sans-serif; color: #0d1220"
                >
                  {{ role.role }}
                </h3>
                <p class="text-sm mt-0.5" style="color: #0e7490">{{ role.company }}</p>
              </div>

              <ul class="space-y-2 list-none m-0 p-0">
                @for (item of role.accomplishments; track item) {
                  <li
                    class="text-xs leading-relaxed pl-3 relative"
                    style="color: rgba(13, 18, 32, 0.85)"
                  >
                    <span
                      class="absolute left-0 top-[0.4rem] w-1.5 h-1.5"
                      [style.background]="role.color"
                      aria-hidden="true"
                    ></span>
                    {{ item }}
                  </li>
                }
              </ul>
            </article>
          </div>
        }
      </div>

      <!-- Mobile: vertical timeline -->
      <div class="route md:hidden flex flex-col gap-8 relative pl-10">
        @for (role of roles; track role.company) {
          <div class="relative">
            <div class="absolute -left-10 top-0 flex flex-col items-center w-10">
              <div
                class="node w-4 h-4 rounded-full mt-3"
                [style.background]="role.color"
                [style.box-shadow]="'0 0 10px ' + role.glow + ', 0 0 25px ' + role.glow"
              ></div>
            </div>

            <article class="exp-card rounded-2xl p-5">
              <span
                class="text-[10px] tracking-wider uppercase block mb-1"
                style="font-family: 'Montserrat', sans-serif; color: rgba(13, 18, 32, 0.6)"
              >
                {{ role.startDate }} &ndash; {{ role.endDate }}
              </span>
              <h3
                class="text-lg font-black italic uppercase leading-tight"
                style="font-family: 'Barlow Condensed', sans-serif; color: #0d1220"
              >
                {{ role.role }}
              </h3>
              <p class="text-sm mt-0.5 mb-3" style="color: #0e7490">{{ role.company }}</p>
              <ul class="space-y-2 list-none m-0 p-0">
                @for (item of role.accomplishments; track item) {
                  <li
                    class="text-xs leading-relaxed pl-3 relative"
                    style="color: rgba(13, 18, 32, 0.85)"
                  >
                    <span
                      class="absolute left-0 top-[0.4rem] w-1.5 h-1.5"
                      [style.background]="role.color"
                      aria-hidden="true"
                    ></span>
                    {{ item }}
                  </li>
                }
              </ul>
            </article>
          </div>
        }
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  readonly roles: readonly Role[] = EXPERIENCES.map((exp, i) => ({
    ...exp,
    color: ROLE_COLORS[i % ROLE_COLORS.length].color,
    glow: ROLE_COLORS[i % ROLE_COLORS.length].glow,
  }));
}
