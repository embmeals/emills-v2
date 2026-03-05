import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import { GALLERY_IMAGES } from '@/data/gallery.data';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section title "Gallery"', () => {
    const heading = element.querySelector('h2');
    expect(heading?.textContent?.trim()).toBe('Gallery');
  });

  it('should render gallery images', () => {
    const images = element.querySelectorAll('img');
    expect(images.length).toBe(GALLERY_IMAGES.length);
  });

  it('should have filter buttons for All, Ember, and Casey', () => {
    const buttons = element.querySelectorAll('button');
    const labels = Array.from(buttons).map((btn) => btn.textContent?.trim());
    expect(labels).toContain('All');
    expect(labels).toContain('Ember');
    expect(labels).toContain('Casey');
  });

  it('should filter images when a folder filter is clicked', () => {
    const buttons = Array.from(element.querySelectorAll('button'));
    const emberButton = buttons.find((btn) => btn.textContent?.trim() === 'Ember');

    emberButton?.click();
    fixture.detectChanges();

    const images = element.querySelectorAll('img');
    const emberCount = GALLERY_IMAGES.filter((img) => img.folder === 'ember').length;
    expect(images.length).toBe(emberCount);
  });

  it('should open lightbox when an image is clicked', () => {
    const imageContainers = element.querySelectorAll('[class*="break-inside-avoid"]');
    expect(imageContainers.length).toBeGreaterThan(0);

    (imageContainers[0] as HTMLElement).click();
    fixture.detectChanges();

    expect(component.lightboxOpen()).toBe(true);
    expect(component.selectedImage()).toBeTruthy();
  });

  it('should close lightbox when closed event fires', () => {
    component.openLightbox(GALLERY_IMAGES[0]);
    fixture.detectChanges();

    component.closeLightbox();
    fixture.detectChanges();

    expect(component.lightboxOpen()).toBe(false);
  });

  it('should render lightbox with close button when open', () => {
    component.openLightbox(GALLERY_IMAGES[0]);
    fixture.detectChanges();

    const closeButton = element.querySelector('[aria-label="Close lightbox"]');
    expect(closeButton).toBeTruthy();
  });

  it('should have images with loading="lazy" attribute', () => {
    const images = element.querySelectorAll('img');
    images.forEach((img) => {
      expect(img.getAttribute('loading')).toBe('lazy');
    });
  });
});
