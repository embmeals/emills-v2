import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

import { GALLERY_IMAGES, type GalleryImage } from '@/data/gallery.data';
import { LightboxComponent } from './lightbox.component';

type FolderFilter = 'all' | 'ember' | 'casey';

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
        Gallery
      </h2>

      <!-- Filter buttons -->
      <div class="flex justify-center gap-3 mb-10">
        @for (filter of filters; track filter.value) {
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            [class]="activeFilter() === filter.value
              ? 'bg-neon-magenta text-white'
              : 'bg-[#14141f] border border-[#1e1e2e] text-[#e0e0e0] hover:border-neon-magenta'"
            [attr.aria-pressed]="activeFilter() === filter.value"
            (click)="setFilter(filter.value)"
          >
            {{ filter.label }}
          </button>
        }
      </div>

      <!-- Masonry grid -->
      <div class="columns-2 sm:columns-3 gap-4 space-y-4">
        @for (image of filteredImages(); track image.src) {
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
        (closed)="closeLightbox()"
      />
    </section>
  `,
})
export class GalleryComponent {
  readonly filters: readonly { readonly value: FolderFilter; readonly label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'ember', label: 'Ember' },
    { value: 'casey', label: 'Casey' },
  ];

  readonly activeFilter = signal<FolderFilter>('all');
  readonly selectedImage = signal<GalleryImage | null>(null);
  readonly lightboxOpen = signal(false);

  readonly filteredImages = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.folder === filter);
  });

  setFilter(filter: FolderFilter): void {
    this.activeFilter.set(filter);
  }

  openLightbox(image: GalleryImage): void {
    this.selectedImage.set(image);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const index = GALLERY_IMAGES.findIndex((i) => i.src === img.src || img.src.endsWith(i.src));
    const num = index >= 0 ? index + 1 : 1;
    img.src = `https://placehold.co/400x500/14141f/e0e0e0?text=Collage+${num}`;
  }
}
