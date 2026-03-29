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
    path: 'advocacy',
    loadComponent: () =>
      import('@/components/pages/advocacy-page.component').then((m) => m.AdvocacyPageComponent),
  },
  {
    path: 'studio/:folder',
    loadComponent: () =>
      import('@/components/pages/gallery-folder-page.component').then((m) => m.GalleryFolderPageComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@/components/pages/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
