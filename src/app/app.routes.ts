import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@/components/pages/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'studio',
    loadComponent: () =>
      import('@/components/pages/gallery-page.component').then((m) => m.GalleryPageComponent),
  },
  {
    path: 'studio/:folder',
    loadComponent: () =>
      import('@/components/pages/gallery-folder-page.component').then((m) => m.GalleryFolderPageComponent),
  },
  { path: '**', redirectTo: '' },
];
