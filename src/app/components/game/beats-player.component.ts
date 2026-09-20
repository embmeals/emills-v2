import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  NgZone,
  OnDestroy,
  AfterViewInit,
  inject,
  signal,
  viewChild,
} from '@angular/core';

/**
 * Live embed of the beats dive sequencer: the same score the Python
 * visualizer renders, drawn on a canvas and driven by the shared audio
 * clock, so every icon hops exactly when its note sounds. The render is
 * stateless - each frame is a pure function of audio.currentTime - which
 * keeps it in sync through pauses, loops and sheet flips.
 */

interface ScoreEvent {
  t: number;
  lane: string;
}
interface ScoreSpan {
  t0: number;
  t1: number;
  lane: string;
}
interface ScoreSection {
  start: number;
  end: number;
  name: string;
}
interface ScoreTrack {
  kind: string;
  offset: number;
  lanes: string[];
  step: number;
  secondsPerBar: number;
  bars: number;
  events: ScoreEvent[];
  spans: ScoreSpan[];
  sections: ScoreSection[];
}
interface Score {
  duration: number;
  tracks: ScoreTrack[];
}

const W = 1120;
const HEADER_H = 44;
const RULER_H = 26;
const LANE_H = 40;
const LEFT = 118;
const COL_W = 22;
const FISH_X = LEFT + Math.trunc((W - LEFT) * 0.32);
const HOP_S = 0.35;
const RING_S = 0.35;

const BG = '#0a2440';
const GRID_LINE = '#16456b';
const BAR_LINE = '#3a7ca5';
const BAR_TEXT = '#8ecae6';
const HEADER_TEXT = '#bfe0ff';
const PLAYLINE = '#ff8c42';
const SPAN_FILL: Record<string, string> = { pads: '#164a63', whale: '#1f4e6e', arp: '#1b4a72' };
const SPAN_EDGE: Record<string, string> = { pads: '#3a7ca5', whale: '#3a7ca5', arp: '#3a86c8' };
const SPAN_LIT: Record<string, string> = { pads: '#3a8fb0', whale: '#3a7ca5', arp: '#2a6f9e' };
const RING_COLOR: Record<string, string> = {
  bell: '#ffd166',
  sonar: '#4fd6e0',
  boom: '#9d7bd8',
  lead: '#ffd166',
};
const SPRITE_DIR = 'assets/beats/sprites/';

function gridH(lanes: number): number {
  return lanes * LANE_H;
}

