import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @keyframes nodePulse {
      0%, 100% {
        box-shadow: 0 0 6px rgba(0, 170, 255, 0.4), 0 0 12px rgba(0, 170, 255, 0.2);
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 10px rgba(0, 170, 255, 0.6), 0 0 20px rgba(0, 170, 255, 0.3);
        transform: scale(1.3);
      }
    }

    .divider-node {
      animation: nodePulse 3s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .divider-node { animation: none; }
    }
  `,
  template: `
    <div class="flex items-center justify-center gap-0 py-2" aria-hidden="true">
      <div class="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#00aaff]/30"></div>
      <div class="divider-node w-2 h-2 rounded-full bg-[#00aaff] mx-3"></div>
      @if (label()) {
        <span
          class="text-[9px] tracking-[0.35em] uppercase text-[#00aaff]/30 mx-2"
          style="font-family: 'Montserrat', sans-serif"
        >
          {{ label() }}
        </span>
        <div class="divider-node w-2 h-2 rounded-full bg-[#00aaff] mx-3"></div>
      }
      <div class="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#00aaff]/30"></div>
    </div>
  `,
})
export class SectionDividerComponent {
  readonly label = input('');
}
