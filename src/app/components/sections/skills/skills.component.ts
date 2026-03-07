import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { SKILL_CATEGORIES, type SkillCategory } from '@/data/skills.data';

const CX = 500;
const CY = 500;

const COLOR_MAP: Record<string, { hex: string; glow: string }> = {
  cyan: { hex: '#00e5ff', glow: 'rgba(0,229,255,0.3)' },
  magenta: { hex: '#ff2d7b', glow: 'rgba(255,45,123,0.3)' },
  amber: { hex: '#ffb300', glow: 'rgba(255,179,0,0.3)' },
  green: { hex: '#00e676', glow: 'rgba(0,230,118,0.3)' },
  violet: { hex: '#b388ff', glow: 'rgba(179,136,255,0.3)' },
};

const ORBIT_CONFIG = [
  { catIndex: 0, radius: 100, offset: 0.5 },
  { catIndex: 2, radius: 175, offset: 0.9 },
  { catIndex: 1, radius: 260, offset: Math.PI / 3 },
  { catIndex: 3, radius: 345, offset: 0.8 },
  { catIndex: 4, radius: 420, offset: 0.7 },
];

interface OrbitalNode {
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly labelX: number;
  readonly labelY: number;
  readonly textAnchor: 'start' | 'middle' | 'end';
}

interface OrbitRing {
  readonly radius: number;
  readonly label: string;
  readonly colorHex: string;
  readonly colorGlow: string;
  readonly nodes: readonly OrbitalNode[];
  readonly animDuration: string;
}

interface Guideline {
  readonly x2: number;
  readonly y2: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ZardCardComponent, ZardBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @keyframes orbitScan {
      from { stroke-dashoffset: 0; }
      to { stroke-dashoffset: -16; }
    }

    .orbit-ring {
      stroke-dasharray: 4 4;
      animation: orbitScan 3s linear infinite;
    }

    @keyframes coreGlow {
      0%, 100% {
        opacity: 0.15;
        r: 30;
      }
      50% {
        opacity: 0.25;
        r: 35;
      }
    }

    .core-pulse {
      animation: coreGlow 4s ease-in-out infinite;
    }

