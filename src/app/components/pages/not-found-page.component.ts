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
      style="background: #0d0d1a"
      aria-labelledby="not-found-heading"
    >
      <!-- Cat SVG -->
      <div class="mb-6 select-none" aria-hidden="true">
        <svg
          viewBox="0 0 200 220"
          width="180"
          height="198"
          xmlns="http://www.w3.org/2000/svg"
          class="cat drop-shadow-[0_0_18px_rgba(0,255,255,0.25)]"
        >
          <!-- tail -->
          <path
            d="M100 210 Q130 190 145 165 Q155 145 140 135"
            fill="none"
            stroke="#b0b0c8"
            stroke-width="7"
            stroke-linecap="round"
          />

          <!-- body -->
          <ellipse cx="100" cy="155" rx="42" ry="48" fill="#c8c8dc" />

          <!-- belly -->
          <ellipse cx="100" cy="162" rx="24" ry="30" fill="#e8e8f4" />

          <!-- front legs (dangling down, stressed) -->
          <line x1="70" y1="175" x2="58" y2="210" stroke="#b0b0c8" stroke-width="9" stroke-linecap="round" />
          <line x1="130" y1="175" x2="142" y2="210" stroke="#b0b0c8" stroke-width="9" stroke-linecap="round" />

          <!-- paws -->
          <ellipse cx="56" cy="214" rx="9" ry="6" fill="#b0b0c8" />
          <ellipse cx="144" cy="214" rx="9" ry="6" fill="#b0b0c8" />

          <!-- head -->
          <circle cx="100" cy="95" r="46" fill="#c8c8dc" />

          <!-- ears (pointy, flattened back — stressed) -->
          <polygon points="62,65 52,32 82,58" fill="#c8c8dc" />
          <polygon points="138,65 148,32 118,58" fill="#c8c8dc" />
          <!-- inner ears -->
          <polygon points="65,62 57,40 80,60" fill="#e8a0a8" />
          <polygon points="135,62 143,40 120,60" fill="#e8a0a8" />

          <!-- eyes — wide, panicked -->
          <circle cx="82" cy="95" r="13" fill="white" />
          <circle cx="118" cy="95" r="13" fill="white" />
          <circle cx="85" cy="97" r="7" fill="#1a1a2e" />
          <circle cx="121" cy="97" r="7" fill="#1a1a2e" />
          <!-- pupils — dilated -->
          <circle cx="85" cy="97" r="4" fill="black" />
          <circle cx="121" cy="97" r="4" fill="black" />
          <!-- eye shine -->
          <circle cx="88" cy="94" r="2" fill="white" />
          <circle cx="124" cy="94" r="2" fill="white" />

          <!-- worried eyebrows -->
          <line x1="70" y1="80" x2="84" y2="85" stroke="#888" stroke-width="2.5" stroke-linecap="round" />
          <line x1="130" y1="80" x2="116" y2="85" stroke="#888" stroke-width="2.5" stroke-linecap="round" />

          <!-- nose -->
          <polygon points="100,108 96,113 104,113" fill="#e8a0a8" />

          <!-- stressed open mouth -->
          <path d="M92,116 Q100,124 108,116" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" />
          <ellipse cx="100" cy="119" rx="6" ry="4" fill="#cc6677" opacity="0.6" />

          <!-- whiskers — askew -->
          <line x1="60" y1="108" x2="88" y2="112" stroke="#aaa" stroke-width="1.5" stroke-linecap="round" />
          <line x1="58" y1="114" x2="88" y2="114" stroke="#aaa" stroke-width="1.5" stroke-linecap="round" />
          <line x1="112" y1="112" x2="140" y2="108" stroke="#aaa" stroke-width="1.5" stroke-linecap="round" />
          <line x1="112" y1="114" x2="142" y2="114" stroke="#aaa" stroke-width="1.5" stroke-linecap="round" />

          <!-- sweat drop -->
          <ellipse cx="148" cy="78" rx="4" ry="6" fill="#00bfff" opacity="0.7" />
          <polygon points="144,78 152,78 148,68" fill="#00bfff" opacity="0.7" />
        </svg>
      </div>

      <!-- 404 -->
      <p
        class="text-8xl font-black tracking-tight mb-2"
        style="font-family: 'Montserrat', sans-serif; color: #00e5ff; text-shadow: 0 0 30px rgba(0,229,255,0.5)"
        aria-hidden="true"
      >
        404
      </p>

      <!-- Heading -->
      <h1
        id="not-found-heading"
        class="text-2xl font-bold mb-3"
        style="font-family: 'Montserrat', sans-serif; color: #e0e0e0"
      >
        Page Not Found
      </h1>

      <!-- Flavour copy -->
      <p class="text-base max-w-sm mb-1" style="color: #a0a0b8">
        This page got sucked out the airlock.
      </p>
      <p class="text-sm max-w-sm mb-8" style="color: #606080">
        The cat has been notified. She is handling it poorly.
      </p>

      <!-- CTA -->
      <a
        routerLink="/"
        class="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        style="background: rgba(0,229,255,0.1); border: 1px solid rgba(0,229,255,0.4); color: #00e5ff"
        aria-label="Go back to the home page"
      >
        Get me out of here
      </a>
    </main>
  `,
  styles: [`
    .cat {
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(-2deg); }
      50%       { transform: translateY(-10px) rotate(2deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      .cat { animation: none; }
    }
  `],
})
export class NotFoundPageComponent implements OnInit {
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle('404 — Page Not Found | Ember Mills');
  }
}
