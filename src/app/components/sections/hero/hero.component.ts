import { Component, ChangeDetectionStrategy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DevCardComponent } from './dev-card.component';
import { ZardTooltipImports } from '@/shared/components/tooltip';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [DevCardComponent, ...ZardTooltipImports],
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
      class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      <!-- Content: two-column on desktop, stacked on mobile -->
      <div
        class="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 px-4 max-w-5xl mx-auto"
      >
        <!-- Left: text content -->
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in-up">
          <h1
            id="hero-heading"
            class="text-6xl sm:text-7xl md:text-8xl font-black italic uppercase tracking-tight leading-none pb-2"
            style="font-family: 'Barlow Condensed', sans-serif; background: linear-gradient(90deg, #4de8f0 0%, #ff3d7f 50%, #ffb300 100%); -webkit-background-clip: text; background-clip: text; color: transparent;"
          >
            Ember Mills
          </h1>

          <p class="mt-4 text-xl text-neon-cyan">
            Senior Full Stack Engineer
          </p>

          <p class="mt-4 text-muted-foreground max-w-lg text-base">
            Building accessible, inclusive digital experiences
          </p>

          <a
            href="#experience"
            (click)="scrollToExperience($event)"
            class="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            style="background: rgba(255,61,127,0.12); border: 1px solid rgba(255,61,127,0.45); color: #ff3d7f"
          >
            View My Work
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>

        <!-- Right: Dev Card -->
        <div class="animate-fade-in-right flex flex-col items-center gap-4">
          <app-dev-card />
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  private readonly platformId = inject(PLATFORM_ID);

  scrollToExperience(event: Event): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
