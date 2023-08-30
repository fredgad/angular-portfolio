// import { GearImagesI, GearPositionsI } from '@interfaces';

import { GearImagesI, GearPositionsI } from '@interfaces';

export const MAX_GEAR_SCREEN = 3;
export const MIN_GEAR_SCREEN = 0;

export const GearImages: GearImagesI[] = [
  {
    name: 'zero',
    path: 'gear/firebase.svg',
  },
  {
    name: 'one',
    path: 'gear/sass.png',
  },
  {
    name: 'two',
    path: 'gear/html5.png',
  },
  {
    name: 'three',
    path: 'gear/css3.png',
  },
  {
    name: 'four',
    path: 'gear/vscode.png',
  },
  {
    name: 'five',
    path: 'gear/git.png',
  },
  {
    name: 'six',
    path: 'gear/rxjs.svg',
  },
  {
    name: 'seven',
    path: 'gear/react.png',
  },
  {
    name: 'eight',
    path: 'gear/figma.png',
  },
  {
    name: 'nine',
    path: 'gear/vue.png',
  },
  {
    name: 'side1',
    path: 'gear/angular.png',
  },
  {
    name: 'side2',
    path: 'gear/javascript.png',
  },
];

export const GearPositions: GearPositionsI[] = [
  { top: 'calc(50vh - 5rem)', left: 'calc(50vw - 5rem)' },
  { top: 'calc(50vh - 5rem)', left: 'calc(50vw - 5rem)' },
  { top: '50px', left: '90vw' },
  { top: '50px', left: '90vw' },
];
