import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionDividerComponent } from './section-divider.component';

describe('SectionDividerComponent', () => {
  let fixture: ComponentFixture<SectionDividerComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionDividerComponent);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should be aria-hidden', () => {
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    const wrapper = compiled.firstElementChild;
    expect(wrapper?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Ship Systems');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Ship Systems');
  });

  it('should not render label span when empty', () => {
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    const labelSpan = compiled.querySelector('span');
    expect(labelSpan).toBeNull();
  });

  it('should render pulsing node dots', () => {
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    const nodes = compiled.querySelectorAll('.divider-node');
    expect(nodes.length).toBeGreaterThanOrEqual(1);
  });

  it('should render two node dots when label is present', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    const nodes = compiled.querySelectorAll('.divider-node');
    expect(nodes.length).toBe(2);
  });
});
