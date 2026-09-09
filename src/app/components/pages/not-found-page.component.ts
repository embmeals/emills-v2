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
      style="background: #0d0a1a"
      aria-labelledby="not-found-heading"
    >
      <!-- Snowflake SVG -->
      <div class="mb-8 select-none" aria-hidden="true">
        <svg
          viewBox="0 0 200 200"
          width="240"
          height="240"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="snowGrad404" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stop-color="#1a1430"/>
              <stop offset="100%" stop-color="#0d0a1a"/>
            </radialGradient>
          </defs>

          <!-- Backdrop -->
          <circle cx="100" cy="100" r="96" fill="url(#snowGrad404)"/>

          <!-- Snowflake: 6 arms -->
          <g stroke="#4de8f0" stroke-width="2" fill="none" stroke-linecap="round" class="flake-spin">
            <!-- main arms -->
            <line x1="100" y1="18" x2="100" y2="182"/>
            <line x1="29"  y1="59" x2="171" y2="141"/>
            <line x1="171" y1="59" x2="29"  y2="141"/>
            <!-- arm branches -->
            <line x1="100" y1="40" x2="88"  y2="52"/>
            <line x1="100" y1="40" x2="112" y2="52"/>
            <line x1="100" y1="160" x2="88" y2="148"/>
            <line x1="100" y1="160" x2="112" y2="148"/>
            <line x1="52"  y1="70" x2="64"  y2="70"/>
            <line x1="52"  y1="70" x2="58"  y2="82"/>
            <line x1="148" y1="130" x2="136" y2="130"/>
            <line x1="148" y1="130" x2="142" y2="118"/>
            <line x1="148" y1="70" x2="136" y2="70"/>
            <line x1="148" y1="70" x2="142" y2="82"/>
            <line x1="52"  y1="130" x2="64" y2="130"/>
            <line x1="52"  y1="130" x2="58" y2="118"/>
          </g>

          <!-- Neon accent dots on arm tips -->
          <g fill="#ff3d7f">
            <circle cx="100" cy="18" r="3"/>
            <circle cx="100" cy="182" r="3"/>
            <circle cx="29" cy="59" r="3"/>
            <circle cx="171" cy="141" r="3"/>
            <circle cx="171" cy="59" r="3"/>
            <circle cx="29" cy="141" r="3"/>
          </g>
          <circle cx="100" cy="100" r="4" fill="#ff7a00"/>
        </svg>
      </div>

      <!-- 404 -->
      <p
        class="text-8xl font-black tracking-tight mb-2"
        style="font-family: 'Barlow Condensed', sans-serif; color: #4de8f0; text-shadow: 0 0 32px rgba(77,232,240,0.5)"
        aria-hidden="true"
      >
        404
      </p>

      <!-- Heading -->
      <h1
        id="not-found-heading"
        class="text-2xl font-bold mb-3"
        style="font-family: 'Barlow Condensed', sans-serif; color: #e8e6f5"
      >
        Run Not Found
      </h1>

      <!-- Flavour copy -->
      <p class="text-base max-w-sm mb-1" style="color: #9aa0c0">
        You wiped out on this trail.
      </p>
      <p class="text-sm max-w-sm mb-2" style="color: #6a7090">
        This run isn't on the mountain.
      </p>
      <p class="text-xs max-w-xs mb-8 italic" style="color: #4a5070">
        Ship or die.
      </p>

      <!-- CTA -->
      <a
        routerLink="/"
        class="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        style="background: rgba(255,61,127,0.1); border: 1px solid rgba(255,61,127,0.4); color: #ff3d7f"
        aria-label="Go back to the home page"
      >
        Back to the lodge
      </a>
    </main>
  `,
  styles: [`
    .flake-spin {
      animation: flakeSpin 30s linear infinite;
      transform-origin: 100px 100px;
    }

    @keyframes flakeSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      .flake-spin { animation: none; }
    }
  `],
})
export class NotFoundPageComponent implements OnInit {
  private readonly title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('404 — Run Not Found');
  }
}
