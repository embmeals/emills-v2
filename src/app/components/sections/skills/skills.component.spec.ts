import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsComponent } from './skills.component';
import { SKILL_CATEGORIES } from '@/data/skills.data';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render section title "Skills & Technologies"', () => {
    const heading = element.querySelector('h2');
    expect(heading?.textContent?.trim()).toBe('Skills & Technologies');
  });

  it('should render all category cards', () => {
    const cards = element.querySelectorAll('z-card');
    expect(cards.length).toBe(SKILL_CATEGORIES.length);
  });

  it('should have aria-labelledby linking section to heading', () => {
    const section = element.querySelector('section');
    const heading = element.querySelector('h2');
    expect(section?.getAttribute('aria-labelledby')).toBe('skills-heading');
    expect(heading?.id).toBe('skills-heading');
  });

  it('should render each category with expected skill names', () => {
    const titles = element.querySelectorAll('[data-slot="card-title"]');
    const titleTexts = Array.from(titles).map((t) => t.textContent?.trim());

    for (const category of SKILL_CATEGORIES) {
      expect(titleTexts).toContain(category.name);
    }
  });

  it('should render all skill badges', () => {
    const badges = element.querySelectorAll('z-badge');
    const totalSkills = SKILL_CATEGORIES.reduce(
      (sum, cat) => sum + cat.skills.length,
      0,
    );
    expect(badges.length).toBe(totalSkills);
  });

  it('should contain expected skill names in each category', () => {
    const allBadgeTexts = Array.from(
      element.querySelectorAll('z-badge'),
    ).map((el) => el.textContent?.trim());

    for (const category of SKILL_CATEGORIES) {
      for (const skill of category.skills) {
        expect(allBadgeTexts).toContain(skill.name);
      }
    }
  });
});
