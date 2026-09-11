import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  signal,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const SITE_DESCRIPTION =
  'Portfolio of Ember Mills: Senior Full Stack Engineer in Saint Louis building ' +
  'accessible, inclusive web apps with .NET, Angular, Python, and more.';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen px-6 pt-32 pb-12" style="background: #0d0a1a" aria-labelledby="game-heading">
      <div class="mx-auto max-w-5xl">
        <a
          routerLink="/"
          class="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          style="color: #6a7090"
        >
          <span aria-hidden="true">&larr;</span> Back to site
        </a>

        <header class="mb-8">
          <h1
            id="game-heading"
            class="text-4xl font-black tracking-tight mb-3"
            style="font-family: 'Barlow Condensed', sans-serif; color: #4de8f0; text-shadow: 0 0 32px rgba(77,232,240,0.4)"
          >
            STARCATCHER
          </h1>
          <p class="text-base max-w-2xl" style="color: #9aa0c0">
            Fly as a little cat alien around a night sky collecting stars and
            dodging spiked balls.
          </p>
          <p class="text-base max-w-2xl mt-2" style="color: #9aa0c0">
            Built in Godot, with the characters modelled procedurally in Blender
            from a Python script.
          </p>
          <a
            [href]="standaloneUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 mt-4 text-sm font-semibold transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            style="color: #4de8f0"
          >
            Open the game on its own page <span aria-hidden="true">&nearr;</span>
          </a>
        </header>

        @if (!launched()) {
          <button
            type="button"
            (click)="launch()"
            class="group relative w-full cursor-pointer overflow-hidden rounded-xl border-none p-0 transition-all duration-200 hover:scale-[1.01] hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            style="aspect-ratio: 16 / 9; background: linear-gradient(160deg, #1a1233 0%, #0d0a1a 100%); border: 1px solid rgba(77,232,240,0.25)"
            [attr.aria-label]="'Load and play Starcatcher. Downloads about ' + downloadSizeMb + ' megabytes.'"
          >
            <span class="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span
                class="flex h-16 w-16 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(255,61,127,0.55)]"
                style="background: rgba(255,61,127,0.12); border: 1px solid rgba(255,61,127,0.45)"
                aria-hidden="true"
              >
                <!-- Nudged right: a triangle's visual mass sits left of its
                     bounding box, so a geometrically centred play glyph reads
                     as off-centre inside a circle. -->
                <svg width="22" height="26" viewBox="0 0 22 26" fill="#ff3d7f" class="translate-x-[2px]">
                  <path d="M0 0 L22 13 L0 26 Z" />
                </svg>
              </span>
              <span
                class="text-lg font-semibold"
                style="font-family: 'Barlow Condensed', sans-serif; color: #e8e6f5"
              >
                Play in browser
              </span>
              <span class="text-xs" style="color: #6a7090">
                About {{ downloadSizeMb }}MB to load &middot; desktop browser recommended
              </span>
            </span>
          </button>
        } @else {
          <div
            class="relative w-full overflow-hidden rounded-xl"
            style="aspect-ratio: 16 / 9; border: 1px solid rgba(77,232,240,0.25)"
          >
            @if (!ready()) {
              <div
                class="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style="background: #0d0a1a"
                role="status"
                aria-live="polite"
              >
                <span
                  class="h-8 w-8 animate-spin rounded-full"
                  style="border: 2px solid rgba(77,232,240,0.25); border-top-color: #4de8f0"
                  aria-hidden="true"
                ></span>
                <span class="text-sm" style="color: #9aa0c0">Loading Starcatcher&hellip;</span>
              </div>
            }
            <iframe
              #gameFrame
              [src]="gameUrl"
              (load)="focusGame(gameFrame)"
              title="Starcatcher, a browser game"
              class="absolute inset-0 h-full w-full"
              style="border: 0"
              allow="autoplay; fullscreen; gamepad"
            ></iframe>
          </div>
        }

        <section class="mt-8 grid gap-6 sm:grid-cols-2" aria-label="How to play and how it was built">
          <div>
            <h2
              class="text-sm font-semibold uppercase tracking-wider mb-3"
              style="color: #4de8f0"
            >
              Controls
            </h2>
            <ul class="space-y-1.5 text-sm" style="color: #9aa0c0">
              <li>WASD or arrow keys to fly</li>
              <li>Space to rise, C to descend</li>
              <li>V to recenter, R to restart</li>
            </ul>
          </div>
          <div>
            <h2
              class="text-sm font-semibold uppercase tracking-wider mb-3"
              style="color: #ff3d7f"
            >
              Built with
            </h2>
            <ul class="space-y-1.5 text-sm" style="color: #9aa0c0">
              <li>Godot 4.7, exported to WebAssembly</li>
              <li>Blender models generated from Python</li>
              <li>GDScript for flight, collisions, and animation</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class GamePageComponent implements OnInit, OnDestroy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly sanitizer = inject(DomSanitizer);

  // The WASM bundle is only fetched once the visitor asks for it, so the page
  // itself stays light for anyone who just wants to read about the project.
  protected readonly launched = signal(false);
  protected readonly ready = signal(false);
  protected readonly downloadSizeMb = 7;
  // Angular blocks raw string iframe sources; this path is our own build
  // output. It lives at /starlight, not /game: a public/game folder would
  // shadow the /game route and serve the bare Godot page instead of this page.
  protected readonly gameUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl('starlight/index.html');
  // The same build, hosted on its own so the game can be shared without the site.
  protected readonly standaloneUrl = 'https://embmeals.github.io/starcatcher/';

  ngOnInit(): void {
    this.title.setTitle('Starcatcher — a browser game by Ember Mills');
    this.meta.updateTag({
      name: 'description',
      content:
        'Starcatcher: fly as a little cat alien around a night sky collecting stars and dodging spiked balls. A Godot game with Blender models generated from Python.',
    });
  }

  ngOnDestroy(): void {
    // updateTag edits the document-wide description, so leaving this page
    // client-side would otherwise carry the game's copy back to the site.
    this.meta.updateTag({ name: 'description', content: SITE_DESCRIPTION });
  }

  protected launch(): void {
    this.launched.set(true);
  }

  protected focusGame(frame: HTMLIFrameElement): void {
    this.ready.set(true);
    frame.focus();
  }
}
