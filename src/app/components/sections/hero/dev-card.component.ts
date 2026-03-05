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
      0%, 100% { border-color: #00e5ff; box-shadow: 0 0 20px rgba(0, 229, 255, 0.3), inset 0 0 20px rgba(0, 229, 255, 0.05); }
      50% { border-color: #ff2d7b; box-shadow: 0 0 20px rgba(255, 45, 123, 0.3), inset 0 0 20px rgba(255, 45, 123, 0.05); }
    }

    .dev-card {
      animation: float 4s ease-in-out infinite, borderGlow 4s ease-in-out infinite;
      transition: transform 0.3s ease;
    }

    .dev-card:hover {
      animation-play-state: paused;
      transform: perspective(800px) rotateX(4deg) rotateY(-3deg) scale(1.02);
    }

    .scanlines {
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 229, 255, 0.015) 2px,
        rgba(0, 229, 255, 0.015) 4px
      );
    }

    .holographic {
      background: linear-gradient(
        105deg,
        transparent 20%,
        rgba(0, 229, 255, 0.06) 35%,
        rgba(255, 45, 123, 0.06) 50%,
        rgba(255, 179, 0, 0.06) 65%,
        transparent 80%
      );
      background-size: 200% 100%;
      animation: shimmer 6s linear infinite;
    }

    .barcode {
      display: flex;
      gap: 1px;
      align-items: flex-end;
      height: 20px;
    }

    .barcode span {
      display: block;
      background: rgba(0, 229, 255, 0.3);
    }
  `,
  template: `
    <div
      class="dev-card relative w-full max-w-md border-2 rounded-xl overflow-hidden"
      style="background: linear-gradient(135deg, #14141f 0%, #0a0a0f 100%);"
    >
      <!-- Scanline overlay -->
      <div class="scanlines absolute inset-0 z-10 pointer-events-none"></div>

      <!-- Holographic shimmer -->
      <div class="holographic absolute inset-0 z-10 pointer-events-none"></div>

      <!-- Card content -->
      <div class="relative z-20 p-5">
        <!-- Header strip -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-[10px] uppercase tracking-[0.3em] text-neon-cyan font-semibold" style="font-family: 'Montserrat', sans-serif">
            Developer ID
          </span>
          <span class="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            STL // MO
          </span>
        </div>

        <!-- Main content: Avatar + Info -->
        <div class="flex gap-5">
          <!-- Avatar -->
          <div class="flex-shrink-0">
            <div
              class="w-24 h-24 rounded-lg overflow-hidden border border-neon-cyan/30"
              style="box-shadow: 0 0 12px rgba(0, 229, 255, 0.2);"
            >
              <img
                src="assets/ember_avatar.png"
                alt="Ember Mills avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Info fields -->
          <div class="flex-1 min-w-0 space-y-2">
            <div>
              <span class="text-[9px] uppercase tracking-widest text-muted-foreground">Name</span>
              <p class="text-sm font-bold text-foreground leading-tight" style="font-family: 'Montserrat', sans-serif">
                Ember Mills
              </p>
            </div>
            <div>
              <span class="text-[9px] uppercase tracking-widest text-muted-foreground">Class</span>
              <p class="text-sm font-semibold text-neon-cyan leading-tight">
                Sr. Full Stack Engineer
              </p>
            </div>
            <div>
              <span class="text-[9px] uppercase tracking-widest text-muted-foreground">Clearance</span>
              <p class="text-xs text-foreground/80 leading-tight">
                .NET &middot; Angular &middot; Python &middot; SQL
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom strip -->
        <div class="flex items-end justify-between mt-4 pt-3 border-t border-border/50">
          <div class="flex gap-6">
            <div>
              <span class="text-[9px] uppercase tracking-widest text-muted-foreground">Issued</span>
              <p class="text-xs text-foreground/70">2017</p>
            </div>
            <div>
              <span class="text-[9px] uppercase tracking-widest text-muted-foreground">Expires</span>
              <p class="text-xs text-neon-amber">Never</p>
            </div>
            <div>
              <span class="text-[9px] uppercase tracking-widest text-muted-foreground">Status</span>
              <p class="text-xs text-foreground/70 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                Active
              </p>
            </div>
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
      </div>
    </div>
  `,
})
export class DevCardComponent {}
