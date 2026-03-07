import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ParticleCanvasComponent } from './particle-canvas.component';
import { DevCardComponent } from './dev-card.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParticleCanvasComponent, DevCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(32px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out both;
    }

    .animate-fade-in-right {
      animation: fadeInRight 0.8s ease-out 0.3s both;
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-fade-in-up,
      .animate-fade-in-right {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }
  `,
  template: `
    <section
      class="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <!-- Particle background -->
      <app-particle-canvas class="absolute inset-0 z-0" />

      <!-- Content: two-column on desktop, stacked on mobile -->
      <div
        class="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 px-4 max-w-5xl mx-auto"
      >
        <!-- Left: text content -->
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in-up">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight"
            style="font-family: 'Montserrat', sans-serif"
          >
            Ember Mills
          </h1>

          <p class="mt-4 text-xl text-neon-cyan">
            Senior Full Stack Engineer
          </p>

          <p class="mt-4 text-muted-foreground max-w-lg text-base">
            Building accessible, inclusive digital experiences
          </p>
        </div>

        <!-- Right: Dev Card -->
        <div class="animate-fade-in-right">
          <app-dev-card />
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {}
