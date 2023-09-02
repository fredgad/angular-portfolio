export interface BarMenuI {
  name: string;
  link: string;
  target?: string;
  state: boolean;
}

export const BarMenu: BarMenuI[] = [
  {
    name: 'Main',
    link: 'Main',
    state: false,
  },
  {
    name: 'Cube',
    link: 'cube',
    state: false,
  },
  {
    name: 'Second',
    link: 'second',
    state: false,
  },
  {
    name: 'Pong',
    link: 'pong',
    target: '_blank',
    state: false,
  },
  {
    name: 'Photocut',
    link: 'Photocut',
    state: false,
  },
  {
    name: 'Bubbles',
    link: 'Bubbles',
    state: false,
  },
  {
    name: 'Some diagram',
    link: 'Some diagram',
    state: false,
  },
  {
    name: 'Ida-project tes',
    link: 'Ida-project tes',
    state: false,
  },
  {
    name: 'Timer',
    link: 'Timer',
    state: false,
  },
];
