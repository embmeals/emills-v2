import { Component, ChangeDetectionStrategy, signal, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@/components/layout/navbar/navbar.component';
import { FooterComponent } from '@/components/layout/footer/footer.component';
import { MusicPlayerComponent } from '@/components/layout/music-player/music-player.component';
import { ZardSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, MusicPlayerComponent, ZardSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @keyframes loadFadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    .load-overlay {
      animation: loadFadeOut 0.5s ease-out forwards;
      animation-delay: 0.3s;
      pointer-events: none;
    }

    @keyframes scanLine {
      from { transform: translateY(-100%); }
      to { transform: translateY(100vh); }
    }

    .scan-line {
      animation: scanLine 1.5s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .load-overlay { animation: none; opacity: 0; }
      .scan-line { animation: none; }
    }
  `,
  template: `
    @if (loading()) {
      <div class="load-overlay fixed inset-0 z-[100] bg-[#0a0a14] flex flex-col items-center justify-center gap-6">
        <!-- Scan line effect -->
        <div class="scan-line absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/40 to-transparent"></div>

        <!-- Core loader -->
        <div class="relative">
          <div class="w-16 h-16 rounded-full border-2 border-[#00e5ff]/20 flex items-center justify-center">
            <div class="w-3 h-3 rounded-full bg-[#00e5ff] animate-pulse"></div>
          </div>
        </div>

        <div class="flex flex-col items-center gap-2">
          <p class="text-[10px] tracking-[0.4em] uppercase text-[#00e5ff]/50"
            style="font-family: 'Montserrat', sans-serif"
          >
            Initializing Systems
          </p>
          <div class="flex gap-3">
            <z-skeleton class="h-1 w-16 bg-[#00e5ff]/10!" />
            <z-skeleton class="h-1 w-24 bg-[#00e5ff]/10!" />
            <z-skeleton class="h-1 w-12 bg-[#00e5ff]/10!" />
          </div>
        </div>
      </div>
    }

    <app-navbar />
    <router-outlet />
    <app-footer />
    <app-music-player />
  `,
})
export class AppComponent implements AfterViewInit {
  title = 'emills-v2';
  private readonly platformId = inject(PLATFORM_ID);
  readonly loading = signal(true);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.loading.set(false), 1200);
    } else {
      this.loading.set(false);
    }
  }
}
