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

  it('should contain a canvas element', () => {
    const canvas = compiled.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('should have aria-hidden on the canvas', () => {
    const canvas = compiled.querySelector('canvas');
    expect(canvas?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have aria-labelledby on the hero section', () => {
    const section = compiled.querySelector('section');
    expect(section?.getAttribute('aria-labelledby')).toBe('hero-heading');
  });

  it('should have an id on the h1 matching aria-labelledby', () => {
    const h1 = compiled.querySelector('h1');
    expect(h1?.id).toBe('hero-heading');
  });

  it('should render the dev card', () => {
    const card = compiled.querySelector('app-dev-card');
    expect(card).toBeTruthy();
  });
});
