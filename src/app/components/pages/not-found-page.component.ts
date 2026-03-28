import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      class="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style="background: #03050f"
      aria-labelledby="not-found-heading"
    >
      <!-- Ring Gate SVG -->
      <div class="mb-8 select-none" aria-hidden="true">
        <svg
          viewBox="0 0 300 300"
          width="260"
          height="260"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <!-- Deep void gradient for the ring centre -->
            <radialGradient id="voidGrad404" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stop-color="#07091c"/>
              <stop offset="60%"  stop-color="#040612"/>
              <stop offset="100%" stop-color="#010208"/>
            </radialGradient>
            <!-- Glow filter for the inner edge -->
            <filter id="glow404" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- Stars (outside ring radius ~123) -->
          <g fill="white">
            <circle cx="18"  cy="25"  r="1"   opacity="0.85"/>
            <circle cx="44"  cy="11"  r="0.8" opacity="0.65"/>
            <circle cx="76"  cy="37"  r="1.2" opacity="0.90"/>
            <circle cx="262" cy="17"  r="0.9" opacity="0.70"/>
            <circle cx="286" cy="50"  r="1.1" opacity="0.80"/>
            <circle cx="292" cy="142" r="0.8" opacity="0.60"/>
            <circle cx="279" cy="202" r="1.0" opacity="0.75"/>
            <circle cx="247" cy="266" r="0.9" opacity="0.80"/>
            <circle cx="192" cy="289" r="1.1" opacity="0.60"/>
            <circle cx="118" cy="286" r="0.8" opacity="0.90"/>
            <circle cx="53"  cy="269" r="1.0" opacity="0.70"/>
            <circle cx="13"  cy="220" r="0.8" opacity="0.60"/>
            <circle cx="7"   cy="154" r="1.2" opacity="0.80"/>
            <circle cx="21"  cy="84"  r="0.9" opacity="0.70"/>
            <circle cx="296" cy="88"  r="1.0" opacity="0.65"/>
            <circle cx="265" cy="250" r="0.8" opacity="0.75"/>
            <circle cx="34"  cy="186" r="1.0" opacity="0.55"/>
            <circle cx="201" cy="13"  r="0.8" opacity="0.80"/>
            <circle cx="94"  cy="6"   r="1.0" opacity="0.60"/>
            <circle cx="151" cy="4"   r="0.7" opacity="0.65"/>
            <circle cx="6"   cy="296" r="0.9" opacity="0.50"/>
            <circle cx="295" cy="272" r="0.8" opacity="0.55"/>
          </g>

          <!-- Outer ambient breathe glow (wide, very faint) -->
          <circle cx="150" cy="150" r="113" fill="none"
            stroke="#00c8d4" stroke-width="34" class="ring-breathe"/>

          <!-- Ring body: layered for metallic depth -->
          <!-- outermost shadow -->
          <circle cx="150" cy="150" r="113" fill="none"
            stroke="#07081a" stroke-width="26"/>
          <!-- main body -->
          <circle cx="150" cy="150" r="113" fill="none"
            stroke="#1c1e38" stroke-width="20"/>
          <!-- midtone highlight -->
          <circle cx="150" cy="150" r="113" fill="none"
            stroke="#262a48" stroke-width="13"/>
          <!-- inner lip shadow -->
          <circle cx="150" cy="150" r="113" fill="none"
            stroke="#111325" stroke-width="5"/>

          <!-- 8 structural nodes on the ring (r=113 from centre 150,150) -->
          <!--
            0°   → (150, 37)
            45°  → (230, 70)
            90°  → (263, 150)
            135° → (230, 230)
            180° → (150, 263)
            225° → (70,  230)
            270° → (37,  150)
            315° → (70,  70)
          -->
          <g fill="#12132a" stroke="#2c2f52" stroke-width="1">
            <circle cx="150" cy="37"  r="5.5"/>
            <circle cx="230" cy="70"  r="5.5"/>
            <circle cx="263" cy="150" r="5.5"/>
            <circle cx="230" cy="230" r="5.5"/>
            <circle cx="150" cy="263" r="5.5"/>
            <circle cx="70"  cy="230" r="5.5"/>
            <circle cx="37"  cy="150" r="5.5"/>
            <circle cx="70"  cy="70"  r="5.5"/>
          </g>
          <!-- Inner rings on the nodes (slightly lighter) -->
          <g fill="none" stroke="#3a3e68" stroke-width="1">
            <circle cx="150" cy="37"  r="3"/>
            <circle cx="230" cy="70"  r="3"/>
            <circle cx="263" cy="150" r="3"/>
            <circle cx="230" cy="230" r="3"/>
            <circle cx="150" cy="263" r="3"/>
            <circle cx="70"  cy="230" r="3"/>
            <circle cx="37"  cy="150" r="3"/>
            <circle cx="70"  cy="70"  r="3"/>
          </g>

          <!-- Void (fills inside of ring: r=103) -->
          <circle cx="150" cy="150" r="103" fill="url(#voidGrad404)"/>

          <!-- Subtle protomolecule wisps (static, in the void) -->
          <path d="M150,50 Q172,98 156,150 Q140,202 162,250"
            fill="none" stroke="#00c8d4" stroke-width="1.5"
            stroke-linecap="round" opacity="0.14"/>
          <path d="M50,150 Q100,130 150,150 Q200,170 250,150"
            fill="none" stroke="#00c8d4" stroke-width="1"
            stroke-linecap="round" opacity="0.10"/>
          <path d="M78,78 Q128,122 150,150 Q172,178 222,222"
            fill="none" stroke="#00c8d4" stroke-width="1"
            stroke-linecap="round" opacity="0.09"/>

          <!-- Inner edge: soft bloom -->
          <circle cx="150" cy="150" r="103" fill="none"
            stroke="#00c8d4" stroke-width="10" class="inner-glow-soft"/>

          <!-- Inner edge: crisp bright ring -->
          <circle cx="150" cy="150" r="103" fill="none"
            stroke="#00e5ff" stroke-width="2"
            class="inner-glow-bright" filter="url(#glow404)"/>

          <!-- Slowly-rotating 4-spoke armature -->
          <g class="spokes-spin" stroke="#1c2248" stroke-linecap="round">
            <!-- cardinal spokes: inner ring edge (r=103) → hub outer edge (r=14) -->
            <line x1="150" y1="47"  x2="150" y2="136" stroke-width="2"/>
            <line x1="150" y1="253" x2="150" y2="164" stroke-width="2"/>
            <line x1="47"  y1="150" x2="136" y2="150" stroke-width="2"/>
            <line x1="253" y1="150" x2="164" y2="150" stroke-width="2"/>
          </g>

          <!-- Central hub -->
          <circle cx="150" cy="150" r="14"
            fill="#0a0c1e" stroke="#1e2240" stroke-width="2"/>
          <circle cx="150" cy="150" r="7"
            fill="#0d1025" stroke="#00c8d4" stroke-width="1"
            class="hub-pulse"/>
          <circle cx="150" cy="150" r="3"
            fill="#00d4e0" class="hub-pulse"/>
        </svg>
      </div>

      <!-- 404 -->
      <p
        class="text-8xl font-black tracking-tight mb-2"
        style="font-family: 'Montserrat', sans-serif; color: #00e5ff; text-shadow: 0 0 32px rgba(0,229,255,0.5)"
        aria-hidden="true"
      >
        404
      </p>

      <!-- Heading -->
      <h1
        id="not-found-heading"
        class="text-2xl font-bold mb-3"
        style="font-family: 'Montserrat', sans-serif; color: #dde0f2"
      >
        Trajectory Not Found
      </h1>

      <!-- Flavour copy -->
      <p class="text-base max-w-sm mb-1" style="color: #7888a8">
        You've drifted into the Slow Zone.
      </p>
      <p class="text-sm max-w-sm mb-2" style="color: #4a5a7a">
        This location isn't charted in the EPD registry.
      </p>
      <p class="text-xs max-w-xs mb-8 italic" style="color: #303a56">
        Sasa ke, kopeng?
      </p>

      <!-- CTA -->
      <a
        routerLink="/"
        class="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        style="background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.3); color: #00e5ff"
        aria-label="Go back to the home page"
      >
        Plot a course home
      </a>
    </main>
  `,
  styles: [`
    .ring-breathe {
      animation: ringBreathe 5s ease-in-out infinite;
    }

    .inner-glow-soft {
      animation: softGlow 3.5s ease-in-out infinite;
    }

    .inner-glow-bright {
      animation: brightGlow 3.5s ease-in-out infinite;
    }

    .hub-pulse {
      animation: hubPulse 3.5s ease-in-out infinite;
    }

    .spokes-spin {
      animation: spokesSpin 40s linear infinite;
      transform-box: fill-box;
      transform-origin: center;
    }

    @keyframes ringBreathe {
      0%, 100% { opacity: 0.04; }
      50%       { opacity: 0.09; }
    }

    @keyframes softGlow {
      0%, 100% { opacity: 0.08; }
      50%       { opacity: 0.18; }
    }

    @keyframes brightGlow {
      0%, 100% { opacity: 0.90; }
      50%       { opacity: 0.50; }
    }

    @keyframes hubPulse {
      0%, 100% { opacity: 0.75; }
      50%       { opacity: 0.35; }
    }

    @keyframes spokesSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      .ring-breathe, .inner-glow-soft, .inner-glow-bright,
      .hub-pulse, .spokes-spin { animation: none; }
    }
  `],
})
export class NotFoundPageComponent implements OnInit {
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle('404 — Page Not Found | Ember Mills');
  }
}
