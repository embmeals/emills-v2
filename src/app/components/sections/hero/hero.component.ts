import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ParticleCanvasComponent } from './particle-canvas.component';
import { DevCardComponent } from './dev-card.component';

interface SocialLink {
  readonly label: string;
  readonly url: string;
  readonly icon: 'github' | 'linkedin' | 'codepen';
}

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

          <!-- Social links -->
          <nav class="mt-8" aria-label="Social links">
            <ul class="flex items-center gap-6 list-none m-0 p-0">
            @for (link of socialLinks; track link.label) {
              <li>
              <a
                [href]="link.url"
                [attr.aria-label]="link.label"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground hover:text-neon-cyan transition-colors duration-200"
              >
                @if (link.icon === 'github') {
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                }
                @if (link.icon === 'linkedin') {
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                }
                @if (link.icon === 'codepen') {
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                    <line x1="12" x2="12" y1="22" y2="15.5" />
                    <polyline points="22 8.5 12 15.5 2 8.5" />
                    <polyline points="2 15.5 12 8.5 22 15.5" />
                    <line x1="12" x2="12" y1="2" y2="8.5" />
                  </svg>
                }
              </a>
              </li>
            }
            </ul>
          </nav>
        </div>

        <!-- Right: Dev Card -->
        <div class="animate-fade-in-right">
          <app-dev-card />
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  readonly socialLinks: readonly SocialLink[] = [
    {
      label: 'GitHub',
      url: 'https://github.com/embmeals',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ember-d-mills',
      icon: 'linkedin',
    },
    {
      label: 'CodePen',
      url: 'https://codepen.io/ambmeals',
      icon: 'codepen',
    },
  ] as const;
}
