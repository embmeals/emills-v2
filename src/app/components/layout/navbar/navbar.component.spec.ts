import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all nav links', () => {
    const buttons = compiled.querySelectorAll('button[role="menuitem"]');
    const expectedLabels = [
      'Home',
      'About',
      'Skills',
      'Projects',
      'Experience',
      'Gallery',
      'Contact',
    ];
    const visibleButtons = Array.from(buttons).filter(
      (btn) =>
        btn.closest('.hidden') === null ||
        btn.closest('[id="mobile-menu"]') !== null
    );
    // Desktop buttons are in .hidden.md:flex container
    expect(buttons.length).toBeGreaterThanOrEqual(expectedLabels.length);
    const labels = Array.from(buttons)
      .slice(0, expectedLabels.length)
      .map((btn) => btn.textContent?.trim());
    expect(labels).toEqual(expectedLabels);
  });

  it('should have proper nav aria-label', () => {
    const nav = compiled.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
  });

  it('should have site name button with aria-label', () => {
    const siteNameBtn = compiled.querySelector(
      'button[aria-label="Scroll to top"]'
    );
    expect(siteNameBtn).toBeTruthy();
    expect(siteNameBtn?.textContent?.trim()).toBe('EM');
  });

  it('should have hamburger button with aria attributes', () => {
    const hamburger = compiled.querySelector(
      'button[aria-label="Toggle navigation menu"]'
    );
    expect(hamburger).toBeTruthy();
    expect(hamburger?.getAttribute('aria-expanded')).toBe('false');
    expect(hamburger?.getAttribute('aria-controls')).toBe('mobile-menu');
  });

  it('should toggle mobile menu', () => {
    expect(component.mobileOpen()).toBe(false);
    component.toggleMobile();
    expect(component.mobileOpen()).toBe(true);
    component.closeMobile();
    expect(component.mobileOpen()).toBe(false);
  });

  it('should default active section to home', () => {
    expect(component.activeSection()).toBe('home');
  });
});