@Component({
  selector: 'app-beats-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative overflow-hidden rounded-xl"
      style="border: 1px solid rgba(77,232,240,0.25)"
    >
      <canvas
        #canvas
        width="1120"
        height="526"
        class="block w-full"
        [attr.aria-label]="
          'The beats dive sequencer playing the abyss and trench tracks. ' +
          (playing() ? 'Playing.' : 'Paused.')
        "
      ></canvas>
      <button
        type="button"
        (click)="toggle()"
        class="absolute cursor-pointer rounded-full transition-all duration-200 hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        [attr.aria-label]="playing() ? 'Pause the sequencer' : 'Play the sequencer'"
        [style]="
          'width: 48px; height: 48px; top: 16px; right: 24px; border: 2px solid #061726; ' +
          (playing() ? 'background:#e63946' : 'background:#2a9d8f')
        "
      >
        @if (playing()) {
          <span
            aria-hidden="true"
            class="absolute inset-0 flex items-center justify-center gap-2"
          >
            <span class="rounded-[2px]" style="width: 6px; height: 20px; background: #fff8e7"></span>
            <span class="rounded-[2px]" style="width: 6px; height: 20px; background: #fff8e7"></span>
          </span>
        } @else {
          <svg
            aria-hidden="true"
            width="20"
            height="24"
            viewBox="0 0 22 26"
            fill="#fff8e7"
            class="absolute inset-0 m-auto translate-x-[2px]"
          >
            <path d="M0 0 L22 13 L0 26 Z" />
          </svg>
        }
      </button>
    </div>
    <audio #audio src="assets/beats/dive.mp3" preload="none" loop></audio>
  `,
})
export class BeatsPlayerComponent implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly audioRef = viewChild.required<ElementRef<HTMLAudioElement>>('audio');

  protected readonly playing = signal(false);

  private score: Score | null = null;
  private sprites = new Map<string, HTMLImageElement>();
  private frameHandle = 0;
  private running = false;

  ngAfterViewInit(): void {
    void fetch('assets/beats/score.json')
      .then((response) => response.json())
      .then((score: Score) => {
        this.score = score;
        this.preloadSprites(score);
        this.startRenderLoop();
      });
  }

  ngOnDestroy(): void {
    this.running = false;
    cancelAnimationFrame(this.frameHandle);
  }

  protected toggle(): void {
    const audio = this.audioRef().nativeElement;
    if (this.playing()) {
      audio.pause();
      this.playing.set(false);
    } else {
      void audio.play().then(() => this.playing.set(true));
    }
  }

  private preloadSprites(score: Score): void {
    const lanes = new Set<string>(['anglerfish']);
    for (const track of score.tracks) {
      track.lanes.forEach((lane) => lanes.add(lane));
      track.lanes.forEach((lane) => lanes.add(`${lane}_gray`));
    }
    for (const lane of lanes) {
      const image = new Image();
      image.src = `${SPRITE_DIR}${lane}.png`;
      this.sprites.set(lane, image);
    }
  }

  private startRenderLoop(): void {
    this.zone.runOutsideAngular(() => {
      this.running = true;
      const step = (): void => {
        if (!this.running) {
          return;
        }
        this.drawFrame();
        this.frameHandle = requestAnimationFrame(step);
      };
      this.frameHandle = requestAnimationFrame(step);
    });
  }

  private drawFrame(): void {
    const canvas = this.canvasRef().nativeElement;
    const context = canvas.getContext('2d');
    if (!context || !this.score) {
      return;
    }
    const audio = this.audioRef().nativeElement;
    this.render(context, audio.currentTime);
  }

  private render(context: CanvasRenderingContext2D, t: number): void {
    const score = this.score!;
    const track = activeTrack(score, t);
    if (!track) {
      return;
    }
    const height = gridH(Math.max(...score.tracks.map((entry) => entry.lanes.length)));
    const gridTop = HEADER_H + RULER_H;
    const laneH = height / track.lanes.length;
    const localT = t - track.offset;
    const rowFloat = localT / track.step;

    context.fillStyle = BG;
    context.fillRect(0, 0, W, HEADER_H + RULER_H + height + 16);
    this.drawGrid(context, track, gridTop, height, rowFloat);
    this.drawSpans(context, track, t, gridTop, laneH, rowFloat);
    this.drawLaneLabels(context, track, gridTop, laneH);
    this.drawEvents(context, track, t, gridTop, laneH, rowFloat);
    this.drawFish(context, t, gridTop, height);
    this.drawHeader(context, track, localT);
  }

  private drawGrid(
    context: CanvasRenderingContext2D,
    track: ScoreTrack,
    gridTop: number,
    height: number,
    rowFloat: number,
  ): void {
    const gridBottom = gridTop + height;
    for (let row = Math.max(0, Math.floor(rowFloat) - 14); row <= Math.min(track.bars * 16, rowFloat + 32); row++) {
      const x = FISH_X + (row - rowFloat) * COL_W;
      if (x < LEFT - 2 * COL_W || x > W) {
        continue;
      }
      context.strokeStyle = row % 16 === 0 ? BAR_LINE : GRID_LINE;
      context.beginPath();
      context.moveTo(x, gridTop);
      context.lineTo(x, gridBottom);
      context.stroke();
      if (row % 16 === 0) {
        context.fillStyle = BAR_TEXT;
        context.font = '8px Helvetica, sans-serif';
        context.textAlign = 'center';
        context.fillText(String(row / 16 + 1), x, HEADER_H + RULER_H / 2 + 2);
      }
    }
  }

  private drawSpans(
    context: CanvasRenderingContext2D,
    track: ScoreTrack,
    t: number,
    gridTop: number,
    laneH: number,
    rowFloat: number,
  ): void {
    for (const span of track.spans) {
      if (span.t1 < t - 1 || span.t0 > t + 3) {
        continue;
      }
      const laneIndex = track.lanes.indexOf(span.lane);
      if (laneIndex < 0) {
        continue;
      }
      const y = gridTop + laneIndex * laneH + laneH / 2;
      const x0 = FISH_X + ((span.t0 - track.offset) / track.step - rowFloat) * COL_W;
      const x1 = FISH_X + ((span.t1 - track.offset) / track.step - rowFloat) * COL_W;
      const inside = t >= span.t0 && t <= span.t1;
      context.fillStyle = inside ? SPAN_LIT[span.lane] : SPAN_FILL[span.lane];
      context.strokeStyle = SPAN_EDGE[span.lane];
      context.fillRect(x0, y - 8, Math.max(2, x1 - x0), 16);
      context.strokeRect(x0, y - 8, Math.max(2, x1 - x0), 16);
    }
  }

  private drawLaneLabels(
    context: CanvasRenderingContext2D,
    track: ScoreTrack,
    gridTop: number,
    laneH: number,
  ): void {
    context.textAlign = 'right';
    track.lanes.forEach((lane, index) => {
      const y = gridTop + index * laneH + laneH / 2;
      this.drawSprite(context, lane, 40, y);
      context.fillStyle = BAR_TEXT;
      context.font = 'bold 8px Helvetica, sans-serif';
      context.fillText(lane.toUpperCase(), LEFT - 8, y + 13);
    });
  }

  private drawEvents(
    context: CanvasRenderingContext2D,
    track: ScoreTrack,
    t: number,
    gridTop: number,
    laneH: number,
    rowFloat: number,
  ): void {
    for (const event of track.events) {
      const age = t - event.t;
      const x = FISH_X + ((event.t - track.offset) / track.step - rowFloat) * COL_W;
      if (x < LEFT - 2 * COL_W || x > W + 2 * COL_W) {
        continue;
      }
      const laneIndex = track.lanes.indexOf(event.lane);
      if (laneIndex < 0) {
        continue;
      }
      const y = gridTop + laneIndex * laneH + laneH / 2;
      const passed = age >= 0;
      const hopping = passed && age < HOP_S;
      const hop = hopping ? -LANE_H * 0.1 * Math.sin((Math.PI * age) / HOP_S) ** 2 : 0;
      const sprite = passed && !hopping ? `${event.lane}_gray` : event.lane;
      this.drawSprite(context, sprite, x, y + hop);
      if (passed && age < RING_S && RING_COLOR[event.lane]) {
        const progress = Math.min(1, age / 0.2);
        const radius = 12 + 52 * progress;
        context.strokeStyle = RING_COLOR[event.lane];
        context.lineWidth = age < 0.15 ? 2 : 1;
        context.beginPath();
        context.arc(x, y + hop, radius, 0, Math.PI * 2);
        context.stroke();
      }
    }
  }

  private drawFish(context: CanvasRenderingContext2D, t: number, gridTop: number, height: number): void {
    context.strokeStyle = PLAYLINE;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(FISH_X, gridTop);
    context.lineTo(FISH_X, gridTop + height);
    context.stroke();

    const center = gridTop + height / 2;
    const meander = height / 2 - 30;
    const x = FISH_X + 6 * Math.sin(t * 1.1);
    const y = center + Math.sin(t * 0.35) * meander + 2 * Math.sin(t * 9);
    const fish = this.sprites.get('anglerfish');
    if (fish?.complete) {
      context.save();
      context.translate(x, y);
      context.scale(-1, 1); // sprite faces left; the playhead swims right
      context.drawImage(fish, -fish.width / 2, -fish.height / 2);
      context.restore();
    }
  }

  private drawHeader(context: CanvasRenderingContext2D, track: ScoreTrack, localT: number): void {
    const bar = Math.floor(localT / track.secondsPerBar);
    if (bar < 0 || bar >= track.bars) {
      return;
    }
    const section = track.sections.find((entry) => bar >= entry.start && bar < entry.end);
    const name = section?.name ?? 'dive';
    context.fillStyle = HEADER_TEXT;
    context.font = 'bold 11px Helvetica, sans-serif';
    context.textAlign = 'left';
    context.fillText(
      `${track.kind} · bar ${bar + 1}/${track.bars} · ${name} · depth ${bar * 9}m`,
      14,
      HEADER_H / 2 + 8,
    );
  }

  private drawSprite(
    context: CanvasRenderingContext2D,
    name: string,
    x: number,
    y: number,
  ): void {
    const image = this.sprites.get(name);
    if (image?.complete && image.naturalWidth) {
      context.drawImage(image, x - image.width / 2, y - image.height / 2);
    }
  }
}

function activeTrack(score: Score, t: number): ScoreTrack | null {
  let found: ScoreTrack | null = null;
  for (const track of score.tracks) {
    if (t >= track.offset) {
      found = track;
    }
  }
  return found;
}