import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';
import { EXPERIENCES } from '@/data/experience.data';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render section title "Experience"', () => {
    const heading = element.querySelector('h2');
    expect(heading?.textContent?.trim()).toBe('Experience');
  });

  it('should render all experience entries', () => {
    const entries = element.querySelectorAll('.timeline-entry');
    expect(entries.length).toBe(EXPERIENCES.length);
  });

  it('should display role for each entry', () => {
    const titles = element.querySelectorAll('[data-slot="card-title"]');
    const titleTexts = Array.from(titles).map((t) => t.textContent?.trim());

    for (const exp of EXPERIENCES) {
      expect(titleTexts).toContain(exp.role);
    }
  });

  it('should display company for each entry', () => {
    const descriptions = element.querySelectorAll('[data-slot="card-description"]');
    const descTexts = Array.from(descriptions).map((el) =>
      el.textContent?.trim(),
    );

    for (const exp of EXPERIENCES) {
      expect(descTexts).toContain(
        `${exp.company} · ${exp.startDate} – ${exp.endDate}`,
      );
    }
  });

  it('should display date range for each entry', () => {
    const descriptions = element.querySelectorAll('[data-slot="card-description"]');
    const descTexts = Array.from(descriptions).map((el) =>
      el.textContent?.trim(),
    );

    for (const exp of EXPERIENCES) {
      const hasDate = descTexts.some(
        (text) => text?.includes(exp.startDate) && text?.includes(exp.endDate),
      );
      expect(hasDate).toBeTrue();
    }
  });

  it('should render all accomplishments as list items', () => {
    const listItems = element.querySelectorAll('li');
    const totalAccomplishments = EXPERIENCES.reduce(
      (sum, exp) => sum + exp.accomplishments.length,
      0,
    );
    expect(listItems.length).toBe(totalAccomplishments);
  });

  it('should contain expected accomplishment text', () => {
    const listItemTexts = Array.from(element.querySelectorAll('li')).map(
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

  it('should render timeline nodes for each entry', () => {
    const nodes = element.querySelectorAll('.timeline-node');
    expect(nodes.length).toBe(EXPERIENCES.length);
  });
});
