import { Component, ChangeDetectionStrategy, computed, inject, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GalleryComponent } from '@/components/sections/gallery/gallery.component';

@Component({
  selector: 'app-gallery-folder-page',
  standalone: true,
  imports: [RouterLink, GalleryComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen pt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          routerLink="/studio"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-200 mb-4"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Studio
        </a>
      </div>

      @if (folder()) {
        <app-gallery [folder]="folder()!" />
      }
    </div>
  `,
})
export class GalleryFolderPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);

  readonly folder = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('folder'))),
  );

  private readonly titles: Record<string, string> = {
    ember: 'Ember',
    casey: 'Casey',
    film: 'Film',
    screenprint: 'Screenprint',
    'stained-glass': 'Stained Glass',
  };

  constructor() {
    effect(() => {
      const f = this.folder();
      if (f) {
        const label = this.titles[f] ?? f;
        this.titleService.setTitle(`Studio — ${label} | Ember Mills`);
      }
    });
  }
}
