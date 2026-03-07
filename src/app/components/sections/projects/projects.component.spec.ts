import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';

import { ProjectsComponent } from './projects.component';
import { PROJECTS } from '@/data/projects.data';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, OverlayModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render all projects by default', () => {
    const cards = element.querySelectorAll('[data-slot="card-title"]');
    expect(cards.length).toBe(PROJECTS.length);

    const titles = Array.from(cards).map((h) => h.textContent?.trim());
    for (const project of PROJECTS) {
      expect(titles).toContain(project.title);
    }
  });

  it('should filter to public projects when "Public" is clicked', () => {
    const filterButtons = element.querySelectorAll<HTMLButtonElement>(
      'div.flex.justify-center button',
    );
    const publicButton = Array.from(filterButtons).find(
      (btn) => btn.textContent?.trim() === 'Public',
    );

    expect(publicButton).toBeTruthy();
    publicButton!.click();
    fixture.detectChanges();

    const publicProjects = PROJECTS.filter((p) => p.type === 'public');
    const cards = element.querySelectorAll('[data-slot="card-title"]');
    expect(cards.length).toBe(publicProjects.length);
  });

  it('should filter to case study projects when "Case Studies" is clicked', () => {
    const filterButtons = element.querySelectorAll<HTMLButtonElement>(
      'div.flex.justify-center button',
    );
    const caseStudyButton = Array.from(filterButtons).find(
      (btn) => btn.textContent?.trim() === 'Case Studies',
    );

    expect(caseStudyButton).toBeTruthy();
    caseStudyButton!.click();
    fixture.detectChanges();

    const caseStudyProjects = PROJECTS.filter((p) => p.type === 'case-study');
    const cards = element.querySelectorAll('[data-slot="card-title"]');
    expect(cards.length).toBe(caseStudyProjects.length);
  });

  it('should show all projects again when "All" is clicked after filtering', () => {
    component.setFilter('public');
    fixture.detectChanges();

    const filterButtons = element.querySelectorAll<HTMLButtonElement>(
      'div.flex.justify-center button',
    );
    const allButton = Array.from(filterButtons).find(
      (btn) => btn.textContent?.trim() === 'All',
    );

    expect(allButton).toBeTruthy();
    allButton!.click();
    fixture.detectChanges();

    const cards = element.querySelectorAll('[data-slot="card-title"]');
    expect(cards.length).toBe(PROJECTS.length);
  });

  it('should render GitHub links for projects with githubUrl', () => {
    const githubLinks = element.querySelectorAll<HTMLAnchorElement>('a');
    const githubHrefs = Array.from(githubLinks)
      .filter((a) => a.textContent?.trim() === 'View on GitHub')
      .map((a) => a.href);

    const projectsWithGithub = PROJECTS.filter(
      (p) => 'githubUrl' in p && p.githubUrl,
    );
    expect(githubHrefs.length).toBe(projectsWithGithub.length);
  });

  it('should render "View Case Study" button for case study projects', () => {
    const caseStudyButtons = element.querySelectorAll<HTMLButtonElement>(
      'button',
    );
    const viewCaseStudyButtons = Array.from(caseStudyButtons).filter(
      (btn) => btn.textContent?.trim() === 'View Case Study',
    );

    const caseStudyProjects = PROJECTS.filter((p) => p.type === 'case-study');
    expect(viewCaseStudyButtons.length).toBe(caseStudyProjects.length);
  });

  it('should call openCaseStudy when "View Case Study" button is clicked', () => {
    const spy = spyOn(component, 'openCaseStudy');
    fixture.detectChanges();

    const caseStudyButtons = Array.from(
      element.querySelectorAll<HTMLButtonElement>('button'),
    ).filter((btn) => btn.textContent?.trim() === 'View Case Study');

    expect(caseStudyButtons.length).toBeGreaterThan(0);
    caseStudyButtons[0].click();
    expect(spy).toHaveBeenCalled();
  });

  it('should have aria-pressed on filter buttons', () => {
    const filterButtons = Array.from(
      element.querySelectorAll<HTMLButtonElement>('button'),
    ).filter((btn) => ['All', 'Public', 'Case Studies'].includes(btn.textContent?.trim() ?? ''));

    const allButton = filterButtons.find((btn) => btn.textContent?.trim() === 'All');
    expect(allButton?.getAttribute('aria-pressed')).toBe('true');

    const publicButton = filterButtons.find((btn) => btn.textContent?.trim() === 'Public');
    expect(publicButton?.getAttribute('aria-pressed')).toBe('false');
  });
});
