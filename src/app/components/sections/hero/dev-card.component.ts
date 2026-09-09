import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { SKILL_CATEGORIES } from '@/data/skills.data';

@Component({
  selector: 'app-dev-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @keyframes float {
      0%, 100% { transform: translateY(0) perspective(800px) rotateX(2deg) rotateY(-1deg); }
      50% { transform: translateY(-8px) perspective(800px) rotateX(2deg) rotateY(-1deg); }
    }

    .crew-card {
      perspective: 1200px;
      cursor: pointer;
      will-change: transform;
      outline: none;
    }

    .crew-card:focus-visible .face {
      box-shadow: 0 0 0 2px #4de8f0, 0 0 20px rgba(77, 232, 240, 0.3);
    }

    .flipper {
      display: grid;
      transform-style: preserve-3d;
      transition: transform 0.75s cubic-bezier(0.4, 0.2, 0.2, 1);
    }

    .is-flipped .flipper {
      transform: rotateY(180deg);
    }

    .face {
      grid-area: 1 / 1;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      box-shadow: 0 0 20px rgba(77, 232, 240, 0.25), inset 0 0 20px rgba(77, 232, 240, 0.04);
      background: linear-gradient(160deg, #eaf7ff 0%, #cfe9f8 100%);
    }

    /* Y2K chrome border */
    .chrome-border {
      border: 2px solid transparent;
      background: linear-gradient(160deg, #eaf7ff, #cfe9f8) padding-box,
                  linear-gradient(135deg, #4de8f0, #ff3d7f, #ffb300) border-box;
    }

    /* Y2K glossy sheen */
    .gloss {
      background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.1) 55%, transparent 70%);
    }

    .face.back {
      transform: rotateY(180deg);
    }

    @media (pointer: fine) {
      .crew-card {
        animation: float 4s ease-in-out infinite;
        transition: transform 0.3s ease;
      }

      .crew-card:hover {
        animation-play-state: paused;
        transform: perspective(800px) rotateX(4deg) rotateY(-3deg) scale(1.02);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .crew-card { animation: none; transition: none; transform: none; }
      .crew-card:hover { animation-play-state: running; transform: none; }
      .flipper { transition: none; }
    }

    /* Y2K blocky panel */
    .block {
      background: rgba(255, 255, 255, 0.55);
      border: 1px solid rgba(13, 18, 32, 0.12);
    }

    .registry-text {
      font-family: 'Montserrat', sans-serif;
      letter-spacing: 0.15em;
      font-weight: 500;
    }
  `,
  template: `
    <div
      class="crew-card relative w-full max-w-[540px]"
      [class.is-flipped]="flipped()"
      role="button"
      tabindex="0"
      [attr.aria-pressed]="flipped()"
      aria-label="Profile card. Activate to flip and show skills."
      (click)="toggle()"
      (keydown.enter)="toggle()"
      (keydown.space)="toggle($event)"
    >
    <div class="flipper">

    <!-- Front: RPG character select -->
    <div class="face front relative chrome-border rounded-2xl overflow-hidden">
      <div class="gloss absolute inset-0 z-10 pointer-events-none"></div>
      <div class="relative z-20 p-5 flex flex-col h-full">
        <!-- Avatar + name -->
        <div class="flex gap-4">
          <div
            class="w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#0e7490]/30 flex-shrink-0"
            style="box-shadow: 0 0 18px rgba(14, 116, 144, 0.2);"
          >
            <img
              src="assets/ember-avatar.jpg"
              alt="Ember Mills"
              fetchpriority="high"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-2xl font-black italic uppercase leading-none" style="font-family: 'Barlow Condensed', sans-serif; color: #0d1220">
              Full Stack Engineer
            </p>
          </div>
        </div>

        <div class="flex-1 flex flex-col justify-center">
        <!-- Special Abilities -->
        <div class="mt-4">
          <p class="text-[10px] font-black italic uppercase tracking-widest text-[#0e7490]" style="font-family: 'Barlow Condensed', sans-serif;">Special Abilities</p>
          <div class="mt-1.5 space-y-1.5">
            @for (ability of abilities; track ability.name) {
              <div class="text-xs leading-snug">
                <span class="font-bold text-[#0d1220]">&#9656; {{ ability.name }}</span>
                <span class="text-[#0d1220]/70"> &mdash; {{ ability.desc }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Current Quest -->
        <div class="mt-3">
          <p class="text-[10px] font-black italic uppercase tracking-widest text-[#ff3d7f]" style="font-family: 'Barlow Condensed', sans-serif;">Current Quest</p>
          <p class="mt-1.5 text-xs text-[#0d1220]/80 leading-relaxed">{{ quest }}</p>
        </div>
        </div>

        <!-- Footer -->
        <div class="mt-auto pt-3 border-t border-[#0d1220]/10">
          <div class="flex flex-wrap gap-1.5 mb-2">
            @for (badge of techBadges; track badge) {
              <span
                class="text-[10px] px-2 py-0.5 border text-[#0d1220]"
                style="background: rgba(14,116,144,0.1); border-color: rgba(14,116,144,0.3)"
              >
                {{ badge }}
              </span>
            }
          </div>
          <div class="flex items-center justify-between">
            <span class="registry-text text-[10px] text-[#0d1220]/85 uppercase tracking-widest">Active since 2017</span>
            <div class="flex items-center gap-3">
              @for (link of socialLinks; track link.label) {
                <a
                  [href]="link.url"
                  [attr.aria-label]="link.label"
                  target="_blank"
                  rel="noopener noreferrer"
                  (click)="$event.stopPropagation()"
                  class="text-[#0d1220]/85 hover:text-[#0e7490] transition-colors"
                >
                  @if (link.icon === 'github') {
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  }
                  @if (link.icon === 'linkedin') {
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  }
                </a>
              }
              <span class="registry-text text-[8px] tracking-[0.3em] text-[#0e7490]/80 uppercase" aria-hidden="true">
                Tap to flip
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back: skills -->
    <div class="face back relative chrome-border rounded-2xl overflow-hidden" [attr.aria-hidden]="!flipped()">
      <div class="gloss absolute inset-0 z-10 pointer-events-none"></div>
      <div class="relative z-20 p-6 h-full flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <span class="registry-text text-[10px] uppercase tracking-[0.3em] text-[#0e7490] font-semibold">
            Skills
          </span>
          <span class="registry-text text-[10px] uppercase tracking-[0.2em] text-[#0d1220]/75" aria-hidden="true">
            {{ skillCount }} skills
          </span>
        </div>

        <div class="flex-1 flex flex-col justify-center gap-2 overflow-hidden">
          @for (category of skillCategories; track category.name) {
            <div class="block p-2">
              <p class="registry-text text-[9px] uppercase tracking-widest text-[#0d1220]/75 mb-1.5">
                {{ category.name }}
              </p>
              <div class="flex flex-wrap gap-1">
                @for (skill of category.skills; track skill.name) {
                  <span
                    class="text-[10px] px-1.5 py-0.5 border text-[#0d1220] flex items-center gap-1"
                    [style.background]="chipBg(category.color)"
                    [style.border-color]="chipBorder(category.color)"
                  >
                    @if (skill.icon) {
                      <img [src]="skill.icon" [alt]="skill.name" loading="lazy" class="w-3 h-3" />
                    }
                    {{ skill.name }}
                  </span>
                }
              </div>
            </div>
          }
        </div>

        <div class="flex items-center justify-between mt-4 pt-3 border-t border-[#0d1220]/10">
          <span class="registry-text text-[8px] tracking-[0.3em] text-[#0e7490]/80 uppercase" aria-hidden="true">
            Tap to flip back
          </span>
        </div>
      </div>
    </div>

    </div>
    </div>
  `,
})
export class DevCardComponent {
  readonly flipped = signal(false);
  readonly skillCategories = SKILL_CATEGORIES;
  readonly skillCount = SKILL_CATEGORIES.reduce((sum, category) => sum + category.skills.length, 0);

  readonly abilities = [
    { name: 'FULL STACK', desc: 'Builds across frontend, backend & infrastructure' },
    { name: 'SYSTEM BUILDER', desc: '.NET • Angular • Python • Docker • Azure' },
    { name: 'HOMELAB ENGINEER', desc: 'Self-hosted services • automation • monitoring' },
  ];

  readonly quest = 'Building things that are useful, automated, and slightly over-engineered.';

  readonly socialLinks = [
    { label: 'GitHub', url: 'https://github.com/embmeals', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ember-d-mills', icon: 'linkedin' },
  ] as const;

  readonly chipColors: Record<string, { bg: string; border: string }> = {
    cyan: { bg: 'rgba(77, 232, 240, 0.14)', border: 'rgba(77, 232, 240, 0.4)' },
    magenta: { bg: 'rgba(255, 45, 123, 0.14)', border: 'rgba(255, 45, 123, 0.4)' },
    amber: { bg: 'rgba(255, 179, 0, 0.14)', border: 'rgba(255, 179, 0, 0.4)' },
    green: { bg: 'rgba(0, 230, 118, 0.14)', border: 'rgba(0, 230, 118, 0.4)' },
    violet: { bg: 'rgba(179, 136, 255, 0.14)', border: 'rgba(179, 136, 255, 0.4)' },
  };

  chipBg(color: string): string {
    return this.chipColors[color]?.bg ?? 'rgba(77, 232, 240, 0.14)';
  }

  chipBorder(color: string): string {
    return this.chipColors[color]?.border ?? 'rgba(77, 232, 240, 0.4)';
  }

  readonly techBadges = ['.NET', 'Angular', 'Python', 'Azure', 'Docker', 'SQL', 'TypeScript', 'React'];

  toggle(event?: Event): void {
    event?.preventDefault();
    this.flipped.update((value) => !value);
  }
}
