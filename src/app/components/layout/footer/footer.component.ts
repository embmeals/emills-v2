import { Component, ChangeDetectionStrategy } from '@angular/core';

interface SocialLink {
  readonly label: string;
  readonly url: string;
  readonly icon: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-[#1e1e2e] bg-[#0a0a0f] py-8 px-4">
      <div class="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <!-- Social links -->
        <div class="flex items-center gap-6" aria-label="Social links">
          @for (link of socialLinks; track link.label) {
            <a
              [href]="link.url"
              [attr.aria-label]="link.label"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[#a0a0b0] hover:text-neon-cyan transition-colors duration-200"
            >
              <!-- GitHub -->
              @if (link.icon === 'github') {
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                  />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              }
              <!-- LinkedIn -->
              @if (link.icon === 'linkedin') {
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                  />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              }
              <!-- CodePen -->
              @if (link.icon === 'codepen') {
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  <line x1="12" x2="12" y1="22" y2="15.5" />
                  <polyline points="22 8.5 12 15.5 2 8.5" />
                  <polyline points="2 15.5 12 8.5 22 15.5" />
                  <line x1="12" x2="12" y1="2" y2="8.5" />
                </svg>
              }
            </a>
          }
        </div>

        <!-- Built with -->
        <p class="text-[#606070] text-sm">Built with Angular &amp; Zard UI</p>

        <!-- Copyright -->
        <p class="text-[#606070] text-xs">&copy; 2026 Ember Mills</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly socialLinks: readonly SocialLink[] = [
    {
      label: 'GitHub',
      url: 'https://github.com/embmeals',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ember-d-mills',
      icon: 'linkedin',
    },
    {
      label: 'CodePen',
      url: 'https://codepen.io/ambmeals',
      icon: 'codepen',
    },
  ] as const;
}
