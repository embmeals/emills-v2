import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@/components/pages/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('@/components/pages/gallery-page.component').then((m) => m.GalleryPageComponent),
  },
  { path: '**', redirectTo: '' },
];
