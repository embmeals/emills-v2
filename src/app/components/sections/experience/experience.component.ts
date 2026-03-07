import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EXPERIENCES, type Experience } from '@/data/experience.data';

interface Station extends Experience {
  readonly id: string;
  readonly color: string;
  readonly colorGlow: string;
}

const STATION_COLORS = [
  { color: '#00e5ff', glow: 'rgba(0, 229, 255, 0.6)' },
  { color: '#ff2d7b', glow: 'rgba(255, 45, 123, 0.6)' },
  { color: '#ffb300', glow: 'rgba(255, 179, 0, 0.6)' },
];

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    /* Grid background */
    .transit-map-bg {
      background-image:
        linear-gradient(rgba(0, 170, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 170, 255, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      border: 1px solid rgba(0, 170, 255, 0.08);
      border-radius: 12px;
    }

    /* Route line */
    .route {
      position: relative;
    }

    .route::before {
      content: '';
      position: absolute;
      top: 1.75rem;
      left: 2rem;
      right: 2rem;
      height: 2px;
      background: repeating-linear-gradient(
        90deg,
        rgba(0, 170, 255, 0.5) 0px,
        rgba(0, 170, 255, 0.5) 8px,
        transparent 8px,
        transparent 16px
      );
      box-shadow: 0 0 6px rgba(0, 170, 255, 0.3);
    }

    @keyframes routeScan {
      0% { background-position: 0 0; }
      100% { background-position: 32px 0; }
    }

    .route::after {
      content: '';
      position: absolute;
      top: 1.75rem;
      left: 2rem;
      right: 2rem;
      height: 2px;
      background: repeating-linear-gradient(
        90deg,
        rgba(0, 229, 255, 0.8) 0px,
        transparent 4px,
        transparent 32px
      );
      animation: routeScan 2s linear infinite;
    }

    /* Station node */
    @keyframes stationNodePulse {
      0%, 100% { opacity: 0.9; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.15); }
    }

    @keyframes stationRingPulse {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.1); }
    }

    .station-node {
      animation: stationNodePulse 3s ease-in-out infinite;
    }

    .station-ring {
      animation: stationRingPulse 3s ease-in-out infinite;
      animation-delay: 0.5s;
    }

    .station-card {
      background: rgba(20, 20, 31, 0.9);
      border: 1px solid rgba(0, 170, 255, 0.15);
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    .station-card:hover {
      border-color: rgba(0, 170, 255, 0.35);
      box-shadow: 0 0 20px rgba(0, 170, 255, 0.08);
    }

    @media (prefers-reduced-motion: reduce) {
      .station-node,
      .station-ring { animation: none; }
      .route::after { animation: none; }
    }

    /* Mobile: vertical route */
    @media (max-width: 767px) {
      .route::before,
      .route::after {
        top: 0;
        bottom: 0;
        left: 1.25rem;
        right: auto;
        width: 2px;
        height: auto;
        background: repeating-linear-gradient(
          180deg,
          rgba(0, 170, 255, 0.5) 0px,
          rgba(0, 170, 255, 0.5) 8px,
          transparent 8px,
          transparent 16px
        );
      }

      .route::after {
        background: repeating-linear-gradient(
          180deg,
          rgba(0, 229, 255, 0.8) 0px,
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
      class="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        class="text-3xl font-bold text-center mb-2 text-[#e0e0e0]"
        style="font-family: 'Montserrat', sans-serif"
      >
        Experience
      </h2>
      <p
        class="text-center text-[9px] tracking-[0.35em] uppercase text-[#00aaff]/30 mb-10"
        aria-hidden="true"
        style="font-family: 'Montserrat', sans-serif"
      >
        Transit Route Active
      </p>

      <div class="transit-map-bg p-4 sm:p-6 lg:p-8">
        <!-- Desktop: horizontal route -->
        <div class="route hidden md:grid grid-cols-3 gap-6 relative">
          @for (station of stations; track station.company; let i = $index) {
            <div class="timeline-entry flex flex-col items-center">
              <!-- Station node -->
              <div class="relative flex flex-col items-center mb-6">
                <div class="station-ring absolute w-10 h-10 rounded-full border-2" [style.border-color]="station.colorGlow"></div>
                <div class="timeline-node station-node w-4 h-4 rounded-full mt-3" [style.background]="station.color" [style.box-shadow]="'0 0 10px ' + station.colorGlow + ', 0 0 25px ' + station.colorGlow"></div>
                <span
                  class="mt-3 text-[10px] tracking-[0.3em] uppercase" [style.color]="station.color" style="opacity: 0.6"
                  style="font-family: 'Montserrat', sans-serif"
                  aria-hidden="true"
                >
                  {{ station.id }}
                </span>
              </div>

              <!-- Station card -->
              <div class="station-card rounded-lg p-4 w-full">
                <div class="mb-3">
                  <span
                    class="text-[10px] tracking-wider uppercase text-[#00e5ff]/50 block mb-1"
                    style="font-family: 'Montserrat', sans-serif"
                  >
                    {{ station.startDate }} - {{ station.endDate }}
                  </span>
                  <h3
                    class="text-sm font-semibold text-[#e0e0e0] leading-tight"
                    style="font-family: 'Montserrat', sans-serif"
                  >
                    {{ station.role }}
                  </h3>
                  <p class="text-xs text-[#a0a0b0] mt-0.5">{{ station.company }}</p>
                </div>
                <ul class="space-y-1.5 list-none m-0 p-0">
                  @for (item of station.accomplishments; track item) {
                    <li class="text-xs text-[#a0a0b0] pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.45rem] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#00e5ff]/30">
                      {{ item }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>

        <!-- Mobile: vertical route -->
        <div class="route md:hidden flex flex-col gap-8 relative pl-10">
          @for (station of stations; track station.company; let i = $index) {
            <div class="timeline-entry relative">
              <!-- Station node (on the left line) -->
              <div class="absolute -left-10 top-0 flex flex-col items-center">
                <div class="station-ring absolute w-10 h-10 rounded-full border-2 -translate-x-[0.1rem]" [style.border-color]="station.colorGlow"></div>
                <div class="timeline-node station-node w-4 h-4 rounded-full mt-3" [style.background]="station.color" [style.box-shadow]="'0 0 10px ' + station.colorGlow + ', 0 0 25px ' + station.colorGlow"></div>
              </div>

              <!-- Station card -->
              <div class="station-card rounded-lg p-4">
                <span
                  class="text-[9px] tracking-[0.3em] uppercase block mb-1"
                  style="font-family: 'Montserrat', sans-serif; opacity: 0.5"
                  [style.color]="station.color"
                  aria-hidden="true"
                >
                  {{ station.id }}
                </span>
                <span
                  class="text-[10px] tracking-wider uppercase text-[#00e5ff]/50 block mb-1"
                  style="font-family: 'Montserrat', sans-serif"
                >
                  {{ station.startDate }} - {{ station.endDate }}
                </span>
                <h3
                  class="text-sm font-semibold text-[#e0e0e0] leading-tight"
                  style="font-family: 'Montserrat', sans-serif"
                >
                  {{ station.role }}
                </h3>
                <p class="text-xs text-[#a0a0b0] mt-0.5 mb-3">{{ station.company }}</p>
                <ul class="space-y-1.5 list-none m-0 p-0">
                  @for (item of station.accomplishments; track item) {
                    <li class="text-xs text-[#a0a0b0] pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.45rem] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#00e5ff]/30">
                      {{ item }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  readonly stations: readonly Station[] = EXPERIENCES
    .map((exp, i, arr) => ({
      ...exp,
      id: `REC-${String(arr.length - i).padStart(2, '0')}`,
      color: STATION_COLORS[i % STATION_COLORS.length].color,
      colorGlow: STATION_COLORS[i % STATION_COLORS.length].glow,
    }));
}
