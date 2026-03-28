import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GALLERY_IMAGES } from '@/data/gallery.data';

interface FolderCard {
  readonly key: string;
  readonly label: string;
  readonly description: string;
  readonly thumbnail: string;
  readonly count: number;
}

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [RouterLink],
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

        <section class="py-20" aria-labelledby="gallery-heading">
          <h2
            id="gallery-heading"
            class="text-3xl font-bold text-center mb-4 text-[#e0e0e0]"
            style="font-family: 'Montserrat', sans-serif"
          >
            Studio
          </h2>

          <p class="text-center text-muted-foreground text-base max-w-xl mx-auto mb-12">
            Outside of engineering I make things with my hands — digital collages, film photography, screen prints, and stained glass. This is where I keep it all.
          </p>

          <div class="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto [&>a]:w-full [&>a]:sm:w-[calc(50%-0.75rem)] [&>a]:lg:w-[calc(33.333%-1rem)]">
            @for (folder of folders; track folder.key) {
              <a
                [routerLink]="['/studio', folder.key]"
                class="group relative rounded-xl overflow-hidden border-2 border-[#1e1e2e] bg-[#14141f] transition-all duration-300 hover:border-neon-magenta hover:glow-magenta hover:scale-[1.02] block"
              >
                <div class="aspect-[4/3] overflow-hidden">
                  <img
                    [src]="folder.thumbnail"
                    [alt]="folder.label"
                    loading="lazy"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    class="text-lg font-bold text-white mb-1"
                    style="font-family: 'Montserrat', sans-serif"
                  >
                    {{ folder.label }}
                  </h3>
                  <p class="text-sm text-[#a0a0a0]">{{ folder.description }}</p>
                  <p class="text-xs text-neon-magenta mt-1">{{ folder.count }} {{ folder.count === 1 ? 'piece' : 'pieces' }}</p>
                </div>
              </a>
            }
          </div>
        </section>
      </div>
    </div>
  `,
})
export class GalleryPageComponent implements OnInit {
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle('Studio | Ember Mills');
  }

  readonly folders: readonly FolderCard[] = [
    {
      key: 'ember',
      label: 'Ember',
      description: 'Collages',
      thumbnail: GALLERY_IMAGES.find((i) => i.folder === 'ember')?.src ?? '',
      count: GALLERY_IMAGES.filter((i) => i.folder === 'ember').length,
    },
    {
      key: 'casey',
      label: 'Casey',
      description: 'Collages',
      thumbnail: GALLERY_IMAGES.find((i) => i.folder === 'casey')?.src ?? '',
      count: GALLERY_IMAGES.filter((i) => i.folder === 'casey').length,
    },
    {
      key: 'film',
      label: 'Film',
      description: 'Photography',
      thumbnail: GALLERY_IMAGES.find((i) => i.folder === 'film')?.src ?? '',
      count: GALLERY_IMAGES.filter((i) => i.folder === 'film').length,
    },
    {
      key: 'screenprint',
      label: 'Screenprint',
      description: 'Apparel & Prints',
      thumbnail: GALLERY_IMAGES.find((i) => i.folder === 'screenprint')?.src ?? '',
      count: GALLERY_IMAGES.filter((i) => i.folder === 'screenprint').length,
    },
    {
      key: 'stained-glass',
      label: 'Stained Glass',
      description: 'Glass Art',
      thumbnail: GALLERY_IMAGES.find((i) => i.folder === 'stained-glass')?.src ?? '',
      count: GALLERY_IMAGES.filter((i) => i.folder === 'stained-glass').length,
    },
  ];
}
