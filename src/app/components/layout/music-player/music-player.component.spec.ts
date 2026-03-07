import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MusicPlayerComponent } from './music-player.component';

describe('MusicPlayerComponent', () => {
  let component: MusicPlayerComponent;
  let fixture: ComponentFixture<MusicPlayerComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a play button', () => {
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Play');
  });

  it('should render track info', () => {
    const text = compiled.textContent;
    expect(text).toContain('Taur (Instrumental)');
    expect(text).toContain('Bloodywood');
  });

  it('should have a region role with aria-label', () => {
    const region = compiled.querySelector('[role="region"]');
    expect(region).toBeTruthy();
    expect(region?.getAttribute('aria-label')).toBe('Music player');
  });

  it('should have a progress bar with slider role', () => {
    const slider = compiled.querySelector('[role="slider"]');
    expect(slider).toBeTruthy();
    expect(slider?.getAttribute('aria-label')).toBe('Playback position');
  });

  it('should contain an audio element', () => {
    const audio = compiled.querySelector('audio');
    expect(audio).toBeTruthy();
  });

  it('should display time as 0:00 / 0:00 initially', () => {
    const text = compiled.textContent;
    expect(text).toContain('0:00 / 0:00');
  });

  it('should format time correctly', () => {
    expect(component.formatTime(0)).toBe('0:00');
    expect(component.formatTime(65)).toBe('1:05');
    expect(component.formatTime(125)).toBe('2:05');
    expect(component.formatTime(NaN)).toBe('0:00');
    expect(component.formatTime(3661)).toBe('61:01');
  });

  it('should start with isPlaying false', () => {
    expect(component.isPlaying()).toBe(false);
  });

  it('should start with progressPercent at 0', () => {
    expect(component.progressPercent()).toBe(0);
  });

  it('should calculate progressPercent from currentTime and duration', () => {
    component.currentTime.set(50);
    component.duration.set(200);
    expect(component.progressPercent()).toBe(25);
  });

  it('should reset state and audio element on ended', () => {
    const audioEl = compiled.querySelector('audio')!;
    Object.defineProperty(audioEl, 'currentTime', { writable: true, value: 200 });
    component.isPlaying.set(true);
    component.currentTime.set(100);
    component.onEnded();
    expect(component.isPlaying()).toBe(false);
    expect(component.currentTime()).toBe(0);
    expect(audioEl.currentTime).toBe(0);
  });

  it('should update button aria-label when playing', () => {
    component.isPlaying.set(true);
    fixture.detectChanges();
    const button = compiled.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('Pause');
  });

  it('should have keyboard-accessible progress bar', () => {
    const slider = compiled.querySelector('[role="slider"]');
    expect(slider?.getAttribute('tabindex')).toBe('0');
  });

  describe('togglePlay', () => {
    let audioEl: HTMLAudioElement;

    beforeEach(() => {
      audioEl = compiled.querySelector('audio')!;
    });

    it('should set isPlaying true on successful play', fakeAsync(() => {
      spyOn(audioEl, 'play').and.returnValue(Promise.resolve());
      component.togglePlay();
      tick();
      expect(component.isPlaying()).toBe(true);
    }));

    it('should not set isPlaying on rejected play', fakeAsync(() => {
      spyOn(audioEl, 'play').and.returnValue(Promise.reject(new DOMException('NotAllowed')));
      spyOn(audioEl, 'pause');
      component.togglePlay();
      tick();
      expect(component.isPlaying()).toBe(false);
      expect(audioEl.pause).toHaveBeenCalled();
    }));

    it('should not activate if component is destroyed before play resolves', fakeAsync(() => {
      let resolvePlay!: () => void;
      const deferred = new Promise<void>(r => { resolvePlay = r; });
      spyOn(audioEl, 'play').and.returnValue(deferred);
      component.togglePlay();
      fixture.destroy();
      resolvePlay();
      tick();
      expect(component.isPlaying()).toBe(false);
    }));

    it('should pause and set isPlaying false when playing', () => {
      component.isPlaying.set(true);
      spyOnProperty(audioEl, 'paused').and.returnValue(false);
      spyOn(audioEl, 'pause');
      component.togglePlay();
      expect(component.isPlaying()).toBe(false);
      expect(audioEl.pause).toHaveBeenCalled();
    });
  });

  describe('onSeekKey', () => {
    it('should advance time on ArrowRight', () => {
      const audioEl = compiled.querySelector('audio')!;
      spyOnProperty(audioEl, 'duration').and.returnValue(200);
      Object.defineProperty(audioEl, 'currentTime', { writable: true, value: 50 });

      component.onSeekKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(component.currentTime()).toBe(55);
    });

    it('should rewind time on ArrowLeft', () => {
      const audioEl = compiled.querySelector('audio')!;
      spyOnProperty(audioEl, 'duration').and.returnValue(200);
      Object.defineProperty(audioEl, 'currentTime', { writable: true, value: 50 });

      component.onSeekKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(component.currentTime()).toBe(45);
    });

    it('should not go below 0 on ArrowLeft', () => {
      const audioEl = compiled.querySelector('audio')!;
      spyOnProperty(audioEl, 'duration').and.returnValue(200);
      Object.defineProperty(audioEl, 'currentTime', { writable: true, value: 2 });

      component.onSeekKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(component.currentTime()).toBe(0);
    });
  });
});
