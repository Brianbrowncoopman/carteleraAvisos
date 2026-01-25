import { Routes } from '@angular/router';// Importa la interfaz Routes para definir rutas

export const routes: Routes = [
  {// Ruta para la página de inicio
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {// Ruta para el formulario de nueva publicación
    path: 'nuevo',
    loadComponent: () =>import('./components/formulario-publicacion/formulario-publicacion.component').then((m) => m.FormularioPublicacionComponent),
  },
  {// Redirige la ruta vacía a 'home'
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
