import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';
import { EXPERIENCES } from '@/data/experience.data';

describe('ExperienceComponent', () => {
  let fixture: ComponentFixture<ExperienceComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render section title "Experience"', () => {
    const heading = element.querySelector('h2');
    expect(heading?.textContent?.trim()).toBe('Experience');
  });

  it('should render all experience entries', () => {
    const cards = element.querySelectorAll('.hidden.md\\:grid .exp-card');
    expect(cards.length).toBe(EXPERIENCES.length);
  });

  it('should display role for each entry', () => {
    const cards = Array.from(element.querySelectorAll('.exp-card'));
    const cardTexts = cards.map((c) => c.textContent);

    for (const exp of EXPERIENCES) {
      expect(cardTexts.some((text) => text?.includes(exp.role))).toBeTrue();
    }
  });

  it('should display company for each entry', () => {
    const cards = Array.from(element.querySelectorAll('.exp-card'));
    const cardTexts = cards.map((c) => c.textContent);

    for (const exp of EXPERIENCES) {
      expect(cardTexts.some((text) => text?.includes(exp.company))).toBeTrue();
    }
  });

  it('should display date range for each entry', () => {
    const cards = Array.from(element.querySelectorAll('.exp-card'));
    const cardTexts = cards.map((c) => c.textContent);

    for (const exp of EXPERIENCES) {
      const hasDate = cardTexts.some(
        (text) => text?.includes(exp.startDate) && text?.includes(exp.endDate),
      );
      expect(hasDate).toBeTrue();
    }
  });

  it('should render all accomplishments as list items', () => {
    const items = element.querySelectorAll('.hidden.md\\:grid .exp-card li');
    const totalAccomplishments = EXPERIENCES.reduce(
      (sum, exp) => sum + exp.accomplishments.length,
      0,
    );
    expect(items.length).toBe(totalAccomplishments);
  });

  it('should contain expected accomplishment text', () => {
    const listItemTexts = Array.from(element.querySelectorAll('.exp-card li')).map(
      (el) => el.textContent?.trim(),
    );

    for (const exp of EXPERIENCES) {
      for (const accomplishment of exp.accomplishments) {
        expect(listItemTexts).toContain(accomplishment);
      }
    }
  });

  it('should have aria-labelledby linking section to heading', () => {
    const section = element.querySelector('section');
    const heading = element.querySelector('h2');
    expect(section?.getAttribute('aria-labelledby')).toBe('experience-heading');
    expect(heading?.id).toBe('experience-heading');
  });
});
