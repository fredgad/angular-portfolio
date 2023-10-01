import { Route } from '@angular/router';
import { MainComponent } from '@app/pages';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'cube',
    loadComponent: () => import('@app/cube').then((m) => m.CubePageComponent),
  },
  {
    path: 'rotate',
    loadComponent: () =>
      import('@angular-portfolio/rotate').then((m) => m.RotateComponent),
  },
  {
    path: 'pong',
    loadComponent: () => import('@app/pong').then((m) => m.PongComponent),
  },
  {
    path: '**',
    redirectTo: '',
    component: MainComponent,
  },
];
