import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
  let fixture: ComponentFixture<EducationComponent>;

  const tabs = (): HTMLElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('[role="tab"]'));

  const text = (): string => fixture.nativeElement.textContent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EducationComponent] }).compileComponents();
    fixture = TestBed.createComponent(EducationComponent);
    fixture.detectChanges();
  });

  it('starts on the education tab', () => {
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
    expect(text()).toContain('B.S. in Computer Science');
    expect(text()).toContain('Expected 2026');
  });

  it('shows certifications when that tab is selected', () => {
    tabs()[1].click();
    fixture.detectChanges();

    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
    expect(text()).toContain('Salesforce Administrator');
    expect(text()).toContain('Full-Stack .NET Bootcamp');
    expect(text()).not.toContain('B.S. in Computer Science');
  });

  it('moves between tabs with the arrow keys', () => {
    tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.selected()).toBe(1);
  });

  it('wraps to the last tab from the first', () => {
    tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.selected()).toBe(1);
  });

  it('links each panel to its tab', () => {
    const panel = fixture.nativeElement.querySelector('[role="tabpanel"]');

    expect(panel.getAttribute('aria-labelledby')).toBe(tabs()[0].id);
  });
});
