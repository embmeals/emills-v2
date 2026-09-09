import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevCardComponent } from './dev-card.component';

describe('DevCardComponent', () => {
  let fixture: ComponentFixture<DevCardComponent>;

  const card = (): HTMLElement => fixture.nativeElement.querySelector('[role="button"]');

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DevCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(DevCardComponent);
    fixture.detectChanges();
  });

  it('starts on the front face showing the profile', () => {
    expect(card().getAttribute('aria-pressed')).toBe('false');
    expect(card().classList).not.toContain('is-flipped');
    expect(fixture.nativeElement.textContent).toContain('User Profile');
  });

  it('flips on click to reveal the skills', () => {
    card().click();
    fixture.detectChanges();

    expect(card().getAttribute('aria-pressed')).toBe('true');
    expect(card().classList).toContain('is-flipped');
    expect(fixture.nativeElement.textContent).toContain('Skills');
    expect(fixture.nativeElement.textContent).toContain('C#');
  });

  it('flips back on a second click', () => {
    card().click();
    card().click();
    fixture.detectChanges();

    expect(card().getAttribute('aria-pressed')).toBe('false');
  });

  it('flips with the keyboard', () => {
    card().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(card().getAttribute('aria-pressed')).toBe('true');
  });
});
