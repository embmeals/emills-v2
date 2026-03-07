import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-[#1e1e2e] bg-[#0a0a0f] py-8 px-4">
      <div class="max-w-7xl mx-auto flex flex-col items-center gap-3">
        <p class="text-[#8a8a96] text-sm">Built with Angular &amp; Zard UI</p>
        <p class="text-[#8a8a96] text-xs">&copy; {{ currentYear }} Ember Mills</p>
        <p
          class="text-[#00aaff]/15 text-[9px] tracking-[0.5em] uppercase mt-2"
          style="font-family: 'Montserrat', sans-serif; font-weight: 500"
          aria-hidden="true"
        >
          Remember the Cant
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
