import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(app.title).toEqual('emills-v2');
  });

  it('should render the navbar', () => {
    const navbar = compiled.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render the footer', () => {
    const footer = compiled.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });

  it('should have all section IDs', () => {
    const sectionIds = [
      'home',
      'about',
      'skills',
      'projects',
      'experience',
      'gallery',
      'contact',
    ];

    for (const id of sectionIds) {
      const section = compiled.querySelector(`#${id}`);
      expect(section).toBeTruthy(`Section #${id} should exist`);
    }
  });

  it('should have min-h-screen on all sections', () => {
    const sections = compiled.querySelectorAll('section');
    expect(sections.length).toBe(7);
    sections.forEach((section) => {
      expect(section.classList.contains('min-h-screen')).toBeTrue();
    });
  });

  it('should have 7 sections defined', () => {
    expect(app.sections.length).toBe(7);
  });
});
