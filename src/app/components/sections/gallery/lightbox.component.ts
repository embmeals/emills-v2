import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  ElementRef,
  viewChild,
  effect,
  Injector,
  inject,
  afterNextRender,
} from '@angular/core';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscapeKey()',
    '(document:keydown.ArrowLeft)': 'onPrev()',
    '(document:keydown.ArrowRight)': 'onNext()',
  },
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        (click)="onBackdropClick($event)"
      >
        <button
          #closeButton
          type="button"
          class="absolute top-4 right-4 z-50 text-white text-3xl leading-none cursor-pointer transition-colors duration-200 hover:text-neon-magenta focus:outline-none focus:ring-2 focus:ring-neon-magenta rounded"
          aria-label="Close lightbox"
          (click)="onCloseClick($event)"
        >
          &#10005;
        </button>

        <!-- Previous button -->
        @if (hasPrev()) {
          <button
            type="button"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-neon-magenta transition-colors duration-200 cursor-pointer bg-black/40 hover:bg-black/60 rounded-full w-12 h-12 flex items-center justify-center"
            aria-label="Previous image"
            (click)="onPrevClick($event)"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        }

        <!-- Next button -->
        @if (hasNext()) {
          <button
            type="button"
            class="absolute right-16 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-neon-magenta transition-colors duration-200 cursor-pointer bg-black/40 hover:bg-black/60 rounded-full w-12 h-12 flex items-center justify-center"
            aria-label="Next image"
            (click)="onNextClick($event)"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        }

        <img
          [src]="imageSrc()"
          [alt]="imageTitle()"
          class="max-w-[90vw] sm:max-w-4xl max-h-[70vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-lg select-none pointer-events-none"
          draggable="false"
          style="box-shadow: 0 0 20px rgba(255, 45, 123, 0.4), 0 0 40px rgba(255, 45, 123, 0.15); -webkit-user-drag: none"
        />
      </div>
    }
  `,
})
export class LightboxComponent {
  readonly imageSrc = input.required<string>();
  readonly imageTitle = input.required<string>();
  readonly isOpen = input.required<boolean>();
  readonly hasPrev = input<boolean>(false);
  readonly hasNext = input<boolean>(false);
  readonly closed = output<void>();
  readonly prev = output<void>();
  readonly next = output<void>();

  readonly closeButtonRef = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  private readonly injector = inject(Injector);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        afterNextRender(
          () => {
            this.closeButtonRef()?.nativeElement.focus();
          },
          { injector: this.injector },
        );
      }
    });
  }

  onEscapeKey(): void {
    if (this.isOpen()) {
      this.closed.emit();
    }
  }

  onPrev(): void {
    if (this.isOpen() && this.hasPrev()) {
      this.prev.emit();
    }
  }

  onNext(): void {
    if (this.isOpen() && this.hasNext()) {
      this.next.emit();
    }
  }

  onPrevClick(event: MouseEvent): void {
    event.stopPropagation();
    this.prev.emit();
  }

  onNextClick(event: MouseEvent): void {
    event.stopPropagation();
    this.next.emit();
  }

  onCloseClick(event: MouseEvent): void {
    event.stopPropagation();
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).tagName !== 'IMG') {
      this.closed.emit();
    }
  }
}