    @keyframes nodeGlow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }

    .skill-node {
      animation: nodeGlow 3s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .orbit-ring { animation: none; }
      .core-pulse { animation: none; }
      .skill-node { animation: none; opacity: 0.8; }
    }

    z-card {
      background: #14141f;
      border-color: #1e1e2e;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    z-card:hover {
      border-color: rgba(0, 170, 255, 0.3);
      box-shadow: 0 0 20px rgba(0, 170, 255, 0.08);
    }
  `,
  template: `
    <section
      class="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="skills-heading"
    >
      <h2
        id="skills-heading"
        class="text-3xl font-bold text-center mb-2 text-[#e0e0e0]"
        style="font-family: 'Montserrat', sans-serif"
      >
        Skills & Technologies
      </h2>
      <p class="text-center text-[9px] tracking-[0.35em] uppercase text-[#00aaff]/30 mb-10" aria-hidden="true"
        style="font-family: 'Montserrat', sans-serif"
      >
        All Systems Nominal
      </p>

      <!-- Desktop: orbital diagram -->
      <div class="hidden md:block">
        <div class="max-w-4xl mx-auto">
          <svg
            viewBox="0 0 1000 1000"
            class="w-full h-auto"
            aria-hidden="true"
          >
            <!-- Grid pattern -->
            <defs>
              <pattern id="skillGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,170,255,0.04)" stroke-width="0.5"/>
              </pattern>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="coreFilter" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="1000" height="1000" fill="url(#skillGrid)" rx="12" />

            <!-- Radial guidelines -->
            @for (line of guidelines; track $index) {
              <line
                [attr.x1]="cx" [attr.y1]="cy"
                [attr.x2]="line.x2" [attr.y2]="line.y2"
                stroke="rgba(0,170,255,0.04)" stroke-width="0.5"
              />
            }

            <!-- Orbit rings with labels -->
            @for (orbit of orbits; track orbit.label) {
              <circle
                class="orbit-ring"
                [attr.cx]="cx" [attr.cy]="cy" [attr.r]="orbit.radius"
                fill="none" [attr.stroke]="orbit.colorHex" stroke-opacity="0.25"
                stroke-width="1"
                [style.animation-duration]="orbit.animDuration"
              />
              <!-- Ring label -->
              <text
                [attr.x]="cx" [attr.y]="cy - orbit.radius + 14"
                text-anchor="middle"
                [attr.fill]="orbit.colorHex" fill-opacity="0.35"
                font-size="9"
                style="font-family: 'Montserrat', sans-serif; text-transform: uppercase; letter-spacing: 0.15em"
              >
                {{ orbit.label }}
              </text>
            }

            <!-- Center core -->
            <circle class="core-pulse" [attr.cx]="cx" [attr.cy]="cy" r="30" fill="#00e5ff" fill-opacity="0.15" />
            <circle [attr.cx]="cx" [attr.cy]="cy" r="16" fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.3)" stroke-width="1" />
            <circle [attr.cx]="cx" [attr.cy]="cy" r="5" fill="#00e5ff" filter="url(#coreFilter)" />

            <!-- Skill nodes per orbit -->
            @for (orbit of orbits; track orbit.label) {
              @for (node of orbit.nodes; track node.name) {
                <!-- Glow circle -->
                <circle
                  class="skill-node"
                  [attr.cx]="node.x" [attr.cy]="node.y" r="7"
                  [attr.fill]="orbit.colorGlow"
                  filter="url(#glow)"
                />
                <!-- Core dot -->
                <circle
                  [attr.cx]="node.x" [attr.cy]="node.y" r="3.5"
                  [attr.fill]="orbit.colorHex"
                />
                <!-- Label -->
                <text
                  [attr.x]="node.labelX" [attr.y]="node.labelY"
                  [attr.text-anchor]="node.textAnchor"
                  dominant-baseline="central"
                  fill="#ffffff" font-size="13" font-weight="500"
                  style="font-family: 'Montserrat', sans-serif"
                >
                  {{ node.name }}
                </text>
              }
            }
          </svg>

          <!-- Legend -->
          <div class="flex flex-wrap justify-center gap-6 mt-4">
            @for (orbit of orbits; track orbit.label) {
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" [style.background]="orbit.colorHex"></span>
                <span
                  class="text-[10px] tracking-wider uppercase text-[#a0a0b0]"
                  style="font-family: 'Montserrat', sans-serif"
                >
                  {{ orbit.label }}
                </span>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Mobile: card grid -->
      <div class="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        @for (category of categories; track category.name) {
          <z-card [zTitle]="category.name">
            <ul class="flex flex-wrap gap-2 list-none m-0 p-0" [attr.aria-label]="'Skills for ' + category.name">
              @for (skill of category.skills; track skill.name) {
                <li><z-badge zType="secondary" zShape="pill">{{ skill.name }}</z-badge></li>
              }
            </ul>
          </z-card>
        }
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly cx = CX;
  readonly cy = CY;
  readonly categories: readonly SkillCategory[] = SKILL_CATEGORIES;

  readonly guidelines: readonly Guideline[] = Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i;
    return {
      x2: CX + 460 * Math.cos(angle),
      y2: CY + 460 * Math.sin(angle),
    };
  });

  readonly orbits: readonly OrbitRing[] = ORBIT_CONFIG.map((config, idx) => {
    const cat = SKILL_CATEGORIES[config.catIndex];
    const colors = COLOR_MAP[cat.color];
    const count = cat.skills.length;
    const durations = ['4s', '5s', '3.5s', '6s', '4.5s'];

    const nodes: OrbitalNode[] = cat.skills.map((skill, i) => {
      const angle = (2 * Math.PI * i) / count + config.offset;
      const x = CX + config.radius * Math.cos(angle);
      const y = CY + config.radius * Math.sin(angle);
      return { name: skill.name, x, y, labelX: x, labelY: y - 14, textAnchor: 'middle' as const };
    });

    return {
      radius: config.radius,
      label: cat.name,
      colorHex: colors.hex,
      colorGlow: colors.glow,
      nodes,
      animDuration: durations[idx],
    };
  });
}
