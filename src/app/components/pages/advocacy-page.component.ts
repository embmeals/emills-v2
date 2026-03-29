import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AdvocacyComponent } from '@/components/sections/advocacy/advocacy.component';

@Component({
  selector: 'app-advocacy-page',
  standalone: true,
  imports: [RouterLink, AdvocacyComponent],
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

        <section class="py-20">
          <app-advocacy />
        </section>
      </div>
    </div>
  `,
})
export class AdvocacyPageComponent implements OnInit {
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle('Advocacy | Ember Mills');
  }
}
