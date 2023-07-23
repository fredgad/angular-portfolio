import { Route } from '@angular/router';
import { MainComponent } from '@app/pages';

// export const appRoutes: Route[] = [];

// import { Routes } from '@angular/router';
// import { MainPageComponent } from '../pages/main-page/main-page.component';

// export const appRoutes: Routes = [
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  // {
  //   path: 'second',
  //   loadComponent: () =>
  //     import('../pages/second-page/second-page.component').then(
  //       (m) => m.SecondPageComponent
  //     ),
  // },
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
    path: '**',
    redirectTo: '',
    component: MainComponent,
  },
];
