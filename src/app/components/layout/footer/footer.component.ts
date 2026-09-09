import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-[#1e1e2e] bg-[#0a0a0f] py-8 px-4">
      <div class="max-w-7xl mx-auto flex flex-col items-center gap-3">
        <p class="text-[#8a8a96] text-sm">Built with Angular &amp; Zard UI</p>
        <p class="text-[#8a8a96] text-xs">&copy; {{ currentYear }} Ember Mills. All rights reserved.</p>
        <p class="text-[#8a8a96]/50 text-[10px]">All artwork is original work. Unauthorized use is prohibited.</p>
        <p class="text-[#4de8f0]/40 text-[10px] italic" style="font-family: 'Barlow Condensed', sans-serif; text-transform: uppercase; letter-spacing: 0.15em;">
          Built with coffee &amp; questionable commit messages
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
