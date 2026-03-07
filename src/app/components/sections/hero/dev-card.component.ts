import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dev-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @keyframes float {
      0%, 100% { transform: translateY(0) perspective(800px) rotateX(2deg) rotateY(-1deg); }
      50% { transform: translateY(-8px) perspective(800px) rotateX(2deg) rotateY(-1deg); }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes borderGlow {
      0%, 100% {
        border-color: #00aaff;
        box-shadow: 0 0 20px rgba(0, 160, 255, 0.3), inset 0 0 20px rgba(0, 160, 255, 0.05);
      }
      50% {
        border-color: #00e5ff;
        box-shadow: 0 0 20px rgba(0, 229, 255, 0.4), inset 0 0 20px rgba(0, 229, 255, 0.08);
      }
    }

    @keyframes cantFlicker {
      0%, 92%, 100% { opacity: 0.12; }
      94% { opacity: 0.25; }
      96% { opacity: 0.08; }
      98% { opacity: 0.2; }
    }

    .crew-card {
      animation: float 4s ease-in-out infinite, borderGlow 4s ease-in-out infinite;
      transition: transform 0.3s ease;
    }

    .crew-card:hover {
      animation-play-state: paused;
      transform: perspective(800px) rotateX(4deg) rotateY(-3deg) scale(1.02);
    }

    .scanlines {
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 160, 255, 0.015) 2px,
        rgba(0, 160, 255, 0.015) 4px
      );
    }

    .holographic {
      background: linear-gradient(
        105deg,
        transparent 20%,
        rgba(0, 160, 255, 0.06) 35%,
        rgba(0, 229, 255, 0.08) 50%,
        rgba(0, 100, 255, 0.06) 65%,
        transparent 80%
      );
      background-size: 200% 100%;
      animation: shimmer 6s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .crew-card { animation: none; }
      .holographic { animation: none; }
      .cant-watermark { animation: none; opacity: 0.12; }
    }

    .barcode {
      display: flex;
      gap: 1px;
      align-items: flex-end;
      height: 20px;
    }

    .barcode span {
      display: block;
      background: rgba(0, 160, 255, 0.3);
    }

    .noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      opacity: 0.03;
    }

    .glitch-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(0, 160, 255, 0.15);
      z-index: 15;
      pointer-events: none;
    }

    .cant-watermark {
      animation: cantFlicker 8s ease-in-out infinite;
    }

    .registry-text {
      font-family: 'Montserrat', sans-serif;
      letter-spacing: 0.15em;
      font-weight: 500;
    }
  `,
  template: `
    <div
      class="crew-card relative w-full max-w-lg border-2 rounded-xl overflow-hidden"
      style="background: linear-gradient(135deg, #0a0f1a 0%, #060a12 100%);"
    >
      <!-- Film grain noise -->
      <div class="noise absolute inset-0 z-10 pointer-events-none"></div>

      <!-- Glitch accent lines -->
      <div class="glitch-line" style="top: 22%;" aria-hidden="true"></div>
      <div class="glitch-line" style="top: 68%; width: 60%;" aria-hidden="true"></div>

      <!-- Scanline overlay -->
      <div class="scanlines absolute inset-0 z-10 pointer-events-none"></div>

      <!-- Holographic shimmer -->
      <div class="holographic absolute inset-0 z-10 pointer-events-none"></div>

      <!-- REMEMBER THE CANT watermark -->
      <div
        class="cant-watermark absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          class="registry-text text-[10px] tracking-[0.5em] text-[#00aaff] rotate-[-18deg] select-none whitespace-nowrap"
          style="opacity: inherit;"
        >
          REMEMBER THE CANT
        </span>
      </div>

      <!-- Card content -->
      <div class="relative z-20 p-6">
        <!-- Header strip -->
        <div class="flex items-center justify-between mb-4">
          <span class="registry-text text-[10px] uppercase tracking-[0.3em] text-[#00aaff] font-semibold">
            Crew Ident
          </span>
          <span class="registry-text text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            STL // Sol Sector
          </span>
        </div>

        <!-- Main content: Avatar + Info -->
        <div class="flex gap-5">
          <!-- Avatar -->
          <div class="flex-shrink-0">
            <div
              class="w-24 h-24 rounded-lg overflow-hidden border border-[#00aaff]/30"
              style="box-shadow: 0 0 12px rgba(0, 160, 255, 0.2);"
            >
              <img
                src="assets/ember_avatar.jpg"
                alt="Ember Mills avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Info fields -->
          <div class="flex-1 min-w-0 space-y-2.5">
            <div>
              <p class="text-base font-bold text-foreground leading-tight" style="font-family: 'Montserrat', sans-serif">
                Ember Mills
              </p>
              <p class="text-sm font-semibold text-[#00ccff] leading-tight mt-1">
                Sr. Full Stack Engineer
              </p>
            </div>
            <div>
              <span class="text-[9px] uppercase tracking-widest text-muted-foreground">Systems</span>
              <p class="text-sm text-foreground/85 leading-relaxed mt-0.5">
                .NET &middot; Angular &middot; Python<br/>
                SQL &middot; TypeScript &middot; C#
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom strip -->
        <div class="flex items-end justify-between mt-4 pt-3 border-t border-[#00aaff]/10">
          <div class="flex items-center gap-3">
            <span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
            <span class="registry-text text-[10px] text-foreground/60 uppercase tracking-widest">Active since 2017</span>
          </div>

          <!-- Decorative barcode -->
          <div class="barcode" aria-hidden="true">
            <span style="width: 2px; height: 16px;"></span>
            <span style="width: 1px; height: 20px;"></span>
            <span style="width: 3px; height: 12px;"></span>
            <span style="width: 1px; height: 18px;"></span>
            <span style="width: 2px; height: 14px;"></span>
            <span style="width: 1px; height: 20px;"></span>
            <span style="width: 2px; height: 10px;"></span>
            <span style="width: 1px; height: 16px;"></span>
            <span style="width: 3px; height: 18px;"></span>
            <span style="width: 1px; height: 12px;"></span>
            <span style="width: 2px; height: 20px;"></span>
            <span style="width: 1px; height: 14px;"></span>
            <span style="width: 2px; height: 16px;"></span>
          </div>
        </div>

        <!-- Legitimate salvage footer -->
        <div class="mt-3 flex justify-center">
          <span class="registry-text text-[8px] tracking-[0.4em] text-[#00aaff]/20 uppercase">
            Legitimate Salvage
          </span>
        </div>
      </div>
    </div>
  `,
})
export class DevCardComponent {}
