import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render about text containing "MySpace"', () => {
    const text = compiled.textContent ?? '';
    expect(text).toContain('MySpace');
  });

  it('should render all 5 fun fact labels', () => {
    const expectedLabels = [
      'Amateur Artist',
      'Proud Pomchi Parent',
      'Avid Gamer',
      'Virgo',
      'Lover of Bicycles',
    ];
    const text = compiled.textContent ?? '';
    for (const label of expectedLabels) {
      expect(text).toContain(label);
    }
  });

  it('should have a "View Resume" link', () => {
    const link = compiled.querySelector('a[href="/resume.html"]');
    expect(link).toBeTruthy();
    expect(link?.textContent?.trim()).toContain('View Resume');
    expect(link?.getAttribute('target')).toBe('_blank');
  });

  it('should have section with proper aria-labelledby', () => {
    const section = compiled.querySelector('section#about');
    expect(section).toBeTruthy();
    expect(section?.getAttribute('aria-labelledby')).toBe('about-heading');
  });
});
