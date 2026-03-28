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
    const hrefs = getAllHrefs();
    expect(hrefs).toContain('mailto:hello@emills.net');
  });

  it('should have a GitHub link', () => {
    const hrefs = getAllHrefs();
    expect(hrefs).toContain('https://github.com/embmeals');
  });

  it('should have a LinkedIn link', () => {
    const hrefs = getAllHrefs();
    expect(hrefs).toContain('https://www.linkedin.com/in/ember-d-mills');
  });

  it('should have target="_blank" on external links', () => {
    const externalLinks = getExternalLinks();
    expect(externalLinks.length).toBe(2);
    externalLinks.forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank');
    });
  });

  it('should have aria-label on all links', () => {
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBe(3);
    const labels = Array.from(links).map((link) => link.getAttribute('aria-label'));
    expect(labels).toContain('Email');
    expect(labels).toContain('GitHub');
    expect(labels).toContain('LinkedIn');
  });

  it('should have rel="noopener noreferrer" on external links', () => {
    getExternalLinks().forEach((link) => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('should render subtitle text', () => {
    expect(compiled.textContent).toContain(
      'Have a project in mind or just want to chat? Reach out!',
    );
  });

  function getAllHrefs(): string[] {
    const links = compiled.querySelectorAll('a');
    return Array.from(links).map((link) => link.getAttribute('href') ?? '');
  }

  function getExternalLinks(): HTMLAnchorElement[] {
    return Array.from(compiled.querySelectorAll('a')).filter((link) => {
      const href = link.getAttribute('href');
      return href && !href.startsWith('mailto:') && !href.startsWith('/');
    }) as HTMLAnchorElement[];
  }
});
