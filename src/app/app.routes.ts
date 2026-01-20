import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'nuevo',
    loadComponent: () =>import('./components/formulario-publicacion/formulario-publicacion.component').then((m) => m.FormularioPublicacionComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
