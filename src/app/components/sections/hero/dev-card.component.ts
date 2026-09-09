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
      transform: translateZ(0);
      box-shadow: 0 0 20px rgba(77, 232, 240, 0.25), inset 0 0 20px rgba(77, 232, 240, 0.04);
      background: linear-gradient(160deg, #eaf7ff 0%, #cfe9f8 100%);
      transition: opacity 0s linear 0.375s;
    }

    /* Mobile browsers drop backface-visibility when a face contains its own
       stacking context, so hide the away-facing side explicitly. */
    .crew-card:not(.is-flipped) .face.back,
    .is-flipped .face.front {
      opacity: 0;
      pointer-events: none;
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
      font-family: 'Chakra Petch', 'Barlow', sans-serif;
      letter-spacing: 0.15em;
      font-weight: 600;
    }

    .stat-row span:first-child,
    .title-bar span {
      font-family: 'Chakra Petch', 'Barlow', sans-serif;
    }

    /* Trading-card title bar */
    .title-bar {
      background: linear-gradient(100deg, #0e7490 0%, #155e75 55%, #ff3d7f 100%);
      border-bottom: 2px solid rgba(13, 18, 32, 0.18);
    }

    .portrait {
      border: 2px solid rgba(14, 116, 144, 0.35);
      border-radius: 10px;
      background: #fff;
    }

    /* Stat meter pips */
    .pip {
      height: 10px;
      border: 1px solid rgba(14, 116, 144, 0.3);
      background: rgba(13, 18, 32, 0.06);
      border-radius: 2px;
    }

    .pip.filled {
      background: linear-gradient(180deg, #4de8f0, #0e7490);
      border-color: rgba(14, 116, 144, 0.55);
    }

    .ability-row + .ability-row {
      border-top: 1px solid rgba(13, 18, 32, 0.08);
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
      <div class="relative z-20 flex flex-col h-full">
        <!-- Title bar -->
        <div class="title-bar flex items-baseline justify-between px-4 py-2.5">
          <p class="text-3xl font-black italic uppercase leading-none text-white" style="font-family: 'Barlow Condensed', sans-serif;">
            Senior Full Stack Engineer
          </p>
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Lv. {{ yearsExperience }}</span>
        </div>

        <div class="flex-1 flex flex-col gap-3 p-4">
          <!-- Portrait + stats -->
          <div class="flex gap-3">
            <div
              class="portrait w-48 h-48 overflow-hidden flex-shrink-0"
              style="box-shadow: 0 0 18px rgba(14, 116, 144, 0.2);"
            >
              <picture>
                <source srcset="assets/ember-avatar-384.webp" type="image/webp" />
                <img
                  src="assets/ember-avatar-384.jpg"
                  alt="Ember Mills"
                  width="384"
                  height="384"
                  fetchpriority="high"
                  class="w-full h-full object-cover"
                />
              </picture>
            </div>

            <div class="flex-1 min-w-0 flex flex-col justify-center gap-3">
              @for (stat of stats; track stat.label) {
                <div class="stat-row flex items-center gap-2">
                  <span class="text-xs font-bold uppercase tracking-[0.1em] text-[#0d1220]/70 w-[76px] flex-shrink-0">{{ stat.label }}</span>
                  <span class="flex-1 flex gap-[3px]" [attr.aria-label]="stat.value + ' out of 5'">
                    @for (pip of pips; track pip) {
                      <span class="pip flex-1" [class.filled]="pip <= stat.value"></span>
                    }
                  </span>
                </div>
              }
            </div>
          </div>

          <!-- Abilities -->
          <div class="flex-1 flex flex-col justify-evenly">
            @for (ability of abilities; track ability.name) {
              <div class="ability-row flex gap-3 py-2">
                <span class="text-base font-black uppercase tracking-wide text-[#0e7490] w-[120px] flex-shrink-0 leading-tight" style="font-family: 'Barlow Condensed', sans-serif;">
                  {{ ability.name }}
                </span>
                <span class="flex-1 text-sm text-[#0d1220]/75 leading-snug">{{ ability.desc }}</span>
              </div>
            }
          </div>

          <p class="text-sm italic text-[#0d1220]/65 leading-snug">{{ quest }}</p>
        </div>

        <!-- Footer -->
        <div class="px-4 py-2.5 border-t border-[#0d1220]/10">
          <div class="flex items-center justify-between">
            <span class="registry-text text-[11px] text-[#0d1220]/85 uppercase tracking-widest">Active since 2017</span>
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

        <div class="flex-1 flex flex-col justify-between gap-2 overflow-hidden">
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
    { name: 'Full Stack', desc: 'Builds across frontend, backend & infrastructure' },
    { name: 'System Builder', desc: '.NET • Angular • Python • Docker • Azure' },
    { name: 'Homelab Engineer', desc: 'Self-hosted services • automation • monitoring' },
  ];

  private readonly careerStartYear = 2017;
  readonly yearsExperience = new Date().getFullYear() - this.careerStartYear;
  readonly pips = [1, 2, 3, 4, 5];

  readonly stats = [
    { label: 'Backend', value: 5 },
    { label: 'Frontend', value: 5 },
    { label: 'DevOps', value: 4 },
    { label: 'Data', value: 4 },
  ];

  readonly quest = 'Building accessible, automated systems end to end, from schema to pixel.';

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

  toggle(event?: Event): void {
    event?.preventDefault();
    this.flipped.update((value) => !value);
  }
}
