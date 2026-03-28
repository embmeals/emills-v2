export interface GalleryImage {
  readonly src: string;
  readonly title: string;
  readonly folder: 'ember' | 'casey' | 'film' | 'screenprint' | 'stained-glass';
}

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  // Ember — Collages
  { src: 'assets/gallery/ember/collage003.jpg', title: 'Ember Collage 003', folder: 'ember' },
  { src: 'assets/gallery/ember/collage026.jpg', title: 'Ember Collage 026', folder: 'ember' },
  { src: 'assets/gallery/ember/dogCollage001.jpg', title: 'Ember Dog Collage', folder: 'ember' },

  // Casey — Collages
  { src: 'assets/gallery/casey/collage010.jpg', title: 'Casey Collage 010', folder: 'casey' },
  { src: 'assets/gallery/casey/collage011.jpg', title: 'Casey Collage 011', folder: 'casey' },
  { src: 'assets/gallery/casey/collage012.jpg', title: 'Casey Collage 012', folder: 'casey' },
  { src: 'assets/gallery/casey/collage018.jpg', title: 'Casey Collage 018', folder: 'casey' },
  { src: 'assets/gallery/casey/collage021_virgo.jpg', title: 'Casey Virgo Collage', folder: 'casey' },
  { src: 'assets/gallery/casey/collage022.jpg', title: 'Casey Collage 022', folder: 'casey' },
  { src: 'assets/gallery/casey/collage027.jpg', title: 'Casey Collage 027', folder: 'casey' },
  { src: 'assets/gallery/casey/collage030.jpg', title: 'Casey Collage 030', folder: 'casey' },
  { src: 'assets/gallery/casey/xmas_photo_trimmed_4.jpg', title: 'Casey Christmas Photo', folder: 'casey' },

  // Film — Photography
  { src: 'assets/gallery/film/animal_edited.jpg', title: 'Cat Mom', folder: 'film' },
  { src: 'assets/gallery/film/bw_edited.jpg', title: 'Selective Color — Kitchen', folder: 'film' },
  { src: 'assets/gallery/film/000723710026.jpg', title: 'Film Scan 001', folder: 'film' },
  { src: 'assets/gallery/film/17871380777823260.webp', title: 'Film Strip 001', folder: 'film' },
  { src: 'assets/gallery/film/17963164544511310.webp', title: 'Film Strip 002', folder: 'film' },
  { src: 'assets/gallery/film/17963562800118344.webp', title: 'Film Strip 003', folder: 'film' },
  { src: 'assets/gallery/film/17974504982192010.webp', title: 'Film Strip 004', folder: 'film' },
  { src: 'assets/gallery/film/18203568019223519.webp', title: 'Film Strip 005', folder: 'film' },
  { src: 'assets/gallery/film/18348732346026568.webp', title: 'Film Strip 006', folder: 'film' },
  { src: 'assets/gallery/film/18352780432040367.webp', title: 'Film Strip 007', folder: 'film' },
  { src: 'assets/gallery/film/18359532682010313.webp', title: 'Film Strip 008', folder: 'film' },
  { src: 'assets/gallery/film/18011690182540475.webp', title: 'Film Strip 009', folder: 'film' },
  { src: 'assets/gallery/film/tallneck_film.jpg', title: 'Tallneck', folder: 'film' },
  { src: 'assets/gallery/film/sewing_machine.jpg', title: 'Sewing Machine', folder: 'film' },
  { src: 'assets/gallery/film/pup_in_car.jpg', title: 'Pup in Car', folder: 'film' },
  { src: 'assets/gallery/film/cosmo.jpg', title: 'Cosmo', folder: 'film' },
  { src: 'assets/gallery/film/sleeping_pig.jpg', title: 'Sleeping Pig', folder: 'film' },
  { src: 'assets/gallery/film/catio.jpg', title: 'Catio', folder: 'film' },

  // Screenprint — Apparel & Prints
  { src: 'assets/gallery/screenprint/IMG_0147.jpg', title: 'Byte Me — Drying Rack', folder: 'screenprint' },
  { src: 'assets/gallery/screenprint/IMG_0535.jpg', title: 'Online Now — On Press', folder: 'screenprint' },
  { src: 'assets/gallery/screenprint/IMG_0919.jpg', title: 'Online Now — Orange Tee', folder: 'screenprint' },
  { src: 'assets/gallery/screenprint/IMG_10041.jpg', title: 'Byte Me — White Tee', folder: 'screenprint' },
  { src: 'assets/gallery/screenprint/IMG_1199.jpg', title: 'Online Now — As Seen On TV', folder: 'screenprint' },
  { src: 'assets/gallery/screenprint/IMG_2153.jpg', title: 'Byte Me — On Press', folder: 'screenprint' },

  // Stained Glass
  { src: 'assets/gallery/stained-glass/17870301350093546.jpg', title: 'Stained Glass 001', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17845851853899718.jpg', title: 'Stained Glass 002', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17848222021971170.jpg', title: 'Stained Glass 003', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17851192921792369.jpg', title: 'Stained Glass 004', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17857845145906942.jpg', title: 'Stained Glass 005', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17860844653659542.jpg', title: 'Stained Glass 006', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17878073179617657.jpg', title: 'Stained Glass 007', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17882538794239427.jpg', title: 'Stained Glass 008', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17890544095911765.jpg', title: 'Stained Glass 009', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17925407611741966.jpg', title: 'Stained Glass 010', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/18071738656221679.jpg', title: 'Stained Glass 011', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/18077328103201569.jpg', title: 'Stained Glass 012', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/18109270942171466.jpg', title: 'Stained Glass 013', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/18127015546029153.jpg', title: 'Stained Glass 014', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/18128816734016661.jpg', title: 'Stained Glass 015', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/18137297977063951.jpg', title: 'Stained Glass 016', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/IMG_0259.jpg', title: 'Stained Glass 017', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/IMG_02601.jpg', title: 'Stained Glass 018', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17871805291487401.jpg', title: 'Stained Glass 019', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17892824062414319.jpg', title: 'Stained Glass 020', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/18043494397218733.jpg', title: 'Stained Glass 021', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17848196414089656.jpg', title: 'Stained Glass 022', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17849397605013458.jpg', title: 'Stained Glass 023', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17854849510623949.jpg', title: 'Stained Glass 024', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17859394516615872.jpg', title: 'Stained Glass 025', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17860279843599882.jpg', title: 'Stained Glass 026', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17863996333560873.jpg', title: 'Stained Glass 027', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17865855574932738.jpg', title: 'Stained Glass 028', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17866519972947151.jpg', title: 'Stained Glass 029', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17895932953411655.jpg', title: 'Stained Glass 030', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/17942808394348917.jpg', title: 'Stained Glass 031', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/18044382472215853.jpg', title: 'Stained Glass 032', folder: 'stained-glass' },
  { src: 'assets/gallery/stained-glass/18084646255083047.jpg', title: 'Stained Glass 033', folder: 'stained-glass' },
];
