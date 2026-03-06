import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ContactLink {
  readonly label: string;
  readonly url: string;
  readonly icon: 'email' | 'github' | 'linkedin' | 'codepen';
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="font-heading text-3xl font-bold text-foreground mb-4">
          Let's Connect
        </h2>
        <p class="text-muted-foreground text-lg">
          Have a project in mind or just want to chat? Reach out!
        </p>

        <div class="flex gap-8 justify-center mt-8 flex-wrap">
          @for (link of contactLinks; track link.label) {
            <a
              [href]="link.url"
              [attr.aria-label]="link.label"
              [target]="link.url.startsWith('mailto:') ? '_self' : '_blank'"
              [rel]="link.url.startsWith('mailto:') ? null : 'noopener noreferrer'"
              class="group flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-cyan hover:glow-cyan transition-all duration-300"
            >
              <!-- Email -->
              @if (link.icon === 'email') {
                <svg
                  class="w-10 h-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
              <!-- GitHub -->
              @if (link.icon === 'github') {
                <svg
                  class="w-10 h-10"
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
                  class="w-10 h-10"
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
                  class="w-10 h-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon
                    points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"
                  />
                  <line x1="12" x2="12" y1="22" y2="15.5" />
                  <polyline points="22 8.5 12 15.5 2 8.5" />
                  <polyline points="2 15.5 12 8.5 22 15.5" />
                  <line x1="12" x2="12" y1="2" y2="8.5" />
                </svg>
              }
              <span class="text-sm text-muted-foreground group-hover:text-neon-cyan transition-colors duration-300">
                {{ link.label }}
              </span>
            </a>
          }

          <a
            routerLink="/gallery"
            aria-label="Gallery"
            class="group flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-magenta hover:glow-magenta transition-all duration-300"
          >
            <svg
              class="w-10 h-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span class="text-sm text-muted-foreground group-hover:text-neon-magenta transition-colors duration-300">
              Gallery
            </span>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  readonly contactLinks: readonly ContactLink[] = [
    {
      label: 'Email',
      url: 'mailto:hello@emills.net',
      icon: 'email',
    },
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
