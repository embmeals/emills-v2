export interface GalleryImage {
  readonly src: string;
  readonly title: string;
  readonly folder: 'ember' | 'casey';
}

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  { src: 'assets/gallery/collage003.png', title: 'Ember Collage 003', folder: 'ember' },
  { src: 'assets/gallery/collage026.png', title: 'Ember Collage 026', folder: 'ember' },
  { src: 'assets/gallery/dogCollage001.jpg', title: 'Ember Dog Collage', folder: 'ember' },
  { src: 'assets/gallery/collage010.png', title: 'Casey Collage 010', folder: 'casey' },
  { src: 'assets/gallery/collage011.png', title: 'Casey Collage 011', folder: 'casey' },
  { src: 'assets/gallery/collage012.png', title: 'Casey Collage 012', folder: 'casey' },
  { src: 'assets/gallery/collage018.png', title: 'Casey Collage 018', folder: 'casey' },
  { src: 'assets/gallery/collage021.png', title: 'Casey Collage 021', folder: 'casey' },
  { src: 'assets/gallery/collage022.png', title: 'Casey Collage 022', folder: 'casey' },
  { src: 'assets/gallery/collage027.png', title: 'Casey Collage 027', folder: 'casey' },
  { src: 'assets/gallery/collage030.png', title: 'Casey Collage 030', folder: 'casey' },
];
