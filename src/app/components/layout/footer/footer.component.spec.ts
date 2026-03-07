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

  it('should render copyright text with current year', () => {
    const text = compiled.textContent;
    expect(text).toContain(`${component.currentYear} Ember Mills`);
  });

  it('should render "Built with" text', () => {
    const text = compiled.textContent;
    expect(text).toContain('Built with Angular & Zard UI');
  });

  it('should have Remember the Cant as aria-hidden', () => {
    const cant = compiled.querySelector('[aria-hidden="true"]');
    expect(cant?.textContent?.trim()).toBe('Remember the Cant');
  });

  it('should render a footer element', () => {
    const footer = compiled.querySelector('footer');
    expect(footer).toBeTruthy();
  });
});
