import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render social links', () => {
    const links = compiled.querySelectorAll('a[target="_blank"]');
    expect(links.length).toBe(3);

    const hrefs = Array.from(links).map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('https://github.com/embmeals');
    expect(hrefs).toContain('https://www.linkedin.com/in/ember-d-mills');
    expect(hrefs).toContain('https://codepen.io/ambmeals');
  });

  it('should have aria-labels on social links', () => {
    const links = compiled.querySelectorAll('a[target="_blank"]');
    const labels = Array.from(links).map((link) =>
      link.getAttribute('aria-label')
    );
    expect(labels).toContain('GitHub');
    expect(labels).toContain('LinkedIn');
    expect(labels).toContain('CodePen');
  });

  it('should render copyright text', () => {
    const text = compiled.textContent;
    expect(text).toContain('2026 Ember Mills');
  });

  it('should render "Built with" text', () => {
    const text = compiled.textContent;
    expect(text).toContain('Built with Angular & Zard UI');
  });

  it('should have rel="noopener noreferrer" on external links', () => {
    const links = compiled.querySelectorAll('a[target="_blank"]');
    links.forEach((link) => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });
});
