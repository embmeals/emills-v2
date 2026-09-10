import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subscription } from 'rxjs';

interface NavLink {
  readonly label: string;
  readonly id: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      class="fixed top-0 left-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#1e1e2e]"
      aria-label="Main navigation"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <!-- Site name -->
        <button
          class="flex items-center gap-2 font-heading text-xl font-bold text-neon-cyan tracking-wide cursor-pointer bg-transparent border-none"
          style="font-family: 'Montserrat', sans-serif"
          (click)="goHome()"
          aria-label="Go to home page"
        >
          EM
        </button>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-6" role="menubar">
          @for (link of navLinks; track link.id) {
            <button
              role="menuitem"
              class="text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none px-1 py-2"
              [class]="isSectionActive(link.id)
                ? 'text-neon-cyan'
                : 'text-[#a0a0b0] hover:text-[#e0e0e0]'"
              (click)="scrollTo(link.id)"
              [attr.aria-current]="isSectionActive(link.id) ? 'true' : null"
            >
              {{ link.label }}
            </button>
          }
          <!-- Routed, not scrolled: the game is its own page, not a section. -->
          <a
            role="menuitem"
            routerLink="/game"
            routerLinkActive="text-neon-cyan"
            ariaCurrentWhenActive="page"
            class="text-sm font-medium transition-colors duration-200 px-1 py-2 text-[#a0a0b0] hover:text-[#e0e0e0]"
          >
            Game
          </a>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-2"
          (click)="toggleMobile()"
          [attr.aria-expanded]="mobileOpen()"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span
            class="block w-6 h-0.5 bg-[#e0e0e0] transition-transform duration-200"
            [class.translate-y-2]="mobileOpen()"
            [class.rotate-45]="mobileOpen()"
          ></span>
          <span
            class="block w-6 h-0.5 bg-[#e0e0e0] transition-opacity duration-200"
            [class.opacity-0]="mobileOpen()"
          ></span>
          <span
            class="block w-6 h-0.5 bg-[#e0e0e0] transition-transform duration-200"
            [class.-translate-y-2]="mobileOpen()"
            [class.-rotate-45]="mobileOpen()"
          ></span>
        </button>
      </div>

      <!-- Mobile menu panel -->
      @if (mobileOpen()) {
        <div
          id="mobile-menu"
          class="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[#1e1e2e] px-4 pb-4"
          role="menu"
        >
          @for (link of navLinks; track link.id) {
            <button
              role="menuitem"
              class="block w-full text-left py-3 text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none"
              [class]="isSectionActive(link.id)
                ? 'text-neon-cyan'
                : 'text-[#a0a0b0] hover:text-[#e0e0e0]'"
              (click)="scrollTo(link.id); closeMobile()"
              [attr.aria-current]="isSectionActive(link.id) ? 'true' : null"
            >
              {{ link.label }}
            </button>
          }
          <a
            role="menuitem"
            routerLink="/game"
            routerLinkActive="text-neon-cyan"
            ariaCurrentWhenActive="page"
            (click)="closeMobile()"
            class="block w-full text-left py-3 text-sm font-medium transition-colors duration-200 text-[#a0a0b0] hover:text-[#e0e0e0]"
          >
            Game
          </a>
        </div>
      }
    </nav>
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private observer: IntersectionObserver | null = null;
  private navigation: Subscription | null = null;

  readonly navLinks: readonly NavLink[] = [
    { label: 'Home', id: 'home' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' },
  ] as const;

  readonly activeSection = signal('home');
  readonly mobileOpen = signal(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.setupIntersectionObserver();
    // The navbar outlives route changes, so the observer would keep watching
    // nodes from a destroyed home component and leave a stale section lit.
    this.navigation = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.rebindSectionTracking());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.navigation?.unsubscribe();
  }

  private rebindSectionTracking(): void {
    this.observer?.disconnect();
    this.observer = null;
    if (!this.onHomePage()) {
      return;
    }
    this.activeSection.set('home');
    // Sections mount with the freshly created home component, so observe on
    // the next frame rather than against nodes that do not exist yet.
    requestAnimationFrame(() => this.setupIntersectionObserver());
  }

  goHome(): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    } else if (isPlatformBrowser(this.platformId)) {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollTo(id: string): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else if (isPlatformBrowser(this.platformId)) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  isSectionActive(id: string): boolean {
    return this.onHomePage() && this.activeSection() === id;
  }

  private onHomePage(): boolean {
    const path = this.router.url.split(/[?#]/)[0];
    return path === '/' || path === '';
  }

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    for (const link of this.navLinks) {
      const el = document.getElementById(link.id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }
}
