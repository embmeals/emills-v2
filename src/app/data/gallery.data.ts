export interface GalleryImage {
  readonly src: string;
  readonly title: string;
  readonly folder: 'ember' | 'casey';
}

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  { src: 'assets/gallery/ember/collage003.png', title: 'Ember Collage 003', folder: 'ember' },
  { src: 'assets/gallery/ember/collage026.png', title: 'Ember Collage 026', folder: 'ember' },
  { src: 'assets/gallery/ember/dogCollage001.jpg', title: 'Ember Dog Collage', folder: 'ember' },
  { src: 'assets/gallery/casey/collage010.png', title: 'Casey Collage 010', folder: 'casey' },
  { src: 'assets/gallery/casey/collage011.png', title: 'Casey Collage 011', folder: 'casey' },
  { src: 'assets/gallery/casey/collage012.png', title: 'Casey Collage 012', folder: 'casey' },
  { src: 'assets/gallery/casey/collage018.png', title: 'Casey Collage 018', folder: 'casey' },
  { src: 'assets/gallery/casey/collage021.png', title: 'Casey Collage 021', folder: 'casey' },
  { src: 'assets/gallery/casey/collage022.png', title: 'Casey Collage 022', folder: 'casey' },
  { src: 'assets/gallery/casey/collage027.png', title: 'Casey Collage 027', folder: 'casey' },
  { src: 'assets/gallery/casey/collage030.png', title: 'Casey Collage 030', folder: 'casey' },
  { src: 'assets/gallery/casey/xmas_photo_trimmed_4.png', title: 'Casey Christmas Photo', folder: 'casey' },
];
