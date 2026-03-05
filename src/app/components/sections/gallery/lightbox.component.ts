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
          (click)="closed.emit()"
        >
          &#10005;
        </button>

        <img
          [src]="imageSrc()"
          [alt]="imageTitle()"
          class="max-w-4xl max-h-[80vh] w-auto h-auto object-contain rounded-lg"
          style="box-shadow: 0 0 20px rgba(255, 45, 123, 0.4), 0 0 40px rgba(255, 45, 123, 0.15)"
        />
      </div>
    }
  `,
})
export class LightboxComponent {
  readonly imageSrc = input.required<string>();
  readonly imageTitle = input.required<string>();
  readonly isOpen = input.required<boolean>();
  readonly closed = output<void>();

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

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).tagName !== 'IMG') {
      this.closed.emit();
    }
  }
}
