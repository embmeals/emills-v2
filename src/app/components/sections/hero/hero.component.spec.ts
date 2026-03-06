import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Ember Mills" in an h1', () => {
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.textContent?.trim()).toBe('Ember Mills');
  });

  it('should render "Senior Full Stack Engineer"', () => {
    const text = compiled.textContent;
    expect(text).toContain('Senior Full Stack Engineer');
  });

  it('should render the tagline', () => {
    const text = compiled.textContent;
    expect(text).toContain(
      'Building accessible, inclusive digital experiences'
    );
  });

  it('should have GitHub link with correct href', () => {
    const link = compiled.querySelector('a[aria-label="GitHub"]');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('https://github.com/embmeals');
  });

  it('should have LinkedIn link with correct href', () => {
    const link = compiled.querySelector('a[aria-label="LinkedIn"]');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe(
      'https://www.linkedin.com/in/ember-d-mills'
    );
  });

  it('should have CodePen link with correct href', () => {
    const link = compiled.querySelector('a[aria-label="CodePen"]');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('https://codepen.io/ambmeals');
  });

  it('should contain a canvas element', () => {
    const canvas = compiled.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('should have social links that open in new tab', () => {
    const links = compiled.querySelectorAll('a[target="_blank"]');
    expect(links.length).toBe(3);
    links.forEach((link) => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });
});
