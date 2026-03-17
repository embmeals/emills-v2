import { Component, ChangeDetectionStrategy, signal, computed, input } from '@angular/core';

import { GALLERY_IMAGES, type GalleryImage } from '@/data/gallery.data';
import { LightboxComponent } from './lightbox.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [LightboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="gallery-heading"
    >
      <h2
        id="gallery-heading"
        class="text-3xl font-bold text-center mb-8 text-[#e0e0e0]"
        style="font-family: 'Montserrat', sans-serif"
      >
        {{ folderTitle() }}
      </h2>

      <!-- Masonry grid -->
      @if (folderImages().length === 0) {
        <p class="text-center text-muted-foreground text-sm py-12">No pieces yet.</p>
      }
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        @for (image of folderImages(); track image.src) {
          <button
            type="button"
            class="break-inside-avoid w-full rounded-lg overflow-hidden cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-neon-magenta hover:glow-magenta hover:scale-[1.02] p-0 bg-transparent relative"
            (click)="openLightbox(image)"
            (contextmenu)="$event.preventDefault()"
          >
            <img
              [src]="image.src"
              [alt]="image.title"
              loading="lazy"
              draggable="false"
              class="w-full h-auto block bg-[#14141f] select-none max-h-[80vh] object-contain"
              style="-webkit-user-drag: none; -webkit-touch-callout: none"
              (error)="onImageError($event)"
            />
            <div class="absolute inset-0" aria-hidden="true"></div>
          </button>
        }
      </div>

      <app-lightbox
        [imageSrc]="selectedImage()?.src ?? ''"
        [imageTitle]="selectedImage()?.title ?? ''"
        [isOpen]="lightboxOpen()"
        [hasPrev]="hasPrev()"
        [hasNext]="hasNext()"
        (closed)="closeLightbox()"
        (prev)="showPrev()"
        (next)="showNext()"
      />
    </section>
  `,
})
export class GalleryComponent {
  readonly folder = input.required<string>();

  readonly selectedIndex = signal(-1);
  readonly lightboxOpen = signal(false);

  readonly folderImages = computed(() => {
    return GALLERY_IMAGES.filter((img) => img.folder === this.folder());
  });

  readonly folderTitle = computed(() => {
    const titles: Record<string, string> = {
      ember: 'Ember',
      casey: 'Casey',
      film: 'Film',
      screenprint: 'Screenprint',
      'stained-glass': 'Stained Glass',
    };
    return titles[this.folder()] ?? 'Studio';
  });

  readonly selectedImage = computed(() => {
    const idx = this.selectedIndex();
    const images = this.folderImages();
    return idx >= 0 && idx < images.length ? images[idx] : null;
  });

  readonly hasPrev = computed(() => this.folderImages().length > 1);
  readonly hasNext = computed(() => this.folderImages().length > 1);

  openLightbox(image: GalleryImage): void {
    const idx = this.folderImages().findIndex((img) => img.src === image.src);
    this.selectedIndex.set(idx);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  showPrev(): void {
    const len = this.folderImages().length;
    const idx = this.selectedIndex();
    this.selectedIndex.set(idx <= 0 ? len - 1 : idx - 1);
  }

  showNext(): void {
    const len = this.folderImages().length;
    const idx = this.selectedIndex();
    this.selectedIndex.set(idx >= len - 1 ? 0 : idx + 1);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const index = GALLERY_IMAGES.findIndex((i) => i.src === img.src || img.src.endsWith(i.src));
    const num = index >= 0 ? index + 1 : 1;
    img.src = `https://placehold.co/400x500/14141f/e0e0e0?text=Image+${num}`;
  }
}
