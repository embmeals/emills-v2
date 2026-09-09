import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-center gap-4 py-2" aria-hidden="true">
      <div class="h-px flex-1 max-w-[80px] bg-[#4de8f0]/20"></div>
      @if (label()) {
        <span
          class="text-[10px] tracking-[0.3em] uppercase text-[#4de8f0]/40"
          style="font-family: 'Montserrat', sans-serif"
        >
          {{ label() }}
        </span>
      }
      <div class="h-px flex-1 max-w-[80px] bg-[#4de8f0]/20"></div>
    </div>
  `,
})
export class SectionDividerComponent {
  readonly label = input('');
}
