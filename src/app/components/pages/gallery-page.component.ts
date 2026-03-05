import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GalleryComponent } from '@/components/sections/gallery/gallery.component';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [RouterLink, GalleryComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen pt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          routerLink="/"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-200 mb-4"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Home
        </a>
      </div>

      <app-gallery />
    </div>
  `,
})
export class GalleryPageComponent {}
