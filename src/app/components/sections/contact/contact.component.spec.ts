import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Let\'s Connect" heading', () => {
    const heading = compiled.querySelector('h2');
    expect(heading?.textContent?.trim()).toBe("Let's Connect");
  });

  it('should have an email link', () => {
    const links = compiled.querySelectorAll('a');
    const hrefs = Array.from(links).map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('mailto:hello@emills.net');
  });

  it('should have a GitHub link', () => {
    const links = compiled.querySelectorAll('a');
    const hrefs = Array.from(links).map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('https://github.com/embmeals');
  });

  it('should have a LinkedIn link', () => {
    const links = compiled.querySelectorAll('a');
    const hrefs = Array.from(links).map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('https://www.linkedin.com/in/ember-d-mills');
  });

  it('should have a CodePen link', () => {
    const links = compiled.querySelectorAll('a');
    const hrefs = Array.from(links).map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('https://codepen.io/ambmeals');
  });

  it('should have target="_blank" on all external links', () => {
    const externalLinks = Array.from(compiled.querySelectorAll('a')).filter(
      (link) => !link.getAttribute('href')?.startsWith('mailto:')
    );
    expect(externalLinks.length).toBe(3);
    externalLinks.forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank');
    });
  });

  it('should have aria-label on all links', () => {
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBe(4);
    const labels = Array.from(links).map((link) =>
      link.getAttribute('aria-label')
    );
    expect(labels).toContain('Email');
    expect(labels).toContain('GitHub');
    expect(labels).toContain('LinkedIn');
    expect(labels).toContain('CodePen');
  });

  it('should have rel="noopener noreferrer" on external links', () => {
    const externalLinks = Array.from(compiled.querySelectorAll('a')).filter(
      (link) => !link.getAttribute('href')?.startsWith('mailto:')
    );
    externalLinks.forEach((link) => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('should render subtitle text', () => {
    const text = compiled.textContent;
    expect(text).toContain(
      'Have a project in mind or just want to chat? Reach out!'
    );
  });
});
