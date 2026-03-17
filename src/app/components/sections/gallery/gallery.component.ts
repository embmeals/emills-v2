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
      <div class="columns-2 sm:columns-3 gap-4 space-y-4">
        @for (image of folderImages(); track image.src) {
          <button
            type="button"
            class="break-inside-avoid rounded-lg overflow-hidden cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-neon-magenta hover:glow-magenta hover:scale-[1.02] p-0 bg-transparent"
            (click)="openLightbox(image)"
          >
            <img
              [src]="image.src"
              [alt]="image.title"
              loading="lazy"
              class="w-full h-auto block bg-[#14141f]"
              (error)="onImageError($event)"
            />
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

  readonly selectedImage = signal<GalleryImage | null>(null);
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
    return titles[this.folder()] ?? 'Gallery';
  });

  readonly selectedIndex = computed(() => {
    const selected = this.selectedImage();
    if (!selected) return -1;
    return this.folderImages().findIndex((img) => img.src === selected.src);
  });

  readonly hasPrev = computed(() => this.selectedIndex() > 0);
  readonly hasNext = computed(() => {
    const idx = this.selectedIndex();
    return idx >= 0 && idx < this.folderImages().length - 1;
  });

  openLightbox(image: GalleryImage): void {
    this.selectedImage.set(image);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  showPrev(): void {
    const idx = this.selectedIndex();
    if (idx > 0) {
      this.selectedImage.set(this.folderImages()[idx - 1]);
    }
  }

  showNext(): void {
    const idx = this.selectedIndex();
    const images = this.folderImages();
    if (idx >= 0 && idx < images.length - 1) {
      this.selectedImage.set(images[idx + 1]);
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const index = GALLERY_IMAGES.findIndex((i) => i.src === img.src || img.src.endsWith(i.src));
    const num = index >= 0 ? index + 1 : 1;
    img.src = `https://placehold.co/400x500/14141f/e0e0e0?text=Image+${num}`;
  }
}
