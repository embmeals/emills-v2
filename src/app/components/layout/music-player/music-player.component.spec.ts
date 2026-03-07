import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should reset state on ended', () => {
    component.isPlaying.set(true);
    component.currentTime.set(100);
    component.onEnded();
    expect(component.isPlaying()).toBe(false);
    expect(component.currentTime()).toBe(0);
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
});
