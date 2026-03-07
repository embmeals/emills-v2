import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { EXPERIENCES, type Experience } from '@/data/experience.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ZardCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .timeline {
      position: relative;
    }

    /* Center line */
    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #00e5ff;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
      transform: translateX(-50%);
    }

    .timeline-entry {
      position: relative;
      width: 50%;
      padding: 0 2.5rem 3rem;
    }

    /* Odd entries: left side */
    .timeline-entry:nth-child(odd) {
      align-self: flex-start;
      padding-right: 2.5rem;
      padding-left: 0;
    }

    /* Even entries: right side */
    .timeline-entry:nth-child(even) {
      align-self: flex-end;
      padding-left: 2.5rem;
      padding-right: 0;
    }

    @keyframes protoPulse {
      0%, 100% {
        box-shadow: 0 0 8px rgba(0, 229, 255, 0.6), 0 0 16px rgba(0, 229, 255, 0.3);
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 12px rgba(0, 229, 255, 0.8), 0 0 24px rgba(0, 229, 255, 0.4);
        transform: scale(1.15);
      }
    }

    /* Node dot */
    .timeline-node {
      position: absolute;
      top: 0.375rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: #00e5ff;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.6), 0 0 16px rgba(0, 229, 255, 0.3);
      z-index: 1;
      animation: protoPulse 3s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .timeline-node { animation: none; }
    }

    .timeline-entry:nth-child(odd) .timeline-node {
      right: -0.5rem;
    }

    .timeline-entry:nth-child(even) .timeline-node {
      left: -0.5rem;
    }

    /* Text alignment */
    .timeline-entry:nth-child(odd) .timeline-card {
      text-align: right;
    }

    .timeline-entry:nth-child(odd) .accomplishments {
      list-style-position: inside;
    }

    /* Mobile: line on the left, all cards on the right */
    @media (max-width: 767px) {
      .timeline::before {
        left: 0.5rem;
        transform: none;
      }

      .timeline-entry,
      .timeline-entry:nth-child(odd),
      .timeline-entry:nth-child(even) {
        width: 100%;
        align-self: flex-start;
        padding-left: 2.5rem;
        padding-right: 0;
      }

      .timeline-node,
      .timeline-entry:nth-child(odd) .timeline-node,
      .timeline-entry:nth-child(even) .timeline-node {
        left: 0;
        right: auto;
      }

      .timeline-entry:nth-child(odd) .timeline-card {
        text-align: left;
      }

      .timeline-entry:nth-child(odd) .accomplishments {
        list-style-position: outside;
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
        class="text-3xl font-bold text-center mb-12 text-[#e0e0e0]"
        style="font-family: 'Montserrat', sans-serif"
      >
        Experience
      </h2>

      <div class="timeline flex flex-col items-center">
        @for (exp of experiences; track exp.company) {
          <div class="timeline-entry">
            <div class="timeline-node"></div>
            <z-card
              [zTitle]="exp.role"
              [zDescription]="exp.company + ' · ' + exp.startDate + ' – ' + exp.endDate"
              class="timeline-card !bg-[#14141f] !border-[#1e1e2e] hover:!border-neon-cyan/30 transition-all duration-300"
            >
              <ul class="accomplishments space-y-2 list-disc pl-4 text-foreground text-sm">
                @for (item of exp.accomplishments; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </z-card>
          </div>
        }
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  readonly experiences: readonly Experience[] = EXPERIENCES;
}
