import {
  Component,
  ChangeDetectionStrategy,
  signal,
  viewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-music-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 8px rgba(0, 160, 255, 0.3); }
      50% { box-shadow: 0 0 16px rgba(0, 160, 255, 0.5); }
    }

    .player-container {
      backdrop-filter: blur(12px);
      background: rgba(6, 10, 18, 0.85);
      border: 1px solid rgba(0, 170, 255, 0.2);
    }

    .player-container.playing {
      animation: pulse-glow 3s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .player-container.playing { animation: none; }
    }

    .progress-bar {
      cursor: pointer;
    }

    .progress-fill {
      transition: width 0.1s linear;
    }

    .play-btn {
      transition: color 0.2s, transform 0.15s;
    }

    .play-btn:hover {
      transform: scale(1.1);
    }

    .play-btn:active {
      transform: scale(0.95);
    }
  `,
  template: `
    <div
      class="player-container fixed bottom-4 right-4 z-50 rounded-lg p-3 w-64"
      [class.playing]="isPlaying()"
      role="region"
      aria-label="Music player"
    >
      <audio #audioEl preload="metadata" (ended)="onEnded()">
        <source src="assets/audio/taur.mp3" type="audio/mpeg" />
      </audio>


      <!-- Track info -->
      <div class="flex items-center gap-3 mb-2">
        <button
          class="play-btn flex-shrink-0 text-[#00aaff] bg-transparent border-none cursor-pointer p-0"
          (click)="togglePlay()"
          [attr.aria-label]="isPlaying() ? 'Pause' : 'Play'"
        >
          @if (isPlaying()) {
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          } @else {
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          }
        </button>

        <div class="min-w-0 flex-1">
          <p
            class="text-[11px] font-semibold text-foreground truncate leading-tight"
            style="font-family: 'Montserrat', sans-serif"
          >
            Taur (Instrumental)
          </p>
          <p class="text-[9px] text-muted-foreground truncate leading-tight">
            Bloodywood ft. Jaggi Singh
          </p>
        </div>

        <span class="text-[9px] text-foreground/40 tabular-nums flex-shrink-0">
          {{ formatTime(currentTime()) }} / {{ formatTime(duration()) }}
        </span>
      </div>

      <!-- Progress bar -->
      <div
        class="progress-bar relative h-1 bg-[#1e1e2e] rounded-full overflow-hidden"
        (click)="seek($event)"
        role="slider"
        [attr.aria-valuenow]="currentTime()"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="duration()"
        aria-label="Playback position"
        tabindex="0"
        (keydown)="onSeekKey($event)"
      >
        <div
          class="progress-fill absolute top-0 left-0 h-full bg-[#00aaff] rounded-full"
          [style.width.%]="progressPercent()"
        ></div>
      </div>
    </div>
  `,
})
export class MusicPlayerComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly audioRef = viewChild.required<ElementRef<HTMLAudioElement>>('audioEl');
  private updateInterval: ReturnType<typeof setInterval> | null = null;
  /** Skip to 1:23 where the instrumental builds up */
  private readonly START_OFFSET = 83;
  private onLoadedMetadata: (() => void) | null = null;
  private onDurationChange: (() => void) | null = null;

  readonly isPlaying = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);

  progressPercent(): number {
    return this.duration() > 0 ? (this.currentTime() / this.duration()) * 100 : 0;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const audio = this.audioRef().nativeElement;
    this.onLoadedMetadata = () => {
      this.duration.set(audio.duration);
      audio.currentTime = this.START_OFFSET;
      this.currentTime.set(this.START_OFFSET);
    };
    this.onDurationChange = () => this.duration.set(audio.duration);
    audio.addEventListener('loadedmetadata', this.onLoadedMetadata);
    audio.addEventListener('durationchange', this.onDurationChange);
  }

  ngOnDestroy(): void {
    this.stopUpdating();
    if (isPlatformBrowser(this.platformId)) {
      const audio = this.audioRef().nativeElement;
      if (this.onLoadedMetadata) {
        audio.removeEventListener('loadedmetadata', this.onLoadedMetadata);
      }
      if (this.onDurationChange) {
        audio.removeEventListener('durationchange', this.onDurationChange);
      }
    }
  }

  togglePlay(): void {
    const audio = this.audioRef().nativeElement;
    if (audio.paused) {
      audio.play().then(() => {
        this.isPlaying.set(true);
        this.startUpdating();
      }).catch(() => {
        audio.pause();
      });
    } else {
      audio.pause();
      this.isPlaying.set(false);
      this.stopUpdating();
    }
  }

  onEnded(): void {
    this.isPlaying.set(false);
    this.currentTime.set(0);
    this.stopUpdating();
  }

  seek(event: MouseEvent): void {
    const audio = this.audioRef().nativeElement;
    const bar = event.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    audio.currentTime = percent * audio.duration;
    this.currentTime.set(audio.currentTime);
  }

  onSeekKey(event: KeyboardEvent): void {
    const audio = this.audioRef().nativeElement;
    const step = 5;
    if (event.key === 'ArrowRight') {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + step);
    } else if (event.key === 'ArrowLeft') {
      audio.currentTime = Math.max(0, audio.currentTime - step);
    }
    this.currentTime.set(audio.currentTime);
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  private startUpdating(): void {
    this.stopUpdating();
    this.updateInterval = setInterval(() => {
      const audio = this.audioRef().nativeElement;
      this.currentTime.set(audio.currentTime);
    }, 250);
  }

  private stopUpdating(): void {
    if (this.updateInterval !== null) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}
