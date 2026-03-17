import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { GALLERY_IMAGES } from '@/data/gallery.data';

/** Test host to provide the required `folder` input */
@Component({
  standalone: true,
  imports: [GalleryComponent],
  template: `<app-gallery [folder]="folder" />`,
})
class TestHostComponent {
  folder = 'ember';
}

describe('GalleryComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;
  let gallery: GalleryComponent;

  const emberImages = GALLERY_IMAGES.filter((img) => img.folder === 'ember');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
    gallery = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(gallery).toBeTruthy();
  });

  it('should render the folder title', () => {
    const heading = element.querySelector('h2');
    expect(heading?.textContent?.trim()).toBe('Ember');
  });

  it('should render only images for the given folder', () => {
    const images = element.querySelectorAll('img');
    expect(images.length).toBe(emberImages.length);
  });

  it('should open lightbox when an image is clicked', () => {
    const buttons = element.querySelectorAll('[class*="break-inside-avoid"]');
    expect(buttons.length).toBeGreaterThan(0);

    (buttons[0] as HTMLElement).click();
    fixture.detectChanges();

    expect(gallery.lightboxOpen()).toBe(true);
    expect(gallery.selectedImage()).toBeTruthy();
  });

  it('should close lightbox when closed event fires', () => {
    gallery.openLightbox(emberImages[0]);
    fixture.detectChanges();

    gallery.closeLightbox();
    fixture.detectChanges();

    expect(gallery.lightboxOpen()).toBe(false);
  });

  it('should render lightbox with close button when open', () => {
    gallery.openLightbox(emberImages[0]);
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

  it('should navigate to next image in lightbox', () => {
    gallery.openLightbox(emberImages[0]);
    fixture.detectChanges();

    expect(gallery.hasNext()).toBe(emberImages.length > 1);
    expect(gallery.hasPrev()).toBe(false);

    gallery.showNext();
    fixture.detectChanges();

    expect(gallery.selectedImage()).toEqual(emberImages[1]);
  });

  it('should navigate to previous image in lightbox', () => {
    gallery.openLightbox(emberImages[1]);
    fixture.detectChanges();

    gallery.showPrev();
    fixture.detectChanges();

    expect(gallery.selectedImage()).toEqual(emberImages[0]);
  });

  it('should close lightbox when Escape key is pressed', () => {
    gallery.openLightbox(emberImages[0]);
    fixture.detectChanges();
    expect(gallery.lightboxOpen()).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(gallery.lightboxOpen()).toBe(false);
  });
});
